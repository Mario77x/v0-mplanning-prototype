"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Filter, Plus, Search, Trash2 } from "lucide-react"
import { type Campaign, getCampaigns, initializeLocalStorage } from "@/lib/local-storage"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    initializeLocalStorage()
    loadCampaigns()
  }, [])

  const loadCampaigns = () => {
    const allCampaigns = getCampaigns()
    setCampaigns(allCampaigns)
  }

  const handleDeleteCampaign = (id: string) => {
    // Simple confirmation
    if (window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      // Get current campaigns from localStorage
      const campaignsJson = localStorage.getItem("campaigns")
      if (!campaignsJson) return

      // Parse campaigns
      const allCampaigns: Campaign[] = JSON.parse(campaignsJson)

      // Filter out the campaign to delete
      const updatedCampaigns = allCampaigns.filter((campaign) => campaign.id !== id)

      // Save back to localStorage
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns))

      // Update state to reflect changes
      setCampaigns(updatedCampaigns)

      // Show confirmation
      alert("Campaign deleted successfully")
    }
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  if (!isClient) {
    return null // Prevent hydration errors
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
              <p className="text-muted-foreground mt-2">Manage and monitor all your advertising campaigns</p>
            </div>
            <Button asChild>
              <Link href="/campaigns/new">
                <Plus className="mr-2 h-4 w-4" /> Create Campaign
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        {campaign.startDate && campaign.endDate
                          ? `${campaign.startDate} to ${campaign.endDate}`
                          : "Not set"}
                      </TableCell>
                      <TableCell>{campaign.budget || "Not set"}</TableCell>
                      <TableCell>
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
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {campaign.channels.slice(0, 2).map((channel) => (
                            <Badge key={channel} variant="outline" className="mr-1">
                              {channel}
                            </Badge>
                          ))}
                          {campaign.channels.length > 2 && (
                            <Badge variant="outline">+{campaign.channels.length - 2} more</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/campaigns/${campaign.id}`}>
                              View <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No campaigns found.
                      {searchTerm || statusFilter !== "all" ? (
                        <span> Try adjusting your filters.</span>
                      ) : (
                        <span> Create your first campaign to get started.</span>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
