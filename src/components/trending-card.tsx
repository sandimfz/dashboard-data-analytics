import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card className="border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
              {title}
            </CardTitle>
            <div className="text-xl font-bold text-foreground mt-2">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${trendPositive ? "text-green-500" : "text-red-500"}`}>
            {trendPositive ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {trend}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">{metric}</span>
          <div className="w-2 h-2 rounded-full bg-primary/60"></div>
        </div>
      </CardContent>
    </Card>
  )
}
