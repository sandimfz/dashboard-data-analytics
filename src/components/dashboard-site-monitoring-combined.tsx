import type { DashboardTopLateSite, DashboardMonitoringTroubleLocation } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import { chartColor, chartToken } from '@/lib/chart-colors'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'

interface Props {
  topLateSites: DashboardTopLateSite[]
  monitoringTroubleLocations: DashboardMonitoringTroubleLocation[]
}

export function DashboardSiteMonitoringCombined({ topLateSites, monitoringTroubleLocations }: Props) {
  const topTrouble = monitoringTroubleLocations.slice(0, 5)

  return (
    <GlassCard eyebrow="Perhatian" title="Site & Monitoring Bermasalah" noPadding contentClassName="p-0">
      {/* Site Sering Lewat SLA */}
      {topLateSites.length > 0 && (
        <div className="px-5 pt-4 pb-3">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Site Sering Lewat SLA
          </p>
          <Table>
            <TableBody>
              {topLateSites.map((s, i) => (
                <TableRow key={s.siteId}>
                  <TableCell className="w-8">
                    <span className="block size-2 rounded-full" style={{ background: chartColor(i + 2) }} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="truncate text-sm font-medium text-foreground">{s.siteName}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.locationName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <p className="text-sm font-semibold" style={{ color: chartToken(5) }}>
                        {s.late} terlambat
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.lateRate}% dari {s.closed} tiket
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Divider */}
      {topLateSites.length > 0 && topTrouble.length > 0 && (
        <div className="border-t border-border" />
      )}

      {/* Masalah Monitoring */}
      {topTrouble.length > 0 && (
        <div className="px-5 pt-3 pb-4">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Masalah Monitoring
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
                    {loc.reports} report
                  </p>
                </div>
                <div className="flex shrink-0 gap-3 text-xs tabular-nums">
                  <span className="text-[var(--apple-red)]">{loc.abnormalVideotron} abnormal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {topLateSites.length === 0 && topTrouble.length === 0 && (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          Tidak ada masalah
        </div>
      )}
    </GlassCard>
  )
}
