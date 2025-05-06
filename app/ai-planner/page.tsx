"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, Loader2, MessageSquare, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AIPlanner() {
  const [loading, setLoading] = useState(false)
  const [planGenerated, setPlanGenerated] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("input")

  const handleGeneratePlan = () => {
    setLoading(true)
    setActiveTab("processing")

    // Simulate AI processing with progress updates
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setLoading(false)
        setPlanGenerated(true)
        setActiveTab("result")
      }
    }, 300)
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
              <Link href="/">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">AI Media Planner</h1>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">
              Let our AI assistant help you create an optimized media plan based on your campaign objectives, target
              audience, and budget constraints.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="input" disabled={loading}>
                Campaign Input
              </TabsTrigger>
              <TabsTrigger value="processing" disabled={!loading && !planGenerated}>
                Processing
              </TabsTrigger>
              <TabsTrigger value="result" disabled={!planGenerated}>
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>
                    Provide information about your campaign to generate an AI-optimized media plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input id="name" placeholder="Enter campaign name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objective">Primary Campaign Objective</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">Brand Awareness</SelectItem>
                        <SelectItem value="consideration">Consideration</SelectItem>
                        <SelectItem value="conversion">Conversion</SelectItem>
                        <SelectItem value="loyalty">Loyalty & Retention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Total Budget</Label>
                    <Input id="budget" placeholder="Enter budget amount" type="number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience Description</Label>
                    <Textarea
                      id="audience"
                      placeholder="Describe your target audience (demographics, interests, behaviors)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Campaign Duration (in weeks)</Label>
                    <div className="pt-2">
                      <Slider defaultValue={[8]} max={52} min={1} step={1} />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>1 week</span>
                        <span>8 weeks</span>
                        <span>52 weeks</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Channel Preferences (Optional)</Label>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["Social Media", "Display", "Search", "TV", "Radio", "OOH", "Email", "Influencer"].map(
                        (channel) => (
                          <Badge key={channel} variant="outline" className="cursor-pointer hover:bg-secondary">
                            {channel}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional">Additional Information</Label>
                    <Textarea
                      id="additional"
                      placeholder="Any other details that might help with planning (e.g., past campaign performance, competitor activity)"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleGeneratePlan}>
                      <Zap className="mr-2 h-4 w-4" /> Generate Media Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="processing">
              <Card>
                <CardHeader>
                  <CardTitle>Generating Your Media Plan</CardTitle>
                  <CardDescription>
                    Our AI is analyzing your inputs and creating an optimized media plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-10">
                    {loading ? (
                      <>
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Processing</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                          Our AI agent is analyzing your campaign requirements and optimizing channel allocation for
                          maximum impact
                        </p>
                        <div className="w-full max-w-md">
                          <Progress value={progress} className="h-2" />
                          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                            <span>Analyzing data</span>
                            <span>{progress}%</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">Plan Generated!</h3>
                        <p className="text-muted-foreground mt-2">Your AI-optimized media plan is ready to view</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="result">
              <Card>
                <CardHeader>
                  <CardTitle>Your AI-Generated Media Plan</CardTitle>
                  <CardDescription>Review and customize your optimized media plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-semibold mb-2">Campaign Summary</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        8-week brand awareness campaign targeting urban professionals aged 25-45
                      </p>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-sm">Total Budget</h4>
                          <p className="text-2xl font-bold">€250,000</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Estimated Reach</h4>
                          <p className="text-2xl font-bold">3.2M</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Channel Allocation</h3>
                      <div className="space-y-4">
                        {[
                          { channel: "Social Media", percentage: 35, budget: "€87,500" },
                          { channel: "Display Advertising", percentage: 25, budget: "€62,500" },
                          { channel: "Connected TV", percentage: 20, budget: "€50,000" },
                          { channel: "Influencer Marketing", percentage: 15, budget: "€37,500" },
                          { channel: "Podcast Advertising", percentage: 5, budget: "€12,500" },
                        ].map((item) => (
                          <div key={item.channel} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{item.channel}</span>
                                <span className="text-sm">{item.percentage}%</span>
                              </div>
                              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <span className="font-medium">{item.budget}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Focus on Instagram and TikTok for social media to maximize engagement with your target
                            demographic
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Allocate 60% of budget to weekday placements when your audience is most active</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Consider increasing Connected TV budget by 5% based on recent performance data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Partner with 3-5 mid-tier influencers rather than a single celebrity for better ROI
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ask AI for Adjustments
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline">Edit Plan</Button>
                        <Button>Save Campaign</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
