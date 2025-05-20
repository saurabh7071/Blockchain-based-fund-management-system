import Link from "next/link"
import Image from "next/image"
import { MapPin, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const temples = [
  {
    id: "1",
    name: "Shri Siddhivinayak Temple",
    location: "Mumbai, Maharashtra",
    image: "/placeholder.svg?height=300&width=400",
    description: "One of the most visited temples in Mumbai, dedicated to Lord Ganesha.",
    donationGoal: "₹50,00,000",
    donationRaised: "₹32,45,000",
    isVerified: true,
  },
  {
    id: "2",
    name: "Kedarnath Temple",
    location: "Rudraprayag, Uttarakhand",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ancient temple dedicated to Lord Shiva, located in the Himalayan range.",
    donationGoal: "₹1,00,00,000",
    donationRaised: "₹78,50,000",
    isVerified: true,
  },
  {
    id: "3",
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    image: "/placeholder.svg?height=300&width=400",
    description: "The holiest Gurdwara and an important pilgrimage site for Sikhs.",
    donationGoal: "₹75,00,000",
    donationRaised: "₹45,20,000",
    isVerified: true,
  },
  {
    id: "4",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    image: "/placeholder.svg?height=300&width=400",
    description: "Historic Hindu temple dedicated to goddess Meenakshi and Lord Sundareswarar.",
    donationGoal: "₹60,00,000",
    donationRaised: "₹28,75,000",
    isVerified: true,
  },
  {
    id: "5",
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    image: "/placeholder.svg?height=300&width=400",
    description: "Famous temple dedicated to Lord Jagannath, known for its annual Rath Yatra.",
    donationGoal: "₹80,00,000",
    donationRaised: "₹52,30,000",
    isVerified: true,
  },
  {
    id: "6",
    name: "Somnath Temple",
    location: "Veraval, Gujarat",
    image: "/placeholder.svg?height=300&width=400",
    description: "One of the twelve Jyotirlingas dedicated to Lord Shiva.",
    donationGoal: "₹70,00,000",
    donationRaised: "₹41,60,000",
    isVerified: true,
  },
]

export function FeaturedTemples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {temples.map((temple) => (
        <Card
          key={temple.id}
          className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative">
            <Image
              src={temple.image || "/placeholder.svg"}
              alt={temple.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            {temple.isVerified && (
              <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">Verified</Badge>
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">{temple.name}</h3>
              <Button variant="ghost" size="icon" className="text-orange-600">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{temple.location}</span>
            </div>
            <p className="text-muted-foreground mb-4 line-clamp-2">{temple.description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Donation Goal</span>
                <span className="font-medium">
                  {temple.donationRaised} / {temple.donationGoal}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (Number.parseInt(temple.donationRaised.replace(/[^\d]/g, "")) /
                        Number.parseInt(temple.donationGoal.replace(/[^\d]/g, ""))) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/temples/${temple.id}`}>View Details</Link>
            </Button>
            <Button asChild className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
              <Link href={`/temples/${temple.id}/donate`}>Donate</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
