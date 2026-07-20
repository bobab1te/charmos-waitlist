import { useEffect, useRef, useState } from 'react'

/** Pointer position relative to viewport center, each axis in [-1, 1]. Stays at 0,0 on touch devices. */
export function usePointerParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ticking = useRef(false)

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setPos({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        })
        ticking.current = false
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pos
}
