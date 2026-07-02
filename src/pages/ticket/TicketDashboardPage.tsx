import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { TicketIcon, AlertTriangleIcon, ActivityIcon, UsersIcon, CheckCircleIcon, WifiOffIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardAdmin } from '@/hooks/use-dashboard'
import { DashboardMetricCard } from '@/components/dashboard-metric-card'
import { DashboardTrendChart } from '@/components/dashboard-trend-chart'
import { DashboardStatusChart } from '@/components/dashboard-status-chart'
import { DashboardPendingTable } from '@/components/dashboard-pending-table'
import { DashboardSlaSummary } from '@/components/dashboard-sla-summary'
import { DashboardSiteMonitoringCombined } from '@/components/dashboard-site-monitoring-combined'
import { DashboardTeamPerformance } from '@/components/dashboard-team-performance'
import { DashboardCompletionType } from '@/components/dashboard-completion-type'
import { DashboardSystemStats } from '@/components/dashboard-system-stats'
import { DashboardSparepartCard } from '@/components/dashboard-sparepart-card'
import { DashboardDateRangePicker } from '@/components/dashboard-date-range-picker'
import { DashboardSourceChart } from '@/components/dashboard-source-chart'
import * as React from 'react'

const s = 'animate-in fade-in duration-300'

// Jumlah komponen di tiap kolom — dipakai untuk skeleton loading supaya
// jumlahnya selalu sinkron dengan konten asli (lihat catatan di render kolom).
// Sengaja dibuat 5 vs 4 (bukan 7 vs 2) supaya kolom kanan tidak menggantung
// kosong panjang di bawah saat kolom kiri jauh lebih tinggi.
const LEFT_COLUMN_ITEM_COUNT = 5
const RIGHT_COLUMN_ITEM_COUNT = 4

export default function TicketDashboardPage() {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)
  const [startDate, setStartDate] = React.useState(format(thirtyDaysAgo, 'yyyy-MM-dd'))
  const [endDate, setEndDate] = React.useState(format(today, 'yyyy-MM-dd'))

  const { data, isLoading } = useDashboardAdmin({ startDate, endDate })

  const sk = (h: string) => <Skeleton className={`${h} rounded-lg`} />

  // Label ringkas untuk metric card, mis. "Juni 2026" atau "Jun – Jul 2026"
  const periodLabel = React.useMemo(() => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    const sameYear = start.getFullYear() === end.getFullYear()
    if (sameMonth) {
      return format(start, 'MMMM yyyy', { locale: idLocale })
    }
    if (sameYear) {
      return `${format(start, 'MMM', { locale: idLocale })} – ${format(end, 'MMM yyyy', { locale: idLocale })}`
    }
    return `${format(start, 'MMM yyyy', { locale: idLocale })} – ${format(end, 'MMM yyyy', { locale: idLocale })}`
  }, [startDate, endDate])

  // Label lengkap (level hari) untuk subtitle header, mis. "2 Jun 2026 – 2 Jul 2026"
  // Sebelumnya subtitle header memakai string ISO mentah (startDate/endDate),
  // sehingga tampilannya tidak konsisten dengan periodLabel yang dipakai di metric card.
  const dateRangeLabel = React.useMemo(() => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${format(start, 'd MMM yyyy', { locale: idLocale })} – ${format(end, 'd MMM yyyy', { locale: idLocale })}`
  }, [startDate, endDate])

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-4 py-6 lg:px-6">

      {/* Header */}
      <div className={`flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between ${s}`}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Data Tiket
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Semua lokasi · {dateRangeLabel}
          </p>
        </div>
        <DashboardDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Metric cards — 6 compact */}
      <div
        className={`grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6 ${s}`}
        style={{ animationDelay: '60ms' }}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <React.Fragment key={i}>{sk('h-36')}</React.Fragment>)
        ) : data && (
          <>
            <DashboardMetricCard
              title={`Tiket (${periodLabel})`}
              value={data.tickets.total}
              icon={<TicketIcon />}
              sub={`${data.tickets.closed} ditutup`}
              accent="#0a84ff"
            />
            <DashboardMetricCard
              title="Tiket Aktif"
              value={data.currentSnapshot.backlog}
              icon={<ActivityIcon />}
              sub={`${data.currentSnapshot.highPriority} prioritas tinggi`}
              accent="#ff9f0a"
            />
            <DashboardMetricCard
              title="Belum Ditugaskan"
              value={data.currentSnapshot.pendingAssignment}
              icon={<UsersIcon />}
              sub={`${data.currentSnapshot.pendingReview} perlu peninjauan`}
              accent="#bf5af2"
            />
            <DashboardMetricCard
              title="Lewat SLA"
              value={data.currentSnapshot.slaBreached}
              icon={<AlertTriangleIcon />}
              sub={`${data.currentSnapshot.slaAtRisk} hampir lewat`}
              accent="#ff453a"
            />
            <DashboardMetricCard
              title="SLA Tepat Waktu"
              value={`${data.slaPerformance.percentage}%`}
              icon={<CheckCircleIcon />}
              sub={`${data.slaPerformance.late} terlambat`}
              accent="#30d158"
            />
            <DashboardMetricCard
              title="Monitoring Abnormal"
              value={data.monitoringSummary.abnormalVideotron + data.monitoringSummary.offlineNetwork}
              icon={<WifiOffIcon />}
              sub={`${data.monitoringSummary.offlineNetwork} jaringan offline`}
              accent="#ff453a"
            />
          </>
        )}
      </div>

      {/* Perlu Ditindaklanjuti — full width */}
      {isLoading ? (
        sk('h-48')
      ) : data && (
        <div className={s} style={{ animationDelay: '120ms' }}>
          <DashboardPendingTable tickets={data.activeTickets} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-3">
        {isLoading ? (
          <>
            <div className="@3xl/main:col-span-2 flex flex-col gap-6">
              {/* Disamakan dengan jumlah komponen asli di kolom kiri (5) supaya
                  skeleton tidak lompat tinggi saat konten asli selesai load. */}
              {Array.from({ length: LEFT_COLUMN_ITEM_COUNT }).map((_, i) => (
                <React.Fragment key={i}>{sk('h-64')}</React.Fragment>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {Array.from({ length: RIGHT_COLUMN_ITEM_COUNT }).map((_, i) => (
                <React.Fragment key={i}>{sk('h-48')}</React.Fragment>
              ))}
            </div>
          </>
        ) : data && (
          <>
            {/* === LEFT COLUMN (2/3) — chart-chart besar / utama === */}
            <div className="@3xl/main:col-span-2 flex flex-col gap-6">
              <DashboardTrendChart data={data.trendData} />
              <DashboardSlaSummary slaPerformance={data.slaPerformance} />
              <DashboardSiteMonitoringCombined
                topLateSites={data.topLateSites}
                monitoringTroubleLocations={data.monitoringTroubleLocations}
              />
              <DashboardStatusChart
                statusBreakdown={data.statusBreakdown}
                priorityDistribution={data.priorityDistribution}
              />
              <DashboardTeamPerformance
                engineers={data.engineerPerformance}
                spvs={data.spvPerformance}
              />
            </div>

            {/* === RIGHT SIDEBAR (1/3) === */}
            <div className="flex flex-col gap-6">
              <DashboardCompletionType sources={data.sourceDistribution} />
              <DashboardSourceChart sources={data.sourceDistribution} />
              <DashboardSystemStats stats={data.systemStats} />
              <div className="flex-1">
                <DashboardSparepartCard sparepart={data.sparepart} />
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  )
}