const COLOR_MAP: Record<string, string> = {
  blue:   '#0a84ff',
  green:  '#30d158',
  orange: '#ff9f0a',
  red:    '#ff453a',
  purple: '#bf5af2',
  teal:   '#5ac8fa',
  indigo: '#5e5ce6',
  yellow: '#ffd60a',
  pink:   '#ff375f',
}

interface Props {
  title: string
  value: string | number
  icon: React.ReactNode
  sub?: string
  /** Hex color or named iOS color: "blue" | "green" | "red" | "orange" | "purple" */
  accent?: string
  /** @deprecated use accent */
  color?: string
}

export function DashboardMetricCard({ title, value, sub, icon, accent, color }: Props) {
  const resolveColor = (c?: string) => {
    if (!c) return '#0a84ff'
    return COLOR_MAP[c] ?? c
  }

  const accentColor = resolveColor(accent ?? color)

  return (
    <div
      className="relative flex flex-col gap-4 overflow-hidden p-5"
      style={{
        background: 'rgba(28, 28, 32, 0.82)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: '20px',
        boxShadow: [
          '0 8px 32px rgba(0, 0, 0, 0.40)',
          '0 2px 6px rgba(0, 0, 0, 0.25)',
          'inset 0 1px 0 rgba(255, 255, 255, 0.09)',
        ].join(', '),
      }}
    >
      {/* Subtle tinted glow from accent colour in top corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-15"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          filter: 'blur(16px)',
        }}
      />

      {/* Icon + label */}
      <div className="relative flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">{title}</p>
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-xl [&_svg]:size-4"
          style={{
            background: `${accentColor}1a`,
            color: accentColor,
            boxShadow: `0 0 0 1px ${accentColor}28`,
          }}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <div className="relative">
        <div className="metric-display text-white">{value}</div>
        {sub && <p className="mt-1.5 text-xs text-white/40">{sub}</p>}
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-[2px] w-10 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          opacity: 0.6,
        }}
      />
    </div>
  )
}
