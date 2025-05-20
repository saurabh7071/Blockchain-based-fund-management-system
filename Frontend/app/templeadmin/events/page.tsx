"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"
import { useToast } from "@/components/ui/use-toast"

const events = [
  {
    id: "EVT-001",
    title: "Ram Navami Celebration",
    description: "Annual celebration of Lord Ram's birth",
    date: "2023-06-30",
    time: "06:00 AM - 09:00 PM",
    type: "Festival",
    status: "Upcoming",
  },
  {
    id: "EVT-002",
    title: "Hanuman Jayanti",
    description: "Celebration of Lord Hanuman's birth",
    date: "2023-07-15",
    time: "06:00 AM - 09:00 PM",
    type: "Festival",
    status: "Upcoming",
  },
  {
    id: "EVT-003",
    title: "Bhagavad Gita Discourse",
    description: "Weekly discourse on Bhagavad Gita by Swami Ramdev",
    date: "2023-06-25",
    time: "06:00 PM - 08:00 PM",
    type: "Discourse",
    status: "Upcoming",
  },
  {
    id: "EVT-004",
    title: "Saraswati Puja",
    description: "Special puja for Goddess Saraswati",
    date: "2023-06-20",
    time: "10:00 AM - 12:00 PM",
    type: "Puja",
    status: "Upcoming",
  },
  {
    id: "EVT-005",
    title: "Diwali Celebration",
    description: "Festival of lights celebration",
    date: "2023-11-12",
    time: "06:00 AM - 10:00 PM",
    type: "Festival",
    status: "Upcoming",
  },
]

const notices = [
  {
    id: "NOT-001",
    title: "Temple Renovation Notice",
    description:
      "The main hall will be under renovation from June 15-20. Please use the side entrance during this period.",
    date: "2023-06-10",
    priority: "High",
  },
  {
    id: "NOT-002",
    title: "Change in Aarti Timing",
    description: "Evening Aarti timing has been changed to 7:30 PM from 7:00 PM starting June 25.",
    date: "2023-06-18",
    priority: "Medium",
  },
  {
    id: "NOT-003",
    title: "Special Prasad Distribution",
    description: "Special prasad will be distributed after morning Aarti on June 30.",
    date: "2023-06-25",
    priority: "Low",
  },
]

export default function EventsPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "",
  })

  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  })

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEventForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNoticeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNoticeForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Event Created",
        description: `${eventForm.title} has been successfully added to the calendar.`,
        variant: "success",
        duration: 3000,
      })

      setIsDialogOpen(false)
      setEventForm({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "",
      })
    } catch (error) {
      toast({
        title: "Failed to create event",
        description: "An error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Notice Added",
        description: `${noticeForm.title} has been successfully published.`,
        variant: "success",
        duration: 3000,
      })

      setIsNoticeDialogOpen(false)
      setNoticeForm({
        title: "",
        description: "",
        priority: "Medium",
      })
    } catch (error) {
      toast({
        title: "Failed to add notice",
        description: "An error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-orange-900">Events & Notices</h2>
            <div className="flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <form onSubmit={handleEventSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>Create a new event or announcement for your temple</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter event title"
                          value={eventForm.title}
                          onChange={handleEventChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe the event"
                          rows={4}
                          value={eventForm.description}
                          onChange={handleEventChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={eventForm.date}
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            name="time"
                            placeholder="e.g., 6:00 AM - 9:00 PM"
                            value={eventForm.time}
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Event Type</Label>
                        <Select
                          name="type"
                          value={eventForm.type}
                          onValueChange={(value) => setEventForm((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="festival">Festival</SelectItem>
                            <SelectItem value="puja">Puja</SelectItem>
                            <SelectItem value="discourse">Discourse</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="image">Event Image (Optional)</Label>
                        <div className="flex items-center gap-2">
                          <Input id="image" type="text" placeholder="Enter image URL" className="w-full" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Event"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Tabs defaultValue="events" className="space-y-4">
            <TabsList className="bg-orange-100">
              <TabsTrigger value="events" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
                Events
              </TabsTrigger>
              <TabsTrigger value="notices" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
                Notices
              </TabsTrigger>
            </TabsList>
            <TabsContent value="events" className="space-y-4">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Manage temple events, festivals, and special occasions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                event.status === "Upcoming"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800",
                              )}
                            >
                              {event.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center text-sm">
                              <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1 h-4 w-4 text-muted-foreground"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {event.time}
                            </div>
                            <div className="flex items-center text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1 h-4 w-4 text-muted-foreground"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              {event.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:flex-col md:items-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-orange-200 text-orange-700 hover:bg-orange-50"
                            onClick={() => {
                              toast({
                                title: "Event Updated",
                                description: `${event.title} has been updated successfully.`,
                                variant: "success",
                                duration: 3000,
                              })
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-orange-200 text-orange-700 hover:bg-orange-50"
                            onClick={() => {
                              toast({
                                title: "Event Shared",
                                description: `${event.title} has been shared successfully.`,
                                variant: "success",
                                duration: 3000,
                              })
                            }}
                          >
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notices" className="space-y-4">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Temple Notices</CardTitle>
                  <CardDescription>Manage important announcements and notices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div key={notice.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{notice.title}</h3>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                notice.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : notice.priority === "Medium"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800",
                              )}
                            >
                              {notice.priority} Priority
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notice.description}</p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center text-sm">
                              <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                              Posted on: {new Date(notice.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:flex-col md:items-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-orange-200 text-orange-700 hover:bg-orange-50"
                            onClick={() => {
                              toast({
                                title: "Notice Updated",
                                description: `${notice.title} has been updated successfully.`,
                                variant: "success",
                                duration: 3000,
                              })
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              toast({
                                title: "Notice Removed",
                                description: `${notice.title} has been removed successfully.`,
                                variant: "success",
                                duration: 3000,
                              })
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Notice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <form onSubmit={handleNoticeSubmit}>
                        <DialogHeader>
                          <DialogTitle>Add New Notice</DialogTitle>
                          <DialogDescription>Create a new notice or announcement for your temple</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="notice-title">Notice Title</Label>
                            <Input
                              id="notice-title"
                              name="title"
                              placeholder="Enter notice title"
                              value={noticeForm.title}
                              onChange={handleNoticeChange}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="notice-description">Description</Label>
                            <Textarea
                              id="notice-description"
                              name="description"
                              placeholder="Describe the notice"
                              rows={4}
                              value={noticeForm.description}
                              onChange={handleNoticeChange}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                              name="priority"
                              value={noticeForm.priority}
                              onValueChange={(value) => setNoticeForm((prev) => ({ ...prev, priority: value }))}
                            >
                              <SelectTrigger id="priority">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsNoticeDialogOpen(false)}
                            className="border-orange-200 text-orange-700 hover:bg-orange-50"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Notice"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
