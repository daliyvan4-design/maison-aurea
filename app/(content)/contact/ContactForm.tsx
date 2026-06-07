'use client'

import { useState, useTransition } from 'react'
import { sendContactEmails } from '@/lib/emails/send'

const SUBJECTS = [
  'Question sur un produit',
  'Suivi de commande',
  'Commande personnalisée',
  'Coffret cadeau sur mesure',
  'Partenariat',
  'Autre',
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px',
  border: '1px solid var(--line)', borderRadius: 4,
  fontSize: 14, color: 'var(--ink)', background: '#fff',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'var(--font-jost), sans-serif',
  transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'var(--ink-soft)', marginBottom: 8,
}

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await sendContactEmails(form)
      setSent(true)
    })
  }

  if (sent) {
    return (
      <div style={{
        padding: '48px 36px', background: 'var(--cream)',
        borderRadius: 10, border: '1px solid var(--line)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 36, color: 'var(--gold)', marginBottom: 20 }}>◈</div>
        <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 26, color: 'var(--ink)', marginBottom: 12 }}>
          Message envoyé
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h ouvrées.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--cream)', borderRadius: 10,
      border: '1px solid var(--line)', padding: 'clamp(28px, 3vw, 44px)',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 26, fontWeight: 400, color: 'var(--ink)', marginBottom: 4 }}>
        Envoyez-nous un message
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>Nom complet</label>
          <input name="name" required value={form.name} onChange={handleChange}
            placeholder="Jean Konan" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange}
            placeholder="jean@exemple.com" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Objet</label>
        <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          name="message" required value={form.message} onChange={handleChange}
          rows={6} placeholder="Votre message..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button type="submit" disabled={isPending} style={{
        padding: '15px', background: 'var(--gold)', color: '#fff',
        border: 'none', cursor: isPending ? 'default' : 'pointer',
        fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
        borderRadius: 3, opacity: isPending ? 0.7 : 1,
        transition: 'opacity 0.2s, background 0.3s',
        fontFamily: 'var(--font-jost), sans-serif',
      }}>
        {isPending ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
}
