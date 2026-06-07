import type { Metadata } from 'next'
import { cinzel, cormorant, jost } from '@/lib/fonts'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { GrainOverlay }         from '@/components/layout/GrainOverlay'
import { ScrollProgress }       from '@/components/layout/ScrollProgress'
import { CustomCursor }         from '@/components/layout/CustomCursor'
import { IntroLoader }          from '@/components/layout/IntroLoader'
import { CartDrawer }          from '@/components/layout/CartDrawer'
import './globals.css'

export const metadata: Metadata = {
  title: "Maison Auréa — L'art de la table et de la décoration intérieure",
  description: "Des pièces choisies avec soin pour sublimer vos instants de vie. Livraison à Abidjan et partout en Côte d'Ivoire.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          <GrainOverlay />
          <ScrollProgress />
          <CustomCursor />
          <IntroLoader />
          <CartDrawer />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
