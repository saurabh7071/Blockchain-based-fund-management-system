import { Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function TemplesPage() {
  const temples = [
    {
      id: 1,
      name: "ISKCON Temple",
      location: "Delhi",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹45,00,000",
      lastMonthExpense: "₹12,50,000",
      isVerified: true,
      deity: "Krishna",
    },
    {
      id: 2,
      name: "Shri Siddhivinayak Temple",
      location: "Mumbai",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹1,20,00,000",
      lastMonthExpense: "₹35,00,000",
      isVerified: true,
      deity: "Ganesha",
    },
    {
      id: 3,
      name: "Meenakshi Amman Temple",
      location: "Madurai",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹75,00,000",
      lastMonthExpense: "₹18,00,000",
      isVerified: true,
      deity: "Meenakshi",
    },
    {
      id: 4,
      name: "Kashi Vishwanath Temple",
      location: "Varanasi",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹95,00,000",
      lastMonthExpense: "₹22,00,000",
      isVerified: true,
      deity: "Shiva",
    },
    {
      id: 5,
      name: "Tirupati Balaji Temple",
      location: "Tirupati",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹2,50,00,000",
      lastMonthExpense: "₹75,00,000",
      isVerified: true,
      deity: "Vishnu",
    },
    {
      id: 6,
      name: "Jagannath Temple",
      location: "Puri",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹85,00,000",
      lastMonthExpense: "₹25,00,000",
      isVerified: true,
      deity: "Jagannath",
    },
    {
      id: 7,
      name: "Somnath Temple",
      location: "Gujarat",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹65,00,000",
      lastMonthExpense: "₹15,00,000",
      isVerified: true,
      deity: "Shiva",
    },
    {
      id: 8,
      name: "Golden Temple",
      location: "Amritsar",
      image: "/placeholder.svg?height=300&width=400",
      totalDonations: "₹1,10,00,000",
      lastMonthExpense: "₹30,00,000",
      isVerified: true,
      deity: "Sikh",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Temples</h1>
          <p className="text-muted-foreground">Discover and support temples across India with transparent donations</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Select defaultValue="popular">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="donations">Highest Donations</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Adjust view</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border shadow-sm p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search temples..." className="pl-9" />
              </div>
            </div>

            <Accordion type="multiple" defaultValue={["location", "deity", "verified"]}>
              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="delhi" />
                      <label htmlFor="delhi" className="text-sm">
                        Delhi
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mumbai" />
                      <label htmlFor="mumbai" className="text-sm">
                        Mumbai
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="varanasi" />
                      <label htmlFor="varanasi" className="text-sm">
                        Varanasi
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="madurai" />
                      <label htmlFor="madurai" className="text-sm">
                        Madurai
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tirupati" />
                      <label htmlFor="tirupati" className="text-sm">
                        Tirupati
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="more-locations" />
                      <label htmlFor="more-locations" className="text-sm">
                        Show more
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="deity">
                <AccordionTrigger>Deity</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="shiva" />
                      <label htmlFor="shiva" className="text-sm">
                        Shiva
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vishnu" />
                      <label htmlFor="vishnu" className="text-sm">
                        Vishnu
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ganesha" />
                      <label htmlFor="ganesha" className="text-sm">
                        Ganesha
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="krishna" />
                      <label htmlFor="krishna" className="text-sm">
                        Krishna
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="more-deities" />
                      <label htmlFor="more-deities" className="text-sm">
                        Show more
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="verified">
                <AccordionTrigger>Verification</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" defaultChecked />
                      <label htmlFor="verified" className="text-sm">
                        Verified Temples
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="unverified" />
                      <label htmlFor="unverified" className="text-sm">
                        Unverified Temples
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="donation-needs">
                <AccordionTrigger>Donation Needs</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="construction" />
                      <label htmlFor="construction" className="text-sm">
                        Construction
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="festivals" />
                      <label htmlFor="festivals" className="text-sm">
                        Festivals
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="food" />
                      <label htmlFor="food" className="text-sm">
                        Food Distribution
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maintenance" />
                      <label htmlFor="maintenance" className="text-sm">
                        Maintenance
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-4" />

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Apply Filters</Button>
          </div>
        </div>

        {/* Temple Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map((temple) => (
              <Card key={temple.id} className="overflow-hidden border-none shadow-md">
                <div className="relative">
                  <Image
                    src={temple.image || "/placeholder.svg"}
                    alt={temple.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {temple.isVerified && (
                    <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700">Verified</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{temple.name}</h3>
                      <p className="text-sm text-muted-foreground">{temple.location}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Donations</span>
                        <span className="font-medium">{temple.totalDonations}</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Last Month Expenses</span>
                        <span className="font-medium">{temple.lastMonthExpense}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/temples/${temple.id}`}>View Details</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Link href={`/temples/${temple.id}/donate`}>Donate</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
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
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" className="bg-orange-600 text-white hover:bg-orange-700">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <Button variant="outline" size="icon">
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
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
