import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Heart, Calendar, ArrowUpRight, Trophy, Users, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function GratitudeWallPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=250&width=1200&text=Wall+of+Gratitude"
            alt="Wall of Gratitude"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-orange-700/50 z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-center px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
            <span className="mr-2">🙏</span> Wall of Gratitude
          </h1>
          <p className="text-white/90 max-w-2xl">
            Recognizing the generosity of devotees who have supported our temples
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Donor Recognition</h2>
          <p className="text-muted-foreground">Celebrating the generosity that sustains our temples</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search donors..." className="pl-9 w-[200px]" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Donation Milestones */}
      <div className="bg-orange-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">🧾</span> Donation Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🎉</span>
                  <h3 className="font-semibold">Monthly Goal</h3>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">75% Complete</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">₹1,00,000+ raised this month for ISKCON!</p>
              <Progress value={75} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🙏</span>
                  <h3 className="font-semibold">Total Donations</h3>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Milestone!</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Over 5,000 donations received in total!</p>
              <div className="text-2xl font-bold text-orange-600">5,127</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">💰</span>
                  <h3 className="font-semibold">Festival Fund</h3>
                </div>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Urgent</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Help us reach our Diwali celebration goal!</p>
              <Progress value={40} className="h-2" />
              <div className="flex justify-between text-xs mt-1">
                <span>₹40,000 raised</span>
                <span>Goal: ₹1,00,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 space-y-4">
          {/* Top Donors (Hall of Fame) */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 text-orange-600 mr-2" />
                <span>Top Donors</span>
              </CardTitle>
              <CardDescription>Hall of Fame</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Time Period</label>
                <Select defaultValue="month">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback
                          className={`${
                            i === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : i === 2
                                ? "bg-gray-100 text-gray-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {i === 1 ? "RK" : i === 2 ? "PM" : "AK"}
                        </AvatarFallback>
                      </Avatar>
                      {i === 1 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                          1
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{i === 1 ? "Rajesh K." : i === 2 ? "Priya M." : "Amit K."}</p>
                      <p className="text-xs text-muted-foreground">
                        {i === 1 ? "₹50,000" : i === 2 ? "₹35,000" : "₹25,000"}
                      </p>
                    </div>
                    <Badge
                      className={`ml-auto ${
                        i === 1
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : i === 2
                            ? "bg-gray-100 text-gray-800 border-gray-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}
                    >
                      {i === 1 ? "Gold" : i === 2 ? "Silver" : "Bronze"}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full text-orange-600 p-0">
                View All Top Donors
              </Button>
            </CardContent>
          </Card>

          {/* Temple-wise Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <span className="mr-2">🏛️</span>
                <span>Temple Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Select Temple</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Temples" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popular Temples</SelectLabel>
                      <SelectItem value="iskcon">ISKCON Temple</SelectItem>
                      <SelectItem value="siddhivinayak">Siddhivinayak Temple</SelectItem>
                      <SelectItem value="kashi">Kashi Vishwanath</SelectItem>
                      <SelectItem value="meenakshi">Meenakshi Amman</SelectItem>
                      <SelectItem value="tirupati">Tirupati Balaji</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Donation Purpose</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Purposes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Temple Construction</SelectItem>
                    <SelectItem value="food">Food Distribution</SelectItem>
                    <SelectItem value="festival">Festival Celebrations</SelectItem>
                    <SelectItem value="maintenance">Temple Maintenance</SelectItem>
                    <SelectItem value="education">Education Programs</SelectItem>
                    <SelectItem value="healthcare">Healthcare Services</SelectItem>
                    <SelectItem value="general">General Donation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Apply Filters</Button>
            </CardContent>
          </Card>

          {/* Community Contribution Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-orange-600 mr-2" />
                <span>Community Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Donors:</span>
                <span className="font-semibold">5,127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Recurring Donors:</span>
                <span className="font-semibold">1,245</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Temples Supported:</span>
                <span className="font-semibold">250+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Donation:</span>
                <span className="font-semibold">₹2,100</span>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm mb-1">Donor Growth</div>
                <Progress value={75} className="h-2" />
                <div className="flex justify-between text-xs mt-1">
                  <span>+15% this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          {/* Recent Donations Feed */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 text-orange-600 mr-2" />
                <span>Recent Donations Feed</span>
              </CardTitle>
              <CardDescription>Live updates of recent contributions</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto space-y-4">
              {[
                {
                  name: "Rajesh Sharma",
                  isAnonymous: false,
                  amount: "₹1,000",
                  temple: "ISKCON Temple",
                  time: "2 mins ago",
                  emoji: "🌸",
                },
                {
                  name: "Anonymous",
                  isAnonymous: true,
                  amount: "₹500",
                  temple: "Shiv Temple",
                  time: "10 mins ago",
                  emoji: "🙏",
                },
                {
                  name: "Priya Mehta",
                  isAnonymous: false,
                  amount: "₹2,100",
                  temple: "Siddhivinayak Temple",
                  time: "15 mins ago",
                  emoji: "✨",
                },
                {
                  name: "Anonymous",
                  isAnonymous: true,
                  amount: "₹11,000",
                  temple: "Tirupati Balaji",
                  time: "32 mins ago",
                  emoji: "🪔",
                },
                {
                  name: "Karthik Iyer",
                  isAnonymous: false,
                  amount: "₹5,555",
                  temple: "Meenakshi Amman Temple",
                  time: "45 mins ago",
                  emoji: "🌺",
                },
                {
                  name: "Sunita Verma",
                  isAnonymous: false,
                  amount: "₹1,111",
                  temple: "Kashi Vishwanath",
                  time: "1 hour ago",
                  emoji: "🔱",
                },
                {
                  name: "Anonymous",
                  isAnonymous: true,
                  amount: "₹251",
                  temple: "Jagannath Temple",
                  time: "1 hour ago",
                  emoji: "🌊",
                },
                {
                  name: "Amit Kumar",
                  isAnonymous: false,
                  amount: "₹21,000",
                  temple: "Somnath Temple",
                  time: "2 hours ago",
                  emoji: "🌟",
                },
              ].map((donation, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 hover:bg-orange-50 transition-colors"
                >
                  <div className="text-2xl">{donation.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{donation.name}</span> donated{" "}
                      <span className="font-medium">{donation.amount}</span> to{" "}
                      <span className="font-medium">{donation.temple}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{donation.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" className="w-full text-orange-600">
                View All Donations
              </Button>
            </CardFooter>
          </Card>

          {/* Donor Messages & Wishes */}
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Messages</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    temple: "ISKCON Temple",
                    location: "Delhi",
                    donor: "Rajesh S.",
                    message:
                      "Thank you for your generous donation towards our Janmashtami celebrations. Your contribution helped make the event a grand success!",
                    badge: "🙏 Thank you badge",
                    badgeColor: "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",
                    date: "Aug 15, 2023",
                  },
                  {
                    temple: "Siddhivinayak Temple",
                    location: "Mumbai",
                    donor: "Priya M.",
                    message:
                      "Your contribution to our temple construction fund has been invaluable. We are pleased to inform you that the new hall is now 70% complete.",
                    badge: "🏆 Gold Donor",
                    badgeColor: "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
                    date: "Jul 22, 2023",
                  },
                  {
                    temple: "Kashi Vishwanath Temple",
                    location: "Varanasi",
                    donor: "Amit K.",
                    message:
                      "We extend our heartfelt gratitude for your donation that has helped us improve our facilities for pilgrims. Your support means a lot to us.",
                    badge: "🌟 Silver Donor",
                    badgeColor: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
                    date: "Jun 10, 2023",
                  },
                  {
                    temple: "Meenakshi Amman Temple",
                    location: "Madurai",
                    donor: "Sunita R.",
                    message:
                      "Your generous contribution to our food distribution program has helped us serve meals to over 500 people. Thank you for your kindness.",
                    badge: "🍲 Food Donor",
                    badgeColor: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
                    date: "May 5, 2023",
                  },
                ].map((item, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div
                      className={`p-4 ${
                        i % 4 === 0
                          ? "bg-orange-50"
                          : i % 4 === 1
                            ? "bg-green-50"
                            : i % 4 === 2
                              ? "bg-blue-50"
                              : "bg-purple-50"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt={item.temple}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{item.temple}</h3>
                          <p className="text-sm text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">{item.donor}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.date}
                          </div>
                        </div>
                        <p className="text-sm italic">"{item.message}"</p>
                        <p className="text-xs text-muted-foreground mt-2">- Temple Management</p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Badge className={item.badgeColor}>{item.badge}</Badge>
                      </div>
                    </div>
                    <CardFooter className="p-4 flex justify-between items-center">
                      <Button variant="ghost" size="sm" className="text-orange-600">
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button asChild variant="link" size="sm" className="text-orange-600">
                        <Link href={`/temples/${i + 1}`}>
                          Visit Temple
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-6">
              {/* Featured content similar to above */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Featured messages */}</div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              {/* Recent content similar to above */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Recent messages */}</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-orange-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Share Your Gratitude Story</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Have you made a donation that made a difference? Share your experience and inspire others to contribute.
        </p>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">Share Your Story</Button>
      </div>
    </div>
  )
}
