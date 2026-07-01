/** shadcn chart color tokens — use for distinct series / categories */
export const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
] as const

export function chartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length]
}

export function chartToken(n: 1 | 2 | 3 | 4 | 5): string {
  return `var(--chart-${n})`
}

/** Map string keys to stable chart colors */
export function chartColorForKey(key: string): string {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * (i + 1)) % CHART_COLORS.length
  }
  return CHART_COLORS[hash]
}
