import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SplitText } from '@/components/ui/SplitText'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

/* ─── Types ─── */
interface CollectionCard {
  id: string
  name: string
  href: string
  icon: React.ReactNode
}

interface Product {
  id: string
  name: string
  price: string
  img?: string
}

/* ─── Données ─── */
const COLLECTIONS: CollectionCard[] = [
  {
    id: 'art-de-la-table', name: 'Art de la table', href: '/boutique#art-de-la-table',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="24" height="24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/></svg>,
  },
  {
    id: 'verres', name: 'Verres & accessoires', href: '/boutique#verres',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="24" height="24"><path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z"/><path d="M12 14v6M8 21h8"/></svg>,
  },
  {
    id: 'theieres', name: 'Théières & service à thé', href: '/boutique#theieres',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="24" height="24"><path d="M5 11h11a4 4 0 0 1 0 8H8a3 3 0 0 1-3-3v-5Z"/><path d="M16 13h2a2 2 0 0 1 0 4h-1M8 11V8h5v3"/></svg>,
  },
  {
    id: 'cuisine', name: 'Cuisine & cuisson', href: '/boutique#cuisine',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="24" height="24"><path d="M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3Z"/><path d="M2 11h20M9 8V6m6 2V6"/></svg>,
  },
  {
    id: 'coffrets', name: 'Coffrets cadeaux', href: '/boutique#coffrets',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="24" height="24"><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 9h16M12 9v11M12 9c-2-4-6-3-6-1 0 1.5 3.5 1 6 1Zm0 0c2-4 6-3 6-1 0 1.5-3.5 1-6 1Z"/></svg>,
  },
]

const NOUVEAUTES: Product[] = [
  { id: 'nv-1', name: 'Service de table Auréa Élégance', price: '75 000 FCFA', img: '/uploads/PHOTO-2026-06-02-13-06-47.jpg' },
  { id: 'nv-2', name: 'Théière en porcelaine Auréa',    price: '28 000 FCFA' },
  { id: 'nv-3', name: 'Coffret cadeau Auréa',           price: '20 000 FCFA', img: '/uploads/954abb29-2cc7-4bea-9152-0254a1a94cbd.jpg' },
  { id: 'nv-4', name: 'Verres taillés, lot de 6',       price: '32 000 FCFA' },
]

const TRUST = [
  {
    title: 'Paiement sécurisé', sub: '100% sécurisé',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="30" height="30"><path d="M12 3 5 6v5c0 4.4 3 8 7 9 4-1 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>,
  },
  {
    title: 'Livraison rapide', sub: 'Abidjan & intérieur du pays',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="30" height="30"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>,
  },
  {
    title: 'Produits de qualité', sub: 'Sélectionnés avec soin',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="30" height="30"><circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/></svg>,
  },
  {
    title: 'Service client dédié', sub: 'À votre écoute',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="30" height="30"><path d="M5 13v-1a7 7 0 0 1 14 0v1"/><path d="M5 13h2v5H6a2 2 0 0 1-2-2v-3ZM19 13h-2v5h1a2 2 0 0 0 2-2v-3Z"/></svg>,
  },
]

/* ─── Composants locaux ─── */
function Placeholder({ tone = 'light' }: { tone?: 'light' | 'deep' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: tone === 'deep'
        ? 'linear-gradient(135deg, var(--clay), #a07840)'
        : 'linear-gradient(135deg, var(--sand), var(--greige))',
    }} />
  )
}

function SecHead({ title, rule = true, center = true }: { title: string; rule?: boolean; center?: boolean }) {
  return (
    <div style={{
      textAlign: center ? 'center' : 'left',
      padding: 'clamp(56px,9vh,96px) var(--pad) clamp(30px,5vh,48px)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-cinzel), serif',
        fontWeight: 500,
        fontSize: 'clamp(18px,2.4vw,26px)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
      }}>{title}</h2>
      {rule && <div style={{ width: 46, height: 2, background: 'var(--clay)', margin: center ? '16px auto 0' : '16px 0 0' }} />}
    </div>
  )
}

