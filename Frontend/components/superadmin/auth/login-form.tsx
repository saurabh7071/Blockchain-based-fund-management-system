"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/components/lib/auth"

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Starting login process...")
      // Call the login API
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      })

      console.log("Login response:", response)

      if (response.success) {
        console.log("Login successful, storing tokens...")
        // Store tokens and user data
        if (typeof window !== "undefined") {
          // Store access token in sessionStorage
          sessionStorage.setItem("access_token", response.data.accessToken)
          console.log("Access token stored in sessionStorage")
          
          // Store refresh token in localStorage
          localStorage.setItem("refresh_token", response.data.refreshToken)
          console.log("Refresh token stored in localStorage")
          
          // Store user data
          localStorage.setItem("user_data", JSON.stringify(response.data.user))
          console.log("User data stored in localStorage")
          
          // Set cookies for server-side auth
          const setCookie = (name: string, value: string) => {
            const expires = new Date();
            expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 24 hours
            const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
            document.cookie = cookieString;
            console.log(`Setting cookie ${name}:`, cookieString);
          };

          setCookie('accessToken', response.data.accessToken);
          setCookie('refreshToken', response.data.refreshToken);
          setCookie('user_data', JSON.stringify(response.data.user));
          
          console.log("All cookies after setting:", document.cookie);
          
          // Simplified redirection logic
          console.log("Redirecting to dashboard...")
          router.push("/superadmin/dashboard")
        }
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      // Display user-friendly error message
      if (err.message.includes("Invalid email or password")) {
        setError("Invalid email or password. Please check your credentials and try again.")
      } else if (err.message.includes("Server error")) {
        setError("Unable to connect to the server. Please try again later.")
      } else {
        setError("An error occurred during login. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-orange-200 focus-visible:ring-orange-500"
              suppressHydrationWarning
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleInputChange}
                required
                className="pr-10 border-orange-200 focus-visible:ring-orange-500"
                suppressHydrationWarning
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
                suppressHydrationWarning
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} suppressHydrationWarning />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            suppressHydrationWarning
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
        <h3 className="text-sm font-medium text-orange-800 mb-2">Super Admin Credentials</h3>
        <div className="grid gap-1 text-sm">
          <div className="grid grid-cols-2">
            <span className="font-medium">Email:</span>
            <span>superadmin@gmail.com</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="font-medium">Password:</span>
            <span>supersecurepass</span>
          </div>
        </div>
      </div>
    </div>
  )
}
