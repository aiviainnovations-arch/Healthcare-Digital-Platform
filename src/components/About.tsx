import { principles } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionIntro } from './ui/SectionIntro'

export function About() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced })

  return (
    <section ref={ref} id="about" className="shell py-24 md:py-36">
      <SectionIntro
        index="About the clinic"
        heading={
          <>
            A different kind of
            <br />
            healthcare experience.
          </>
        }
        body="Aurelia is built around the parts of care that usually go missing: time to talk, results explained properly, and one team that stays with you between visits."
      />

      <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3">
        {principles.map((principle, index) => (
          <article
            key={principle.title}
            className={`p-8 shadow-card md:p-10 ${['bg-mist', 'bg-sage-light/40', 'bg-sand/25'][index]}`}
            data-reveal
          >
            <h3 className="font-display text-[1.75rem] leading-none">{principle.title}</h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal/65">{principle.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
