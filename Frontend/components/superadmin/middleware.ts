import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname
    console.log("Middleware - Current path:", path)

    // Check if the path is public (login page)
    const isPublicPath = path === "/superadmin/login"
    console.log("Middleware - Is public path:", isPublicPath)

    // Get the token from cookies
    const accessToken = request.cookies.get("accessToken")?.value
    console.log("Middleware - Access token from cookies:", accessToken ? "Present" : "Not present")
    console.log("Middleware - All cookies:", request.cookies.getAll())

    let isAuthenticated = false

    // Verify token if it exists
    if (accessToken) {
        try {
            const decoded = jwtDecode(accessToken)
            const currentTime = Math.floor(Date.now() / 1000)
            console.log("Middleware - Token expiration:", decoded.exp)
            console.log("Middleware - Current time:", currentTime)
            console.log("Middleware - Token payload:", decoded)

            // Check if token is not expired
            if (decoded.exp && decoded.exp > currentTime) {
                isAuthenticated = true
                console.log("Middleware - Token is valid")
            } else {
                console.log("Middleware - Token is expired")
                // Clear expired token
                const response = NextResponse.redirect(new URL("/superadmin/login", request.url))
                response.cookies.delete("accessToken")
                response.cookies.delete("refreshToken")
                return response
            }
        } catch (error) {
            console.error("Middleware - Token verification failed:", error)
            // Clear invalid token
            const response = NextResponse.redirect(new URL("/superadmin/login", request.url))
            response.cookies.delete("accessToken")
            response.cookies.delete("refreshToken")
            return response
        }
    }

    console.log("Middleware - Is authenticated:", isAuthenticated)

    // If user is authenticated and trying to access login page, redirect to dashboard
    if (isPublicPath && isAuthenticated) {
        console.log("Middleware - Redirecting to dashboard (already authenticated)")
        return NextResponse.redirect(new URL("/superadmin/dashboard", request.url))
    }

    // If the path is dashboard or any of its subpaths and user is not authenticated,
    // redirect to login
    if (path.startsWith("/superadmin/dashboard") && !isAuthenticated) {
        console.log("Middleware - Redirecting to login (not authenticated)")
        const response = NextResponse.redirect(new URL("/superadmin/login", request.url))
        // Clear any existing tokens
        response.cookies.delete("accessToken")
        response.cookies.delete("refreshToken")
        return response
    }

    // Redirect root based on auth
    if (path === "/") {
        console.log("Middleware - Redirecting root path")
        return NextResponse.redirect(
            new URL(isAuthenticated ? "/superadmin/dashboard" : "/superadmin/login", request.url)
        )
    }

    console.log("Middleware - Proceeding with request")
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/superadmin/login", "/superadmin/dashboard/:path*"] 
}
