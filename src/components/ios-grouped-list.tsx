import { cn } from '@/lib/utils'

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(28, 28, 32, 0.82)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  borderRadius: '20px',
  boxShadow: [
    '0 8px 32px rgba(0, 0, 0, 0.40)',
    '0 2px 6px rgba(0, 0, 0, 0.25)',
    'inset 0 1px 0 rgba(255, 255, 255, 0.09)',
  ].join(', '),
}

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
}

export function GroupedList({ children, className }: GroupedListProps) {
  return (
    <div className={cn('overflow-hidden', className)} style={CARD_STYLE}>
      {children}
    </div>
  )
}

export function GroupedListSection({ title, description, children, className }: GroupedListSectionProps) {
  return (
    <div className={cn(className)}>
      {(title || description) && (
        <div
          className="px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}
        >
          {title && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">{title}</p>
          )}
          {description && (
            <p className="mt-0.5 text-sm font-semibold text-white">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export function GroupedListColumns({ columns, className, gridTemplateColumns }: GroupedListColumnsProps) {
  return (
    <div
      className={cn(
        'grid gap-3 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/35',
        className,
      )}
      style={{
        gridTemplateColumns: gridTemplateColumns ?? `repeat(${columns.length}, minmax(0, 1fr))`,
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(255, 255, 255, 0.025)',
      }}
    >
      {columns.map((col) => (
        <span key={col}>{col}</span>
      ))}
    </div>
  )
}

export function GroupedListRow({ children, className, inset = true }: GroupedListRowProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col transition-colors duration-100 hover:bg-white/[0.03]',
        inset && 'mx-0',
        className,
      )}
    >
      <div className="px-5 py-3">{children}</div>
      <div className={cn('ios-separator')} aria-hidden />
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
