import { cn } from '@/lib/utils'

interface GlassCardProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  action?: React.ReactNode
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  noPadding?: boolean
}

export function GlassCard({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  className,
  contentClassName,
  noPadding,
}: GlassCardProps) {
  const hasHeader = eyebrow || title || subtitle || action

  return (
    <section className={cn('analytics-panel overflow-hidden', className)}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-xs font-medium text-muted-foreground">{eyebrow}</p>
            )}
            {title && (
              <h2 className={cn('font-semibold tracking-tight text-foreground', eyebrow ? 'mt-0.5 text-sm' : 'text-sm')}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={cn(!noPadding && 'p-5', hasHeader && children && !noPadding && 'pt-4', contentClassName)}>
        {children}
      </div>
    </section>
  )
}
