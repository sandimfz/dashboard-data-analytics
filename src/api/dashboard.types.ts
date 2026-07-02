// ============================================================
// Dashboard Admin Types
// ============================================================

export interface DashboardTicketStats {
  total: number
  new: number
  inProgress: number
  done: number
  closed: number
}

export interface DashboardCurrentSnapshot {
  backlog: number
  pendingAssignment: number
  pendingReview: number
  inRevision: number
  highPriority: number
  slaBreached: number
  slaAtRisk: number
  slaAtRiskWindowHours: number
}

export interface DashboardPeriodActivity {
  created: number
  closed: number
}

export interface DashboardStatusBreakdown {
  [status: string]: number
}

export interface DashboardPriorityItem {
  priority: string
  count: number
}

export interface DashboardSourceItem {
  source: string
  count: number
}

export interface DashboardSlaPerformance {
  total: number
  assessed: number
  onTime: number
  late: number
  unassessed: number
  percentage: number
}

export interface DashboardTopLocation {
  siteId: number
  siteName: string
  locationId: number
  locationName: string
  ticketCount: number
}

export interface DashboardTrendItem {
  date: string
  created: number
  closed: number
}

export interface DashboardEngineerPerformance {
  engineerId: number
  engineerName: string
  ticketsAssigned: number
  ticketsCompleted: number
  avgWorkTimeSeconds: number
  avgWorkTimeHours: number
}

export interface DashboardSpvPerformance {
  spvId: number
  spvName: string
  ticketsAssigned: number
  ticketsCompleted: number
  completionRate: number
}

export interface DashboardRecentTicket {
  id: number
  ticketNumber: string
  title: string
  status: string
  priority: string
  createdAt: string
  site: { id: number; name: string; location: { id: number; name: string } }
  location: { id: number; name: string }
}

export interface DashboardActiveTicket {
  id: number
  ticketNumber: string
  title: string
  status: string
  priority: string
  createdAt: string
  slaDeadlineOperational: string | null
  ageHours: number
  hoursToSla: number
  slaState: 'normal' | 'at_risk' | 'breached' | 'none'
  assignedSpvName: string | null
  assignedEngineerName: string | null
  site: { id: number; name: string; location: { id: number; name: string } }
  location: { id: number; name: string }
}

export interface DashboardSlaByKey {
  key: string
  late: number
  onTime: number
  total: number
  compliance: number
  lateRate: number
}

export interface DashboardTopLateSite {
  siteId: number
  siteName: string
  locationId: number
  locationName: string
  closed: number
  late: number
  lateRate: number
}

export interface DashboardMonitoringSummary {
  reports: number
  lateReports: number
  abnormalVideotron: number
  offlineNetwork: number
}

export interface DashboardMonitoringTroubleLocation {
  locationId: number
  locationName: string
  reports: number
  abnormalVideotron: number
  troubleRate: number
}

export interface DashboardSystemStats {
  totalUsers: number
  activeUsers: number
  engineers: number
  spvs: number
  staff: number
  totalSites: number
  activeSites: number
}

export interface DashboardSparepartStats {
  pendingRequests: number
}

export interface DashboardAdminData {
  tickets: DashboardTicketStats
  currentSnapshot: DashboardCurrentSnapshot
  periodActivity: DashboardPeriodActivity
  statusBreakdown: DashboardStatusBreakdown
  priorityDistribution: DashboardPriorityItem[]
  sourceDistribution: DashboardSourceItem[]
  slaPerformance: DashboardSlaPerformance
  topLocations: DashboardTopLocation[]
  trendData: DashboardTrendItem[]
  engineerPerformance: DashboardEngineerPerformance[]
  spvPerformance: DashboardSpvPerformance[]
  recentTickets: DashboardRecentTicket[]
  activeTickets: DashboardActiveTicket[]
  slaByPriority: DashboardSlaByKey[]
  slaBySource: DashboardSlaByKey[]
  topLateSites: DashboardTopLateSite[]
  monitoringSummary: DashboardMonitoringSummary
  monitoringTroubleLocations: DashboardMonitoringTroubleLocation[]
  systemStats: DashboardSystemStats
  sparepart: DashboardSparepartStats
}
