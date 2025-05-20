import type React from "react"
import { DashboardLayout } from "@/components/superadmin/layout"
import { getCurrentUser } from "@/components/lib/auth"
import { redirect } from "next/navigation"
import { AuthProvider } from "@/components/superadmin/auth/auth-provider"

export default async function Layout({ children }: { children: React.ReactNode }) {
  try {
    // Server-side authentication check
    const user = await getCurrentUser()
    console.log("Dashboard Layout - User check:", user ? "User found" : "No user")

    if (!user) {
      console.log("Dashboard Layout - Redirecting to login (no user)")
      redirect("/superadmin/login")
    }

    return (
      <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    )
  } catch (error) {
    console.error("Dashboard Layout - Error during authentication:", error)
    redirect("/superadmin/login")
  }
}
