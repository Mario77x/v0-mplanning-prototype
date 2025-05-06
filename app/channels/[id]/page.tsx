"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"
import { type Channel, getChannel } from "@/lib/channels-storage"

export default function ChannelDetailPage({ params }: { params: { id: string } }) {
  const [channel, setChannel] = useState<Channel | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    const channelData = getChannel(params.id)
    setChannel(channelData)
  }, [params.id])

  const handleDeleteChannel = () => {
    if (channel) {
      if (window.confirm("Are you sure you want to delete this channel? This action cannot be undone.")) {
        // Get current channels from localStorage
        const channelsJson = localStorage.getItem("channels")
        if (!channelsJson) return

        // Parse channels
        const allChannels: Channel[] = JSON.parse(channelsJson)

        // Filter out the channel to delete
        const updatedChannels = allChannels.filter((c) => c.id !== channel.id)

        // Save back to localStorage
        localStorage.setItem("channels", JSON.stringify(updatedChannels))

        // Show confirmation
        alert("Channel deleted successfully")

        // Redirect to channels page
        router.push("/channels")
      }
    }
  }

  if (!isClient || !channel) {
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
                <Link className="text-sm font-medium underline underline-offset-4" href="/channels">
                  Channels
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/reports">
                  Reports
                </Link>
              </nav>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6 flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/channels">
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to Channels
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Loading Channel...</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              <Link className="text-sm font-medium underline underline-offset-4" href="/channels">
                Channels
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/reports">
                Reports
              </Link>
            </nav>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/channels">
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to Channels
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">{channel.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/channels/${channel.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={handleDeleteChannel}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Badge
              variant={
                channel.status === "Active" ? "default" : channel.status === "Inactive" ? "outline" : "secondary"
              }
              className="text-sm"
            >
              {channel.status}
            </Badge>
            <Badge className="ml-2" variant="outline">
              {channel.type}
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Channel ID</dt>
                        <dd className="text-sm">{channel.id}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                        <dd className="text-sm">{channel.type}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                        <dd className="text-sm">{channel.status}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                        <dd className="text-sm">{channel.description || "No description provided"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Target Audience</dt>
                        <dd className="text-sm">{channel.targetAudience || "Not specified"}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost & Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Cost Per Thousand Impressions (CPM)
                        </dt>
                        <dd className="text-sm">{channel.costPerImpression || "Not specified"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Average ROI</dt>
                        <dd className="text-sm">{channel.averageROI || "Not specified"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                        <dd className="text-sm">{new Date(channel.createdAt).toLocaleDateString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                        <dd className="text-sm">{new Date(channel.updatedAt).toLocaleDateString()}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="platforms">
              <Card>
                <CardHeader>
                  <CardTitle>Platforms</CardTitle>
                  <CardDescription>List of platforms used in this channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Available Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {channel.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="px-3 py-1">
                          {platform}
                        </Badge>
                      ))}
                    </div>

                    {channel.platforms.length === 0 && (
                      <p className="text-sm text-muted-foreground">No platforms added for this channel.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Performance evaluation of this channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Reach</h3>
                      <p className="mt-2 text-2xl font-bold">{channel.metrics.reach}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Engagement</h3>
                      <p className="mt-2 text-2xl font-bold">{channel.metrics.engagement}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Conversion</h3>
                      <p className="mt-2 text-2xl font-bold">{channel.metrics.conversion}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Cost</h3>
                      <p className="mt-2 text-2xl font-bold">{channel.metrics.cost}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Detailed performance analytics and historical data will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
