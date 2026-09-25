import { useRef, type PointerEvent } from 'react'
import gsap from 'gsap'
import { specialties, type Specialty } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionIntro } from './ui/SectionIntro'

/** Abstract marks — instruments and pathways, not clip-art organs. */
const marks: Record<Specialty['mark'], JSX.Element> = {
  orbit: (
    <>
      <circle cx="30" cy="30" r="19" />
      <circle cx="30" cy="30" r="8" />
      <path d="M30 11v-6M30 55v-6" />
    </>
  ),
  leaf: (
    <>
      <path d="M17 44c0-16 10-26 26-28 1 16-9 27-26 28Z" />
      <path d="M17 44c7-9 15-15 24-19" />
    </>
  ),
  pulse: (
    <>
      <path d="M8 31h10l5-13 7 26 6-19 4 6h12" />
      <circle cx="52" cy="31" r="2.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 24h36M15 32h30M19 40h22" />
      <path d="M30 14v32" opacity="0.45" />
    </>
  ),
  shield: (
    <>
      <path d="M30 10l17 7v13c0 11-7 18-17 21-10-3-17-10-17-21V17l17-7Z" />
      <path d="M23 31l5 5 10-11" />
    </>
  ),
  scan: (
    <>
      <path d="M12 19v-7h7M48 19v-7h-7M12 41v7h7M48 41v7h-7" />
      <path d="M12 30h36" />
      <circle cx="30" cy="30" r="9" opacity="0.5" />
    </>
  ),
}

function Card({ specialty, index }: { specialty: Specialty; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  const tints = ['bg-ivory', 'bg-mist', 'bg-sage-light/45', 'bg-sand/25', 'bg-ivory', 'bg-mist']
  const tint = tints[index % tints.length]

  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (reduced || !ref.current || event.pointerType !== 'mouse') return
    const bounds = ref.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    gsap.to(ref.current, {
      rotateY: x * 4.5,
      rotateX: -y * 4.5,
      duration: 0.8,
      ease: 'power3.out',
      transformPerspective: 900,
    })
  }

  const reset = () => {
    if (!ref.current) return
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' })
  }

  return (
    <article
      ref={ref}
      onPointerMove={tilt}
      onPointerLeave={reset}
      data-reveal
      className={`group relative flex flex-col justify-between p-8 shadow-card transition-[background-color,transform,box-shadow] duration-700 ease-calm hover:-translate-y-1 hover:shadow-lift md:p-10 ${tint}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <svg
        viewBox="0 0 60 60"
        className="h-14 w-14 stroke-slate-blue transition-transform duration-700 ease-calm group-hover:-translate-y-1"
        fill="none"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="presentation"
        focusable="false"
      >
        {marks[specialty.mark]}
      </svg>

      <div className="mt-14">
        <h3 className="font-display text-[1.6rem] leading-tight">{specialty.name}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/65">{specialty.description}</p>
        <a
          href="#appointment"
          className="mt-6 inline-flex items-center gap-2 text-sm text-slate-blue transition-colors duration-500 hover:text-charcoal"
        >
          Explore
          <span
            aria-hidden="true"
            className="block h-px w-6 bg-current transition-all duration-500 ease-calm group-hover:w-10"
          />
        </a>
      </div>
    </article>
  )
}

export function Specialties() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced, stagger: 0.07 })

  return (
    <section ref={ref} id="specialties" className="shell py-24 md:py-36">
      <SectionIntro
        index="Specialties"
        heading="Care across six practices."
        body="Demonstration categories for this concept. Each would link through to its own practice page in a live build."
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty, index) => (
          <Card key={specialty.id} specialty={specialty} index={index} />
        ))}
      </div>
    </section>
  )
}
