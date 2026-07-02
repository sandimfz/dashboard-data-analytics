import type { DashboardSpvPerformance } from '@/api/dashboard.types'
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
  spvList: DashboardSpvPerformance[]
}

export function DashboardSpvTable({ spvList }: Props) {
  return (
    <GlassCard eyebrow="Kinerja Supervisor" title="Berdasarkan Tingkat Penyelesaian" noPadding contentClassName="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Nama</TableHead>
            <TableHead className="text-right">Ditugaskan</TableHead>
            <TableHead className="text-right">Selesai</TableHead>
            <TableHead className="text-right">Tingkat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spvList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            spvList.map((s) => (
              <TableRow key={s.spvId}>
                <TableCell className="font-medium">{s.spvName || '—'}</TableCell>
                <TableCell className="text-right text-muted-foreground">{s.ticketsAssigned}</TableCell>
                <TableCell className="text-right font-semibold text-[var(--apple-green)]">
                  {s.ticketsCompleted}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      'font-semibold',
                      s.completionRate >= 90
                        ? 'text-[var(--apple-green)]'
                        : s.completionRate >= 60
                          ? 'text-[var(--apple-orange)]'
                          : 'text-[var(--apple-red)]'
                    )}
                  >
                    {s.completionRate}%
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </GlassCard>
  )
}
