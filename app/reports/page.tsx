import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, LineChart, PieChart } from "lucide-react"
import CampaignPerformanceChart from "@/components/campaign-performance-chart"
import ChannelDistributionChart from "@/components/channel-distribution-chart"
import ChannelPerformanceChart from "@/components/channel-performance-chart"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Link href="/">MediaPlan Pro</Link>
            </div>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
                Dashboard
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/campaigns">
                Campaigns
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/channels">
                Channels
              </Link>
              <Link className="text-sm font-medium underline underline-offset-4" href="/reports">
                Reports
              </Link>
            </nav>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
              <p className="text-muted-foreground mt-2">Analyze campaign performance and media effectiveness</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-full md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Campaign Performance</CardTitle>
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>Performance metrics across all active campaigns</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <CampaignPerformanceChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Channel Distribution</CardTitle>
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>Budget allocation by channel</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ChannelDistributionChart />
                  </CardContent>
                </Card>

                <Card className="col-span-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Channel Performance</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>Performance metrics by channel</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <ChannelPerformanceChart />
                  </CardContent>
                </Card>

                <Card className="col-span-full md:col-span-2">
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>AI-generated insights from your campaign data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-bold">•</span>
                        <div>
                          <p className="font-medium">Social Media Outperforming</p>
                          <p className="text-sm text-muted-foreground">
                            Social media channels are delivering 28% higher engagement rates compared to the industry
                            average.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-bold">•</span>
                        <div>
                          <p className="font-medium">Budget Optimization Opportunity</p>
                          <p className="text-sm text-muted-foreground">
                            Display advertising shows diminishing returns above $60K/month. Consider reallocating 15% to
                            higher-performing channels.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary font-bold">•</span>
                        <div>
                          <p className="font-medium">Audience Segment Growth</p>
                          <p className="text-sm text-muted-foreground">
                            The 25-34 urban professional segment has grown by 42% in the last quarter, suggesting
                            increased market opportunity.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ROI Summary</CardTitle>
                    <CardDescription>Return on investment by campaign type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Brand Awareness</span>
                          <span className="text-sm font-medium">2.4x</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "48%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Conversion</span>
                          <span className="text-sm font-medium">3.8x</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "76%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Retention</span>
                          <span className="text-sm font-medium">5.2x</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns">
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Analytics</CardTitle>
                    <CardDescription>Detailed performance metrics for individual campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Select a campaign from the dropdown to view detailed analytics
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="channels">
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Analytics</CardTitle>
                    <CardDescription>Detailed performance metrics for individual channels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Select a channel from the dropdown to view detailed analytics
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audience">
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Analytics</CardTitle>
                    <CardDescription>Detailed metrics on audience engagement and demographics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Select an audience segment from the dropdown to view detailed analytics
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
