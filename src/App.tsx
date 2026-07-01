import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SiteHeader } from '@/components/site-header'
import TicketDashboardPage from '@/pages/ticket/TicketDashboardPage'
import LocationLayout from '@/pages/ticket/location/LocationLayout'
import LocationOverviewTab from '@/pages/ticket/location/LocationOverviewTab'
import LocationSpesifikasiTab from '@/pages/ticket/location/LocationSpesifikasiTab'
import LocationSlaTab from '@/pages/ticket/location/LocationSlaTab'
import LocationTiketTab from '@/pages/ticket/location/LocationTiketTab'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="@container/main flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/ticket/dashboard" replace />} />
            <Route path="/ticket/dashboard" element={<TicketDashboardPage />} />
            <Route path="/ticket/lokasi/:locationId" element={<LocationLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<LocationOverviewTab />} />
              <Route path="spesifikasi" element={<LocationSpesifikasiTab />} />
              <Route path="sla" element={<LocationSlaTab />} />
              <Route path="tiket" element={<LocationTiketTab />} />
            </Route>
            <Route path="*" element={<Navigate to="/ticket/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
