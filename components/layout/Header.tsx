'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUIStore } from '@/lib/store'

const NAV = [
  { label: 'Accueil',     href: '/' },
  { label: 'Boutique',    href: '/boutique' },
  {
    label: 'Collections', href: '/collections',
    drop: [
      { label: 'Art de la table',          href: '/boutique#art-de-la-table' },
      { label: 'Verres & accessoires',     href: '/boutique#verres' },
      { label: 'Théières & service à thé', href: '/boutique#theieres' },
      { label: 'Cuisine & cuisson',        href: '/boutique#cuisine' },
      { label: 'Coffrets cadeaux',         href: '/boutique#coffrets' },
    ],
  },
  { label: 'Nouveautés',  href: '/nouveautes' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'À propos',    href: '/a-propos' },
  { label: 'Contact',     href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const openCart = useUIStore((s) => s.openCart)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 8000,
      background: scrolled ? 'rgba(244,237,225,0.92)' : 'var(--paper)',
      borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'border-color 0.4s var(--ease), background 0.4s var(--ease)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '14px var(--pad)',
      }}>
        {/* Logo */}
        <Link href="/" aria-label="Maison Auréa" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: 1,
          flex: '0 0 auto',
          gap: 4,
          textDecoration: 'none',
        }}>
          <div style={{ position: 'relative', width: 34, height: 34 }}>
            <Image src="/logo-mark.png" alt="Maison Auréa" fill style={{ objectFit: 'contain' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: '0.22em',
            color: 'var(--ink)',
          }}>
            MAISON AURÉA
          </span>
          <span style={{
            fontSize: '8.5px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
          }}>
            L&apos;art de vivre au quotidien
          </span>
        </Link>

        {/* Nav principale */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(16px, 2vw, 30px)',
          margin: '0 auto',
        }}>
          {NAV.map((item) =>
            item.drop ? (
              <div key={item.label} style={{ position: 'relative' }} className="has-drop">
                <Link
                  href={item.href}
                  style={{
                    fontSize: '12.5px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '6px 0',
                    transition: 'color 0.3s var(--ease)',
                  }}
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
                <div className="drop" style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(8px)',
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  padding: 10,
                  minWidth: 236,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  boxShadow: '0 22px 50px rgba(70,60,48,.16)',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.3s var(--ease), transform 0.3s var(--ease)',
                  zIndex: 30,
                }}>
                  {item.drop.map((d) => (
                    <Link
                      key={d.label}
                      href={d.href}
                      style={{
                        fontSize: 12,
                        letterSpacing: '0.06em',
                        padding: '9px 12px',
                        borderRadius: 5,
                        color: 'var(--ink)',
                        display: 'block',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontSize: '12.5px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  padding: '6px 0',
                  transition: 'color 0.3s var(--ease)',
                }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Icônes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: '0 0 auto' }}>
          {/* Recherche */}
          <button aria-label="Recherche" style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink)', display: 'flex', transition: 'color 0.3s',
          }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
          </button>

          {/* Panier */}
          <button
            aria-label="Panier"
            onClick={openCart}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--ink)', display: 'flex', position: 'relative',
              transition: 'color 0.3s',
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span style={{
              position: 'absolute', top: -7, right: -9,
              minWidth: 16, height: 16, padding: '0 4px',
              borderRadius: 8, background: 'var(--gold)', color: '#fff',
              fontSize: '9.5px', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              0
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .has-drop:hover .drop {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translateX(-50%) translateY(4px) !important;
        }
        header a:hover { color: var(--accent) !important; }
        .drop a:hover { background: var(--sand) !important; color: var(--accent) !important; }
        @media (max-width: 760px) {
          header nav { display: none !important; }
        }
      `}</style>
    </header>
  )
}
