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
    <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/80 dark:border-white/[0.07] dark:bg-[rgba(8,8,12,0.80)]">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-xl bg-primary shadow-sm">
            <LayoutDashboardIcon className="size-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">Analytics</span>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          <NavLink
            to="/ticket/dashboard"
            className={({ isActive }) =>
              cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150',
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

        {/* Location search */}
        <div className="hidden min-w-0 flex-1 sm:block">
          <LocationCombobox />
        </div>

        <div className="flex-1 sm:hidden" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-8 rounded-xl"
                aria-label="Notifikasi"
              >
                <BellIcon className="size-4" />
                <Badge
                  variant="destructive"
                  className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full p-0 text-[9px] font-bold"
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
              <Avatar className="size-7 cursor-pointer ring-1 ring-border transition-all hover:ring-primary/50">
                <AvatarFallback className="bg-muted text-[11px] font-semibold text-muted-foreground">
                  A
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Profil</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <div className="flex h-10 items-center gap-2 border-t border-border px-4 sm:hidden">
        <NavLink
          to="/ticket/dashboard"
          className={({ isActive }) =>
            cn(
              'rounded-lg px-3 py-1 text-xs font-medium transition-colors',
              isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground',
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
