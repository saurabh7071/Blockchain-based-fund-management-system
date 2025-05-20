import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Contact & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're here to help with any questions about temple donations, technical support, or general inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-orange-600" />
              <span>Call Us</span>
            </CardTitle>
            <CardDescription>Speak directly with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">+91 1800-123-4567</p>
            <p className="text-sm text-muted-foreground mt-1">Available 9 AM - 6 PM IST, Monday to Saturday</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange-600" />
              <span>Email Us</span>
            </CardTitle>
            <CardDescription>Send us your queries anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">support@templedonations.org</p>
            <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-600" />
              <span>Visit Us</span>
            </CardTitle>
            <CardDescription>Our office location</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">123 Devotee Lane, Spiritual District</p>
            <p className="text-sm text-muted-foreground mt-1">New Delhi, India - 110001</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="What is your message about?" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Please describe your query in detail" rows={5} />
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How are donations used by temples?</AccordionTrigger>
              <AccordionContent>
                Donations are used for temple maintenance, religious ceremonies, community services, food distribution,
                education programs, and healthcare initiatives. Each temple provides transparent reporting on how funds
                are utilized.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Are donations tax-deductible?</AccordionTrigger>
              <AccordionContent>
                Yes, donations made through our platform are eligible for tax deductions under Section 80G of the Income
                Tax Act. You will receive a donation receipt that can be used for tax purposes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I verify my donation was received?</AccordionTrigger>
              <AccordionContent>
                All donations are recorded on our blockchain-based system. You can verify your donation by visiting the
                Transparency section and using our Blockchain Verification tool with your transaction ID.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I make anonymous donations?</AccordionTrigger>
              <AccordionContent>
                Yes, we respect your privacy. You can choose to make your donation anonymous during the checkout
                process. Your personal information will not be displayed on the Wall of Gratitude or any public section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I set up recurring donations?</AccordionTrigger>
              <AccordionContent>
                You can set up recurring donations by selecting the "Make this a monthly donation" option during
                checkout. You can manage your recurring donations from your account dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="bg-orange-50 rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
          <MessageSquare className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Temple Support</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Are you a temple administrator looking for assistance with our platform? Our dedicated temple support team is
          here to help.
        </p>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <a href="mailto:temple-support@templedonations.org">Contact Temple Support</a>
        </Button>
      </div>
    </div>
  )
}
