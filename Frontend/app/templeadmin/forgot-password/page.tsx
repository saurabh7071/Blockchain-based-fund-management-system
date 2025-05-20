"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState("email") // email or otp
  const [otp, setOtp] = useState("")

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call for sending OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll just show a success toast and move to OTP step
      toast({
        title: "OTP Sent",
        description: `We've sent a verification code to ${email}. Please check your inbox.`,
        variant: "success",
        duration: 5000,
      })

      setStep("otp")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: "An error occurred. Please try again later.",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll just show a success toast and redirect
      toast({
        title: "OTP Verified",
        description: "Your identity has been verified. You can now reset your password.",
        variant: "success",
        duration: 5000,
      })

      // Mock reset token for demo purposes
      const resetToken = "demo-reset-token-123456"
      router.push(`/templeadmin/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "The verification code you entered is incorrect. Please try again.",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl text-orange-600">
            🛕
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-orange-800">Forgot Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {step === "email"
              ? "Enter your email to receive a verification code"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        <Card className="border-none shadow-lg">
          {step === "email" ? (
            <form onSubmit={handleSendOTP}>
              <CardHeader>
                <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>We'll send you a verification code to reset your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@temple.org"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
                <div className="text-center text-sm">
                  <Link href="/templeadmin/login" className="text-orange-600 hover:text-orange-700">
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <CardHeader>
                <CardTitle className="text-xl">Verify Your Identity</CardTitle>
                <CardDescription>Enter the verification code sent to {email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                  <p className="text-xs text-muted-foreground text-center">The code will expire in 10 minutes</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
                <div className="flex justify-between w-full text-sm">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="text-orange-600 hover:text-orange-700"
                    disabled={isLoading}
                  >
                    Resend Code
                  </button>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
