"use client"

import { useState } from "react"
import { CreditCard, Wallet, Bitcoin, Check, Info } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DonatePanel({ templeId, templeName }) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [purpose, setPurpose] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showOnWall, setShowOnWall] = useState(true)

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle donation submission
    console.log({
      templeId,
      amount,
      paymentMethod,
      purpose,
      isAnonymous,
      showOnWall,
    })
    // This would typically redirect to a payment gateway
  }

  const predefinedAmounts = [101, 501, 1001, 2001, 5001]

  return (
    <Card className="sticky top-24">
      <CardHeader className="bg-orange-50 rounded-t-lg">
        <CardTitle>Donate to {templeName}</CardTitle>
        <CardDescription>Support the temple with a donation of your choice</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
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
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-2">
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
              <Label htmlFor="purpose">Donation Purpose (Optional)</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Temple Construction</SelectItem>
                  <SelectItem value="food">Food Distribution</SelectItem>
                  <SelectItem value="festival">Festival Celebrations</SelectItem>
                  <SelectItem value="maintenance">Temple Maintenance</SelectItem>
                  <SelectItem value="general">General Donation</SelectItem>
                </SelectContent>
              </Select>
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
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your name will not be displayed publicly</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="wall" className="cursor-pointer">
                    Show on wall of gratitude
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your donation will be displayed on the temple's gratitude wall</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="wall" checked={showOnWall} onCheckedChange={setShowOnWall} disabled={isAnonymous} />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white" disabled={!amount}>
            Donate Now
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-start pt-0">
        <div className="flex items-center text-sm text-muted-foreground mt-4">
          <Check className="mr-2 h-4 w-4 text-green-600" />
          <span>100% Secure Payment</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Check className="mr-2 h-4 w-4 text-green-600" />
          <span>Blockchain Verified Transparency</span>
        </div>
      </CardFooter>
    </Card>
  )
}
