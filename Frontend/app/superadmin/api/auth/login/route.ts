import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/components/lib/auth"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password, rememberMe } = body

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
        }

        const user = await authenticateUser(email, password)

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
        }

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
    }
}
