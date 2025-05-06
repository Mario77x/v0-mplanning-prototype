"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data - in a real app, this would come from a database
const data = [
  { name: "Social Media", value: 35, color: "#8884d8" },
  { name: "Display", value: 25, color: "#82ca9d" },
  { name: "Search", value: 20, color: "#ffc658" },
  { name: "TV", value: 15, color: "#ff8042" },
  { name: "Other", value: 5, color: "#0088fe" },
]

export default function ChannelDistributionChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
