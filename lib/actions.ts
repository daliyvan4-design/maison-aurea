'use server'

import { db } from './db'
import { products, orders, deliveries, type NewProduct } from './db/schema'
import { eq, desc, sql, gte, and } from 'drizzle-orm'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/* ─── PRODUITS ─── */

export async function getProducts() {
  return db.query.products.findMany({ orderBy: desc(products.createdAt) })
}

export async function createProduct(data: NewProduct) {
  const [p] = await db.insert(products).values(data).returning()
  revalidatePath('/admin/produits')
  return p
}

export async function updateProduct(id: number, data: Partial<NewProduct>) {
  const [p] = await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, id)).returning()
  revalidatePath('/admin/produits')
  return p
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id))
  revalidatePath('/admin/produits')
}

export async function uploadProductImage(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) throw new Error('No file')

  const buffer = Buffer.from(await file.arrayBuffer())

  const url = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'maison-aurea/products', resource_type: 'image' },
      (err, result) => {
        if (err || !result) reject(err ?? new Error('Cloudinary upload failed'))
        else resolve(result.secure_url)
      },
    ).end(buffer)
  })

  return url
}

/* ─── COMMANDES ─── */

export async function createOrder(data: {
  customerName: string
  customerEmail: string | null
  customerPhone: string | null
  customerCity: string
  items: Array<{ productId: number; name: string; price: number; qty: number; image?: string }>
  subtotal: number
  deliveryFee: number
  total: number
  notes?: string
}) {
  const year  = new Date().getFullYear()
  const count = await db.select({ c: sql<number>`count(*)` }).from(orders)
  const num   = String((count[0]?.c ?? 0) + 1).padStart(4, '0')
  const ref   = `AUR-${year}-${num}`

  await db.insert(orders).values({ ...data, ref, status: 'pending' })
  revalidatePath('/admin/commandes')

  if (data.customerEmail) {
    const { sendOrderConfirmEmail } = await import('./emails/send')
    await sendOrderConfirmEmail({
      ref,
      customerName:  data.customerName,
      customerEmail: data.customerEmail,
      items:         data.items,
      subtotal:      data.subtotal,
      deliveryFee:   data.deliveryFee,
      total:         data.total,
      city:          data.customerCity,
    }).catch(() => {})
  }

  return ref
}

export async function getOrders(limit = 50) {
  return db.query.orders.findMany({ orderBy: desc(orders.createdAt), limit })
}

export async function updateOrderStatus(id: number, status: typeof orders.$inferInsert['status']) {
  const [o] = await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id)).returning()
  revalidatePath('/admin/commandes')
  return o
}

/* ─── LIVRAISONS ─── */

export async function getDeliveries() {
  return db.query.deliveries.findMany({ orderBy: desc(deliveries.createdAt) })
}

export async function updateDeliveryStatus(id: number, status: typeof deliveries.$inferInsert['status']) {
  const [d] = await db.update(deliveries).set({ status, updatedAt: new Date() }).where(eq(deliveries.id, id)).returning()
  revalidatePath('/admin/livraisons')
  return d
}

/* ─── INSIGHTS / KPIs ─── */

export async function getDashboardStats() {
  // Revenus total et ce mois
  const [totals] = await db
    .select({
      totalRevenue:  sql<number>`coalesce(sum(total), 0)`,
      totalOrders:   sql<number>`count(*)`,
    })
    .from(orders)
    .where(eq(orders.status, 'delivered'))

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [monthly] = await db
    .select({ revenue: sql<number>`coalesce(sum(total), 0)`, orders: sql<number>`count(*)` })
    .from(orders)
    .where(and(eq(orders.status, 'delivered'), gte(orders.createdAt, startOfMonth)))

  // Commandes par statut
  const byStatus = await db
    .select({ status: orders.status, count: sql<number>`count(*)` })
    .from(orders)
    .groupBy(orders.status)

  // Top 5 produits par revenus (depuis les items JSON)
  const allOrders = await db.query.orders.findMany({ columns: { items: true, total: true, status: true } })

  const productRevenue: Record<string, { name: string; revenue: number; qty: number }> = {}
  for (const o of allOrders) {
    if (o.status === 'cancelled') continue
    for (const item of (o.items as Array<{ name: string; price: number; qty: number }> || [])) {
      const key = item.name
      if (!productRevenue[key]) productRevenue[key] = { name: key, revenue: 0, qty: 0 }
      productRevenue[key].revenue += item.price * item.qty
      productRevenue[key].qty    += item.qty
    }
  }
  const topProducts = Object.values(productRevenue)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Revenus des 30 derniers jours (par jour)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000)
  const dailyOrders = await db.query.orders.findMany({
    where: gte(orders.createdAt, thirtyDaysAgo),
    columns: { total: true, createdAt: true, status: true },
  })

  // Agréger par jour
  const dailyMap: Record<string, number> = {}
  for (const o of dailyOrders) {
    if (o.status === 'cancelled') continue
    const day = o.createdAt!.toISOString().slice(0, 10)
    dailyMap[day] = (dailyMap[day] || 0) + o.total
  }
  const revenueChart = Object.entries(dailyMap)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return {
    totalRevenue:  totals?.totalRevenue  ?? 0,
    totalOrders:   totals?.totalOrders   ?? 0,
    monthRevenue:  monthly?.revenue      ?? 0,
    monthOrders:   monthly?.orders       ?? 0,
    byStatus,
    topProducts,
    revenueChart,
  }
}

export async function getSalesInsights() {
  // Revenus des 12 derniers mois
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11)
  twelveMonthsAgo.setDate(1)

  const monthlyOrders = await db.query.orders.findMany({
    where: gte(orders.createdAt, twelveMonthsAgo),
    columns: { total: true, createdAt: true, status: true },
  })

  const monthMap: Record<string, { revenue: number; count: number }> = {}
  for (const o of monthlyOrders) {
    if (o.status === 'cancelled') continue
    const month = o.createdAt!.toISOString().slice(0, 7) // YYYY-MM
    if (!monthMap[month]) monthMap[month] = { revenue: 0, count: 0 }
    monthMap[month].revenue += o.total
    monthMap[month].count++
  }
  const monthlyChart = Object.entries(monthMap)
    .map(([month, d]) => ({ month, ...d }))
    .sort((a, b) => a.month.localeCompare(b.month))

  // Revenus par ville
  const cityOrders = await db.query.orders.findMany({
    where: eq(orders.status, 'delivered'),
    columns: { customerCity: true, total: true },
  })
  const cityMap: Record<string, number> = {}
  for (const o of cityOrders) {
    const city = o.customerCity || 'Abidjan'
    cityMap[city] = (cityMap[city] || 0) + o.total
  }
  const byCity = Object.entries(cityMap)
    .map(([city, revenue]) => ({ city, revenue }))
    .sort((a, b) => b.revenue - a.revenue)

  return { monthlyChart, byCity }
}
