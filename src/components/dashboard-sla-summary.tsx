import type { DashboardSlaPerformance } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import { chartToken } from '@/lib/chart-colors'

interface Props {
  slaPerformance: DashboardSlaPerformance
}

export function DashboardSlaSummary({ slaPerformance }: Props) {
  return (
    <GlassCard eyebrow="Kepatuhan" title="SLA Tepat Waktu">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
        <span className="metric-display" style={{ color: chartToken(2) }}>
          {slaPerformance.percentage}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${slaPerformance.percentage}%`, background: chartToken(2) }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
        <p>
          Tiket dinilai{' '}
          <span className="font-semibold text-foreground">{slaPerformance.assessed}</span>
        </p>
        <p>
          <span className="font-semibold text-[var(--apple-green)]">{slaPerformance.onTime}</span>{' '}
          tepat waktu /{' '}
          <span className="font-semibold text-[var(--apple-red)]">{slaPerformance.late}</span>{' '}
          terlambat
        </p>
      </div>
    </GlassCard>
  )
}
