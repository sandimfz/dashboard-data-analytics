import { ArrowUp, ArrowDown } from "lucide-react"

interface TrendingCardProps {
  title: string
  value: string
  subtitle: string
  metric: string
  trend: string
  trendPositive: boolean
}

export function TrendingCard({
  title,
  value,
  subtitle,
  metric,
  trend,
  trendPositive,
}: TrendingCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 premium-shadow-lg group hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
      {/* Gradient background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-transparent group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">{title}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{value}</h2>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trendPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
            {trendPositive ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="text-xs font-semibold">{trend}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-sm text-muted-foreground">{metric}</span>
          <div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
