'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useUIStore } from '@/lib/store'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Loader d'intro : overlay beige, logo dessiné + lockup doré,
// puis rideau translateY(-101vh). Désactivé sur prefers-reduced-motion.
export function IntroLoader() {
  const loaderDone    = useUIStore((s) => s.loaderDone)
  const setLoaderDone = useUIStore((s) => s.setLoaderDone)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setLoaderDone()
      setMounted(false)
      return
    }

    document.body.classList.add('is-loading')

    const timeout = setTimeout(() => {
      document.body.classList.remove('is-loading')
      setLoaderDone()
      setTimeout(() => setMounted(false), 1200)
    }, 1500)

    // Sécurité : retire le loader après 3.6s quoi qu'il arrive
    const safety = setTimeout(() => {
      if (document.body.classList.contains('is-loading')) {
        document.body.classList.remove('is-loading')
        setLoaderDone()
        setMounted(false)
      }
    }, 3600)

    return () => {
      clearTimeout(timeout)
      clearTimeout(safety)
      document.body.classList.remove('is-loading')
    }
  }, [setLoaderDone])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!loaderDone && (
        <motion.div
          key="loader"
          data-testid="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: '-101vh' }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9800,
            backgroundColor: 'var(--paper)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            {/* Logo mark PNG */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
              style={{ margin: '0 auto 14px', width: 96, height: 96, position: 'relative' }}
            >
              <Image
                src="/logo-mark.png"
                alt=""
                fill
                style={{ objectFit: 'contain' }}
                aria-hidden="true"
                priority
              />
            </motion.div>

            {/* Lockup MAISON AURÉA en dégradé or */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.5em',
                textIndent: '0.5em',
                background: 'linear-gradient(180deg, #D7BB80 0%, #C3A067 45%, #9A7836 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                MAISON
              </span>
              <span style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontWeight: 600,
                fontSize: '34px',
                letterSpacing: '0.12em',
                marginTop: '8px',
                background: 'linear-gradient(180deg, #D7BB80 0%, #C3A067 45%, #9A7836 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                AURÉA
              </span>
            </motion.div>

            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
              style={{
                marginTop: '12px',
                fontFamily: 'var(--font-jost), system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
              }}
            >
              L&apos;art de vivre au quotidien
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
