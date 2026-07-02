import type { DashboardActiveTicket } from '@/api/dashboard.types'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ios-glass-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Props {
  tickets: DashboardActiveTicket[]
}

const PRIORITY_LABEL: Record<string, string> = {
  critical: 'Kritis',
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
}
const PRIORITY_COLOR: Record<string, string> = {
  critical: 'text-[var(--apple-red)]',
  high: 'text-[var(--apple-orange)]',
  medium: 'text-[var(--apple-blue)]',
  low: 'text-[var(--apple-green)]',
}
const STATUS_LABEL: Record<string, string> = {
  new: 'Baru',
  assigned_to_spv: 'Di Supervisor',
  assigned_to_engineer: 'Di Teknisi',
  in_progress: 'Diproses',
  done: 'Selesai',
  revision: 'Revisi',
  closed: 'Ditutup',
}
const SLA_STATE_CLASS: Record<string, string> = {
  breached: 'text-[var(--apple-red)]',
  at_risk: 'text-[var(--apple-orange)]',
  normal: 'text-muted-foreground',
  none: 'text-muted-foreground',
}

export function DashboardPendingTable({ tickets }: Props) {
  if (tickets.length === 0) return null

  return (
    <GlassCard eyebrow="Perlu Ditindaklanjuti" title="Tiket Aktif" noPadding contentClassName="p-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[80px]">Tiket</TableHead>
              <TableHead className="min-w-[200px]">Kendala</TableHead>
              <TableHead className="min-w-[80px]">Prioritas</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[60px] text-right">Umur</TableHead>
              <TableHead className="min-w-[100px] text-right">SLA</TableHead>
              <TableHead className="min-w-[150px]">Site</TableHead>
              <TableHead className="min-w-[150px]">Ditugaskan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((t) => {
              const slaLabel =
                t.hoursToSla != null
                  ? t.hoursToSla < 0
                    ? `${Math.abs(t.hoursToSla)}j terlambat`
                    : `${t.hoursToSla}j tersisa`
                  : '—'

              return (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {t.ticketNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="max-w-[300px] truncate">{t.title}</div>
                  </TableCell>
                  <TableCell>
                    <span className={cn('text-xs font-semibold', PRIORITY_COLOR[t.priority])}>
                      {PRIORITY_LABEL[t.priority] ?? t.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {STATUS_LABEL[t.status] ?? t.status}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {t.ageHours}j
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn('text-xs font-medium', SLA_STATE_CLASS[t.slaState])}>
                      {slaLabel}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground/80">
                    <div className="max-w-[200px] truncate">{t.site?.name}</div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <div className="max-w-[180px] truncate">
                      {t.assignedSpvName || '—'} / {t.assignedEngineerName || '—'}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </GlassCard>
  )
}
