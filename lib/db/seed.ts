// Données de seed pour démo — executer avec : npx tsx lib/db/seed.ts
import { db } from './index'
import { products, orders, deliveries } from './schema'

const SEED_PRODUCTS = [
  { name: 'Service de table Auréa Élégance', slug: 'service-table-aurea-elegance', category: 'art-de-la-table' as const, price: 75000, stock: 8, featured: true, description: 'Service complet 12 pièces en porcelaine fine, collection signature.' },
  { name: 'Théière en porcelaine Auréa',     slug: 'theiere-porcelaine-aurea',     category: 'theieres' as const,         price: 28000, stock: 15, description: 'Théière 1.2L, décor doré, poignée ergonomique.' },
  { name: 'Coffret cadeau Auréa',            slug: 'coffret-cadeau-aurea',         category: 'coffrets' as const,         price: 20000, stock: 30, description: 'Coffret 4 pièces, idéal en cadeau.' },
  { name: 'Verres taillés, lot de 6',        slug: 'verres-tailles-lot-6',         category: 'verres' as const,           price: 32000, stock: 12 },
  { name: 'Assiette plate Argile',           slug: 'assiette-plate-argile',        category: 'art-de-la-table' as const, price: 18000, stock: 20 },
  { name: 'Cocotte fonte Auréa',             slug: 'cocotte-fonte-aurea',          category: 'cuisine' as const,          price: 52000, stock: 5 },
  { name: 'Carafe Ondine',                   slug: 'carafe-ondine',                category: 'verres' as const,           price: 26000, stock: 18 },
  { name: 'Coffret découverte thé',          slug: 'coffret-decouverte-the',       category: 'coffrets' as const,         price: 24000, stock: 22 },
]

const STATUSES = ['pending','confirmed','preparing','shipped','delivered'] as const
const CITIES   = ['Abidjan','Yamoussoukro','Bouaké','San-Pédro','Korhogo']
const NAMES    = ['Konan Yao','Adjoua Bamba','Kouamé Diallo','Aminata Touré','Ibrahim Coulibaly','Fatou Traoré']

async function seed() {
  console.log('Seeding products...')
  await db.insert(products).values(SEED_PRODUCTS).onConflictDoNothing()

  console.log('Seeding orders...')
  const orderData = Array.from({ length: 24 }, (_, i) => {
    const daysAgo = Math.floor(Math.random() * 60)
    const created = new Date(Date.now() - daysAgo * 86400000)
    const status  = STATUSES[Math.floor(Math.random() * STATUSES.length)]
    const items   = [{ productId: (i % 8) + 1, name: SEED_PRODUCTS[i % 8].name, price: SEED_PRODUCTS[i % 8].price, qty: Math.ceil(Math.random() * 2) }]
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)
    return {
      ref:           `AUR-${2026}-${String(i + 1).padStart(4, '0')}`,
      customerName:  NAMES[i % NAMES.length],
      customerPhone: `+225 07 ${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
      customerCity:  CITIES[i % CITIES.length],
      items,
      subtotal,
      deliveryFee:   2000,
      total:         subtotal + 2000,
      status,
      createdAt:     created,
      updatedAt:     created,
    }
  })
  await db.insert(orders).values(orderData).onConflictDoNothing()

  console.log('Done!')
  process.exit(0)
}

seed().catch(console.error)
