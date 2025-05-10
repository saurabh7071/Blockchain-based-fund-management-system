"use client"

import { useEffect, useState } from "react"
import CountUp from "react-countup"

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {isVisible && <CountUp start={0} end={500} duration={2.5} separator="," suffix="+" />}
            </div>
            <p className="text-muted-foreground">Temples Onboarded</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {isVisible && (
                <CountUp start={0} end={10} decimals={2} duration={2.5} separator="," prefix="₹" suffix="Cr+" />
              )}
            </div>
            <p className="text-muted-foreground">Total Donations Processed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {isVisible && <CountUp start={0} end={50000} duration={2.5} separator="," suffix="+" />}
            </div>
            <p className="text-muted-foreground">Devotees Supported</p>
          </div>
        </div>
      </div>
    </section>
  )
}
