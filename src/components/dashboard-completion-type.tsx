import type { DashboardSourceItem } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import { chartColor } from '@/lib/chart-colors'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Props {
  sources: DashboardSourceItem[]
}

const SOURCE_LABEL: Record<string, string> = {
  internal: 'Internal',
  local_people: 'Warga Lokal',
  monitoring: 'Monitoring',
}

export function DashboardCompletionType({ sources }: Props) {
  const data = sources.filter((s) => s.count > 0)

  return (
    <GlassCard eyebrow="Penyelesaian" title="Jenis Penyelesaian" noPadding contentClassName="p-0">
      {data.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          Tidak ada data
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Kategori</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((s, i) => (
              <TableRow key={s.source}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: chartColor(i) }} />
                    <span className="font-medium">{SOURCE_LABEL[s.source] ?? s.source}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{s.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </GlassCard>
  )
}
