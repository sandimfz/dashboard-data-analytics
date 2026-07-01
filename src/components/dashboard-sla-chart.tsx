import type { DashboardSlaPerformance, DashboardSlaByKey } from '@/api/dashboard.types'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ios-glass-card'
import { chartColor, chartToken } from '@/lib/chart-colors'

interface Props {
  slaPerformance: DashboardSlaPerformance
  slaByPriority: DashboardSlaByKey[]
}

const PRIORITY_ORDER = ['critical', 'high', 'medium', 'low']

export function DashboardSlaChart({ slaPerformance, slaByPriority }: Props) {
  const sorted = [...slaByPriority].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a.key) - PRIORITY_ORDER.indexOf(b.key),
  )

  return (
    <GlassCard eyebrow="Performa" title="SLA Compliance">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
        <span className="metric-display" style={{ color: chartToken(2) }}>{slaPerformance.percentage}%</span>
        <span className="pb-1 text-sm text-muted-foreground">
          on-time ({slaPerformance.onTime}/{slaPerformance.assessed})
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary/80">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${slaPerformance.percentage}%`, background: chartToken(2) }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {sorted.map((item, i) => {
          const color = chartColor(i + 1)
          return (
            <div key={item.key} className="flex items-center gap-3">
              <span className="w-16 text-xs capitalize text-muted-foreground">{item.key}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary/80">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${item.compliance}%`, background: color }}
                />
              </div>
              <span className={cn('w-12 text-right text-xs font-semibold text-foreground')}>
                {item.compliance}%
              </span>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
