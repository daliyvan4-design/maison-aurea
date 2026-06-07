'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore, useUIStore } from '@/lib/store'
import type { Product } from '@/lib/db/schema'

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
}

const CAT_LABELS: Record<string, string> = {
  'art-de-la-table': 'Art de la table',
  'verres':          'Verres & accessoires',
  'theieres':        'Théières & service à thé',
  'cuisine':         'Cuisine & cuisson',
  'coffrets':        'Coffrets cadeaux',
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-jost), sans-serif',
          fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)',
        }}
      >
        {title}
        <span style={{ fontSize: 18, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', color: 'var(--ink-soft)' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 20, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          {children}
        </div>
      )}
    </div>
  )
}

function RelatedCard({ product }: { product: Product }) {
  const images = product.images as string[]
  return (
    <Link href={`/produit/${product.slug}`} style={{ display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 6, overflow: 'hidden', background: 'var(--sand)', marginBottom: 14 }}>
        {images?.[0] ? (
          <Image src={images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--greige) 0%, var(--sand) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 28, opacity: 0.3 }}>◈</span>
          </div>
        )}
      </div>
      <h4 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 17, color: 'var(--ink)', marginBottom: 4 }}>{product.name}</h4>
      <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{fmt(product.price)}</p>
    </Link>
  )
}

export function ProduitClient({ product, related }: { product: Product; related: Product[] }) {
  const images       = (product.images as string[]) ?? []
  const [active, setActive] = useState(0)
  const [qty, setQty]       = useState(1)
  const [added, setAdded]   = useState(false)

  const addToCart = useCartStore(s => s.addToCart)
  const openCart  = useUIStore(s => s.openCart)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id:    product.id,
        slug:  product.slug,
        name:  product.name,
        price: product.price,
        image: images?.[0] ?? '',
      })
    }
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav style={{ padding: '20px var(--pad)', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
        <Link href="/">Accueil</Link>
        <span style={{ margin: '0 10px' }}>›</span>
        <Link href="/boutique">Boutique</Link>
        <span style={{ margin: '0 10px' }}>›</span>
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </nav>

      {/* Produit principal */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 80px)',
        padding: '0 var(--pad) clamp(60px, 8vw, 100px)',
        maxWidth: 1200, margin: '0 auto',
      }}>
        {/* Galerie */}
        <div>
          {/* Image principale */}
          <div style={{
            position: 'relative', aspectRatio: '3/4',
            borderRadius: 8, overflow: 'hidden',
            background: 'var(--sand)', marginBottom: 12,
          }}>
            {images[active] ? (
              <Image
                key={active}
                src={images[active]} alt={product.name}
                fill style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, var(--greige) 0%, var(--sand) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 64, opacity: 0.2, color: 'var(--ink)' }}>◈</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 10 }}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    position: 'relative', width: 72, height: 72,
                    borderRadius: 6, overflow: 'hidden',
                    border: `2px solid ${i === active ? 'var(--gold)' : 'transparent'}`,
                    cursor: 'pointer', padding: 0,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <Image src={img} alt={`vue ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos produit */}
        <div style={{ paddingTop: 8 }}>
          {/* Catégorie */}
          <p style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', marginBottom: 16,
          }}>
            {CAT_LABELS[product.category] || product.category}
          </p>

          {/* Nom */}
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(30px, 3.5vw, 46px)',
            fontWeight: 300, color: 'var(--ink)',
            lineHeight: 1.1, marginBottom: 20,
          }}>
            {product.name}
          </h1>

          {/* Prix */}
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 28, color: 'var(--accent)', fontWeight: 500, marginBottom: 28,
          }}>
            {fmt(product.price)}
          </p>

          {/* Description */}
          {product.description && (
            <p style={{
              fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.8,
              marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--line)',
            }}>
              {product.description}
            </p>
          )}

          {/* Stock */}
          <div style={{ marginBottom: 24 }}>
            {product.stock === 0 ? (
              <span style={{ fontSize: 13, color: '#C47C7C' }}>Rupture de stock</span>
            ) : product.stock <= 5 ? (
              <span style={{ fontSize: 13, color: '#C47C7C' }}>Plus que {product.stock} en stock</span>
            ) : (
              <span style={{ fontSize: 13, color: '#6CB87C' }}>En stock</span>
            )}
          </div>

          {/* Quantité + Panier */}
          {product.stock > 0 && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 4 }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 40, height: 50, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink)' }}
                >−</button>
                <span style={{ width: 40, textAlign: 'center', fontSize: 15 }}>{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  style={{ width: 40, height: 50, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink)' }}
                >+</button>
              </div>

              <button
                onClick={handleAdd}
                style={{
                  flex: 1, padding: '16px',
                  background: added ? 'var(--ink)' : 'var(--gold)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-jost), sans-serif',
                  fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                  borderRadius: 3, transition: 'background 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
              </button>
            </div>
          )}

          {/* Accordéons */}
          <div style={{ borderTop: '1px solid var(--line)' }}>
            <Accordion title="Description & matières">
              {product.description
                ? <p>{product.description}</p>
                : <p>Porcelaine fine, décors dorés à l&apos;or fin. Pièce fabriquée artisanalement.</p>
              }
            </Accordion>
            <Accordion title="Dimensions & capacité">
              <p>Consultez la fiche technique complète ou contactez-nous pour plus d&apos;informations sur les dimensions précises de cet article.</p>
            </Accordion>
            <Accordion title="Entretien">
              <p>Lavage à la main recommandé. Ne pas passer au micro-ondes ni au lave-vaisselle pour préserver les décors dorés.</p>
            </Accordion>
            <Accordion title="Livraison">
              <p>Livraison à Abidjan sous 24-48h. Livraison partout en Côte d&apos;Ivoire sous 3-5 jours ouvrables. Emballage cadeau disponible.</p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Produits similaires */}
      {related.length > 0 && (
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) var(--pad)',
          borderTop: '1px solid var(--line)',
          background: 'var(--cream)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
              Dans la même collection
            </p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: 'var(--ink)' }}>
              Vous aimerez aussi
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(related.length, 4)}, 1fr)`,
            gap: 'clamp(20px, 3vw, 36px)',
          }}>
            {related.map(p => <RelatedCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  )
}
