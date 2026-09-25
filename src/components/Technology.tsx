import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { technologyPillars } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useReveal } from '../hooks/useReveal'
import { SectionIntro } from './ui/SectionIntro'
import { MedicalTechnologyVideo } from './video/VideoBlock'

export function Technology() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced })
  const art = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (reduced || !art.current) return
    const ctx = gsap.context(() => {
      gsap.to('[data-ring]', {
        rotate: 360,
        duration: 90,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
        stagger: { each: 14, from: 'end' },
      })
      gsap.fromTo(
        '[data-wave]',
        { strokeDashoffset: 900 },
        { strokeDashoffset: 0, duration: 7, repeat: -1, ease: 'power1.inOut', repeatDelay: 1.2 },
      )
      gsap.to('[data-tick]', {
        opacity: 0.85,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.35, from: 'random' },
        ease: 'sine.inOut',
      })
    }, art)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="shell py-24 md:py-36">
      <SectionIntro
        index="Technology"
        heading="Precision, powered by technology."
        body="Imaging, records and monitoring held in one place, so the clinician in front of you already has the full picture."
      />

      <div className="mt-16 grid items-center gap-14 md:mt-24 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-square w-full overflow-hidden bg-sage-light/30 shadow-card">
          <svg
            ref={art}
            viewBox="0 0 600 600"
            className="h-full w-full"
            role="img"
            aria-label="Abstract diagnostic graphic: concentric scanning rings over a slow cardiac waveform."
          >
            <g fill="none" stroke="#8EA9A2" strokeWidth="1">
              <circle data-ring cx="300" cy="300" r="230" strokeDasharray="4 22" opacity="0.7" />
              <circle data-ring cx="300" cy="300" r="180" strokeDasharray="60 18" opacity="0.5" />
              <circle data-ring cx="300" cy="300" r="128" strokeDasharray="2 14" opacity="0.8" />
            </g>

            <rect x="150" y="248" width="300" height="104" fill="#6E8790" opacity="0.08" />
            <rect x="188" y="286" width="224" height="28" fill="#D8C8A8" opacity="0.22" />

            <path
              data-wave
              d="M80 300h96l14-42 20 86 16-62 12 18h54l18-30 16 30h174"
              fill="none"
              stroke="#6E8790"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="900"
            />

            <g fill="#8EA9A2" opacity="0.35">
              <circle data-tick cx="160" cy="180" r="3" />
              <circle data-tick cx="452" cy="212" r="3" />
              <circle data-tick cx="392" cy="438" r="3" />
              <circle data-tick cx="214" cy="414" r="3" />
              <circle data-tick cx="300" cy="140" r="3" />
            </g>
          </svg>
        </div>

        <div>
          <dl className="divide-y divide-charcoal/12 border-y border-charcoal/12">
            {technologyPillars.map((pillar) => (
              <div key={pillar.title} className="grid gap-2 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8" data-reveal>
                <dt className="font-display text-[1.35rem] leading-none">{pillar.title}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-charcoal/65">{pillar.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs leading-relaxed text-charcoal/45" data-reveal>
            Graphics on this page are decorative. No diagnostic data, results or measurements are
            shown anywhere on this site.
          </p>
        </div>
      </div>

      <MedicalTechnologyVideo className="mt-20 aspect-[16/7] w-full md:mt-28" />
    </section>
  )
}
