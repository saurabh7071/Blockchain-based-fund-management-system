"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, CreditCard, FileText, Home, Info, Menu, MessageSquarePlus, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/templeadmin/auth-provider"
import { NotificationDropdown } from "@/components/templeadmin/notification-dropdown"
import { LogoutConfirmation } from "@/components/templeadmin/logout-confirmation"

const navigation = [
  { name: "Dashboard", href: "/templeadmin/dashboard", icon: Home },
  { name: "Donations", href: "/templeadmin/donations", icon: CreditCard },
  { name: "Expenses", href: "/templeadmin/expenses", icon: FileText },
  { name: "Campaigns", href: "/templeadmin/campaigns", icon: MessageSquarePlus },
  { name: "Temple Info", href: "/templeadmin/temple-info", icon: Info },
  { name: "Events", href: "/templeadmin/events", icon: CalendarDays },
  { name: "Reports", href: "/templeadmin/reports", icon: FileText },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-16 lg:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs bg-orange-50">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/templeadmin/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-orange-600">🛕</span> Temple Admin
              </Link>
              <div className="my-4 grid gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-orange-100 hover:text-orange-900",
                      pathname === item.href ? "bg-orange-100 text-orange-900 font-medium" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/templeadmin/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-orange-600">🛕</span>
            <span className="hidden md:inline-block">Temple Admin</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <NotificationDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full gap-2">
                <span className="hidden sm:inline-block">{user?.name || "User"}</span>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-800">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/templeadmin/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/templeadmin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutConfirmation />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <div className="hidden border-r bg-orange-50 lg:block">
          <div className="sticky top-0 h-[calc(100vh-4rem)] w-56 overflow-y-auto py-6 pr-2">
            <nav className="grid gap-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-orange-100 hover:text-orange-900 transition-colors",
                    pathname === item.href ? "bg-orange-100 text-orange-900 font-medium" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto pb-16">{children}</main>
      </div>
    </div>
  )
}
