interface ChartWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function ChartWrapper({ children, title, subtitle }: ChartWrapperProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {(title || subtitle) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  )
}
