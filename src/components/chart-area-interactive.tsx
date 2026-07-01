"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", revenue: 22200, users: 15000 },
  { date: "2024-04-02", revenue: 9700, users: 18000 },
  { date: "2024-04-03", revenue: 16700, users: 12000 },
  { date: "2024-04-04", revenue: 24200, users: 26000 },
  { date: "2024-04-05", revenue: 37300, users: 29000 },
  { date: "2024-04-06", revenue: 30100, users: 34000 },
  { date: "2024-04-07", revenue: 24500, users: 18000 },
  { date: "2024-04-08", revenue: 40900, users: 32000 },
  { date: "2024-04-09", revenue: 5900, users: 11000 },
  { date: "2024-04-10", revenue: 26100, users: 19000 },
  { date: "2024-04-11", revenue: 32700, users: 35000 },
  { date: "2024-04-12", revenue: 29200, users: 21000 },
  { date: "2024-04-13", revenue: 34200, users: 38000 },
  { date: "2024-04-14", revenue: 13700, users: 22000 },
  { date: "2024-04-15", revenue: 12000, users: 17000 },
  { date: "2024-04-16", revenue: 13800, users: 19000 },
  { date: "2024-04-17", revenue: 44600, users: 36000 },
  { date: "2024-04-18", revenue: 36400, users: 41000 },
  { date: "2024-04-19", revenue: 24300, users: 18000 },
  { date: "2024-04-20", revenue: 8900, users: 15000 },
  { date: "2024-04-21", revenue: 13700, users: 20000 },
  { date: "2024-04-22", revenue: 22400, users: 17000 },
  { date: "2024-04-23", revenue: 13800, users: 23000 },
  { date: "2024-04-24", revenue: 38700, users: 29000 },
  { date: "2024-04-25", revenue: 21500, users: 25000 },
  { date: "2024-04-26", revenue: 7500, users: 13000 },
  { date: "2024-04-27", revenue: 38300, users: 42000 },
  { date: "2024-04-28", revenue: 12200, users: 18000 },
  { date: "2024-04-29", revenue: 31500, users: 24000 },
  { date: "2024-04-30", revenue: 45400, users: 38000 },
  { date: "2024-05-01", revenue: 16500, users: 22000 },
  { date: "2024-05-02", revenue: 29300, users: 31000 },
  { date: "2024-05-03", revenue: 24700, users: 19000 },
  { date: "2024-05-04", revenue: 38500, users: 42000 },
  { date: "2024-05-05", revenue: 48100, users: 39000 },
  { date: "2024-05-06", revenue: 49800, users: 52000 },
  { date: "2024-05-07", revenue: 38800, users: 30000 },
  { date: "2024-05-08", revenue: 14900, users: 21000 },
  { date: "2024-05-09", revenue: 22700, users: 18000 },
  { date: "2024-05-10", revenue: 29300, users: 33000 },
  { date: "2024-05-11", revenue: 33500, users: 27000 },
  { date: "2024-05-12", revenue: 19700, users: 24000 },
  { date: "2024-05-13", revenue: 19700, users: 16000 },
  { date: "2024-05-14", revenue: 44800, users: 49000 },
  { date: "2024-05-15", revenue: 47300, users: 38000 },
  { date: "2024-05-16", revenue: 33800, users: 40000 },
  { date: "2024-05-17", revenue: 49900, users: 42000 },
  { date: "2024-05-18", revenue: 31500, users: 35000 },
  { date: "2024-05-19", revenue: 23500, users: 18000 },
  { date: "2024-05-20", revenue: 17700, users: 23000 },
  { date: "2024-05-21", revenue: 8200, users: 14000 },
  { date: "2024-05-22", revenue: 8100, users: 12000 },
  { date: "2024-05-23", revenue: 25200, users: 29000 },
  { date: "2024-05-24", revenue: 29400, users: 22000 },
  { date: "2024-05-25", revenue: 20100, users: 25000 },
  { date: "2024-05-26", revenue: 21300, users: 17000 },
  { date: "2024-05-27", revenue: 42000, users: 46000 },
  { date: "2024-05-28", revenue: 23300, users: 19000 },
  { date: "2024-05-29", revenue: 7800, users: 13000 },
  { date: "2024-05-30", revenue: 34000, users: 28000 },
  { date: "2024-05-31", revenue: 17800, users: 23000 },
  { date: "2024-06-01", revenue: 17800, users: 20000 },
  { date: "2024-06-02", revenue: 47000, users: 41000 },
  { date: "2024-06-03", revenue: 10300, users: 16000 },
  { date: "2024-06-04", revenue: 43900, users: 38000 },
  { date: "2024-06-05", revenue: 8800, users: 14000 },
  { date: "2024-06-06", revenue: 29400, users: 25000 },
  { date: "2024-06-07", revenue: 32300, users: 37000 },
  { date: "2024-06-08", revenue: 38500, users: 32000 },
  { date: "2024-06-09", revenue: 43800, users: 48000 },
  { date: "2024-06-10", revenue: 15500, users: 20000 },
  { date: "2024-06-11", revenue: 9200, users: 15000 },
  { date: "2024-06-12", revenue: 49200, users: 42000 },
  { date: "2024-06-13", revenue: 8100, users: 13000 },
  { date: "2024-06-14", revenue: 42600, users: 38000 },
  { date: "2024-06-15", revenue: 30700, users: 35000 },
  { date: "2024-06-16", revenue: 37100, users: 31000 },
  { date: "2024-06-17", revenue: 47500, users: 52000 },
  { date: "2024-06-18", revenue: 10700, users: 17000 },
  { date: "2024-06-19", revenue: 34100, users: 29000 },
  { date: "2024-06-20", revenue: 40800, users: 45000 },
  { date: "2024-06-21", revenue: 16900, users: 21000 },
  { date: "2024-06-22", revenue: 31700, users: 27000 },
  { date: "2024-06-23", revenue: 48000, users: 53000 },
  { date: "2024-06-24", revenue: 13200, users: 18000 },
  { date: "2024-06-25", revenue: 14100, users: 19000 },
  { date: "2024-06-26", revenue: 43400, users: 38000 },
  { date: "2024-06-27", revenue: 44800, users: 49000 },
  { date: "2024-06-28", revenue: 14900, users: 20000 },
  { date: "2024-06-29", revenue: 10300, users: 16000 },
  { date: "2024-06-30", revenue: 44600, users: 40000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--apple-blue)",
  },
  users: {
    label: "Users",
    color: "var(--apple-purple)",
  },
} satisfies ChartConfig

