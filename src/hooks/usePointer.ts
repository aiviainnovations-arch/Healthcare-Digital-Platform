import { useEffect, useRef } from 'react'

type Pointer = { x: number; y: number }

/**
 * Normalised pointer position (-1 → 1) held in a ref so three.js can read it
 * every frame without re-rendering React.
 */
export function usePointer(enabled = true) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return pointer
}
