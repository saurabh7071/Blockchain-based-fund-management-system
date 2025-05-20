"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Infrastructure", value: 40 },
  { name: "Food & Prasad", value: 25 },
  { name: "Salaries", value: 15 },
  { name: "Events", value: 10 },
  { name: "Utilities", value: 5 },
  { name: "Other", value: 5 },
]

// Religious color palette
const COLORS = [
  "#ea580c", // orange-600
  "#f97316", // orange-500
  "#fb923c", // orange-400
  "#fdba74", // orange-300
  "#ffedd5", // orange-100
  "#fed7aa", // orange-200
]

export function ExpenseDistribution() {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Percentage"]}
            contentStyle={{
              backgroundColor: "white",
              borderColor: "#e2e8f0",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
