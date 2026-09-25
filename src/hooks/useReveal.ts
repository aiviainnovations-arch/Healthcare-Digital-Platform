import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Single easing + duration pair for the whole site, so motion reads as one hand. */
export const calm = { duration: 1.1, ease: 'power3.out' } as const

type Options = {
  /** Stagger between children marked [data-reveal]. */
  stagger?: number
  /** Distance the element travels up, in px. */
  y?: number
  start?: string
  /** Skip entirely (reduced motion). */
  disabled?: boolean
}

/**
 * Reveals any descendant carrying [data-reveal] once its section scrolls in.
 * Returns the ref to attach to the section element.
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  stagger = 0.09,
  y = 26,
  start = 'top 78%',
  disabled = false,
}: Options = {}) {
  const scope = useRef<T>(null)

  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return

    if (disabled) {
      gsap.set(root.querySelectorAll('[data-reveal]'), { clearProps: 'all', opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
      if (!targets.length) return

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          stagger,
          ...calm,
          scrollTrigger: { trigger: root, start, once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [stagger, y, start, disabled])

  return scope
}
