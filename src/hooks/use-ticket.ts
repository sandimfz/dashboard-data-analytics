import { useQuery } from '@tanstack/react-query'
import { fetchLocations, fetchLocationById, fetchTickets, type TicketsParams } from '@/api/ticket.api'

export const ticketKeys = {
  all: ['ticket'] as const,
  locations: () => [...ticketKeys.all, 'locations'] as const,
  location: (id: number) => [...ticketKeys.all, 'location', id] as const,
  tickets: (params: TicketsParams) => [...ticketKeys.all, 'tickets', params] as const,
}

export function useLocations() {
  return useQuery({
    queryKey: ticketKeys.locations(),
    queryFn: fetchLocations,
    staleTime: 60 * 60 * 1000,
  })
}

export function useLocation(id: number) {
  return useQuery({
    queryKey: ticketKeys.location(id),
    queryFn: () => fetchLocationById(id),
    staleTime: 60 * 60 * 1000,
    placeholderData: (prev) => prev,
  })
}

export function useTickets(params: TicketsParams = {}) {
  return useQuery({
    queryKey: ticketKeys.tickets(params),
    queryFn: () => fetchTickets(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev, // data lama tetap tampil saat ganti halaman/filter
  })
}
