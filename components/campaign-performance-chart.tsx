"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data - in a real app, this would come from a database
const data = [
  {
    name: "Q1",
    impressions: 4000000,
    clicks: 240000,
    conversions: 12000,
  },
  {
    name: "Q2",
    impressions: 3000000,
    clicks: 198000,
    conversions: 10000,
  },
  {
    name: "Q3",
    impressions: 2000000,
    clicks: 180000,
    conversions: 9800,
  },
  {
    name: "Q4",
    impressions: 5000000,
    clicks: 390000,
    conversions: 21000,
  },
]

export default function CampaignPerformanceChart() {
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
