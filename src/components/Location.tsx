import { contact } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { MagneticButton } from './ui/MagneticButton'
import { SectionIntro } from './ui/SectionIntro'

export function Location() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced })

  return (
    <section ref={ref} id="contact" className="bg-mist/50 py-24 md:py-36">
      <div className="shell">
        <SectionIntro
          index="Visiting"
          heading="Where you would find us."
          body="Placeholder address and contact details. Aurelia Health does not exist as a business, and none of these details connect anywhere."
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <address className="font-display text-[1.75rem] not-italic leading-snug">
              {contact.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <dl className="mt-10 space-y-4 text-[0.95rem] text-charcoal/65">
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 text-charcoal/45">Phone</dt>
                <dd>{contact.phone}</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 text-charcoal/45">Email</dt>
                <dd>{contact.email}</dd>
              </div>
            </dl>

            <dl className="mt-10 border-t border-charcoal/12 pt-6 text-[0.95rem] text-charcoal/65">
              {contact.hours.map(([days, time]) => (
                <div key={days} className="flex justify-between gap-6 border-b border-charcoal/12 py-3">
                  <dt>{days}</dt>
                  <dd className="text-charcoal/50">{time}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="#appointment">Book an appointment</MagneticButton>
              <MagneticButton href="#contact" variant="ghost" strength={4}>
                Get directions
              </MagneticButton>
            </div>
          </div>

          {/* Abstract map — deliberately not a real location. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory shadow-lift lg:aspect-auto lg:min-h-[28rem]">
            <svg
              viewBox="0 0 800 620"
              className="h-full w-full"
              role="img"
              aria-label="Stylised map illustration marking a placeholder clinic location."
            >
              <rect width="800" height="620" fill="#F7F5F0" />
              <g stroke="#222726" strokeOpacity="0.09" strokeWidth="1">
                <path d="M0 120h800M0 250h800M0 380h800M0 510h800" />
                <path d="M140 0v620M300 0v620M470 0v620M640 0v620" />
              </g>
              <path d="M0 380h300l90-130h410" stroke="#8EA9A2" strokeWidth="6" fill="none" opacity="0.5" />
              <path d="M300 620V380" stroke="#8EA9A2" strokeWidth="6" fill="none" opacity="0.5" />
              <rect x="150" y="262" width="130" height="100" fill="#E9EFEA" />
              <rect x="500" y="400" width="180" height="120" fill="#E9EFEA" />
              <rect x="330" y="150" width="90" height="80" fill="#E9EFEA" />
              <g>
                <circle cx="390" cy="250" r="34" fill="#6E8790" opacity="0.12" />
                <circle cx="390" cy="250" r="7" fill="#6E8790" />
              </g>
              <text x="418" y="246" fontFamily="Inter, sans-serif" fontSize="15" fill="#222726" opacity="0.7">
                Aurelia Health
              </text>
              <text x="418" y="268" fontFamily="Inter, sans-serif" fontSize="12.5" fill="#222726" opacity="0.4">
                Illustrative location
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
