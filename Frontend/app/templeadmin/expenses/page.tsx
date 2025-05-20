"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Download, ExternalLink, Filter, Plus, Search, Upload } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"
import { useToast } from "@/components/ui/use-toast"

const expenses = [
  {
    id: "EXP-001",
    category: "Infrastructure",
    amount: "₹1,50,000",
    date: "2023-05-17",
    description: "Temple renovation work",
    hash: "0x8f7d...3b2a",
    status: "Verified",
  },
  {
    id: "EXP-002",
    category: "Food & Prasad",
    amount: "₹25,000",
    date: "2023-05-16",
    description: "Daily prasad ingredients",
    hash: "0x2a1b...9c4d",
    status: "Verified",
  },
  {
    id: "EXP-003",
    category: "Salaries",
    amount: "₹75,000",
    date: "2023-05-15",
    description: "Staff monthly salaries",
    hash: "0x7e3f...5d2c",
    status: "Verified",
  },
  {
    id: "EXP-004",
    category: "Events",
    amount: "₹50,000",
    date: "2023-05-14",
    description: "Ram Navami celebration",
    hash: "0x4b2c...8e1a",
    status: "Verified",
  },
  {
    id: "EXP-005",
    category: "Utilities",
    amount: "₹15,000",
    date: "2023-05-13",
    description: "Electricity and water bills",
    hash: "0x9d4e...2f7b",
    status: "Verified",
  },
  {
    id: "EXP-006",
    category: "Infrastructure",
    amount: "₹80,000",
    date: "2023-05-12",
    description: "Garden maintenance",
    hash: "0x3c5d...7e9f",
    status: "Verified",
  },
  {
    id: "EXP-007",
    category: "Food & Prasad",
    amount: "₹18,000",
    date: "2023-05-11",
    description: "Special prasad for festival",
    hash: "0x6b8c...1d3e",
    status: "Verified",
  },
  {
    id: "EXP-008",
    category: "Events",
    amount: "₹35,000",
    date: "2023-05-10",
    description: "Cultural program arrangements",
    hash: "0x5a7b...9c1d",
    status: "Verified",
  },
  {
    id: "EXP-009",
    category: "Utilities",
    amount: "₹8,000",
    date: "2023-05-09",
    description: "Internet and phone bills",
    hash: "0x2d4e...6f8g",
    status: "Verified",
  },
  {
    id: "EXP-010",
    category: "Other",
    amount: "₹12,000",
    date: "2023-05-08",
    description: "Miscellaneous expenses",
    hash: "0x9h1i...3j5k",
    status: "Verified",
  },
]

export default function ExpensesPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [expenseForm, setExpenseForm] = useState({
    category: "",
    amount: "",
    description: "",
  })

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setExpenseForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Expense Added",
        description: `A new expense of ${expenseForm.amount} has been added successfully.`,
        variant: "success",
        duration: 3000,
      })

      setIsDialogOpen(false)
      setExpenseForm({
        category: "",
        amount: "",
        description: "",
      })
    } catch (error) {
      toast({
        title: "Failed to add expense",
        description: "An error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-orange-900">Expenses</h2>
            <div className="flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleExpenseSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                      <DialogDescription>
                        Enter the details of the expense. All expenses will be verified and pushed to the blockchain.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          name="category"
                          value={expenseForm.category}
                          onValueChange={(value) => setExpenseForm((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="food">Food & Prasad</SelectItem>
                            <SelectItem value="salaries">Salaries</SelectItem>
                            <SelectItem value="events">Events</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="text"
                          placeholder="Enter amount"
                          value={expenseForm.amount}
                          onChange={handleExpenseChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          type="text"
                          placeholder="Enter description"
                          value={expenseForm.description}
                          onChange={handleExpenseChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="receipt">Upload Receipt</Label>
                        <div className="flex items-center gap-2">
                          <Input id="receipt" type="file" className="hidden" />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                            onClick={() => document.getElementById("receipt")?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit Expense"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
                onClick={() => {
                  toast({
                    title: "Export Started",
                    description: "Your expense data is being exported to CSV format.",
                    variant: "info",
                    duration: 3000,
                  })
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Expense Manager</CardTitle>
                <CardDescription>Track and manage all expenses incurred by the temple</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search expenses..." className="h-9 w-full sm:w-[300px]" />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        <Search className="h-4 w-4" />
                        <span className="hidden sm:inline-block">Search</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 gap-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                          >
                            <CalendarIcon className="h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 gap-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                          >
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline-block">Filter</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Category</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Infrastructure</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Food & Prasad</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Salaries</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Events</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Utilities</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Other</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="hidden md:table-cell">Description</TableHead>
                          <TableHead className="hidden md:table-cell">Blockchain Hash</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenses.map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell className="font-medium">{expense.id}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(expense.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{expense.description}</TableCell>
                            <TableCell className="hidden md:table-cell">{expense.hash}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {expense.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                onClick={() => {
                                  toast({
                                    title: "Blockchain Verification",
                                    description: `Expense ${expense.id} verified on blockchain.`,
                                    variant: "info",
                                    duration: 3000,
                                  })
                                }}
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View on blockchain</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "Navigation",
                              description: "Navigated to previous page",
                              variant: "info",
                              duration: 1500,
                            })
                          }}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          isActive
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "Navigation",
                              description: "Navigated to page 10",
                              variant: "info",
                              duration: 1500,
                            })
                          }}
                        >
                          10
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "Navigation",
                              description: "Navigated to next page",
                              variant: "info",
                              duration: 1500,
                            })
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
