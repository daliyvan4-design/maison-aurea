import { create } from 'zustand'

export type CursorMode = 'default' | 'view' | 'hidden'

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
