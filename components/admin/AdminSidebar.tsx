'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin',           label: 'Tableau de bord', icon: '◈' },
  { href: '/admin/produits',  label: 'Produits',        icon: '▣' },
  { href: '/admin/commandes', label: 'Commandes',       icon: '◉' },
  { href: '/admin/livraisons',label: 'Livraisons',      icon: '◎' },
  { href: '/admin/ventes',    label: 'Ventes',          icon: '◆' },
]

export function AdminSidebar() {
  const path = usePathname()

  return (
    <aside style={{
      width: 230,
      minHeight: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '28px 24px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
            <Image src="/logo-mark.png" alt="" fill style={{ objectFit: 'contain', filter: 'brightness(10)' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 13, letterSpacing: '0.2em', color: '#fff', fontWeight: 500 }}>
              AURÉA
            </div>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              ADMIN
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {NAV.map((item) => {
          const active = path === item.href || (item.href !== '/admin' && path.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 14px',
                borderRadius: 8,
                marginBottom: 4,
                fontSize: 13,
                letterSpacing: '0.04em',
                color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(195,163,108,0.18)' : 'transparent',
                borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 16, opacity: active ? 1 : 0.6 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Lien retour site */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link
          href="/"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 8,
            fontSize: 12, color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          ← Voir le site
        </Link>
      </div>
    </aside>
  )
}
