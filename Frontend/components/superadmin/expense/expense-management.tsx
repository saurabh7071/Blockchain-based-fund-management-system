"use client"

import { useState } from "react"
import { Search, ArrowUpDown, Filter, Download, Eye, Plus, Pencil, Trash2, FileText, Check, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DateRangePicker } from "@/components/superadmin/ui/date-range-picker"

interface Expense {
  id: string
  temple: string
  category: string
  amount: number
  description: string
  date: string
  approvedBy?: string
  blockchainHash?: string
  blockchainStatus?: "pending" | "confirmed" | "failed"
  status: "approved" | "pending" | "rejected"
  hasBill: boolean
  billUrl?: string
}

const expenses: Expense[] = [
  {
    id: "E45921",
    temple: "Shree Siddhivinayak Temple",
    category: "Maintenance",
    amount: 345000,
    description: "Temple premises cleaning and maintenance for May 2023",
    date: "2023-05-07T10:23:15",
    approvedBy: "Anil Patel",
    blockchainHash: "0x1BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC12E4F6",
    blockchainStatus: "confirmed",
    status: "approved",
    hasBill: true,
    billUrl: "/bill/E45921.pdf",
  },
  {
    id: "E45922",
    temple: "ISKCON Temple",
    category: "Renovation",
    amount: 1250000,
    description: "Main prayer hall renovation work - Phase 1",
    date: "2023-05-06T14:12:08",
    approvedBy: "Gopal Das",
    blockchainHash: "0x2BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC22F5G7",
    blockchainStatus: "confirmed",
    status: "approved",
    hasBill: true,
    billUrl: "/bill/E45922.pdf",
  },
  {
    id: "E45923",
    temple: "Golden Temple",
    category: "Food",
    amount: 520000,
    description: "Monthly langar provisions for May 2023",
    date: "2023-05-06T11:34:27",
    approvedBy: "Gurpreet Singh",
    blockchainHash: "0x3BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC32G6H8",
    blockchainStatus: "confirmed",
    status: "approved",
    hasBill: true,
    billUrl: "/bill/E45923.pdf",
  },
  {
    id: "E45924",
    temple: "Tirupati Balaji Temple",
    category: "Utilities",
    amount: 178000,
    description: "Electricity and water bills for April 2023",
    date: "2023-05-05T16:45:39",
    approvedBy: "Venkat Reddy",
    blockchainHash: "0x4BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC42H7I9",
    blockchainStatus: "confirmed",
    status: "approved",
    hasBill: true,
    billUrl: "/bill/E45924.pdf",
  },
  {
    id: "E45925",
    temple: "Kashi Vishwanath Temple",
    category: "Religious",
    amount: 235000,
    description: "Puja materials and prasad items for Shivratri festival",
    date: "2023-05-05T09:18:52",
    approvedBy: "Amit Mishra",
    blockchainHash: "0x5BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC52I8J0",
    blockchainStatus: "confirmed",
    status: "approved",
    hasBill: true,
    billUrl: "/bill/E45925.pdf",
  },
  {
    id: "E45926",
    temple: "Meenakshi Amman Temple",
    category: "Salary",
    amount: 450000,
    description: "Staff salary for April 2023",
    date: "2023-05-04T14:27:33",
    approvedBy: "Lakshmi Sundaram",
    blockchainHash: "0x6BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC62J9K1",
    blockchainStatus: "confirmed",
    status: "approved",
    hasBill: false,
  },
  {
    id: "E45927",
    temple: "Vaishno Devi Temple",
    category: "Security",
    amount: 380000,
    description: "Security personnel payment for April 2023",
    date: "2023-05-04T10:54:16",
    status: "pending",
    hasBill: true,
    billUrl: "/bill/E45927.pdf",
  },
  {
    id: "E45928",
    temple: "Jagannath Temple",
    category: "Renovation",
    amount: 1750000,
    description: "Outer wall repair and painting work",
    date: "2023-05-03T15:42:09",
    status: "pending",
    hasBill: true,
    billUrl: "/bill/E45928.pdf",
  },
  {
    id: "E45929",
    temple: "Shree Siddhivinayak Temple",
    category: "Equipment",
    amount: 275000,
    description: "New sound system installation",
    date: "2023-05-02T11:12:48",
    status: "rejected",
    hasBill: false,
  },
  {
    id: "E45930",
    temple: "ISKCON Temple",
    category: "Maintenance",
    amount: 190000,
    description: "Garden maintenance and new plantations",
    date: "2023-05-01T16:35:21",
    status: "pending",
    hasBill: true,
    billUrl: "/bill/E45930.pdf",
  },
]

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
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

const getExpenseStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Approved
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Pending
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Rejected
        </Badge>
      )
    default:
      return null
  }
}

const getBlockchainStatusBadge = (status?: string) => {
  if (!status) return null

  switch (status) {
    case "confirmed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Confirmed
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Pending
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Failed
        </Badge>
      )
    default:
      return null
  }
}

const expenseCategories = [
  "Maintenance",
  "Renovation",
  "Food",
  "Utilities",
  "Religious",
  "Salary",
  "Security",
  "Equipment",
  "Administrative",
  "Marketing",
  "Events",
  "Others",
]

export function ExpenseManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [templeFilter, setTempleFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter
    const matchesTemple = templeFilter === "all" || expense.temple === templeFilter
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
    const matchesSearch =
      expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.temple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesTemple && matchesCategory && matchesSearch
  })

  const uniqueTemples = Array.from(new Set(expenses.map((e) => e.temple)))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expense Management</h1>
          <p className="text-muted-foreground">Track and manage all temple expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Fill in the details to record a new expense.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="temple">Temple</Label>
                    <Select>
                      <SelectTrigger id="temple">
                        <SelectValue placeholder="Select temple" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueTemples.map((temple) => (
                          <SelectItem key={temple} value={temple}>
                            {temple}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Amount (INR)</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the expense purpose" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasBill" />
                  <label
                    htmlFor="hasBill"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Has bill/receipt
                  </label>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="billUpload">Upload Bill/Receipt (if available)</Label>
                  <Input id="billUpload" type="file" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="blockchain" />
                  <Label htmlFor="blockchain">Record on Blockchain for Transparency</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddExpenseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddExpenseDialogOpen(false)}>Submit Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="custom">Custom Range</TabsTrigger>
        </TabsList>
        <TabsContent value="custom" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <Label>Date Range</Label>
                  <DateRangePicker />
                </div>
                <Button className="md:mb-1">Apply Filter</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expenses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={templeFilter} onValueChange={setTempleFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Temple" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Temples</SelectItem>
              {uniqueTemples.map((temple) => (
                <SelectItem key={temple} value={temple}>
                  {temple}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {expenseCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">More filters</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center gap-2">
                    ID
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    Amount
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.temple}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={expense.description}>
                    {expense.description}
                  </TableCell>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(expense.amount)}</TableCell>
                  <TableCell>{getExpenseStatusBadge(expense.status)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedExpense(expense)
                          setIsDetailsDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      {expense.status === "pending" && (
                        <>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </>
                      )}
                      {expense.hasBill && (
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View bill</span>
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
            Showing <strong>{filteredExpenses.length}</strong> of <strong>{expenses.length}</strong> expenses
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>Complete information about this expense.</DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Expense ID</span>
                <span className="font-medium">{selectedExpense.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {getExpenseStatusBadge(selectedExpense.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{formatCurrency(selectedExpense.amount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Temple</span>
                <span className="font-medium">{selectedExpense.temple}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{selectedExpense.category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Description</span>
                <p className="rounded bg-muted p-2 text-sm">{selectedExpense.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium">{formatDate(selectedExpense.date)}</span>
              </div>
              {selectedExpense.approvedBy && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Approved By</span>
                  <span className="font-medium">{selectedExpense.approvedBy}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bill/Receipt</span>
                <div className="flex items-center gap-2">
                  {selectedExpense.hasBill ? (
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Bill
                    </Button>
                  ) : (
                    <span className="font-medium">Not Available</span>
                  )}
                </div>
              </div>
              {selectedExpense.blockchainHash && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Blockchain Status</span>
                    {getBlockchainStatusBadge(selectedExpense.blockchainStatus)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Blockchain Hash</span>
                    <div className="flex items-center justify-between gap-2">
                      <code className="flex-1 truncate rounded bg-muted px-2 py-1 text-xs">
                        {selectedExpense.blockchainHash}
                      </code>
                      <Button size="sm" variant="outline">
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {selectedExpense.status === "pending" && (
                <div className="mt-2 flex items-center justify-end gap-2">
                  <Button variant="destructive">
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
