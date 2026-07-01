import { useParams, NavLink, Outlet, useLocation as useRouterLocation } from 'react-router-dom'
import { useLocation } from '@/hooks/use-ticket'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { MapPinIcon } from 'lucide-react'

const tabs = [
  { label: 'Overview', path: 'overview' },
  { label: 'Spesifikasi', path: 'spesifikasi' },
  { label: 'SLA', path: 'sla' },
  { label: 'Error & Tiket', path: 'tiket' },
]

export default function LocationLayout() {
  const { locationId } = useParams<{ locationId: string }>()
  const id = Number(locationId)
  const routerLocation = useRouterLocation()
  const { data: location, isLoading, isFetching } = useLocation(id)

  return (
    <div className="flex flex-1 flex-col">
      {/* Location header */}
      <div className="border-b border-border/60 px-4 pb-0 pt-6 lg:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <MapPinIcon className="h-3.5 w-3.5" />
          <span>Tiket / Lokasi</span>
        </div>

        {/* Nama lokasi — fade saat berganti */}
        <div
          className={cn(
            'mb-4 transition-opacity duration-150',
            isFetching && 'opacity-60'
          )}
        >
          {isLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {location?.name ?? '—'}
              </h1>
              {location?.address && (
                <p className="text-sm text-muted-foreground mt-0.5">{location.address}</p>
              )}
            </>
          )}
        </div>

        {/* Tabs */}
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                  isActive
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Tab content — fade in saat tab atau lokasi berganti */}
      <div
        key={routerLocation.pathname}
        className="flex-1 px-4 py-6 lg:px-6 animate-in fade-in duration-150"
      >
        <Outlet />
      </div>
    </div>
  )
}
