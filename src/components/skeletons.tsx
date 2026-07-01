import { Skeleton } from "@/components/ui/skeleton"

export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-card p-5"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="size-10 rounded-xl" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mt-3 border-t border-border/50 pt-3">
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton({ height = "h-[300px]" }: { height?: string }) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card p-5 ${height}`}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-8 w-36 rounded-xl" />
      </div>
      <div className="mt-6 flex h-[calc(100%-80px)] items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${30 + Math.random() * 70}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-card p-5"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  )
}
