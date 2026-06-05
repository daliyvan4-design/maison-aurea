'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts'

interface Props {
  revenueChart: { date: string; revenue: number }[]
}

const MOCK: { date: string; revenue: number }[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(Date.now() - (13 - i) * 86400000)
  return {
    date: d.toISOString().slice(5, 10), // MM-DD
    revenue: Math.floor(Math.random() * 280000 + 40000),
  }
})

function fmtK(v: number) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
}

const COLORS = { area: '#C3A36C', bar: '#B58A4F', grid: '#EAE0CF' }

export function DashboardCharts({ revenueChart }: Props) {
  const data = revenueChart.length > 0 ? revenueChart : MOCK
  const formatted = data.map(d => ({ ...d, rev: Math.round(d.revenue / 1000) }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 8 }}>
      {/* Revenus 30 jours — Area chart */}
      <div style={{
        background: '#fff', borderRadius: 14, padding: '24px 28px',
        boxShadow: '0 2px 12px rgba(70,60,48,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            Revenus — 30 jours
          </h3>
          <span style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>
            en milliers FCFA
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={formatted} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={COLORS.area} stopOpacity={0.25} />
                <stop offset="95%" stopColor={COLORS.area} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#8C7E6B' }}
              tickLine={false} axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tickFormatter={fmtK}
              tick={{ fontSize: 11, fill: '#8C7E6B' }}
              tickLine={false} axisLine={false}
            />
            <Tooltip
              formatter={(v) => [`${v}k FCFA`, 'Revenus']}
              contentStyle={{ border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, color: 'var(--ink)' }}
              cursor={{ stroke: COLORS.area, strokeWidth: 1 }}
            />
            <Area
              type="monotone" dataKey="rev"
              stroke={COLORS.area} strokeWidth={2}
              fill="url(#goldGrad)"
              dot={false} activeDot={{ r: 4, fill: COLORS.area }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — volume */}
      <div style={{
        background: '#fff', borderRadius: 14, padding: '24px 28px',
        boxShadow: '0 2px 12px rgba(70,60,48,0.06)',
      }}>
        <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 24 }}>
          Volume quotidien
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={formatted} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#8C7E6B' }}
              tickLine={false} axisLine={false}
              interval={2}
            />
            <YAxis
              tickFormatter={fmtK}
              tick={{ fontSize: 11, fill: '#8C7E6B' }}
              tickLine={false} axisLine={false}
            />
            <Tooltip
              formatter={(v) => [`${v}k FCFA`, 'Revenus']}
              contentStyle={{ border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="rev" fill={COLORS.bar} radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
