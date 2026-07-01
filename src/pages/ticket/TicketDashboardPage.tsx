import { format } from 'date-fns'
import { TicketIcon, AlertTriangleIcon, ActivityIcon, UsersIcon, CheckCircleIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardAdmin } from '@/hooks/use-dashboard'
import { DashboardMetricCard } from '@/components/dashboard-metric-card'
import { DashboardTrendChart } from '@/components/dashboard-trend-chart'
import { DashboardStatusChart } from '@/components/dashboard-status-chart'
import { DashboardSlaChart } from '@/components/dashboard-sla-chart'
import { DashboardPendingTable } from '@/components/dashboard-pending-table'
import { DashboardSlaDetail, DashboardSlaBySource, DashboardSlaTopLate } from '@/components/dashboard-sla-detail'
import { DashboardSpvTable } from '@/components/dashboard-spv-table'
import { DashboardEngineerTable } from '@/components/dashboard-engineer-table'
import { DashboardSystemStats } from '@/components/dashboard-system-stats'
import { DashboardTopLocations } from '@/components/dashboard-top-locations'
import { DashboardDateRangePicker } from '@/components/dashboard-date-range-picker'
import { DashboardSourceChart } from '@/components/dashboard-source-chart'
import { DashboardPriorityChart } from '@/components/dashboard-priority-chart'
import { DashboardMonitoringChart } from '@/components/dashboard-monitoring-chart'
import { DashboardEngineerChart } from '@/components/dashboard-engineer-chart'
import { DashboardNetFlowChart } from '@/components/dashboard-net-flow-chart'
import * as React from 'react'

const s = 'animate-in fade-in duration-300'

export default function TicketDashboardPage() {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)
  const [startDate, setStartDate] = React.useState(format(thirtyDaysAgo, 'yyyy-MM-dd'))
  const [endDate, setEndDate] = React.useState(format(today, 'yyyy-MM-dd'))

  const { data, isLoading } = useDashboardAdmin({ startDate, endDate })

  const sk = (h: string) => <Skeleton className={`${h} rounded-lg`} />

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-4 py-6 lg:px-6">

      {/* Header */}
      <div className={`flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between ${s}`}>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Dashboard Tiket
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Semua lokasi · {startDate} – {endDate}
          </p>
        </div>
        <DashboardDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Metric cards */}
      <div
        className={`grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5 ${s}`}
        style={{ animationDelay: '60ms' }}
      >
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <React.Fragment key={i}>{sk('h-36')}</React.Fragment>)
        ) : data && (
          <>
            <DashboardMetricCard
              title={`Tiket Baru (${new Date(startDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })})`}
              value={data.tickets.new}
              icon={<TicketIcon />}
              sub={`Ditutup ${data.periodActivity.closed}`}
            />
            <DashboardMetricCard
              title="Tiket Aktif"
              value={data.currentSnapshot.backlog}
              icon={<ActivityIcon />}
              sub={`${data.currentSnapshot.highPriority} prioritas tinggi`}
            />
            <DashboardMetricCard
              title="Belum Ditugaskan"
              value={data.currentSnapshot.pendingAssignment}
              icon={<UsersIcon />}
              sub={`${data.currentSnapshot.pendingReview} perlu peninjauan`}
            />
            <DashboardMetricCard
              title="Lewat SLA"
              value={data.currentSnapshot.slaBreached}
              icon={<AlertTriangleIcon />}
              sub={`${data.currentSnapshot.slaAtRisk} hampir lewat`}
            />
            <DashboardMetricCard
              title="SLA Tepat Waktu"
              value={`${data.slaPerformance.percentage}%`}
              icon={<CheckCircleIcon />}
              sub={`${data.slaPerformance.late} terlambat`}
            />
          </>
        )}
      </div>

      {/* Semua card utama dalam masonry 2 kolom */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>{sk('h-64')}</React.Fragment>
          ))}
        </div>
      ) : data && (
        <div className="[column-count:1] [column-gap:1.5rem] @3xl/main:[column-count:2]">
          {/* Pending tickets — full width */}
          <div className="mb-6 break-inside-avoid [column-span:all]">
            <DashboardPendingTable tickets={data.activeTickets} />
          </div>

          {/* Trend Chart */}
          <div className="mb-6 break-inside-avoid">
            <DashboardTrendChart data={data.trendData} />
          </div>

          {/* Net Flow */}
          <div className="mb-6 break-inside-avoid">
            <DashboardNetFlowChart data={data.trendData} />
          </div>

          {/* Status */}
          <div className="mb-6 break-inside-avoid">
            <DashboardStatusChart statusBreakdown={data.statusBreakdown} priorityDistribution={data.priorityDistribution} />
          </div>

          {/* Source */}
          <div className="mb-6 break-inside-avoid">
            <DashboardSourceChart sources={data.sourceDistribution} />
          </div>

          {/* SLA Chart */}
          <div className="mb-6 break-inside-avoid">
            <DashboardSlaChart slaPerformance={data.slaPerformance} slaByPriority={data.slaByPriority} />
          </div>

          {/* Priority */}
          <div className="mb-6 break-inside-avoid">
            <DashboardPriorityChart priorities={data.priorityDistribution} />
          </div>

          {/* SLA by Source */}
          <div className="mb-6 break-inside-avoid">
            <DashboardSlaBySource slaBySource={data.slaBySource} />
          </div>

          {/* SLA Top Late Sites */}
          <div className="mb-6 break-inside-avoid">
            <DashboardSlaTopLate topLateSites={data.topLateSites} />
          </div>

          {/* Monitoring — full width */}
          <div className="mb-6 break-inside-avoid [column-span:all]">
            <DashboardMonitoringChart
              summary={data.monitoringSummary}
              troubleLocations={data.monitoringTroubleLocations}
            />
          </div>

          {/* SPV */}
          <div className="mb-6 break-inside-avoid">
            <DashboardSpvTable spvList={data.spvPerformance} />
          </div>

          {/* Engineer Table */}
          <div className="mb-6 break-inside-avoid">
            <DashboardEngineerTable engineers={data.engineerPerformance} />
          </div>

          {/* Engineer Chart */}
          <div className="mb-6 break-inside-avoid">
            <DashboardEngineerChart engineers={data.engineerPerformance} />
          </div>

          {/* System Stats */}
          <div className="mb-6 break-inside-avoid">
            <DashboardSystemStats stats={data.systemStats} />
          </div>

          {/* Top Locations — full width */}
          <div className="mb-2 break-inside-avoid [column-span:all]">
            <DashboardTopLocations locations={data.topLocations} />
          </div>
        </div>
      )}

    </div>
  )
}
