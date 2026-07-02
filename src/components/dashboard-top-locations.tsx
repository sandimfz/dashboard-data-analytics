import type { DashboardTopLocation } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'

interface Props {
  locations: DashboardTopLocation[]
}

export function DashboardTopLocations({ locations }: Props) {
  return (
    <GlassCard eyebrow="Volume Tertinggi" title="Top Lokasi Bermasalah" noPadding contentClassName="p-0">
      <Table>
        <TableBody>
          {locations.map((loc, i) => (
            <TableRow key={loc.siteId}>
              <TableCell className="w-12">
                <span className="flex size-6 items-center justify-center rounded-lg bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="truncate text-sm font-medium text-foreground">{loc.siteName}</p>
                  <p className="truncate text-xs text-muted-foreground">{loc.locationName}</p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span className="inline-block rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
                  {loc.ticketCount} tiket
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}
