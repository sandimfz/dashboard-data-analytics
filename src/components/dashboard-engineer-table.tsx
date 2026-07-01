import * as React from 'react'
import type { DashboardEngineerPerformance } from '@/api/dashboard.types'
import {
  GroupedList,
  GroupedListSection,
  GroupedListColumns,
  GroupedListBody,
  GroupedListRowGrid,
} from '@/components/ios-grouped-list'
import { Button } from '@/components/ui/button'

interface Props {
  engineers: DashboardEngineerPerformance[]
}

const COLS = '1fr auto auto auto'
const DEFAULT_VISIBLE = 5

export function DashboardEngineerTable({ engineers }: Props) {
  const [showAll, setShowAll] = React.useState(false)

  const visible = showAll ? engineers : engineers.slice(0, DEFAULT_VISIBLE)
  const hasMore = engineers.length > DEFAULT_VISIBLE

  return (
    <GroupedList>
      <GroupedListSection title="Kinerja" description="Engineer" />
      <div className="px-2 pb-3">
        <GroupedListColumns columns={['Nama', 'Selesai', 'Aktif', 'Rata-rata']} gridTemplateColumns={COLS} />
        <GroupedListBody>
          {engineers.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-muted-foreground">Tidak ada data</div>
          ) : visible.map((eng) => (
            <GroupedListRowGrid
              key={eng.engineerId}
              gridTemplateColumns={COLS}
              cells={[
                <span key="name" className="truncate text-left text-sm font-medium text-foreground">
                  {eng.engineerName || '—'}
                </span>,
                <span key="done" className="text-sm font-semibold text-[var(--apple-green)]">
                  {eng.ticketsCompleted}
                </span>,
                <span key="active" className="text-sm text-muted-foreground">{eng.ticketsAssigned}</span>,
                <span key="avg" className="text-xs text-muted-foreground">{eng.avgWorkTimeHours}j</span>,
              ]}
            />
          ))}
        </GroupedListBody>

        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll((v) => !v)}
            className="mt-2 w-full text-xs"
          >
            {showAll ? 'Sembunyikan' : `Lihat Semua (${engineers.length - DEFAULT_VISIBLE} lainnya)`}
          </Button>
        )}
      </div>
    </GroupedList>
  )
}
