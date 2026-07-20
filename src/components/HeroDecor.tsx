import { useScrollProgress } from '#/hooks/useScrollProgress'
import { usePointerParallax } from '#/hooks/usePointerParallax'

type Cloud = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: number
  color: string
  opacity: number
  depth: number
  duration: number
  delay: number
  driftX: number
  driftY: number
}

const CLOUDS: Cloud[] = [
  { bottom: '-6%', left: '-4%', size: 92, color: '#ffffff', opacity: 0.85, depth: 26, duration: 20, delay: 0, driftX: 10, driftY: -6 },
  { bottom: '-8%', right: '-5%', size: 108, color: '#ffffff', opacity: 0.8, depth: 32, duration: 23, delay: 1.2, driftX: -12, driftY: -8 },
  { top: '6%', left: '2%', size: 54, color: 'var(--charm-lavender)', opacity: 0.55, depth: 12, duration: 18, delay: 2, driftX: 8, driftY: 6 },
  { top: '10%', right: '8%', size: 46, color: 'var(--charm-lavender)', opacity: 0.5, depth: 10, duration: 21, delay: 0.6, driftX: -8, driftY: 5 },
]

function CloudShape({ cloud }: { cloud: Cloud }) {
  return (
    <div className="absolute" style={{ top: cloud.top, bottom: cloud.bottom, left: cloud.left, right: cloud.right }}>
      <div
        className="charm-float"
        style={
          {
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
            '--drift-x': `${cloud.driftX}px`,
            '--drift-y': `${cloud.driftY}px`,
          } as React.CSSProperties
        }
      >
        <div
          className="charm-cloud"
          style={
            {
              fontSize: `${cloud.size}px`,
              '--cloud-color': cloud.color,
              opacity: cloud.opacity,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  )
}

export function HeroDecor() {
  const progress = useScrollProgress()
  const pointer = usePointerParallax()
  const fade = 1 - progress * 0.7

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ opacity: fade }}>
      {/* outer glow halo */}
      <div
        className="absolute left-1/2 top-[20%] h-[54vh] w-[54vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl charm-sun-pulse"
        style={{
          background: 'radial-gradient(circle, #fff3c4 0%, #ffdd8a 45%, transparent 72%)',
          opacity: 0.85 * (1 - progress * 0.6),
        }}
      />

      {/* solid glowing sun sphere */}
      <div
        className="absolute left-1/2 top-[20%] h-[26vh] w-[26vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 34% 30%, #fffef4 0%, #ffedb0 26%, #ffd876 50%, #f7b955 72%, #ee9f4d 100%)',
          boxShadow: '0 0 90px 22px rgba(255, 205, 120, 0.4)',
          opacity: 1 - progress * 0.5,
          transform: `translate(calc(-50% + ${pointer.x * -4}px), calc(-50% + ${pointer.y * -3}px))`,
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pointer.x * -12}px, ${pointer.y * -8}px)` }}
      >
        {CLOUDS.filter((c) => c.depth <= 15).map((cloud, i) => (
          <CloudShape key={i} cloud={cloud} />
        ))}
      </div>
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pointer.x * -26}px, ${pointer.y * -16}px)` }}
      >
        {CLOUDS.filter((c) => c.depth > 15).map((cloud, i) => (
          <CloudShape key={i} cloud={cloud} />
        ))}
      </div>
    </div>
  )
}
