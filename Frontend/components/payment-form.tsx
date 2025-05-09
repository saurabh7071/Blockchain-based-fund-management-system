"use client"

import { useState } from "react"
import { CreditCard, Wallet, Bitcoin } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function PaymentForm({ paymentMethod, cardDetails, onCardDetailsChange }) {
  const [upiId, setUpiId] = useState("")
  const [bank, setBank] = useState("")
  const [walletProvider, setWalletProvider] = useState("")
  const [cryptoAddress, setCryptoAddress] = useState("")

  const handleCardNumberChange = (e) => {
    // Format card number with spaces every 4 digits and limit to 19 chars (16 digits + 3 spaces)
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
    if (formattedValue.length <= 19) {
      onCardDetailsChange("number", formattedValue)
    }
  }

  const handleExpiryChange = (e) => {
    // Format expiry as MM/YY
    const value = e.target.value.replace(/\D/g, "")
    let formattedValue = value
    if (value.length > 2) {
      formattedValue = value.slice(0, 2) + "/" + value.slice(2, 4)
    }
    if (formattedValue.length <= 5) {
      onCardDetailsChange("expiry", formattedValue)
    }
  }

  const handleCvcChange = (e) => {
    // Limit CVC to 3-4 digits
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      onCardDetailsChange("cvc", value)
    }
  }

  return (
    <div className="space-y-6">
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold">Card Payment</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={handleCardNumberChange}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-name">Cardholder Name</Label>
            <Input
              id="card-name"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => onCardDetailsChange("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cardDetails.cvc}
                onChange={handleCvcChange}
                className="font-mono"
              />
            </div>
          </div>

          <Alert className="bg-blue-50 text-blue-800 border-blue-200">
            <AlertDescription className="text-sm">
              Your card information is encrypted and processed securely. We do not store your full card details.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Wallet className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold">UPI Payment</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input id="upi-id" placeholder="name@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upi-app">Select UPI App</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select UPI app" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpay">Google Pay</SelectItem>
                <SelectItem value="phonepe">PhonePe</SelectItem>
                <SelectItem value="paytm">Paytm</SelectItem>
                <SelectItem value="bhim">BHIM</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertDescription className="text-sm">
              You will receive a payment request on your UPI app. Please approve it to complete the donation.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {paymentMethod === "netbanking" && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-orange-600 mr-2"
            >
              <path d="m2 18 2-2h2l2-2h2l2-2h2l2-2h2l2-2h2l2-2" />
              <path d="M2 6v12" />
              <path d="M22 6v12" />
            </svg>
            <h3 className="font-semibold">Net Banking</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank">Select Bank</Label>
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                <SelectItem value="other">Other Banks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Alert className="bg-blue-50 text-blue-800 border-blue-200">
            <AlertDescription className="text-sm">
              You will be redirected to your bank's secure payment page to complete the transaction.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {paymentMethod === "crypto" && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Bitcoin className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold">Cryptocurrency Payment</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crypto-type">Select Cryptocurrency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usdt">Tether (USDT)</SelectItem>
                <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crypto-address">Wallet Address</Label>
            <div className="relative">
              <Input
                id="crypto-address"
                placeholder="Enter your wallet address"
                value={cryptoAddress}
                onChange={(e) => setCryptoAddress(e.target.value)}
                className="font-mono text-sm"
              />
              <div className="absolute right-2 top-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
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
                    className="h-4 w-4"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span className="sr-only">Copy address</span>
                </Button>
              </div>
            </div>
          </div>

          <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
            <AlertDescription className="text-sm">
              Please scan the QR code or copy the wallet address to make your cryptocurrency donation. The donation will
              be converted to INR at the current exchange rate.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
