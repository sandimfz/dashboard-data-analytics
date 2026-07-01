import type { DashboardSystemStats } from '@/api/dashboard.types'
import { UsersIcon, MonitorIcon, BuildingIcon, WrenchIcon, ShieldIcon } from 'lucide-react'
import { GlassCard } from '@/components/ios-glass-card'
import { GroupedListBody, GroupedListRow } from '@/components/ios-grouped-list'

interface Props {
  stats: DashboardSystemStats
}

export function DashboardSystemStats({ stats }: Props) {
  const items = [
    { label: 'User Aktif', value: `${stats.activeUsers} / ${stats.totalUsers}`, icon: UsersIcon },
    { label: 'Site Aktif', value: `${stats.activeSites} / ${stats.totalSites}`, icon: MonitorIcon },
    { label: 'Staff', value: stats.staff, icon: BuildingIcon },
    { label: 'Teknisi', value: stats.engineers, icon: WrenchIcon },
    { label: 'SPV', value: stats.spvs, icon: ShieldIcon },
  ]

  return (
    <GlassCard eyebrow="Sistem" title="Data Sistem" noPadding contentClassName="px-2 pb-3 pt-0">
      <GroupedListBody>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <GroupedListRow key={item.label}>
              <div className="flex items-center gap-4">
                <Icon className="size-[18px] shrink-0 text-muted-foreground/45" />
                <span className="flex-1 text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-semibold tabular-nums text-foreground">{item.value}</span>
              </div>
            </GroupedListRow>
          )
        })}
      </GroupedListBody>
    </GlassCard>
  )
}
