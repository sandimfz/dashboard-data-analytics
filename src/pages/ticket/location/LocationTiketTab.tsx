import { useParams } from 'react-router-dom'
import { useTickets } from '@/hooks/use-ticket'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import * as React from 'react'

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-secondary text-muted-foreground',
  assigned_to_spv: 'bg-[oklch(0.96_0.05_55)] text-[var(--apple-orange)] dark:bg-[oklch(0.18_0.05_55)]',
  assigned_to_engineer: 'bg-[oklch(0.94_0.04_253)] text-[var(--apple-blue)] dark:bg-[oklch(0.2_0.05_253)]',
  in_progress: 'bg-[oklch(0.94_0.05_295)] text-[var(--apple-purple)] dark:bg-[oklch(0.18_0.05_295)]',
  closed: 'bg-[oklch(0.94_0.05_145)] text-[var(--apple-green)] dark:bg-[oklch(0.18_0.05_145)]',
  done: 'bg-[oklch(0.94_0.05_145)] text-[var(--apple-green)] dark:bg-[oklch(0.18_0.05_145)]',
}

const STATUS_LABEL: Record<string, string> = {
  new: 'Baru', assigned_to_spv: 'Assign SPV', assigned_to_engineer: 'Assign Eng',
  in_progress: 'Progress', done: 'Done', revision: 'Revisi', closed: 'Closed',
}

const PRIORITY_COLOR: Record<string, string> = {
  critical: 'text-[var(--apple-red)]', high: 'text-[var(--apple-orange)]',
  medium: 'text-[var(--apple-blue)]', low: 'text-[var(--apple-green)]',
}

const ALL_STATUSES = ['', 'new', 'assigned_to_spv', 'assigned_to_engineer', 'in_progress', 'done', 'closed']

export default function LocationTiketTab() {
  const { locationId } = useParams<{ locationId: string }>()
  const [status, setStatus] = React.useState('')
  const [page, setPage] = React.useState(1)

  const { data, isLoading } = useTickets({
    locationId: Number(locationId),
    status: status || undefined,
    page,
    pageSize: 20,
  })

  const tickets = data?.items ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / 20)

  return (
    <div className="flex flex-col gap-4">
      {/* Filter status */}
      <div className="flex flex-wrap gap-2">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setStatus(s); setPage(1) }}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors',
              status === s
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            )}
          >
            {s === '' ? 'Semua' : STATUS_LABEL[s] ?? s}
          </button>
        ))}
      </div>

      {/* List tiket */}
      <div className="rounded-2xl border border-border/60 bg-card">
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
          <p className="text-sm font-semibold">Tiket ({total})</p>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {tickets.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">Tidak ada tiket</p>
            ) : tickets.map((t) => (
              <div key={t.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/40 transition-colors">
                <span className={cn('shrink-0 text-xs font-bold uppercase w-10', PRIORITY_COLOR[t.priority] ?? 'text-muted-foreground')}>
                  {t.priority.slice(0, 4)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.ticket_number} · {t.site_name}</p>
                </div>
                <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', STATUS_BADGE[t.status] ?? 'bg-secondary text-muted-foreground')}>
                  {STATUS_LABEL[t.status] ?? t.status}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground/60">
                  {formatDistanceToNow(new Date(t.created_at), { locale: id, addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => p - 1)}
            className="rounded-lg border border-border/60 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-secondary transition-colors"
          >
            Sebelumnya
          </button>
          <span className="text-xs text-muted-foreground">{page} / {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
            className="rounded-lg border border-border/60 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-secondary transition-colors"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  )
}
