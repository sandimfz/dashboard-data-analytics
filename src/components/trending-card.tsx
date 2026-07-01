import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

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
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </CardTitle>
            <div className="mt-2 text-xl font-bold text-foreground">{value}</div>
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "flex shrink-0 items-center gap-1",
              trendPositive ? "text-[var(--apple-green)]" : "text-destructive"
            )}
          >
            {trendPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {trend}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <Separator className="mb-3" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{metric}</span>
          <span
            className="size-2 rounded-full bg-primary/50"
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  )
}
