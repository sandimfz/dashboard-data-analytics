import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", views: 4200, clicks: 2400 },
  { month: "Feb", views: 3800, clicks: 2210 },
  { month: "Mar", views: 5200, clicks: 2290 },
  { month: "Apr", views: 4780, clicks: 2000 },
  { month: "May", views: 5890, clicks: 2181 },
  { month: "Jun", views: 6390, clicks: 2500 },
  { month: "Jul", views: 7490, clicks: 2100 },
]

const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--primary))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function ChartLine() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="views"
            stroke="hsl(var(--primary))"
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="hsl(var(--accent))"
            dot={{ fill: "hsl(var(--accent))", r: 4 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
