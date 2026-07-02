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
      {/* bg-background covers light mode; dark:bg-[#060608] overrides for dark */}
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background dark:bg-[#060608]">

        {/* Ambient blobs — only visible in dark mode behind glass panels */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block">
          {/* Top-left — blue */}
          <div
            className="absolute -left-48 -top-48 size-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #1a4aff 0%, #0a84ff 40%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Top-right — purple */}
          <div
            className="absolute -right-32 -top-32 size-[500px] rounded-full opacity-[0.14]"
            style={{
              background: 'radial-gradient(circle, #bf5af2 0%, #7b2ff7 50%, transparent 70%)',
              filter: 'blur(110px)',
            }}
          />
          {/* Centre — blue/green very subtle */}
          <div
            className="absolute left-1/2 top-1/3 size-[700px] -translate-x-1/2 rounded-full opacity-[0.06]"
            style={{
              background: 'radial-gradient(circle, #0a84ff 0%, #30d158 60%, transparent 80%)',
              filter: 'blur(140px)',
            }}
          />
          {/* Bottom-right — green */}
          <div
            className="absolute -bottom-48 -right-24 size-[480px] rounded-full opacity-[0.12]"
            style={{
              background: 'radial-gradient(circle, #30d158 0%, #00b894 50%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Bottom-left — orange */}
          <div
            className="absolute -bottom-32 left-1/4 size-[360px] rounded-full opacity-[0.09]"
            style={{
              background: 'radial-gradient(circle, #ff9f0a 0%, #ff6b00 50%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
        </div>

        {/* App chrome */}
        <div className="relative z-10 flex min-h-screen flex-col">
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

      </div>
    </BrowserRouter>
  )
}
