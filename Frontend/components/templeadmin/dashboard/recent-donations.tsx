"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"

const recentDonations = [
  {
    donor: "Rajesh Sharma",
    amount: "₹25,000",
    date: "2023-05-17",
    mode: "UPI",
    hash: "0x8f7d...3b2a",
    status: "Verified",
  },
  {
    donor: "Priya Patel",
    amount: "₹10,000",
    date: "2023-05-16",
    mode: "Credit Card",
    hash: "0x2a1b...9c4d",
    status: "Verified",
  },
  {
    donor: "Amit Singh",
    amount: "₹50,000",
    date: "2023-05-15",
    mode: "Bank Transfer",
    hash: "0x7e3f...5d2c",
    status: "Verified",
  },
  {
    donor: "Sunita Gupta",
    amount: "₹5,000",
    date: "2023-05-14",
    mode: "UPI",
    hash: "0x4b2c...8e1a",
    status: "Verified",
  },
  {
    donor: "Anonymous",
    amount: "₹15,000",
    date: "2023-05-13",
    mode: "Cash",
    hash: "0x9d4e...2f7b",
    status: "Verified",
  },
]

export function RecentDonations() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(recentDonations.length / itemsPerPage)
  const currentDonations = recentDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Donor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Mode</TableHead>
            <TableHead className="text-right">Blockchain</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDonations.map((donation) => (
            <TableRow key={donation.hash}>
              <TableCell className="font-medium">{donation.donor}</TableCell>
              <TableCell>{donation.amount}</TableCell>
              <TableCell className="hidden md:table-cell">{new Date(donation.date).toLocaleDateString()}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                  {donation.mode}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View on blockchain</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </>
  )
}
