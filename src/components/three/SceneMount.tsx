import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Global 3D kill switch.
 * Set to false to ship the site with fallback visuals only — three.js is
 * dynamically imported, so it never enters the bundle a visitor downloads.
 */
export const ENABLE_3D = true

const scenes = {
  hero: lazy(() => import('./HeroScene')),
  cta: lazy(() => import('./CtaScene')),
}

type Props = {
  scene: keyof typeof scenes
  /** Shown on mobile, with reduced motion, while loading, or if 3D is off. */
  fallback: ReactNode
  className?: string
}

export function SceneMount({ scene, fallback, className = '' }: Props) {
  const isDesktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const host = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  const allowed = ENABLE_3D && isDesktop && !reduced

  // Only start downloading the scene chunk when it is close to the viewport.
  useEffect(() => {
    if (!allowed || !host.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(host.current)
    return () => observer.disconnect()
  }, [allowed])

  const Scene = scenes[scene]

  return (
    <div ref={host} className={className} aria-hidden="true">
      {allowed && inView ? (
        <Suspense fallback={fallback}>
          <Scene />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
