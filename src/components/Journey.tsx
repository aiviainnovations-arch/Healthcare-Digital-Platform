import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionIntro } from './ui/SectionIntro'
import { ClinicExperienceVideo } from './video/VideoBlock'

gsap.registerPlugin(ScrollTrigger)

export function Journey() {
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      // The rule draws itself as the section passes — the stage markers
      // brighten in step with it.
      gsap.fromTo(
        '[data-track-fill]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: '[data-track]', start: 'top 72%', end: 'bottom 62%', scrub: 0.6 },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-stage]').forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0.25, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: stage, start: 'top 82%', once: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="experience" className="shell py-24 md:py-36">
      <SectionIntro
        index="Patient experience"
        heading={
          <>
            Your journey,
            <br />
            made simple.
          </>
        }
        body="Four stages, from the first booking to the follow-up that closes the loop."
      />

      <div data-track className="mt-16 md:mt-24">
        <div className="relative hidden h-px w-full bg-charcoal/12 md:block">
          <div data-track-fill className="absolute inset-0 origin-left bg-slate-blue/60" />
        </div>

        <ol className="grid gap-12 md:grid-cols-4 md:gap-8 md:pt-10">
          {journey.map((stage) => (
            <li key={stage.step} data-stage className="relative md:pr-6">
              <span
                aria-hidden="true"
                className="absolute -top-[2.65rem] left-0 hidden h-1.5 w-1.5 rounded-full bg-slate-blue md:block"
              />
              <p className="font-display text-[1.05rem] text-slate-blue">{stage.step}</p>
              <h3 className="mt-3 font-display text-[1.75rem] leading-none">{stage.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/65">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <ClinicExperienceVideo className="mt-20 aspect-[16/7] w-full md:mt-28" />
    </section>
  )
}
