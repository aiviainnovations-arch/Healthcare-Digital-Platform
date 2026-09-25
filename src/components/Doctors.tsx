import { useState } from 'react'
import { doctors, type Doctor } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionIntro } from './ui/SectionIntro'

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [open, setOpen] = useState(false)
  const panelId = `${doctor.id}-profile`

  return (
    <article data-reveal className="group">
      <div className="relative overflow-hidden shadow-card">
        <img
          src={doctor.portrait}
          alt={`Illustrated placeholder portrait representing ${doctor.name}.`}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          width="640"
          height="800"
        />
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.5rem] leading-tight">{doctor.name}</h3>
        <p className="text-[0.8rem] text-slate-blue">{doctor.specialty}</p>
      </div>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/65">{doctor.intro}</p>

      <button
        type="button"
        className="mt-5 inline-flex items-center gap-2 text-sm text-charcoal/70 transition-colors duration-500 hover:text-charcoal"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide profile' : 'View profile'}
        <span
          aria-hidden="true"
          className={`block h-px w-6 bg-current transition-transform duration-500 ease-calm ${
            open ? 'scale-x-50' : ''
          }`}
        />
      </button>

      {/* Height animates via grid rows — no layout thrash, no library. */}
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-700 ease-calm ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-4 border-l border-charcoal/15 pl-4 text-[0.9rem] leading-relaxed text-charcoal/55">
            Full clinician profiles are outside the scope of this concept. In a live build this panel
            would hold consultation languages, availability and a booking link. No credentials or
            qualifications are shown, because {doctor.name} is a fictional person.
          </p>
        </div>
      </div>
    </article>
  )
}

export function Doctors() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced, stagger: 0.12 })

  return (
    <section ref={ref} id="doctors" className="bg-mist/50 py-24 md:py-36">
      <div className="shell">
        <SectionIntro
          index="Doctors"
          heading="The people you would actually see."
          body="Three fictional clinicians, used here to show how the team section is composed. Portraits are illustrated placeholders."
        />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  )
}
