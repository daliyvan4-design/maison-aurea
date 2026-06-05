export const dynamic = 'force-dynamic'

import { getProducts } from '@/lib/actions'
import { ProductsClient } from '@/components/admin/ProductsClient'

export default async function ProduitsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try { products = await getProducts() } catch {}

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 34, fontWeight: 400, color: 'var(--ink)' }}>Produits</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 6 }}>{products.length} article{products.length !== 1 ? 's' : ''} au catalogue</p>
        </div>
      </div>
      <ProductsClient products={products} />
    </div>
  )
}
