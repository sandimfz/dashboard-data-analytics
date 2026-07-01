import { format, startOfMonth, startOfYear, subMonths, subDays } from 'date-fns'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import * as React from 'react'

interface Props {
  startDate: string
  endDate: string
  onStartDateChange: (v: string) => void
  onEndDateChange: (v: string) => void
}

const today = () => new Date()
const fmt = (d: Date) => format(d, 'yyyy-MM-dd')

const PRESETS = [
  {
    label: 'Hari ini',
    get: () => ({ start: fmt(today()), end: fmt(today()) }),
  },
  {
    label: '7 hari terakhir',
    get: () => ({ start: fmt(subDays(today(), 6)), end: fmt(today()) }),
  },
  {
    label: '30 hari terakhir',
    get: () => ({ start: fmt(subDays(today(), 29)), end: fmt(today()) }),
  },
  {
    label: 'Bulan ini',
    get: () => ({ start: fmt(startOfMonth(today())), end: fmt(today()) }),
  },
  {
    label: 'Bulan lalu',
    get: () => {
      const last = subMonths(today(), 1)
      return { start: fmt(startOfMonth(last)), end: fmt(new Date(last.getFullYear(), last.getMonth() + 1, 0)) }
    },
  },
  {
    label: '3 bulan terakhir',
    get: () => ({ start: fmt(startOfMonth(subMonths(today(), 2))), end: fmt(today()) }),
  },
  {
    label: '6 bulan terakhir',
    get: () => ({ start: fmt(startOfMonth(subMonths(today(), 5))), end: fmt(today()) }),
  },
  {
    label: 'Tahun ini',
    get: () => ({ start: fmt(startOfYear(today())), end: fmt(today()) }),
  },
]

export function DashboardDateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange }: Props) {
  // Cari label preset yang cocok dengan range saat ini
  const activeLabel = React.useMemo(() => {
    for (const p of PRESETS) {
      const { start, end } = p.get()
      if (start === startDate && end === endDate) return p.label
    }
    return null
  }, [startDate, endDate])

  const apply = (start: string, end: string) => {
    onStartDateChange(start)
    onEndDateChange(end)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Preset dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 rounded-xl border-white/[0.12] bg-white/[0.07] text-xs font-normal text-white/80 backdrop-blur-sm hover:bg-white/[0.12] hover:text-white"
          >
            <CalendarIcon className="size-3.5 text-muted-foreground" />
            {activeLabel ?? 'Periode'}
            <ChevronDownIcon className="size-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {PRESETS.map((p, i) => {
            const { start, end } = p.get()
            const isActive = start === startDate && end === endDate
            return (
              <React.Fragment key={p.label}>
                {i === 3 && <DropdownMenuSeparator />}
                {i === 7 && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  onClick={() => apply(start, end)}
                  className={isActive ? 'font-medium text-primary' : ''}
                >
                  {p.label}
                </DropdownMenuItem>
              </React.Fragment>
            )
          })}
          <DropdownMenuSeparator />
          {/* Custom range hint */}
          <div className="px-2 py-1.5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 mb-1.5">Kustom</p>
            <div className="flex flex-col gap-1">
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full rounded-lg border border-white/[0.12] bg-white/[0.07] px-2 py-1 text-xs text-white outline-none backdrop-blur-sm focus:border-[#0a84ff]/60 focus:ring-1 focus:ring-[#0a84ff]/30"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full rounded-lg border border-white/[0.12] bg-white/[0.07] px-2 py-1 text-xs text-white outline-none backdrop-blur-sm focus:border-[#0a84ff]/60 focus:ring-1 focus:ring-[#0a84ff]/30"
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tampilkan range aktif */}
      <span className="hidden text-xs text-white/40 sm:block">
        {startDate} – {endDate}
      </span>
    </div>
  )
}
