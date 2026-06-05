'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginTop: 28, maxWidth: 420, flexWrap: 'wrap' }}>
      <input
        type="email"
        placeholder={done ? 'Merci — à très vite' : 'Votre e-mail'}
        required={!done}
        disabled={done}
        aria-label="email"
        style={{
          flex: 1, minWidth: 180,
          background: 'var(--paper)', border: '1px solid var(--line)',
          borderRadius: 3, padding: '14px 16px',
          fontFamily: 'var(--font-jost), system-ui, sans-serif',
          fontSize: 14, color: 'var(--ink)', outline: 'none',
          opacity: done ? 0.7 : 1,
        }}
      />
      {!done && (
        <button type="submit" className="btn-gold" style={{ margin: 0, borderRadius: 3 }}>
          S&apos;inscrire
        </button>
      )}
    </form>
  )
}
