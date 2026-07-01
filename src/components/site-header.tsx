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
    <header
      className="sticky top-0 z-50 shrink-0"
      style={{
        background: 'rgba(6, 6, 8, 0.72)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 1px 0 rgba(255, 255, 255, 0.04), 0 4px 24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-7 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #1a6bff 0%, #0a84ff 100%)',
              boxShadow: '0 2px 8px rgba(10, 132, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <LayoutDashboardIcon className="size-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">Analytics</span>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          <NavLink
            to="/ticket/dashboard"
            className={({ isActive }) =>
              cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                  : 'text-white/45 hover:bg-white/[0.06] hover:text-white/80',
              )
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <div
          className="hidden h-4 w-px sm:block"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        />

        {/* Location search */}
        <div className="hidden min-w-0 flex-1 sm:block">
          <LocationCombobox />
        </div>

        <div className="flex-1 sm:hidden" />

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-8 rounded-xl text-white/50 hover:bg-white/[0.08] hover:text-white"
                aria-label="Notifikasi"
              >
                <BellIcon className="size-4" />
                <Badge
                  variant="destructive"
                  className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full border-0 bg-[#ff453a] p-0 text-[9px] font-bold text-white shadow-[0_0_6px_rgba(255,69,58,0.5)]"
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
              <Avatar
                className="size-7 cursor-pointer transition-all"
                style={{
                  boxShadow: '0 0 0 1.5px rgba(255,255,255,0.12)',
                }}
              >
                <AvatarFallback
                  className="text-[11px] font-semibold text-white/80"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  A
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Profil</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <div
        className="flex h-10 items-center gap-2 px-4 sm:hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <NavLink
          to="/ticket/dashboard"
          className={({ isActive }) =>
            cn(
              'rounded-lg px-3 py-1 text-xs font-medium transition-colors',
              isActive ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/70',
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
