"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/components/lib/auth"
import { LoginForm } from "@/components/superadmin/auth/login-form"

export default function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        // Check if user is already authenticated
        if (isAuthenticated()) {
            console.log("Login page - User already authenticated, redirecting to dashboard")
            // Replace the current history entry with dashboard
            window.history.replaceState(null, '', '/superadmin/dashboard')
            router.replace("/superadmin/dashboard")
        }
    }, [router])

    // Prevent going back to login page
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (isAuthenticated()) {
                // If user is authenticated and tries to go back, prevent it
                event.preventDefault()
                window.history.pushState(null, '', '/superadmin/dashboard')
                router.replace("/superadmin/dashboard")
            }
        }

        // Add event listener for popstate (back/forward navigation)
        window.addEventListener('popstate', handlePopState)

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [router])

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                    Temple Management System
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "Secure and transparent management of temple funds through blockchain technology."
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">Enter your credentials to sign in</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
