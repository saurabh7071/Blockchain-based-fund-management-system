"use client"

import { useState } from "react"
import { ExternalLink, Download, Eye } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Chart } from "@/components/ui/chart"

export function ExpenseTable() {
  const [open, setOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)

  const expenses = [
    {
      id: 1,
      date: "2023-06-15",
      category: "Construction",
      description: "Temple Hall Renovation",
      amount: "₹5,50,000",
      receipt: "receipt-001.pdf",
      hash: "0x8f7d8a9b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    },
    {
      id: 2,
      date: "2023-07-02",
      category: "Food",
      description: "Prasadam Distribution",
      amount: "₹1,25,000",
      receipt: "receipt-002.pdf",
      hash: "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    },
    {
      id: 3,
      date: "2023-07-18",
      category: "Festival",
      description: "Janmashtami Celebration",
      amount: "₹2,75,000",
      receipt: "receipt-003.pdf",
      hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
    {
      id: 4,
      date: "2023-08-05",
      category: "Maintenance",
      description: "Electrical Work and Repairs",
      amount: "₹85,000",
      receipt: "receipt-004.pdf",
      hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    },
    {
      id: 5,
      date: "2023-08-22",
      category: "Food",
      description: "Monthly Food Distribution",
      amount: "₹1,15,000",
      receipt: "receipt-005.pdf",
      hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e",
    },
  ]

  const viewExpenseDetails = (expense) => {
    setSelectedExpense(expense)
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <Chart
          type="pie"
          options={{
            chart: {
              id: "expense-categories",
              toolbar: {
                show: false,
              },
            },
            labels: ["Construction", "Food", "Festival", "Maintenance", "Other"],
            colors: ["#f97316", "#84cc16", "#06b6d4", "#8b5cf6", "#ec4899"],
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
          series={[45, 20, 15, 12, 8]}
          height={250}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                  >
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{expense.description}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => viewExpenseDetails(expense)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download receipt</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View on blockchain</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>Complete information about this expense with verification details.</DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Date:</span>
                <span className="col-span-3">{formatDate(selectedExpense.date)}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Category:</span>
                <span className="col-span-3">
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                  >
                    {selectedExpense.category}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Description:</span>
                <span className="col-span-3">{selectedExpense.description}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Amount:</span>
                <span className="col-span-3 font-semibold">{selectedExpense.amount}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Receipt:</span>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">{selectedExpense.receipt}</span>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Blockchain Hash:</span>
                <div className="col-span-3">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
                    {selectedExpense.hash.substring(0, 18)}...
                  </code>
                  <Button variant="link" size="sm" className="text-orange-600 h-auto p-0 ml-2">
                    Verify on Blockchain
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}
