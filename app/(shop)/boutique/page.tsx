export const dynamic = 'force-dynamic'

import { getProducts } from '@/lib/actions'
import { BoutiqueClient } from './BoutiqueClient'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Boutique — Maison Auréa',
  description: 'Découvrez toute notre collection de vaisselle et art de la table.',
}

export default async function BoutiquePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try { products = await getProducts() } catch {}

  const active = products.filter(p => p.active)

  return (
    <>
      <Header />
      <main>
        <BoutiqueClient products={active} />
      </main>
      <Footer />
    </>
  )
}
