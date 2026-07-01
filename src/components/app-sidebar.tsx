import { NavLink, useLocation as useRouterLocation } from 'react-router-dom'
import { useLocations } from '@/hooks/use-ticket'
import { cn } from '@/lib/utils'
import { LayoutDashboardIcon, MapPinIcon, ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

export function AppSidebar() {
  const { data: locations } = useLocations()
  const [locationsOpen, setLocationsOpen] = React.useState(true)

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-border/60 bg-sidebar">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border/60 px-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
          <LayoutDashboardIcon className="size-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">Dashboard</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2">
        {/* Ticket section */}
        <div className="mb-1">
          <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Ticket
          </p>

          {/* Dashboard */}
          <NavLink
            to="/ticket/dashboard"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
              )
            }
          >
            <LayoutDashboardIcon className="h-4 w-4 shrink-0" />
            Dashboard
          </NavLink>

          {/* Lokasi */}
          <button
            onClick={() => setLocationsOpen(!locationsOpen)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
          >
            <MapPinIcon className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Lokasi</span>
            <ChevronDownIcon className={cn('h-3.5 w-3.5 transition-transform', locationsOpen && 'rotate-180')} />
          </button>

          {locationsOpen && (
            <div className="ml-3 border-l border-border/50 pl-3 mt-0.5 space-y-0.5">
              {locations?.map((loc) => (
                <NavLink
                  key={loc.id}
                  to={`/ticket/lokasi/${loc.id}/overview`}
                  className={({ isActive }) =>
                    cn(
                      'block truncate rounded-lg px-2 py-1.5 text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-primary'
                        : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/60'
                    )
                  }
                >
                  {loc.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}
