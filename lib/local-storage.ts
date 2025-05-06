// Type definitions for our data
export interface Campaign {
  id: string
  name: string
  objective?: string
  startDate?: string
  endDate?: string
  budget?: string
  status: "Draft" | "Planning" | "Active" | "Completed"
  description?: string
  channels: string[]
  reach?: string
  engagement?: string
  kpis?: string
  createdAt: string
  updatedAt: string
}

// Initialize local storage with sample data if empty
export function initializeLocalStorage() {
  if (typeof window === "undefined") return

  try {
    // Check if campaigns exist in local storage
    const campaigns = localStorage.getItem("campaigns")

    if (!campaigns) {
      // Sample data
      const sampleCampaigns: Campaign[] = [
        {
          id: "CAM-001",
          name: "Q4 Holiday Promotion",
          startDate: "2025-11-15",
          endDate: "2025-12-31",
          budget: "€450,000",
          status: "Active",
          channels: ["Social Media", "Display", "Email", "Search"],
          reach: "2.5M",
          engagement: "4.2%",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "CAM-002",
          name: "Summer Product Launch",
          startDate: "2025-06-01",
          endDate: "2025-08-15",
          budget: "€320,000",
          status: "Planning",
          channels: ["TV", "OOH", "Social Media", "Influencer"],
          reach: "1.8M",
          engagement: "3.7%",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "CAM-003",
          name: "Brand Awareness Campaign",
          startDate: "2025-09-01",
          endDate: "2025-10-31",
          budget: "€275,000",
          status: "Draft",
          channels: ["TV", "Radio", "Podcast", "Display"],
          reach: "3.2M",
          engagement: "2.9%",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]

      localStorage.setItem("campaigns", JSON.stringify(sampleCampaigns))
    }
  } catch (error) {
    console.error("Error initializing localStorage:", error)
  }
}

// Get all campaigns
export function getCampaigns(): Campaign[] {
  if (typeof window === "undefined") return []

  try {
    const campaigns = localStorage.getItem("campaigns")
    return campaigns ? JSON.parse(campaigns) : []
  } catch (error) {
    console.error("Error getting campaigns from localStorage:", error)
    return []
  }
}

// Get a single campaign by ID
export function getCampaign(id: string): Campaign | null {
  if (typeof window === "undefined") return null

  try {
    const campaigns = getCampaigns()
    return campaigns.find((campaign) => campaign.id === id) || null
  } catch (error) {
    console.error("Error getting campaign from localStorage:", error)
    return null
  }
}

// Create a new campaign
export function createCampaign(campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">): Campaign {
  if (typeof window === "undefined") throw new Error("Cannot access localStorage on server")

  try {
    const campaigns = getCampaigns()

    // Generate a new ID
    const newId = `CAM-${String(campaigns.length + 1).padStart(3, "0")}`

    const newCampaign: Campaign = {
      ...campaign,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    campaigns.push(newCampaign)
    localStorage.setItem("campaigns", JSON.stringify(campaigns))

    return newCampaign
  } catch (error) {
    console.error("Error creating campaign in localStorage:", error)
    throw error
  }
}

// Delete a campaign
export function deleteCampaign(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    // Get current campaigns
    const campaignsJson = localStorage.getItem("campaigns")
    if (!campaignsJson) return false

    const campaigns: Campaign[] = JSON.parse(campaignsJson)

    // Find the campaign to delete
    const initialLength = campaigns.length
    const filteredCampaigns = campaigns.filter((campaign) => campaign.id !== id)

    // If no campaign was removed, return false
    if (filteredCampaigns.length === initialLength) return false

    // Save the updated campaigns list
    localStorage.setItem("campaigns", JSON.stringify(filteredCampaigns))

    return true
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return false
  }
}

// Update an existing campaign
export function updateCampaign(id: string, campaignData: Partial<Campaign>): Campaign | null {
  if (typeof window === "undefined") throw new Error("Cannot access localStorage on server")

  try {
    const campaigns = getCampaigns()
    const index = campaigns.findIndex((campaign) => campaign.id === id)

    if (index === -1) return null

    const updatedCampaign = {
      ...campaigns[index],
      ...campaignData,
      updatedAt: new Date().toISOString(),
    }

    campaigns[index] = updatedCampaign
    localStorage.setItem("campaigns", JSON.stringify(campaigns))

    return updatedCampaign
  } catch (error) {
    console.error("Error updating campaign in localStorage:", error)
    return null
  }
}
