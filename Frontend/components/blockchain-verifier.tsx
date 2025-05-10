"use client"

import { useState, useEffect } from "react"
import { Check, Loader2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function BlockchainVerifier({ transactionHash }) {
  const [verificationState, setVerificationState] = useState("idle") // idle, verifying, success, error
  const [progress, setProgress] = useState(0)
  const [verificationDetails, setVerificationDetails] = useState(null)

  useEffect(() => {
    if (transactionHash) {
      verifyTransaction()
    }
  }, [transactionHash])

  const verifyTransaction = async () => {
    setVerificationState("verifying")
    setProgress(0)

    // Simulate verification steps
    await simulateProgress(0, 20, "Connecting to blockchain network...")
    await simulateProgress(20, 40, "Locating transaction...")
    await simulateProgress(40, 60, "Verifying transaction signature...")
    await simulateProgress(60, 80, "Validating transaction data...")
    await simulateProgress(80, 100, "Completing verification...")

    // Set success state with mock data
    setTimeout(() => {
      setVerificationState("success")
      setVerificationDetails({
        hash: transactionHash,
        blockNumber: 17584932,
        timestamp: "2023-09-15T14:32:18Z",
        from: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        value: "0.01 ETH",
        gasUsed: "21000",
        status: "Success",
      })
    }, 1000)
  }

  const simulateProgress = async (start, end, message) => {
    return new Promise((resolve) => {
      let current = start
      const interval = setInterval(() => {
        current += 1
        setProgress(current)
        if (current >= end) {
          clearInterval(interval)
          resolve()
        }
      }, 30)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Verification</CardTitle>
        <CardDescription>
          Verify the authenticity of transaction {transactionHash.substring(0, 6)}...
          {transactionHash.substring(transactionHash.length - 4)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationState === "idle" && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Ready to verify transaction</p>
          </div>
        )}

        {verificationState === "verifying" && (
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Verifying transaction...</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          </div>
        )}

        {verificationState === "success" && verificationDetails && (
          <div className="space-y-6">
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Transaction Verified</AlertTitle>
              <AlertDescription className="text-green-700">
                This transaction has been verified on the blockchain and is authentic.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Block Number</p>
                  <p className="font-medium">{verificationDetails.blockNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-medium">{new Date(verificationDetails.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium text-sm font-mono truncate">{verificationDetails.from}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium text-sm font-mono truncate">{verificationDetails.to}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">{verificationDetails.value}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gas Used</p>
                  <p className="font-medium">{verificationDetails.gasUsed}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium text-green-600">{verificationDetails.status}</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                View on Etherscan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-3 w-3"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {verificationState === "error" && (
          <Alert variant="destructive">
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>
              We couldn't verify this transaction. Please check the transaction hash and try again.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
