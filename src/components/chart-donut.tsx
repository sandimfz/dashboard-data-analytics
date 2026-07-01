"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { name: "Direct", value: 42, color: "var(--apple-blue)" },
  { name: "Social", value: 28, color: "var(--apple-purple)" },
  { name: "Email", value: 18, color: "var(--apple-green)" },
  { name: "Organic", value: 12, color: "var(--apple-orange)" },
]

const chartConfig = {
  traffic: { label: "Traffic" },
}

export function ChartDonut() {
  return (
    <div className="apple-shadow-sm overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        Traffic Sources
      </p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
        Distribution
      </p>

      <div className="mt-4 flex items-center gap-4">
        {/* Donut chart */}
        <ChartContainer config={chartConfig} className="h-[120px] w-[120px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
