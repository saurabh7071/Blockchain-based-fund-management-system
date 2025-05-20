"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"
import { useAuth } from "@/components/templeadmin/auth-provider"
import { DonationChart } from "@/components/templeadmin/dashboard/donation-chart"
import { ExpenseDistribution } from "@/components/templeadmin/dashboard/expense-distribution"
import { RecentDonations } from "@/components/templeadmin/dashboard/recent-donations"
import { RecentExpenses } from "@/components/templeadmin/dashboard/recent-expenses"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-orange-900">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "Admin"}! Here's what's happening with your temple today.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="bg-orange-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
                  All
                </TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
                  Month
                </TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
                  Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-orange-600"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">₹1,25,45,789</div>
                <p className="text-xs text-green-600">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-orange-600"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">₹45,23,456</div>
                <p className="text-xs text-green-600">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-orange-600"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">₹80,22,333</div>
                <p className="text-xs text-green-600">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-orange-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">3</div>
                <p className="text-xs text-green-600">1 completed this month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation amounts for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DonationChart />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
                <CardDescription>How temple funds are being utilized</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseDistribution />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Last 5 donations received by the temple</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentDonations />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Last 5 expenses incurred by the temple</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentExpenses />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
