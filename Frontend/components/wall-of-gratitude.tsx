"use client"

import { useState, useEffect } from "react"
import { Search, Heart, Filter, ArrowUpDown, MessageSquare } from "lucide-react"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export function WallOfGratitude({ templeId = null, defaultSort = "recent", filter: initialFilter = "all" }) {
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState(defaultSort)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [likedDonations, setLikedDonations] = useState({})

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for demonstration
  const donations = [
    {
      id: 1,
      name: "Rajesh Kumar",
      initials: "RK",
      amount: "₹10,001",
      message: "Thank you for the wonderful darshan experience. May Lord Ganesha bless everyone.",
      date: "2023-10-15T10:30:00",
      purpose: "Temple Construction",
      avatar: null,
      isAnonymous: false,
      likes: 24,
    },
    {
      id: 2,
      name: "Anonymous",
      initials: "A",
      amount: "₹5,001",
      message: "In memory of my late father. Om Namah Shivaya.",
      date: "2023-10-14T14:45:00",
      purpose: "Food Distribution",
      avatar: null,
      isAnonymous: true,
      likes: 12,
    },
    {
      id: 3,
      name: "Priya Sharma",
      initials: "PS",
      amount: "₹2,001",
      message: "For the upcoming Diwali celebrations. Jai Shri Ram!",
      date: "2023-10-13T09:15:00",
      purpose: "Festival Celebrations",
      avatar: null,
      isAnonymous: false,
      likes: 8,
    },
    {
      id: 4,
      name: "Amit Patel",
      initials: "AP",
      amount: "₹21,001",
      message:
        "For the new temple hall construction. May this contribution help in building a sacred space for all devotees.",
      date: "2023-10-12T16:20:00",
      purpose: "Temple Construction",
      avatar: null,
      isAnonymous: false,
      likes: 42,
    },
    {
      id: 5,
      name: "Anonymous",
      initials: "A",
      amount: "₹1,001",
      message: null,
      date: "2023-10-11T11:05:00",
      purpose: "General Donation",
      avatar: null,
      isAnonymous: true,
      likes: 3,
    },
    {
      id: 6,
      name: "Sunita Verma",
      initials: "SV",
      amount: "₹11,111",
      message: "In gratitude for all the blessings received. Jai Mata Di!",
      date: "2023-10-10T08:30:00",
      purpose: "General Donation",
      avatar: null,
      isAnonymous: false,
      likes: 18,
    },
    {
      id: 7,
      name: "Karthik Iyer",
      initials: "KI",
      amount: "₹5,555",
      message: "For the temple's education programs. Knowledge is divine.",
      date: "2023-10-09T13:45:00",
      purpose: "Education Programs",
      avatar: null,
      isAnonymous: false,
      likes: 15,
    },
    {
      id: 8,
      name: "Anonymous",
      initials: "A",
      amount: "₹25,000",
      message: "For healthcare services. May all beings be healthy and happy.",
      date: "2023-10-08T15:10:00",
      purpose: "Healthcare Services",
      avatar: null,
      isAnonymous: true,
      likes: 31,
    },
  ]

  // Filter and sort donations
  let filteredDonations = [...donations]

  if (filter !== "all") {
    filteredDonations = filteredDonations.filter((donation) =>
      filter === "anonymous"
        ? donation.isAnonymous
        : filter === "with-message"
          ? donation.message
          : donation.purpose.toLowerCase() === filter.toLowerCase(),
    )
  }

  if (searchQuery) {
    filteredDonations = filteredDonations.filter(
      (donation) =>
        (!donation.isAnonymous && donation.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (donation.message && donation.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
        donation.purpose.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  if (sort === "recent") {
    filteredDonations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (sort === "highest") {
    filteredDonations.sort(
      (a, b) => Number.parseInt(b.amount.replace(/[^\d]/g, "")) - Number.parseInt(a.amount.replace(/[^\d]/g, "")),
    )
  } else if (sort === "most-liked") {
    filteredDonations.sort((a, b) => b.likes - a.likes)
  }

  const handleLike = (id) => {
    setLikedDonations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Wall of Gratitude</h2>
          <Badge variant="outline" className="bg-orange-50">
            {filteredDonations.length} donations
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search donations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Donations</SelectItem>
                <SelectItem value="anonymous">Anonymous</SelectItem>
                <SelectItem value="with-message">With Message</SelectItem>
                <SelectItem value="temple construction">Construction</SelectItem>
                <SelectItem value="food distribution">Food</SelectItem>
                <SelectItem value="festival celebrations">Festivals</SelectItem>
                <SelectItem value="education programs">Education</SelectItem>
                <SelectItem value="healthcare services">Healthcare</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[130px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="most-liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index} className="overflow-hidden border-none shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                              <Skeleton className="h-4 w-24 mb-2" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-16 w-full mb-3" />
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : filteredDonations.map((donation) => (
                  <Card
                    key={donation.id}
                    className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-orange-100">
                            {donation.avatar ? (
                              <AvatarImage src={donation.avatar || "/placeholder.svg"} alt={donation.name} />
                            ) : (
                              <AvatarFallback className="bg-orange-100 text-orange-600">
                                {donation.initials}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="font-medium">{donation.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(donation.date), "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-orange-50">
                          {donation.amount}
                        </Badge>
                      </div>
                      {donation.message ? (
                        <div className="mb-3 italic text-muted-foreground flex items-start gap-1">
                          <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                          <span>"{donation.message}"</span>
                        </div>
                      ) : (
                        <div className="mb-3 h-6"></div>
                      )}
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{donation.purpose}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 hover:text-orange-600"
                          onClick={() => handleLike(donation.id)}
                        >
                          <Heart
                            className={`h-4 w-4 transition-all ${likedDonations[donation.id] ? "fill-orange-600 text-orange-600 scale-110" : ""}`}
                          />
                          <span>{donation.likes + (likedDonations[donation.id] ? 1 : 0)}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index} className="overflow-hidden border-none shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-3 w-40" />
                              </div>
                              <Skeleton className="h-6 w-16" />
                            </div>
                            <Skeleton className="h-12 w-full mt-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : filteredDonations.map((donation) => (
                  <Card
                    key={donation.id}
                    className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-orange-100">
                          {donation.avatar ? (
                            <AvatarImage src={donation.avatar || "/placeholder.svg"} alt={donation.name} />
                          ) : (
                            <AvatarFallback className="bg-orange-100 text-orange-600">
                              {donation.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{donation.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(donation.date), "MMM d, yyyy")} • {donation.purpose}
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-orange-50">
                              {donation.amount}
                            </Badge>
                          </div>
                          {donation.message && (
                            <div className="mt-2 italic text-muted-foreground flex items-start gap-1">
                              <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                              <span>"{donation.message}"</span>
                            </div>
                          )}
                          <div className="mt-2 flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 hover:text-orange-600"
                              onClick={() => handleLike(donation.id)}
                            >
                              <Heart
                                className={`h-4 w-4 transition-all ${likedDonations[donation.id] ? "fill-orange-600 text-orange-600 scale-110" : ""}`}
                              />
                              <span>{donation.likes + (likedDonations[donation.id] ? 1 : 0)}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </TabsContent>
      </Tabs>

      {!isLoading && filteredDonations.length === 0 && (
        <div className="text-center py-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
            <Search className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No donations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}
