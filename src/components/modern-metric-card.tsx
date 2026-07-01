import { TrendingUp, TrendingDown, Users, Target, Clock, BarChart3 } from "lucide-react"

interface ModernMetricCardProps {
  title: string
  value: string
  change: string
  changePositive: boolean
  icon: string
  accentColor: string
}

export function ModernMetricCard({
  title,
  value,
  change,
  changePositive,
  icon,
  accentColor,
}: ModernMetricCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    TrendingDown: <TrendingDown className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Target: <Target className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
    BarChart3: <BarChart3 className="w-6 h-6" />,
  }

  return (
    <div className="rounded-lg p-5 border border-border/40 bg-card/50 backdrop-blur-sm group hover:border-border/60 transition-all duration-300 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mt-2">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${accentColor} opacity-15 group-hover:opacity-25 transition-opacity duration-300`}>
          <div className={`text-transparent bg-gradient-to-br ${accentColor} bg-clip-text w-5 h-5`}>
            {iconMap[icon]}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs relative z-10">
        <span className={`font-semibold ${changePositive ? "text-green-400" : "text-red-400"}`}>
          {change}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  )
}
