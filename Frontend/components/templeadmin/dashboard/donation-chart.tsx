"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

const data = [
  {
    month: "Jan",
    donations: 1200000,
  },
  {
    month: "Feb",
    donations: 1800000,
  },
  {
    month: "Mar",
    donations: 2200000,
  },
  {
    month: "Apr",
    donations: 2000000,
  },
  {
    month: "May",
    donations: 2700000,
  },
  {
    month: "Jun",
    donations: 3200000,
  },
]

export function DonationChart() {
  const [activeIndex, setActiveIndex] = useState(null)

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} axisLine={{ stroke: "#e2e8f0" }} />
          <YAxis
            tickFormatter={(value) => `₹${value / 100000}L`}
            tick={{ fill: "#94a3b8" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Donations"]}
            contentStyle={{
              backgroundColor: "white",
              borderColor: "#e2e8f0",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
          <Bar
            dataKey="donations"
            name="Donations"
            fill="#ea580c"
            radius={[4, 4, 0, 0]}
            activeBar={{ fill: "#f97316" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
