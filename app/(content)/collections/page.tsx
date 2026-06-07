import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Collections — Maison Auréa',
  description: 'Explorez nos collections thématiques de vaisselle et art de la table.',
}

const COLLECTIONS = [
  {
    id: 'art-de-la-table',
    label: 'Art de la table',
    sub: 'Services complets, assiettes, plats de présentation',
    href: '/boutique#art-de-la-table',
    accent: '#C3A36C',
    span: 2,
  },
  {
    id: 'verres',
    label: 'Verres & accessoires',
    sub: 'Carafes, coupes, verres taillés',
    href: '/boutique#verres',
    accent: '#7CA8C4',
    span: 1,
  },
  {
    id: 'theieres',
    label: 'Théières & service à thé',
    sub: 'Théières en porcelaine, tasses, plateaux',
    href: '/boutique#theieres',
    accent: '#9B8BC2',
    span: 1,
  },
  {
    id: 'cuisine',
    label: 'Cuisine & cuisson',
    sub: 'Cocottes, poêles, ustensiles de qualité',
    href: '/boutique#cuisine',
    accent: '#C47C7C',
    span: 1,
  },
  {
    id: 'coffrets',
    label: 'Coffrets cadeaux',
    sub: 'Idées cadeaux raffinées, emballage élégant',
    href: '/boutique#coffrets',
    accent: '#6CB87C',
    span: 1,
  },
]

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) var(--pad) clamp(40px, 5vw, 60px)',
          textAlign: 'center',
          borderBottom: '1px solid var(--line)',
        }}>
          <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>
            Maison Auréa
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginBottom: 24 }}>
            Nos Collections
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto' }}>
            Chaque collection est pensée pour créer une harmonie entre esthétique et fonctionnalité, pour sublimer chaque instant de votre quotidien.
          </p>
        </section>

        {/* Grille collections */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) var(--pad)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            maxWidth: 1100,
            margin: '0 auto',
          }}>
            {COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={col.href}
                style={{
                  gridColumn: col.span === 2 ? '1 / -1' : 'span 1',
                  display: 'block',
                  position: 'relative',
                  borderRadius: 10,
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${col.accent}18 0%, ${col.accent}08 100%)`,
                  border: `1px solid ${col.accent}30`,
                  padding: col.span === 2 ? 'clamp(48px, 5vw, 72px)' : 'clamp(36px, 4vw, 56px)',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s',
                  textDecoration: 'none',
                }}
                className="col-card"
              >
                <div style={{
                  display: 'inline-block',
                  width: 36, height: 2,
                  background: col.accent,
                  marginBottom: 24,
                }}/>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: col.span === 2 ? 'clamp(28px, 3vw, 42px)' : 'clamp(22px, 2.5vw, 32px)',
                  fontWeight: 300, color: 'var(--ink)',
                  marginBottom: 12, lineHeight: 1.1,
                }}>
                  {col.label}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 28 }}>
                  {col.sub}
                </p>
                <span style={{
                  fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: col.accent, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  Explorer
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) var(--pad)',
          background: 'var(--cream)',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(20px, 2.5vw, 28px)', color: 'var(--ink)', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.6 }}>
            &ldquo;Chaque pièce est choisie pour sa beauté, sa durabilité et l&apos;émotion qu&apos;elle suscite au quotidien.&rdquo;
          </p>
          <Link href="/boutique" style={{
            display: 'inline-block', padding: '14px 40px',
            background: 'var(--gold)', color: '#fff',
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
          }}>
            Voir tous les produits
          </Link>
        </section>
      </main>
      <Footer />
      <style>{`.col-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(70,60,48,0.1); }`}</style>
    </>
  )
}
