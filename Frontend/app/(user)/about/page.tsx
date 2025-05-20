import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Mail, Phone, MapPin } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Temple background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Our Platform</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Connecting devotees with temples through transparent, blockchain-verified donations
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We are dedicated to revolutionizing temple donations by bringing complete transparency, trust, and
            convenience to the process. Our platform connects devotees with temples across India, ensuring that every
            donation is tracked, verified, and utilized properly.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Transparency First</h3>
                <p className="text-muted-foreground">
                  Every donation and expense is recorded on the blockchain for complete transparency and verification.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Supporting Temple Growth</h3>
                <p className="text-muted-foreground">
                  We help temples modernize their donation collection and management systems to reach more devotees.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Empowering Devotees</h3>
                <p className="text-muted-foreground">
                  We give devotees the power to track their donations and see the impact they're making.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Our Mission"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">The Beginning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our journey began in 2020 when our founder, Arjun Mehta, noticed the lack of transparency in temple
                donations. As a devotee himself, he wanted to create a system where people could donate with complete
                trust.
              </p>
              <p className="text-muted-foreground">
                With a small team of developers and temple administrators, the first version of our platform was
                launched, connecting just 5 temples in Delhi with their devotees.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Growth & Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                By 2021, we had expanded to over 100 temples across North India. We introduced blockchain verification
                for all donations, becoming the first platform in India to offer this level of transparency for
                religious donations.
              </p>
              <p className="text-muted-foreground">
                Our innovative approach attracted attention from both tech and religious communities, leading to
                partnerships with major temple trusts across the country.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Today & Tomorrow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Today, we connect over 500 temples with devotees worldwide. Our platform processes thousands of
                donations daily, all with complete transparency and blockchain verification.
              </p>
              <p className="text-muted-foreground">
                Looking ahead, we aim to onboard 5,000 temples by 2025 and expand our services to include virtual
                darshans, religious education, and community building features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-orange-50 rounded-xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Since our inception, we've made a significant impact in transforming temple donations across India
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-orange-600">500+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Temples Onboarded</p>
              <p className="text-sm text-muted-foreground">
                Across 25 states in India, representing all major religious denominations
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-orange-600">₹10Cr+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Donations Processed</p>
              <p className="text-sm text-muted-foreground">
                Securely processed and verified on the blockchain with complete transparency
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-orange-600">50,000+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Devotees Supported</p>
              <p className="text-sm text-muted-foreground">
                Helping devotees connect with temples and make meaningful contributions
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-orange-600">100%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Transparency</p>
              <p className="text-sm text-muted-foreground">
                Every transaction is verified and can be tracked by donors in real-time
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Arjun Mehta",
              role: "Founder & CEO",
              bio: "Former tech executive with a passion for spirituality and transparency",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Priya Sharma",
              role: "Head of Temple Relations",
              bio: "20+ years experience working with religious institutions across India",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Vikram Singh",
              role: "CTO",
              bio: "Blockchain expert with previous experience at major tech companies",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Ananya Patel",
              role: "Head of User Experience",
              bio: "Dedicated to making spiritual giving accessible to everyone",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <Card key={index} className="border-none shadow-md overflow-hidden">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-orange-600 mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These principles guide everything we do at Temple Donation Platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
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
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              We believe in complete openness in all our operations. Every donation and expense is tracked and verified
              on the blockchain.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
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
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Devotion</h3>
            <p className="text-muted-foreground">
              We respect and honor the spiritual significance of temple donations and ensure our platform enhances the
              devotional experience.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-muted-foreground">
              We build trust through verification, ensuring that every donation reaches its intended purpose and is used
              appropriately.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="temples">For Temples</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Temple Donation Platform?</AccordionTrigger>
                <AccordionContent>
                  Temple Donation Platform is a digital platform that connects devotees with temples across India,
                  allowing for transparent, secure, and convenient donations. We use blockchain technology to ensure
                  complete transparency in how donations are received and utilized.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does blockchain verification work?</AccordionTrigger>
                <AccordionContent>
                  When you make a donation, a record is created on the blockchain - a secure, immutable digital ledger.
                  This record contains details of your donation including the amount, recipient temple, and purpose.
                  This creates a permanent, tamper-proof record that can be verified by anyone, ensuring complete
                  transparency.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. Your personal information is encrypted and stored securely.
                  We only share the minimum necessary information with temples for donation processing. You can also
                  choose to remain anonymous for public displays like the Wall of Gratitude.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="donations" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                  We accept a wide range of payment methods including UPI, credit/debit cards, net banking, and
                  cryptocurrencies. All payment processing is secure and complies with industry standards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I get a receipt for my donation?</AccordionTrigger>
                <AccordionContent>
                  Yes, you will receive an electronic receipt for every donation you make through our platform. This
                  receipt includes details of your donation and can be used for tax purposes where applicable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I track how my donation is used?</AccordionTrigger>
                <AccordionContent>
                  Our platform provides complete transparency on how donations are utilized. You can visit the temple's
                  expense tracking page to see detailed information about expenses, including receipts and verification
                  details. All major expenses are recorded on the blockchain for additional verification.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="temples" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can our temple join the platform?</AccordionTrigger>
                <AccordionContent>
                  Temples can apply to join our platform through the "Temple Onboarding" section. We'll need some basic
                  information about your temple, verification documents, and banking details. Our team will guide you
                  through the entire process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the fees for temples?</AccordionTrigger>
                <AccordionContent>
                  We charge a minimal processing fee of 1% on donations to cover platform maintenance and development
                  costs. There are no setup fees or monthly charges. For temples serving underprivileged communities, we
                  offer fee waivers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How quickly will our temple receive the donations?</AccordionTrigger>
                <AccordionContent>
                  Donations are typically settled within 2-3 business days. For temples with verified accounts, we offer
                  an express settlement option with next-day transfers. All transactions are secure and fully
                  documented.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Section */}
      <div className="bg-orange-50 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Have questions or suggestions? We'd love to hear from you. Reach out to our team using any of the methods
              below.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-600 mr-3" />
                <p>support@templedonation.org</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-600 mr-3" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-orange-600 mr-3" />
                <p>123 Devotee Lane, Spiritual District, New Delhi - 110001</p>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/contact">Send Us a Message</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=300&width=600" alt="Office location" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Whether you're a devotee looking to contribute or a temple seeking to modernize your donation system, we
          invite you to be part of our growing community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Link href="/temples">
              Explore Temples <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
