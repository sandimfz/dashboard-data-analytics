import type { DashboardSlaByKey, DashboardTopLateSite } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { chartColor, chartToken } from '@/lib/chart-colors'

const SOURCE_LABEL: Record<string, string> = {
  internal: 'Internal', local_people: 'Warga Lokal', monitoring: 'Monitoring',
}

export function DashboardSlaBySource({ slaBySource }: { slaBySource: DashboardSlaByKey[] }) {
  return (
    <GlassCard eyebrow="Kepatuhan SLA" title="Berdasarkan Sumber Laporan">
      {slaBySource.length === 0 ? (
        <p className="text-sm text-muted-foreground">Tidak ada data</p>
      ) : (
        <div className="flex flex-col gap-5">
          {slaBySource.map((s, i) => (
            <div key={s.key}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{SOURCE_LABEL[s.key] ?? s.key}</span>
                <span className="text-sm font-semibold text-foreground">{s.compliance}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${s.compliance}%`, background: chartColor(i) }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {s.onTime} tepat waktu · {s.late} terlambat dari {s.total} total
              </p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  )
}

export function DashboardSlaTopLate({ topLateSites }: { topLateSites: DashboardTopLateSite[] }) {
  return (
    <GlassCard eyebrow="Perlu Perhatian" title="Site Sering Lewat SLA" noPadding contentClassName="p-0">
      {topLateSites.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          Semua site memenuhi SLA
        </div>
      ) : (
        <Table>
          <TableBody>
            {topLateSites.map((s, i) => (
              <TableRow key={s.siteId}>
                <TableCell className="w-8">
                  <span className="size-2 rounded-full block" style={{ background: chartColor(i + 2) }} />
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
      )}
    </GlassCard>
  )
}

// Tetap export DashboardSlaDetail untuk backward compat
export function DashboardSlaDetail({ slaBySource, topLateSites }: { slaBySource: DashboardSlaByKey[], topLateSites: DashboardTopLateSite[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-2">
      <DashboardSlaBySource slaBySource={slaBySource} />
      <DashboardSlaTopLate topLateSites={topLateSites} />
    </div>
  )
}
