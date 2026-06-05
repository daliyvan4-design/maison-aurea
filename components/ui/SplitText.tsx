'use client'

import {
  useRef, useEffect, createElement,
  type ElementType, type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  trigger?: 'scroll' | 'immediate'
}

// Découpe le texte en mots, chaque mot masqué par overflow:hidden + translateY.
// Reveal par stagger GSAP depuis le bas.
export function SplitText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  trigger = 'scroll',
}: SplitTextProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const words = children.trim().split(/\s+/)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrapper.querySelectorAll<HTMLElement>('[data-word]').forEach((el) => {
        el.style.transform = 'translateY(0)'
        el.style.opacity   = '1'
      })
      return
    }

    const wordEls = wrapper.querySelectorAll<HTMLElement>('[data-word]')
    const anim = {
      y: '0%', opacity: 1,
      duration: 1.1,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      stagger: 0.06,
      delay,
    }

    if (trigger === 'immediate') {
      gsap.fromTo(wordEls, { y: '105%', opacity: 0 }, anim)
    } else {
      gsap.fromTo(wordEls, { y: '105%', opacity: 0 }, {
        ...anim,
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, [delay, trigger])

  return createElement(
    Tag,
    { ref: wrapperRef, className, 'aria-label': children } as Record<string, unknown>,
    words.map((word, i) => (
      <span
        key={i}
        aria-hidden="true"
        style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
      >
        <span
          data-word
          style={{ display: 'inline-block', transform: 'translateY(105%)', opacity: 0 }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </span>
      </span>
    ))
  ) as ReactNode
}
