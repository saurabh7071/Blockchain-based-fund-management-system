"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  name: string
  email: string
  role: string
  avatar: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("temple-auth")
        if (authData) {
          const { authenticated, user } = JSON.parse(authData)
          if (authenticated && user) {
            setUser(user)
          } else if (pathname !== "/templeadmin/login" && pathname !== "/templeadmin/forgot-password" && pathname !== "/reset-password") {
            router.push("/templeadmin/login")
          }
        } else if (
          pathname !== "/templeadmin/login" &&
          pathname !== "/templeadmin/forgot-password" &&
          pathname !== "/templeadmin/reset-password" &&
          !pathname.includes("reset-password")
        ) {
          router.push("/templeadmin/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (pathname !== "/templeadmin/login" && pathname !== "/templeadmin/forgot-password" && pathname !== "/templeadmin/reset-password") {
          router.push("/templeadmin/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:5050/api/v1/templeAdmin/login-Temple-Admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem(
        "temple-auth",
        JSON.stringify({
          authenticated: true,
          user: data.user,
          token: data.token,
        }),
      );

      setUser(data.user);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: data.message || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
  } catch (error) {
    console.error("Login error:", error);
    toast({
      title: "Login failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

  // Logout function
  const logout = () => {
    localStorage.removeItem("temple-auth")
    setUser(null)
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      variant: "success",
      duration: 3000,
    })
    router.push("/templeadmin/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
