"use client"

import { useState } from "react"
import { CreditCard, Wallet, Bitcoin } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  amount,
  onAmountChange,
  purpose,
  onPurposeChange,
  isAnonymous,
  onAnonymousChange,
  showOnWall,
  onShowOnWallChange,
}) {
  const predefinedAmounts = [101, 501, 1001, 2001, 5001]
  const [customPurpose, setCustomPurpose] = useState("")

  const handlePurposeChange = (value) => {
    onPurposeChange(value)
    if (value !== "custom") {
      setCustomPurpose("")
    }
  }

  const handleCustomPurposeChange = (e) => {
    setCustomPurpose(e.target.value)
    onPurposeChange(`custom:${e.target.value}`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Donation Amount (₹)</Label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {predefinedAmounts.map((amt) => (
            <Button
              key={amt}
              type="button"
              variant={amount === amt.toString() ? "default" : "outline"}
              className={amount === amt.toString() ? "bg-orange-600 hover:bg-orange-700 text-white" : ""}
              onClick={() => onAmountChange(amt.toString())}
            >
              ₹{amt}
            </Button>
          ))}
        </div>
        <Input
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label>Payment Method</Label>
        <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex items-center cursor-pointer">
              <Wallet className="mr-2 h-4 w-4 text-orange-600" />
              UPI / Wallet
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4 text-orange-600" />
              Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
            <RadioGroupItem value="netbanking" id="netbanking" />
            <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-orange-600"
              >
                <path d="m2 18 2-2h2l2-2h2l2-2h2l2-2h2l2-2h2l2-2" />
                <path d="M2 6v12" />
                <path d="M22 6v12" />
              </svg>
              Net Banking
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
            <RadioGroupItem value="crypto" id="crypto" />
            <Label htmlFor="crypto" className="flex items-center cursor-pointer">
              <Bitcoin className="mr-2 h-4 w-4 text-orange-600" />
              Crypto
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Donation Purpose</Label>
        <Select value={purpose.startsWith("custom:") ? "custom" : purpose} onValueChange={handlePurposeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="construction">Temple Construction</SelectItem>
            <SelectItem value="food">Food Distribution</SelectItem>
            <SelectItem value="festival">Festival Celebrations</SelectItem>
            <SelectItem value="maintenance">Temple Maintenance</SelectItem>
            <SelectItem value="education">Education Programs</SelectItem>
            <SelectItem value="healthcare">Healthcare Services</SelectItem>
            <SelectItem value="general">General Donation</SelectItem>
            <SelectItem value="custom">Other (Specify)</SelectItem>
          </SelectContent>
        </Select>

        {purpose === "custom" || purpose.startsWith("custom:") ? (
          <div className="mt-2">
            <Textarea
              placeholder="Please specify the purpose of your donation"
              value={customPurpose}
              onChange={handleCustomPurposeChange}
              className="resize-none"
            />
          </div>
        ) : null}
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="anonymous" className="cursor-pointer">
              Make donation anonymous
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your name will not be displayed publicly</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch id="anonymous" checked={isAnonymous} onCheckedChange={onAnonymousChange} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="wall" className="cursor-pointer">
              Show on wall of gratitude
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your donation will be displayed on the temple's gratitude wall</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch id="wall" checked={showOnWall} onCheckedChange={onShowOnWallChange} disabled={isAnonymous} />
        </div>
      </div>
    </div>
  )
}
