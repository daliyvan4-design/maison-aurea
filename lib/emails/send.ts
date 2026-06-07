'use server'

import { Resend } from 'resend'
import {
  contactConfirmEmail,
  contactNotifEmail,
  orderConfirmEmail,
  newsletterWelcomeEmail,
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM   = process.env.EMAIL_FROM ?? 'Maison Auréa <contact@lamaisonaurea.store>'
const TO     = process.env.EMAIL_TO   ?? 'contact@lamaisonaurea.store'

/* ─── Contact form ─── */
export async function sendContactEmails({
  name, email, subject, message,
}: {
  name: string; email: string; subject: string; message: string
}) {
  await Promise.all([
    // Accusé de réception au client
    resend.emails.send({
      from:    FROM,
      to:      email,
      subject: `Votre message a bien été reçu — Maison Auréa`,
      html:    contactConfirmEmail({ name, subject }),
    }),
    // Notification interne
    resend.emails.send({
      from:       FROM,
      to:         TO,
      replyTo:    email,
      subject:    `[Contact] ${subject} — ${name}`,
      html:       contactNotifEmail({ name, email, subject, message }),
    }),
  ])
}

/* ─── Confirmation commande ─── */
export async function sendOrderConfirmEmail(params: {
  ref: string
  customerName: string
  customerEmail: string
  items: Array<{ name: string; price: number; qty: number }>
  subtotal: number
  deliveryFee: number
  total: number
  city: string
}) {
  await resend.emails.send({
    from:    FROM,
    to:      params.customerEmail,
    subject: `Commande ${params.ref} confirmée — Maison Auréa`,
    html:    orderConfirmEmail(params),
  })
}

/* ─── Newsletter ─── */
export async function sendNewsletterWelcome(email: string) {
  await resend.emails.send({
    from:    FROM,
    to:      email,
    subject: `Bienvenue dans la Maison Auréa`,
    html:    newsletterWelcomeEmail({ email }),
  })
}
