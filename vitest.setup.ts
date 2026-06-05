import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

vi.mock('next/font/google', () => ({
  Cinzel: () => ({ variable: '--font-cinzel', className: 'mock-cinzel', style: { fontFamily: 'Cinzel' } }),
  Cormorant_Garamond: () => ({ variable: '--font-cormorant', className: 'mock-cormorant', style: { fontFamily: 'Cormorant Garamond' } }),
  Jost: () => ({ variable: '--font-jost', className: 'mock-jost', style: { fontFamily: 'Jost' } }),
}))

vi.mock('geist/font/sans', () => ({
  GeistSans: { variable: '--font-geist', className: 'mock-geist', style: { fontFamily: 'Geist' } },
}))

vi.mock('gsap', () => {
  const tl = { to: vi.fn().mockReturnThis(), from: vi.fn().mockReturnThis(), fromTo: vi.fn().mockReturnThis(), play: vi.fn().mockReturnThis(), kill: vi.fn() }
  const mock = {
    registerPlugin: vi.fn(), to: vi.fn(), from: vi.fn(), fromTo: vi.fn(), set: vi.fn(),
    timeline: vi.fn(() => tl),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
    utils: { toArray: vi.fn((x: unknown) => (Array.isArray(x) ? x : [x])) },
  }
  return { default: mock, gsap: mock }
})

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { update: vi.fn(), refresh: vi.fn(), kill: vi.fn() },
  default: { update: vi.fn(), refresh: vi.fn(), kill: vi.fn() },
}))

vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    raf: vi.fn(), destroy: vi.fn(), on: vi.fn(), scrollTo: vi.fn(),
  })),
}))

vi.mock('motion/react', () => {
  const tags = ['div','span','p','h1','h2','h3','h4','section','article','header','footer','main','aside','nav','figure','ul','li','a','button']
  const motion: Record<string, unknown> = {}
  tags.forEach(tag => {
    motion[tag] = React.forwardRef(
      (props: Record<string, unknown>, ref: React.Ref<unknown>) =>
        React.createElement(tag, { ...props, ref })
    )
  })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0, on: vi.fn(), onChange: vi.fn() } }),
    useSpring: (v: unknown) => v,
    useTransform: (_v: unknown, _r: unknown, output: unknown[]) => ({ get: () => output[0], on: vi.fn() }),
    useMotionValue: (initial: number) => ({ get: () => initial, set: vi.fn(), on: vi.fn() }),
    LayoutGroup: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
  }
})
