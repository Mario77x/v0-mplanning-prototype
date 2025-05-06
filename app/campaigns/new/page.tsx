"use client"

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
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Zap } from "lucide-react"
import type { Campaign } from "@/lib/local-storage"

const channels = [
  "Social Media",
  "Display",
  "Search",
  "TV",
  "Radio",
  "OOH",
  "Email",
  "Influencer",
  "Podcast",
  "Content Marketing",
]

export default function NewCampaignPage() {
  const router = useRouter()
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    objective: "",
    description: "",
    budget: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels((prev) => (prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    try {
      // Get existing campaigns from localStorage
      const campaignsJson = localStorage.getItem("campaigns")
      const campaigns: Campaign[] = campaignsJson ? JSON.parse(campaignsJson) : []

      // Generate a new ID
      const newId = `CAM-${String(campaigns.length + 1).padStart(3, "0")}`

      // Create new campaign object
      const newCampaign: Campaign = {
        id: newId,
        name: formData.name,
        objective: formData.objective || undefined,
        budget: formData.budget ? `€${formData.budget}` : undefined,
        status: "Draft",
        description: formData.description || undefined,
        channels: selectedChannels,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add to campaigns array
      campaigns.push(newCampaign)

      // Save back to localStorage
      localStorage.setItem("campaigns", JSON.stringify(campaigns))

      // Show success message
      alert("Campaign created successfully!")

      // Redirect to campaigns page
      router.push("/campaigns")
    } catch (error) {
      console.error("Error creating campaign:", error)
      alert("There was an error creating your campaign. Please try again.")
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
          </div>

          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <Button variant="outline" asChild className="w-full md:w-auto">
              <Link href="/campaigns/new">Manual Setup</Link>
            </Button>
            <Button variant="outline" asChild className="w-full md:w-auto">
              <Link href="/ai-planner">
                <Zap className="mr-2 h-4 w-4" /> AI-Assisted Setup
              </Link>
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Enter the basic information about your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter campaign name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objective">Campaign Objective</Label>
                  <Select onValueChange={(value) => handleSelectChange("objective", value)}>
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
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">€</span>
                    <Input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="Enter budget amount"
                      type="number"
                      className="pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Campaign Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a description of your campaign"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Channels</Label>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {channels.map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <Checkbox
                          id={`channel-${channel}`}
                          checked={selectedChannels.includes(channel)}
                          onCheckedChange={() => handleChannelToggle(channel)}
                        />
                        <Label htmlFor={`channel-${channel}`} className="cursor-pointer">
                          {channel}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Create Campaign</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
