import { Check } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PaymentSummary({ templeName, amount, purpose }) {
  // Format purpose for display
  const formattedPurpose = purpose.charAt(0).toUpperCase() + purpose.slice(1)

  return (
    <Card className="sticky top-24">
      <CardHeader className="bg-orange-50 rounded-t-lg">
        <CardTitle>Donation Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Temple</p>
            <p className="font-medium">{templeName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-2xl font-bold">₹{amount}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Purpose</p>
            <p className="font-medium">{formattedPurpose}</p>
          </div>
        </div>
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
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Check className="mr-2 h-4 w-4 text-green-600" />
          <span>Tax Deductible Donation</span>
        </div>
      </CardFooter>
    </Card>
  )
}
