"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Steps, Step } from "@/components/steps"
import { PaymentMethodSelector } from "@/components/payment-method-selector"
import { PaymentForm } from "@/components/payment-form"
import { PaymentSummary } from "@/components/payment-summary"

export default function DonatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [donationData, setDonationData] = useState({
    templeId: params.id,
    amount: "1001",
    paymentMethod: "card",
    purpose: "general",
    isAnonymous: false,
    showOnWall: true,
    cardDetails: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
  })

  // This would normally be fetched from an API
  const temple = {
    id: params.id,
    name: "ISKCON Temple",
    location: "Delhi",
  }

  const handlePaymentMethodChange = (method) => {
    setDonationData((prev) => ({ ...prev, paymentMethod: method }))
  }

  const handleAmountChange = (amount) => {
    setDonationData((prev) => ({ ...prev, amount }))
  }

  const handlePurposeChange = (purpose) => {
    setDonationData((prev) => ({ ...prev, purpose }))
  }

  const handleAnonymousChange = (isAnonymous) => {
    setDonationData((prev) => ({ ...prev, isAnonymous }))
    if (isAnonymous) {
      setDonationData((prev) => ({ ...prev, showOnWall: false }))
    }
  }

  const handleShowOnWallChange = (showOnWall) => {
    setDonationData((prev) => ({ ...prev, showOnWall }))
  }

  const handleCardDetailsChange = (field, value) => {
    setDonationData((prev) => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        [field]: value,
      },
    }))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmitPayment = async () => {
    setIsLoading(true)
    setPaymentStatus("processing")

    try {
      // This would be replaced with actual payment processing logic
      console.log("Processing payment:", donationData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Set success status
      setPaymentStatus("success")

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/temples/${params.id}/donate/success?amount=${donationData.amount}`)
      }, 2000)
    } catch (error) {
      console.error("Payment failed:", error)
      setPaymentStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href={`/temples/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Temple
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Donate to {temple.name}</h1>
        <p className="text-muted-foreground">{temple.location}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>Complete the steps below to make your donation</CardDescription>
            </CardHeader>
            <CardContent>
              <Steps currentStep={currentStep} className="mb-8">
                <Step title="Donation Details" description="Amount and purpose" />
                <Step title="Payment Method" description="Choose how to pay" />
                <Step title="Confirmation" description="Review and confirm" />
              </Steps>

              {currentStep === 1 && (
                <div className="space-y-6">
                  <PaymentMethodSelector
                    selectedMethod={donationData.paymentMethod}
                    onMethodChange={handlePaymentMethodChange}
                    amount={donationData.amount}
                    onAmountChange={handleAmountChange}
                    purpose={donationData.purpose}
                    onPurposeChange={handlePurposeChange}
                    isAnonymous={donationData.isAnonymous}
                    onAnonymousChange={handleAnonymousChange}
                    showOnWall={donationData.showOnWall}
                    onShowOnWallChange={handleShowOnWallChange}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleNextStep} className="bg-orange-600 hover:bg-orange-700 text-white">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <PaymentForm
                    paymentMethod={donationData.paymentMethod}
                    cardDetails={donationData.cardDetails}
                    onCardDetailsChange={handleCardDetailsChange}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="bg-orange-600 hover:bg-orange-700 text-white">
                      Review Donation
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold text-lg mb-4">Donation Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temple:</span>
                        <span className="font-medium">{temple.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">₹{donationData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purpose:</span>
                        <span className="font-medium capitalize">{donationData.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span className="font-medium capitalize">
                          {donationData.paymentMethod === "card" ? (
                            <span className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-1" />
                              Card ending in {donationData.cardDetails.number.slice(-4)}
                            </span>
                          ) : (
                            donationData.paymentMethod
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{donationData.amount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <Info className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0" />
                    <p className="text-sm">
                      By proceeding with this donation, you agree to our{" "}
                      <Link href="/terms" className="text-orange-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and acknowledge that your donation will be processed securely.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitPayment}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={isLoading || paymentStatus === "success"}
                    >
                      {paymentStatus === "processing" ? (
                        "Processing..."
                      ) : paymentStatus === "success" ? (
                        <span className="flex items-center">
                          <Check className="mr-2 h-4 w-4" /> Payment Successful
                        </span>
                      ) : (
                        "Complete Donation"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <PaymentSummary templeName={temple.name} amount={donationData.amount} purpose={donationData.purpose} />
        </div>
      </div>
    </div>
  )
}
