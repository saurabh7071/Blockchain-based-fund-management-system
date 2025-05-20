"use client"

import { useState } from "react"
import {
  Bell,
  Check,
  Clock,
  CreditCard,
  DollarSign,
  Users,
  Building,
  AlertTriangle,
  Info,
  Search,
  MoreVertical,
  Trash2,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  type: "donation" | "expense" | "user" | "temple" | "system" | "alert"
  read: boolean
  priority: "low" | "medium" | "high"
  actionRequired?: boolean
  relatedId?: string
  relatedEntity?: string
  sender?: {
    name: string
    avatar?: string
  }
}

const notifications: Notification[] = [
  {
    id: "N10001",
    title: "New Donation Received",
    description: "A donation of ₹25,000 has been received from Ramesh Kumar for ISKCON Temple.",
    timestamp: "2023-05-08T14:23:15",
    type: "donation",
    read: false,
    priority: "medium",
    relatedId: "D78924",
    relatedEntity: "ISKCON Temple",
    sender: {
      name: "Donation System",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10002",
    title: "Expense Approval Required",
    description:
      "New expense request of ₹380,000 for security personnel payment at Vaishno Devi Temple requires your approval.",
    timestamp: "2023-05-08T12:45:30",
    type: "expense",
    read: false,
    priority: "high",
    actionRequired: true,
    relatedId: "E45927",
    relatedEntity: "Vaishno Devi Temple",
    sender: {
      name: "Expense System",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10003",
    title: "New User Registration",
    description: "A new user, Ankit Patel, has registered on the platform.",
    timestamp: "2023-05-08T10:15:22",
    type: "user",
    read: false,
    priority: "low",
    relatedId: "U10011",
    sender: {
      name: "User Management",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10004",
    title: "System Maintenance Scheduled",
    description: "The system will undergo maintenance on May 15, 2023, from 2:00 AM to 4:00 AM IST.",
    timestamp: "2023-05-07T16:30:45",
    type: "system",
    read: true,
    priority: "medium",
    sender: {
      name: "System Admin",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10005",
    title: "Blockchain Transaction Failed",
    description:
      "A blockchain transaction for expense E45918 at Vaishno Devi Temple has failed. Manual intervention required.",
    timestamp: "2023-05-07T14:12:33",
    type: "alert",
    read: false,
    priority: "high",
    actionRequired: true,
    relatedId: "BT0014",
    relatedEntity: "Vaishno Devi Temple",
    sender: {
      name: "Blockchain System",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10006",
    title: "Monthly Financial Report Ready",
    description: "The monthly financial report for April 2023 is now available for review.",
    timestamp: "2023-05-07T09:45:18",
    type: "system",
    read: true,
    priority: "medium",
    relatedId: "R2023-04",
    sender: {
      name: "Reporting System",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10007",
    title: "Temple Registration Completed",
    description: "Jagannath Temple registration has been completed and is now active on the platform.",
    timestamp: "2023-05-06T15:22:41",
    type: "temple",
    read: true,
    priority: "medium",
    relatedId: "T10006",
    relatedEntity: "Jagannath Temple",
    sender: {
      name: "Temple Management",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10008",
    title: "Large Donation Alert",
    description: "An anonymous donor has made a large donation of ₹100,000 to Vaishno Devi Temple.",
    timestamp: "2023-05-06T11:34:27",
    type: "donation",
    read: true,
    priority: "high",
    relatedId: "D78917",
    relatedEntity: "Vaishno Devi Temple",
    sender: {
      name: "Donation System",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10009",
    title: "Campaign Goal Reached",
    description:
      "The 'Pilgrim Facilities Improvement' campaign at Vaishno Devi Temple has reached its funding goal of ₹1,500,000.",
    timestamp: "2023-05-05T16:48:52",
    type: "temple",
    read: true,
    priority: "medium",
    relatedId: "C10005",
    relatedEntity: "Vaishno Devi Temple",
    sender: {
      name: "Campaign Management",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "N10010",
    title: "User Account Locked",
    description: "User account for Rajiv Malhotra has been locked due to multiple failed login attempts.",
    timestamp: "2023-05-05T10:12:33",
    type: "alert",
    read: true,
    priority: "high",
    actionRequired: true,
    relatedId: "U10007",
    sender: {
      name: "Security System",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
  } else if (diffInHours < 48) {
    return "Yesterday"
  } else {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "donation":
      return <CreditCard className="h-5 w-5 text-blue-500" />
    case "expense":
      return <DollarSign className="h-5 w-5 text-green-500" />
    case "user":
      return <Users className="h-5 w-5 text-purple-500" />
    case "temple":
      return <Building className="h-5 w-5 text-amber-500" />
    case "system":
      return <Info className="h-5 w-5 text-slate-500" />
    case "alert":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />
  }
}

const getNotificationPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          High
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Medium
        </Badge>
      )
    case "low":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Low
        </Badge>
      )
    default:
      return null
  }
}

export function NotificationsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [readFilter, setReadFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesRead =
      readFilter === "all" ||
      (readFilter === "read" && notification.read) ||
      (readFilter === "unread" && !notification.read)
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.relatedEntity && notification.relatedEntity.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesType && matchesRead && matchesPriority && matchesSearch
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired).length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts and activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Notification Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Unread
            {unreadCount > 0 && <Badge className="ml-2 bg-primary text-primary-foreground">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="action" className="relative">
            Action Required
            {actionRequiredCount > 0 && <Badge className="ml-2 bg-red-500 text-white">{actionRequiredCount}</Badge>}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notifications..."
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
              <SelectItem value="donation">Donations</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="temple">Temples</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
            </SelectContent>
          </Select>
          <Select value={readFilter} onValueChange={setReadFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || typeFilter !== "all" || readFilter !== "all" || priorityFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You're all caught up!"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 hover:bg-muted/50 ${
                    !notification.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div
                    className="flex-1 space-y-1"
                    onClick={() => {
                      setSelectedNotification(notification)
                      setIsDetailsDialogOpen(true)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      {notification.actionRequired && (
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                          Action Required
                        </Badge>
                      )}
                      {getNotificationPriorityBadge(notification.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(notification.timestamp)}</span>
                      {notification.relatedEntity && (
                        <>
                          <span>•</span>
                          <Building className="h-3 w-3" />
                          <span>{notification.relatedEntity}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedNotification(notification)
                            setIsDetailsDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {!notification.read ? (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            <span>Mark as Read</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Mark as Unread</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        {filteredNotifications.length > 0 && (
          <CardFooter className="flex justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredNotifications.length}</strong> of <strong>{notifications.length}</strong>{" "}
              notifications
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
        )}
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>Complete information about this notification.</DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  {getNotificationIcon(selectedNotification.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedNotification.title}</h3>
                  <div className="flex items-center gap-2">
                    {getNotificationPriorityBadge(selectedNotification.priority)}
                    {selectedNotification.actionRequired && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        Action Required
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <p className="text-sm">{selectedNotification.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Notification ID</span>
                  <span className="font-medium">{selectedNotification.id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Timestamp</span>
                  <span className="font-medium">
                    {new Date(selectedNotification.timestamp).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{selectedNotification.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-medium">{selectedNotification.read ? "Read" : "Unread"}</span>
                </div>
                {selectedNotification.relatedId && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Related ID</span>
                    <span className="font-medium">{selectedNotification.relatedId}</span>
                  </div>
                )}
                {selectedNotification.relatedEntity && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Related Entity</span>
                    <span className="font-medium">{selectedNotification.relatedEntity}</span>
                  </div>
                )}
              </div>

              {selectedNotification.sender && (
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={selectedNotification.sender.avatar || "/placeholder.svg"}
                      alt={selectedNotification.sender.name}
                    />
                    <AvatarFallback>{selectedNotification.sender.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">From: {selectedNotification.sender.name}</div>
                    <div className="text-xs text-muted-foreground">System Notification</div>
                  </div>
                </div>
              )}

              <div className="mt-2 flex items-center justify-end gap-2">
                {!selectedNotification.read && (
                  <Button variant="outline">
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Read
                  </Button>
                )}
                {selectedNotification.actionRequired && (
                  <Button>
                    <Eye className="mr-2 h-4 w-4" />
                    View Related Item
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
