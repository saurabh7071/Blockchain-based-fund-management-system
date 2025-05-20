"use client"

import type React from "react"
import ReactApexChart from "react-apexcharts"

interface ChartProps {
  type: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap"
  options: any
  series: any
  width?: string | number
  height?: string | number
}

export function Chart({ type, options, series, width = "100%", height = 350 }: ChartProps) {
  return <ReactApexChart options={options} series={series} type={type} width={width} height={height} />
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute top-0 left-0 bg-white border rounded shadow-md p-2">{children}</div>
}

export const ChartTooltipContent = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4">{children}</div>
}

export const ChartLegendContent = ({ label, color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
      <div>{label}</div>
    </div>
  )
}

export const ChartStyle = () => {
  return null
}
