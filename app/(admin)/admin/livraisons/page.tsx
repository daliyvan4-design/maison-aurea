export const dynamic = 'force-dynamic'

import { getOrders } from '@/lib/actions'
import { LivraisonsClient } from '@/components/admin/LivraisonsClient'

export default async function LivraisonsPage() {
  let orders: Awaited<ReturnType<typeof getOrders>> = []
  try { orders = await getOrders(100) } catch {}

  const shipped = orders.filter(o => ['confirmed','preparing','shipped','delivered'].includes(o.status || ''))

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 34, fontWeight: 400, color: 'var(--ink)' }}>Livraisons</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 6 }}>{shipped.length} livraison{shipped.length !== 1 ? 's' : ''} en cours ou effectuées</p>
      </div>
      <LivraisonsClient orders={shipped} />
    </div>
  )
}
