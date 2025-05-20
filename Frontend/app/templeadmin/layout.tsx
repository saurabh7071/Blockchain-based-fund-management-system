import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/templeadmin/toaster"
import { AuthProvider } from "@/components/templeadmin/auth-provider"
import ProtectedRoute from "@/components/templeadmin/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Temple Administration Dashboard",
  description: "Manage your temple's donations, expenses, and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
