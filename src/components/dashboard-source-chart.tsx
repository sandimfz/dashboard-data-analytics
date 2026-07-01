import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { GlassCard } from '@/components/ios-glass-card'
import { chartColorForKey, chartColor } from '@/lib/chart-colors'
import type { DashboardSourceItem } from '@/api/dashboard.types'

interface Props {
  sources: DashboardSourceItem[]
}

const SOURCE_LABEL: Record<string, string> = {
  internal: 'Internal',
  local_people: 'Warga Lokal',
  monitoring: 'Monitoring',
}

const chartConfig = {
  count: { label: 'Tiket', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function DashboardSourceChart({ sources }: Props) {
  const data = sources
    .filter((s) => s.count > 0)
    .map((s, i) => ({
      key: s.source,
      name: SOURCE_LABEL[s.source] ?? s.source,
      value: s.count,
      color: chartColorForKey(s.source) ?? chartColor(i),
    }))

  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (data.length === 0) {
    return (
      <GlassCard eyebrow="Distribusi" title="Sumber Laporan">
        <p className="text-sm text-muted-foreground">Tidak ada data</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard eyebrow="Distribusi" title="Sumber Laporan" noPadding contentClassName="px-6 pb-6 pt-4">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <ChartContainer config={chartConfig} className="size-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={2}
                  stroke="var(--background)"
                >
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="metric-display-sm text-white">{total}</span>
            <span className="text-xs text-white/40">total</span>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col gap-3 pt-2">
          {data.map((item) => {
            const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={item.key} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-sm text-white/55">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-white">{item.value}</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.09)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: item.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </GlassCard>
  )
}
