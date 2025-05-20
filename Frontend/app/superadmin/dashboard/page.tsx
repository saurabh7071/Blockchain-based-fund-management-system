"use client"

import { useEffect } from "react"
import { DashboardOverview } from "@/components/superadmin/dashboard/dashboard-overview"

export default function DashboardPage() {
  useEffect(() => {
    console.log("Dashboard page mounted")
    console.log("Session storage access token:", sessionStorage.getItem("access_token"))
    console.log("Local storage refresh token:", localStorage.getItem("refresh_token"))
    console.log("Cookies:", document.cookie)
  }, [])

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <DashboardOverview />
    </div>
  )
}
