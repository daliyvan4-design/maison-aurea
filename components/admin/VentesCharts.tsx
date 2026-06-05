'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'

const MOCK_MONTHLY = [
  { month: '2026-01', revenue: 820000,  count: 12 },
  { month: '2026-02', revenue: 1140000, count: 17 },
  { month: '2026-03', revenue: 960000,  count: 14 },
  { month: '2026-04', revenue: 1380000, count: 20 },
  { month: '2026-05', revenue: 1620000, count: 24 },
  { month: '2026-06', revenue: 890000,  count: 13 },
]

const MOCK_CITIES = [
  { city: 'Abidjan',       revenue: 4200000 },
  { city: 'Yamoussoukro', revenue: 680000 },
  { city: 'Bouaké',        revenue: 420000 },
  { city: 'San-Pédro',     revenue: 310000 },
  { city: 'Korhogo',       revenue: 200000 },
]

const MOCK_PRODUCTS = [
  { name: 'Service Auréa Élégance', revenue: 1800000, qty: 24 },
  { name: 'Théière porcelaine',     revenue: 980000,  qty: 35 },
  { name: 'Coffret cadeau',         revenue: 760000,  qty: 38 },
  { name: 'Verres taillés lot 6',   revenue: 640000,  qty: 20 },
  { name: 'Cocotte fonte',          revenue: 520000,  qty: 10 },
]

const PIE_COLORS = ['#C3A36C','#7CA8C4','#9B8BC2','#6CBFA8','#C47C7C']

function fmtK(v: number) { return `${Math.round(v / 1000)}k` }

interface Props {
  monthlyChart: { month: string; revenue: number; count: number }[]
  byCity:       { city: string; revenue: number }[]
  topProducts:  { name: string; revenue: number; qty: number }[]
}

export function VentesCharts({ monthlyChart, byCity, topProducts }: Props) {
  const monthly  = monthlyChart.length  > 0 ? monthlyChart  : MOCK_MONTHLY
  const cities   = byCity.length        > 0 ? byCity        : MOCK_CITIES
  const products = topProducts.length   > 0 ? topProducts   : MOCK_PRODUCTS

  const monthlyFmt = monthly.map(m => ({
    ...m,
    label:   m.month.slice(0, 7),
    revK:    Math.round(m.revenue / 1000),
  }))

  const totalCityRev = cities.reduce((s, c) => s + c.revenue, 0)
  const cityPie = cities.map(c => ({ name: c.city, value: Math.round(c.revenue / totalCityRev * 100) }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
      {/* Revenus 12 mois — Line chart */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 12px rgba(70,60,48,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            Revenus mensuels — 12 mois
          </h3>
          <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>en milliers FCFA</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyFmt} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE0CF" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#8C7E6B' }} tickLine={false} axisLine={false} />
            <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fill: '#8C7E6B' }} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(v) => [`${v}k FCFA`, 'Revenus']}
              contentStyle={{ border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }}
            />
            <Line
              type="monotone" dataKey="revK"
              stroke="#C3A36C" strokeWidth={2.5}
              dot={{ fill: '#C3A36C', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Répartition par ville — Pie chart */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 12px rgba(70,60,48,0.06)' }}>
        <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 24 }}>
          Ventes par ville
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={cityPie}
              cx="50%" cy="50%"
              innerRadius={60} outerRadius={90}
              dataKey="value"
              label={({ name, value }) => `${name} ${value}%`}
              labelLine={false}
            >
              {cityPie.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => [`${v}%`, 'Part']} contentStyle={{ border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
