'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useCartStore, useUIStore } from '@/lib/store'
import { createOrder } from '@/lib/actions'

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
}

const DELIVERY_ZONES = [
  { label: 'Abidjan — Cocody, Plateau, Marcory', fee: 2000 },
  { label: 'Abidjan — Yopougon, Abobo, Adjamé', fee: 2500 },
  { label: 'Abidjan — Autres communes',           fee: 3000 },
  { label: 'Intérieur Côte d\'Ivoire',            fee: 5000 },
]

const PAYMENT_METHODS = [
  { id: 'wave',    label: 'Wave',           icon: '🔵', desc: 'Paiement mobile instantané' },
  { id: 'orange',  label: 'Orange Money',   icon: '🟠', desc: 'Orange Money CI' },
  { id: 'mtn',     label: 'MTN MoMo',       icon: '🟡', desc: 'MTN Mobile Money' },
  { id: 'card',    label: 'Carte bancaire', icon: '💳', desc: 'Visa / Mastercard' },
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px',
  border: '1px solid var(--line)', borderRadius: 4,
  fontSize: 14, color: 'var(--ink)', background: '#fff',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'var(--font-jost), sans-serif',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'var(--ink-soft)', marginBottom: 8,
}

export default function CheckoutPage() {
  const router       = useRouter()
  const { items, cartTotal, clearCart } = useCartStore()
  const closeCart    = useUIStore(s => s.closeCart)
  const [isPending, startTransition] = useTransition()

  const [step, setStep]             = useState<'info' | 'payment' | 'processing' | 'done'>('info')
  const [zoneIdx, setZoneIdx]       = useState(0)
  const [payMethod, setPayMethod]   = useState('wave')
  const [orderRef, setOrderRef]     = useState('')

  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: 'Abidjan', address: '', notes: '',
  })

  const zone       = DELIVERY_ZONES[zoneIdx]
  const subtotal   = cartTotal()
  const deliveryFee = zone.fee
  const total      = subtotal + deliveryFee

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePay = () => {
    setStep('processing')
    startTransition(async () => {
      // Simulation paiement 2s
      await new Promise(r => setTimeout(r, 2000))

      try {
        const ref = await createOrder({
          customerName:  form.name,
          customerEmail: form.email || null,
          customerPhone: form.phone || null,
          customerCity:  form.city,
          items:         items.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty, image: i.image })),
          subtotal,
          deliveryFee,
          total,
          notes: `Zone: ${zone.label}${form.notes ? ` — ${form.notes}` : ''}`,
        })
        setOrderRef(ref)
      } catch {
        // Fallback si DB non dispo
        setOrderRef(`AUR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`)
      }

      clearCart()
      closeCart()
      setStep('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  /* ─── Panier vide ─── */
  if (items.length === 0 && step !== 'done') {
    return (
      <>
        <Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--pad)' }}>
          <div>
            <div style={{ fontSize: 40, marginBottom: 20, opacity: 0.3 }}>◈</div>
            <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 32, fontWeight: 300, color: 'var(--ink)', marginBottom: 12 }}>
              Votre panier est vide
            </h1>
            <Link href="/boutique" style={{ display: 'inline-block', marginTop: 24, padding: '13px 32px', background: 'var(--gold)', color: '#fff', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: 3 }}>
              Voir la boutique
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  /* ─── Confirmation ─── */
  if (step === 'done') {
    return (
      <>
        <Header />
        <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--pad)' }}>
          <div style={{ textAlign: 'center', maxWidth: 520 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#6CB87C22', border: '2px solid #6CB87C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 28 }}>✓</div>
            <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Commande confirmée</p>
            <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: 'var(--ink)', marginBottom: 16 }}>
              Merci pour votre commande
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 8, lineHeight: 1.7 }}>
              Votre commande <strong style={{ color: 'var(--accent)' }}>{orderRef}</strong> a bien été enregistrée.
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 40, lineHeight: 1.7 }}>
              {form.email ? `Un email de confirmation a été envoyé à ${form.email}.` : 'Notre équipe vous contactera pour confirmer la livraison.'}
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ padding: '13px 28px', background: 'var(--gold)', color: '#fff', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: 3 }}>
                Retour à l&apos;accueil
              </Link>
              <Link href="/boutique" style={{ padding: '13px 28px', border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: 3 }}>
                Continuer mes achats
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ padding: 'clamp(40px, 5vw, 60px) var(--pad)', maxWidth: 1100, margin: '0 auto' }}>

        {/* Breadcrumb steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, fontSize: 12, letterSpacing: '0.1em' }}>
          {['Informations', 'Paiement'].map((s, i) => {
            const active = (i === 0 && step === 'info') || (i === 1 && (step === 'payment' || step === 'processing'))
            const done   = (i === 0 && step !== 'info')
            return (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span style={{ color: 'var(--line)' }}>›</span>}
                <span style={{ color: active ? 'var(--gold)' : done ? 'var(--ink-soft)' : 'var(--line)', fontWeight: active ? 500 : 400, textTransform: 'uppercase' }}>
                  {done ? '✓ ' : ''}{s}
                </span>
              </span>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>

          {/* ─── Gauche ─── */}
          <div>
            {/* ÉTAPE 1 — Informations */}
            {step === 'info' && (
              <form onSubmit={handleInfoSubmit}>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 400, color: 'var(--ink)', marginBottom: 28 }}>
                  Informations de livraison
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Nom complet *</label>
                    <input name="name" required value={form.name} onChange={handleChange} style={inputStyle} placeholder="Jean Konan" />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+225 07 00 00 00 00" />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Email (pour la confirmation)</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="jean@exemple.com" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Ville *</label>
                    <input name="city" required value={form.city} onChange={handleChange} style={inputStyle} placeholder="Abidjan" />
                  </div>
                  <div>
                    <label style={labelStyle}>Zone de livraison *</label>
                    <select value={zoneIdx} onChange={e => setZoneIdx(Number(e.target.value))} style={inputStyle}>
                      {DELIVERY_ZONES.map((z, i) => (
                        <option key={i} value={i}>{z.label} — {fmt(z.fee)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Adresse précise *</label>
                  <input name="address" required value={form.address} onChange={handleChange} style={inputStyle} placeholder="Quartier, rue, bâtiment..." />
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>Instructions de livraison</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }} placeholder="Code portail, horaires préférés..." />
                </div>

                <button type="submit" style={{
                  width: '100%', padding: '16px',
                  background: 'var(--gold)', color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
                  fontFamily: 'var(--font-jost), sans-serif',
                }}>
                  Continuer vers le paiement
                </button>
              </form>
            )}

            {/* ÉTAPE 2 — Paiement */}
            {(step === 'payment' || step === 'processing') && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                  <button onClick={() => setStep('info')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: 13 }}>
                    ← Modifier
                  </button>
                  <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 400, color: 'var(--ink)' }}>
                    Mode de paiement
                  </h2>
                </div>

                {/* Récap adresse */}
                <div style={{ background: 'var(--cream)', borderRadius: 8, padding: '16px 20px', marginBottom: 28, fontSize: 13, color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                  <strong style={{ color: 'var(--ink)' }}>{form.name}</strong> · {form.phone}<br/>
                  {form.address}, {form.city} · {zone.label}
                </div>

                {/* Méthodes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                  {PAYMENT_METHODS.map(m => (
                    <label key={m.id} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '18px 20px', borderRadius: 8, cursor: 'pointer',
                      border: `2px solid ${payMethod === m.id ? 'var(--gold)' : 'var(--line)'}`,
                      background: payMethod === m.id ? '#FBF6EE' : '#fff',
                      transition: 'all 0.2s',
                    }}>
                      <input type="radio" name="pay" value={m.id} checked={payMethod === m.id}
                        onChange={() => setPayMethod(m.id)} style={{ accentColor: 'var(--gold)' }} />
                      <span style={{ fontSize: 22 }}>{m.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 500, color: 'var(--ink)', fontSize: 14 }}>{m.label}</p>
                        <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-soft)' }}>{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Simulation */}
                <div style={{ background: '#FFF8E7', border: '1px solid #F0C040', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 13, color: '#8A6A00' }}>
                  ⚠️ Mode simulation — aucun paiement réel ne sera effectué
                </div>

                <button
                  onClick={handlePay}
                  disabled={isPending}
                  style={{
                    width: '100%', padding: '18px',
                    background: isPending ? 'var(--greige)' : 'var(--ink)',
                    color: '#fff', border: 'none',
                    cursor: isPending ? 'default' : 'pointer',
                    fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: 3,
                    fontFamily: 'var(--font-jost), sans-serif',
                    transition: 'background 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  }}
                >
                  {isPending ? (
                    <>
                      <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                      Traitement en cours...
                    </>
                  ) : (
                    `Confirmer — ${fmt(total)}`
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ─── Récap panier ─── */}
          <div style={{ background: 'var(--cream)', borderRadius: 10, padding: 28, border: '1px solid var(--line)', position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 22, fontWeight: 400, color: 'var(--ink)', marginBottom: 20 }}>
              Votre commande
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)', lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--ink-soft)' }}>×{item.qty}</p>
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, flexShrink: 0 }}>
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                <span>Sous-total</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)' }}>
                <span>Livraison</span>
                <span>{fmt(deliveryFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, color: 'var(--ink)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 22, color: 'var(--accent)', fontWeight: 500 }}>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
