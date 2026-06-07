export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/actions'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProduitClient } from './ProduitClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try { products = await getProducts() } catch {}
  const product = products.find(p => p.slug === slug)
  if (!product) return { title: 'Produit — Maison Auréa' }
  return {
    title: `${product.name} — Maison Auréa`,
    description: product.description ?? `Découvrez ${product.name}`,
  }
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try { products = await getProducts() } catch {}

  const product = products.find(p => p.slug === slug && p.active)
  if (!product) notFound()

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id && p.active)
    .slice(0, 4)

  return (
    <>
      <Header />
      <main>
        <ProduitClient product={product} related={related} />
      </main>
      <Footer />
    </>
  )
}
