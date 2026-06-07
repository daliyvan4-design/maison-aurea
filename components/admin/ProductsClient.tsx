'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { createProduct, updateProduct, deleteProduct, uploadProductImage } from '@/lib/actions'
import type { Product } from '@/lib/db/schema'

const CATEGORIES = [
  { value: 'art-de-la-table', label: 'Art de la table' },
  { value: 'verres',          label: 'Verres & accessoires' },
  { value: 'theieres',        label: 'Théières & service à thé' },
  { value: 'cuisine',         label: 'Cuisine & cuisson' },
  { value: 'coffrets',        label: 'Coffrets cadeaux' },
]

const STATUS_COLOR: Record<string, string> = {
  'art-de-la-table': '#C3A36C',
  'verres':          '#7CA8C4',
  'theieres':        '#9B8BC2',
  'cuisine':         '#C47C7C',
  'coffrets':        '#6CB87C',
}

type FormState = {
  name: string; slug: string; category: string
  price: string; stock: string; description: string
}

const EMPTY: FormState = {
  name: '', slug: '', category: 'art-de-la-table',
  price: '', stock: '0', description: '',
}

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function doUpload(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  return uploadProductImage(fd)
}

function ProductForm({
  initial,
  initialImage,
  editId,
  onDone,
}: {
  initial: FormState
  initialImage: string
  editId?: number
  onDone: () => void
}) {
  const [form, setForm]           = useState<FormState>(initial)
  const [imageUrl, setImageUrl]   = useState(initialImage)
  const [uploadError, setUploadError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value, ...(name === 'name' && !editId ? { slug: slugify(value) } : {}) }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const url = await doUpload(file)
      setImageUrl(url)
    } catch {
      setUploadError('Upload échoué — configurez BLOB_READ_WRITE_TOKEN ou Cloudinary.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      name:        form.name,
      slug:        form.slug,
      category:    form.category as Product['category'],
      price:       parseInt(form.price),
      stock:       parseInt(form.stock),
      description: form.description || null,
      images:      imageUrl ? [imageUrl] : [],
    }
    startTransition(async () => {
      if (editId) {
        await updateProduct(editId, data)
      } else {
        await createProduct(data)
      }
      onDone()
    })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: '1px solid var(--line)', borderRadius: 4,
    fontSize: 14, color: 'var(--ink)', background: '#FAFAF8',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff', borderRadius: 14, padding: 28,
      marginBottom: 24, boxShadow: '0 2px 12px rgba(70,60,48,0.08)',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
    }}>
      <h3 style={{
        gridColumn: '1 / -1',
        fontFamily: 'var(--font-cormorant), serif', fontSize: 22,
        color: 'var(--ink)', marginBottom: 4,
      }}>
        {editId ? 'Modifier le produit' : 'Nouveau produit'}
      </h3>

      {[
        { name: 'name',  label: 'Nom du produit', type: 'text',   required: true },
        { name: 'slug',  label: 'Slug URL',        type: 'text',   required: true },
        { name: 'price', label: 'Prix (FCFA)',      type: 'number', required: true },
        { name: 'stock', label: 'Stock',            type: 'number', required: false },
      ].map(f => (
        <div key={f.name}>
          <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
            {f.label}
          </label>
          <input
            name={f.name} type={f.type}
            value={form[f.name as keyof FormState]} onChange={handleChange}
            required={f.required}
            style={inputStyle}
          />
        </div>
      ))}

      <div>
        <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
          Catégorie
        </label>
        <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
          Photo produit
        </label>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input type="file" accept="image/*" onChange={handleImageUpload}
            style={{ fontSize: 13, color: 'var(--ink-soft)', flex: 1 }} />
          {uploading && <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Envoi...</span>}
          {imageUrl && !uploading && (
            <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
              <Image src={imageUrl} alt="preview" fill style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>
        {uploadError && (
          <p style={{ fontSize: 11, color: '#C47C7C', marginTop: 6 }}>{uploadError}</p>
        )}
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
          Description
        </label>
        <textarea
          name="description" value={form.description} onChange={handleChange}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" onClick={onDone} style={{
          padding: '11px 24px', borderRadius: 4,
          border: '1px solid var(--line)', background: '#fff',
          fontSize: 13, cursor: 'pointer', color: 'var(--ink)',
        }}>
          Annuler
        </button>
        <button type="submit" disabled={isPending || uploading} style={{
          padding: '11px 24px', borderRadius: 4,
          background: 'var(--gold)', color: '#fff',
          border: 'none', fontSize: 13, cursor: 'pointer',
          opacity: isPending || uploading ? 0.7 : 1,
        }}>
          {isPending ? 'Enregistrement...' : editId ? 'Mettre à jour' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}

