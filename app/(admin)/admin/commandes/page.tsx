export const dynamic = 'force-dynamic'

import { getOrders } from '@/lib/actions'
import { CommandesClient } from '@/components/admin/CommandesClient'

export default async function CommandesPage() {
  let orders: Awaited<ReturnType<typeof getOrders>> = []
  try { orders = await getOrders() } catch {}

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 34, fontWeight: 400, color: 'var(--ink)' }}>Commandes</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 6 }}>{orders.length} commande{orders.length !== 1 ? 's' : ''}</p>
      </div>
      <CommandesClient orders={orders} />
    </div>
  )
}
