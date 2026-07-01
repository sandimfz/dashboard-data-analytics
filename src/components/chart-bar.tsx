import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", current: 18600, previous: 14200 },
  { month: "Feb", current: 23400, previous: 17800 },
  { month: "Mar", current: 19800, previous: 21000 },
  { month: "Apr", current: 31200, previous: 22400 },
  { month: "May", current: 28900, previous: 25600 },
  { month: "Jun", current: 38400, previous: 28900 },
  { month: "Jul", current: 34100, previous: 30200 },
]

const chartConfig = {
  current: {
    label: "This Year",
    color: "var(--apple-blue)",
  },
  previous: {
    label: "Last Year",
    color: "var(--border)",
  },
} satisfies ChartConfig

export function ChartBar() {
  return (
    <div className="apple-shadow-sm overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Performance
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Monthly Revenue
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--apple-blue)]" />
            2024
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-border" />
            2023
          </span>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="mt-5 h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={4}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4, radius: 6 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `$${(Number(value) / 1000).toFixed(1)}K`,
                    name === "current" ? "This Year" : "Last Year",
                  ]}
                />
              }
            />
            <Bar
              dataKey="previous"
              fill="var(--border)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
            <Bar
              dataKey="current"
              fill="var(--apple-blue)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
