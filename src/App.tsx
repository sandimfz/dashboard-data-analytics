import { useEffect, useState } from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBar } from "@/components/chart-bar"
import { ChartDonut } from "@/components/chart-donut"
import { ChartLine } from "@/components/chart-line"
import { ChartScatter } from "@/components/chart-scatter"
import { SectionCards } from "@/components/section-cards"
import { ActivityFeed } from "@/components/activity-feed"
import { TopProducts } from "@/components/top-products"
import { SiteHeader } from "@/components/site-header"
import { ModernMetricCard } from "@/components/modern-metric-card"
import { TrendingCard } from "@/components/trending-card"
import { StatsSection } from "@/components/stats-section"
import { BarChart3, Users, Percent, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-background">
      <SiteHeader />
      <div className="@container/main flex flex-1 flex-col relative overflow-hidden">
        {/* Main content */}
        <div
          className="relative flex flex-col gap-5 py-5 md:gap-6 md:py-6 z-10"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.6s ease-out",
          }}
        >
          {/* Quick stats */}
          {isLoaded && (
            <div
              className="px-4 lg:px-6"
              style={{
                animation: "slideUpFade 0.7s ease-out 0.1s forwards",
              }}
            >
              <StatsSection />
            </div>
          )}

          {/* Premium metric cards */}
          <div
            className="px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.15s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModernMetricCard
                title="Total Revenue"
                value="$124,850"
                change="+12.5%"
                changePositive
                icon={<BarChart3 className="w-5 h-5" />}
                color="blue"
              />
              <ModernMetricCard
                title="Active Users"
                value="8,432"
                change="+8.2%"
                changePositive
                icon={<Users className="w-5 h-5" />}
                color="green"
              />
              <ModernMetricCard
                title="Conversion Rate"
                value="3.24%"
                change="-0.5%"
                changePositive={false}
                icon={<Percent className="w-5 h-5" />}
                color="orange"
              />
              <ModernMetricCard
                title="Avg. Session"
                value="4m 32s"
                change="+2.1%"
                changePositive
                icon={<Clock className="w-5 h-5" />}
                color="purple"
              />
            </div>
          </div>

          {/* Main chart — full width */}
          <div
            className="px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.25s forwards" : "none",
              opacity: 0,
            }}
          >
            <Card className="border-border/50 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Overview</h3>
              <ChartAreaInteractive />
            </Card>
          </div>

          {/* Second row: bar chart + trending */}
          <div
            className="grid grid-cols-1 gap-5 px-4 lg:px-6 @3xl/main:grid-cols-5"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.35s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="@3xl/main:col-span-3">
              <Card className="border-border/50 bg-card p-6 h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4">Sales by Category</h3>
                <ChartBar />
              </Card>
            </div>
            <div className="@3xl/main:col-span-2">
              <Card className="border-border/50 bg-card p-6 h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4">Market Share</h3>
                <ChartDonut />
              </Card>
            </div>
          </div>

          {/* Additional charts */}
          <div
            className="grid grid-cols-1 gap-5 px-4 lg:px-6 @3xl/main:grid-cols-2"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.45s forwards" : "none",
              opacity: 0,
            }}
          >
            <Card className="border-border/50 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Trends</h3>
              <ChartLine />
            </Card>
            <Card className="border-border/50 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Distribution</h3>
              <ChartScatter />
            </Card>
          </div>

          {/* Trending insights */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.55s forwards" : "none",
              opacity: 0,
            }}
          >
            <TrendingCard
              title="Peak Traffic Hour"
              value="2:45 PM"
              subtitle="Tuesday"
              metric="2.3K visitors"
              trend="↑ 23%"
              trendPositive
            />
            <TrendingCard
              title="Top Source"
              value="Organic Search"
              subtitle="Direct traffic"
              metric="42% of total"
              trend="↑ 8%"
              trendPositive
            />
            <TrendingCard
              title="User Retention"
              value="76.4%"
              subtitle="This month"
              metric="↑ from 71%"
              trend="↑ 5.4%"
              trendPositive
            />
          </div>

          {/* Third row: top products + activity feed */}
          <div
            className="grid grid-cols-1 gap-5 px-4 pb-6 lg:px-6 @3xl/main:grid-cols-2"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.65s forwards" : "none",
              opacity: 0,
            }}
          >
            <Card className="border-border/50 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
              <TopProducts />
            </Card>
            <Card className="border-border/50 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Activity Feed</h3>
              <ActivityFeed />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
