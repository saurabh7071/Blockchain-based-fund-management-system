"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, Plus, Pencil, Calendar, Clock, Users, IndianRupee, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

interface Campaign {
  id: string
  title: string
  description: string
  temple: string
  startDate: string
  endDate: string
  targetAmount: number
  raisedAmount: number
  status: "active" | "upcoming" | "completed" | "cancelled"
  type: "donation" | "event" | "construction" | "festival" | "other"
  image: string
  participants?: number
  createdBy: string
}

const campaigns: Campaign[] = [
  {
    id: "C10001",
    title: "Diwali Celebration Fund",
    description:
      "Help us celebrate Diwali with grandeur this year. Funds will be used for decorations, prasad, and special puja arrangements.",
    temple: "ISKCON Temple",
    startDate: "2023-10-01T00:00:00",
    endDate: "2023-11-10T23:59:59",
    targetAmount: 500000,
    raisedAmount: 325000,
    status: "active",
    type: "festival",
    image: "/placeholder.svg?height=100&width=200",
    participants: 145,
    createdBy: "Gopal Das",
  },
  {
    id: "C10002",
    title: "Temple Renovation Project",
    description: "Major renovation of the main prayer hall including flooring, ceiling, and wall paintings.",
    temple: "Shree Siddhivinayak Temple",
    startDate: "2023-08-15T00:00:00",
    endDate: "2023-12-31T23:59:59",
    targetAmount: 2500000,
    raisedAmount: 1750000,
    status: "active",
    type: "construction",
    image: "/placeholder.svg?height=100&width=200",
    participants: 230,
    createdBy: "Rajesh Sharma",
  },
  {
    id: "C10003",
    title: "Langar Service Extension",
    description: "Expanding our langar service to serve more devotees and needy people in the community.",
    temple: "Golden Temple",
    startDate: "2023-09-01T00:00:00",
    endDate: "2023-11-30T23:59:59",
    targetAmount: 1000000,
    raisedAmount: 850000,
    status: "active",
    type: "donation",
    image: "/placeholder.svg?height=100&width=200",
    participants: 310,
    createdBy: "Gurpreet Singh",
  },
  {
    id: "C10004",
    title: "Annual Rath Yatra",
    description: "Organizing the annual Rath Yatra festival with procession through the city.",
    temple: "Jagannath Temple",
    startDate: "2024-01-15T00:00:00",
    endDate: "2024-01-25T23:59:59",
    targetAmount: 750000,
    raisedAmount: 150000,
    status: "upcoming",
    type: "event",
    image: "/placeholder.svg?height=100&width=200",
    participants: 0,
    createdBy: "Debashish Panda",
  },
  {
    id: "C10005",
    title: "Pilgrim Facilities Improvement",
    description: "Upgrading facilities for pilgrims including rest areas, drinking water stations, and washrooms.",
    temple: "Vaishno Devi Temple",
    startDate: "2023-07-01T00:00:00",
    endDate: "2023-10-31T23:59:59",
    targetAmount: 1500000,
    raisedAmount: 1500000,
    status: "completed",
    type: "construction",
    image: "/placeholder.svg?height=100&width=200",
    participants: 275,
    createdBy: "Rakesh Gupta",
  },
  {
    id: "C10006",
    title: "Navratri Celebrations",
    description: "Nine nights of devotional music, dance, and prayers celebrating the divine feminine.",
    temple: "Meenakshi Amman Temple",
    startDate: "2023-10-15T00:00:00",
    endDate: "2023-10-24T23:59:59",
    targetAmount: 350000,
    raisedAmount: 320000,
    status: "active",
    type: "festival",
    image: "/placeholder.svg?height=100&width=200",
    participants: 190,
    createdBy: "Lakshmi Sundaram",
  },
  {
    id: "C10007",
    title: "Temple Educational Program",
    description: "Funding for classes on scriptures, yoga, and spiritual practices for devotees of all ages.",
    temple: "Kashi Vishwanath Temple",
    startDate: "2023-11-01T00:00:00",
    endDate: "2024-04-30T23:59:59",
    targetAmount: 600000,
    raisedAmount: 75000,
    status: "active",
    type: "other",
    image: "/placeholder.svg?height=100&width=200",
    participants: 45,
    createdBy: "Amit Mishra",
  },
  {
    id: "C10008",
    title: "Brahmotsavam Festival",
    description: "Annual temple festival with processions, cultural programs, and special pujas.",
    temple: "Tirupati Balaji Temple",
    startDate: "2023-09-19T00:00:00",
    endDate: "2023-09-27T23:59:59",
    targetAmount: 1200000,
    raisedAmount: 1200000,
    status: "completed",
    type: "festival",
    image: "/placeholder.svg?height=100&width=200",
    participants: 450,
    createdBy: "Venkat Reddy",
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

const getCampaignStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Active
        </Badge>
      )
    case "upcoming":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Upcoming
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Completed
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Cancelled
        </Badge>
      )
    default:
      return null
  }
}

