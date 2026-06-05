'use client'

import { useEffect, useRef } from 'react'
import { useUIStore } from '@/lib/store'

// Curseur custom : petit point qui suit la souris avec lerp 0.18.
// Expand en cercle 80px + label "Voir" sur [data-cursor="view"].
// Masqué automatiquement sur touch devices (hover:none).
export function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const posTarget  = useRef({ x: -200, y: -200 })
  const posCurrent = useRef({ x: -200, y: -200 })
  const rafId      = useRef<number>(0)
  const isView     = useRef(false)

  const setCursorMode = useUIStore((s) => s.setCursorMode)

  useEffect(() => {
    const cursor = cursorRef.current
    const label  = labelRef.current
    if (!cursor || !label) return

    if (window.matchMedia('(hover: none)').matches) {
      cursor.style.display = 'none'
      return
    }

    const applyMode = () => {
      if (!cursor || !label) return
      if (isView.current) {
        cursor.style.width           = '80px'
        cursor.style.height          = '80px'
        cursor.style.backgroundColor = 'rgba(70, 60, 48, 0.9)'
        label.style.opacity          = '1'
        label.style.transform        = 'scale(1)'
      } else {
        cursor.style.width           = '8px'
        cursor.style.height          = '8px'
        cursor.style.backgroundColor = 'var(--ink)'
        label.style.opacity          = '0'
        label.style.transform        = 'scale(0.6)'
      }
    }

    const onMove = (e: MouseEvent) => {
      posTarget.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      isView.current = el?.dataset.cursor === 'view'
      setCursorMode(isView.current ? 'view' : 'default')
      applyMode()
    }

    const loop = () => {
      posCurrent.current.x += (posTarget.current.x - posCurrent.current.x) * 0.18
      posCurrent.current.y += (posTarget.current.y - posCurrent.current.y) * 0.18
      if (cursor) {
        cursor.style.transform =
          `translate(${posCurrent.current.x}px, ${posCurrent.current.y}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [setCursorMode])

  return (
    <div
      ref={cursorRef}
      data-testid="custom-cursor"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        zIndex: 9500,
        pointerEvents: 'none',
        width: '8px', height: '8px',
        borderRadius: '50%',
        backgroundColor: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: [
          'width 0.5s cubic-bezier(0.22,1,0.36,1)',
          'height 0.5s cubic-bezier(0.22,1,0.36,1)',
          'background-color 0.4s cubic-bezier(0.22,1,0.36,1)',
        ].join(', '),
      }}
    >
      <span
        ref={labelRef}
        style={{
          fontFamily: 'var(--font-jost), system-ui, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#fff',
          opacity: 0,
          transform: 'scale(0.6)',
          transition: 'opacity 0.4s, transform 0.4s',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Voir
      </span>
    </div>
  )
}
