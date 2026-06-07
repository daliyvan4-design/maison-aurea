'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUIStore, useCartStore } from '@/lib/store'

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
}

export function CartDrawer() {
  const { cartOpen, closeCart } = useUIStore()
  const { items, removeFromCart, updateQty, cartTotal } = useCartStore()

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed', inset: 0, zIndex: 8900,
          background: 'rgba(70,60,48,0.35)',
          backdropFilter: 'blur(2px)',
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        aria-label="Panier"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(440px, 100vw)',
          zIndex: 9000,
          background: 'var(--cream)',
          display: 'flex', flexDirection: 'column',
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '-24px 0 60px rgba(70,60,48,0.12)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 28px',
          borderBottom: '1px solid var(--line)',
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 26, fontWeight: 400, color: 'var(--ink)' }}>
              Mon panier
            </h2>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2, letterSpacing: '0.06em' }}>
              {items.length === 0 ? 'Vide' : `${items.reduce((s, i) => s + i.qty, 0)} article${items.reduce((s, i) => s + i.qty, 0) > 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink-soft)', fontSize: 20,
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>◈</div>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>
                Votre panier est vide
              </p>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 28 }}>
                Découvrez nos collections
              </p>
              <Link
                href="/boutique"
                onClick={closeCart}
                style={{
                  display: 'inline-block', padding: '12px 28px',
                  background: 'var(--gold)', color: '#fff',
                  fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                  borderRadius: 3,
                }}
              >
                Voir la boutique
              </Link>
            </div>
          ) : items.map(item => (
            <div key={item.id} style={{
              display: 'grid', gridTemplateColumns: '72px 1fr', gap: 16,
              padding: '16px 0',
              borderBottom: '1px solid var(--line)',
            }}>
              {/* Image */}
              <Link href={`/produit/${item.slug}`} onClick={closeCart}>
                <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 8, overflow: 'hidden', background: 'var(--sand)' }}>
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--greige)' }} />
                  )}
                </div>
              </Link>

              {/* Info */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 17, color: 'var(--ink)', lineHeight: 1.2 }}>{item.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginTop: 4 }}>{fmt(item.price)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Qty control */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--line)', borderRadius: 4 }}>
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <span style={{ width: 28, textAlign: 'center', fontSize: 13, color: 'var(--ink)' }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Sous-total</span>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 22, color: 'var(--ink)' }}>{fmt(cartTotal())}</span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 20 }}>Livraison calculée à l&apos;étape suivante</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{
                display: 'block', width: '100%', padding: '16px',
                background: 'var(--ink)', color: '#fff', textAlign: 'center',
                fontFamily: 'var(--font-jost), sans-serif',
                fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                borderRadius: 3, transition: 'background 0.3s',
              }}
            >
              Commander
            </Link>
            <button
              onClick={closeCart}
              style={{
                width: '100%', padding: '12px',
                background: 'none', color: 'var(--ink-soft)',
                border: 'none', cursor: 'pointer',
                fontSize: 12, letterSpacing: '0.1em',
                marginTop: 10,
              }}
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