/* ─── Page Accueil ─── */
export default function HomePage() {
  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(14px,2vw,24px) var(--pad) clamp(30px,5vh,56px)' }}>
        <div style={{
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          minHeight: 'clamp(420px,68vh,580px)',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(120deg, var(--greige), var(--sand))',
          isolation: 'isolate',
        }}>
          {/* Photo hero — à remplacer via l'admin */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'linear-gradient(135deg, var(--sand) 0%, var(--greige) 100%)',
          }} />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(95deg, rgba(244,237,225,0.92) 0%, rgba(244,237,225,0.6) 30%, rgba(244,237,225,0.05) 55%, transparent 70%)',
          }} />

          {/* Copy */}
          <div style={{
            position: 'relative', zIndex: 2,
            maxWidth: 'clamp(320px,42vw,520px)',
            padding: 'clamp(28px,5vw,64px)',
          }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: 20 }}>Maison Auréa</span>
            <div style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 400,
              fontSize: 'clamp(34px,4.1vw,54px)',
              lineHeight: 1.08,
              letterSpacing: '-0.005em',
              color: 'var(--ink)',
            }}>
              <SplitText as="h1" trigger="immediate" delay={0.2}>
                L&apos;art de la table et de la décoration intérieure.
              </SplitText>
            </div>
            <p style={{
              marginTop: 24, maxWidth: '34ch',
              color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.7,
            }}>
              Des pièces choisies avec soin pour sublimer vos instants de vie.
            </p>
            <Link href="/boutique" className="btn-gold" style={{ display: 'inline-flex', marginTop: 30 }}>
              Découvrir la collection
            </Link>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginTop: 34,
              fontSize: 12, letterSpacing: '0.1em', color: 'var(--ink-soft)',
            }}>
              <b style={{ color: 'var(--ink)', fontWeight: 500 }}>01</b>
              <span style={{ width: 24, height: 1, background: 'var(--clay)', display: 'block' }} />
              <span>02</span>
              <span>03</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOS COLLECTIONS ── */}
      <SecHead title="Nos collections" />
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        gap: 'clamp(14px,1.6vw,24px)',
        padding: '0 var(--pad) clamp(30px,5vh,56px)',
      }}>
        {COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            href={col.href}
            data-cursor="view"
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
          >
            {/* Image */}
            <div style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: 10,
              overflow: 'hidden',
              background: 'var(--sand)',
              boxShadow: '0 14px 30px rgba(70,60,48,0.08)',
            }}>
              <Placeholder />
            </div>
            {/* Pied */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 4px 4px' }}>
              <span style={{ color: 'var(--accent)', flex: '0 0 auto', marginTop: 2 }}>{col.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '11.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', lineHeight: 1.35 }}>
                  {col.name}
                </span>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 15, color: 'var(--accent)', lineHeight: 1 }}>
                  Découvrir
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ── INSPIRATION ── */}
      <SecHead title="Inspiration Maison Auréa" />
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        gap: 'clamp(12px,1.4vw,20px)',
        padding: '0 var(--pad) clamp(40px,7vh,80px)',
      }}>
        {[0,1,2,3,4].map((i) => (
          <Link
            key={i}
            href="/inspiration"
            data-cursor="view"
            style={{
              position: 'relative',
              display: 'block',
              aspectRatio: '4/5',
              borderRadius: 10,
              overflow: 'hidden',
              background: 'var(--sand)',
            }}
          >
            {i === 0 ? (
              <Image
                src="/uploads/WhatsApp Image 2026-06-02 at 13.14.35.jpeg"
                alt={`Inspiration ${i + 1}`}
                fill
                style={{ objectFit: 'cover', transition: 'transform 1s var(--ease)' }}
              />
            ) : (
              <Placeholder tone={i % 2 === 0 ? 'light' : 'deep'} />
            )}
          </Link>
        ))}
      </section>

      {/* ── NOUVEAUTÉS ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 var(--pad)',
        paddingTop: 'clamp(56px,9vh,96px)',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-cinzel), serif', fontWeight: 500,
            fontSize: 'clamp(18px,2.4vw,26px)', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--ink)', textAlign: 'left',
          }}>Nouveautés</h2>
          <div style={{ width: 46, height: 2, background: 'var(--clay)', marginTop: 16 }} />
        </div>
        <Link href="/nouveautes" style={{
          fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--accent)', transition: 'color 0.3s',
        }}>
          Voir tout
        </Link>
      </div>
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 'clamp(16px,2vw,30px)',
        padding: 'clamp(30px,5vh,48px) var(--pad) clamp(40px,7vh,80px)',
      }}>
        {NOUVEAUTES.map((prod) => (
          <Link
            key={prod.id}
            href="/boutique"
            data-cursor="view"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{
              position: 'relative', aspectRatio: '1/1',
              borderRadius: 10, overflow: 'hidden',
              background: 'var(--sand)', marginBottom: 16,
            }}>
              {prod.img ? (
                <Image src={prod.img} alt={prod.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <Placeholder />
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>
              {prod.name}
            </div>
            <div style={{ fontSize: 13, letterSpacing: '0.08em', color: 'var(--accent)', marginTop: 5 }}>
              {prod.price}
            </div>
          </Link>
        ))}
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{
        margin: 'clamp(70px,11vh,130px) var(--pad) clamp(40px,7vh,80px)',
        background: 'var(--cream)',
        border: '1px solid var(--line)',
        borderRadius: 14,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        alignItems: 'center',
      }}>
        <div style={{ padding: 'clamp(36px,5vw,68px)' }}>
          <h3 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontWeight: 400,
            fontSize: 'clamp(28px,3.6vw,44px)',
            lineHeight: 1.1, color: 'var(--ink)',
          }}>
            L&apos;élégance se vit<br />au quotidien.
          </h3>
          <p style={{ marginTop: 16, color: 'var(--ink-soft)', fontSize: 15, maxWidth: '38ch' }}>
            Recevez nos nouveautés, conseils et inspirations directement dans votre boîte mail.
          </p>
          <NewsletterForm />
        </div>
        {/* Image newsletter */}
        <div style={{ alignSelf: 'stretch', minHeight: 240, position: 'relative' }}>
          <Image
            src="/uploads/954abb29-2cc7-4bea-9152-0254a1a94cbd.jpg"
            alt="Art de vivre Maison Auréa"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: 'var(--sand)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 24,
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(30px,5vh,46px) var(--pad)',
        }}>
          {TRUST.map((item) => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: 'var(--accent)', flex: '0 0 auto' }}>{item.icon}</span>
              <div>
                <h4 style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.35 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: 5, lineHeight: 1.4 }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1080px) {
          section[style*="repeat(5,1fr)"] { grid-template-columns: repeat(3,1fr) !important; }
          section[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          section[style*="repeat(4,1fr)"].trust-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 760px) {
          section[style*="repeat(5,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          section[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          section[style*="1.2fr 0.8fr"] { grid-template-columns: 1fr !important; }
        }
        [data-cursor="view"]:hover img { transform: scale(1.04); }
        [data-cursor="view"] img { transition: transform 1s var(--ease); }
      `}</style>
    </>
  )
}
