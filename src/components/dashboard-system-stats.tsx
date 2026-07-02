import type { DashboardSystemStats } from '@/api/dashboard.types'
import { UsersIcon, MonitorIcon, BuildingIcon, WrenchIcon, ShieldIcon, BriefcaseIcon } from 'lucide-react'
import { GlassCard } from '@/components/ios-glass-card'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'

interface Props {
  stats: DashboardSystemStats
}

export function DashboardSystemStats({ stats }: Props) {
  const items = [
    {
      label: 'User Aktif',
      value: `${stats.activeUsers} / ${stats.totalUsers}`,
      icon: UsersIcon,
      subtitle: 'Login 30 hari terakhir'
    },
    {
      label: 'Site Aktif',
      value: `${stats.activeSites} / ${stats.totalSites}`,
      icon: MonitorIcon,
      subtitle: 'Ada tiket bulan ini'
    },
    {
      label: 'Perusahaan',
      value: '0 / 0',
      icon: BriefcaseIcon,
    },
    { label: 'Staff', value: stats.staff, icon: BuildingIcon },
    { label: 'Teknisi', value: stats.engineers, icon: WrenchIcon },
    { label: 'SPV', value: stats.spvs, icon: ShieldIcon },
  ]

  return (
    <GlassCard eyebrow="Sistem" title="Data Sistem" noPadding contentClassName="p-0">
      <Table>
        <TableBody>
          {items.map((item) => {
            const Icon = item.icon
            return (
              <TableRow key={item.label}>
                <TableCell className="w-12">
                  <Icon className="size-[18px] text-foreground/25" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    {item.subtitle && (
                      <span className="text-xs text-muted-foreground/60">{item.subtitle}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {item.value}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </GlassCard>
  )
}
