import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { GlassCard } from '@/components/ios-glass-card'
import { chartToken } from '@/lib/chart-colors'
import type { DashboardMonitoringSummary, DashboardMonitoringTroubleLocation } from '@/api/dashboard.types'

interface Props {
  summary: DashboardMonitoringSummary
  troubleLocations: DashboardMonitoringTroubleLocation[]
}

const SUMMARY_ITEMS = [
  { key: 'reports', label: 'Laporan', color: chartToken(1) },
  { key: 'lateReports', label: 'Terlambat', color: chartToken(4) },
  { key: 'abnormalVideotron', label: 'Videotron', color: chartToken(3) },
  { key: 'offlineNetwork', label: 'Offline', color: chartToken(5) },
] as const

const chartConfig = {
  value: { label: 'Jumlah', color: chartToken(1) },
} satisfies ChartConfig

export function DashboardMonitoringChart({ summary, troubleLocations }: Props) {
  const barData = SUMMARY_ITEMS.map((item) => ({
    name: item.label,
    value: summary[item.key],
    color: item.color,
  }))

  const topTrouble = troubleLocations.slice(0, 5)

  return (
    <GlassCard eyebrow="Monitoring" title="Ringkasan Trouble" noPadding contentClassName="px-6 pb-6 pt-0">
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.35} strokeDasharray="3 6" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {barData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {topTrouble.length > 0 && (
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">
            Lokasi Trouble Tertinggi
          </p>
          <div className="flex flex-col gap-1">
            {topTrouble.map((loc, i) => (
              <div
                key={loc.locationId}
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.05]"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: chartToken((i % 5 + 1) as 1 | 2 | 3 | 4 | 5) }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{loc.locationName}</p>
                  <p className="text-xs text-white/40">
                    {loc.reports} laporan · {loc.abnormalVideotron} videotron
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-white">
                  {loc.troubleRate}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
}
