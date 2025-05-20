"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
}

export function DateRangePicker({ className }: DateRangePickerProps) {
  const currentDate = new Date()

  return (
    <div className={cn("grid gap-2", className)}>
      <Button
        variant={"outline"}
        className={cn("w-full justify-start text-left font-normal bg-white")}
        disabled
      >
        {format(currentDate, "LLL dd, y")}
      </Button>
    </div>
  )
}
