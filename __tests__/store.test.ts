import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from '@/lib/store'

beforeEach(() => {
  useUIStore.setState({ cursorMode: 'default', loaderDone: false, cartOpen: false })
})

describe('UIStore', () => {
  it('initialise avec les valeurs par défaut', () => {
    const s = useUIStore.getState()
    expect(s.cursorMode).toBe('default')
    expect(s.loaderDone).toBe(false)
    expect(s.cartOpen).toBe(false)
  })

  it('setCursorMode("view") met à jour cursorMode', () => {
    useUIStore.getState().setCursorMode('view')
    expect(useUIStore.getState().cursorMode).toBe('view')
  })

  it('setLoaderDone() passe loaderDone à true', () => {
    useUIStore.getState().setLoaderDone()
    expect(useUIStore.getState().loaderDone).toBe(true)
  })

  it('openCart / closeCart bascule cartOpen', () => {
    useUIStore.getState().openCart()
    expect(useUIStore.getState().cartOpen).toBe(true)
    useUIStore.getState().closeCart()
    expect(useUIStore.getState().cartOpen).toBe(false)
  })
})
