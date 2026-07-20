import { useScrollProgress } from '#/hooks/useScrollProgress'
import { usePointerParallax } from '#/hooks/usePointerParallax'

type Puff = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: number
  color: string
  duration: number
  delay: number
  driftX: number
  driftY: number
  depth: number
}

const PUFFS: Puff[] = [
  { top: '8%', left: '4%', size: 34, color: 'var(--charm-pink-deep)', duration: 16, delay: 0, driftX: 16, driftY: -14, depth: 18 },
  { top: '14%', right: '6%', size: 30, color: 'var(--charm-lavender-deep)', duration: 19, delay: 1.5, driftX: -18, driftY: -10, depth: 24 },
  { bottom: '20%', left: '8%', size: 26, color: 'var(--charm-blue-deep)', duration: 21, delay: 3, driftX: 14, driftY: 12, depth: 14 },
  { bottom: '10%', right: '10%', size: 28, color: 'var(--charm-yellow)', duration: 17, delay: 0.8, driftX: -12, driftY: 16, depth: 20 },
]

type Sparkle = { top: string; left: string; size: number; color: string; duration: number; delay: number }

const SPARKLES: Sparkle[] = [
  { top: '20%', left: '18%', size: 14, color: 'var(--charm-pink-deep)', duration: 3.2, delay: 0 },
  { top: '32%', left: '78%', size: 10, color: 'var(--charm-lavender-deep)', duration: 2.6, delay: 0.6 },
  { top: '66%', left: '14%', size: 12, color: 'var(--charm-blue-deep)', duration: 3.6, delay: 1.2 },
  { top: '72%', left: '84%', size: 16, color: 'var(--charm-pink-deep)', duration: 2.9, delay: 0.3 },
  { top: '10%', left: '52%', size: 9, color: 'var(--charm-yellow)', duration: 3.1, delay: 1.8 },
  { top: '84%', left: '48%', size: 11, color: 'var(--charm-lavender-deep)', duration: 2.7, delay: 2.1 },
]

function CloudPuff({ puff }: { puff: Puff }) {
  const vh = `${puff.size}vh`
  return (
    <div
      className="absolute"
      style={{ top: puff.top, bottom: puff.bottom, left: puff.left, right: puff.right }}
    >
      <div
        className="charm-float"
        style={
          {
            animationDuration: `${puff.duration}s`,
            animationDelay: `${puff.delay}s`,
            '--drift-x': `${puff.driftX}px`,
            '--drift-y': `${puff.driftY}px`,
          } as React.CSSProperties
        }
      >
        <div
          className="rounded-full blur-2xl"
          style={{
            width: vh,
            height: vh,
            background: `radial-gradient(circle, ${puff.color} 0%, transparent 72%)`,
            opacity: 0.55,
          }}
        />
      </div>
    </div>
  )
}

function Sparkle({ sparkle }: { sparkle: Sparkle }) {
  return (
    <div
      className="absolute charm-twinkle"
      style={{
        top: sparkle.top,
        left: sparkle.left,
        animationDuration: `${sparkle.duration}s`,
        animationDelay: `${sparkle.delay}s`,
      }}
    >
      <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 24 24" fill={sparkle.color} aria-hidden="true">
        <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
      </svg>
    </div>
  )
}

export function HeroDecor() {
  const progress = useScrollProgress()
  const pointer = usePointerParallax()
  const fade = 1 - progress * 0.7

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ opacity: fade }}>
      {/* sun glow anchor */}
      <div
        className="absolute left-1/2 top-[18%] h-[42vh] w-[42vh] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, #fffdf3 0%, #fff2c2 55%, transparent 75%)',
          opacity: 0.9 * (1 - progress * 0.6),
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pointer.x * -10}px, ${pointer.y * -8}px)` }}
      >
        {PUFFS.filter((_, i) => i % 2 === 0).map((puff, i) => (
          <CloudPuff key={i} puff={puff} />
        ))}
      </div>
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pointer.x * -18}px, ${pointer.y * -14}px)` }}
      >
        {PUFFS.filter((_, i) => i % 2 === 1).map((puff, i) => (
          <CloudPuff key={i} puff={puff} />
        ))}
      </div>

      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pointer.x * -6}px, ${pointer.y * -5}px)` }}
      >
        {SPARKLES.map((sparkle, i) => (
          <Sparkle key={i} sparkle={sparkle} />
        ))}
      </div>
    </div>
  )
}