type TimeRange = "90d" | "30d" | "7d"

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "3M" },
]

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState<TimeRange>("90d")
  const [activeMetric, setActiveMetric] = React.useState<"revenue" | "users">(
    "revenue"
  )

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  const totalValue = filteredData.reduce(
    (sum, item) => sum + item[activeMetric],
    0
  )
  const formattedTotal =
    activeMetric === "revenue"
      ? `$${(totalValue / 1000).toFixed(1)}K`
      : totalValue >= 1000000
        ? `${(totalValue / 1000000).toFixed(1)}M`
        : `${(totalValue / 1000).toFixed(0)}K`

  return (
    <div className="apple-shadow-sm overflow-hidden rounded-2xl border border-border/60 bg-card">
      {/* Header */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Analytics Overview
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-foreground">
              {formattedTotal}
            </span>
            <span className="text-sm font-medium text-[var(--apple-green)]">
              ↑ 12.5%
            </span>
          </div>
          {/* Metric toggle pills */}
          <div className="mt-3 flex gap-2">
            {(["revenue", "users"] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
                  activeMetric === metric
                    ? metric === "revenue"
                      ? "bg-[var(--apple-blue)] text-white shadow-sm"
                      : "bg-[var(--apple-purple)] text-white shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    metric === "revenue"
                      ? "bg-current"
                      : "bg-current"
                  )}
                />
                {metric === "revenue" ? "Revenue" : "Users"}
              </button>
            ))}
          </div>
        </div>

        {/* Time range selector */}
        <div className="flex items-center rounded-xl border border-border/60 bg-secondary/50 p-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                timeRange === range.value
                  ? "bg-card text-foreground apple-shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ChartContainer
        config={chartConfig}
        className="h-[240px] w-full px-1 pb-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--apple-blue)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="var(--apple-blue)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--apple-purple)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="var(--apple-purple)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.6}
              strokeDasharray="0"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={40}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(value) => {
                const date = new Date(value)
                if (timeRange === "7d") {
                  return date.toLocaleDateString("en-US", { weekday: "short" })
                }
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{
                stroke: activeMetric === "revenue" ? "var(--apple-blue)" : "var(--apple-purple)",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  formatter={(value, name) => [
                    name === "revenue"
                      ? `$${(Number(value) / 1000).toFixed(1)}K`
                      : `${(Number(value) / 1000).toFixed(1)}K`,
                    name === "revenue" ? "Revenue" : "Users",
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={activeMetric}
              type="monotone"
              fill={activeMetric === "revenue" ? "url(#fillRevenue)" : "url(#fillUsers)"}
              stroke={activeMetric === "revenue" ? "var(--apple-blue)" : "var(--apple-purple)"}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: activeMetric === "revenue" ? "var(--apple-blue)" : "var(--apple-purple)",
                stroke: "var(--card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
