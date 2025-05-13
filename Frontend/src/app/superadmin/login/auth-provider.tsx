"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
    isAuthenticated: boolean
    user: { email: string } | null
    logout: () => void
    unreadNotifications: number
    markNotificationAsRead: (id?: string) => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    logout: () => { },
    unreadNotifications: 0,
    markNotificationAsRead: () => { },
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is authenticated
        const checkAuth = () => {
            const storedAuth = localStorage.getItem("isAuthenticated") || sessionStorage.getItem("isAuthenticated")
            const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")

            if (storedAuth === "true" && storedUser) {
                setIsAuthenticated(true)
                setUser(JSON.parse(storedUser))

                // Fetch unread notifications count (mock)
                fetchUnreadNotificationsCount()
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }

            setIsLoading(false)
        }

        checkAuth()
    }, [])

    // Redirect to login if not authenticated and not already on login page
    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== "/login") {
            router.push("/login")
        } else if (!isLoading && isAuthenticated && pathname === "/login") {
            // If authenticated and on login page, redirect to dashboard
            router.push("/dashboard")
        }
    }, [isAuthenticated, isLoading, pathname, router])

    const fetchUnreadNotificationsCount = () => {
        // Mock API call to get unread notifications
        setTimeout(() => {
            setUnreadNotifications(5)
        }, 1000)
    }

    const logout = () => {
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("user")
        sessionStorage.removeItem("isAuthenticated")
        sessionStorage.removeItem("user")
        setIsAuthenticated(false)
        setUser(null)
        router.push("/login")
    }

    const markNotificationAsRead = (id?: string) => {
        // If id is provided, mark specific notification as read
        // Otherwise, mark all as read
        if (id) {
            // Mock API call to mark specific notification as read
            setUnreadNotifications((prev) => Math.max(0, prev - 1))
        } else {
            // Mock API call to mark all notifications as read
            setUnreadNotifications(0)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                logout,
                unreadNotifications,
                markNotificationAsRead,
            }}
        >
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
