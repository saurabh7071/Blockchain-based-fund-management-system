"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

const donationPurposes = [
  { value: "general", label: "General Donation" },
  { value: "construction", label: "Temple Construction" },
  { value: "renovation", label: "Temple Renovation" },
  { value: "festivals", label: "Festival Celebrations" },
  { value: "annadanam", label: "Food Distribution (Annadanam)" },
  { value: "education", label: "Education Programs" },
  { value: "healthcare", label: "Healthcare Services" },
  { value: "other", label: "Other (Custom Purpose)" },
]

export function PaymentMethodSelector({ onSelect }) {
  const [open, setOpen] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState(donationPurposes[0])
  const [customPurpose, setCustomPurpose] = useState("")
  const [showCustomField, setShowCustomField] = useState(false)

  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose)
    setOpen(false)

    if (purpose.value === "other") {
      setShowCustomField(true)
    } else {
      setShowCustomField(false)
      onSelect(purpose.value)
    }
  }

  const handleCustomPurposeChange = (e) => {
    setCustomPurpose(e.target.value)
    onSelect(`custom:${e.target.value}`)
  }

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedPurpose.label}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search donation purpose..." />
            <CommandList>
              <CommandEmpty>No purpose found.</CommandEmpty>
              <CommandGroup>
                {donationPurposes.map((purpose) => (
                  <CommandItem key={purpose.value} value={purpose.value} onSelect={() => handleSelect(purpose)}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPurpose.value === purpose.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {purpose.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {showCustomField && (
        <div className="animate-fadeIn">
          <Textarea
            placeholder="Please specify your donation purpose..."
            value={customPurpose}
            onChange={handleCustomPurposeChange}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Your custom donation purpose will be visible on the Wall of Gratitude.
          </p>
        </div>
      )}
    </div>
  )
}
