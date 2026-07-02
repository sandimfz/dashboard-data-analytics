import type { DashboardSparepartStats } from '@/api/dashboard.types'
import { GlassCard } from '@/components/ios-glass-card'
import { PackageIcon, CheckCircleIcon } from 'lucide-react'

interface Props {
  sparepart: DashboardSparepartStats
}

export function DashboardSparepartCard({ sparepart }: Props) {
  const hasPending = sparepart.pendingRequests > 0

  return (
    <GlassCard eyebrow="Inventaris" title="Sparepart" className="h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: hasPending
                ? 'color-mix(in srgb, var(--apple-orange) 12%, transparent)'
                : 'color-mix(in srgb, var(--apple-green) 12%, transparent)',
            }}
          >
            <PackageIcon
              className="size-5"
              style={{ color: hasPending ? 'var(--apple-orange)' : 'var(--apple-green)' }}
            />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Pending request</p>
            <p className="text-2xl font-semibold tabular-nums text-foreground">
              {sparepart.pendingRequests}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
          <CheckCircleIcon
            className="size-4"
            style={{ color: hasPending ? 'var(--apple-orange)' : 'var(--apple-green)' }}
          />
          <span className="text-sm font-medium text-foreground">
            {hasPending ? 'Ada request pending' : 'Clear'}
          </span>
        </div>
      </div>
    </GlassCard>
  )
}
