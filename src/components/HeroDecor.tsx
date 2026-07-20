import { Heart, Hash, Sparkles as SparklesIcon } from 'lucide-react'
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

type Sparkle = { top: string; left: string; size: number; color: string; depth: number; duration: number; delay: number }

const SPARKLES: Sparkle[] = [
  { top: '12%', left: '20%', size: 20, color: '#ffffff', depth: 20, duration: 2.8, delay: 0 },
  { top: '8%', left: '64%', size: 16, color: '#ffffff', depth: 28, duration: 3.4, delay: 0.9 },
  { top: '18%', left: '82%', size: 22, color: '#ffffff', depth: 24, duration: 2.6, delay: 0.4 },
  { top: '28%', left: '8%', size: 18, color: '#fff2c2', depth: 14, duration: 3.1, delay: 1.6 },
  { top: '22%', left: '40%', size: 14, color: '#ffffff', depth: 16, duration: 3.0, delay: 1.2 },
  { top: '38%', left: '92%', size: 17, color: '#ffffff', depth: 30, duration: 2.9, delay: 0.2 },
  { top: '46%', left: '4%', size: 19, color: '#ffffff', depth: 18, duration: 3.6, delay: 2.1 },
  { top: '52%', left: '70%', size: 15, color: '#f6d9ea', depth: 22, duration: 2.9, delay: 1.1 },
  { top: '58%', left: '30%', size: 20, color: '#ffffff', depth: 26, duration: 3.3, delay: 0.6 },
  { top: '62%', left: '14%', size: 16, color: '#ffffff', depth: 16, duration: 3.2, delay: 0.7 },
  { top: '66%', left: '86%', size: 22, color: '#ffffff', depth: 30, duration: 2.5, delay: 1.9 },
  { top: '74%', left: '52%', size: 15, color: '#e0d4f7', depth: 20, duration: 2.7, delay: 1.5 },
  { top: '78%', left: '22%', size: 18, color: '#ffffff', depth: 24, duration: 3.5, delay: 0.3 },
  { top: '82%', left: '76%', size: 16, color: '#ffffff', depth: 18, duration: 2.8, delay: 2.3 },
  { top: '4%', left: '38%', size: 14, color: '#ffffff', depth: 22, duration: 3.1, delay: 1.8 },
  { top: '90%', left: '44%', size: 17, color: '#ffffff', depth: 26, duration: 2.6, delay: 0.5 },
]

type Pill = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  label: string
  icon: typeof Heart
  bg: string
  textColor: string
  rotate: number
  depth: number
  duration: number
  delay: number
  driftX: number
  driftY: number
}

const PILLS: Pill[] = [
  {
    top: '40%',
    left: '4%',
    label: 'creator-first',
    icon: Heart,
    bg: 'var(--charm-pink-deep)',
    textColor: 'var(--charm-ink)',
    rotate: -7,
    depth: 16,
    duration: 15,
    delay: 0.4,
    driftX: 10,
    driftY: -8,
  },
  {
    top: '44%',
    right: '3%',
    label: 'on-brand',
    icon: Hash,
    bg: 'var(--charm-blue-deep)',
    textColor: 'var(--charm-ink)',
    rotate: 6,
    depth: 20,
    duration: 17,
    delay: 1.4,
    driftX: -10,
    driftY: -6,
  },
  {
    bottom: '20%',
    left: '6%',
    label: 'organized',
    icon: SparklesIcon,
    bg: 'var(--charm-yellow)',
    textColor: 'var(--charm-ink)',
    rotate: 5,
    depth: 14,
    duration: 16,
    delay: 0.9,
    driftX: 8,
    driftY: 8,
  },
]

const BURST = {
  bottom: '15%',
  right: '5%',
  label: 'Effortless',
  bg: 'var(--charm-lavender-deep)',
  textColor: '#fff8fb',
  rotate: -8,
  depth: 22,
  duration: 18,
  delay: 0.2,
  driftX: -8,
  driftY: 10,
}

function Pill({ pill }: { pill: Pill }) {
  const Icon = pill.icon
  return (
    <div className="absolute" style={{ top: pill.top, bottom: pill.bottom, left: pill.left, right: pill.right }}>
      <div
        className="charm-float"
        style={
          {
            animationDuration: `${pill.duration}s`,
            animationDelay: `${pill.delay}s`,
            '--drift-x': `${pill.driftX}px`,
            '--drift-y': `${pill.driftY}px`,
          } as React.CSSProperties
        }
      >
        <div
          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 shadow-lg"
          style={{ background: pill.bg, color: pill.textColor, transform: `rotate(${pill.rotate}deg)` }}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
          <span className="whitespace-nowrap text-xs font-bold sm:text-sm">{pill.label}</span>
        </div>
      </div>
    </div>
  )
}

function Burst() {
  return (
    <div className="absolute" style={{ top: BURST.top, bottom: BURST.bottom, left: BURST.left, right: BURST.right }}>
      <div
        className="charm-float"
        style={
          {
            animationDuration: `${BURST.duration}s`,
            animationDelay: `${BURST.delay}s`,
            '--drift-x': `${BURST.driftX}px`,
            '--drift-y': `${BURST.driftY}px`,
          } as React.CSSProperties
        }
      >
        <div
          className="relative flex h-24 w-24 items-center justify-center"
          style={{ transform: `rotate(${BURST.rotate}deg)` }}
        >
          <div className="absolute inset-0 rounded-[30%]" style={{ background: BURST.bg }} />
          <div className="absolute inset-0 rotate-45 rounded-[30%]" style={{ background: BURST.bg }} />
          <span
            className="relative z-10 font-display text-sm font-bold italic"
            style={{ color: BURST.textColor }}
          >
            {BURST.label}
          </span>
        </div>
      </div>
    </div>
  )
}

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

function Sparkle({ sparkle, pointer }: { sparkle: Sparkle; pointer: { x: number; y: number } }) {
  return (
    <div
      className="absolute charm-twinkle transition-transform duration-300 ease-out"
      style={{
        top: sparkle.top,
        left: sparkle.left,
        animationDuration: `${sparkle.duration}s`,
        animationDelay: `${sparkle.delay}s`,
        transform: `translate(${pointer.x * -sparkle.depth}px, ${pointer.y * -sparkle.depth}px)`,
      }}
    >
      <svg
        width={sparkle.size}
        height={sparkle.size}
        viewBox="0 0 24 24"
        fill={sparkle.color}
        aria-hidden="true"
        style={{ filter: `drop-shadow(0 0 6px ${sparkle.color}) drop-shadow(0 0 3px rgba(255,255,255,0.9))` }}
      >
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
      {/* soft glow behind the CharmOS title/logo — kept subtle so text contrast holds up */}
      <div
        className="absolute left-1/2 top-[24%] h-[26vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, #fff6da 0%, #ffedb0 45%, transparent 75%)',
          opacity: 0.55 * (1 - progress * 0.6),
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

      {SPARKLES.map((sparkle, i) => (
        <Sparkle key={i} sparkle={sparkle} pointer={pointer} />
      ))}

      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pointer.x * -18}px, ${pointer.y * -12}px)` }}
      >
        {PILLS.map((pill, i) => (
          <Pill key={i} pill={pill} />
        ))}
        <Burst />
      </div>
    </div>
  )
}
