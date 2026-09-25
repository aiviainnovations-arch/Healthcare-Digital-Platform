import { useRef, type AnchorHTMLAttributes, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  /** How far the button drifts toward the cursor, in px. */
  strength?: number
}

/**
 * A button that leans very slightly toward the pointer. Strength is deliberately
 * low — this should read as weight, not as a toy.
 */
export function MagneticButton({
  children,
  variant = 'primary',
  strength = 6,
  className = '',
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = usePrefersReducedMotion()

  const move = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current || event.pointerType !== 'mouse') return
    const bounds = ref.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    gsap.to(ref.current, { x: x * strength * 2, y: y * strength, duration: 0.6, ease: 'power3.out' })
  }

  const reset = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
  }

  return (
    <a
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
