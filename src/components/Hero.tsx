import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { brand, heroMedia } from '../data/site'
import { MagneticButton } from './ui/MagneticButton'
import { SceneMount } from './three/SceneMount'
import { SceneFallback } from './three/SceneFallback'
import { HeroVideo } from './video/VideoBlock'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // The page's one orchestrated moment: the masthead assembling itself.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
      tl.from('[data-hero-line]', { yPercent: 108, duration: 1.2, stagger: 0.09 })
        .from('[data-hero-body]', { opacity: 0, y: 18, duration: 0.9 }, '-=0.7')
        .from('[data-hero-action]', { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 }, '-=0.6')
        .from('[data-hero-meta]', { opacity: 0, duration: 1 }, '-=0.5')
        .from('[data-hero-media]', { opacity: 0, scale: 1.04, duration: 1.8 }, 0.1)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-[7.5rem] lg:pt-0">
      <div className="shell relative lg:flex lg:min-h-screen lg:items-center">
        <div className="relative z-10 lg:w-[54%] lg:py-32">
          <h1 className="text-display">
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                Care, designed
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block italic text-slate-blue" data-hero-line>
                around you.
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-measure text-[1.0625rem] leading-relaxed text-charcoal/70" data-hero-body>
            A modern approach to healthcare, combining clinical expertise, thoughtful technology and an
            experience designed around every patient.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="inline-flex" data-hero-action>
              <MagneticButton href="#appointment">Book an appointment</MagneticButton>
            </span>
            <span className="inline-flex" data-hero-action>
              <MagneticButton href="#specialties" variant="ghost" strength={4}>
                Explore our specialties
              </MagneticButton>
            </span>
          </div>

          <p className="mt-14 max-w-sm text-xs leading-relaxed text-charcoal/45" data-hero-meta>
            {brand.portfolioNotice}
          </p>
        </div>

        {/* Media column: bleeds to the right edge on desktop, sits below on mobile. */}
        <div
          className="relative mt-12 h-[62vh] min-h-[380px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[52%]"
          data-hero-media
        >
          {heroMedia === 'video' ? (
            <HeroVideo className="h-full w-full" />
          ) : (
            <SceneMount scene="hero" className="h-full w-full" fallback={<SceneFallback variant="hero" />} />
          )}

          {/* Rotating tagline badge — a small signature detail, not decoration for its own sake. */}
          <svg
            viewBox="0 0 160 160"
            className="pointer-events-none absolute bottom-8 right-6 hidden h-28 w-28 md:block"
            style={{ animation: reduced ? 'none' : 'spin 26s linear infinite' }}
            aria-hidden="true"
          >
            <defs>
              <path id="badge-path" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
            </defs>
            <circle cx="80" cy="80" r="62" fill="none" stroke="#222726" strokeOpacity="0.16" />
            <circle cx="80" cy="80" r="34" fill="none" stroke="#8EA9A2" strokeOpacity="0.55" />
            <text fontSize="10.5" letterSpacing="2.6" fill="#222726" fillOpacity="0.6">
              <textPath href="#badge-path" startOffset="0%">
                PRECISION IN CARE · AURELIA HEALTH ·
              </textPath>
            </text>
          </svg>

          {/* Soft edge so the scene dissolves into the page rather than sitting in a box. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-ivory to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
        </div>
      </div>
    </section>
  )
}
