import { GlassCard } from '@/components/ios-glass-card'
import { chartToken } from '@/lib/chart-colors'
import type { DashboardMonitoringSummary, DashboardMonitoringTroubleLocation } from '@/api/dashboard.types'

interface Props {
  summary: DashboardMonitoringSummary
  troubleLocations: DashboardMonitoringTroubleLocation[]
}


export function DashboardMonitoringChart({ summary, troubleLocations }: Props) {
  const topTrouble = troubleLocations.slice(0, 5)

  return (
    <GlassCard eyebrow="Monitoring" title="Ringkasan Masalah" noPadding contentClassName="px-6 pb-6 pt-0">
      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 border-b border-border pb-4 sm:grid-cols-4">
        <div>
          <p className="text-xs text-muted-foreground">Total Laporan</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{summary.reports}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Laporan Terlambat</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--apple-orange)]">
            {summary.lateReports}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Videotron Abnormal</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--apple-red)]">
            {summary.abnormalVideotron}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Jaringan Offline</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--apple-red)]">
            {summary.offlineNetwork}
          </p>
        </div>
      </div>

      {topTrouble.length > 0 && (
        <div className="border-t border-border pt-4">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Lokasi dengan Masalah Terbanyak
          </p>
          <div className="flex flex-col gap-1">
            {topTrouble.map((loc, i) => (
              <div
                key={loc.locationId}
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted/50"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: chartToken((i % 5 + 1) as 1 | 2 | 3 | 4 | 5) }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{loc.locationName}</p>
                  <p className="text-xs text-muted-foreground">
                    {loc.reports} laporan · {loc.abnormalVideotron} videotron bermasalah
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
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
