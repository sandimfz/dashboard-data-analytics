import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { GlassCard } from '@/components/ios-glass-card'
import { chartToken } from '@/lib/chart-colors'
import type { DashboardTrendItem } from '@/api/dashboard.types'

interface Props {
  data: DashboardTrendItem[]
}

const chartConfig = {
  created: { label: 'Dibuat', color: chartToken(1) },
  closed: { label: 'Ditutup', color: chartToken(2) },
} satisfies ChartConfig

export function DashboardTrendChart({ data }: Props) {
  const totalCreated = data.reduce((s, d) => s + d.created, 0)
  const totalClosed = data.reduce((s, d) => s + d.closed, 0)

  return (
    <GlassCard
      eyebrow="Tren Periode"
      title="Aktivitas Tiket"
      noPadding
      contentClassName="px-2 pb-4 pt-0"
    >
      <div className="flex flex-wrap items-center gap-5 px-4 pb-2 mt-5">
        <div className="flex items-baseline gap-2">
          <span className="metric-display-sm text-[var(--color-created)]">{totalCreated}</span>
          <span className="text-sm text-muted-foreground">dibuat</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="metric-display-sm text-[var(--color-closed)]">{totalClosed}</span>
          <span className="text-sm text-muted-foreground">ditutup</span>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[220px] w-full px-2">
        <AreaChart data={data} margin={{ top: 12, right: 20, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-created)" stopOpacity={0.35} />
              <stop offset="55%" stopColor="var(--color-created)" stopOpacity={0.08} />
              <stop offset="100%" stopColor="var(--color-created)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradClosed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-closed)" stopOpacity={0.3} />
              <stop offset="55%" stopColor="var(--color-closed)" stopOpacity={0.07} />
              <stop offset="100%" stopColor="var(--color-closed)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.35} strokeDasharray="3 6" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            minTickGap={32}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
            tickFormatter={(v) => {
              const d = new Date(v)
              return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(v) => new Date(v).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey="created"
            type="natural"
            fill="url(#gradCreated)"
            stroke="var(--color-created)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-created)', stroke: 'var(--background)', strokeWidth: 2 }}
          />
          <Area
            dataKey="closed"
            type="natural"
            fill="url(#gradClosed)"
            stroke="var(--color-closed)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-closed)', stroke: 'var(--background)', strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </GlassCard>
  )
}