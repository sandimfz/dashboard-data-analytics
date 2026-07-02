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
  const key = accent ?? color ?? 'blue'
  const darkColor = COLOR_MAP[key] ?? key

  return (
    <div className="analytics-panel relative flex flex-col gap-4 overflow-hidden p-5">
      {/* Icon + label */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        {/* Icon container — tinted bg using inline style, colour switches via CSS var */}
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-xl [&_svg]:size-4"
          style={{
            background: `color-mix(in srgb, var(--metric-accent) 12%, transparent)`,
            color: 'var(--metric-accent)',
            // Set the token at element level — dark via .dark parent
            ['--metric-accent' as string]: darkColor,
          }}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <div>
        <div className="metric-display text-foreground">{value}</div>
        {sub && <p className="mt-1.5 text-xs text-muted-foreground">{sub}</p>}
      </div>

      {/* Bottom accent bar — uses inline colour directly, fine for decorative */}
      <div
        className="h-[2px] w-10 rounded-full opacity-60"
        style={{
          background: `linear-gradient(90deg, ${darkColor}, transparent)`,
        }}
      />
    </div>
  )
}
