export const dynamic = 'force-dynamic'

import { getDashboardStats } from '@/lib/actions'
import { DashboardCharts } from '@/components/admin/DashboardCharts'

const STATUS_LABELS: Record<string, string> = {
  pending:   'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped:   'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
}

const STATUS_COLORS: Record<string, string> = {
  pending:   '#C3A36C',
  confirmed: '#7CA8C4',
  preparing: '#9B8BC2',
  shipped:   '#6CBFA8',
  delivered: '#6CB87C',
  cancelled: '#C47C7C',
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
}

/* ─── KPI Card ─── */
function KpiCard({ label, value, sub, color = 'var(--gold)' }: {
  label: string; value: string; sub?: string; color?: string
}) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      padding: '24px 28px',
      boxShadow: '0 2px 12px rgba(70,60,48,0.06)',
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 36, fontWeight: 500, color: 'var(--ink)', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 8 }}>{sub}</div>}
    </div>
  )
}

/* ─── Top Products Table ─── */
function TopProductsTable({ products }: { products: { name: string; revenue: number; qty: number }[] }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 12px rgba(70,60,48,0.06)' }}>
      <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 20 }}>
        Top produits
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--line)' }}>
            {['Produit', 'Qté vendue', 'Revenus'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '0 0 12px', color: 'var(--ink-soft)', fontWeight: 400, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan={3} style={{ padding: '24px 0', color: 'var(--ink-soft)', textAlign: 'center' }}>Aucune donnée</td></tr>
          ) : products.map((p, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '13px 0', fontFamily: 'var(--font-cormorant), serif', fontSize: 16, color: 'var(--ink)' }}>{p.name}</td>
              <td style={{ padding: '13px 0', color: 'var(--ink-soft)' }}>{p.qty}</td>
              <td style={{ padding: '13px 0', color: 'var(--accent)', fontWeight: 500 }}>{fmt(p.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Status Badges ─── */
function OrderStatusBreakdown({ byStatus }: { byStatus: { status: string | null; count: number }[] }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 12px rgba(70,60,48,0.06)' }}>
      <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 20 }}>
        Commandes par statut
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {byStatus.length === 0 ? (
          <p style={{ color: 'var(--ink-soft)', fontSize: 13 }}>Aucune commande</p>
        ) : byStatus.map((s) => {
          const key = s.status || 'pending'
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: STATUS_COLORS[key] || '#ccc', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--ink)' }}>{STATUS_LABELS[key] || key}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 18, color: 'var(--ink)', fontWeight: 500 }}>{s.count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default async function AdminDashboard() {
  let stats
  try {
    stats = await getDashboardStats()
  } catch {
    // DB non connectée — afficher un état vide propre
    stats = {
      totalRevenue: 0, totalOrders: 0,
      monthRevenue: 0, monthOrders: 0,
      byStatus: [], topProducts: [], revenueChart: [],
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 34, fontWeight: 400, color: 'var(--ink)' }}>
          Tableau de bord
        </h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginTop: 6 }}>
          Vue d&rsquo;ensemble en temps réel — Maison Auréa
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        <KpiCard label="Revenus totaux"     value={fmt(stats.totalRevenue)} sub="Commandes livrées" color="var(--gold)" />
        <KpiCard label="Ce mois"           value={fmt(stats.monthRevenue)} sub={`${stats.monthOrders} commande${stats.monthOrders > 1 ? 's' : ''}`} color="#6CB87C" />
        <KpiCard label="Commandes totales" value={String(stats.totalOrders)} sub="Livrées" color="#7CA8C4" />
        <KpiCard label="Mois en cours"     value={String(stats.monthOrders)} sub="Nouvelles commandes" color="#9B8BC2" />
      </div>

      {/* Charts (Client Component) */}
      <DashboardCharts revenueChart={stats.revenueChart} />

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginTop: 24 }}>
        <TopProductsTable products={stats.topProducts} />
        <OrderStatusBreakdown byStatus={stats.byStatus} />
      </div>
    </div>
  )
}
