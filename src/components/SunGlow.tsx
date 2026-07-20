import { useScrollProgress } from '#/hooks/useScrollProgress'

export function SunGlow() {
  const progress = useScrollProgress()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-[18%] h-[42vh] w-[42vh] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, #fffdf3 0%, #fff2c2 55%, transparent 75%)',
          opacity: 0.9 * (1 - progress * 0.6),
        }}
      />
    </div>
  )
}
