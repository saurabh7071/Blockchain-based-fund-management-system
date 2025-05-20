"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    ArrowDown,
    ArrowUp,
    ArrowUpRight,
    BarChart3,
    Building,
    Calendar,
    CreditCard,
    DollarSign,
    Download,
    FileText,
    Filter,
    Layers,
    MoreHorizontal,
    RefreshCw,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/superadmin/ui/date-range-picker"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for the dashboard
const templeStats = [
    {
        name: "Total Temples",
        value: "23",
        change: "+2",
        changeType: "increase",
        icon: Building,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
    },
    {
        name: "Total Donations",
        value: "₹12.4M",
        change: "+8.2%",
        changeType: "increase",
        icon: CreditCard,
        color: "text-green-600",
        bgColor: "bg-green-100",
    },
    {
        name: "Total Expenses",
        value: "₹8.7M",
        change: "+5.1%",
        changeType: "increase",
        icon: DollarSign,
        color: "text-amber-600",
        bgColor: "bg-amber-100",
    },
    {
        name: "Active Users",
        value: "1,248",
        change: "+12.3%",
        changeType: "increase",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
    },
]

const recentDonations = [
    {
        id: "DON-1234",
        donor: "Ramesh Kumar",
        amount: "₹25,000",
        temple: "ISKCON Temple",
        date: "2023-05-08",
        status: "completed",
    },
    {
        id: "DON-1233",
        donor: "Anita Sharma",
        amount: "₹15,000",
        temple: "Vaishno Devi Temple",
        date: "2023-05-07",
        status: "completed",
    },
    {
        id: "DON-1232",
        donor: "Suresh Patel",
        amount: "₹10,000",
        temple: "Somnath Temple",
        date: "2023-05-07",
        status: "completed",
    },
    {
        id: "DON-1231",
        donor: "Priya Singh",
        amount: "₹5,000",
        temple: "Kashi Vishwanath Temple",
        date: "2023-05-06",
        status: "completed",
    },
    {
        id: "DON-1230",
        donor: "Anonymous",
        amount: "₹100,000",
        temple: "Vaishno Devi Temple",
        date: "2023-05-06",
        status: "completed",
    },
]

const recentExpenses = [
    {
        id: "EXP-4567",
        description: "Security Personnel Salary",
        amount: "₹380,000",
        temple: "Vaishno Devi Temple",
        date: "2023-05-08",
        category: "Staff",
        status: "pending",
    },
    {
        id: "EXP-4566",
        description: "Electrical Maintenance",
        amount: "₹125,000",
        temple: "ISKCON Temple",
        date: "2023-05-07",
        category: "Maintenance",
        status: "approved",
    },
    {
        id: "EXP-4565",
        description: "Prasad Ingredients",
        amount: "₹85,000",
        temple: "Somnath Temple",
        date: "2023-05-07",
        category: "Supplies",
        status: "completed",
    },
    {
        id: "EXP-4564",
        description: "Festival Decorations",
        amount: "₹150,000",
        temple: "Kashi Vishwanath Temple",
        date: "2023-05-06",
        category: "Events",
        status: "completed",
    },
    {
        id: "EXP-4563",
        description: "Water Supply System Repair",
        amount: "₹210,000",
        temple: "Vaishno Devi Temple",
        date: "2023-05-05",
        category: "Maintenance",
        status: "completed",
    },
]

const blockchainTransactions = [
    {
        id: "BT-7890",
        type: "Donation",
        amount: "₹100,000",
        temple: "Vaishno Devi Temple",
        date: "2023-05-06",
        hash: "0x8a2b...3f7d",
        status: "confirmed",
    },
    {
        id: "BT-7889",
        type: "Expense",
        amount: "₹210,000",
        temple: "Vaishno Devi Temple",
        date: "2023-05-05",
        hash: "0x3c4d...9e8f",
        status: "confirmed",
    },
    {
        id: "BT-7888",
        type: "Donation",
        amount: "₹50,000",
        temple: "ISKCON Temple",
        date: "2023-05-05",
        hash: "0x2a3b...7c8d",
        status: "confirmed",
    },
    {
        id: "BT-7887",
        type: "Expense",
        amount: "₹75,000",
        temple: "Somnath Temple",
        date: "2023-05-04",
        hash: "0x1a2b...3c4d",
        status: "confirmed",
    },
    {
        id: "BT-7886",
        type: "Expense",
        amount: "₹45,000",
        temple: "Kashi Vishwanath Temple",
        date: "2023-05-04",
        hash: "0x5e6f...7g8h",
        status: "failed",
    },
]

