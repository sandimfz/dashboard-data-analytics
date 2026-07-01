import { useQuery } from '@tanstack/react-query'
import { fetchDashboardAdmin, type DashboardParams } from '@/api/dashboard.api'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  admin: (params: DashboardParams) => [...dashboardKeys.all, 'admin', params] as const,
}

export function useDashboardAdmin(params: DashboardParams) {
  return useQuery({
    queryKey: dashboardKeys.admin(params),
    queryFn: () => fetchDashboardAdmin(params),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    placeholderData: (prev) => prev, // tampilkan data lama saat fetching baru — tidak ada "dug"
  })
}
