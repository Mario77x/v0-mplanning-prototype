"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"
import { type Campaign, getCampaign } from "@/lib/local-storage"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    const campaignData = getCampaign(params.id)
    setCampaign(campaignData)
  }, [params.id])

  const handleDeleteCampaign = () => {
    if (campaign) {
      if (window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
        // Get current campaigns from localStorage
        const campaignsJson = localStorage.getItem("campaigns")
        if (!campaignsJson) return

        // Parse campaigns
        const allCampaigns: Campaign[] = JSON.parse(campaignsJson)

        // Filter out the campaign to delete
        const updatedCampaigns = allCampaigns.filter((c) => c.id !== campaign.id)

        // Save back to localStorage
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns))

        // Show confirmation
        alert("Campaign deleted successfully")

        // Redirect to campaigns page
        router.push("/campaigns")
      }
    }
  }

  if (!isClient || !campaign) {
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
                <Link className="text-sm font-medium underline underline-offset-4" href="/campaigns">
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
          <div className="p-6">
            <div className="mb-6 flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/campaigns">
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to Campaigns
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Loading Campaign...</h1>
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
              <Link className="text-sm font-medium underline underline-offset-4" href="/campaigns">
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
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/campaigns">
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to Campaigns
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/campaigns/${campaign.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={handleDeleteCampaign}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Badge
              variant={
                campaign.status === "Active"
                  ? "default"
                  : campaign.status === "Planning"
                    ? "outline"
                    : campaign.status === "Completed"
                      ? "secondary"
                      : "secondary"
              }
              className="text-sm"
            >
              {campaign.status}
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Campaign ID</dt>
                        <dd className="text-sm">{campaign.id}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Objective</dt>
                        <dd className="text-sm">{campaign.objective || "Not specified"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Timeline</dt>
                        <dd className="text-sm">
                          {campaign.startDate && campaign.endDate
                            ? `${campaign.startDate} to ${campaign.endDate}`
                            : "Not specified"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Budget</dt>
                        <dd className="text-sm">{campaign.budget || "Not specified"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                        <dd className="text-sm">{campaign.description || "No description provided"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">KPIs</dt>
                        <dd className="text-sm">{campaign.kpis || "No KPIs specified"}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Reach</dt>
                        <dd className="text-sm">{campaign.reach || "Not available"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Engagement</dt>
                        <dd className="text-sm">{campaign.engagement || "Not available"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                        <dd className="text-sm">{new Date(campaign.createdAt).toLocaleDateString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                        <dd className="text-sm">{new Date(campaign.updatedAt).toLocaleDateString()}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="channels">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Allocation</CardTitle>
                  <CardDescription>Distribution of budget and performance across channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Selected Channels</h3>
                    <div className="flex flex-wrap gap-2">
                      {campaign.channels.map((channel) => (
                        <Badge key={channel} variant="outline">
                          {channel}
                        </Badge>
                      ))}
                    </div>

                    {campaign.channels.length === 0 && (
                      <p className="text-sm text-muted-foreground">No channels selected for this campaign.</p>
                    )}

                    <p className="text-sm text-muted-foreground mt-4">
                      Detailed channel performance metrics will be available once the campaign is active.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="audience">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Targeting</CardTitle>
                  <CardDescription>Target audience and segmentation details</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Audience targeting information will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="creative">
              <Card>
                <CardHeader>
                  <CardTitle>Creative Assets</CardTitle>
                  <CardDescription>Campaign creative assets and materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Creative assets management will be available in a future update.
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
