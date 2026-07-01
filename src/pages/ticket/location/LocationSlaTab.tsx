import { useParams } from 'react-router-dom'
import { useTickets } from '@/hooks/use-ticket'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const SLA_LABEL: Record<string, { label: string; class: string }> = {
  on_time: { label: 'On Time', class: 'text-[var(--apple-green)]' },
  late:    { label: 'Terlambat', class: 'text-[var(--apple-red)]' },
}

const PRIORITY_COLOR: Record<string, string> = {
  critical: 'text-[var(--apple-red)]',
  high:     'text-[var(--apple-orange)]',
  medium:   'text-[var(--apple-blue)]',
  low:      'text-[var(--apple-green)]',
}

export default function LocationSlaTab() {
  const { locationId } = useParams<{ locationId: string }>()
  const { data, isLoading } = useTickets({ locationId: Number(locationId), status: 'closed', pageSize: 50 })

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />

  const tickets = data?.items ?? []
  const assessed = tickets.filter((t) => t.sla_result_fulltime)
  const onTime = assessed.filter((t) => t.sla_result_fulltime === 'on_time').length
  const late = assessed.filter((t) => t.sla_result_fulltime === 'late').length
  const pct = assessed.length > 0 ? Math.round((onTime / assessed.length) * 100) : 0

  return (
    <div className="flex flex-col gap-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Closed', value: tickets.length, color: 'text-foreground' },
          { label: 'On Time', value: onTime, color: 'text-[var(--apple-green)]' },
          { label: 'Terlambat', value: late, color: 'text-[var(--apple-red)]' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-4 text-center">
            <div className={cn('text-3xl font-semibold', s.color)}>{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">SLA Compliance</span>
          <span className={cn('text-sm font-semibold', pct >= 90 ? 'text-[var(--apple-green)]' : pct >= 70 ? 'text-[var(--apple-orange)]' : 'text-[var(--apple-red)]')}>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-[var(--apple-green)] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* List tiket closed */}
      <div className="rounded-2xl border border-border/60 bg-card">
        <div className="border-b border-border/50 px-5 py-3">
          <p className="text-sm font-semibold">Riwayat Tiket Closed</p>
        </div>
        <div className="divide-y divide-border/50">
          {tickets.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Belum ada tiket closed</p>
          ) : tickets.map((t) => {
            const sla = SLA_LABEL[t.sla_result_fulltime ?? '']
            return (
              <div key={t.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/40 transition-colors">
                <span className={cn('shrink-0 text-xs font-bold uppercase w-12', PRIORITY_COLOR[t.priority] ?? 'text-muted-foreground')}>
                  {t.priority.slice(0, 4)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.ticket_number}</p>
                </div>
                {sla ? (
                  <span className={cn('shrink-0 text-xs font-medium', sla.class)}>{sla.label}</span>
                ) : (
                  <span className="shrink-0 text-xs text-muted-foreground">—</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
