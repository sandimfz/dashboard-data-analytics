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
    <div className="glass-glow rounded-2xl p-6 border border-white/10 premium-shadow-lg group hover:border-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${accentColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}>
          <div className={`text-transparent bg-gradient-to-br ${accentColor} bg-clip-text`}>
            {iconMap[icon]}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm relative z-10">
        <span className={`font-semibold ${changePositive ? "text-green-400" : "text-red-400"}`}>
          {change}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>

      {/* Animated glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-transparent to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-transparent group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}
