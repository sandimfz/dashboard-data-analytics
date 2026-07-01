import { API_BASE_URL } from '@/lib/constants'

export interface Location {
  id: number
  name: string
  address: string | null
  is_active: boolean
}

export interface LocationDetail extends Location {
  external_id: number
  latitude: string | null
  longitude: string | null
  last_synced_at: string
}

export async function fetchLocations(): Promise<Location[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/ticket/locations`)
  if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`)
  return res.json()
}

export async function fetchLocationById(id: number): Promise<LocationDetail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/ticket/locations/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch location: ${res.status}`)
  return res.json()
}

export interface TicketsParams {
  locationId?: number
  siteId?: number
  status?: string
  page?: number
  pageSize?: number
}

export interface TicketItem {
  id: number
  ticket_number: string
  title: string
  status: string
  priority: string
  created_at: string
  resolved_at: string | null
  sla_result_fulltime: string | null
  sla_result_operational: string | null
  sla_deadline_fulltime: string | null
  sla_deadline_operational: string | null
  site_name: string
  location_name: string
  assigned_engineer_id: number | null
  assigned_spv_id: number | null
}

export interface PaginatedTickets {
  items: TicketItem[]
  total: number
  page: number
  pageSize: number
}

export async function fetchTickets(params: TicketsParams = {}): Promise<PaginatedTickets> {
  const url = new URL(`${API_BASE_URL}/api/v1/ticket/tickets`)
  if (params.locationId) url.searchParams.set('locationId', String(params.locationId))
  if (params.siteId) url.searchParams.set('siteId', String(params.siteId))
  if (params.status) url.searchParams.set('status', params.status)
  url.searchParams.set('page', String(params.page ?? 1))
  url.searchParams.set('pageSize', String(params.pageSize ?? 20))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`)
  return res.json()
}
