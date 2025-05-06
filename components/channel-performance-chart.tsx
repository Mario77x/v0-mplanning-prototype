"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data - in a real app, this would come from a database
const data = [
  {
    name: "Social Media",
    impressions: 3500000,
    clicks: 210000,
    conversions: 10500,
  },
  {
    name: "Display",
    impressions: 4200000,
    clicks: 168000,
    conversions: 5040,
  },
  {
    name: "Search",
    impressions: 1200000,
    clicks: 144000,
    conversions: 8640,
  },
  {
    name: "TV",
    impressions: 5000000,
    clicks: 0,
    conversions: 7500,
  },
  {
    name: "Email",
    impressions: 800000,
    clicks: 96000,
    conversions: 9600,
  },
  {
    name: "Influencer",
    impressions: 1500000,
    clicks: 120000,
    conversions: 6000,
  },
]

export default function ChannelPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              if (name === "impressions") return `${(value / 1000000).toFixed(1)}M`
              if (name === "clicks") return `${(value / 1000).toFixed(1)}K`
              return value.toLocaleString()
            }}
          />
          <Legend />
          <Bar dataKey="impressions" fill="#8884d8" name="Impressions" />
          <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
          <Bar dataKey="conversions" fill="#ffc658" name="Conversions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
