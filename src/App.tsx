import { useEffect, useState } from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBar } from "@/components/chart-bar"
import { ChartDonut } from "@/components/chart-donut"
import { SectionCards } from "@/components/section-cards"
import { ActivityFeed } from "@/components/activity-feed"
import { TopProducts } from "@/components/top-products"
import { SiteHeader } from "@/components/site-header"
import { ModernMetricCard } from "@/components/modern-metric-card"
import { TrendingCard } from "@/components/trending-card"
import { StatsSection } from "@/components/stats-section"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-background">
      <SiteHeader />
      <div className="@container/main flex flex-1 flex-col relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"
            style={{
              animation: "pulse 6s ease-in-out infinite",
            }}
          ></div>
          <div 
            className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ 
              animation: "pulse 6s ease-in-out 1s infinite",
            }}
          ></div>
        </div>

        {/* Main content */}
        <div
          className="relative flex flex-col gap-5 py-5 md:gap-6 md:py-6 z-10"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.6s ease-out",
          }}
        >
          {/* Header section */}
          <div
            className="px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.1s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Real-time insights and performance metrics across your platform
              </p>
            </div>
          </div>

          {/* Quick stats */}
          {isLoaded && (
            <div
              className="px-4 lg:px-6"
              style={{
                animation: "slideUpFade 0.7s ease-out 0.15s forwards",
              }}
            >
              <StatsSection />
            </div>
          )}

          {/* Premium metric cards */}
          <div
            className="px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.2s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModernMetricCard
                title="Total Revenue"
                value="$124,850"
                change="+12.5%"
                changePositive
                icon="TrendingUp"
                accentColor="from-blue-500 to-cyan-500"
              />
              <ModernMetricCard
                title="Active Users"
                value="8,432"
                change="+8.2%"
                changePositive
                icon="Users"
                accentColor="from-green-500 to-emerald-500"
              />
              <ModernMetricCard
                title="Conversion Rate"
                value="3.24%"
                change="-0.5%"
                changePositive={false}
                icon="Target"
                accentColor="from-orange-500 to-red-500"
              />
              <ModernMetricCard
                title="Avg. Session"
                value="4m 32s"
                change="+2.1%"
                changePositive
                icon="Clock"
                accentColor="from-purple-500 to-pink-500"
              />
            </div>
          </div>

          {/* Main chart — full width */}
          <div
            className="px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.3s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="glass-glow rounded-2xl p-6 border border-white/10 premium-shadow-lg">
              <ChartAreaInteractive />
            </div>
          </div>

          {/* Second row: bar chart + trending */}
          <div
            className="grid grid-cols-1 gap-5 px-4 lg:px-6 @3xl/main:grid-cols-5"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.4s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="@3xl/main:col-span-3">
              <div className="glass-glow rounded-2xl p-6 border border-white/10 premium-shadow-lg h-full">
                <ChartBar />
              </div>
            </div>
            <div className="@3xl/main:col-span-2">
              <div className="glass-glow rounded-2xl p-6 border border-white/10 premium-shadow-lg h-full">
                <ChartDonut />
              </div>
            </div>
          </div>

          {/* Trending insights */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 lg:px-6"
            style={{
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.5s forwards" : "none",
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
              animation: isLoaded ? "slideUpFade 0.7s ease-out 0.6s forwards" : "none",
              opacity: 0,
            }}
          >
            <div className="glass-glow rounded-2xl p-6 border border-white/10 premium-shadow-lg">
              <TopProducts />
            </div>
            <div className="glass-glow rounded-2xl p-6 border border-white/10 premium-shadow-lg">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
