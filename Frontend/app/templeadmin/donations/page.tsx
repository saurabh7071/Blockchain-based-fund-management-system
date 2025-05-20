"use client"

import { useState } from "react"
import { CalendarIcon, Download, ExternalLink, Filter, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"

const donations = [
  {
    id: "DON-001",
    donor: "Rajesh Sharma",
    amount: "₹25,000",
    date: "2023-05-17",
    mode: "UPI",
    hash: "0x8f7d...3b2a",
    status: "Verified",
  },
  {
    id: "DON-002",
    donor: "Priya Patel",
    amount: "₹10,000",
    date: "2023-05-16",
    mode: "Credit Card",
    hash: "0x2a1b...9c4d",
    status: "Verified",
  },
  {
    id: "DON-003",
    donor: "Amit Singh",
    amount: "₹50,000",
    date: "2023-05-15",
    mode: "Bank Transfer",
    hash: "0x7e3f...5d2c",
    status: "Verified",
  },
  {
    id: "DON-004",
    donor: "Sunita Gupta",
    amount: "₹5,000",
    date: "2023-05-14",
    mode: "UPI",
    hash: "0x4b2c...8e1a",
    status: "Verified",
  },
  {
    id: "DON-005",
    donor: "Anonymous",
    amount: "₹15,000",
    date: "2023-05-13",
    mode: "Cash",
    hash: "0x9d4e...2f7b",
    status: "Verified",
  },
  {
    id: "DON-006",
    donor: "Vikram Mehta",
    amount: "₹30,000",
    date: "2023-05-12",
    mode: "Bank Transfer",
    hash: "0x3c5d...7e9f",
    status: "Verified",
  },
  {
    id: "DON-007",
    donor: "Neha Joshi",
    amount: "₹8,000",
    date: "2023-05-11",
    mode: "UPI",
    hash: "0x6b8c...1d3e",
    status: "Verified",
  },
  {
    id: "DON-008",
    donor: "Rahul Verma",
    amount: "₹12,000",
    date: "2023-05-10",
    mode: "Credit Card",
    hash: "0x5a7b...9c1d",
    status: "Verified",
  },
  {
    id: "DON-009",
    donor: "Meera Kapoor",
    amount: "₹20,000",
    date: "2023-05-09",
    mode: "UPI",
    hash: "0x2d4e...6f8g",
    status: "Verified",
  },
  {
    id: "DON-010",
    donor: "Sanjay Kumar",
    amount: "₹35,000",
    date: "2023-05-08",
    mode: "Bank Transfer",
    hash: "0x9h1i...3j5k",
    status: "Verified",
  },
]

export default function DonationsPage() {
  const [date, setDate] = useState<Date>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(donations.length / itemsPerPage)
  const currentDonations = donations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Donations</h2>
            <div className="flex items-center gap-2">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Donation Tracker</CardTitle>
                <CardDescription>Track and manage all donations received by the temple</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search donations..." className="h-9 w-full sm:w-[300px]" />
                      <Button variant="outline" size="sm" className="h-9 gap-1">
                        <Search className="h-4 w-4" />
                        <span className="hidden sm:inline-block">Search</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 gap-1">
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
                          <Button variant="outline" size="sm" className="h-9 gap-1">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline-block">Filter</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Payment Mode</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>UPI</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Credit Card</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Bank Transfer</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Cash</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="hidden md:table-cell">Payment Mode</TableHead>
                          <TableHead className="hidden md:table-cell">Blockchain Hash</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentDonations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">{donation.id}</TableCell>
                            <TableCell>{donation.donor}</TableCell>
                            <TableCell>{donation.amount}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(donation.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{donation.mode}</TableCell>
                            <TableCell className="hidden md:table-cell">{donation.hash}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {donation.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View on blockchain</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
