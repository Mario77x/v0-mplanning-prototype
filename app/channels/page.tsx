"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Settings, Trash2 } from "lucide-react"
import { type Channel, getChannels, initializeChannelsStorage } from "@/lib/channels-storage"

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    initializeChannelsStorage()
    loadChannels()
  }, [])

  const loadChannels = () => {
    const allChannels = getChannels()
    setChannels(allChannels)
  }

  const handleDeleteChannel = (id: string) => {
    if (window.confirm("Are you sure you want to delete this channel? This action cannot be undone.")) {
      // Get current channels from localStorage
      const channelsJson = localStorage.getItem("channels")
      if (!channelsJson) return

      // Parse channels
      const allChannels: Channel[] = JSON.parse(channelsJson)

      // Filter out the channel to delete
      const updatedChannels = allChannels.filter((channel) => channel.id !== id)

      // Save back to localStorage
      localStorage.setItem("channels", JSON.stringify(updatedChannels))

      // Update state to reflect changes
      setChannels(updatedChannels)

      // Show confirmation
      alert("Channel deleted successfully")
    }
  }

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || channel.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesType
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
              <p className="text-muted-foreground mt-2">Manage your advertising channels and platforms</p>
            </div>
            <Button asChild>
              <Link href="/channels/new">
                <Plus className="mr-2 h-4 w-4" /> Add Channel
              </Link>
            </Button>
          </div>

          <div className="mt-6 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search channels..."
              className="pl-8 w-full md:max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button
                variant={typeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("all")}
              >
                All
              </Button>
              <Button
                variant={typeFilter === "digital" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("digital")}
              >
                Digital
              </Button>
              <Button
                variant={typeFilter === "traditional" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("traditional")}
              >
                Traditional
              </Button>
              <Button
                variant={typeFilter === "other" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("other")}
              >
                Other
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => (
                <Card key={channel.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{channel.name}</CardTitle>
                      <Badge variant="outline">{channel.type}</Badge>
                    </div>
                    <CardDescription>
                      {channel.platforms.slice(0, 3).join(", ")}
                      {channel.platforms.length > 3 && ` +${channel.platforms.length - 3} more`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Reach</p>
                        <p className="font-medium">{channel.metrics.reach}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engagement</p>
                        <p className="font-medium">{channel.metrics.engagement}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversion</p>
                        <p className="font-medium">{channel.metrics.conversion}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cost</p>
                        <p className="font-medium">{channel.metrics.cost}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/channels/${channel.id}`}>
                          <Settings className="mr-2 h-4 w-4" /> View
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDeleteChannel(channel.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">
                  No channels found. {searchTerm ? "Try a different search." : "Add your first channel to get started."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
