import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata: Metadata = { title: 'Admin — Maison Auréa' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F4EF', fontFamily: 'var(--font-jost), system-ui, sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflow: 'auto', padding: 'clamp(24px, 3vw, 40px)' }}>
        {children}
      </main>
    </div>
  )
}
