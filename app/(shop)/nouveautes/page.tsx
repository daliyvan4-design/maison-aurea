export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getProducts } from '@/lib/actions'

export const metadata = {
  title: 'Nouveautés — Maison Auréa',
  description: 'Découvrez les dernières pièces ajoutées à notre collection.',
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
}

export default async function NouveautesPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try { products = await getProducts() } catch {}

  const recent = products.filter(p => p.active).slice(0, 12)

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
            Arrivages
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginBottom: 24 }}>
            Nouveautés
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto' }}>
            Les dernières pièces sélectionnées pour enrichir votre quotidien
          </p>
        </section>

        {/* Grille */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) var(--pad)' }}>
          {recent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-soft)' }}>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 24 }}>Bientôt disponible</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'clamp(28px, 3vw, 44px) clamp(16px, 2vw, 28px)',
            }}>
              {recent.map((p, i) => {
                const images = p.images as string[]
                return (
                  <Link key={p.id} href={`/produit/${p.slug}`} style={{ display: 'block' }}>
                    <article>
                      <div data-cursor="view" style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 6, overflow: 'hidden', background: 'var(--sand)', marginBottom: 18 }}>
                        {images?.[0] ? (
                          <Image src={images[0]} alt={p.name} fill style={{ objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' }} className="hover-zoom" />
                        ) : (
                          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, var(--greige) 0%, var(--sand) 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 36, opacity: 0.25, color: 'var(--ink)' }}>◈</span>
                          </div>
                        )}
                        {i < 4 && (
                          <span style={{ position: 'absolute', top: 14, left: 14, padding: '4px 10px', borderRadius: 3, background: 'var(--gold)', color: '#fff', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                            Nouveau
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 19, fontWeight: 400, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2 }}>{p.name}</h3>
                      <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>{fmt(p.price)}</p>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(40px, 5vw, 60px) var(--pad)', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
          <Link href="/boutique" style={{
            display: 'inline-block', padding: '14px 40px',
            border: '1px solid var(--ink)', color: 'var(--ink)',
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
            transition: 'all 0.3s',
          }}>
            Voir toute la boutique
          </Link>
        </section>
      </main>
      <Footer />
      <style>{`.hover-zoom:hover { transform: scale(1.04); }`}</style>
    </>
  )
}
