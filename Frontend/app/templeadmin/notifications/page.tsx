"use client"

import { useState, useEffect } from "react"
import { Bell, Calendar, CheckCircle, Filter, Info, Search, X } from "lucide-react"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

// Mock notifications data with more entries
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Donation Received",
    description: "₹25,000 received from Rajesh Sharma",
    time: "10 minutes ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Expense Approved",
    description: "Infrastructure expense of ₹1,50,000 has been approved",
    time: "1 hour ago",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Campaign Goal Reached",
    description: "Bhakt Niwas renovation campaign has reached its goal",
    time: "3 hours ago",
    read: true,
    type: "success",
  },
  {
    id: "4",
    title: "System Maintenance",
    description: "The system will be under maintenance on Sunday, 2 AM - 4 AM",
    time: "1 day ago",
    read: true,
    type: "warning",
  },
  {
    id: "5",
    title: "Login from New Device",
    description: "New login detected from Mumbai, India",
    time: "2 days ago",
    read: true,
    type: "warning",
  },
  {
    id: "6",
    title: "New Event Created",
    description: "Ram Navami Celebration has been added to the calendar",
    time: "3 days ago",
    read: true,
    type: "info",
  },
  {
    id: "7",
    title: "Profile Updated",
    description: "Your profile information has been updated successfully",
    time: "4 days ago",
    read: true,
    type: "info",
  },
  {
    id: "8",
    title: "Expense Report Available",
    description: "Monthly expense report for May 2023 is available",
    time: "5 days ago",
    read: true,
    type: "info",
  },
  {
    id: "9",
    title: "Database Backup Completed",
    description: "Weekly database backup completed successfully",
    time: "6 days ago",
    read: true,
    type: "success",
  },
  {
    id: "10",
    title: "Low Funds Alert",
    description: "The temple fund is below the recommended minimum balance",
    time: "1 week ago",
    read: true,
    type: "error",
  },
  {
    id: "11",
    title: "Donation Report Ready",
    description: "Quarterly donation report for Q1 2023 is ready for review",
    time: "1 week ago",
    read: true,
    type: "info",
  },
  {
    id: "12",
    title: "New Team Member Added",
    description: "Anita Patel has been added to your temple team",
    time: "2 weeks ago",
    read: true,
    type: "success",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [readFilter, setReadFilter] = useState<string>("all")
  const itemsPerPage = 6

  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    setNotifications(mockNotifications)
  }, [])

  useEffect(() => {
    // Filter notifications based on search query, type, and read status
    let filtered = [...notifications]

    if (searchQuery) {
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notification.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((notification) => notification.type === selectedType)
    }

    if (readFilter !== "all") {
      const isRead = readFilter === "read"
      filtered = filtered.filter((notification) => notification.read === isRead)
    }

    setFilteredNotifications(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [notifications, searchQuery, selectedType, readFilter])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-900">Notifications</h2>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead} className="text-indigo-600 hover:text-indigo-700">
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList className="bg-indigo-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-indigo-900">
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-900"
                onClick={() => setReadFilter("unread")}
              >
                Unread
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  className="w-full pl-8 sm:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>Manage and view all your notifications</CardDescription>
              </CardHeader>
              <CardContent>
                {paginatedNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {paginatedNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex gap-4 p-4 border rounded-lg transition-colors",
                          !notification.read && "bg-indigo-50",
                        )}
                      >
                        <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold">{notification.title}</h3>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                getTypeStyles(notification.type),
                              )}
                            >
                              {notification.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {notification.time}
                            </span>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8 text-indigo-600 hover:text-indigo-700"
                                >
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-8 text-red-600 hover:text-red-700"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                    <h3 className="text-lg font-medium">No notifications found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchQuery || selectedType !== "all" || readFilter !== "all"
                        ? "Try adjusting your filters"
                        : "You don't have any notifications yet"}
                    </p>
                  </div>
                )}

                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
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
                          className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {/* Similar content as "all" tab but filtered for unread notifications */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
