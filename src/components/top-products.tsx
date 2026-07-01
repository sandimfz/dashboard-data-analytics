import { cn } from "@/lib/utils"

const products = [
  {
    rank: 1,
    name: "MacBook Pro 16\"",
    category: "Laptops",
    revenue: "$124,520",
    units: 842,
    change: 12.4,
  },
  {
    rank: 2,
    name: "iPhone 15 Pro",
    category: "Phones",
    revenue: "$98,340",
    units: 1240,
    change: 8.1,
  },
  {
    rank: 3,
    name: "AirPods Pro",
    category: "Audio",
    revenue: "$54,890",
    units: 2180,
    change: -3.2,
  },
  {
    rank: 4,
    name: "iPad Air",
    category: "Tablets",
    revenue: "$47,230",
    units: 630,
    change: 5.7,
  },
  {
    rank: 5,
    name: "Apple Watch Series 9",
    category: "Wearables",
    revenue: "$38,940",
    units: 486,
    change: 15.3,
  },
]

export function TopProducts() {
  return (
    <div className="apple-shadow-sm overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Top Selling
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Products
          </p>
        </div>
        <button className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground">
          View all
        </button>
      </div>

      {/* Table header */}
      <div className="mt-4 grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b border-border/50 pb-2">
        <span className="w-5 text-center text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          #
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Product
        </span>
        <span className="text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Revenue
        </span>
        <span className="w-14 text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Change
        </span>
      </div>

      {/* Rows */}
      <div className="mt-1 flex flex-col">
        {products.map((product) => {
          const isPositive = product.change >= 0
          return (
            <div
              key={product.rank}
              className="group grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-xl px-1 py-2.5 transition-colors hover:bg-secondary/50"
            >
              <span className="w-5 text-center text-xs font-medium text-muted-foreground/50">
                {product.rank}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.category} · {product.units.toLocaleString()} units
                </p>
              </div>
              <span className="text-right text-sm font-semibold text-foreground">
                {product.revenue}
              </span>
              <span
                className={cn(
                  "w-14 rounded-full py-0.5 text-right text-xs font-medium",
                  isPositive
                    ? "text-[var(--apple-green)]"
                    : "text-[var(--apple-red)]"
                )}
              >
                {isPositive ? "+" : ""}
                {product.change}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
