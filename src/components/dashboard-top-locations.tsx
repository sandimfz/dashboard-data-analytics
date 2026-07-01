import type { DashboardTopLocation } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import { GroupedListBody, GroupedListRow } from '@/components/ios-grouped-list'

interface Props {
  locations: DashboardTopLocation[]
}

export function DashboardTopLocations({ locations }: Props) {
  return (
    <GlassCard eyebrow="Volume" title="Top Lokasi" noPadding contentClassName="p-0 pt-0">
      <GroupedListBody>
        {locations.map((loc, i) => (
          <GroupedListRow key={loc.siteId} inset={false}>
            <div className="flex items-center gap-3">
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums text-white/50"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{loc.siteName}</p>
                <p className="truncate text-xs text-white/40">{loc.locationName}</p>
              </div>
              <span
                className="shrink-0 rounded-lg px-2 py-0.5 text-xs font-semibold tabular-nums text-white"
                style={{ background: 'rgba(10,132,255,0.15)', color: '#0a84ff' }}
              >
                {loc.ticketCount}
              </span>
            </div>
          </GroupedListRow>
        ))}
      </GroupedListBody>
    </GlassCard>
  )
}
