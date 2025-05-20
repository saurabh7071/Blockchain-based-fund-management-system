"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    const emailParam = searchParams.get("email")

    if (!tokenParam) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description: "Your password reset link is invalid or has expired.",
        duration: 5000,
      })
      router.push("/forgot-password")
    } else {
      setToken(tokenParam)
      if (emailParam) setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams, router, toast])

  useEffect(() => {
    // Check password strength
    const errors: string[] = []
    let strength = 0

    if (password.length > 0) {
      // Length check
      if (password.length >= 8) {
        strength += 25
      } else {
        errors.push("Password must be at least 8 characters long")
      }

      // Uppercase check
      if (/[A-Z]/.test(password)) {
        strength += 25
      } else {
        errors.push("Password must contain at least one uppercase letter")
      }

      // Number check
      if (/\d/.test(password)) {
        strength += 25
      } else {
        errors.push("Password must contain at least one number")
      }

      // Special character check
      if (/[^A-Za-z0-9]/.test(password)) {
        strength += 25
      } else {
        errors.push("Password must contain at least one special character")
      }
    }

    // Match check (only if both fields have values)
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("Passwords do not match")
    }

    setPasswordStrength(strength)
    setPasswordErrors(errors)
  }, [password, confirmPassword])

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordErrors.length > 0) return

    setIsLoading(true)

    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password.",
        variant: "default",
        duration: 5000,
      })

      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: "An error occurred while resetting your password. Please try again.",
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
          <h1 className="text-3xl font-bold tracking-tight text-orange-800">Reset Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create a new password for your account</p>
        </div>

        <Card className="border-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl">Set New Password</CardTitle>
              <CardDescription>
                {email ? `Create a new password for ${email}` : "Enter and confirm your new password"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>

                {password && (
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Password Strength: {getStrengthText()}</span>
                      <span>{passwordStrength}%</span>
                    </div>
                    <Progress value={passwordStrength} className={getStrengthColor()} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              {passwordErrors.length > 0 && (
                <div className="space-y-1">
                  {passwordErrors.map((error, index) => (
                    <div key={index} className="flex items-center text-sm text-red-500">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {password && passwordErrors.length === 0 && (
                <div className="flex items-center text-sm text-green-500">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span>Password meets all requirements</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoading || passwordErrors.length > 0 || !password || !confirmPassword}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-orange-600 hover:text-orange-700">
                  Back to Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
