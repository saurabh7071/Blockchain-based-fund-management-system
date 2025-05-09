import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Calendar, ExternalLink, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonationStats } from "@/components/donation-stats"
import { ExpenseTable } from "@/components/expense-table"
import { DonatePanel } from "@/components/donate-panel"

export default function TemplePage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API
  const temple = {
    id: params.id,
    name: "ISKCON Temple",
    location: "Delhi",
    image: "/placeholder.svg?height=500&width=1000",
    description:
      "The International Society for Krishna Consciousness (ISKCON), known colloquially as the Hare Krishna movement, is a Hindu religious organization. ISKCON was founded in 1966 in New York City by A. C. Bhaktivedanta Swami Prabhupada. Its core beliefs are based on Hindu scriptures, particularly the Bhagavad Gita and the Bhagavata Purana.",
    totalDonations: "₹45,00,000",
    lastMonthExpense: "₹12,50,000",
    isVerified: true,
    deity: "Krishna",
    darshan: [
      { day: "Monday - Friday", time: "4:30 AM - 9:00 PM" },
      { day: "Saturday - Sunday", time: "4:30 AM - 10:00 PM" },
      { day: "Special Festivals", time: "4:00 AM - 11:00 PM" },
    ],
    activities: [
      "Daily Aarti",
      "Prasadam Distribution",
      "Spiritual Discourses",
      "Bhagavad Gita Classes",
      "Cultural Programs",
    ],
    events: [
      { name: "Janmashtami Celebration", date: "August 15, 2023" },
      { name: "Radha Ashtami", date: "September 5, 2023" },
      { name: "Diwali Celebration", date: "November 12, 2023" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/temples">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Temples
          </Link>
        </Button>
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6">
          <Image src={temple.image || "/placeholder.svg"} alt={temple.name} fill className="object-cover" />
          {temple.isVerified && (
            <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700">Verified Temple</Badge>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{temple.name}</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{temple.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              <a href="#donate">Donate Now</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {temple.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{temple.description}</p>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Darshan Timings</h3>
                  <div className="space-y-2">
                    {temple.darshan.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{item.day}</p>
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Activities & Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {temple.activities.map((activity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-orange-600 mr-2"></div>
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donations" className="mt-6">
              <DonationStats />
            </TabsContent>

            <TabsContent value="expenses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExpenseTable />
                  <div className="flex justify-between items-center mt-6">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Audit Report
                    </Button>
                    <Button variant="link" className="text-orange-600">
                      View All Expenses
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {temple.events.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div id="donate">
          <DonatePanel templeId={temple.id} templeName={temple.name} />
        </div>
      </div>
    </div>
  )
}
