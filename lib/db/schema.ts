import {
  pgTable, serial, text, integer, numeric, timestamp,
  pgEnum, jsonb, boolean,
} from 'drizzle-orm/pg-core'

/* ─── Enums ─── */
export const categoryEnum = pgEnum('category', [
  'art-de-la-table',
  'verres',
  'theieres',
  'cuisine',
  'coffrets',
])

export const orderStatusEnum = pgEnum('order_status', [
  'pending',      // reçue
  'confirmed',    // confirmée
  'preparing',    // en préparation
  'shipped',      // expédiée
  'delivered',    // livrée
  'cancelled',    // annulée
])

export const deliveryStatusEnum = pgEnum('delivery_status', [
  'pending',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
])

/* ─── Tables ─── */

export const products = pgTable('products', {
  id:          serial('id').primaryKey(),
  name:        text('name').notNull(),
  slug:        text('slug').notNull().unique(),
  category:    categoryEnum('category').notNull(),
  price:       integer('price').notNull(),           // en FCFA
  description: text('description'),
  images:      jsonb('images').$type<string[]>().default([]),
  stock:       integer('stock').notNull().default(0),
  featured:    boolean('featured').default(false),
  active:      boolean('active').default(true),
  createdAt:   timestamp('created_at').defaultNow(),
  updatedAt:   timestamp('updated_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id:            serial('id').primaryKey(),
  ref:           text('ref').notNull().unique(),     // ex: AUR-2026-0042
  customerName:  text('customer_name').notNull(),
  customerEmail: text('customer_email'),
  customerPhone: text('customer_phone'),
  customerCity:  text('customer_city').default('Abidjan'),
  items:         jsonb('items').$type<OrderItem[]>().notNull(),
  subtotal:      integer('subtotal').notNull(),      // en FCFA
  deliveryFee:   integer('delivery_fee').default(0),
  total:         integer('total').notNull(),
  status:        orderStatusEnum('status').default('pending'),
  notes:         text('notes'),
  createdAt:     timestamp('created_at').defaultNow(),
  updatedAt:     timestamp('updated_at').defaultNow(),
})

export const deliveries = pgTable('deliveries', {
  id:              serial('id').primaryKey(),
  orderId:         integer('order_id').references(() => orders.id).notNull(),
  address:         text('address').notNull(),
  city:            text('city').default('Abidjan'),
  zone:            text('zone'),                     // ex: Cocody, Plateau
  trackingNumber:  text('tracking_number'),
  carrier:         text('carrier'),
  status:          deliveryStatusEnum('status').default('pending'),
  estimatedDate:   timestamp('estimated_date'),
  deliveredAt:     timestamp('delivered_at'),
  notes:           text('notes'),
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
})

/* ─── Types déduits ─── */
export type Product   = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type Order     = typeof orders.$inferSelect
export type NewOrder  = typeof orders.$inferInsert
export type Delivery  = typeof deliveries.$inferSelect

export interface OrderItem {
  productId: number
  name:      string
  price:     number
  qty:       number
  image?:    string
}
