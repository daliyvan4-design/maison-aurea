export const dynamic = 'force-dynamic'

import { getSalesInsights, getDashboardStats } from '@/lib/actions'
import { VentesCharts } from '@/components/admin/VentesCharts'

function fmt(n: number) { return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA' }

export default async function VentesPage() {
  let insights = { monthlyChart: [], byCity: [] } as Awaited<ReturnType<typeof getSalesInsights>>
  let stats    = { topProducts: [], totalRevenue: 0, totalOrders: 0 } as Partial<Awaited<ReturnType<typeof getDashboardStats>>>

  try {
    ;[insights, stats] = await Promise.all([getSalesInsights(), getDashboardStats()])
  } catch {}

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 34, fontWeight: 400, color: 'var(--ink)' }}>Ventes</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 6 }}>Analyse des performances commerciales</p>
      </div>

      {/* Charts Recharts (Client) */}
      <VentesCharts
        monthlyChart={insights.monthlyChart}
        byCity={insights.byCity}
        topProducts={stats?.topProducts ?? []}
      />

      {/* Résumé textuel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 12px rgba(70,60,48,0.06)' }}>
          <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 20 }}>
            Revenus par ville
          </h3>
          {insights.byCity.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)', fontSize: 13 }}>Aucune donnée</p>
          ) : insights.byCity.map((c, i) => (
            <div key={c.city} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 11, color: 'var(--ink-soft)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--ink)', fontSize: 14 }}>{c.city}</span>
              </div>
              <span style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 13 }}>{fmt(c.revenue)}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 12px rgba(70,60,48,0.06)' }}>
          <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 20 }}>
            Top produits
          </h3>
          {(stats?.topProducts ?? []).length === 0 ? (
            <p style={{ color: 'var(--ink-soft)', fontSize: 13 }}>Aucune donnée</p>
          ) : (stats.topProducts ?? []).map((p, i) => (
            <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 11, color: 'var(--ink-soft)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--ink)', fontSize: 13, maxWidth: 200 }}>{p.name}</span>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: 'var(--accent)', fontWeight: 500, fontSize: 13 }}>{fmt(p.revenue)}</div>
                <div style={{ color: 'var(--ink-soft)', fontSize: 11, marginTop: 2 }}>{p.qty} vente{p.qty > 1 ? 's' : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
