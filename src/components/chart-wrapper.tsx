import { motion } from "framer-motion"

interface ChartWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function ChartWrapper({ children, title, subtitle }: ChartWrapperProps) {
  return (
    <motion.div
      className="w-full h-full flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {(title || subtitle) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </motion.div>
  )
}
