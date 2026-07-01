import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBar } from "@/components/chart-bar"
import { ChartDonut } from "@/components/chart-donut"
import { SectionCards } from "@/components/section-cards"
import { ActivityFeed } from "@/components/activity-feed"
import { TopProducts } from "@/components/top-products"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-5 py-5 md:gap-6 md:py-6">

          {/* Metric cards */}
          <SectionCards />

          {/* Main chart — full width */}
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>

          {/* Second row: bar chart + donut */}
          <div className="grid grid-cols-1 gap-5 px-4 lg:px-6 @3xl/main:grid-cols-5">
            <div className="@3xl/main:col-span-3">
              <ChartBar />
            </div>
            <div className="@3xl/main:col-span-2">
              <ChartDonut />
            </div>
          </div>

          {/* Third row: top products + activity feed */}
          <div className="grid grid-cols-1 gap-5 px-4 pb-6 lg:px-6 @3xl/main:grid-cols-2">
            <TopProducts />
            <ActivityFeed />
          </div>

        </div>
      </div>
    </div>
  )
}
