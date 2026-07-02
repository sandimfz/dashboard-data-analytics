import * as React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { GlassCard } from '@/components/ios-glass-card'
import { chartColor, chartToken } from '@/lib/chart-colors'
import type { DashboardPriorityItem } from '@/api/dashboard.types'

interface Props {
  priorities: DashboardPriorityItem[]
}

const PRIORITY_LABEL: Record<string, string> = {
  critical: 'Kritis',
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
}

const PRIORITY_COLOR: Record<string, string> = {
  critical: chartToken(5),
  high: chartToken(4),
  medium: chartToken(1),
  low: chartToken(2),
}

const ORDER = ['critical', 'high', 'medium', 'low']

// Custom tooltip
function CustomTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: { color: string } }>
  total: number
}) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 text-xs text-foreground shadow-md">
      <p className="font-semibold text-foreground">{item.name}</p>
      <p className="mt-0.5 text-muted-foreground">
        <span className="font-semibold tabular-nums text-foreground">{item.value}</span>
        {' '}tiket · {pct}%
      </p>
    </div>
  )
}

export function DashboardPriorityChart({ priorities }: Props) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const data = [...priorities]
    .filter((p) => p.count > 0)
    .sort((a, b) => ORDER.indexOf(a.priority) - ORDER.indexOf(b.priority))
    .map((p, i) => ({
      key: p.priority,
      name: PRIORITY_LABEL[p.priority] ?? p.priority,
      value: p.count,
      color: PRIORITY_COLOR[p.priority] ?? chartColor(i),
    }))

  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (data.length === 0) {
    return (
      <GlassCard eyebrow="Distribusi" title="Prioritas Tiket">
        <p className="text-sm text-muted-foreground">Tidak ada data</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard eyebrow="Distribusi" title="Prioritas Tiket" noPadding contentClassName="px-6 pb-6 pt-4">
      {/* Donut chart */}
      <div className="mx-auto h-[220px] w-full max-w-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={<CustomTooltip total={total} />}
              cursor={false}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              strokeWidth={0}
              animationBegin={0}
              animationDuration={600}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.key}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.45}
                  style={{ transition: 'opacity 150ms ease', cursor: 'pointer' }}
                />
              ))}
            </Pie>
            {/* Center total */}
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan
                x="50%"
                dy="-0.4em"
                fontSize="22"
                fontWeight="700"
                className="fill-foreground"
              >
                {total}
              </tspan>
              <tspan
                x="50%"
                dy="1.4em"
                fontSize="11"
                className="fill-muted-foreground"
              >
                Total
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
          const isActive = activeIndex === index
          return (
            <div
              key={item.key}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border border-border px-3 py-2.5 transition-all duration-150 ${
                activeIndex === null || isActive ? 'bg-muted' : 'bg-muted/40 opacity-50'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold tabular-nums text-foreground">{item.value}</span>
                  {' · '}{pct}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
