import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{
        minHeight: '70vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--pad)',
        textAlign: 'center',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontSize: 'clamp(60px, 10vw, 120px)',
            fontWeight: 400, color: 'var(--greige)',
            lineHeight: 1, marginBottom: 24,
            letterSpacing: '0.1em',
          }}>
            404
          </p>
          <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>
            Page introuvable
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 300, color: 'var(--ink)',
            marginBottom: 20, lineHeight: 1.1,
          }}>
            Cette page n&apos;existe pas
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.7 }}>
            La page que vous cherchez a peut-être été déplacée ou supprimée. Retournez à l&apos;accueil pour continuer votre navigation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              padding: '13px 32px', background: 'var(--gold)', color: '#fff',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              borderRadius: 3,
            }}>
              Accueil
            </Link>
            <Link href="/boutique" style={{
              padding: '13px 32px', border: '1px solid var(--ink)', color: 'var(--ink)',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              borderRadius: 3,
            }}>
              La boutique
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
