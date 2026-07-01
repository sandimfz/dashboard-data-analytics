import { Zap, Shield, Rocket, TrendingUp } from "lucide-react"

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="rounded-lg p-4 border border-border/40 bg-card/50 backdrop-blur-sm group hover:border-border/60 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/15 group-hover:bg-blue-500/20 transition-colors">
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Performance</p>
            <p className="text-base font-semibold text-foreground">98.2%</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-4 border border-border/40 bg-card/50 backdrop-blur-sm group hover:border-border/60 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/15 group-hover:bg-green-500/20 transition-colors">
            <Shield className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Security</p>
            <p className="text-base font-semibold text-foreground">100%</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-4 border border-border/40 bg-card/50 backdrop-blur-sm group hover:border-border/60 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/15 group-hover:bg-purple-500/20 transition-colors">
            <Rocket className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Deployment</p>
            <p className="text-base font-semibold text-foreground">24/7</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-4 border border-border/40 bg-card/50 backdrop-blur-sm group hover:border-border/60 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/15 group-hover:bg-orange-500/20 transition-colors">
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Growth</p>
            <p className="text-base font-semibold text-foreground">↑ 34%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
