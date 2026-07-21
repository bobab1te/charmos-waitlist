type DecorCloud = { top?: string; bottom?: string; left?: string; right?: string; size: number }
type DecorSparkle = { top: string; left: string; size: number }

function Cloud({ cloud, index }: { cloud: DecorCloud; index: number }) {
  return (
    <div className="absolute" style={{ top: cloud.top, bottom: cloud.bottom, left: cloud.left, right: cloud.right }}>
      <div
        className="charm-float"
        style={
          {
            animationDuration: `${16 + index * 2.5}s`,
            animationDelay: `${index * 0.8}s`,
            '--drift-x': `${index % 2 === 0 ? 8 : -8}px`,
            '--drift-y': `${index % 2 === 0 ? -6 : 6}px`,
          } as React.CSSProperties
        }
      >
        <div
          className="charm-cloud"
          style={{ fontSize: `${cloud.size}px`, '--cloud-color': '#ffffff', opacity: 0.7 } as React.CSSProperties}
        />
      </div>
    </div>
  )
}

function Sparkle({ sparkle, index }: { sparkle: DecorSparkle; index: number }) {
  return (
    <div
      className="absolute charm-twinkle"
      style={{
        top: sparkle.top,
        left: sparkle.left,
        animationDuration: `${2.6 + index * 0.4}s`,
        animationDelay: `${index * 0.6}s`,
      }}
    >
      <svg
        width={sparkle.size}
        height={sparkle.size}
        viewBox="0 0 24 24"
        fill="#ffffff"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.85))' }}
      >
        <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
      </svg>
    </div>
  )
}

export function SectionDecor({ clouds, sparkles }: { clouds: DecorCloud[]; sparkles: DecorSparkle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {clouds.map((cloud, i) => (
        <Cloud key={i} cloud={cloud} index={i} />
      ))}
      {sparkles.map((sparkle, i) => (
        <Sparkle key={i} sparkle={sparkle} index={i} />
      ))}
    </div>
  )
}
