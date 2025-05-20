"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, isAuthenticated, logoutUser, refreshAccessToken } from "@/components/lib/auth"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const userData = getCurrentUser()
          setUser(userData)
        } else {
          // Try to refresh the token
          const newToken = await refreshAccessToken()
          if (!newToken) {
            // If refresh fails, redirect to login
            router.push("/superadmin/login")
          } else {
            const userData = getCurrentUser()
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      router.push("/superadmin/login")
    } catch (error) {
      console.error("Logout error:", error)
      // Force logout even if API call fails
      setUser(null)
      router.push("/superadmin/login")
    }
  }

  const refreshToken = async () => {
    try {
      const newToken = await refreshAccessToken()
      if (!newToken) {
        console.log("Token refresh failed, logging out")
        await logout()
        return
      }
      const userData = getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error("Manual token refresh error:", error)
      await logout()
    }
  }

  // Set up token refresh interval
  useEffect(() => {
    // Refresh token every 14 minutes (before 15-minute expiry)
    const refreshInterval = setInterval(
      async () => {
        if (isAuthenticated()) {
          try {
            await refreshToken()
          } catch (error) {
            console.error("Token refresh error:", error)
          }
        }
      },
      14 * 60 * 1000, // 14 minutes
    )

    return () => clearInterval(refreshInterval)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
