"use client"

import { useState } from "react"
import {
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  RefreshCcw,
  Filter,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/superadmin/ui/date-range-picker"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BlockchainTransaction {
  id: string
  hash: string
  type: "donation" | "expense" | "system" | "temple_registry"
  relatedId?: string
  temple?: string
  description: string
  amount?: number
  date: string
  status: "confirmed" | "pending" | "failed"
  gasUsed?: string
  confirmations: number
}

const blockchainTransactions: BlockchainTransaction[] = [
  {
    id: "BT0001",
    hash: "0x7BF98D1B85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC11A1C3",
    type: "donation",
    relatedId: "D78924",
    temple: "ISKCON Temple",
    description: "Donation from Ramesh Kumar",
    amount: 25000,
    date: "2023-05-08T14:23:15",
    status: "confirmed",
    gasUsed: "0.0012 ETH",
    confirmations: 124,
  },
  {
    id: "BT0002",
    hash: "0x9CF65D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AB31B3D5",
    type: "donation",
    relatedId: "D78923",
    temple: "Tirupati Balaji Temple",
    description: "Donation from Priya Sharma",
    amount: 15000,
    date: "2023-05-08T13:54:09",
    status: "confirmed",
    gasUsed: "0.0010 ETH",
    confirmations: 118,
  },
  {
    id: "BT0003",
    hash: "0x3AFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC21C2E7",
    type: "donation",
    relatedId: "D78922",
    temple: "Shree Siddhivinayak Temple",
    description: "Donation from Suresh Patel",
    amount: 50000,
    date: "2023-05-08T12:32:47",
    status: "confirmed",
    gasUsed: "0.0015 ETH",
    confirmations: 110,
  },
  {
    id: "BT0004",
    hash: "0x5DFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC31E8F2",
    type: "donation",
    relatedId: "D78921",
    temple: "Kashi Vishwanath Temple",
    description: "Anonymous Donation",
    amount: 10000,
    date: "2023-05-08T11:18:26",
    status: "confirmed",
    gasUsed: "0.0009 ETH",
    confirmations: 104,
  },
  {
    id: "BT0005",
    hash: "0x2EFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC41A7D9",
    type: "donation",
    relatedId: "D78920",
    temple: "Golden Temple",
    description: "Donation from Vikram Singh",
    amount: 35000,
    date: "2023-05-08T10:09:33",
    status: "confirmed",
    gasUsed: "0.0011 ETH",
    confirmations: 98,
  },
  {
    id: "BT0006",
    hash: "0x1BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC12E4F6",
    type: "expense",
    relatedId: "E45921",
    temple: "Shree Siddhivinayak Temple",
    description: "Temple premises cleaning and maintenance",
    amount: 345000,
    date: "2023-05-07T10:23:15",
    status: "confirmed",
    gasUsed: "0.0018 ETH",
    confirmations: 85,
  },
  {
    id: "BT0007",
    hash: "0x2BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC22F5G7",
    type: "expense",
    relatedId: "E45922",
    temple: "ISKCON Temple",
    description: "Main prayer hall renovation work - Phase 1",
    amount: 1250000,
    date: "2023-05-06T14:12:08",
    status: "confirmed",
    gasUsed: "0.0022 ETH",
    confirmations: 72,
  },
  {
    id: "BT0008",
    hash: "0x3BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC32G6H8",
    type: "expense",
    relatedId: "E45923",
    temple: "Golden Temple",
    description: "Monthly langar provisions",
    amount: 520000,
    date: "2023-05-06T11:34:27",
    status: "confirmed",
    gasUsed: "0.0020 ETH",
    confirmations: 68,
  },
  {
    id: "BT0009",
    hash: "0x4BFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC42H7I9",
    type: "expense",
    relatedId: "E45924",
    temple: "Tirupati Balaji Temple",
    description: "Electricity and water bills",
    amount: 178000,
    date: "2023-05-05T16:45:39",
    status: "confirmed",
    gasUsed: "0.0012 ETH",
    confirmations: 56,
  },
  {
    id: "BT0010",
    hash: "0xABFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC81Z9Y8",
    type: "system",
    description: "System update: Smart contract upgrade",
    date: "2023-05-04T08:12:33",
    status: "confirmed",
    gasUsed: "0.0035 ETH",
    confirmations: 42,
  },
  {
    id: "BT0011",
    hash: "0xBBFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AC91Y8X7",
    type: "temple_registry",
    temple: "Vaishno Devi Temple",
    description: "New temple registration on blockchain",
    date: "2023-05-03T14:25:18",
    status: "confirmed",
    gasUsed: "0.0028 ETH",
    confirmations: 36,
  },
  {
    id: "BT0012",
    hash: "0xCBFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AD01X7W6",
    type: "temple_registry",
    temple: "Jagannath Temple",
    description: "New temple registration on blockchain",
    date: "2023-05-03T11:42:54",
    status: "confirmed",
    gasUsed: "0.0027 ETH",
    confirmations: 34,
  },
  {
    id: "BT0013",
    hash: "0xDBFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AD11W6V5",
    type: "donation",
    relatedId: "D78915",
    temple: "Meenakshi Amman Temple",
    description: "Donation transaction in progress",
    amount: 75000,
    date: "2023-05-08T16:31:42",
    status: "pending",
    gasUsed: "0.0014 ETH",
    confirmations: 2,
  },
  {
    id: "BT0014",
    hash: "0xEBFA5D1C85B2F16F7A1C2C9B21E356A99D1EFCD8A4EAB8ED8D1DA1A0AD21V5U4",
    type: "expense",
    relatedId: "E45918",
    temple: "Vaishno Devi Temple",
    description: "Network error during transaction",
    amount: 120000,
    date: "2023-05-08T15:18:09",
    status: "failed",
    gasUsed: "0.0004 ETH",
    confirmations: 0,
  },
]

