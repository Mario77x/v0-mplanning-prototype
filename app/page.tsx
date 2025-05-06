"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Calendar, Layers, PieChart, Zap } from "lucide-react"
import RecentCampaignsTable from "@/components/recent-campaigns-table"
import ChannelDistributionChart from "@/components/channel-distribution-chart"
import CampaignPerformanceChart from "@/components/campaign-performance-chart"
import { initializeLocalStorage } from "@/lib/local-storage"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    initializeLocalStorage()
  }, [])

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Layers className="h-6 w-6" />
              <span className="text-xl">MediaPlan Pro</span>
            </div>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium underline underline-offset-4" href="/">
                Dashboard
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/campaigns">
                Campaigns
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/channels">
                Channels
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/reports">
                Reports
              </Link>
            </nav>
          </div>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to MediaPlan Pro</h1>
            <p className="text-muted-foreground mt-2">
              Your enterprise media planning solution for cross-channel campaign management
            </p>
          </div>
          <div className="col-span-full flex flex-col gap-4 md:flex-row md:items-center">
            <Button asChild className="w-full md:w-auto">
              <Link href="/campaigns/new">
                Create New Campaign <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full md:w-auto">
              <Link href="/ai-planner">
                <Zap className="mr-2 h-4 w-4" /> AI-Assisted Planning
              </Link>
            </Button>
          </div>
          <Card className="col-span-full md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Overview of your most recent media campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentCampaignsTable />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 campaigns</div>
              <p className="text-xs text-muted-foreground">Due in the next 7 days</p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/campaigns?filter=upcoming">View All</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-full md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Channel Distribution</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ChannelDistributionChart />
            </CardContent>
          </Card>
          <Card className="col-span-full md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaign Performance</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CampaignPerformanceChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