export function ProductsClient({ products }: { products: Product[] }) {
  const [mode, setMode]       = useState<'idle' | 'create' | 'edit'>('idle')
  const [editing, setEditing] = useState<Product | null>(null)
  const [filter, setFilter]   = useState('all')
  const [isPending, startTransition] = useTransition()

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)

  const startEdit = (p: Product) => {
    setEditing(p)
    setMode('edit')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce produit ?')) return
    startTransition(() => deleteProduct(id))
  }

  const formInitial: FormState = editing ? {
    name:        editing.name,
    slug:        editing.slug,
    category:    editing.category,
    price:       String(editing.price),
    stock:       String(editing.stock),
    description: editing.description || '',
  } : EMPTY

  const formImage = editing ? ((editing.images as string[])?.[0] ?? '') : ''

  return (
    <div>
      {/* Filtres + bouton ajouter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[{ value: 'all', label: 'Tous' }, ...CATEGORIES].map(c => (
            <button key={c.value} onClick={() => setFilter(c.value)} style={{
              padding: '8px 16px', borderRadius: 20, border: '1px solid',
              borderColor: filter === c.value ? 'var(--gold)' : 'var(--line)',
              background:  filter === c.value ? 'var(--gold)' : '#fff',
              color:       filter === c.value ? '#fff' : 'var(--ink)',
              fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {c.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { setMode(m => m === 'create' ? 'idle' : 'create'); setEditing(null) }}
          style={{
            padding: '10px 22px', borderRadius: 6,
            background: mode === 'create' ? 'var(--ink)' : 'var(--gold)',
            color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}
        >
          {mode === 'create' ? '✕ Annuler' : '+ Ajouter un produit'}
        </button>
      </div>

      {mode === 'create' && (
        <ProductForm initial={EMPTY} initialImage="" onDone={() => setMode('idle')} />
      )}

      {mode === 'edit' && editing && (
        <ProductForm
          initial={formInitial}
          initialImage={formImage}
          editId={editing.id}
          onDone={() => { setMode('idle'); setEditing(null) }}
        />
      )}

      {/* Tableau produits */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(70,60,48,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--line)', background: '#FAFAF8' }}>
              {['Photo', 'Produit', 'Catégorie', 'Prix', 'Stock', 'Statut', ''].map(h => (
                <th key={h} style={{
                  padding: '14px 18px', textAlign: 'left',
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--ink-soft)', fontWeight: 500,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-soft)' }}>
                  Aucun produit — connectez la base Neon et lancez le seed.
                </td>
              </tr>
            ) : filtered.map(p => (
              <tr
                key={p.id}
                style={{
                  borderBottom: '1px solid var(--line)',
                  background: editing?.id === p.id ? '#FBF6EE' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'var(--sand)', position: 'relative' }}>
                    {(p.images as string[])?.[0] ? (
                      <Image src={(p.images as string[])[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--greige)' }} />
                    )}
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 16, color: 'var(--ink)' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{p.slug}</div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: 20, fontSize: 11,
                    background: `${STATUS_COLOR[p.category] || '#ccc'}22`,
                    color: STATUS_COLOR[p.category] || '#666',
                    letterSpacing: '0.06em',
                  }}>
                    {CATEGORIES.find(c => c.value === p.category)?.label || p.category}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--accent)', fontWeight: 500 }}>
                  {new Intl.NumberFormat('fr-FR').format(p.price)} FCFA
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ color: p.stock > 5 ? 'var(--ink)' : '#C47C7C', fontWeight: p.stock <= 5 ? 600 : 400 }}>
                    {p.stock}
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
                    background: p.active ? '#6CB87C' : '#C47C7C', marginRight: 8,
                  }} />
                  {p.active ? 'Actif' : 'Inactif'}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => startEdit(p)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--accent)', fontSize: 12, letterSpacing: '0.06em',
                    }}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(p.id)} disabled={isPending} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#C47C7C', fontSize: 12, letterSpacing: '0.06em',
                    }}>
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
