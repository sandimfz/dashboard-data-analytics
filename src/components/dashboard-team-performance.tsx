import type { DashboardEngineerPerformance, DashboardSpvPerformance } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Props {
  engineers: DashboardEngineerPerformance[]
  spvs: DashboardSpvPerformance[]
}

interface TeamMember {
  id: number
  name: string
  assigned: number
  completed: number
  rate: number
}

export function DashboardTeamPerformance({ engineers, spvs }: Props) {
  // Merge engineers and SPVs into one list
  const team: TeamMember[] = [
    ...engineers.map((e) => ({
      id: e.engineerId,
      name: e.engineerName || '—',
      assigned: e.ticketsAssigned,
      completed: e.ticketsCompleted,
      rate: e.ticketsAssigned > 0
        ? Math.round((e.ticketsCompleted / (e.ticketsAssigned + e.ticketsCompleted)) * 100)
        : 0,
    })),
    ...spvs.map((s) => ({
      id: s.spvId,
      name: s.spvName || '—',
      assigned: s.ticketsAssigned,
      completed: s.ticketsCompleted,
      rate: s.completionRate,
    })),
  ]

  // Deduplicate by name (in case someone is both eng and spv)
  const deduped = new Map<string, TeamMember>()
  for (const m of team) {
    const existing = deduped.get(m.name)
    if (existing) {
      existing.assigned += m.assigned
      existing.completed += m.completed
      existing.rate = existing.assigned > 0
        ? Math.round((existing.completed / (existing.assigned)) * 100)
        : 0
    } else {
      deduped.set(m.name, { ...m })
    }
  }

  const sorted = [...deduped.values()].sort((a, b) => b.completed - a.completed)

  return (
    <GlassCard eyebrow="Kinerja" title="Kinerja Tim" noPadding contentClassName="p-0">
      {sorted.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          Tidak ada data
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Nama</TableHead>
              <TableHead className="text-right">Tugas</TableHead>
              <TableHead className="text-right">Selesai</TableHead>
              <TableHead className="text-right">Rasio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell className="text-right text-muted-foreground">{m.assigned + m.completed}</TableCell>
                <TableCell className="text-right font-semibold text-[var(--apple-green)]">
                  {m.completed}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      'font-semibold',
                      m.rate >= 90
                        ? 'text-[var(--apple-green)]'
                        : m.rate >= 60
                          ? 'text-[var(--apple-orange)]'
                          : 'text-[var(--apple-red)]'
                    )}
                  >
                    {m.rate}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </GlassCard>
  )
}
