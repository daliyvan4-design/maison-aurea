import Link from 'next/link'
import Image from 'next/image'

const BOUTIQUE_LINKS = [
  { label: 'Art de la table',          href: '/boutique#art-de-la-table' },
  { label: 'Verres & accessoires',     href: '/boutique#verres' },
  { label: 'Théières & service à thé', href: '/boutique#theieres' },
  { label: 'Cuisine & cuisson',        href: '/boutique#cuisine' },
  { label: 'Coffrets cadeaux',         href: '/boutique#coffrets' },
]

const AIDE_LINKS = [
  { label: 'FAQ',                     href: '/contact' },
  { label: 'Livraison & retours',     href: '/contact' },
  { label: 'Conditions générales',    href: '/contact' },
  { label: 'Paiement sécurisé',       href: '/contact' },
  { label: 'Nous contacter',          href: '/contact' },
]

const INFO_LINKS = [
  { label: 'À propos de nous',             href: '/a-propos' },
  { label: 'Nos engagements',              href: '/a-propos' },
  { label: 'Mentions légales',             href: '/contact' },
  { label: 'Politique de confidentialité', href: '/contact' },
]

const PAYS = ['Wave', 'Orange', 'MTN', 'VISA', 'Mastercard']

export function Footer() {
  return (
    <footer style={{
      background: 'var(--paper)',
      padding: 'clamp(56px,9vh,90px) var(--pad) 34px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.1fr',
        gap: 36,
        paddingBottom: 44,
        borderBottom: '1px solid var(--line)',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ position: 'relative', width: 84, height: 84 }}>
              <Image src="/logo-full.png" alt="Maison Auréa" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>
          <p style={{ maxWidth: '30ch', color: 'var(--ink-soft)', fontSize: '13.5px', lineHeight: 1.7 }}>
            L&apos;art de la table et de la décoration intérieure. Des pièces élégantes pour sublimer votre quotidien.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
            {[
              { label: 'Instagram', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="17" height="17"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              { label: 'Facebook', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M13 22v-8h3l.5-3H13V9.2c0-.9.3-1.5 1.6-1.5H17V5.1C16.6 5 15.6 5 14.5 5 12 5 10.3 6.5 10.3 9v2H7.5v3h2.8v8H13Z"/></svg> },
              { label: 'TikTok', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M16 4c.3 2 1.6 3.5 3.6 3.8v2.6c-1.3 0-2.6-.4-3.6-1.1V15a5.2 5.2 0 1 1-5.2-5.2c.3 0 .5 0 .8.1v2.7a2.6 2.6 0 1 0 1.8 2.5V4H16Z"/></svg> },
            ].map((s) => (
              <Link
                key={s.label}
                href="#"
                aria-label={s.label}
                style={{ color: 'var(--ink-soft)', transition: 'color 0.3s', display: 'flex' }}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Boutique */}
        <FooterCol title="Boutique" links={BOUTIQUE_LINKS} />
        {/* Aide */}
        <FooterCol title="Aide & infos" links={AIDE_LINKS} />
        {/* Infos */}
        <FooterCol title="Informations" links={INFO_LINKS} />

        {/* Paiement */}
        <div>
          <h5 style={{
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--ink)', fontWeight: 500, marginBottom: 16,
          }}>
            Moyens de paiement
          </h5>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PAYS.map((p) => (
              <span key={p} style={{
                height: 30, minWidth: 48, padding: '0 9px',
                border: '1px solid var(--line)', borderRadius: 5,
                background: 'var(--cream)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600, letterSpacing: '0.03em', color: 'var(--ink)',
              }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', paddingTop: 26,
      }}>
        <span style={{ fontSize: '11.5px', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>
          © 2026 Maison Auréa · Tous droits réservés · Abidjan
        </span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 style={{
        fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--ink)', fontWeight: 500, marginBottom: 16,
      }}>
        {title}
      </h5>
      {links.map((l) => (
        <Link key={l.label} href={l.href} style={{
          display: 'block', fontSize: '13.5px', color: 'var(--ink-soft)',
          padding: '5px 0', lineHeight: 1.4, transition: 'color 0.3s',
        }}>
          {l.label}
        </Link>
      ))}
    </div>
  )
}
