"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Alert, AlertDescription } from "@/app/components/ui/alert"

interface UserCredentials {
    email: string
    password: string
}

// Mock credentials for demo purposes
const VALID_CREDENTIALS: UserCredentials[] = [
    {
        email: "admin@temple.org",
        password: "admin123",
    },
    {
        email: "user@temple.org",
        password: "user123",
    },
]

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
            // Simulate API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Check credentials
            const isValidCredential = VALID_CREDENTIALS.some(
                (cred) => cred.email === formData.email && cred.password === formData.password,
            )

            if (isValidCredential) {
                // In a real app, you would set cookies/localStorage here
                if (formData.rememberMe) {
                    localStorage.setItem("isAuthenticated", "true")
                    localStorage.setItem("user", JSON.stringify({ email: formData.email }))
                } else {
                    sessionStorage.setItem("isAuthenticated", "true")
                    sessionStorage.setItem("user", JSON.stringify({ email: formData.email }))
                }

                // Ensure redirection happens after state is set
                setTimeout(() => {
                    // Force a hard navigation to dashboard
                    window.location.href = "/dashboard"
                }, 100)
            } else {
                setError("Invalid email or password. Please try again.")
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {error && (
                <Alert variant="destructive">
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
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                onClick={() => setShowPassword(!showPassword)}
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
                        <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
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
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-orange-200">
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
                        className="mr-2 h-4 w-4"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                    </svg>
                    Google
                </Button>
                <Button variant="outline" className="border-orange-200">
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
                        className="mr-2 h-4 w-4"
                    >
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                        <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                    Apple
                </Button>
            </div>
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
                <h3 className="text-sm font-medium text-orange-800 mb-2">Demo Credentials</h3>
                <div className="grid gap-1 text-sm">
                    <div className="grid grid-cols-2">
                        <span className="font-medium">Admin Email:</span>
                        <span>admin@temple.org</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="font-medium">Admin Password:</span>
                        <span>admin123</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="font-medium">User Email:</span>
                        <span>user@temple.org</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="font-medium">User Password:</span>
                        <span>user123</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
