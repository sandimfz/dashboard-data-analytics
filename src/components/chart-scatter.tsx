import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { x: 95, y: 1200 },
  { x: 120, y: 2100 },
  { x: 145, y: 1800 },
  { x: 170, y: 2800 },
  { x: 110, y: 1500 },
  { x: 155, y: 2400 },
  { x: 130, y: 2200 },
  { x: 165, y: 2600 },
  { x: 140, y: 1900 },
]

const chartConfig = {
  x: {
    label: "Price",
  },
  y: {
    label: "Sales",
  },
} satisfies ChartConfig

export function ChartScatter() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" dataKey="x" stroke="hsl(var(--muted-foreground))" />
          <YAxis type="number" dataKey="y" stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter name="Sales" data={chartData} fill="hsl(var(--primary))" fillOpacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
