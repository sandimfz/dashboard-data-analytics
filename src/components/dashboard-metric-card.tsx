interface Props {
  title: string
  value: string | number
  icon: React.ReactNode
  sub?: string
}

export function DashboardMetricCard({ title, value, sub, icon }: Props) {
  return (
    <div className="analytics-panel flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <span className="text-muted-foreground/50 [&_svg]:size-4">{icon}</span>
      </div>
      <div>
        <div className="metric-display text-foreground">{value}</div>
        {sub && (
          <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        )}
      </div>
    </div>
  )
}
