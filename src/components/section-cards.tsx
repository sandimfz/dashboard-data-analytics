import * as React from "react"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSignIcon,
  UsersIcon,
  ActivityIcon,
  TrendingUpIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  suffix?: string
}

function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor,
  iconBg,
  suffix,
}: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <div className="apple-shadow-sm group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:apple-shadow">

      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>

        {/* Change badge */}
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            isPositive
              ? "bg-[oklch(0.96_0.05_145)] text-[var(--apple-green)] dark:bg-[oklch(0.18_0.05_145)]"
              : "bg-[oklch(0.97_0.04_27)] text-[var(--apple-red)] dark:bg-[oklch(0.18_0.04_27)]"
          )}
        >
          {isPositive ? (
            <ArrowUpIcon className="h-3 w-3" />
          ) : (
            <ArrowDownIcon className="h-3 w-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>

      {/* Value */}
      <div className="mt-4">
        <div className="text-[1.75rem] font-semibold leading-none tracking-tight text-foreground">
          {value}
          {suffix && (
            <span className="ml-1 text-base font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
        <div className="mt-1.5 text-sm font-medium text-muted-foreground">
          {title}
        </div>
      </div>

      {/* Footer label */}
      <div className="mt-3 border-t border-border/50 pt-3">
        <p className="text-xs text-muted-foreground/70">{changeLabel}</p>
      </div>
    </div>
  )
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        value="$124.5K"
        change={12.5}
        changeLabel="Compared to last month"
        icon={DollarSignIcon}
        iconColor="text-[var(--apple-blue)]"
        iconBg="bg-[oklch(0.94_0.04_253)] dark:bg-[oklch(0.2_0.05_253)]"
      />
      <MetricCard
        title="Active Users"
        value="45,678"
        change={8.2}
        changeLabel="New users this month"
        icon={UsersIcon}
        iconColor="text-[var(--apple-green)]"
        iconBg="bg-[oklch(0.94_0.05_145)] dark:bg-[oklch(0.18_0.05_145)]"
      />
      <MetricCard
        title="Conversion Rate"
        value="3.24"
        suffix="%"
        change={-2.1}
        changeLabel="Needs attention this period"
        icon={ActivityIcon}
        iconColor="text-[var(--apple-orange)]"
        iconBg="bg-[oklch(0.96_0.05_55)] dark:bg-[oklch(0.18_0.05_55)]"
      />
      <MetricCard
        title="Growth Rate"
        value="18.9"
        suffix="%"
        change={4.5}
        changeLabel="Meets growth projections"
        icon={TrendingUpIcon}
        iconColor="text-[var(--apple-purple)]"
        iconBg="bg-[oklch(0.94_0.05_295)] dark:bg-[oklch(0.18_0.05_295)]"
      />
    </div>
  )
}
