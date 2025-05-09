"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-orange-600"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            <span className="hidden font-bold sm:inline-block">Temple Donations</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/temples" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Temples</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/gratitude-wall" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Wall of Gratitude</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Transparency</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-500 to-orange-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/transparency"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Blockchain Transparency</div>
                          <p className="text-sm leading-tight text-white/90">
                            Learn how we use blockchain to ensure complete transparency in donations.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/transparency/expenses" title="Expense Tracking">
                      See how temples track and report their expenses
                    </ListItem>
                    <ListItem href="/transparency/audit" title="Audit Reports">
                      View and download temple audit reports
                    </ListItem>
                    <ListItem href="/transparency/blockchain" title="Blockchain Verification">
                      Verify donations on the blockchain
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link href="/dashboard">My Donations</Link>
          </Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white hidden md:flex">
            <Link href="/login">Login / Signup</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/temples"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Temples
            </Link>
            <Link
              href="/gratitude-wall"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Wall of Gratitude
            </Link>
            <Link
              href="/transparency"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Transparency
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              My Donations
            </Link>
            <Link
              href="/login"
              className="block rounded-md px-3 py-2 text-base font-medium bg-orange-600 text-white hover:bg-orange-700 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
