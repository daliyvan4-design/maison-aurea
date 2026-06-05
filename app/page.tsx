import Image from 'next/image'
import { SplitText }      from '@/components/ui/SplitText'
import { MagneticButton } from '@/components/ui/MagneticButton'

// Placeholder Phase 1 — valide le loader, les tokens, les polices et les composants UI.
// Remplacé par la vraie page Accueil en Phase 2.
export default function Home() {
  return (
    <main
      style={{
        minHeight: '200vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '22vh',
        gap: '40px',
        padding: 'var(--pad)',
        backgroundColor: 'var(--paper)',
      }}
    >
      {/* Logo */}
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: '8px' }}>
        <Image src="/logo-mark.png" alt="Maison Auréa" fill style={{ objectFit: 'contain' }} priority />
      </div>

      {/* Titre animé */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontFamily: 'var(--font-cinzel), serif',
          fontSize: '13px',
          letterSpacing: '0.5em',
          color: 'var(--accent)',
        }}>
          MAISON
        </span>
        <div style={{
          fontFamily: 'var(--font-cinzel), serif',
          letterSpacing: '0.12em',
          background: 'linear-gradient(180deg, #D7BB80 0%, #C3A067 45%, #9A7836 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          <SplitText
            as="h1"
            className="font-logo text-display-xl"
            trigger="immediate"
            delay={2.0}
          >
            AURÉA
          </SplitText>
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-jost), system-ui, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
      }}>
        Phase 1 — Infrastructure
      </p>

      {/* CTA magnétique */}
      <MagneticButton>
        <span
          data-cursor="view"
          className="btn-gold"
          style={{ cursor: 'none', marginTop: '20px' }}
        >
          Phase 2 — Accueil
        </span>
      </MagneticButton>

      {/* Palette tokens */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          ['paper',  '#F4EDE1'],
          ['cream',  '#FBF6EE'],
          ['sand',   '#EAE0CF'],
          ['greige', '#D9CDB6'],
          ['clay',   '#C2A06A'],
          ['ink',    '#463C30'],
          ['accent', '#B58A4F'],
          ['gold',   '#C3A36C'],
        ].map(([name, hex]) => (
          <div
            key={name}
            title={`--${name} ${hex}`}
            style={{
              width: '40px', height: '40px',
              borderRadius: '50%',
              backgroundColor: `var(--${name})`,
              border: '1px solid var(--line)',
            }}
          />
        ))}
      </div>

      {/* Typo showcase */}
      <div style={{ marginTop: '60px', textAlign: 'center', maxWidth: '640px' }}>
        <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '28px', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.3 }}>
          &ldquo;L&rsquo;élégance se vit au quotidien.&rdquo;
        </p>
        <p style={{ fontFamily: 'var(--font-jost)', fontSize: '13px', color: 'var(--ink-soft)', marginTop: '12px', letterSpacing: '0.1em' }}>
          Cormorant Garamond italic — Jost UI
        </p>
      </div>
    </main>
  )
}
