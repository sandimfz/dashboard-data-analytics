import type { DashboardSpvPerformance } from '@/api/dashboard.types'
import { cn } from '@/lib/utils'
import {
  GroupedList,
  GroupedListSection,
  GroupedListColumns,
  GroupedListBody,
  GroupedListRowGrid,
} from '@/components/ios-grouped-list'

interface Props {
  spvList: DashboardSpvPerformance[]
}

const COLS = '1fr auto auto auto'

export function DashboardSpvTable({ spvList }: Props) {
  return (
    <GroupedList>
      <GroupedListSection title="Kinerja Tim" description="SPV" />
      <div className="px-2 pb-3">
        <GroupedListColumns columns={['Nama', 'Tugas', 'Selesai', 'Rasio']} gridTemplateColumns={COLS} />
        <GroupedListBody>
          {spvList.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-muted-foreground">Tidak ada data</div>
          ) : spvList.map((s) => (
            <GroupedListRowGrid
              key={s.spvId}
              gridTemplateColumns={COLS}
              cells={[
                <span key="name" className="text-left text-sm font-medium text-foreground">{s.spvName || '—'}</span>,
                <span key="assigned" className="text-sm text-muted-foreground">{s.ticketsAssigned}</span>,
                <span key="done" className="text-sm font-semibold text-[var(--apple-green)]">{s.ticketsCompleted}</span>,
                <span
                  key="rate"
                  className={cn(
                    'text-xs font-semibold',
                    s.completionRate >= 90 ? 'text-[var(--apple-green)]' :
                    s.completionRate >= 60 ? 'text-[var(--apple-orange)]' : 'text-[var(--apple-red)]',
                  )}
                >
                  {s.completionRate}%
                </span>,
              ]}
            />
          ))}
        </GroupedListBody>
      </div>
    </GroupedList>
  )
}
