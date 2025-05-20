"use client"

import { useState } from "react"
import { Search, ArrowUpDown, Filter, Download, Eye, RefreshCcw } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "@/components/superadmin/ui/date-range-picker"

interface Donation {
  id: string
  donor: {
    name: string
    email: string
    phone?: string
    anonymous: boolean
  }
  amount: number
  temple: string
  campaignId?: string
  campaignName?: string
  date: string
  paymentMode: "online" | "cash" | "bank_transfer" | "crypto"
  paymentId?: string
  blockchainHash?: string
  blockchainStatus?: "pending" | "confirmed" | "failed"
  status: "completed" | "pending" | "failed" | "refunded"
}

const donations: Donation[] = [
  {
    id: "D78924",
    donor: {
      name: "Ramesh Kumar",
      email: "ramesh.kumar@example.com",
      phone: "+91 9876543210",
      anonymous: false,
    },
    amount: 25000,
    temple: "ISKCON Temple",
    campaignName: "Diwali Celebration Fund",
    date: "2023-05-08T14:23:15",
    paymentMode: "online",
    paymentId: "PAY-75839264",
    blockchainHash: "0x7BF98D1B85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC11A1C3",
    blockchainStatus: "confirmed",
    status: "completed",
  },
  {
    id: "D78923",
    donor: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 9876543211",
      anonymous: false,
    },
    amount: 15000,
    temple: "Tirupati Balaji Temple",
    date: "2023-05-08T13:54:09",
    paymentMode: "online",
    paymentId: "PAY-75839263",
    blockchainHash: "0x9CF65D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AB31B3D5",
    blockchainStatus: "confirmed",
    status: "completed",
  },
  {
    id: "D78922",
    donor: {
      name: "Suresh Patel",
      email: "suresh.patel@example.com",
      phone: "+91 9876543212",
      anonymous: false,
    },
    amount: 50000,
    temple: "Shree Siddhivinayak Temple",
    campaignName: "Temple Renovation",
    date: "2023-05-08T12:32:47",
    paymentMode: "bank_transfer",
    paymentId: "BANK-75839262",
    blockchainHash: "0x3AFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC21C2E7",
    blockchainStatus: "confirmed",
    status: "completed",
  },
  {
    id: "D78921",
    donor: {
      name: "Anjali Desai",
      email: "anjali.desai@example.com",
      phone: "+91 9876543213",
      anonymous: true,
    },
    amount: 10000,
    temple: "Kashi Vishwanath Temple",
    date: "2023-05-08T11:18:26",
    paymentMode: "online",
    paymentId: "PAY-75839261",
    blockchainHash: "0x5DFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC31E8F2",
    blockchainStatus: "confirmed",
    status: "completed",
  },
  {
    id: "D78920",
    donor: {
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 9876543214",
      anonymous: false,
    },
    amount: 35000,
    temple: "Golden Temple",
    campaignName: "Langar Service Extension",
    date: "2023-05-08T10:09:33",
    paymentMode: "crypto",
    paymentId: "CRYPTO-75839260",
    blockchainHash: "0x2EFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC41A7D9",
    blockchainStatus: "confirmed",
    status: "completed",
  },
  {
    id: "D78919",
    donor: {
      name: "Kavita Joshi",
      email: "kavita.joshi@example.com",
      phone: "+91 9876543215",
      anonymous: false,
    },
    amount: 5000,
    temple: "Jagannath Temple",
    date: "2023-05-08T09:45:21",
    paymentMode: "cash",
    blockchainHash: "0x1BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC51D9F1",
    blockchainStatus: "confirmed",
    status: "completed",
  },
  {
    id: "D78918",
    donor: {
      name: "Rajiv Malhotra",
      email: "rajiv.malhotra@example.com",
      phone: "+91 9876543216",
      anonymous: false,
    },
    amount: 30000,
    temple: "Meenakshi Amman Temple",
    campaignName: "Festival Celebration",
    date: "2023-05-08T08:12:56",
    paymentMode: "online",
    paymentId: "PAY-75839258",
    blockchainHash: "0x8BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC61B2C1",
    blockchainStatus: "pending",
    status: "pending",
  },
  {
    id: "D78917",
    donor: {
      name: "Anonymous Donor",
      email: "private@example.com",
      anonymous: true,
    },
    amount: 100000,
    temple: "Vaishno Devi Temple",
    campaignName: "Pilgrim Facilities",
    date: "2023-05-08T07:34:18",
    paymentMode: "bank_transfer",
    paymentId: "BANK-75839257",
    blockchainHash: "0x6BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC71F5A2",
    blockchainStatus: "confirmed",
    status: "completed",
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

const getDonationStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Completed
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
    case "refunded":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Refunded
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

export function DonationManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [templeFilter, setTempleFilter] = useState("all")
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const filteredDonations = donations.filter((donation) => {
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter
    const matchesTemple = templeFilter === "all" || donation.temple === templeFilter
    const matchesSearch =
      donation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.temple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donation.campaignName && donation.campaignName.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesStatus && matchesTemple && matchesSearch
  })

  const uniqueTemples = Array.from(new Set(donations.map((d) => d.temple)))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donation Management</h1>
          <p className="text-muted-foreground">Track and manage all donation transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Sync Blockchain Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Donations</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
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
              placeholder="Search donations..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
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
                <TableHead>Donor</TableHead>
                <TableHead>Temple</TableHead>
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
                <TableHead>Payment</TableHead>
                <TableHead>Blockchain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{donation.donor.anonymous ? "Anonymous Donor" : donation.donor.name}</span>
                      {!donation.donor.anonymous && (
                        <span className="text-xs text-muted-foreground">{donation.donor.email}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{donation.temple}</span>
                      {donation.campaignName && (
                        <span className="text-xs text-muted-foreground">{donation.campaignName}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(donation.date)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(donation.amount)}</TableCell>
                  <TableCell className="capitalize">{donation.paymentMode.replace("_", " ")}</TableCell>
                  <TableCell>
                    {donation.blockchainStatus ? (
                      getBlockchainStatusBadge(donation.blockchainStatus)
                    ) : (
                      <span className="text-xs text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{getDonationStatusBadge(donation.status)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedDonation(donation)
                          setIsDetailsDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredDonations.length}</strong> of <strong>{donations.length}</strong> donations
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
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>Complete information about this donation.</DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Donation ID</span>
                <span className="font-medium">{selectedDonation.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {getDonationStatusBadge(selectedDonation.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{formatCurrency(selectedDonation.amount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Temple</span>
                <span className="font-medium">{selectedDonation.temple}</span>
              </div>
              {selectedDonation.campaignName && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Campaign</span>
                  <span className="font-medium">{selectedDonation.campaignName}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium">{formatDate(selectedDonation.date)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Donor Name</span>
                <span className="font-medium">
                  {selectedDonation.donor.anonymous ? "Anonymous Donor" : selectedDonation.donor.name}
                </span>
              </div>
              {!selectedDonation.donor.anonymous && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Donor Email</span>
                    <span className="font-medium">{selectedDonation.donor.email}</span>
                  </div>
                  {selectedDonation.donor.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Donor Phone</span>
                      <span className="font-medium">{selectedDonation.donor.phone}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Mode</span>
                <span className="font-medium capitalize">{selectedDonation.paymentMode.replace("_", " ")}</span>
              </div>
              {selectedDonation.paymentId && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment ID</span>
                  <span className="font-medium">{selectedDonation.paymentId}</span>
                </div>
              )}
              {selectedDonation.blockchainHash && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Blockchain Status</span>
                    {getBlockchainStatusBadge(selectedDonation.blockchainStatus)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Blockchain Hash</span>
                    <div className="flex items-center justify-between gap-2">
                      <code className="flex-1 truncate rounded bg-muted px-2 py-1 text-xs">
                        {selectedDonation.blockchainHash}
                      </code>
                      <Button size="sm" variant="outline">
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
