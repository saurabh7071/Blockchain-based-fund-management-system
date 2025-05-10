import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, FileText, Search, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransparencyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Transparency & Accountability</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our platform ensures complete transparency in temple donations through blockchain verification, expense
          tracking, and independent audits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>100% Verified</CardTitle>
            <CardDescription>All transactions are verified on the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Every donation and expense is recorded on the blockchain, creating an immutable and transparent record
              that anyone can verify.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="link" className="text-orange-600">
              <Link href="/transparency/blockchain">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>Expense Tracking</CardTitle>
            <CardDescription>Detailed tracking of how funds are utilized</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track exactly how temple funds are being used with detailed expense records, categorization, and
              verification.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="link" className="text-orange-600">
              <Link href="/transparency/expenses">
                View Expenses <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>Independent Audits</CardTitle>
            <CardDescription>Regular audits by reputable firms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All temples undergo regular financial audits by independent accounting firms to ensure compliance and
              transparency.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="link" className="text-orange-600">
              <Link href="/transparency/audit">
                View Audit Reports <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-orange-50 rounded-xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Blockchain Verification</h2>
            <p className="text-muted-foreground mb-6">
              Our platform leverages blockchain technology to ensure complete transparency and trust in temple
              donations. Every transaction is recorded on the blockchain, creating an immutable record that can be
              verified by anyone.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center">
                  <span className="text-orange-700 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Immutable Records</h3>
                  <p className="text-sm text-muted-foreground">
                    Once recorded on the blockchain, transaction details cannot be altered or deleted.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center">
                  <span className="text-orange-700 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Public Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Anyone can verify the authenticity of transactions using the transaction hash.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center">
                  <span className="text-orange-700 font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Transparent Flow of Funds</h3>
                  <p className="text-sm text-muted-foreground">
                    Track the complete journey of your donation from receipt to utilization.
                  </p>
                </div>
              </div>
            </div>
            <Button asChild className="mt-6 bg-orange-600 hover:bg-orange-700 text-white">
              <Link href="/transparency/blockchain">Verify a Transaction</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Blockchain Verification"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Transparency Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor donation statistics and expense utilization in real-time through interactive dashboards.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expense Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All temple expenses are recorded with receipts and verified on the blockchain for complete transparency.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quarterly Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Independent accounting firms conduct regular audits of temple finances to ensure compliance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Public Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed financial reports are published regularly and accessible to all donors and stakeholders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Verify a Transaction</h2>
          <p className="text-muted-foreground">Enter a transaction hash to verify its authenticity on the blockchain</p>
        </div>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter transaction hash (0x...)"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">Verify</Button>
        </div>
        <div className="text-center mt-4">
          <Button asChild variant="link" className="text-orange-600">
            <Link href="/transparency/blockchain">
              Learn more about blockchain verification <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
