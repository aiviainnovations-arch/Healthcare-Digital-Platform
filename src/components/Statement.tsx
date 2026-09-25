import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * A single dark, high-contrast beat between About and Specialties.
 * The rest of the page stays in the ivory/mist range — this is the one
 * place the palette inverts, so it needs to happen exactly once.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const node = root.current
    if (!node) return

    if (reduced) {
      gsap.set(node.querySelectorAll('[data-reveal], [data-line]'), { clearProps: 'all', opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: node, start: 'top 78%', once: true },
        },
      )

      gsap.fromTo(
        '[data-line]',
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: node, start: 'top 65%', end: 'top 20%', scrub: 0.5 },
        },
      )

      gsap.to('[data-ring]', {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} className="band-dark relative overflow-hidden">
      <svg
        data-ring
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] opacity-[0.14] md:-right-24 md:-top-24"
        aria-hidden="true"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="#D8C8A8" strokeWidth="1" strokeDasharray="2 16" />
        <circle cx="300" cy="300" r="220" fill="none" stroke="#C7D8D1" strokeWidth="1" strokeDasharray="60 14" />
      </svg>

      <div className="shell relative py-28 md:py-40">
        <p className="eyebrow" data-reveal>
          Precision in care
        </p>
        <p className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,4.6vw,3.75rem)] italic leading-[1.12] text-ivory">
          <span className="block" data-line>
            Precision in care.
          </span>
          <span className="block text-sage-light" data-line>
            Comfort in every detail.
          </span>
        </p>
        <p className="mt-10 max-w-measure text-[1.0625rem] leading-relaxed text-ivory/60" data-reveal>
          Two things a clinic is rarely asked to hold at once. Aurelia is built on the belief that they
          shouldn't be a trade-off.
        </p>
      </div>
    </section>
  )
}
