import { testimonials } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionIntro } from './ui/SectionIntro'

export function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced, stagger: 0.1 })

  return (
    <section ref={ref} className="shell py-24 md:py-36">
      <SectionIntro
        index="Feedback"
        heading="How the review section would read."
        body="Placeholder text, shown to demonstrate layout. This concept contains no real patient reviews."
      />

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <figure
            key={item.attribution}
            className={`p-8 shadow-card md:p-10 ${['bg-ivory', 'bg-mist', 'bg-sage-light/40'][index]}`}
            data-reveal
          >
            <span className="eyebrow">Demo content</span>
            <blockquote className="mt-6 font-display text-[1.3rem] leading-snug text-charcoal/85">
              {item.quote}
            </blockquote>
            <figcaption className="mt-8 text-[0.8rem] text-charcoal/50">{item.attribution}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
