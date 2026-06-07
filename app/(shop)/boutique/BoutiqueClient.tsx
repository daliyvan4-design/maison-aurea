'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore, useUIStore } from '@/lib/store'
import type { Product } from '@/lib/db/schema'

const CATEGORIES = [
  { value: 'all',              label: 'Tout voir' },
  { value: 'art-de-la-table', label: 'Art de la table' },
  { value: 'verres',          label: 'Verres' },
  { value: 'theieres',        label: 'Théières' },
  { value: 'cuisine',         label: 'Cuisine' },
  { value: 'coffrets',        label: 'Coffrets' },
]

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
}

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const addToCart = useCartStore(s => s.addToCart)
  const openCart  = useUIStore(s => s.openCart)
  const images = product.images as string[]

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id:    product.id,
      slug:  product.slug,
      name:  product.name,
      price: product.price,
      image: images?.[0] ?? '',
    })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href={`/produit/${product.slug}`} style={{ display: 'block' }}>
        <div
          data-cursor="view"
          style={{
            position: 'relative',
            aspectRatio: '3/4',
            overflow: 'hidden',
            borderRadius: 6,
            background: 'var(--sand)',
            marginBottom: 16,
          }}
        >
          {images?.[0] ? (
            <Image
              src={images[0]} alt={product.name}
              fill style={{ objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}
              className="product-img"
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, var(--greige) 0%, var(--sand) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 32, opacity: 0.3, color: 'var(--ink)' }}>◈</span>
            </div>
          )}

          {product.featured && (
            <span style={{
              position: 'absolute', top: 14, left: 14,
              padding: '4px 10px', borderRadius: 3,
              background: 'var(--gold)', color: '#fff',
              fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>
              Coup de coeur
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span style={{
              position: 'absolute', top: 14, right: 14,
              padding: '4px 10px', borderRadius: 3,
              background: 'rgba(196,124,124,0.9)', color: '#fff',
              fontSize: 9, letterSpacing: '0.12em',
            }}>
              Dernières pièces
            </span>
          )}
        </div>
      </Link>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Link href={`/produit/${product.slug}`}>
          <h3 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 18, fontWeight: 400,
            color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2,
          }}>
            {product.name}
          </h3>
        </Link>
        <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, marginBottom: 14 }}>
          {fmt(product.price)}
        </p>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          style={{
            marginTop: 'auto',
            padding: '11px 0',
            background: added ? 'var(--ink)' : 'transparent',
            color: added ? '#fff' : 'var(--ink)',
            border: '1px solid var(--ink)',
            borderRadius: 3, cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            opacity: product.stock === 0 ? 0.4 : 1,
          }}
        >
          {product.stock === 0 ? 'Épuisé' : added ? '✓ Ajouté' : 'Ajouter au panier'}
        </button>
      </div>
    </article>
  )
}

export function BoutiqueClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter)

  return (
    <>
      {/* Hero */}
      <section style={{
        padding: 'clamp(60px, 8vw, 120px) var(--pad) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
        borderBottom: '1px solid var(--line)',
      }}>
        <p style={{
          fontFamily: 'var(--font-cinzel), serif',
          fontSize: 10, letterSpacing: '0.4em',
          textTransform: 'uppercase', color: 'var(--ink-soft)',
          marginBottom: 20,
        }}>
          Collection
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(40px, 6vw, 80px)',
          fontWeight: 300, color: 'var(--ink)', lineHeight: 1,
          marginBottom: 20,
        }}>
          La Boutique
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto' }}>
          Des pièces d&apos;exception pour sublimer votre quotidien
        </p>
      </section>

      {/* Filtres */}
      <section style={{
        padding: '24px var(--pad)',
        borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        position: 'sticky', top: 64, zIndex: 100,
        background: 'var(--paper)',
      }}>
        <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginRight: 8 }}>
          Filtrer
        </span>
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            style={{
              padding: '8px 18px', borderRadius: 20, border: '1px solid',
              borderColor: filter === c.value ? 'var(--gold)' : 'var(--line)',
              background:  filter === c.value ? 'var(--gold)' : 'transparent',
              color:       filter === c.value ? '#fff' : 'var(--ink)',
              fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
              transition: 'all 0.25s var(--ease)',
            }}
          >
            {c.label}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-soft)' }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        </span>
      </section>

      {/* Grille */}
      <section style={{ padding: 'clamp(40px, 5vw, 60px) var(--pad)' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-soft)' }}>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 24, marginBottom: 8 }}>
              Aucun article dans cette catégorie
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'clamp(24px, 3vw, 40px) clamp(16px, 2vw, 28px)',
          }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      <style>{`
        article:hover .product-img { transform: scale(1.04); }
      `}</style>
    </>
  )
}
