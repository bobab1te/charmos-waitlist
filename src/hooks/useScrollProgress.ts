import { useEffect, useState } from 'react'

/** 0 at the top of the page, ramping to 1 over roughly one viewport height of scroll. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    function update() {
      const distance = window.innerHeight * 0.9
      const value = Math.min(Math.max(window.scrollY / distance, 0), 1)
      setProgress(value)
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
