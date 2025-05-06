"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight } from "lucide-react"
import { type Campaign, getCampaigns } from "@/lib/local-storage"

export default function RecentCampaignsTable() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const allCampaigns = getCampaigns()
    // Sort by created date (newest first) and take the first 4
    const sortedCampaigns = [...allCampaigns]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4)
    setCampaigns(sortedCampaigns)
  }, [])

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="overflow-auto">
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
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  {campaign.startDate && campaign.endDate ? `${campaign.startDate} to ${campaign.endDate}` : "Not set"}
                </TableCell>
                <TableCell>{campaign.budget || "Not set"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === "Active"
                        ? "default"
                        : campaign.status === "Planning"
                          ? "outline"
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
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/campaigns/${campaign.id}`}>
                      View <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No campaigns found. Create your first campaign to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
