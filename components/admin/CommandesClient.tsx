'use client'

import { useState, useTransition } from 'react'
import { updateOrderStatus } from '@/lib/actions'
import type { Order } from '@/lib/db/schema'

const STATUSES = [
  { value: 'pending',   label: 'En attente',       color: '#C3A36C' },
  { value: 'confirmed', label: 'Confirmée',         color: '#7CA8C4' },
  { value: 'preparing', label: 'En préparation',    color: '#9B8BC2' },
  { value: 'shipped',   label: 'Expédiée',          color: '#6CBFA8' },
  { value: 'delivered', label: 'Livrée',            color: '#6CB87C' },
  { value: 'cancelled', label: 'Annulée',           color: '#C47C7C' },
]

function StatusBadge({ status }: { status: string }) {
  const s = STATUSES.find(x => x.value === status) || STATUSES[0]
  return (
    <span style={{
      padding: '4px 12px', borderRadius: 20, fontSize: 11,
      background: `${s.color}22`, color: s.color,
      letterSpacing: '0.06em', fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      {s.label}
    </span>
  )
}

function fmt(n: number) { return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA' }

export function CommandesClient({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Order | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const changeStatus = (id: number, status: Order['status']) => {
    startTransition(async () => {
      await updateOrderStatus(id, status)
      if (selected?.id === id) setSelected(o => o ? { ...o, status } : null)
    })
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
      {/* Table */}
      <div>
        {/* Filtre statuts */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('all')} style={{
            padding: '7px 16px', borderRadius: 20, border: '1px solid',
            borderColor: filter === 'all' ? 'var(--gold)' : 'var(--line)',
            background: filter === 'all' ? 'var(--gold)' : '#fff',
            color: filter === 'all' ? '#fff' : 'var(--ink)',
            fontSize: 11, cursor: 'pointer', letterSpacing: '0.06em',
          }}>Toutes</button>
          {STATUSES.map(s => (
            <button key={s.value} onClick={() => setFilter(s.value)} style={{
              padding: '7px 16px', borderRadius: 20, border: '1px solid',
              borderColor: filter === s.value ? s.color : 'var(--line)',
              background: filter === s.value ? `${s.color}22` : '#fff',
              color: filter === s.value ? s.color : 'var(--ink-soft)',
              fontSize: 11, cursor: 'pointer', letterSpacing: '0.06em',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(70,60,48,0.06)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--line)', background: '#FAFAF8' }}>
                {['Réf.', 'Client', 'Ville', 'Total', 'Date', 'Statut'].map(h => (
                  <th key={h} style={{
                    padding: '14px 18px', textAlign: 'left',
                    fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--ink-soft)', fontWeight: 500,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: 'var(--ink-soft)' }}>
                    Aucune commande — connectez la base Neon.
                  </td>
                </tr>
              ) : filtered.map(o => (
                <tr
                  key={o.id}
                  onClick={() => setSelected(selected?.id === o.id ? null : o)}
                  style={{
                    borderBottom: '1px solid var(--line)',
                    cursor: 'pointer',
                    background: selected?.id === o.id ? '#FBF6EE' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-cinzel), serif', fontSize: 12, color: 'var(--accent)' }}>{o.ref}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 500 }}>{o.customerName}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--ink-soft)' }}>{o.customerCity}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--accent)' }}>{fmt(o.total)}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--ink-soft)', fontSize: 12 }}>
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td style={{ padding: '14px 18px' }}><StatusBadge status={o.status || 'pending'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panneau détail */}
      {selected && (
        <div style={{
          background: '#fff', borderRadius: 14, padding: 28,
          boxShadow: '0 2px 12px rgba(70,60,48,0.06)',
          alignSelf: 'start', position: 'sticky', top: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 22, color: 'var(--ink)' }}>{selected.ref}</h3>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--ink-soft)' }}>✕</button>
          </div>

          {/* Infos client */}
          <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 10 }}>Client</div>
            <div style={{ fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{selected.customerName}</div>
            {selected.customerPhone && <div style={{ color: 'var(--ink-soft)', fontSize: 13 }}>{selected.customerPhone}</div>}
            {selected.customerEmail && <div style={{ color: 'var(--ink-soft)', fontSize: 13 }}>{selected.customerEmail}</div>}
            <div style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 4 }}>{selected.customerCity}</div>
          </div>

          {/* Articles */}
          <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 10 }}>Articles</div>
            {(selected.items as Array<{ name: string; price: number; qty: number }>).map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'var(--ink)', fontSize: 13 }}>{item.name} ×{item.qty}</span>
                <span style={{ color: 'var(--accent)', fontSize: 13 }}>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line)', marginTop: 8, fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: 'var(--accent)' }}>{fmt(selected.total)}</span>
            </div>
          </div>

          {/* Changer statut */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 12 }}>Changer le statut</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STATUSES.map(s => (
                <button
                  key={s.value}
                  onClick={() => changeStatus(selected.id, s.value as Order['status'])}
                  disabled={isPending || selected.status === s.value}
                  style={{
                    padding: '10px 16px', borderRadius: 6, border: '1px solid',
                    borderColor: selected.status === s.value ? s.color : 'var(--line)',
                    background: selected.status === s.value ? `${s.color}22` : '#fff',
                    color: selected.status === s.value ? s.color : 'var(--ink-soft)',
                    fontSize: 12, cursor: selected.status === s.value ? 'default' : 'pointer',
                    textAlign: 'left', fontFamily: 'inherit',
                    opacity: isPending ? 0.6 : 1, transition: 'all 0.15s',
                  }}
                >
                  {selected.status === s.value ? '✓ ' : ''}{s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
