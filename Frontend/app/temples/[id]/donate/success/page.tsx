"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Download, ExternalLink, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function DonationSuccessPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount") || "1001"
  const [transactionId, setTransactionId] = useState("")

  // Generate a random transaction ID on component mount
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase()
    setTransactionId(`TXN-${randomId}`)
  }, [])

  // This would normally be fetched from an API
  const temple = {
    id: params.id,
    name: "ISKCON Temple",
    location: "Delhi",
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Donation Successful!</CardTitle>
          <CardDescription>
            Thank you for your generous donation to {temple.name}. Your contribution will make a difference.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-lg mb-4">Donation Receipt</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temple:</span>
                <span className="font-medium">{temple.name}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Amount:</span>
                <span>₹{amount}</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Blockchain Verification</h3>
            <p className="text-sm mb-3">
              Your donation has been recorded on the blockchain for complete transparency. You can verify it using the
              transaction hash below.
            </p>
            <div className="flex items-center justify-between bg-white rounded p-2 border">
              <code className="text-xs md:text-sm truncate">
                0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d
              </code>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View on blockchain</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-3 w-full justify-center">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <div className="flex flex-col space-y-2 w-full text-center">
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link href={`/temples/${params.id}`}>Return to Temple Page</Link>
            </Button>
            <Button asChild variant="link" className="text-orange-600">
              <Link href="/dashboard">View Your Donations</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
