import { NavLink } from 'react-router-dom'
import { LayoutDashboardIcon, BellIcon } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { LocationCombobox } from '@/components/location-combobox'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-2.5">
          <LayoutDashboardIcon className="size-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Analytics</span>
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink
            to="/ticket/dashboard"
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
              )
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <div className="hidden h-4 w-px bg-border sm:block" />

        <div className="hidden min-w-0 flex-1 sm:block">
          <LocationCombobox />
        </div>

        <div className="flex-1 sm:hidden" />

        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative size-8" aria-label="Notifikasi">
                <BellIcon className="size-4" />
                <Badge
                  variant="destructive"
                  className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full p-0 text-[9px]"
                >
                  3
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>3 notifikasi belum dibaca</TooltipContent>
          </Tooltip>

          <ModeToggle />

          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-7 cursor-pointer">
                <AvatarFallback className="bg-muted text-[11px] font-medium text-muted-foreground">
                  A
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Profil</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex h-10 items-center gap-2 border-t border-border px-4 sm:hidden">
        <NavLink
          to="/ticket/dashboard"
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-1 text-xs font-medium',
              isActive ? 'bg-accent text-foreground' : 'text-muted-foreground',
            )
          }
        >
          Dashboard
        </NavLink>
        <LocationCombobox />
      </div>
    </header>
  )
}