const getCampaignTypeBadge = (type: string) => {
  switch (type) {
    case "donation":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Donation Drive
        </Badge>
      )
    case "event":
      return (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
          Event
        </Badge>
      )
    case "construction":
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
          Construction
        </Badge>
      )
    case "festival":
      return (
        <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
          Festival
        </Badge>
      )
    case "other":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
          Other
        </Badge>
      )
    default:
      return null
  }
}

export function CampaignManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [templeFilter, setTempleFilter] = useState("all")
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isAddCampaignDialogOpen, setIsAddCampaignDialogOpen] = useState(false)

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesType = typeFilter === "all" || campaign.type === typeFilter
    const matchesTemple = templeFilter === "all" || campaign.temple === templeFilter
    const matchesSearch =
      campaign.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.temple.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesType && matchesTemple && matchesSearch
  })

  const uniqueTemples = Array.from(new Set(campaigns.map((c) => c.temple)))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign & Event Management</h1>
          <p className="text-muted-foreground">Manage donation campaigns and temple events</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddCampaignDialogOpen} onOpenChange={setIsAddCampaignDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>Fill in the details to create a new campaign or event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input id="title" placeholder="Enter campaign title" />
                  </div>
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
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the campaign purpose and details" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="donation">Donation Drive</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="target">Target Amount (₹)</Label>
                    <Input id="target" type="number" placeholder="Enter target amount" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">Campaign Image</Label>
                  <Input id="image" type="file" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="publishNow" defaultChecked />
                  <Label htmlFor="publishNow">Publish campaign immediately</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCampaignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddCampaignDialogOpen(false)}>Create Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
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
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="donation">Donation Drive</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="festival">Festival</SelectItem>
              <SelectItem value="other">Other</SelectItem>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <div className="relative h-[150px] w-full">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-2 top-2 flex gap-1">
                {getCampaignStatusBadge(campaign.status)}
                {getCampaignTypeBadge(campaign.type)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1 text-xl">{campaign.title}</CardTitle>
              <CardDescription className="line-clamp-1">{campaign.temple}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)}%
                  </span>
                </div>
                <Progress value={(campaign.raisedAmount / campaign.targetAmount) * 100} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{formatCurrency(campaign.raisedAmount)}</span>
                  <span className="text-muted-foreground">of {formatCurrency(campaign.targetAmount)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(campaign.startDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(campaign.endDate)}</span>
                </div>
                {campaign.participants !== undefined && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{campaign.participants} participants</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span>{formatCurrency(campaign.raisedAmount)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCampaign(campaign)
                  setIsDetailsDialogOpen(true)
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Details
              </Button>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                {campaign.status === "active" && (
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
            <DialogDescription>Complete information about this campaign.</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="grid gap-4 py-4">
              <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                <img
                  src={selectedCampaign.image || "/placeholder.svg"}
                  alt={selectedCampaign.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Campaign ID</span>
                <span className="font-medium">{selectedCampaign.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {getCampaignStatusBadge(selectedCampaign.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                {getCampaignTypeBadge(selectedCampaign.type)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Temple</span>
                <span className="font-medium">{selectedCampaign.temple}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Title</span>
                <p className="font-medium">{selectedCampaign.title}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Description</span>
                <p className="rounded bg-muted p-2 text-sm">{selectedCampaign.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-medium">{formatDate(selectedCampaign.startDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">End Date</span>
                <span className="font-medium">{formatDate(selectedCampaign.endDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Target Amount</span>
                <span className="font-medium">{formatCurrency(selectedCampaign.targetAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Raised Amount</span>
                <span className="font-medium">{formatCurrency(selectedCampaign.raisedAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {Math.round((selectedCampaign.raisedAmount / selectedCampaign.targetAmount) * 100)}%
                </span>
              </div>
              <Progress value={(selectedCampaign.raisedAmount / selectedCampaign.targetAmount) * 100} className="h-2" />
              {selectedCampaign.participants !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-medium">{selectedCampaign.participants}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created By</span>
                <span className="font-medium">{selectedCampaign.createdBy}</span>
              </div>
              {selectedCampaign.status === "active" && (
                <div className="mt-2 flex items-center justify-end gap-2">
                  <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Campaign
                  </Button>
                  <Button variant="destructive">
                    <X className="mr-2 h-4 w-4" />
                    Cancel Campaign
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
