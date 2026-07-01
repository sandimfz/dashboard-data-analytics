import type { DashboardSlaByKey, DashboardTopLateSite } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import { GroupedListBody, GroupedListRow } from '@/components/ios-grouped-list'
import { chartColor, chartToken } from '@/lib/chart-colors'

const SOURCE_LABEL: Record<string, string> = {
  internal: 'Internal', local_people: 'Warga Lokal', monitoring: 'Monitoring',
}

export function DashboardSlaBySource({ slaBySource }: { slaBySource: DashboardSlaByKey[] }) {
  return (
    <GlassCard eyebrow="Persentase tepat waktu" title="Per Sumber Laporan">
      {slaBySource.length === 0 ? (
        <p className="text-sm text-white/45">Tidak ada data</p>
      ) : (
        <div className="flex flex-col gap-5">
          {slaBySource.map((s, i) => (
            <div key={s.key}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-white/55">{SOURCE_LABEL[s.key] ?? s.key}</span>
                <span className="text-sm font-semibold text-white">{s.compliance}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.09)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${s.compliance}%`, background: chartColor(i) }}
                />
              </div>
              <p className="mt-1.5 text-xs text-white/35">
                {s.onTime} tepat waktu / {s.late} terlambat
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
    <GlassCard eyebrow="Perlu Perhatian" title="Site Sering Lewat SLA" noPadding contentClassName="px-2 pb-3 pt-0">
      {topLateSites.length === 0 ? (
        <p className="px-6 pb-6 text-sm text-muted-foreground">Tidak ada late site</p>
      ) : (
        <GroupedListBody>
          {topLateSites.map((s, i) => (
            <GroupedListRow key={s.siteId}>
              <div className="flex items-center gap-4">
                <span className="size-2 shrink-0 rounded-full" style={{ background: chartColor(i + 2) }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{s.siteName}</p>
                  <p className="truncate text-xs text-white/40">{s.locationName}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold" style={{ color: chartToken(5) }}>{s.late} late</p>
                  <p className="text-xs text-white/40">{s.lateRate}%</p>
                </div>
              </div>
            </GroupedListRow>
          ))}
        </GroupedListBody>
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
