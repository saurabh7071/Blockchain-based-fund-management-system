"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  IndianRupee,
  MoreHorizontal,
  Ban,
  Check,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Donation {
  id: string
  amount: number
  temple: string
  date: string
  status: "completed" | "pending" | "failed" | "refunded"
}

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  registeredDate: string
  lastActive: string
  status: "active" | "inactive" | "banned"
  role: "devotee" | "donor" | "volunteer" | "admin"
  totalDonations: number
  donationCount: number
  recentDonations: Donation[]
  location?: string
  preferences?: {
    temples?: string[]
    interests?: string[]
    communicationPreferences?: string[]
  }
}

const users: User[] = [
  {
    id: "U10001",
    name: "Ramesh Kumar",
    email: "ramesh.kumar@example.com",
    phone: "+91 9876543210",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-05-15T10:30:00",
    lastActive: "2023-05-08T14:23:15",
    status: "active",
    role: "donor",
    totalDonations: 75000,
    donationCount: 5,
    recentDonations: [
      {
        id: "D78924",
        amount: 25000,
        temple: "ISKCON Temple",
        date: "2023-05-08T14:23:15",
        status: "completed",
      },
      {
        id: "D75632",
        amount: 15000,
        temple: "Shree Siddhivinayak Temple",
        date: "2023-04-12T09:45:22",
        status: "completed",
      },
    ],
    location: "Mumbai, Maharashtra",
    preferences: {
      temples: ["ISKCON Temple", "Shree Siddhivinayak Temple"],
      interests: ["Festivals", "Bhajans"],
      communicationPreferences: ["Email", "SMS"],
    },
  },
  {
    id: "U10002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543211",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-06-20T15:45:00",
    lastActive: "2023-05-08T13:54:09",
    status: "active",
    role: "devotee",
    totalDonations: 35000,
    donationCount: 3,
    recentDonations: [
      {
        id: "D78923",
        amount: 15000,
        temple: "Tirupati Balaji Temple",
        date: "2023-05-08T13:54:09",
        status: "completed",
      },
    ],
    location: "Delhi, Delhi",
    preferences: {
      temples: ["Tirupati Balaji Temple"],
      interests: ["Pujas", "Temple Tours"],
      communicationPreferences: ["Email"],
    },
  },
  {
    id: "U10003",
    name: "Suresh Patel",
    email: "suresh.patel@example.com",
    phone: "+91 9876543212",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-03-10T09:15:00",
    lastActive: "2023-05-08T12:32:47",
    status: "active",
    role: "donor",
    totalDonations: 150000,
    donationCount: 8,
    recentDonations: [
      {
        id: "D78922",
        amount: 50000,
        temple: "Shree Siddhivinayak Temple",
        date: "2023-05-08T12:32:47",
        status: "completed",
      },
      {
        id: "D76543",
        amount: 30000,
        temple: "ISKCON Temple",
        date: "2023-03-22T11:30:15",
        status: "completed",
      },
    ],
    location: "Ahmedabad, Gujarat",
    preferences: {
      temples: ["Shree Siddhivinayak Temple", "Somnath Temple"],
      interests: ["Donations", "Religious Events"],
      communicationPreferences: ["Email", "Phone"],
    },
  },
  {
    id: "U10004",
    name: "Anjali Desai",
    email: "anjali.desai@example.com",
    phone: "+91 9876543213",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-08-05T14:20:00",
    lastActive: "2023-05-08T11:18:26",
    status: "active",
    role: "volunteer",
    totalDonations: 25000,
    donationCount: 4,
    recentDonations: [
      {
        id: "D78921",
        amount: 10000,
        temple: "Kashi Vishwanath Temple",
        date: "2023-05-08T11:18:26",
        status: "completed",
      },
    ],
    location: "Varanasi, Uttar Pradesh",
    preferences: {
      temples: ["Kashi Vishwanath Temple"],
      interests: ["Volunteering", "Community Service"],
      communicationPreferences: ["Email", "SMS"],
    },
  },
  {
    id: "U10005",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 9876543214",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-04-18T11:30:00",
    lastActive: "2023-05-08T10:09:33",
    status: "active",
    role: "donor",
    totalDonations: 85000,
    donationCount: 6,
    recentDonations: [
      {
        id: "D78920",
        amount: 35000,
        temple: "Golden Temple",
        date: "2023-05-08T10:09:33",
        status: "completed",
      },
      {
        id: "D77123",
        amount: 20000,
        temple: "Golden Temple",
        date: "2023-02-15T16:42:18",
        status: "completed",
      },
    ],
    location: "Amritsar, Punjab",
    preferences: {
      temples: ["Golden Temple"],
      interests: ["Langar Service", "Religious Events"],
      communicationPreferences: ["Email", "Phone"],
    },
  },
  {
    id: "U10006",
    name: "Kavita Joshi",
    email: "kavita.joshi@example.com",
    phone: "+91 9876543215",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-09-30T16:45:00",
    lastActive: "2023-05-08T09:45:21",
    status: "inactive",
    role: "devotee",
    totalDonations: 15000,
    donationCount: 3,
    recentDonations: [
      {
        id: "D78919",
        amount: 5000,
        temple: "Jagannath Temple",
        date: "2023-05-08T09:45:21",
        status: "completed",
      },
    ],
    location: "Puri, Odisha",
    preferences: {
      temples: ["Jagannath Temple"],
      interests: ["Rath Yatra", "Temple Festivals"],
      communicationPreferences: ["SMS"],
    },
  },
  {
    id: "U10007",
    name: "Rajiv Malhotra",
    email: "rajiv.malhotra@example.com",
    phone: "+91 9876543216",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-07-12T13:15:00",
    lastActive: "2023-05-08T08:12:56",
    status: "banned",
    role: "devotee",
    totalDonations: 40000,
    donationCount: 2,
    recentDonations: [
      {
        id: "D78918",
        amount: 30000,
        temple: "Meenakshi Amman Temple",
        date: "2023-05-08T08:12:56",
        status: "pending",
      },
    ],
    location: "Madurai, Tamil Nadu",
  },
  {
    id: "U10008",
    name: "Lakshmi Sundaram",
    email: "lakshmi.sundaram@example.com",
    phone: "+91 9876543217",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-02-28T10:00:00",
    lastActive: "2023-05-07T15:30:42",
    status: "active",
    role: "admin",
    totalDonations: 0,
    donationCount: 0,
    recentDonations: [],
    location: "Chennai, Tamil Nadu",
  },
  {
    id: "U10009",
    name: "Amit Mishra",
    email: "amit.mishra@example.com",
    phone: "+91 9876543218",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-05-05T09:30:00",
    lastActive: "2023-05-07T14:15:33",
    status: "active",
    role: "volunteer",
    totalDonations: 12000,
    donationCount: 2,
    recentDonations: [
      {
        id: "D78910",
        amount: 7000,
        temple: "Kashi Vishwanath Temple",
        date: "2023-04-25T11:22:45",
        status: "completed",
      },
    ],
    location: "Varanasi, Uttar Pradesh",
    preferences: {
      temples: ["Kashi Vishwanath Temple"],
      interests: ["Temple Cleaning", "Volunteering"],
      communicationPreferences: ["Email", "Phone"],
    },
  },
  {
    id: "U10010",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 9876543219",
    avatar: "/placeholder.svg?height=40&width=40",
    registeredDate: "2022-10-15T14:45:00",
    lastActive: "2023-05-07T12:40:18",
    status: "active",
    role: "donor",
    totalDonations: 65000,
    donationCount: 4,
    recentDonations: [
      {
        id: "D78905",
        amount: 25000,
        temple: "Vaishno Devi Temple",
        date: "2023-05-01T10:15:30",
        status: "completed",
      },
    ],
    location: "Jammu, Jammu and Kashmir",
    preferences: {
      temples: ["Vaishno Devi Temple"],
      interests: ["Pilgrimages", "Donations"],
      communicationPreferences: ["Email"],
    },
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
  }).format(date)
}

const getUserStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Active
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Inactive
        </Badge>
      )
    case "banned":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Banned
        </Badge>
      )
    default:
      return null
  }
}

const getUserRoleBadge = (role: string) => {
  switch (role) {
    case "devotee":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Devotee
        </Badge>
      )
    case "donor":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Donor
        </Badge>
      )
    case "volunteer":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Volunteer
        </Badge>
      )
    case "admin":
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
          Admin
        </Badge>
      )
    default:
      return null
  }
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesSearch =
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.location && user.location.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesStatus && matchesRole && matchesSearch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage devotees, donors, and volunteers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="devotees">Devotees</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="devotee">Devotee</SelectItem>
                  <SelectItem value="donor">Donor</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">More filters</span>
              </Button>
            </div>
          </div>

          <Card className="mt-4">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Donations</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.id}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{user.location || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(user.registeredDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getUserRoleBadge(user.role)}</TableCell>
                      <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{formatCurrency(user.totalDonations)}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{user.donationCount} donations</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsDetailsDialogOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Send Email</span>
                              </DropdownMenuItem>
                              {user.status === "active" ? (
                                <DropdownMenuItem>
                                  <Ban className="mr-2 h-4 w-4" />
                                  <span>Ban User</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Activate User</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
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
        </TabsContent>
        <TabsContent value="devotees" className="pt-4">
          {/* Similar content as "all" but filtered for devotees */}
        </TabsContent>
        <TabsContent value="donors" className="pt-4">
          {/* Similar content as "all" but filtered for donors */}
        </TabsContent>
        <TabsContent value="volunteers" className="pt-4">
          {/* Similar content as "all" but filtered for volunteers */}
        </TabsContent>
        <TabsContent value="admins" className="pt-4">
          {/* Similar content as "all" but filtered for admins */}
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Complete information about this user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2">
                    {getUserRoleBadge(selectedUser.role)}
                    {getUserStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <span className="font-medium">{selectedUser.id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Registered Date</span>
                  <span className="font-medium">{formatDate(selectedUser.registeredDate)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="font-medium">{selectedUser.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="font-medium">{selectedUser.phone || "—"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="font-medium">{selectedUser.location || "—"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <span className="font-medium">{formatDate(selectedUser.lastActive)}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Donation Summary</span>
                <div className="mt-1 flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Total Amount</span>
                    <span className="font-medium">{formatCurrency(selectedUser.totalDonations)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Donations</span>
                    <span className="font-medium">{selectedUser.donationCount}</span>
                  </div>
                </div>
              </div>

              {selectedUser.recentDonations.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-2">Recent Donations</span>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Temple</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUser.recentDonations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">{donation.id}</TableCell>
                            <TableCell>{donation.temple}</TableCell>
                            <TableCell>{formatDate(donation.date)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(donation.amount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {selectedUser.preferences && (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-2">Preferences</span>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedUser.preferences.temples && (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Preferred Temples</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUser.preferences.temples.map((temple) => (
                            <Badge key={temple} variant="secondary" className="text-xs">
                              {temple}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedUser.preferences.interests && (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Interests</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUser.preferences.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedUser.preferences.communicationPreferences && (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Communication Preferences</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUser.preferences.communicationPreferences.map((pref) => (
                            <Badge key={pref} variant="secondary" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-2 flex items-center justify-end gap-2">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                {selectedUser.status === "active" ? (
                  <Button variant="destructive">
                    <Ban className="mr-2 h-4 w-4" />
                    Ban User
                  </Button>
                ) : (
                  <Button variant="default">
                    <Check className="mr-2 h-4 w-4" />
                    Activate User
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
