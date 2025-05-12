"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    BarChart3,
    Building,
    CreditCard,
    DollarSign,
    Users,
    CalendarDays,
    FileText,
    Settings,
    Layers,
    Bell,
    LogOut,
    Menu,
    ChevronDown,
} from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Separator } from "@/app/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { useAuth } from "@/app/superadmin/login/auth-provider"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/app/components/ui/dialog"
import { useState } from "react"

interface NavItem {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    badge?: string
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: BarChart3,
    },
    {
        title: "Temples",
        href: "/dashboard/temples",
        icon: Building,
        badge: "23",
    },
    {
        title: "Donations",
        href: "/dashboard/donations",
        icon: CreditCard,
    },
    {
        title: "Expenses",
        href: "/dashboard/expenses",
        icon: DollarSign,
    },
    {
        title: "Blockchain Logs",
        href: "/dashboard/blockchain-logs",
        icon: Layers,
    },
    {
        title: "Campaigns & Events",
        href: "/dashboard/campaigns",
        icon: CalendarDays,
        badge: "5",
    },
    {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Reports",
        href: "/dashboard/reports",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

// Mock notifications for quick preview
const recentNotifications = [
    {
        id: "n1",
        title: "New Donation Received",
        description: "₹25,000 donation received from Ramesh Kumar",
        time: "10 minutes ago",
    },
    {
        id: "n2",
        title: "Expense Approval Required",
        description: "New expense request of ₹380,000 needs approval",
        time: "30 minutes ago",
    },
    {
        id: "n3",
        title: "System Maintenance",
        description: "Scheduled maintenance on May 15, 2023",
        time: "1 hour ago",
    },
    {
        id: "n4",
        title: "New User Registration",
        description: "Ankit Patel has registered on the platform",
        time: "2 hours ago",
    },
    {
        id: "n5",
        title: "Blockchain Transaction Failed",
        description: "Transaction for expense E45918 has failed",
        time: "3 hours ago",
    },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { logout, unreadNotifications, markNotificationAsRead, user } = useAuth()
    const [showNotifications, setShowNotifications] = useState(false)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        setShowLogoutConfirm(false)
        logout()
    }

    const handleNotificationClick = (id: string) => {
        markNotificationAsRead(id)
        // In a real app, you might navigate to the relevant page
        setShowNotifications(false)
    }

    const handleMarkAllAsRead = () => {
        markNotificationAsRead()
        setShowNotifications(false)
    }

    const handleViewAllNotifications = () => {
        setShowNotifications(false)
        router.push("/dashboard/notifications")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden border-orange-200 text-orange-700">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-72 bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950"
                    >
                        <nav className="grid gap-2 text-lg font-medium">
                            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-orange-700">
                                <Layers className="h-6 w-6" />
                                <span>Temple Management</span>
                            </Link>
                            <Separator className="my-2 bg-orange-200" />
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                                        pathname === item.href
                                            ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                                            : "hover:bg-orange-100 text-orange-800 dark:hover:bg-orange-900 dark:text-orange-200",
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-800 border-amber-200">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <Link href="/" className="flex items-center gap-2 md:flex">
                    <Layers className="h-6 w-6 text-orange-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                        Temple Management
                    </span>
                </Link>
                <div className="flex flex-1 items-center justify-end gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="relative border-orange-200 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
                        onClick={() => setShowNotifications(true)}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadNotifications > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-[10px] text-white">
                                {unreadNotifications}
                            </span>
                        )}
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative gap-2 px-1.5 md:gap-2.5 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
                            >
                                <Avatar className="h-8 w-8 border-2 border-orange-200">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                                        {user?.email.substring(0, 2).toUpperCase() || "SA"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden flex-col items-start text-left md:flex">
                                    <span className="text-sm font-medium">Super Admin</span>
                                    <span className="text-xs text-orange-600">{user?.email || "admin@temple.org"}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-orange-200">
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="text-orange-700 focus:text-orange-800 focus:bg-orange-50">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings" className="text-orange-700 focus:text-orange-800 focus:bg-orange-50">
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setShowLogoutConfirm(true)}
                                className="text-orange-700 focus:text-orange-800 focus:bg-orange-50"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="grid flex-1 md:grid-cols-[220px_1fr]">
                <nav className="hidden border-r border-orange-200 bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 md:block">
                    <div className="grid gap-2 p-4 text-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                                    pathname === item.href
                                        ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                                        : "hover:bg-orange-100 text-orange-800 dark:hover:bg-orange-900 dark:text-orange-200",
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                                {item.badge && (
                                    <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-800 border-amber-200">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-gradient-to-br from-orange-50/30 to-amber-50/30 dark:from-orange-950/30 dark:to-amber-950/30">
                    {children}
                </main>
            </div>

            {/* Notifications Dialog */}
            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
                <DialogContent className="sm:max-w-[425px] border-orange-200">
                    <DialogHeader>
                        <DialogTitle className="text-orange-800">Notifications</DialogTitle>
                        <DialogDescription>You have {unreadNotifications} unread notifications</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto">
                        {recentNotifications.map((notification, index) => (
                            <div
                                key={notification.id}
                                className={cn(
                                    "py-3 px-2 border-b border-orange-100 hover:bg-orange-50 cursor-pointer",
                                    index < unreadNotifications ? "bg-orange-50/50" : "",
                                )}
                                onClick={() => handleNotificationClick(notification.id)}
                            >
                                <div className="flex justify-between">
                                    <h4 className="font-medium text-orange-800">{notification.title}</h4>
                                    {index < unreadNotifications && <Badge className="bg-orange-500 text-white">New</Badge>}
                                </div>
                                <p className="text-sm text-orange-700 mt-1">{notification.description}</p>
                                <p className="text-xs text-orange-500 mt-1">{notification.time}</p>
                            </div>
                        ))}
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={handleMarkAllAsRead}
                            className="border-orange-200 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
                        >
                            Mark All as Read
                        </Button>
                        <Button
                            onClick={handleViewAllNotifications}
                            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                        >
                            View All Notifications
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
                <DialogContent className="sm:max-w-[425px] border-orange-200">
                    <DialogHeader>
                        <DialogTitle className="text-orange-800">Confirm Logout</DialogTitle>
                        <DialogDescription>Are you sure you want to log out of the Temple Management System?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowLogoutConfirm(false)}
                            className="border-orange-200 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
