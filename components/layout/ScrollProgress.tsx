'use client'

import { useEffect, useRef } from 'react'

// Barre de progression scroll fine en haut de page.
// scaleX est plus performant que width% (pas de reflow).
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const scrollable = scrollHeight - clientHeight
      const progress = scrollable > 0 ? scrollTop / scrollable : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      data-testid="scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'var(--gold)',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        zIndex: 8500,
        pointerEvents: 'none',
        transition: 'transform 0.1s linear',
      }}
    />
  )
}
