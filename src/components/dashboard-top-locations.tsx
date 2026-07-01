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
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{loc.siteName}</p>
                <p className="truncate text-xs text-muted-foreground">{loc.locationName}</p>
              </div>
              <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium tabular-nums text-foreground">
                {loc.ticketCount}
              </span>
            </div>
          </GroupedListRow>
        ))}
      </GroupedListBody>
    </GlassCard>
  )
}
