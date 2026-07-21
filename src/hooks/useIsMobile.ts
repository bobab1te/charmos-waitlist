import { useEffect, useState } from 'react'

/** Tracks whether the viewport is below the Tailwind `sm` breakpoint (640px). */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)')
    function update() {
      setIsMobile(window.innerWidth < 640)
    }
    update()
    mql.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      mql.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return isMobile
}
