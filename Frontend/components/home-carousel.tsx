"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=500&width=1920",
    title: "Support Temples with Transparency",
    description: "Make donations to temples across the country with complete blockchain verification.",
    buttonText: "Explore Temples",
    buttonLink: "/temples",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=500&width=1920",
    title: "Track Your Donations in Real-Time",
    description: "See exactly how your contributions are being utilized with our transparent tracking system.",
    buttonText: "View Transparency",
    buttonLink: "/transparency",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=500&width=1920",
    title: "Join Our Wall of Gratitude",
    description: "Be recognized for your generosity and see the impact of your donations.",
    buttonText: "View Wall of Gratitude",
    buttonLink: "/gratitude-wall",
  },
]

export function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  const goToPrevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToNextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return

    setIsAnimating(true)
    setCurrentSlide(index)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="relative w-full h-full flex-shrink-0">
            <div className="absolute inset-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover brightness-50"
                priority
              />
            </div>
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">{item.title}</h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeIn">{item.description}</p>
                <div className="flex justify-center">
                  <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white animate-fadeIn">
                    <Link href={item.buttonLink}>
                      {item.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-20 rounded-full h-10 w-10"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-20 rounded-full h-10 w-10"
        onClick={goToNextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
