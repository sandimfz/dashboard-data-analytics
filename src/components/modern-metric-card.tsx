import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernMetricCardProps {
  title: string
  value: string
  change: string
  changePositive: boolean
  icon: React.ReactNode
  color: "blue" | "green" | "orange" | "purple"
}

const colorMap = {
  blue: {
    bg: "bg-[var(--apple-blue-light)]",
    text: "text-[var(--apple-blue)]",
  },
  green: {
    bg: "bg-[var(--apple-green-light)]",
    text: "text-[var(--apple-green)]",
  },
  orange: {
    bg: "bg-[var(--apple-orange-light)]",
    text: "text-[var(--apple-orange)]",
  },
  purple: {
    bg: "bg-[var(--apple-purple-light)]",
    text: "text-[var(--apple-purple)]",
  },
}

export function ModernMetricCard({
  title,
  value,
  change,
  changePositive,
  icon,
  color,
}: ModernMetricCardProps) {
  const c = colorMap[color]

  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div
          className={cn("flex size-10 items-center justify-center rounded-xl", c.bg, c.text)}
          aria-hidden="true"
        >
          {icon}
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "flex items-center gap-1",
            changePositive ? "text-[var(--apple-green)]" : "text-destructive"
          )}
        >
          {changePositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {change}
        </Badge>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <CardTitle className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <p className="mt-2 text-xs text-muted-foreground">vs last month</p>
      </CardContent>
    </Card>
  )
}
