import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface ModernMetricCardProps {
  title: string
  value: string
  change: string
  changePositive: boolean
  icon: React.ReactNode
  color: "blue" | "green" | "orange" | "purple"
}

const colorMap = {
  blue: "bg-blue-500/15 text-blue-500",
  green: "bg-green-500/15 text-green-500",
  orange: "bg-orange-500/15 text-orange-500",
  purple: "bg-purple-500/15 text-purple-500",
}

export function ModernMetricCard({
  title,
  value,
  change,
  changePositive,
  icon,
  color,
}: ModernMetricCardProps) {
  return (
    <Card className="border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </CardTitle>
          <div className="text-2xl font-bold text-foreground mt-3">{value}</div>
        </div>
        <div className={`p-2.5 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {changePositive ? (
              <ArrowUp className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <ArrowDown className="w-3.5 h-3.5 text-red-500" />
            )}
            <span
              className={`text-xs font-semibold ${
                changePositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
