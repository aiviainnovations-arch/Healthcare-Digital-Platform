import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type Props = {
  /** Paths inside /public, e.g. '/videos/hero.mp4'. Omit both to show the poster only. */
  mp4?: string
  webm?: string
  poster: string
  /** Describes the footage for people who cannot see it. */
  label: string
  className?: string
}

/**
 * Autoplaying brand film with a poster-first strategy:
 * nothing downloads until the block is near the viewport, and on small screens
 * or with reduced motion the poster is all that ever loads.
 */
export function VideoBlock({ mp4, webm, poster, label, className = '' }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)
  const reduced = usePrefersReducedMotion()
  const isSmall = useMediaQuery('(max-width: 767px)')

  const hasSource = Boolean(mp4 || webm)
  const shouldPlay = hasSource && !reduced && !isSmall

  useEffect(() => {
    if (!shouldPlay || !host.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '200px', threshold: 0.01 },
    )
    observer.observe(host.current)
    return () => observer.disconnect()
  }, [shouldPlay])

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (active) {
      // Autoplay can still be refused; the poster stays visible if so.
      void element.play().catch(() => undefined)
    } else {
      element.pause()
    }
  }, [active])

  return (
    <div ref={host} className={`relative overflow-hidden bg-mist ${className}`}>
      {shouldPlay ? (
        <video
          ref={video}
          className="h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
        >
          {webm ? <source src={webm} type="video/webm" /> : null}
          {mp4 ? <source src={mp4} type="video/mp4" /> : null}
        </video>
      ) : (
        <img src={poster} alt={label} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      )}
    </div>
  )
}

/* Named wrappers so replacing a film is a one-line change in this file. */

export const HeroVideo = (props: { className?: string }) => (
  <VideoBlock
    poster="/images/poster-hero.svg"
    label="A camera moving slowly through a bright, calm clinic interior."
    className={props.className}
    // mp4="/videos/hero.mp4"
    // webm="/videos/hero.webm"
  />
)

export const ClinicExperienceVideo = (props: { className?: string }) => (
  <VideoBlock
    poster="/images/poster-clinic.svg"
    label="Daylight moving across stone and glass surfaces in a clinic waiting room."
    className={props.className}
    // mp4="/videos/clinic-experience.mp4"
    // webm="/videos/clinic-experience.webm"
  />
)

export const MedicalTechnologyVideo = (props: { className?: string }) => (
  <VideoBlock
    poster="/images/poster-technology.svg"
    label="Abstract scanning rings and soft diagnostic light on a pale surface."
    className={props.className}
    // mp4="/videos/medical-technology.mp4"
    // webm="/videos/medical-technology.webm"
  />
)
