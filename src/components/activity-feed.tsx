import {
  ShoppingCartIcon,
  UserPlusIcon,
  CreditCardIcon,
  ArrowUpRightIcon,
  BellIcon,
  CheckCircleIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    icon: ShoppingCartIcon,
    iconBg: "bg-[oklch(0.94_0.04_253)] dark:bg-[oklch(0.2_0.05_253)]",
    iconColor: "text-[var(--apple-blue)]",
    title: "New order received",
    description: "Order #4521 — $249.00",
    time: "2 min ago",
    status: "new",
  },
  {
    id: 2,
    icon: UserPlusIcon,
    iconBg: "bg-[oklch(0.94_0.05_145)] dark:bg-[oklch(0.18_0.05_145)]",
    iconColor: "text-[var(--apple-green)]",
    title: "New user registered",
    description: "alex.chen@example.com",
    time: "18 min ago",
    status: "success",
  },
  {
    id: 3,
    icon: CreditCardIcon,
    iconBg: "bg-[oklch(0.94_0.05_295)] dark:bg-[oklch(0.18_0.05_295)]",
    iconColor: "text-[var(--apple-purple)]",
    title: "Payment processed",
    description: "Subscription renewal — $99.00",
    time: "1 hr ago",
    status: "success",
  },
  {
    id: 4,
    icon: ArrowUpRightIcon,
    iconBg: "bg-[oklch(0.96_0.05_55)] dark:bg-[oklch(0.18_0.05_55)]",
    iconColor: "text-[var(--apple-orange)]",
    title: "Traffic spike detected",
    description: "+34% above baseline",
    time: "2 hr ago",
    status: "warning",
  },
  {
    id: 5,
    icon: BellIcon,
    iconBg: "bg-[oklch(0.97_0.04_27)] dark:bg-[oklch(0.18_0.04_27)]",
    iconColor: "text-[var(--apple-red)]",
    title: "Server alert resolved",
    description: "Response time normalized",
    time: "3 hr ago",
    status: "resolved",
  },
  {
    id: 6,
    icon: CheckCircleIcon,
    iconBg: "bg-[oklch(0.94_0.05_145)] dark:bg-[oklch(0.18_0.05_145)]",
    iconColor: "text-[var(--apple-green)]",
    title: "Deployment succeeded",
    description: "v2.4.1 → production",
    time: "5 hr ago",
    status: "success",
  },
]

export function ActivityFeed() {
  return (
    <div className="apple-shadow-sm overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Recent
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Activity
          </p>
        </div>
        <button className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground">
          View all
        </button>
      </div>

      <div className="mt-5 flex flex-col divide-y divide-border/50">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className={cn(
                "group flex items-center gap-3.5 py-3 transition-all duration-150",
                index === 0 && "pt-0"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  activity.iconBg
                )}
              >
                <Icon className={cn("h-4 w-4", activity.iconColor)} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              {/* Time */}
              <span className="shrink-0 text-xs text-muted-foreground/60">
                {activity.time}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
