"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, FileText, Home, Printer, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"

const reports = [
  {
    id: "REP-001",
    title: "Monthly Donation Report - May 2023",
    description: "Summary of all donations received in May 2023",
    date: "2023-06-01",
    type: "Donation",
    format: "PDF",
  },
  {
    id: "REP-002",
    title: "Monthly Expense Report - May 2023",
    description: "Summary of all expenses incurred in May 2023",
    date: "2023-06-01",
    type: "Expense",
    format: "PDF",
  },
  {
    id: "REP-003",
    title: "Quarterly Donation Report - Q1 2023",
    description: "Summary of all donations received in Q1 2023",
    date: "2023-04-01",
    type: "Donation",
    format: "PDF",
  },
  {
    id: "REP-004",
    title: "Quarterly Expense Report - Q1 2023",
    description: "Summary of all expenses incurred in Q1 2023",
    date: "2023-04-01",
    type: "Expense",
    format: "PDF",
  },
  {
    id: "REP-005",
    title: "Campaign Performance Report - Bhakt Niwas",
    description: "Performance report for the Bhakt Niwas renovation campaign",
    date: "2023-05-15",
    type: "Campaign",
    format: "PDF",
  },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [selectedReportType, setSelectedReportType] = useState("all")
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("monthly")

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
      variant: "success",
      duration: 3000,
    })
  }

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Download Started",
      description: `Report ${reportId} is being downloaded.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handlePrintReport = (reportId: string) => {
    toast({
      title: "Print Preparation",
      description: `Report ${reportId} is being prepared for printing.`,
      variant: "info",
      duration: 3000,
    })
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-orange-900">Reports & Analytics</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="donation">Donation Reports</SelectItem>
                <SelectItem value="expense">Expense Reports</SelectItem>
                <SelectItem value="campaign">Campaign Reports</SelectItem>
                <SelectItem value="audit">Audit Reports</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList className="bg-orange-100">
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>View key metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="p-4">
                    <h3 className="font-medium">Total Donations</h3>
                    <p className="text-2xl font-bold text-orange-600">₹1,25,45,789</p>
                    <p className="text-xs text-green-600">+20.1% from last month</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-medium">Total Expenses</h3>
                    <p className="text-2xl font-bold text-orange-600">₹45,23,456</p>
                    <p className="text-xs text-green-600">+12.5% from last month</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-medium">Current Balance</h3>
                    <p className="text-2xl font-bold text-orange-600">₹80,22,333</p>
                    <p className="text-xs text-green-600">+18.2% from last month</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-medium">Active Campaigns</h3>
                    <p className="text-2xl font-bold text-orange-600">3</p>
                    <p className="text-xs text-green-600">1 completed this month</p>
                  </Card>
                </div>
                <div className="rounded-lg border p-8 text-center">
                  <p className="text-lg font-medium text-orange-600">Analytics Visualization</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Charts and graphs will appear here based on your selected filters
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>View and download reports for your temple</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-orange-600" />
                          <h3 className="text-lg font-semibold">{report.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <div className="text-sm">Generated on: {new Date(report.date).toLocaleDateString()}</div>
                          <div className="text-sm">{report.type} Report</div>
                          <div className="text-sm">{report.format} Format</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:flex-col md:items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-200 text-orange-700 hover:bg-orange-50"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-200 text-orange-700 hover:bg-orange-50"
                          onClick={() => handlePrintReport(report.id)}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
