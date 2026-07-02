import type { DashboardActiveTicket } from '@/api/dashboard.types'
import { cn } from '@/lib/utils'
import { ClockIcon } from 'lucide-react'

interface Props {
  tickets: DashboardActiveTicket[]
}

const PRIORITY_COLOR: Record<string, string> = {
  critical: 'text-[var(--apple-red)]',
  high: 'text-[var(--apple-orange)]',
  medium: 'text-[var(--apple-blue)]',
  low: 'text-[var(--apple-green)]',
}

const SLA_BADGE: Record<string, { label: string; class: string }> = {
  breached: { label: 'Breached', class: 'bg-[oklch(0.97_0.04_27)] text-[var(--apple-red)] dark:bg-[oklch(0.18_0.04_27)]' },
  at_risk:  { label: 'At Risk',  class: 'bg-[oklch(0.96_0.05_55)] text-[var(--apple-orange)] dark:bg-[oklch(0.18_0.05_55)]' },
  normal:   { label: 'Normal',   class: 'bg-[oklch(0.94_0.05_145)] text-[var(--apple-green)] dark:bg-[oklch(0.18_0.05_145)]' },
  none:     { label: '-',        class: 'bg-secondary text-muted-foreground' },
}

export function DashboardActiveTickets({ tickets }: Props) {
  return (
    <div className="apple-shadow-sm h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Belum Selesai</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">Tiket Aktif</p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{tickets.length} tiket</span>
      </div>

      {tickets.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 text-muted-foreground">
          <ClockIcon className="h-8 w-8 opacity-30" />
          <p className="text-sm">Tidak ada tiket aktif</p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {tickets.map((t) => {
            const sla = SLA_BADGE[t.slaState] ?? SLA_BADGE.none
            return (
              <div key={t.id} className="group flex items-start gap-3 rounded-xl border border-border/40 px-3 py-2.5 transition-colors hover:bg-secondary/50">
                {/* Priority indicator */}
                <span className={cn('mt-0.5 shrink-0 text-xs font-bold uppercase', PRIORITY_COLOR[t.priority] ?? 'text-muted-foreground')}>
                  {t.priority.slice(0, 3)}
                </span>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.site?.name} · {t.ageHours}j yang lalu
                  </p>
                </div>

                {/* SLA badge */}
                <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', sla.class)}>
                  {sla.label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
