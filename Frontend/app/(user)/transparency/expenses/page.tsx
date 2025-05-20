"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Chart } from "@/components/ui/chart"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { BlockchainVerifier } from "@/components/blockchain-verifier"

export default function ExpensesPage() {
  const [selectedTemple, setSelectedTemple] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVerifierOpen, setIsVerifierOpen] = useState(false)
  const [currentTxHash, setCurrentTxHash] = useState("")

  const expenses = [
    {
      id: "EXP-001",
      date: "2023-08-15",
      temple: "ISKCON Temple",
      category: "Construction",
      description: "Temple Hall Renovation - Phase 1",
      amount: "₹5,50,000",
      receipt: "receipt-001.pdf",
      hash: "0x8f7d8a9b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
      status: "verified",
    },
    {
      id: "EXP-002",
      date: "2023-07-22",
      temple: "Shri Siddhivinayak Temple",
      category: "Food",
      description: "Monthly Prasadam Distribution Program",
      amount: "₹1,25,000",
      receipt: "receipt-002.pdf",
      hash: "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
      status: "verified",
    },
    {
      id: "EXP-003",
      date: "2023-09-05",
      temple: "Kashi Vishwanath Temple",
      category: "Festival",
      description: "Maha Shivaratri Celebration Expenses",
      amount: "₹2,75,000",
      receipt: "receipt-003.pdf",
      hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      status: "verified",
    },
    {
      id: "EXP-004",
      date: "2023-08-28",
      temple: "Meenakshi Amman Temple",
      category: "Maintenance",
      description: "Electrical Work and Lighting Upgrades",
      amount: "₹85,000",
      receipt: "receipt-004.pdf",
      hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
      status: "verified",
    },
    {
      id: "EXP-005",
      date: "2023-09-12",
      temple: "Tirupati Balaji Temple",
      category: "Education",
      description: "Vedic School Quarterly Expenses",
      amount: "₹3,20,000",
      receipt: "receipt-005.pdf",
      hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e",
      status: "verified",
    },
    {
      id: "EXP-006",
      date: "2023-09-18",
      temple: "ISKCON Temple",
      category: "Healthcare",
      description: "Free Medical Camp Organization",
      amount: "₹1,75,000",
      receipt: "receipt-006.pdf",
      hash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
      status: "pending",
    },
    {
      id: "EXP-007",
      date: "2023-09-20",
      temple: "Golden Temple",
      category: "Food",
      description: "Langar Service Monthly Expenses",
      amount: "₹4,50,000",
      receipt: "receipt-007.pdf",
      hash: "0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c",
      status: "verified",
    },
    {
      id: "EXP-008",
      date: "2023-09-25",
      temple: "Somnath Temple",
      category: "Construction",
      description: "Visitor Facilities Enhancement Project",
      amount: "₹7,80,000",
      receipt: "receipt-008.pdf",
      hash: "0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
      status: "pending",
    },
  ]

  const filteredExpenses = expenses.filter((expense) => {
    // Filter by temple
    if (selectedTemple !== "all" && expense.temple !== selectedTemple) return false

    // Filter by category
    if (selectedCategory !== "all" && expense.category !== selectedCategory) return false

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      const expenseDate = new Date(expense.date)
      if (expenseDate < dateRange.from || expenseDate > dateRange.to) return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        expense.id.toLowerCase().includes(query) ||
        expense.description.toLowerCase().includes(query) ||
        expense.temple.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense)
    setIsDialogOpen(true)
  }

  const handleVerifyOnBlockchain = (hash) => {
    setCurrentTxHash(hash)
    setIsVerifierOpen(true)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Calculate total expenses by category for chart
  const expensesByCategory = {}
  expenses.forEach((expense) => {
    const amount = Number.parseFloat(expense.amount.replace("₹", "").replace(/,/g, ""))
    if (expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] += amount
    } else {
      expensesByCategory[expense.category] = amount
    }
  })

  const chartCategories = Object.keys(expensesByCategory)
  const chartData = Object.values(expensesByCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/transparency">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transparency
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Expense Tracking</h1>
        <p className="text-muted-foreground">
          Complete transparency of all temple expenses with blockchain verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine expense records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search expenses..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Temple</Label>
                <Select value={selectedTemple} onValueChange={setSelectedTemple}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select temple" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Temples</SelectItem>
                    <SelectItem value="ISKCON Temple">ISKCON Temple</SelectItem>
                    <SelectItem value="Shri Siddhivinayak Temple">Shri Siddhivinayak Temple</SelectItem>
                    <SelectItem value="Kashi Vishwanath Temple">Kashi Vishwanath Temple</SelectItem>
                    <SelectItem value="Meenakshi Amman Temple">Meenakshi Amman Temple</SelectItem>
                    <SelectItem value="Tirupati Balaji Temple">Tirupati Balaji Temple</SelectItem>
                    <SelectItem value="Golden Temple">Golden Temple</SelectItem>
                    <SelectItem value="Somnath Temple">Somnath Temple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <DatePickerWithRange setDateRange={setDateRange} />
              </div>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => {
                  setSelectedTemple("all")
                  setSelectedCategory("all")
                  setDateRange({ from: null, to: null })
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="list">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Records</CardTitle>
                  <CardDescription>
                    Showing {filteredExpenses.length} of {expenses.length} records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="hidden md:table-cell">Temple</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="hidden lg:table-cell">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredExpenses.length > 0 ? (
                          filteredExpenses.map((expense) => (
                            <TableRow key={expense.id}>
                              <TableCell className="font-medium">{expense.id}</TableCell>
                              <TableCell>{formatDate(expense.date)}</TableCell>
                              <TableCell className="hidden md:table-cell">{expense.temple}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    expense.category === "Construction"
                                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                                      : expense.category === "Food"
                                        ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                                        : expense.category === "Festival"
                                          ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
                                          : expense.category === "Maintenance"
                                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                                            : expense.category === "Education"
                                              ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
                                              : "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                                  }
                                >
                                  {expense.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">{expense.amount}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={expense.status === "verified" ? "outline" : "secondary"}
                                  className={
                                    expense.status === "verified"
                                      ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                                  }
                                >
                                  {expense.status === "verified" ? "Verified" : "Pending"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleViewDetails(expense)}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-4 w-4"
                                    >
                                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                      <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span className="sr-only">View details</span>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download receipt</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleVerifyOnBlockchain(expense.hash)}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">Verify on blockchain</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No expenses found matching your filters
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Analytics</CardTitle>
                  <CardDescription>Visual breakdown of temple expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Expenses by Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Chart
                          type="pie"
                          options={{
                            chart: {
                              id: "expense-categories",
                              toolbar: {
                                show: false,
                              },
                            },
                            labels: chartCategories,
                            colors: ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#6366f1", "#f97316"],
                            legend: {
                              position: "bottom",
                            },
                            responsive: [
                              {
                                breakpoint: 480,
                                options: {
                                  chart: {
                                    width: 300,
                                  },
                                  legend: {
                                    position: "bottom",
                                  },
                                },
                              },
                            ],
                          }}
                          series={chartData}
                          height={300}
                        />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Monthly Expense Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Chart
                          type="bar"
                          options={{
                            chart: {
                              id: "monthly-expenses",
                              toolbar: {
                                show: false,
                              },
                            },
                            xaxis: {
                              categories: ["May", "Jun", "Jul", "Aug", "Sep"],
                            },
                            colors: ["#f97316"],
                            plotOptions: {
                              bar: {
                                borderRadius: 4,
                              },
                            },
                          }}
                          series={[
                            {
                              name: "Expenses",
                              data: [850000, 1200000, 1450000, 1650000, 2050000],
                            },
                          ]}
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Expense Distribution by Temple</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Chart
                        type="bar"
                        options={{
                          chart: {
                            id: "temple-expenses",
                            stacked: true,
                            toolbar: {
                              show: false,
                            },
                          },
                          xaxis: {
                            categories: [
                              "ISKCON Temple",
                              "Siddhivinayak",
                              "Kashi Vishwanath",
                              "Meenakshi Amman",
                              "Tirupati Balaji",
                              "Golden Temple",
                              "Somnath",
                            ],
                          },
                          colors: ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#6366f1", "#f97316"],
                          plotOptions: {
                            bar: {
                              horizontal: false,
                              borderRadius: 4,
                            },
                          },
                          legend: {
                            position: "bottom",
                          },
                        }}
                        series={[
                          {
                            name: "Construction",
                            data: [550000, 0, 0, 0, 0, 0, 780000],
                          },
                          {
                            name: "Food",
                            data: [0, 125000, 0, 0, 0, 450000, 0],
                          },
                          {
                            name: "Festival",
                            data: [0, 0, 275000, 0, 0, 0, 0],
                          },
                          {
                            name: "Maintenance",
                            data: [0, 0, 0, 85000, 0, 0, 0],
                          },
                          {
                            name: "Education",
                            data: [0, 0, 0, 0, 320000, 0, 0],
                          },
                          {
                            name: "Healthcare",
                            data: [175000, 0, 0, 0, 0, 0, 0],
                          },
                        ]}
                        height={400}
                      />
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Expense Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>Complete information about this expense with verification details.</DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{selectedExpense.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(selectedExpense.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={selectedExpense.status === "verified" ? "outline" : "secondary"}
                    className={
                      selectedExpense.status === "verified"
                        ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                    }
                  >
                    {selectedExpense.status === "verified" ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Temple</p>
                <p className="font-medium">{selectedExpense.temple}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <Badge
                  variant="outline"
                  className={
                    selectedExpense.category === "Construction"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                      : selectedExpense.category === "Food"
                        ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        : selectedExpense.category === "Festival"
                          ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
                          : selectedExpense.category === "Maintenance"
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                            : selectedExpense.category === "Education"
                              ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
                              : "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                  }
                >
                  {selectedExpense.category}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedExpense.description}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-xl font-bold">{selectedExpense.amount}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Receipt</p>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="mr-2 h-3 w-3" />
                    Download Receipt
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Blockchain Verification</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => {
                      setIsDialogOpen(false)
                      handleVerifyOnBlockchain(selectedExpense.hash)
                    }}
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Verify on Blockchain
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium mb-1">Transaction Hash</p>
                <code className="text-xs break-all">{selectedExpense.hash}</code>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Blockchain Verification Dialog */}
      <Dialog open={isVerifierOpen} onOpenChange={setIsVerifierOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Blockchain Verification</DialogTitle>
            <DialogDescription>Verify the authenticity of this transaction on the blockchain</DialogDescription>
          </DialogHeader>
          <BlockchainVerifier transactionHash={currentTxHash} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const Label = ({ children, htmlFor, className = "", ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
