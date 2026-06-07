/* ─── Design tokens ─── */
const GOLD   = '#C3A36C'
const INK    = '#463C30'
const SOFT   = '#8C7E6B'
const LINE   = '#E6DDCC'
const CREAM  = '#FBF6EE'
const PAPER  = '#F4EDE1'
const ACCENT = '#B58A4F'

const base = (content: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Maison Auréa</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- En-tête -->
        <tr>
          <td style="background:${INK};padding:32px 40px;text-align:center;border-radius:10px 10px 0 0;">
            <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.5em;text-transform:uppercase;color:${GOLD};">MAISON</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:28px;letter-spacing:0.18em;color:#fff;font-weight:normal;">AURÉA</p>
            <p style="margin:8px 0 0;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.45);">L'ART DE VIVRE AU QUOTIDIEN</p>
          </td>
        </tr>

        <!-- Ligne dorée -->
        <tr><td style="height:3px;background:linear-gradient(90deg,${GOLD},${ACCENT},${GOLD});"></td></tr>

        <!-- Corps -->
        <tr>
          <td style="background:#fff;padding:44px 40px;border-radius:0 0 10px 10px;">
            ${content}
          </td>
        </tr>

        <!-- Pied -->
        <tr>
          <td style="padding:32px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${SOFT};">Maison Auréa · Abidjan, Côte d'Ivoire</p>
            <p style="margin:0;font-size:11px;color:${SOFT};">
              <a href="mailto:contact@lamaisonaurea.store" style="color:${GOLD};text-decoration:none;">contact@lamaisonaurea.store</a>
              &nbsp;·&nbsp;
              <a href="https://lamaisonaurea.store" style="color:${GOLD};text-decoration:none;">lamaisonaurea.store</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

/* ─── Utilitaires ─── */
function eyebrow(text: string) {
  return `<p style="margin:0 0 12px;font-size:10px;letter-spacing:0.34em;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;">${text}</p>`
}
function heading(text: string) {
  return `<h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:normal;color:${INK};line-height:1.15;">${text}</h1>`
}
function para(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;color:${SOFT};line-height:1.75;font-family:Arial,sans-serif;">${text}</p>`
}
function divider() {
  return `<hr style="border:none;border-top:1px solid ${LINE};margin:28px 0;"/>`
}
function btn(text: string, href: string) {
  return `
  <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
    <tr>
      <td style="background:${GOLD};border-radius:3px;">
        <a href="${href}" style="display:inline-block;padding:14px 36px;color:#fff;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">${text}</a>
      </td>
    </tr>
  </table>`
}
function infoRow(label: string, value: string) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid ${LINE};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${SOFT};font-family:Arial,sans-serif;width:40%;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};font-family:Arial,sans-serif;padding-left:16px;">${value}</td>
  </tr>`
}

/* ─────────────────────────────────────────────
   1. Contact — accusé de réception (au client)
───────────────────────────────────────────────*/
export function contactConfirmEmail({ name, subject }: { name: string; subject: string }) {
  return base(`
    ${eyebrow('Confirmation de réception')}
    ${heading(`Merci, ${name}`)}
    ${para(`Votre message a bien été reçu. Notre équipe vous répondra dans les plus brefs délais, généralement sous <strong>24 heures ouvrées</strong>.`)}
    ${para(`Objet de votre demande : <em>${subject}</em>`)}
    ${divider()}
    ${para('En attendant, n\'hésitez pas à découvrir nos dernières collections.')}
    ${btn('Visiter la boutique', 'https://lamaisonaurea.store/boutique')}
    ${divider()}
    <p style="margin:0;font-size:12px;color:${SOFT};font-family:Arial,sans-serif;font-style:italic;">
      Si vous n'avez pas envoyé ce message, ignorez cet email.
    </p>
  `)
}

/* ─────────────────────────────────────────────
   2. Contact — notification interne (à l'admin)
───────────────────────────────────────────────*/
export function contactNotifEmail({
  name, email, subject, message,
}: {
  name: string; email: string; subject: string; message: string
}) {
  return base(`
    ${eyebrow('Nouveau message reçu')}
    ${heading('Demande de contact')}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow('Nom', name)}
      ${infoRow('Email', `<a href="mailto:${email}" style="color:${GOLD};text-decoration:none;">${email}</a>`)}
      ${infoRow('Objet', subject)}
    </table>
    <div style="background:${CREAM};border-left:3px solid ${GOLD};padding:20px 24px;border-radius:0 6px 6px 0;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:${INK};line-height:1.75;font-family:Arial,sans-serif;white-space:pre-wrap;">${message}</p>
    </div>
    ${btn('Répondre', `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`)}
  `)
}

/* ─────────────────────────────────────────────
   3. Confirmation de commande (au client)
───────────────────────────────────────────────*/
export function orderConfirmEmail({
  ref, customerName, items, subtotal, deliveryFee, total, city,
}: {
  ref: string
  customerName: string
  items: Array<{ name: string; price: number; qty: number }>
  subtotal: number
  deliveryFee: number
  total: number
  city: string
}) {
  const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'

  const itemsRows = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};font-family:Arial,sans-serif;">${item.name}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${LINE};font-size:13px;color:${SOFT};font-family:Arial,sans-serif;text-align:center;">×${item.qty}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${ACCENT};font-family:Arial,sans-serif;text-align:right;font-weight:bold;">${fmt(item.price * item.qty)}</td>
    </tr>`).join('')

  return base(`
    ${eyebrow('Commande confirmée')}
    ${heading(`Merci pour votre commande, ${customerName}`)}
    ${para(`Votre commande <strong style="color:${ACCENT};">${ref}</strong> a bien été reçue. Nous la préparons avec soin.`)}
    ${divider()}

    <!-- Articles -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <thead>
        <tr style="border-bottom:2px solid ${LINE};">
          <th style="text-align:left;padding-bottom:10px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${SOFT};font-family:Arial,sans-serif;font-weight:normal;">Article</th>
          <th style="text-align:center;padding-bottom:10px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${SOFT};font-family:Arial,sans-serif;font-weight:normal;">Qté</th>
          <th style="text-align:right;padding-bottom:10px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${SOFT};font-family:Arial,sans-serif;font-weight:normal;">Prix</th>
        </tr>
      </thead>
      <tbody>${itemsRows}</tbody>
    </table>

    <!-- Totaux -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 32px;">
      <tr>
        <td style="font-size:13px;color:${SOFT};font-family:Arial,sans-serif;padding:6px 0;">Sous-total</td>
        <td style="font-size:13px;color:${INK};font-family:Arial,sans-serif;text-align:right;padding:6px 0;">${fmt(subtotal)}</td>
      </tr>
      <tr>
        <td style="font-size:13px;color:${SOFT};font-family:Arial,sans-serif;padding:6px 0;">Livraison — ${city}</td>
        <td style="font-size:13px;color:${INK};font-family:Arial,sans-serif;text-align:right;padding:6px 0;">${deliveryFee === 0 ? 'Offerte' : fmt(deliveryFee)}</td>
      </tr>
      <tr style="border-top:2px solid ${LINE};">
        <td style="font-size:16px;font-family:Georgia,serif;color:${INK};padding:12px 0 0;font-weight:normal;">Total</td>
        <td style="font-size:18px;font-family:Georgia,serif;color:${ACCENT};text-align:right;padding:12px 0 0;font-weight:bold;">${fmt(total)}</td>
      </tr>
    </table>

    ${divider()}
    ${para('Notre équipe vous contactera pour confirmer les modalités de livraison à <strong>' + city + '</strong>.')}
    ${btn('Suivre ma commande', 'https://lamaisonaurea.store')}
  `)
}

/* ─────────────────────────────────────────────
   4. Newsletter — bienvenue
───────────────────────────────────────────────*/
export function newsletterWelcomeEmail({ email }: { email: string }) {
  return base(`
    ${eyebrow('Bienvenue')}
    ${heading('Vous faites maintenant partie de la Maison')}
    ${para('Merci de votre confiance. Vous recevrez en avant-première nos nouvelles collections, nos inspirations et nos offres exclusives.')}
    ${divider()}
    <div style="background:${CREAM};border-radius:8px;padding:28px;text-align:center;margin-bottom:28px;">
      <p style="margin:0 0 8px;font-family:Georgia,serif;font-style:italic;font-size:18px;color:${INK};line-height:1.5;">
        &ldquo;L'art de vivre au quotidien, une pièce à la fois.&rdquo;
      </p>
    </div>
    ${btn('Découvrir les nouveautés', 'https://lamaisonaurea.store/nouveautes')}
    ${divider()}
    <p style="margin:0;font-size:11px;color:${SOFT};font-family:Arial,sans-serif;">
      Vous pouvez vous désinscrire à tout moment en répondant à cet email. Adresse inscrite : ${email}
    </p>
  `)
}
