import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CursorMode = 'default' | 'view' | 'hidden'

/* ─── Cart ─── */
export interface CartItem {
  id: number
  slug: string
  name: string
  price: number
  image: string
  qty: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'qty'>) => void
  removeFromCart: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  cartCount: () => number
  cartTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existing = state.items.find(i => i.id === item.id)
        if (existing) {
          return { items: state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) }
        }
        return { items: [...state.items, { ...item, qty: 1 }] }
      }),
      removeFromCart: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
      updateQty: (id, qty) => set(s => ({
        items: qty <= 0
          ? s.items.filter(i => i.id !== id)
          : s.items.map(i => i.id === id ? { ...i, qty } : i),
      })),
      clearCart: () => set({ items: [] }),
      cartCount: () => get().items.reduce((s, i) => s + i.qty, 0),
      cartTotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: 'maison-aurea-cart' },
  ),
)

/* ─── UI ─── */
interface UIStore {
  cursorMode: CursorMode
  setCursorMode: (mode: CursorMode) => void
  loaderDone: boolean
  setLoaderDone: () => void
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  cursorMode: 'default',
  setCursorMode: (mode) => set({ cursorMode: mode }),
  loaderDone: false,
  setLoaderDone: () => set({ loaderDone: true }),
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
}))
