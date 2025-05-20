"use client"
import { Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"

const campaigns = [
  {
    id: "CAM-001",
    title: "Renovate Bhakt Niwas",
    description: "Renovation of the pilgrim rest house to accommodate more devotees",
    goal: "₹25,00,000",
    raised: "₹15,00,000",
    progress: 60,
    startDate: "2023-04-01",
    endDate: "2023-07-31",
    status: "Active",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "CAM-002",
    title: "Temple Kitchen Expansion",
    description: "Expanding the temple kitchen to serve more prasad daily",
    goal: "₹10,00,000",
    raised: "₹8,50,000",
    progress: 85,
    startDate: "2023-03-15",
    endDate: "2023-06-15",
    status: "Active",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "CAM-003",
    title: "Annual Festival Fund",
    description: "Fundraising for the annual Ram Navami celebrations",
    goal: "₹5,00,000",
    raised: "₹5,00,000",
    progress: 100,
    startDate: "2023-02-01",
    endDate: "2023-04-30",
    status: "Completed",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function CampaignsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                    <DialogDescription>Start a new fundraising campaign for your temple</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Campaign Title</Label>
                      <Input id="title" placeholder="Enter campaign title" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe the campaign purpose" rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="goal">Goal Amount (₹)</Label>
                        <Input id="goal" placeholder="Enter target amount" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Campaign Image</Label>
                      <div className="flex items-center gap-2">
                        <Input id="image" type="file" className="hidden" />
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById("image")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Campaign</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{campaign.title}</CardTitle>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
                      )}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">Raised</p>
                        <p className="font-medium">{campaign.raised}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Goal</p>
                        <p className="font-medium">{campaign.goal}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>Started: {new Date(campaign.startDate).toLocaleDateString()}</div>
                      <div>Ends: {new Date(campaign.endDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Share</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
