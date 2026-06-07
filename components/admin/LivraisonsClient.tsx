'use client'

import { useTransition } from 'react'
import { updateOrderStatus } from '@/lib/actions'
import type { Order } from '@/lib/db/schema'

const STEPS = [
  { key: 'confirmed', label: 'Confirmée' },
  { key: 'preparing', label: 'Préparation' },
  { key: 'shipped',   label: 'Expédiée' },
  { key: 'delivered', label: 'Livrée' },
]

const STATUS_ORDER = ['confirmed', 'preparing', 'shipped', 'delivered']

function DeliveryProgress({ status }: { status: string }) {
  const idx = STATUS_ORDER.indexOf(status)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STEPS.map((step, i) => {
        const done    = i <= idx
        const current = i === idx
        return (
          <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: done ? 'var(--gold)' : 'var(--line)',
                border: current ? '2px solid var(--gold-dark)' : '2px solid transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: done ? '#fff' : 'var(--ink-soft)',
                transition: 'all 0.3s',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: done ? 'var(--gold-dark)' : 'var(--ink-soft)',
                marginTop: 4, whiteSpace: 'nowrap',
              }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 40, height: 2,
                background: i < idx ? 'var(--gold)' : 'var(--line)',
                margin: '0 4px', marginBottom: 18,
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function DeliveryCard({ order }: { order: Order }) {
  const [isPending, startTransition] = useTransition()
  const currentIdx = STATUS_ORDER.indexOf(order.status || 'confirmed')
  const nextStatus = STATUS_ORDER[currentIdx + 1] as Order['status'] | undefined
  const nextLabel  = nextStatus ? STEPS[currentIdx + 1]?.label : null

  const advance = () => {
    if (!nextStatus) return
    startTransition(() => updateOrderStatus(order.id, nextStatus))
  }

  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '22px 28px',
      boxShadow: '0 2px 12px rgba(70,60,48,0.06)',
      display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, alignItems: 'center' }}>
        {/* Infos commande */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>
              {order.ref}
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : '—'}
            </span>
          </div>
          <div style={{ fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{order.customerName}</div>
          <div style={{ color: 'var(--ink-soft)', fontSize: 13 }}>{order.customerCity}</div>
          {order.customerPhone && (
            <div style={{ color: 'var(--ink-soft)', fontSize: 12, marginTop: 2 }}>{order.customerPhone}</div>
          )}
          <div style={{ marginTop: 10, color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>
            {new Intl.NumberFormat('fr-FR').format(order.total)} FCFA
          </div>
        </div>

        {/* Stepper */}
        <div>
          <div style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', marginBottom: 14,
          }}>
            Progression
          </div>
          <DeliveryProgress status={order.status || 'confirmed'} />
        </div>
      </div>

      {/* Bouton avancer */}
      <div>
        {nextLabel ? (
          <button
            onClick={advance}
            disabled={isPending}
            style={{
              padding: '10px 20px', borderRadius: 6,
              background: isPending ? 'var(--greige)' : 'var(--gold)',
              color: '#fff', border: 'none', cursor: isPending ? 'default' : 'pointer',
              fontSize: 12, letterSpacing: '0.08em', whiteSpace: 'nowrap',
              opacity: isPending ? 0.7 : 1, transition: 'all 0.15s',
            }}
          >
            {isPending ? '...' : `→ ${nextLabel}`}
          </button>
        ) : (
          <span style={{
            padding: '10px 20px', borderRadius: 6,
            background: '#6CB87C22', color: '#6CB87C',
            fontSize: 12, letterSpacing: '0.08em', whiteSpace: 'nowrap',
          }}>
            Livrée ✓
          </span>
        )}
      </div>
    </div>
  )
}

export function LivraisonsClient({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div style={{
        background: '#fff', borderRadius: 14, padding: 48,
        textAlign: 'center', color: 'var(--ink-soft)',
      }}>
        Aucune livraison — connectez la base Neon.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {orders.map(o => <DeliveryCard key={o.id} order={o} />)}
    </div>
  )
}
