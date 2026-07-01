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

// Solid-glass: dark enough to read, slight transparency + blur
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
    <section className={cn('overflow-hidden', className)} style={CARD_STYLE}>
      {hasHeader && (
        <div
          className="flex items-start justify-between gap-4 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }}
        >
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={cn(
                'font-semibold tracking-tight text-white',
                eyebrow ? 'mt-0.5 text-sm' : 'text-sm',
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-white/40">{subtitle}</p>
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
