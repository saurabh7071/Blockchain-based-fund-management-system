"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    month: "Jan",
    donations: 1200000,
    expenses: 900000,
  },
  {
    month: "Feb",
    donations: 1800000,
    expenses: 1100000,
  },
  {
    month: "Mar",
    donations: 2200000,
    expenses: 1300000,
  },
  {
    month: "Apr",
    donations: 2000000,
    expenses: 1200000,
  },
  {
    month: "May",
    donations: 2700000,
    expenses: 1500000,
  },
  {
    month: "Jun",
    donations: 3200000,
    expenses: 1800000,
  },
]

export function Overview() {
  return (
    <ChartContainer
      data={data}
      className="aspect-[4/3] sm:aspect-[2/1] w-full"
      render={({ formatter }) => (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatter} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent
                        content={[
                          {
                            label: "Donations",
                            value: formatter((payload[0]?.value as number) || 0),
                            color: "#4f46e5", // indigo
                          },
                          {
                            label: "Expenses",
                            value: formatter((payload[1]?.value as number) || 0),
                            color: "#3b82f6", // blue
                          },
                        ]}
                      />
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="donations"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "#4f46e5" }, // indigo
              }}
              style={{
                stroke: "#4f46e5", // indigo
              }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: "#3b82f6" }, // blue
              }}
              style={{
                stroke: "#3b82f6", // blue
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    />
  )
}
