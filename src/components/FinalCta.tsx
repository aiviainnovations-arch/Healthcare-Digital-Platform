import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { MagneticButton } from './ui/MagneticButton'
import { SceneMount } from './three/SceneMount'
import { SceneFallback } from './three/SceneFallback'

export function FinalCta() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced, y: 18 })

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <SceneMount
        scene="cta"
        className="absolute inset-0 -z-10 h-full w-full"
        fallback={<SceneFallback variant="cta" />}
      />
      <div className="absolute inset-0 -z-10 bg-ivory/55" />

      <div className="shell flex min-h-[70vh] flex-col justify-center py-28 text-center md:py-40">
        <h2 className="text-editorial" data-reveal>
          Your health.
          <br />
          Your time.
          <br />
          <span className="italic text-slate-blue">Your experience.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-measure text-[1.0625rem] leading-relaxed text-charcoal/70" data-reveal>
          Thoughtful healthcare, designed around the people it serves.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          <MagneticButton href="#appointment">Book an appointment</MagneticButton>
          <MagneticButton href="#about" variant="ghost" strength={4}>
            Explore Aurelia Health
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
