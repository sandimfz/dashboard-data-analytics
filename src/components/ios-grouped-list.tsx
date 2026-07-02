import { cn } from '@/lib/utils'

interface GroupedListProps {
  children: React.ReactNode
  className?: string
}

interface GroupedListSectionProps {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}

interface GroupedListRowProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
}

interface GroupedListColumnsProps {
  columns: string[]
  className?: string
  gridTemplateColumns?: string
  /** Optional: array of alignment for each column. Default: 'left' */
  alignments?: ('left' | 'center' | 'right')[]
}

export function GroupedList({ children, className }: GroupedListProps) {
  return (
    <div className={cn('analytics-panel overflow-hidden', className)}>
      {children}
    </div>
  )
}

export function GroupedListSection({ title, description, children, className }: GroupedListSectionProps) {
  return (
    <div className={cn(className)}>
      {(title || description) && (
        <div className="border-b border-border px-5 py-4">
          {title && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
          )}
          {description && (
            <p className="mt-0.5 text-sm font-semibold text-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export function GroupedListColumns({ columns, className, gridTemplateColumns, alignments }: GroupedListColumnsProps) {
  return (
    <div
      className={cn(
        'grid gap-3 border-b border-border bg-muted/40 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground',
        className,
      )}
      style={{ gridTemplateColumns: gridTemplateColumns ?? `repeat(${columns.length}, minmax(0, 1fr))` }}
    >
      {columns.map((col, i) => {
        const align = alignments?.[i] ?? 'left'
        return (
          <span key={col} className={align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}>
            {col}
          </span>
        )
      })}
    </div>
  )
}

export function GroupedListRow({ children, className, inset = true }: GroupedListRowProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col transition-colors duration-100 hover:bg-muted/50',
        inset && 'mx-0',
        className,
      )}
    >
      <div className="px-5 py-3">{children}</div>
      <div className="ios-separator" aria-hidden />
    </div>
  )
}

export function GroupedListRowGrid({
  cells,
  className,
  gridTemplateColumns,
}: {
  cells: React.ReactNode[]
  className?: string
  gridTemplateColumns?: string
}) {
  return (
    <GroupedListRow className={className}>
      <div
        className="grid items-center gap-3 text-sm"
        style={{ gridTemplateColumns: gridTemplateColumns ?? `repeat(${cells.length}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, i) => (
          <div key={i}>{cell}</div>
        ))}
      </div>
    </GroupedListRow>
  )
}

export function GroupedListBody({ children, className }: GroupedListProps) {
  return (
    <div className={cn('[&>div:last-child_.ios-separator]:hidden', className)}>
      {children}
    </div>
  )
}
