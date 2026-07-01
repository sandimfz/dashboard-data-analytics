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
    <div className="rounded-lg p-5 border border-border/40 bg-card/50 backdrop-blur-sm group transition-all duration-300 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">{title}</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{value}</h2>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${trendPositive ? "text-green-400" : "text-red-400"}`}>
            {trendPositive ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {trend}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-border/20">
          <span className="text-xs text-muted-foreground">{metric}</span>
          <div className="w-2 h-2 rounded-full bg-blue-500/60"></div>
        </div>
      </div>
    </div>
  )
}
