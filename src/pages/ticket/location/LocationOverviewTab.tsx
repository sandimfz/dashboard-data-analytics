import { useParams } from 'react-router-dom'
import { format, startOfMonth } from 'date-fns'
import { TicketIcon, AlertTriangleIcon, ActivityIcon, CheckCircleIcon, UsersIcon } from 'lucide-react'
import { useDashboardAdmin } from '@/hooks/use-dashboard'
import { DashboardMetricCard } from '@/components/dashboard-metric-card'
import { DashboardTrendChart } from '@/components/dashboard-trend-chart'
import { DashboardSlaChart } from '@/components/dashboard-sla-chart'
import { DashboardSlaDetail } from '@/components/dashboard-sla-detail'
import { DashboardPendingTable } from '@/components/dashboard-pending-table'
import { DashboardDateRangePicker } from '@/components/dashboard-date-range-picker'
import { Skeleton } from '@/components/ui/skeleton'
import * as React from 'react'

export default function LocationOverviewTab() {
  const { locationId } = useParams<{ locationId: string }>()
  const id = Number(locationId)

  const today = new Date()
  const [startDate, setStartDate] = React.useState(format(startOfMonth(today), 'yyyy-MM-dd'))
  const [endDate, setEndDate] = React.useState(format(today, 'yyyy-MM-dd'))

  const { data, isLoading } = useDashboardAdmin({ startDate, endDate })

  const sk = (h: string) => <Skeleton className={`${h} rounded-2xl`} />

  // Filter semua data khusus lokasi ini
  const locationTopEntry = React.useMemo(() =>
    data?.topLocations.find((l) => l.locationId === id), [data, id])

  const activeTickets = React.useMemo(() =>
    data?.activeTickets.filter((t) => t.location?.id === id) ?? [], [data, id])

  const topLateSites = React.useMemo(() =>
    data?.topLateSites.filter((s) => s.locationId === id) ?? [], [data, id])

  const slaPerf = data?.slaPerformance
  const slaByPriority = data?.slaByPriority ?? []
  const slaBySource = data?.slaBySource ?? []
  const trendData = data?.trendData ?? []

  return (
    <div className="flex flex-col gap-5">

      {/* Date range */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Data periode untuk lokasi ini</p>
        <DashboardDateRangePicker
          startDate={startDate} endDate={endDate}
          onStartDateChange={setStartDate} onEndDateChange={setEndDate}
        />
      </div>

      {/* 6 Metric cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)
          : data && (
            <>
              <DashboardMetricCard
                title={`Tiket Baru (${new Date(startDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })})`}
                value={locationTopEntry?.ticketCount ?? 0}
                icon={<TicketIcon className="w-5 h-5" />}
                color="blue"
                sub="total di lokasi ini"
              />
              <DashboardMetricCard
                title="Tiket Aktif"
                value={activeTickets.length}
                icon={<ActivityIcon className="w-5 h-5" />}
                color="orange"
                sub={`${activeTickets.filter(t => ['high', 'critical'].includes(t.priority)).length} prioritas tinggi`}
              />
              <DashboardMetricCard
                title="Belum Ditugaskan"
                value={activeTickets.filter(t => t.status === 'new').length}
                icon={<UsersIcon className="w-5 h-5" />}
                color="purple"
                sub={`${activeTickets.filter(t => t.status === 'done').length} perlu peninjauan`}
              />
              <DashboardMetricCard
                title="Lewat SLA"
                value={activeTickets.filter(t => t.slaState === 'breached').length}
                icon={<AlertTriangleIcon className="w-5 h-5" />}
                color="red"
                sub={`${activeTickets.filter(t => t.slaState === 'at_risk').length} hampir lewat`}
              />
              <DashboardMetricCard
                title="SLA Tepat Waktu"
                value={slaPerf ? `${slaPerf.percentage}%` : '—'}
                icon={<CheckCircleIcon className="w-5 h-5" />}
                color="green"
                sub={`${slaPerf?.late ?? 0} terlambat`}
              />
            </>
          )}
      </div>

      {/* Perlu ditindaklanjuti */}
      {isLoading
        ? sk('h-40')
        : activeTickets.length > 0
          ? <DashboardPendingTable tickets={activeTickets} />
          : (
            <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-border/60 text-sm text-muted-foreground">
              Tidak ada tiket aktif di lokasi ini
            </div>
          )}

      {/* Tren */}
      {isLoading ? sk('h-56') : data && <DashboardTrendChart data={trendData} />}

      {/* SLA detail per sumber + site late */}
      {isLoading ? sk('h-48') : data && (
        <DashboardSlaDetail slaBySource={slaBySource} topLateSites={topLateSites} />
      )}

      {/* SLA chart */}
      {isLoading ? sk('h-48') : slaPerf && (
        <DashboardSlaChart slaPerformance={slaPerf} slaByPriority={slaByPriority} />
      )}

    </div>
  )
}
