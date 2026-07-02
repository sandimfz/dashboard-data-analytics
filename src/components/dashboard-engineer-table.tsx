import * as React from 'react'
import type { DashboardEngineerPerformance } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface Props {
  engineers: DashboardEngineerPerformance[]
}

const DEFAULT_VISIBLE = 5

export function DashboardEngineerTable({ engineers }: Props) {
  const [showAll, setShowAll] = React.useState(false)

  const visible = showAll ? engineers : engineers.slice(0, DEFAULT_VISIBLE)
  const hasMore = engineers.length > DEFAULT_VISIBLE

  return (
    <GlassCard eyebrow="Kinerja Teknisi" title="Berdasarkan Tiket Selesai" noPadding contentClassName="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Nama</TableHead>
            <TableHead className="text-right">Selesai</TableHead>
            <TableHead className="text-right">Aktif</TableHead>
            <TableHead className="text-right">Rata-rata</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {engineers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            visible.map((eng) => (
              <TableRow key={eng.engineerId}>
                <TableCell className="font-medium">{eng.engineerName || '—'}</TableCell>
                <TableCell className="text-right font-semibold text-[var(--apple-green)]">
                  {eng.ticketsCompleted}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{eng.ticketsAssigned}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {eng.avgWorkTimeHours}j/tiket
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {hasMore && (
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll((v) => !v)}
            className="w-full text-xs text-muted-foreground hover:text-foreground"
          >
            {showAll ? 'Sembunyikan' : `Lihat Semua (${engineers.length - DEFAULT_VISIBLE} lainnya)`}
          </Button>
        </div>
      )}
    </GlassCard>
  )
}
