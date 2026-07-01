import type { DashboardActiveTicket } from '@/api/dashboard.types'
import { cn } from '@/lib/utils'
import {
  GroupedList,
  GroupedListSection,
  GroupedListColumns,
  GroupedListBody,
  GroupedListRowGrid,
} from '@/components/ios-grouped-list'

interface Props {
  tickets: DashboardActiveTicket[]
}

const PRIORITY_LABEL: Record<string, string> = {
  critical: 'Kritis', high: 'Tinggi', medium: 'Sedang', low: 'Rendah',
}
const PRIORITY_COLOR: Record<string, string> = {
  critical: 'text-[var(--apple-red)]',
  high: 'text-[var(--apple-orange)]',
  medium: 'text-[var(--apple-blue)]',
  low: 'text-[var(--apple-green)]',
}
const STATUS_LABEL: Record<string, string> = {
  new: 'Baru', assigned_to_spv: 'Ke SPV', assigned_to_engineer: 'Ke Teknisi',
  in_progress: 'Diproses', done: 'Selesai', revision: 'Revisi', closed: 'Ditutup',
}
const SLA_STATE_CLASS: Record<string, string> = {
  breached: 'text-[var(--apple-red)]',
  at_risk: 'text-[var(--apple-orange)]',
  normal: 'text-muted-foreground',
  none: 'text-muted-foreground',
}

const COLS = 'minmax(5rem,0.7fr) minmax(8rem,1.4fr) minmax(4rem,0.6fr) minmax(4.5rem,0.7fr) minmax(3rem,0.5fr) minmax(3.5rem,0.5fr) minmax(5rem,0.8fr)'

export function DashboardPendingTable({ tickets }: Props) {
  if (tickets.length === 0) return null

  return (
    <GroupedList>
      <GroupedListSection description="Perlu Ditindaklanjuti" />
      <div className="px-2 pb-3">
        <GroupedListColumns
          columns={['Tiket', 'Kendala', 'Prioritas', 'Status', 'Umur', 'SLA', 'Site']}
          gridTemplateColumns={COLS}
        />
        <GroupedListBody>
          {tickets.map((t) => {
            const slaLabel = t.hoursToSla != null
              ? t.hoursToSla < 0
                ? `${Math.abs(t.hoursToSla)}h late`
                : `${t.hoursToSla}h`
              : '—'

            return (
              <GroupedListRowGrid
                key={t.id}
                gridTemplateColumns={COLS}
                cells={[
                  <span key="num" className="font-mono text-xs text-muted-foreground">{t.ticketNumber}</span>,
                  <p key="title" className="truncate text-sm font-medium text-foreground">{t.title}</p>,
                  <span key="prio" className={cn('text-xs font-semibold', PRIORITY_COLOR[t.priority])}>
                    {PRIORITY_LABEL[t.priority] ?? t.priority}
                  </span>,
                  <span key="status" className="text-xs text-muted-foreground">
                    {STATUS_LABEL[t.status] ?? t.status}
                  </span>,
                  <span key="age" className="text-xs text-muted-foreground">{t.ageHours}h</span>,
                  <span key="sla" className={cn('text-xs font-medium', SLA_STATE_CLASS[t.slaState])}>{slaLabel}</span>,
                  <p key="site" className="truncate text-xs font-medium text-foreground">{t.site?.name}</p>,
                ]}
              />
            )
          })}
        </GroupedListBody>
      </div>
    </GroupedList>
  )
}
