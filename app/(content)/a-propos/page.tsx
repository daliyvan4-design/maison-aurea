import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'À propos — Maison Auréa',
  description: 'Découvrez l\'histoire et les valeurs de Maison Auréa, votre spécialiste de l\'art de la table en Côte d\'Ivoire.',
}

const VALUES = [
  { icon: '◈', title: 'Sélection rigoureuse', desc: 'Chaque pièce est choisie pour sa qualité de fabrication, son esthétique et sa durabilité dans le temps.' },
  { icon: '◉', title: 'Livraison soignée', desc: 'Vos commandes sont emballées avec soin pour arriver intactes, que vous soyez à Abidjan ou partout en Côte d\'Ivoire.' },
  { icon: '◆', title: 'Service personnalisé', desc: 'Notre équipe est disponible pour vous conseiller et créer des coffrets cadeaux sur mesure pour chaque occasion.' },
  { icon: '◎', title: 'Art de vivre ivoirien', desc: 'Maison Auréa célèbre l\'élégance du quotidien et l\'art de recevoir, ancrés dans la culture ivoirienne.' },
]

export default function AProposPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) var(--pad) clamp(60px, 7vw, 100px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center',
          maxWidth: 1200, margin: '0 auto',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>
              Notre histoire
            </p>
            <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.05, marginBottom: 28 }}>
              La Maison
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: 20 }}>
              Maison Auréa est née d&apos;une passion pour l&apos;art de la table et d&apos;une conviction : chaque repas, chaque moment de partage mérite d&apos;être sublimé par des objets beaux et bien faits.
            </p>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: 36 }}>
              Fondée à Abidjan, notre maison sélectionne avec soin des pièces en porcelaine fine, en cristal et en matières naturelles pour les foyers ivoiriens qui accordent de l&apos;importance à l&apos;élégance du quotidien.
            </p>
            <Link href="/boutique" style={{
              display: 'inline-block', padding: '14px 36px',
              background: 'var(--gold)', color: '#fff',
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
            }}>
              Découvrir la boutique
            </Link>
          </div>

          {/* Bloc visuel */}
          <div style={{
            aspectRatio: '3/4',
            borderRadius: 10,
            background: 'linear-gradient(145deg, var(--greige) 0%, var(--sand) 60%, var(--cream) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.1em', color: 'var(--ink)', opacity: 0.15, lineHeight: 1 }}>
                MAISON<br/>AURÉA
              </div>
            </div>
            <div style={{
              position: 'absolute', bottom: 28, left: 28, right: 28,
              padding: '20px 24px', background: 'rgba(244,237,225,0.85)',
              backdropFilter: 'blur(8px)', borderRadius: 8,
              border: '1px solid var(--line)',
            }}>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 17, color: 'var(--ink)', lineHeight: 1.5 }}>
                &ldquo;L&apos;art de vivre au quotidien, une pièce à la fois.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) var(--pad)',
          background: 'var(--cream)', borderTop: '1px solid var(--line)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
              Ce qui nous guide
            </p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: 'var(--ink)' }}>
              Nos valeurs
            </h2>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 24, maxWidth: 1000, margin: '0 auto',
          }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{
                padding: '32px 28px', background: '#fff',
                borderRadius: 10, border: '1px solid var(--line)',
              }}>
                <div style={{ fontSize: 28, color: 'var(--gold)', marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, color: 'var(--ink)', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) var(--pad)',
          textAlign: 'center', borderTop: '1px solid var(--line)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: 'var(--ink)', marginBottom: 16 }}>
            Une question ? Un projet ?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 32 }}>
            Notre équipe est à votre disposition du lundi au samedi, 9h à 18h.
          </p>
          <Link href="/contact" style={{
            display: 'inline-block', padding: '14px 40px',
            border: '1px solid var(--ink)', color: 'var(--ink)',
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
            transition: 'all 0.3s',
          }}>
            Nous contacter
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
