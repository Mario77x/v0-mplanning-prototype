// Type definitions for channel data
export interface Channel {
  id: string
  name: string
  type: "Digital" | "Traditional" | "Other"
  platforms: string[]
  metrics: {
    reach: string
    engagement: string
    conversion: string
    cost: string
  }
  status: "Active" | "Inactive" | "Archived"
  description?: string
  costPerImpression?: string // Cost per thousand impressions (CPM)
  averageROI?: string
  targetAudience?: string
  createdAt: string
  updatedAt: string
}

// Initialize local storage with sample channel data if empty
export function initializeChannelsStorage() {
  if (typeof window === "undefined") return

  try {
    // Check if channels exist in local storage
    const channels = localStorage.getItem("channels")

    if (!channels) {
      // Sample data
      const sampleChannels: Channel[] = [
        {
          id: "ch-001",
          name: "Social Media",
          type: "Digital",
          platforms: ["Facebook", "Instagram", "Twitter", "LinkedIn", "TikTok"],
          metrics: {
            reach: "High",
            engagement: "High",
            conversion: "Medium",
            cost: "Medium",
          },
          status: "Active",
          description: "Social media advertising across major platforms",
          costPerImpression: "€3.50",
          averageROI: "220%",
          targetAudience: "18-45, urban professionals, students",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-002",
          name: "Display Advertising",
          type: "Digital",
          platforms: ["Google Display Network", "Programmatic", "Banner Ads"],
          metrics: {
            reach: "High",
            engagement: "Low",
            conversion: "Low",
            cost: "Medium",
          },
          status: "Active",
          description: "Visual ads displayed on websites and apps",
          costPerImpression: "€2.80",
          averageROI: "180%",
          targetAudience: "25-55, all demographics",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-003",
          name: "Search Engine Marketing",
          type: "Digital",
          platforms: ["Google Ads", "Bing Ads"],
          metrics: {
            reach: "Medium",
            engagement: "Medium",
            conversion: "High",
            cost: "High",
          },
          status: "Active",
          description: "Paid search ads on major search engines",
          costPerImpression: "€5.20",
          averageROI: "320%",
          targetAudience: "All demographics, active searchers",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-004",
          name: "Television",
          type: "Traditional",
          platforms: ["Broadcast TV", "Cable TV", "Connected TV"],
          metrics: {
            reach: "Very High",
            engagement: "Medium",
            conversion: "Low",
            cost: "Very High",
          },
          status: "Active",
          description: "TV advertising across broadcast and cable networks",
          costPerImpression: "€12.50",
          averageROI: "150%",
          targetAudience: "All demographics, varies by program",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-005",
          name: "Out-of-Home",
          type: "Traditional",
          platforms: ["Billboards", "Transit", "Street Furniture"],
          metrics: {
            reach: "High",
            engagement: "Low",
            conversion: "Very Low",
            cost: "High",
          },
          status: "Active",
          description: "Physical advertising in public spaces",
          costPerImpression: "€4.30",
          averageROI: "140%",
          targetAudience: "Urban commuters, city residents",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-006",
          name: "Email Marketing",
          type: "Digital",
          platforms: ["Newsletters", "Promotional Emails", "Drip Campaigns"],
          metrics: {
            reach: "Low",
            engagement: "Medium",
            conversion: "High",
            cost: "Low",
          },
          status: "Active",
          description: "Direct marketing through email channels",
          costPerImpression: "€0.80",
          averageROI: "380%",
          targetAudience: "Existing customers, subscribers",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-007",
          name: "Influencer Marketing",
          type: "Digital",
          platforms: ["Instagram", "YouTube", "TikTok", "Blogs"],
          metrics: {
            reach: "Medium",
            engagement: "High",
            conversion: "Medium",
            cost: "Medium",
          },
          status: "Active",
          description: "Partnering with influencers to promote products",
          costPerImpression: "€4.20",
          averageROI: "250%",
          targetAudience: "Followers of specific influencers, trend-conscious",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ch-008",
          name: "Podcast Advertising",
          type: "Digital",
          platforms: ["Spotify", "Apple Podcasts", "Google Podcasts"],
          metrics: {
            reach: "Medium",
            engagement: "High",
            conversion: "Medium",
            cost: "Medium",
          },
          status: "Active",
          description: "Audio ads and sponsorships in podcasts",
          costPerImpression: "€3.80",
          averageROI: "240%",
          targetAudience: "Podcast listeners, educated professionals",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]

      localStorage.setItem("channels", JSON.stringify(sampleChannels))
    }
  } catch (error) {
    console.error("Error initializing channels in localStorage:", error)
  }
}

// Get all channels
export function getChannels(): Channel[] {
  if (typeof window === "undefined") return []

  try {
    const channels = localStorage.getItem("channels")
    return channels ? JSON.parse(channels) : []
  } catch (error) {
    console.error("Error getting channels from localStorage:", error)
    return []
  }
}

// Get a single channel by ID
export function getChannel(id: string): Channel | null {
  if (typeof window === "undefined") return null

  try {
    const channels = getChannels()
    return channels.find((channel) => channel.id === id) || null
  } catch (error) {
    console.error("Error getting channel from localStorage:", error)
    return null
  }
}

// Create a new channel
export function createChannel(channelData: Omit<Channel, "id" | "createdAt" | "updatedAt">): Channel {
  if (typeof window === "undefined") throw new Error("Cannot access localStorage on server")

  try {
    const channels = getChannels()

    // Generate a new ID
    const newId = `ch-${String(channels.length + 1).padStart(3, "0")}`

    const newChannel: Channel = {
      ...channelData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    channels.push(newChannel)
    localStorage.setItem("channels", JSON.stringify(channels))

    return newChannel
  } catch (error) {
    console.error("Error creating channel in localStorage:", error)
    throw error
  }
}

// Update an existing channel
export function updateChannel(id: string, channelData: Partial<Channel>): Channel | null {
  if (typeof window === "undefined") throw new Error("Cannot access localStorage on server")

  try {
    const channels = getChannels()
    const index = channels.findIndex((channel) => channel.id === id)

    if (index === -1) return null

    const updatedChannel = {
      ...channels[index],
      ...channelData,
      updatedAt: new Date().toISOString(),
    }

    channels[index] = updatedChannel
    localStorage.setItem("channels", JSON.stringify(channels))

    return updatedChannel
  } catch (error) {
    console.error("Error updating channel in localStorage:", error)
    return null
  }
}

// Delete a channel
export function deleteChannel(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const channels = getChannels()
    const filteredChannels = channels.filter((channel) => channel.id !== id)

    if (filteredChannels.length === channels.length) return false

    localStorage.setItem("channels", JSON.stringify(filteredChannels))
    return true
  } catch (error) {
    console.error("Error deleting channel from localStorage:", error)
    return false
  }
}
