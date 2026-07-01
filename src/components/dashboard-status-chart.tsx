import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { GlassCard } from '@/components/ios-glass-card'
import { chartColor } from '@/lib/chart-colors'
import type { DashboardStatusBreakdown, DashboardPriorityItem } from '@/api/dashboard.types'

interface Props {
  statusBreakdown: DashboardStatusBreakdown
  priorityDistribution: DashboardPriorityItem[]
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Baru',
  assigned_to_spv: 'Assigned SPV',
  assigned_to_engineer: 'Assigned Eng',
  in_progress: 'In Progress',
  done: 'Done',
  revision: 'Revisi',
  closed: 'Closed',
}

const PRIORITY_ORDER = ['critical', 'high', 'medium', 'low']

const chartConfig = {
  count: { label: 'Tiket', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function DashboardStatusChart({ statusBreakdown, priorityDistribution }: Props) {
  const statusData = Object.entries(statusBreakdown)
    .filter(([, v]) => v > 0)
    .map(([k, v], i) => ({ status: STATUS_LABELS[k] ?? k, count: v, fill: chartColor(i) }))

  const priorities = [...priorityDistribution].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority),
  )

  return (
    <GlassCard eyebrow="Distribusi" title="Status Tiket" noPadding contentClassName="px-6 pb-6 pt-0">
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.35} strokeDasharray="3 6" />
            <XAxis
              dataKey="status"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'inherit' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={28}>
              {statusData.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="mt-5 border-t border-border pt-4">
        <p className="mb-2.5 text-xs font-medium text-muted-foreground">Prioritas</p>
        <div className="flex flex-wrap gap-2">
          {priorities.map((p, i) => (
            <div
              key={p.priority}
              className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs"
            >
              <span className="size-2 rounded-full" style={{ background: chartColor(i + 2) }} />
              <span className="capitalize text-muted-foreground">{p.priority}</span>
              <span className="font-semibold text-foreground">{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
