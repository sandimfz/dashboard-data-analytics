/**
 * iOS system color palette — maps to CSS variables defined in dark theme.
 * These colors are vibrant but legible on dark backgrounds.
 */

/** iOS system chart colors in order: blue, green, purple, orange, red */
export const CHART_COLORS = [
  'var(--chart-1)', // #0a84ff iOS Blue
  'var(--chart-2)', // #30d158 iOS Green
  'var(--chart-3)', // #bf5af2 iOS Purple
  'var(--chart-4)', // #ff9f0a iOS Orange
  'var(--chart-5)', // #ff453a iOS Red
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

/** Direct iOS color values — use when CSS vars are not applicable */
export const IOS_COLORS = {
  blue:   '#0a84ff',
  green:  '#30d158',
  purple: '#bf5af2',
  orange: '#ff9f0a',
  red:    '#ff453a',
  teal:   '#5ac8fa',
  indigo: '#5e5ce6',
  yellow: '#ffd60a',
  pink:   '#ff375f',
} as const
