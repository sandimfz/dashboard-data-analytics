import { Skeleton } from "@/components/ui/skeleton"

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(28, 28, 32, 0.82)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
}

export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-5" style={CARD_STYLE}>
          <div className="flex items-start justify-between">
            <Skeleton className="size-10 rounded-xl bg-white/[0.06]" />
            <Skeleton className="h-6 w-16 rounded-full bg-white/[0.06]" />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-8 w-28 bg-white/[0.06]" />
            <Skeleton className="h-4 w-20 bg-white/[0.06]" />
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Skeleton className="h-3 w-36 bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton({ height = "h-[300px]" }: { height?: string }) {
  return (
    <div className={`p-5 ${height}`} style={CARD_STYLE}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24 bg-white/[0.06]" />
          <Skeleton className="h-6 w-32 bg-white/[0.06]" />
        </div>
        <Skeleton className="h-8 w-36 rounded-xl bg-white/[0.06]" />
      </div>
      <div className="mt-6 flex h-[calc(100%-80px)] items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md bg-white/[0.06]"
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
        <div key={i} className="p-5" style={CARD_STYLE}>
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl bg-white/[0.06]" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-20 bg-white/[0.06]" />
              <Skeleton className="h-6 w-28 bg-white/[0.06]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="p-5" style={CARD_STYLE}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-16 bg-white/[0.06]" />
          <Skeleton className="h-6 w-24 bg-white/[0.06]" />
        </div>
        <Skeleton className="h-8 w-20 rounded-xl bg-white/[0.06]" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl bg-white/[0.06]" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-3/4 bg-white/[0.06]" />
              <Skeleton className="h-3 w-1/2 bg-white/[0.06]" />
            </div>
            <Skeleton className="h-4 w-12 bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  )
}
