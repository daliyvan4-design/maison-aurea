import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from './ContactForm'

export const metadata = {
  title: 'Contact — Maison Auréa',
  description: 'Contactez Maison Auréa pour toute question sur nos produits ou vos commandes.',
}

const INFOS = [
  {
    icon: '◉',
    title: 'Adresse',
    lines: ['Abidjan, Côte d\'Ivoire', 'Cocody, Riviera'],
  },
  {
    icon: '◈',
    title: 'Email',
    lines: ['contact@lamaisonaurea.store'],
  },
  {
    icon: '◆',
    title: 'Horaires',
    lines: ['Lundi au samedi', '9h00 à 18h00'],
  },
  {
    icon: '◎',
    title: 'Livraison',
    lines: ['Abidjan sous 24-48h', 'Côte d\'Ivoire sous 3-5 jours'],
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) var(--pad) clamp(40px, 5vw, 60px)',
          textAlign: 'center', borderBottom: '1px solid var(--line)',
        }}>
          <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>
            Parlons-nous
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginBottom: 24 }}>
            Contact
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto' }}>
            Une question, une commande spéciale ou simplement envie d&apos;échanger ? Nous sommes là.
          </p>
        </section>

        {/* Contenu */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          gap: 'clamp(40px, 6vw, 80px)',
          padding: 'clamp(48px, 6vw, 80px) var(--pad)',
          maxWidth: 1100, margin: '0 auto',
          alignItems: 'start',
        }}>
          {/* Infos */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 400, color: 'var(--ink)', marginBottom: 32 }}>
              Nos coordonnées
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {INFOS.map((info, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20, color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>{info.icon}</span>
                  <div>
                    <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>{info.title}</p>
                    {info.lines.map((l, j) => (
                      <p key={j} style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.6 }}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>Suivez-nous</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
                  <a key={s} href="#" style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>{s}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
