import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { GlassCard } from '@/components/ios-glass-card'
import { chartToken } from '@/lib/chart-colors'
import type { DashboardEngineerPerformance } from '@/api/dashboard.types'

interface Props {
  engineers: DashboardEngineerPerformance[]
}

const chartConfig = {
  ticketsCompleted: { label: 'Selesai', color: chartToken(2) },
  ticketsAssigned: { label: 'Aktif', color: chartToken(1) },
} satisfies ChartConfig

export function DashboardEngineerChart({ engineers }: Props) {
  const data = [...engineers]
    .sort((a, b) => b.ticketsCompleted - a.ticketsCompleted)
    .slice(0, 6)
    .map((eng) => ({
      name: (eng.engineerName || '—').split(' ')[0],
      fullName: eng.engineerName || '—',
      ticketsCompleted: eng.ticketsCompleted,
      ticketsAssigned: eng.ticketsAssigned,
    }))

  if (data.length === 0) {
    return (
      <GlassCard eyebrow="Kinerja" title="Engineer">
        <p className="text-sm text-white/40">Tidak ada data</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard eyebrow="Kinerja" title="Perbandingan Engineer" noPadding contentClassName="px-4 pb-6 pt-0">
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.35} strokeDasharray="3 6" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_label, payload) => payload?.[0]?.payload?.fullName ?? _label}
                />
              }
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
            />
            <Bar dataKey="ticketsCompleted" fill="var(--color-ticketsCompleted)" radius={[6, 6, 0, 0]} maxBarSize={24} />
            <Bar dataKey="ticketsAssigned" fill="var(--color-ticketsAssigned)" radius={[6, 6, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </GlassCard>
  )
}