const upcomingEvents = [
    {
        id: "EVT-5678",
        name: "Janmashtami Celebration",
        temple: "ISKCON Temple",
        date: "2023-08-15",
        attendees: 1500,
        status: "upcoming",
    },
    {
        id: "EVT-5677",
        name: "Navratri Festival",
        temple: "Vaishno Devi Temple",
        date: "2023-10-15",
        attendees: 5000,
        status: "upcoming",
    },
    {
        id: "EVT-5676",
        name: "Maha Shivaratri",
        temple: "Somnath Temple",
        date: "2024-03-08",
        attendees: 3000,
        status: "planning",
    },
]

const campaigns = [
    {
        id: "CMP-6789",
        name: "Pilgrim Facilities Improvement",
        temple: "Vaishno Devi Temple",
        goal: "₹1,500,000",
        raised: "₹1,500,000",
        progress: 100,
        status: "completed",
    },
    {
        id: "CMP-6788",
        name: "Temple Renovation Fund",
        temple: "Kashi Vishwanath Temple",
        goal: "₹2,000,000",
        raised: "₹1,200,000",
        progress: 60,
        status: "active",
    },
    {
        id: "CMP-6787",
        name: "Community Kitchen Expansion",
        temple: "ISKCON Temple",
        goal: "₹800,000",
        raised: "₹320,000",
        progress: 40,
        status: "active",
    },
]

