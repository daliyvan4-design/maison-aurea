import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Inspiration — Maison Auréa',
  description: 'Laissez-vous inspirer par nos suggestions de mise en scène et art de vivre.',
}

const THEMES = [
  {
    title: 'Le repas du dimanche',
    sub: 'Art de la table',
    desc: 'Un service complet en porcelaine fine, des verres taillés qui captent la lumière, et une nappe en lin naturel pour un déjeuner familial mémorable.',
    color: '#C3A36C',
    href: '/boutique#art-de-la-table',
  },
  {
    title: 'L\'heure du thé',
    sub: 'Théières & tasses',
    desc: 'Une théière en porcelaine blanche, un plateau en bois d\'acacia et des tasses assorties pour transformer votre pause en cérémonie.',
    color: '#9B8BC2',
    href: '/boutique#theieres',
  },
  {
    title: 'Cadeau d\'exception',
    sub: 'Coffrets cadeaux',
    desc: 'Nos coffrets sont pensés comme des cadeaux que l\'on n\'oublie pas. Emballage élégant, ruban doré, carte personnalisée.',
    color: '#6CB87C',
    href: '/boutique#coffrets',
  },
  {
    title: 'La cuisine du quotidien',
    sub: 'Cuisine & cuisson',
    desc: 'Des cocottes en fonte colorées, des planches à découper artisanales et des ustensiles qui durent des décennies.',
    color: '#C47C7C',
    href: '/boutique#cuisine',
  },
  {
    title: 'Apéritif entre amis',
    sub: 'Verres & carafes',
    desc: 'Carafes en cristal, coupes à champagne et petits plats de dégustation pour des moments de partage inoubliables.',
    color: '#7CA8C4',
    href: '/boutique#verres',
  },
  {
    title: 'Décoration de table',
    sub: 'Mise en scène',
    desc: 'Comment dresser une table élégante sans effort : les astuces de notre équipe pour un résultat haut de gamme à chaque occasion.',
    color: '#C3A36C',
    href: '/boutique',
  },
]

export default function InspirationPage() {
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
            Art de vivre
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginBottom: 24 }}>
            Inspiration
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 520, margin: '0 auto' }}>
            Des idées pour sublimer chaque moment, de l&apos;ordinaire à l&apos;exceptionnel
          </p>
        </section>

        {/* Grille thèmes */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) var(--pad)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
            maxWidth: 1100, margin: '0 auto',
          }}>
            {THEMES.map((t, i) => (
              <Link key={i} href={t.href} style={{ textDecoration: 'none' }}>
                <article style={{
                  padding: 'clamp(32px, 3vw, 44px)',
                  borderRadius: 10,
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  height: '100%',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s',
                  display: 'flex', flexDirection: 'column',
                }} className="inspi-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 4, height: 40, borderRadius: 2, background: t.color, flexShrink: 0 }}/>
                    <div>
                      <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 4 }}>
                        {t.sub}
                      </p>
                      <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.1 }}>
                        {t.title}
                      </h2>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
                    {t.desc}
                  </p>
                  <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.color }}>
                    Découvrir →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter block */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) var(--pad)',
          background: 'var(--ink)', color: '#fff', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
            Restez inspiré
          </p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 300, marginBottom: 16, color: '#fff' }}>
            Recevez nos inspirations
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
            Conseils de mise en scène, arrivages exclusifs, idées cadeaux directement dans votre boite mail.
          </p>
          <Link href="/#newsletter" style={{
            display: 'inline-block', padding: '14px 40px',
            background: 'var(--gold)', color: '#fff',
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
          }}>
            S&apos;inscrire
          </Link>
        </section>
      </main>
      <Footer />
      <style>{`.inspi-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(70,60,48,0.1); }`}</style>
    </>
  )
}