const formatCurrency = (value?: number) => {
  if (value === undefined) return "N/A"

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

const truncateHash = (hash: string) => {
  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
}

const getTransactionTypeBadge = (type: string) => {
  switch (type) {
    case "donation":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Donation
        </Badge>
      )
    case "expense":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Expense
        </Badge>
      )
    case "system":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          System
        </Badge>
      )
    case "temple_registry":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Temple Registry
        </Badge>
      )
    default:
      return null
  }
}

const getTransactionStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return (
        <div className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-green-600">Confirmed</span>
        </div>
      )
    case "pending":
      return (
        <div className="flex items-center gap-1">
          <RefreshCcw className="h-4 w-4 text-amber-500" />
          <span className="text-amber-600">Pending</span>
        </div>
      )
    case "failed":
      return (
        <div className="flex items-center gap-1">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-red-600">Failed</span>
        </div>
      )
    default:
      return null
  }
}

export function BlockchainLedger() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [templeFilter, setTempleFilter] = useState("all")

  const filteredTransactions = blockchainTransactions.filter((transaction) => {
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesTemple = templeFilter === "all" || transaction.temple === templeFilter
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.relatedId && transaction.relatedId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.temple && transaction.temple.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesType && matchesStatus && matchesTemple && matchesSearch
  })

  const uniqueTemples = Array.from(
    new Set(blockchainTransactions.filter((t) => t.temple).map((t) => t.temple as string)),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Ledger</h1>
          <p className="text-muted-foreground">Track all blockchain transactions and interactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-muted-foreground">Total Transactions</div>
              <div className="text-2xl font-bold">1,254</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                <span>12.5%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-muted-foreground">Success Rate</div>
              <div className="text-2xl font-bold">98.7%</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                <span>1.2%</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-muted-foreground">Avg. Confirmation Time</div>
              <div className="text-2xl font-bold">2.4 min</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                <span>0.3 min</span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-muted-foreground">Gas Fees Spent</div>
              <div className="text-2xl font-bold">0.85 ETH</div>
              <div className="text-xs text-muted-foreground">≈ ₹175,000</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="system">System Events</TabsTrigger>
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
              placeholder="Search by ID, hash, description..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="donation">Donation</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="temple_registry">Temple Registry</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
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
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Detailed view of all blockchain transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[180px]">Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{getTransactionTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={transaction.description}>
                    {transaction.description}
                  </TableCell>
                  <TableCell>{transaction.temple || "—"}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell className="text-right">
                    {transaction.amount ? formatCurrency(transaction.amount) : "—"}
                  </TableCell>
                  <TableCell>{getTransactionStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => window.open(`https://etherscan.io/tx/${transaction.hash}`, "_blank")}
                    >
                      {truncateHash(transaction.hash)}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredTransactions.length}</strong> of <strong>{blockchainTransactions.length}</strong>{" "}
            transactions
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

      <Card>
        <CardHeader>
          <CardTitle>Blockchain Analytics</CardTitle>
          <CardDescription>Visualized blockchain transaction data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { date: "Jan", transactions: 85, gasUsed: 0.05 },
                  { date: "Feb", transactions: 102, gasUsed: 0.06 },
                  { date: "Mar", transactions: 123, gasUsed: 0.07 },
                  { date: "Apr", transactions: 145, gasUsed: 0.08 },
                  { date: "May", transactions: 168, gasUsed: 0.09 },
                  { date: "Jun", transactions: 189, gasUsed: 0.11 },
                  { date: "Jul", transactions: 212, gasUsed: 0.12 },
                  { date: "Aug", transactions: 236, gasUsed: 0.13 },
                  { date: "Sep", transactions: 254, gasUsed: 0.14 },
                  { date: "Oct", transactions: 278, gasUsed: 0.15 },
                  { date: "Nov", transactions: 294, gasUsed: 0.16 },
                  { date: "Dec", transactions: 312, gasUsed: 0.17 },
                ]}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="transactions"
                  name="Transactions"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="gasUsed"
                  name="Gas Used (ETH)"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
