'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

// Wrapper magnétique : l'élément se déplace légèrement vers la souris,
// revient en douceur au repos. Transparent pour le style de l'enfant.
export function MagneticButton({ children, strength = 0.3, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width  / 2)
    const y = e.clientY - (r.top  + r.height / 2)
    gsap.to(el, { x: x * strength, y: y * (strength * 1.3), duration: 0.1, ease: 'power2.out', overwrite: 'auto' })
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
  }

  return (
    <div
      ref={ref}
      data-magnetic
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  )
}
