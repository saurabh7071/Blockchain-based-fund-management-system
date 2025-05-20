import { jwtDecode } from "jwt-decode"

// Token storage keys
const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const USER_KEY = "user_data"

// API URLs
const LOGIN_URL = "http://localhost:5050/api/v1/superAdmin/login-superAdmin"
const LOGOUT_URL = "http://localhost:5050/api/v1/superAdmin/logout-superAdmin"
const REFRESH_TOKEN_URL = "http://localhost:5050/api/v1/superAdmin/refresh-Access-Token"

console.log("LOGIN_URL:", LOGIN_URL)

// Types
interface LoginCredentials {
    email: string
    password: string
}

interface User {
    _id: string
    name: string
    email: string
    role: string
}

interface AuthResponse {
    statusCode: number
    data: {
        user: User
        accessToken: string
        refreshToken: string
    }
    message: string
    success: boolean
}

interface DecodedToken {
    _id: string
    email?: string
    exp: number
    iat: number
}

// Login function
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include", // Important for cookies
        })

        // Check if response is JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid server response. Please try again later.")
        }

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Invalid email or password")
        }

        // Store tokens and user data in client-side storage
        if (typeof window !== "undefined") {
            // Store access token in sessionStorage (cleared when browser is closed)
            sessionStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken)

            // Store refresh token in localStorage (persists)
            localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken)

            // Store user data
            localStorage.setItem(USER_KEY, JSON.stringify(data.data.user))

            // Set cookies for server-side auth
            document.cookie = `accessToken=${data.data.accessToken}; path=/; secure; samesite=strict`
            document.cookie = `refreshToken=${data.data.refreshToken}; path=/; secure; samesite=strict`
        }

        return data
    } catch (error: any) {
        console.error("Login error:", error)
        if (error.message.includes("<!DOCTYPE")) {
            throw new Error("Server error. Please try again later.")
        }
        throw new Error(error.message || "Invalid email or password")
    }
}

// Get current user from storage
export function getCurrentUser(): User | null {
    if (typeof window === "undefined") {
        // Server-side: Try to get user from cookies
        try {
            const cookies = require('next/headers').cookies()
            const userData = cookies.get('user_data')?.value
            if (userData) {
                return JSON.parse(userData) as User
            }
            return null
        } catch (error) {
            console.error("Server-side user data error:", error)
            return null
        }
    }

    // Client-side: Get from localStorage
    const userData = localStorage.getItem(USER_KEY)
    if (!userData) {
        return null
    }

    try {
        return JSON.parse(userData) as User
    } catch (error) {
        console.error("Error parsing user data:", error)
        return null
    }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    if (typeof window === "undefined") {
        // Server-side: Check cookies
        try {
            const cookies = require('next/headers').cookies()
            const accessToken = cookies.get('accessToken')?.value
            if (!accessToken) return false

            const decodedToken = jwtDecode<DecodedToken>(accessToken)
            const currentTime = Math.floor(Date.now() / 1000)
            return decodedToken.exp > currentTime
        } catch (error) {
            console.error("Server-side auth check error:", error)
            return false
        }
    }

    // Client-side: Check both sessionStorage and cookies
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY) || 
        document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1]

    if (!accessToken) {
        return false
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken)
        const currentTime = Math.floor(Date.now() / 1000)
        return decodedToken.exp > currentTime
    } catch (error) {
        console.error("Error decoding token:", error)
        return false
    }
}

// Get access token
export function getAccessToken(): string | null {
    if (typeof window === "undefined") {
        return null
    }

    // Check both sessionStorage and cookies
    const sessionToken = sessionStorage.getItem(ACCESS_TOKEN_KEY)
    const cookieToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1]
    
    return sessionToken || cookieToken || null
}

// Refresh token function
export async function refreshAccessToken(): Promise<string | null> {
    if (typeof window === "undefined") {
        return null
    }

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refreshToken) {
        return null
    }

    try {
        const response = await fetch(REFRESH_TOKEN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("Failed to refresh token")
        }

        const data = await response.json()
        if (data.success && data.data.accessToken) {
            // Update tokens
            sessionStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken)
            if (data.data.refreshToken) {
                localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken)
            }

            // Update cookies
            const setCookie = (name: string, value: string) => {
                const expires = new Date();
                expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 24 hours
                document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
            };

            setCookie('accessToken', data.data.accessToken)
            if (data.data.refreshToken) {
                setCookie('refreshToken', data.data.refreshToken)
            }

            return data.data.accessToken
        }
        throw new Error("Invalid refresh token response")
    } catch (error) {
        console.error("Error refreshing token:", error)
        return null
    }
}

// Logout function
export async function logoutUser(): Promise<void> {
    if (typeof window === "undefined") {
        return
    }

    try {
        const accessToken = getAccessToken()
        if (accessToken) {
            // Call logout endpoint
            await fetch(LOGOUT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: "include",
            })
        }
    } catch (error) {
        console.error("Logout API error:", error)
    } finally {
        // Clear sessionStorage and localStorage
        sessionStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(USER_KEY)

        // Clear cookies
        const clearCookie = (name: string) => {
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
        }

        clearCookie('accessToken')
        clearCookie('refreshToken')
        clearCookie('user_data')

        // Force reload to clear any remaining state
        window.location.href = '/superadmin/login'
    }
}

// API request with token
export async function authenticatedRequest(url: string, options: RequestInit = {}): Promise<any> {
    const accessToken = getAccessToken()

    if (!accessToken) {
        throw new Error("No access token available")
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: "include",
        })

        // If unauthorized, try to refresh token
        if (response.status === 401) {
            const newToken = await refreshAccessToken()

            if (newToken) {
                // Retry with new token
                const newHeaders = {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                }

                const retryResponse = await fetch(url, {
                    ...options,
                    headers: newHeaders,
                    credentials: "include",
                })

                return await retryResponse.json()
            } else {
                // Refresh failed, logout
                logoutUser()
                throw new Error("Session expired. Please login again.")
            }
        }

        return await response.json()
    } catch (error) {
        console.error("API request error:", error)
        throw error
    }
}

export async function authenticateUser(email: string, password: string): Promise<any | null> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/superAdmin/login-superAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Authentication error:", error)
        return null
    }
}
