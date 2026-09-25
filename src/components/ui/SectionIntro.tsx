import type { ReactNode } from 'react'

type Props = {
  /** Short index word shown against the hairline, e.g. "Specialties". */
  index: string
  heading: ReactNode
  body?: ReactNode
  align?: 'left' | 'wide'
}

/**
 * Shared section opening: a hairline rule carrying the section index on the
 * left, with the editorial heading set against it.
 */
export function SectionIntro({ index, heading, body, align = 'left' }: Props) {
  return (
    <header className="rule-top pt-6 md:pt-8">
      <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10">
        <p className="eyebrow pt-1.5" data-reveal>
          {index}
        </p>
        <div className={align === 'wide' ? '' : 'max-w-4xl'}>
          <h2 className="text-editorial" data-reveal>
            {heading}
          </h2>
          {body ? (
            <p className="mt-6 max-w-measure text-[1.0625rem] leading-relaxed text-charcoal/70" data-reveal>
              {body}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  )
}
