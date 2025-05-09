import Link from "next/link"
import { ArrowLeft, Calendar, Download, ExternalLink, FileText, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AuditReportPage() {
  const auditReports = [
    {
      id: "AR-2023-Q3",
      temple: "ISKCON Temple",
      period: "Q3 2023",
      date: "October 15, 2023",
      auditor: "Deloitte",
      status: "verified",
      fileSize: "2.4 MB",
      hash: "0x8f7d8a9b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    },
    {
      id: "AR-2023-Q2",
      temple: "ISKCON Temple",
      period: "Q2 2023",
      date: "July 12, 2023",
      auditor: "Deloitte",
      status: "verified",
      fileSize: "2.1 MB",
      hash: "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    },
    {
      id: "AR-2023-Q3",
      temple: "Shri Siddhivinayak Temple",
      period: "Q3 2023",
      date: "October 10, 2023",
      auditor: "KPMG",
      status: "verified",
      fileSize: "3.2 MB",
      hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
    {
      id: "AR-2023-Q2",
      temple: "Shri Siddhivinayak Temple",
      period: "Q2 2023",
      date: "July 8, 2023",
      auditor: "KPMG",
      status: "verified",
      fileSize: "2.8 MB",
      hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    },
    {
      id: "AR-2023-Q3",
      temple: "Tirupati Balaji Temple",
      period: "Q3 2023",
      date: "October 5, 2023",
      auditor: "EY",
      status: "pending",
      fileSize: "4.5 MB",
      hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e",
    },
    {
      id: "AR-2023-Q2",
      temple: "Tirupati Balaji Temple",
      period: "Q2 2023",
      date: "July 3, 2023",
      auditor: "EY",
      status: "verified",
      fileSize: "4.2 MB",
      hash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    },
    {
      id: "AR-2023-Q3",
      temple: "Kashi Vishwanath Temple",
      period: "Q3 2023",
      date: "October 12, 2023",
      auditor: "PwC",
      status: "verified",
      fileSize: "2.7 MB",
      hash: "0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c",
    },
    {
      id: "AR-2023-Q2",
      temple: "Kashi Vishwanath Temple",
      period: "Q2 2023",
      date: "July 10, 2023",
      auditor: "PwC",
      status: "verified",
      fileSize: "2.5 MB",
      hash: "0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/transparency">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transparency
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Audit Reports</h1>
        <p className="text-muted-foreground">Independent audit reports for all temples with blockchain verification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditReports.length}</div>
            <p className="text-xs text-muted-foreground">From 4 temples</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditReports.filter((r) => r.status === "verified").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                {Math.round((auditReports.filter((r) => r.status === "verified").length / auditReports.length) * 100)}%
              </span>{" "}
              of total reports
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">October 15, 2023</div>
            <p className="text-xs text-muted-foreground">ISKCON Temple Q3 2023</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>Quarterly financial audits conducted by independent firms</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reports..." className="pl-9 w-full sm:w-[200px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by temple" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Temples</SelectItem>
                  <SelectItem value="iskcon">ISKCON Temple</SelectItem>
                  <SelectItem value="siddhivinayak">Siddhivinayak Temple</SelectItem>
                  <SelectItem value="tirupati">Tirupati Balaji</SelectItem>
                  <SelectItem value="kashi">Kashi Vishwanath</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="q3-2023">Q3 2023</TabsTrigger>
              <TabsTrigger value="q2-2023">Q2 2023</TabsTrigger>
              <TabsTrigger value="q1-2023">Q1 2023</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Temple</TableHead>
                      <TableHead className="hidden md:table-cell">Period</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Auditor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditReports.map((report) => (
                      <TableRow key={`${report.id}-${report.temple}`}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.temple}</TableCell>
                        <TableCell className="hidden md:table-cell">{report.period}</TableCell>
                        <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                        <TableCell className="hidden lg:table-cell">{report.auditor}</TableCell>
                        <TableCell>
                          <Badge
                            variant={report.status === "verified" ? "outline" : "secondary"}
                            className={
                              report.status === "verified"
                                ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                                : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                            }
                          >
                            {report.status === "verified" ? "Verified" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View report</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download report</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Verify on blockchain</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="q3-2023">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Temple</TableHead>
                      <TableHead className="hidden md:table-cell">Period</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Auditor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditReports
                      .filter((report) => report.period === "Q3 2023")
                      .map((report) => (
                        <TableRow key={`${report.id}-${report.temple}`}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.temple}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.period}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                          <TableCell className="hidden lg:table-cell">{report.auditor}</TableCell>
                          <TableCell>
                            <Badge
                              variant={report.status === "verified" ? "outline" : "secondary"}
                              className={
                                report.status === "verified"
                                  ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                                  : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                              }
                            >
                              {report.status === "verified" ? "Verified" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View report</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download report</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Verify on blockchain</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="q2-2023">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Temple</TableHead>
                      <TableHead className="hidden md:table-cell">Period</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Auditor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditReports
                      .filter((report) => report.period === "Q2 2023")
                      .map((report) => (
                        <TableRow key={`${report.id}-${report.temple}`}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.temple}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.period}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                          <TableCell className="hidden lg:table-cell">{report.auditor}</TableCell>
                          <TableCell>
                            <Badge
                              variant={report.status === "verified" ? "outline" : "secondary"}
                              className={
                                report.status === "verified"
                                  ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                                  : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                              }
                            >
                              {report.status === "verified" ? "Verified" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View report</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download report</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Verify on blockchain</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="q1-2023">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
                <p className="text-muted-foreground max-w-md">
                  Q1 2023 audit reports are not available yet. Please check back later or view reports from other
                  periods.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Showing {auditReports.length} audit reports</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>About Our Audit Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              All temples on our platform undergo regular financial audits by reputable independent accounting firms.
              These audits ensure complete transparency and accountability in the management of donation funds.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Our Audit Process Includes:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Quarterly financial statement reviews</li>
                <li>Verification of all income and expenses</li>
                <li>Compliance with regulatory requirements</li>
                <li>Blockchain verification of all transactions</li>
                <li>Public disclosure of audit reports</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              All audit reports are stored on the blockchain to ensure their immutability and transparency. This
              provides an additional layer of trust and verification for donors.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Benefits of Blockchain Verification:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tamper-proof record of all audit reports</li>
                <li>Public verification of report authenticity</li>
                <li>Permanent storage of financial records</li>
                <li>Transparent chain of accountability</li>
                <li>Independent verification by any third party</li>
              </ul>
            </div>
            <Button className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white">
              Learn More About Blockchain Verification
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
