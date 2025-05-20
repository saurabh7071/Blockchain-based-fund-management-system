"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

// Mock notifications data
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
]

export function NotificationDropdown() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast({
      title: "Notification marked as read",
      variant: "success",
      duration: 2000,
    })
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      variant: "success",
      duration: 2000,
    })
  }

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-orange-100 text-orange-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-orange-100 text-orange-800"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs font-normal text-orange-600"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 p-3",
                  !notification.read && "bg-orange-50",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <span
                    className={cn(
                      "ml-2 rounded-full px-2 py-0.5 text-xs font-medium",
                      getTypeStyles(notification.type),
                    )}
                  >
                    {notification.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
                <span className="mt-1 text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="/templeadmin/notifications"
            className="w-full cursor-pointer text-center text-sm text-orange-600"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            View all notifications
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
