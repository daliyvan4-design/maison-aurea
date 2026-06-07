'use client'

import { useState, useTransition, useRef } from 'react'
import { sendNewsletterWelcome } from '@/lib/emails/send'

export function NewsletterForm() {
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = ref.current?.value
    if (!email) return
    startTransition(async () => {
      await sendNewsletterWelcome(email)
      setDone(true)
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginTop: 28, maxWidth: 420, flexWrap: 'wrap' }}>
      <input
        ref={ref}
        type="email"
        placeholder={done ? 'Merci — à très vite' : 'Votre e-mail'}
        required={!done}
        disabled={done || isPending}
        aria-label="email"
        style={{
          flex: 1, minWidth: 180,
          background: 'var(--paper)', border: '1px solid var(--line)',
          borderRadius: 3, padding: '14px 16px',
          fontFamily: 'var(--font-jost), system-ui, sans-serif',
          fontSize: 14, color: 'var(--ink)', outline: 'none',
          opacity: done || isPending ? 0.7 : 1,
        }}
      />
      {!done && (
        <button type="submit" disabled={isPending} className="btn-gold" style={{ margin: 0, borderRadius: 3, opacity: isPending ? 0.7 : 1 }}>
          {isPending ? '...' : 'S\'inscrire'}
        </button>
      )}
    </form>
  )
}
