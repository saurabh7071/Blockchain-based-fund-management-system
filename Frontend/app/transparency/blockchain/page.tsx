"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, ExternalLink, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BlockchainVerifier } from "@/components/blockchain-verifier"

export default function BlockchainVerificationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery) return

    setIsSearching(true)

    // Simulate API call to blockchain
    setTimeout(() => {
      if (searchQuery.startsWith("0x")) {
        setSearchResult({
          found: true,
          type: "donation",
          hash: searchQuery,
          date: "September 15, 2023",
          temple: "ISKCON Temple",
          amount: "₹1,001",
          donor: "Anonymous",
          purpose: "Festival Celebrations",
          status: "Confirmed",
          blockNumber: 17584932,
          timestamp: "2023-09-15T14:32:18Z",
        })
      } else {
        setSearchResult({
          found: false,
        })
      }
      setIsSearching(false)
    }, 1500)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/transparency">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transparency
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Blockchain Verification</h1>
        <p className="text-muted-foreground">
          Verify donations and expenses on the blockchain for complete transparency
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Verify Transaction</CardTitle>
              <CardDescription>Enter a transaction hash to verify its authenticity on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter transaction hash (0x...)"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={isSearching || !searchQuery}
                  >
                    {isSearching ? "Searching..." : "Verify"}
                  </Button>
                </div>

                {searchResult && (
                  <div className="mt-6">
                    {searchResult.found ? (
                      <div className="space-y-6">
                        <Alert className="bg-green-50 border-green-200">
                          <Check className="h-4 w-4 text-green-600" />
                          <AlertTitle className="text-green-800">Transaction Verified</AlertTitle>
                          <AlertDescription className="text-green-700">
                            This transaction has been verified on the blockchain and is authentic.
                          </AlertDescription>
                        </Alert>

                        <div className="rounded-lg border p-4">
                          <h3 className="font-semibold text-lg mb-4">Transaction Details</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transaction Type:</span>
                              <span className="font-medium capitalize">{searchResult.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span className="font-medium">{searchResult.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Temple:</span>
                              <span className="font-medium">{searchResult.temple}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Amount:</span>
                              <span className="font-medium">{searchResult.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Donor:</span>
                              <span className="font-medium">{searchResult.donor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Purpose:</span>
                              <span className="font-medium">{searchResult.purpose}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium">{searchResult.status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="font-semibold text-lg mb-4">Blockchain Information</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-muted-foreground">Transaction Hash:</span>
                              <div className="flex items-center mt-1">
                                <code className="text-xs bg-muted p-2 rounded flex-grow overflow-x-auto">
                                  {searchResult.hash}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                  onClick={() => handleCopy(searchResult.hash)}
                                >
                                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                  <span className="sr-only">Copy hash</span>
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Block Number:</span>
                              <span className="font-medium">{searchResult.blockNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Timestamp:</span>
                              <span className="font-medium">{new Date(searchResult.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              className="w-full flex items-center justify-center"
                              onClick={() => window.open("https://etherscan.io", "_blank")}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View on Etherscan
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Alert variant="destructive">
                        <AlertTitle>Transaction Not Found</AlertTitle>
                        <AlertDescription>
                          We couldn't find a transaction with the provided hash. Please check the hash and try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <BlockchainVerifier transactionHash="0x8f7d8a9b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f" />
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Understanding blockchain verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">What is Blockchain Verification?</h3>
                <p className="text-sm text-muted-foreground">
                  Blockchain verification is a process that ensures the authenticity and integrity of transactions by
                  recording them on a decentralized, immutable ledger.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Our Verification Process</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Transaction Recording</span>: Every donation and
                    expense is recorded on the Ethereum blockchain.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Hash Generation</span>: A unique transaction hash is
                    generated for each transaction.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Immutable Storage</span>: The transaction details are
                    permanently stored on the blockchain.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Public Verification</span>: Anyone can verify the
                    authenticity of a transaction using its hash.
                  </li>
                </ol>
              </div>

              <div className="rounded-lg bg-muted p-4 mt-4">
                <h3 className="font-semibold mb-2">Where to Find Transaction Hashes</h3>
                <p className="text-sm text-muted-foreground mb-2">Transaction hashes can be found in:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Donation receipts</li>
                  <li>Expense records</li>
                  <li>Audit reports</li>
                  <li>Your donation history in your account dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Verified Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 border-b pb-4">
                  <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Donation to ISKCON Temple</p>
                    <p className="text-sm text-muted-foreground">₹1,001 • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Food Distribution Expense</p>
                    <p className="text-sm text-muted-foreground">₹45,000 • 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Donation to Tirupati Balaji</p>
                    <p className="text-sm text-muted-foreground">₹5,001 • 8 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Temple Maintenance Expense</p>
                    <p className="text-sm text-muted-foreground">₹25,000 • 12 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
