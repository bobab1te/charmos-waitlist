import type { ReactNode } from 'react'
import { useRevealOnScroll } from '#/hooks/useRevealOnScroll'

export function RevealSection({ children }: { children: ReactNode }) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`transition-all duration-[400ms] ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
