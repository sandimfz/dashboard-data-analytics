import { API_BASE_URL } from '@/lib/constants'
import type { DashboardAdminData } from './dashboard.types'

export interface DashboardParams {
  startDate: string
  endDate: string
}

export async function fetchDashboardAdmin(params: DashboardParams): Promise<DashboardAdminData> {
  const url = new URL(`${API_BASE_URL}/api/v1/ticket/dashboard/admin`)
  url.searchParams.set('startDate', params.startDate)
  url.searchParams.set('endDate', params.endDate)

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error(`Dashboard fetch failed: ${res.status}`)
  }

  return res.json()
}
