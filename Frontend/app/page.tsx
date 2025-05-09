import Link from "next/link"
import Image from "next/image"
import { Search, Filter, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { FeaturedTemples } from "@/components/featured-temples"
import { HomeCarousel } from "@/components/home-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Carousel */}
      <HomeCarousel />

      {/* Search Section with Stats */}
      <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search temples by name, location, or deity..." className="pl-10 py-6 text-base" />
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Stats Section - Moved to yellow area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-600 mb-2">500+</h3>
                <p className="text-lg font-medium">Temples Onboarded</p>
                <p className="text-sm text-muted-foreground">Across 25 states in India</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-600 mb-2">₹10Cr+</h3>
                <p className="text-lg font-medium">Donations Processed</p>
                <p className="text-sm text-muted-foreground">With blockchain verification</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-orange-600 mb-2">50,000+</h3>
                <p className="text-lg font-medium">Devotees Supported</p>
                <p className="text-sm text-muted-foreground">Making transparent donations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Temples</h2>
          <Button asChild variant="ghost" className="text-orange-600 hover:text-orange-700">
            <Link href="/temples">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <FeaturedTemples />
      </section>

      {/* Features Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">100% Transparency</h3>
                <p className="text-center text-muted-foreground">
                  Every donation is recorded on blockchain with complete expense tracking.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Multiple Payment Options</h3>
                <p className="text-center text-muted-foreground">
                  Donate using UPI, cards, digital wallets, or cryptocurrency.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Direct Impact</h3>
                <p className="text-center text-muted-foreground">
                  Choose specific purposes for your donation and see the impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Devotees Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "The transparency this platform provides is incredible. I can see exactly how my donations are being used.",
              name: "Rajesh Kumar",
              location: "Delhi",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              quote:
                "I love being able to donate to my favorite temples even when I'm abroad. The blockchain verification gives me peace of mind.",
              name: "Priya Sharma",
              location: "Mumbai",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              quote:
                "The Wall of Gratitude is such a beautiful feature. It makes me feel connected to the temple community.",
              name: "Amit Patel",
              location: "Ahmedabad",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-orange-100"
                    />
                  </div>
                  <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Support a Temple?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of devotees who are making a difference through transparent donations.
        </p>
        <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link href="/temples">Explore Temples Now</Link>
        </Button>
      </section>
    </div>
  )
}
