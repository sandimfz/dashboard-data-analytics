import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { GlassCard } from '@/components/ios-glass-card'
import { chartToken } from '@/lib/chart-colors'
import type { DashboardTrendItem } from '@/api/dashboard.types'

interface Props {
  data: DashboardTrendItem[]
}

const chartConfig = {
  net: { label: 'Net (dibuat − ditutup)', color: chartToken(3) },
} satisfies ChartConfig

export function DashboardNetFlowChart({ data }: Props) {
  const chartData = data.map((d) => ({
    ...d,
    net: d.created - d.closed,
  }))

  const totalNet = chartData.reduce((s, d) => s + d.net, 0)

  return (
    <GlassCard eyebrow="Analisis" title="Net Flow Tiket" noPadding contentClassName="px-4 pb-6 pt-0">
      <div className="flex items-baseline gap-2 px-2 pb-2">
        <span className="metric-display-sm text-[var(--color-net)]">
          {totalNet >= 0 ? '+' : ''}{totalNet}
        </span>
        <span className="text-sm text-white/40">akumulasi periode</span>
      </div>

      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.35} strokeDasharray="3 6" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={32}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
              tickFormatter={(v) => new Date(v).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(v) => new Date(v).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                  indicator="line"
                />
              }
            />
            <Line
              type="natural"
              dataKey="net"
              stroke="var(--color-net)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-net)', stroke: 'var(--background)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </GlassCard>
  )
}
