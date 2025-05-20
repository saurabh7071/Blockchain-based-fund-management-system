"use client"

import { useState } from "react"
import { Download, FileText, Calendar, TrendingUp, Filter, RefreshCcw, Mail, Ban, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/superadmin/ui/date-range-picker"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for reports
const donationsByTemple = [
  { name: "Shree Siddhivinayak Temple", value: 4235000 },
  { name: "ISKCON Temple", value: 3920000 },
  { name: "Tirupati Balaji Temple", value: 3215000 },
  { name: "Golden Temple", value: 2980000 },
  { name: "Kashi Vishwanath Temple", value: 2650000 },
  { name: "Others", value: 8500000 },
]

const donationTrends = [
  { month: "Jan", donations: 420000, expenses: 380000 },
  { month: "Feb", donations: 540000, expenses: 420000 },
  { month: "Mar", donations: 680000, expenses: 510000 },
  { month: "Apr", donations: 720000, expenses: 610000 },
  { month: "May", donations: 890000, expenses: 730000 },
  { month: "Jun", donations: 970000, expenses: 850000 },
  { month: "Jul", donations: 1100000, expenses: 940000 },
  { month: "Aug", donations: 1250000, expenses: 1050000 },
  { month: "Sep", donations: 1080000, expenses: 920000 },
  { month: "Oct", donations: 930000, expenses: 840000 },
  { month: "Nov", donations: 870000, expenses: 750000 },
  { month: "Dec", donations: 1000000, expenses: 870000 },
]

const userGrowth = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 200 },
  { month: "Apr", users: 230 },
  { month: "May", users: 290 },
  { month: "Jun", users: 310 },
  { month: "Jul", users: 350 },
  { month: "Aug", users: 390 },
  { month: "Sep", users: 420 },
  { month: "Oct", users: 450 },
  { month: "Nov", users: 480 },
  { month: "Dec", users: 520 },
]

const expenseCategories = [
  { name: "Maintenance", value: 2500000 },
  { name: "Renovation", value: 3500000 },
  { name: "Food", value: 1800000 },
  { name: "Utilities", value: 1200000 },
  { name: "Religious", value: 2200000 },
  { name: "Salary", value: 3800000 },
  { name: "Others", value: 1500000 },
]

const scheduledReports = [
  {
    id: "SR001",
    name: "Monthly Financial Summary",
    frequency: "Monthly",
    recipients: ["admin@temple.org", "finance@temple.org"],
    lastSent: "2023-04-30T10:00:00",
    nextScheduled: "2023-05-31T10:00:00",
    format: "PDF",
    status: "active",
  },
  {
    id: "SR002",
    name: "Weekly Donation Report",
    frequency: "Weekly",
    recipients: ["admin@temple.org", "donations@temple.org"],
    lastSent: "2023-05-07T10:00:00",
    nextScheduled: "2023-05-14T10:00:00",
    format: "Excel",
    status: "active",
  },
  {
    id: "SR003",
    name: "Daily Temple Activity",
    frequency: "Daily",
    recipients: ["admin@temple.org", "operations@temple.org"],
    lastSent: "2023-05-08T18:00:00",
    nextScheduled: "2023-05-09T18:00:00",
    format: "PDF",
    status: "active",
  },
  {
    id: "SR004",
    name: "Quarterly Audit Report",
    frequency: "Quarterly",
    recipients: ["admin@temple.org", "audit@temple.org", "trustees@temple.org"],
    lastSent: "2023-03-31T10:00:00",
    nextScheduled: "2023-06-30T10:00:00",
    format: "PDF",
    status: "active",
  },
  {
    id: "SR005",
    name: "User Growth Analysis",
    frequency: "Monthly",
    recipients: ["admin@temple.org", "marketing@temple.org"],
    lastSent: "2023-04-30T10:00:00",
    nextScheduled: "2023-05-31T10:00:00",
    format: "Excel",
    status: "paused",
  },
]

const auditLogs = [
  {
    id: "AL10001",
    action: "Export Financial Report",
    user: "Super Admin",
    timestamp: "2023-05-08T14:23:15",
    details: "Exported monthly financial report for April 2023",
    ip: "192.168.1.100",
  },
  {
    id: "AL10002",
    action: "Generate Donation Report",
    user: "Finance Manager",
    timestamp: "2023-05-08T12:45:30",
    details: "Generated donation report for ISKCON Temple (Apr 15 - May 7)",
    ip: "192.168.1.101",
  },
  {
    id: "AL10003",
    action: "Schedule New Report",
    user: "Super Admin",
    timestamp: "2023-05-07T16:12:45",
    details: "Created new scheduled report: Weekly Expense Summary",
    ip: "192.168.1.100",
  },
  {
    id: "AL10004",
    action: "Modify Report Template",
    user: "Super Admin",
    timestamp: "2023-05-07T11:30:22",
    details: "Modified template for Monthly Financial Summary",
    ip: "192.168.1.100",
  },
  {
    id: "AL10005",
    action: "Export User Report",
    user: "User Manager",
    timestamp: "2023-05-06T15:48:33",
    details: "Exported user growth report for Q1 2023",
    ip: "192.168.1.102",
  },
]

