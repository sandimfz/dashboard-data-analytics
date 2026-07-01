import { SearchIcon, BellIcon, LayoutDashboardIcon } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const now = new Date()
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl transition-all lg:px-6">
      {/* Logo / brand */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--apple-blue)]">
          <LayoutDashboardIcon className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground">Analytics</span>
      </div>

      {/* Title + date */}
      <div className="flex flex-1 items-baseline gap-2.5">
        <h1 className="text-sm font-semibold text-foreground">Overview</h1>
        <span className="hidden text-xs text-muted-foreground/60 sm:block">
          {dateStr}
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search pill */}

        {/* Dark/Light mode toggle */}
        <ModeToggle />

        {/* Avatar */}
        <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--apple-blue)] to-[var(--apple-purple)] text-xs font-semibold text-white ring-2 ring-border/60 transition-all hover:ring-[var(--apple-blue)]/40">
          A
        </button>
      </div>
    </header>
  )
}
