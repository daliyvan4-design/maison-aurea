import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google'

// Police logo / titres de section : Cinzel (style lapidaire, letters uppercase)
export const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Police display / corps éditorial : Cormorant Garamond (serif élégant, italique expressif)
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Police UI / labels / boutons : Jost (géométrique, neutre, propre)
export const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500'],
  display: 'swap',
})