// Colors for charts
const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function ReportsManagement() {
  const [isScheduleReportDialogOpen, setIsScheduleReportDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and analyze reports across all temples</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isScheduleReportDialogOpen} onOpenChange={setIsScheduleReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Schedule New Report</DialogTitle>
                <DialogDescription>Set up automated report generation and delivery.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="reportName">Report Name</Label>
                    <Select>
                      <SelectTrigger id="reportName">
                        <SelectValue placeholder="Select report" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Summary</SelectItem>
                        <SelectItem value="donation">Donation Report</SelectItem>
                        <SelectItem value="expense">Expense Report</SelectItem>
                        <SelectItem value="user">User Growth Report</SelectItem>
                        <SelectItem value="temple">Temple Activity Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="recipients">Recipients (comma separated)</Label>
                  <input
                    id="recipients"
                    placeholder="admin@temple.org, finance@temple.org"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="format">Format</Label>
                    <Select>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="startDate">Start Date</Label>
                    <input
                      id="startDate"
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="includeCharts" defaultChecked />
                  <Label htmlFor="includeCharts">Include charts and visualizations</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsScheduleReportDialogOpen(false)}>Schedule Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex flex-1 items-center space-x-2">
            <div className="flex-1">
              <Label>Date Range</Label>
              <DateRangePicker />
            </div>
            <div className="w-[200px]">
              <Label>Temple</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Temples" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Temples</SelectItem>
                  <SelectItem value="siddhivinayak">Shree Siddhivinayak Temple</SelectItem>
                  <SelectItem value="iskcon">ISKCON Temple</SelectItem>
                  <SelectItem value="tirupati">Tirupati Balaji Temple</SelectItem>
                  <SelectItem value="golden">Golden Temple</SelectItem>
                  <SelectItem value="kashi">Kashi Vishwanath Temple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-6">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button variant="outline" className="mt-6">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <TabsContent value="financial" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(25500000)}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(16500000)}</div>
                <p className="text-xs text-muted-foreground">+8.3% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(9000000)}</div>
                <p className="text-xs text-muted-foreground">+18.7% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Donation</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(12500)}</div>
                <p className="text-xs text-muted-foreground">+5.2% from last year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Overview (2023)</CardTitle>
              <CardDescription>Monthly comparison of donations and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={donationTrends}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="donations"
                      name="Donations"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      name="Expenses"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Financial Report
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>Recent report generation and access logs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.slice(0, 5).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Logs
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
                <CardDescription>Generate common reports with one click</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Monthly Financial Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Donation Report by Temple
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Expense Breakdown
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  User Growth Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Campaign Performance Report
                </Button>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Custom Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="donations" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Donations by Temple</CardTitle>
                <CardDescription>Distribution of donations across temples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={donationsByTemple}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {donationsByTemple.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Donation Distribution Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={donationTrends}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="donations" name="Donations" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Donation Trends Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Donors</CardTitle>
              <CardDescription>Users who have contributed the most</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Donations</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead>Preferred Temple</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Suresh Patel</TableCell>
                    <TableCell>suresh.patel@example.com</TableCell>
                    <TableCell>{formatCurrency(150000)}</TableCell>
                    <TableCell>08 May, 2023</TableCell>
                    <TableCell>Shree Siddhivinayak Temple</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vikram Singh</TableCell>
                    <TableCell>vikram.singh@example.com</TableCell>
                    <TableCell>{formatCurrency(85000)}</TableCell>
                    <TableCell>08 May, 2023</TableCell>
                    <TableCell>Golden Temple</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ramesh Kumar</TableCell>
                    <TableCell>ramesh.kumar@example.com</TableCell>
                    <TableCell>{formatCurrency(75000)}</TableCell>
                    <TableCell>08 May, 2023</TableCell>
                    <TableCell>ISKCON Temple</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Neha Gupta</TableCell>
                    <TableCell>neha.gupta@example.com</TableCell>
                    <TableCell>{formatCurrency(65000)}</TableCell>
                    <TableCell>01 May, 2023</TableCell>
                    <TableCell>Vaishno Devi Temple</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Priya Sharma</TableCell>
                    <TableCell>priya.sharma@example.com</TableCell>
                    <TableCell>{formatCurrency(35000)}</TableCell>
                    <TableCell>08 May, 2023</TableCell>
                    <TableCell>Tirupati Balaji Temple</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Top Donors Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Expense Categories Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Trends</CardTitle>
                <CardDescription>Monthly expense trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={donationTrends}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Expense Trends Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Expenses</CardTitle>
              <CardDescription>Largest expenses across all temples</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Expense ID</TableHead>
                    <TableHead>Temple</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">E45922</TableCell>
                    <TableCell>ISKCON Temple</TableCell>
                    <TableCell>Renovation</TableCell>
                    <TableCell>Main prayer hall renovation work - Phase 1</TableCell>
                    <TableCell>06 May, 2023</TableCell>
                    <TableCell className="text-right">{formatCurrency(1250000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">E45928</TableCell>
                    <TableCell>Jagannath Temple</TableCell>
                    <TableCell>Renovation</TableCell>
                    <TableCell>Outer wall repair and painting work</TableCell>
                    <TableCell>03 May, 2023</TableCell>
                    <TableCell className="text-right">{formatCurrency(1750000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">E45923</TableCell>
                    <TableCell>Golden Temple</TableCell>
                    <TableCell>Food</TableCell>
                    <TableCell>Monthly langar provisions for May 2023</TableCell>
                    <TableCell>06 May, 2023</TableCell>
                    <TableCell className="text-right">{formatCurrency(520000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">E45926</TableCell>
                    <TableCell>Meenakshi Amman Temple</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Staff salary for April 2023</TableCell>
                    <TableCell>04 May, 2023</TableCell>
                    <TableCell className="text-right">{formatCurrency(450000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">E45927</TableCell>
                    <TableCell>Vaishno Devi Temple</TableCell>
                    <TableCell>Security</TableCell>
                    <TableCell>Security personnel payment for April 2023</TableCell>
                    <TableCell>04 May, 2023</TableCell>
                    <TableCell className="text-right">{formatCurrency(380000)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Top Expenses Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userGrowth}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="users"
                        name="New Users"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download User Growth Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "Devotees", value: 320 },
                          { name: "Donors", value: 150 },
                          { name: "Volunteers", value: 40 },
                          { name: "Admins", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: "Devotees", value: 320 },
                          { name: "Donors", value: 150 },
                          { name: "Volunteers", value: 40 },
                          { name: "Admins", value: 10 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download User Distribution Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Recent user engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Last 7 Days</TableHead>
                    <TableHead>Last 30 Days</TableHead>
                    <TableHead>Last 90 Days</TableHead>
                    <TableHead>YTD</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">New Registrations</TableCell>
                    <TableCell>24</TableCell>
                    <TableCell>86</TableCell>
                    <TableCell>245</TableCell>
                    <TableCell>320</TableCell>
                    <TableCell className="text-green-600">+12.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Active Users</TableCell>
                    <TableCell>156</TableCell>
                    <TableCell>320</TableCell>
                    <TableCell>410</TableCell>
                    <TableCell>480</TableCell>
                    <TableCell className="text-green-600">+8.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Donation Conversion</TableCell>
                    <TableCell>18.5%</TableCell>
                    <TableCell>22.3%</TableCell>
                    <TableCell>24.1%</TableCell>
                    <TableCell>25.8%</TableCell>
                    <TableCell className="text-green-600">+3.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Avg. Session Duration</TableCell>
                    <TableCell>4m 12s</TableCell>
                    <TableCell>3m 58s</TableCell>
                    <TableCell>4m 05s</TableCell>
                    <TableCell>4m 10s</TableCell>
                    <TableCell className="text-green-600">+5.1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mobile Users</TableCell>
                    <TableCell>68.2%</TableCell>
                    <TableCell>70.5%</TableCell>
                    <TableCell>72.1%</TableCell>
                    <TableCell>73.4%</TableCell>
                    <TableCell className="text-green-600">+4.8%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download User Activity Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated reports configured for delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Last Sent</TableHead>
                    <TableHead>Next Scheduled</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={report.recipients.join(", ")}>
                          {report.recipients.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(report.lastSent)}</TableCell>
                      <TableCell>{formatDate(report.nextScheduled)}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "active"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                          }
                        >
                          {report.status === "active" ? "Active" : "Paused"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Send Now</span>
                          </Button>
                          {report.status === "active" ? (
                            <Button variant="ghost" size="sm">
                              <Ban className="h-4 w-4" />
                              <span className="sr-only">Pause</span>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Activate</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{scheduledReports.length}</strong> scheduled reports
              </div>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
