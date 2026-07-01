import { ZapIcon, ShieldIcon, RocketIcon, TrendingUpIcon } from "lucide-react"

const stats = [
  {
    label: "Performance",
    value: "98.2%",
    icon: ZapIcon,
    iconBg: "bg-[var(--apple-blue-light)]",
    iconColor: "text-[var(--apple-blue)]",
  },
  {
    label: "Security",
    value: "100%",
    icon: ShieldIcon,
    iconBg: "bg-[var(--apple-green-light)]",
    iconColor: "text-[var(--apple-green)]",
  },
  {
    label: "Deployment",
    value: "24/7",
    icon: RocketIcon,
    iconBg: "bg-[var(--apple-purple-light)]",
    iconColor: "text-[var(--apple-purple)]",
  },
  {
    label: "Growth",
    value: "↑ 34%",
    icon: TrendingUpIcon,
    iconBg: "bg-[var(--apple-orange-light)]",
    iconColor: "text-[var(--apple-orange)]",
  },
]

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="group flex items-center gap-3 rounded-xl border border-border/40 bg-card/50 p-4 transition-all duration-200 hover:border-border/70 hover:bg-card"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} transition-colors`}
              aria-hidden="true"
            >
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-base font-semibold text-foreground">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
