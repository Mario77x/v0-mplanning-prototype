"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from "lucide-react"
import type { Channel } from "@/lib/channels-storage"

// Available platforms by channel type
const platformOptions = {
  Digital: [
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "TikTok",
    "YouTube",
    "Google Display Network",
    "Programmatic",
    "Banner Ads",
    "Google Ads",
    "Bing Ads",
    "Email",
    "SMS",
    "Native Advertising",
    "Affiliate Marketing",
    "Spotify",
    "Apple Podcasts",
    "Google Podcasts",
    "Blogs",
    "Forums",
  ],
  Traditional: [
    "Broadcast TV",
    "Cable TV",
    "Connected TV",
    "Radio",
    "Newspapers",
    "Magazines",
    "Billboards",
    "Transit",
    "Street Furniture",
    "Direct Mail",
    "In-Store",
    "Events",
    "Conferences",
    "Print",
  ],
  Other: [
    "PR",
    "Partnerships",
    "Sponsorships",
    "Guerrilla Marketing",
    "Word of Mouth",
    "Trade Shows",
    "Community Events",
    "Webinars",
    "Speaking Engagements",
  ],
}

// Performance rating options
const performanceOptions = ["Very Low", "Low", "Medium", "High", "Very High"]

export default function NewChannelPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<"Digital" | "Traditional" | "Other">("Digital")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [platformInput, setPlatformInput] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    costPerImpression: "",
    averageROI: "",
    targetAudience: "",
    metrics: {
      reach: "Medium",
      engagement: "Medium",
      conversion: "Medium",
      cost: "Medium",
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMetricChange = (metric: keyof typeof formData.metrics, value: string) => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: value,
      },
    }))
  }

  const handleTypeChange = (value: "Digital" | "Traditional" | "Other") => {
    setSelectedType(value)
    setSelectedPlatforms([]) // Reset platforms when type changes
  }

  const handleAddPlatform = () => {
    if (platformInput.trim() && !selectedPlatforms.includes(platformInput.trim())) {
      setSelectedPlatforms([...selectedPlatforms, platformInput.trim()])
      setPlatformInput("")
    }
  }

  const handleSelectPlatform = (platform: string) => {
    if (!selectedPlatforms.includes(platform)) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    }
  }

  const handleRemovePlatform = (platform: string) => {
    setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    try {
      // Get existing channels from localStorage
      const channelsJson = localStorage.getItem("channels")
      const channels: Channel[] = channelsJson ? JSON.parse(channelsJson) : []

      // Generate a new ID
      const newId = `ch-${String(channels.length + 1).padStart(3, "0")}`

      // Create new channel object
      const newChannel: Channel = {
        id: newId,
        name: formData.name,
        type: selectedType,
        platforms: selectedPlatforms,
        metrics: formData.metrics,
        status: "Active",
        description: formData.description || undefined,
        costPerImpression: formData.costPerImpression ? `€${formData.costPerImpression}` : undefined,
        averageROI: formData.averageROI ? `${formData.averageROI}%` : undefined,
        targetAudience: formData.targetAudience || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add to channels array
      channels.push(newChannel)

      // Save back to localStorage
      localStorage.setItem("channels", JSON.stringify(channels))

      // Show success message
      alert("Channel created successfully!")

      // Redirect to channels page
      router.push("/channels")
    } catch (error) {
      console.error("Error creating channel:", error)
      alert("There was an error creating your channel. Please try again.")
    }
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
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/channels">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Channels
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Create New Channel</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Channel Details</CardTitle>
                <CardDescription>Enter the basic information about your advertising channel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Channel Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter channel name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Channel Type</Label>
                  <Select
                    value={selectedType}
                    onValueChange={(value: "Digital" | "Traditional" | "Other") => handleTypeChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Digital">Digital</SelectItem>
                      <SelectItem value="Traditional">Traditional</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      value={platformInput}
                      onChange={(e) => setPlatformInput(e.target.value)}
                      placeholder="Enter a platform name"
                    />
                    <Button type="button" onClick={handleAddPlatform} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedPlatforms.map((platform) => (
                      <Badge key={platform} className="pl-2 pr-1 py-1">
                        {platform}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 ml-1"
                          onClick={() => handleRemovePlatform(platform)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Common platforms for {selectedType}:</p>
                    <div className="flex flex-wrap gap-1">
                      {platformOptions[selectedType].slice(0, 10).map((platform) => (
                        <Button
                          key={platform}
                          type="button"
                          variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                          size="sm"
                          className="mb-1"
                          onClick={() => handleSelectPlatform(platform)}
                        >
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Channel Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a description of this channel"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="costPerImpression">Cost Per Thousand Impressions (CPM)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">€</span>
                      <Input
                        id="costPerImpression"
                        name="costPerImpression"
                        value={formData.costPerImpression}
                        onChange={handleInputChange}
                        placeholder="Enter cost"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="averageROI">Average ROI</Label>
                    <div className="relative">
                      <Input
                        id="averageROI"
                        name="averageROI"
                        value={formData.averageROI}
                        onChange={handleInputChange}
                        placeholder="Enter ROI"
                        className="pr-7"
                      />
                      <span className="absolute right-3 top-2.5">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Describe the target audience for this channel"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Performance Metrics</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="reach" className="text-sm">
                        Reach
                      </Label>
                      <Select
                        value={formData.metrics.reach}
                        onValueChange={(value) => handleMetricChange("reach", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select reach" />
                        </SelectTrigger>
                        <SelectContent>
                          {performanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="engagement" className="text-sm">
                        Engagement
                      </Label>
                      <Select
                        value={formData.metrics.engagement}
                        onValueChange={(value) => handleMetricChange("engagement", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select engagement" />
                        </SelectTrigger>
                        <SelectContent>
                          {performanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="conversion" className="text-sm">
                        Conversion
                      </Label>
                      <Select
                        value={formData.metrics.conversion}
                        onValueChange={(value) => handleMetricChange("conversion", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select conversion" />
                        </SelectTrigger>
                        <SelectContent>
                          {performanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cost" className="text-sm">
                        Cost
                      </Label>
                      <Select
                        value={formData.metrics.cost}
                        onValueChange={(value) => handleMetricChange("cost", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select cost" />
                        </SelectTrigger>
                        <SelectContent>
                          {performanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Create Channel</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