export function DashboardOverview() {
    console.log("DashboardOverview component rendering")
    
    useEffect(() => {
        console.log("DashboardOverview mounted")
        console.log("Checking authentication state...")
        console.log("Session storage access token:", sessionStorage.getItem("access_token"))
        console.log("Local storage refresh token:", localStorage.getItem("refresh_token"))
        console.log("Cookies:", document.cookie)
    }, [])

    // Add error boundary
    try {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-orange-800 dark:text-orange-200">Dashboard</h1>
                        <p className="text-muted-foreground">Overview of all temple activities and statistics</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DateRangePicker />
                        <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {templeStats.map((stat) => (
                        <Card key={stat.name} className="dashboard-card">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium dashboard-card-header">{stat.name}</CardTitle>
                                <div className={`${stat.bgColor} p-2 rounded-full ${stat.color}`}>
                                    <stat.icon className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold dashboard-card-value">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.changeType === "increase" ? (
                                        <span className="text-green-600 flex items-center">
                                            <ArrowUp className="mr-1 h-3 w-3" />
                                            {stat.change} from last month
                                        </span>
                                    ) : (
                                        <span className="text-red-600 flex items-center">
                                            <ArrowDown className="mr-1 h-3 w-3" />
                                            {stat.change} from last month
                                        </span>
                                    )}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="dashboard-card md:col-span-4">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle className="dashboard-card-header">Donation vs Expense Trends</CardTitle>
                                <CardDescription>Monthly comparison of donations and expenses</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-7 gap-1 border-orange-200 text-orange-700">
                                    <Filter className="h-3.5 w-3.5" />
                                    <span>Filter</span>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-7 w-7 border-orange-200 text-orange-700">
                                            <MoreHorizontal className="h-3.5 w-3.5" />
                                            <span className="sr-only">More options</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Download Chart</DropdownMenuItem>
                                        <DropdownMenuItem>View Detailed Report</DropdownMenuItem>
                                        <DropdownMenuItem>Compare with Previous Year</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full rounded-md border border-orange-100 bg-orange-50/50 flex items-center justify-center">
                                <BarChart3 className="h-16 w-16 text-orange-300" />
                                <span className="ml-2 text-orange-700">Donation vs Expense Chart</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="dashboard-card md:col-span-3">
                        <CardHeader>
                            <CardTitle className="dashboard-card-header">Top Performing Temples</CardTitle>
                            <CardDescription>Based on donation collection and visitor count</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border-2 border-orange-200">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Temple" />
                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">VD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">Vaishno Devi Temple</p>
                                        <p className="text-sm font-medium text-orange-700">₹3.2M</p>
                                    </div>
                                    <Progress value={85} className="h-1.5 bg-orange-100">
                                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" />
                                    </Progress>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border-2 border-orange-200">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Temple" />
                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">IS</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">ISKCON Temple</p>
                                        <p className="text-sm font-medium text-orange-700">₹2.8M</p>
                                    </div>
                                    <Progress value={75} className="h-1.5 bg-orange-100">
                                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" />
                                    </Progress>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border-2 border-orange-200">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Temple" />
                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">KV</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">Kashi Vishwanath Temple</p>
                                        <p className="text-sm font-medium text-orange-700">₹2.1M</p>
                                    </div>
                                    <Progress value={65} className="h-1.5 bg-orange-100">
                                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" />
                                    </Progress>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border-2 border-orange-200">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Temple" />
                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">ST</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">Somnath Temple</p>
                                        <p className="text-sm font-medium text-orange-700">₹1.9M</p>
                                    </div>
                                    <Progress value={55} className="h-1.5 bg-orange-100">
                                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" />
                                    </Progress>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border-2 border-orange-200">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Temple" />
                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">JT</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">Jagannath Temple</p>
                                        <p className="text-sm font-medium text-orange-700">₹1.7M</p>
                                    </div>
                                    <Progress value={45} className="h-1.5 bg-orange-100">
                                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" />
                                    </Progress>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="dashboard-card col-span-2">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle className="dashboard-card-header">Recent Expenses</CardTitle>
                                <CardDescription>Latest expenses across all temples</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-7 gap-1 border-orange-200 text-orange-700">
                                    <Filter className="h-3.5 w-3.5" />
                                    <span>Filter</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader className="table-header">
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Temple</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentExpenses.map((expense, index) => (
                                        <TableRow key={expense.id} className={index % 2 === 1 ? "table-row-alt" : ""}>
                                            <TableCell className="font-medium">{expense.id}</TableCell>
                                            <TableCell>{expense.description}</TableCell>
                                            <TableCell>{expense.temple}</TableCell>
                                            <TableCell>{expense.category}</TableCell>
                                            <TableCell className="font-medium text-orange-700">{expense.amount}</TableCell>
                                            <TableCell>
                                                {expense.status === "pending" ? (
                                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                                                        Pending
                                                    </Badge>
                                                ) : expense.status === "approved" ? (
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                                        Approved
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                                        Completed
                                                    </Badge>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100">
                                Previous
                            </Button>
                            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100">
                                Next
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <CardTitle className="dashboard-card-header">Blockchain Transactions</CardTitle>
                            <CardDescription>Recent blockchain ledger entries</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {blockchainTransactions.slice(0, 3).map((transaction) => (
                                <div key={transaction.id} className="flex items-start gap-4 rounded-md border border-orange-100 p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                        <Layers className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{transaction.type}</p>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <span className="font-medium text-orange-700">{transaction.amount}</span>
                                            <span className="mx-1">•</span>
                                            <span>{transaction.temple}</span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            <span className="text-muted-foreground">Hash: </span>
                                            <code className="ml-1 rounded bg-orange-50 px-1 text-orange-700">{transaction.hash}</code>
                                        </div>
                                    </div>
                                    <div>
                                        {transaction.status === "confirmed" ? (
                                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                                Confirmed
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                                Failed
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                                <Link href="/dashboard/blockchain-logs" className="flex items-center w-full justify-center">
                                    <Layers className="mr-2 h-4 w-4" />
                                    View All Blockchain Logs
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="dashboard-card">
                        <CardHeader>
                            <CardTitle className="dashboard-card-header">Recent Donations</CardTitle>
                            <CardDescription>Latest donations across all temples</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentDonations.slice(0, 4).map((donation) => (
                                    <div key={donation.id} className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9 border-2 border-orange-200">
                                            <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                                                {donation.donor.substring(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{donation.donor}</p>
                                            <p className="text-xs text-muted-foreground">{donation.temple}</p>
                                        </div>
                                        <div className="font-medium text-orange-700">{donation.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                                <Link href="/dashboard/donations" className="flex items-center w-full justify-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    View All Donations
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <CardTitle className="dashboard-card-header">Upcoming Events</CardTitle>
                            <CardDescription>Scheduled events and festivals</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-start gap-4 rounded-md border border-orange-100 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                            <Calendar className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{event.name}</p>
                                            <p className="text-xs text-muted-foreground">{event.temple}</p>
                                            <div className="flex items-center text-xs">
                                                <span className="text-muted-foreground">Date: </span>
                                                <span className="ml-1 font-medium text-orange-700">
                                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-xs">
                                                <span className="text-muted-foreground">Expected Attendees: </span>
                                                <span className="ml-1 font-medium text-orange-700">{event.attendees.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div>
                                            {event.status === "upcoming" ? (
                                                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                                    Upcoming
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                                                    Planning
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                                <Link href="/dashboard/campaigns" className="flex items-center w-full justify-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    View All Events
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <CardTitle className="dashboard-card-header">Active Campaigns</CardTitle>
                            <CardDescription>Fundraising campaigns and their progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {campaigns.map((campaign) => (
                                    <div key={campaign.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-medium leading-none">{campaign.name}</p>
                                                <p className="text-xs text-muted-foreground">{campaign.temple}</p>
                                            </div>
                                            {campaign.status === "completed" ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                                    Completed
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                                    Active
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">
                                                {campaign.raised} of {campaign.goal}
                                            </span>
                                            <span className="font-medium text-orange-700">{campaign.progress}%</span>
                                        </div>
                                        <Progress value={campaign.progress} className="h-1.5 bg-orange-100">
                                            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full" />
                                        </Progress>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                                <Link href="/dashboard/campaigns" className="flex items-center w-full justify-center">
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    View All Campaigns
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error rendering DashboardOverview:", error)
        return (
            <div className="p-4 text-red-600">
                <h2>Error loading dashboard</h2>
                <p>Please try refreshing the page</p>
            </div>
        )
    }
}
