import type { DashboardRecentTicket } from '@/api/dashboard.types'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

interface Props {
  tickets: DashboardRecentTicket[]
}

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-secondary text-muted-foreground',
  assigned_to_spv: 'bg-[oklch(0.96_0.05_55)] text-[var(--apple-orange)] dark:bg-[oklch(0.18_0.05_55)]',
  assigned_to_engineer: 'bg-[oklch(0.94_0.04_253)] text-[var(--apple-blue)] dark:bg-[oklch(0.2_0.05_253)]',
  in_progress: 'bg-[oklch(0.94_0.05_295)] text-[var(--apple-purple)] dark:bg-[oklch(0.18_0.05_295)]',
  closed: 'bg-[oklch(0.94_0.05_145)] text-[var(--apple-green)] dark:bg-[oklch(0.18_0.05_145)]',
  done: 'bg-[oklch(0.94_0.05_145)] text-[var(--apple-green)] dark:bg-[oklch(0.18_0.05_145)]',
}

const STATUS_LABEL: Record<string, string> = {
  new: 'Baru',
  assigned_to_spv: 'Assign SPV',
  assigned_to_engineer: 'Assign Eng',
  in_progress: 'Progress',
  done: 'Done',
  revision: 'Revisi',
  closed: 'Closed',
}

export function DashboardRecentTickets({ tickets }: Props) {
  return (
    <div className="apple-shadow-sm overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Terbaru</p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">Tiket</p>

      <div className="mt-4 flex flex-col divide-y divide-border/50">
        {tickets.map((t, i) => (
          <div key={t.id} className={cn('group flex items-center gap-3.5 py-3', i === 0 && 'pt-0')}>
            {/* Status badge */}
            <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', STATUS_BADGE[t.status] ?? 'bg-secondary text-muted-foreground')}>
              {STATUS_LABEL[t.status] ?? t.status}
            </span>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {t.ticketNumber} · {t.site?.name}
              </p>
            </div>

            {/* Time */}
            <span className="shrink-0 text-xs text-muted-foreground/60">
              {formatDistanceToNow(new Date(t.createdAt), { locale: id, addSuffix: true })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
