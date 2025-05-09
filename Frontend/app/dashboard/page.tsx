import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Download, ExternalLink, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Chart } from "@/components/ui/chart"

export default function DashboardPage() {
  const donations = [
    {
      id: "DON-001",
      date: "2023-08-15",
      temple: "ISKCON Temple",
      amount: "₹1,001",
      status: "confirmed",
      purpose: "Festival",
      receipt: "receipt-001.pdf",
      hash: "0x8f7d8a9b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    },
    {
      id: "DON-002",
      date: "2023-07-22",
      temple: "Shri Siddhivinayak Temple",
      amount: "₹5,001",
      status: "confirmed",
      purpose: "Construction",
      receipt: "receipt-002.pdf",
      hash: "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    },
    {
      id: "DON-003",
      date: "2023-06-10",
      temple: "Kashi Vishwanath Temple",
      amount: "₹2,001",
      status: "confirmed",
      purpose: "General",
      receipt: "receipt-003.pdf",
      hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
    {
      id: "DON-004",
      date: "2023-05-05",
      temple: "Meenakshi Amman Temple",
      amount: "₹501",
      status: "confirmed",
      purpose: "Food",
      receipt: "receipt-004.pdf",
      hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    },
    {
      id: "DON-005",
      date: "2023-09-01",
      temple: "Tirupati Balaji Temple",
      amount: "₹10,001",
      status: "pending",
      purpose: "General",
      receipt: null,
      hash: null,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Donations</h1>
          <p className="text-muted-foreground">Track and manage all your temple donations</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search donations..." className="pl-9 w-[200px]" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,505</div>
            <p className="text-xs text-muted-foreground">Across 5 temples</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Donation Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <p className="text-xs text-muted-foreground">Top 10% of donors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Karma Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+50 this month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Donations</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>Complete record of all your donations with verification details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Temple</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.id}</TableCell>
                      <TableCell>{formatDate(donation.date)}</TableCell>
                      <TableCell>{donation.temple}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={donation.status === "confirmed" ? "outline" : "secondary"}
                          className={
                            donation.status === "confirmed"
                              ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                              : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                          }
                        >
                          {donation.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {donation.receipt && (
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download receipt</span>
                            </Button>
                          )}
                          {donation.hash && (
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View on blockchain</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Your most recent temple donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donations.slice(0, 3).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-orange-600"
                        >
                          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{donation.temple}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(donation.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{donation.amount}</p>
                      <p className="text-sm text-muted-foreground">{donation.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Donations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Donations</CardTitle>
              <CardDescription>Donations that are still being processed</CardDescription>
            </CardHeader>
            <CardContent>
              {donations.filter((d) => d.status === "pending").length > 0 ? (
                <div className="space-y-4">
                  {donations
                    .filter((d) => d.status === "pending")
                    .map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-yellow-100 w-12 h-12 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-yellow-600"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">{donation.temple}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(donation.date)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{donation.amount}</p>
                          <Badge
                            variant="secondary"
                            className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                          >
                            Pending
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground">You don't have any pending donations at the moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Statistics</CardTitle>
              <CardDescription>Visualize your donation patterns and impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Donation by Temple</h3>
                  <Chart
                    type="pie"
                    options={{
                      chart: {
                        id: "donation-by-temple",
                        toolbar: {
                          show: false,
                        },
                      },
                      labels: [
                        "ISKCON Temple",
                        "Siddhivinayak Temple",
                        "Kashi Vishwanath",
                        "Meenakshi Amman",
                        "Tirupati Balaji",
                      ],
                      colors: ["#f97316", "#84cc16", "#06b6d4", "#8b5cf6", "#ec4899"],
                      legend: {
                        position: "bottom",
                      },
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            chart: {
                              width: 300,
                            },
                            legend: {
                              position: "bottom",
                            },
                          },
                        },
                      ],
                    }}
                    series={[1001, 5001, 2001, 501, 10001]}
                    height={300}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Donation by Purpose</h3>
                  <Chart
                    type="pie"
                    options={{
                      chart: {
                        id: "donation-by-purpose",
                        toolbar: {
                          show: false,
                        },
                      },
                      labels: ["Festival", "Construction", "General", "Food"],
                      colors: ["#f97316", "#84cc16", "#06b6d4", "#8b5cf6"],
                      legend: {
                        position: "bottom",
                      },
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            chart: {
                              width: 300,
                            },
                            legend: {
                              position: "bottom",
                            },
                          },
                        },
                      ],
                    }}
                    series={[1001, 5001, 12002, 501]}
                    height={300}
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Donation Timeline</h3>
                <Chart
                  type="line"
                  options={{
                    chart: {
                      id: "donation-timeline",
                      toolbar: {
                        show: false,
                      },
                    },
                    xaxis: {
                      categories: ["May", "Jun", "Jul", "Aug", "Sep"],
                    },
                    stroke: {
                      curve: "smooth",
                    },
                    colors: ["#f97316"],
                    markers: {
                      size: 5,
                    },
                  }}
                  series={[
                    {
                      name: "Donation Amount",
                      data: [501, 2001, 5001, 1001, 10001],
                    },
                  ]}
                  height={300}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download Donation Report
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Wall of Gratitude</CardTitle>
              <CardDescription>Temples that have recognized your contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="ISKCON Temple"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">ISKCON Temple</h3>
                      <p className="text-sm text-muted-foreground">Delhi</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <p className="text-sm italic">
                      "Thank you for your generous donation towards our Janmashtami celebrations. Your contribution
                      helped make the event a grand success!"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">- Temple Management</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200">
                      🙏 Thank you badge
                    </Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Siddhivinayak Temple"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Siddhivinayak Temple</h3>
                      <p className="text-sm text-muted-foreground">Mumbai</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <p className="text-sm italic">
                      "Your contribution to our temple construction fund has been invaluable. We are pleased to inform
                      you that the new hall is now 70% complete."
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">- Temple Trust</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                      🏆 Gold Donor
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="mx-auto text-orange-600">
                <Link href="/gratitude-wall">
                  View Full Gratitude Wall
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Temples</CardTitle>
              <CardDescription>Based on your donation history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 border-b pb-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Jagannath Temple"
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Jagannath Temple</p>
                    <p className="text-sm text-muted-foreground">Puri, Odisha</p>
                  </div>
                  <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Link href="/temples/6">Donate</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Somnath Temple"
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Somnath Temple</p>
                    <p className="text-sm text-muted-foreground">Gujarat</p>
                  </div>
                  <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Link href="/temples/7">Donate</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Golden Temple"
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Golden Temple</p>
                    <p className="text-sm text-muted-foreground">Amritsar, Punjab</p>
                  </div>
                  <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Link href="/temples/8">Donate</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/temples">Explore All Temples</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}
