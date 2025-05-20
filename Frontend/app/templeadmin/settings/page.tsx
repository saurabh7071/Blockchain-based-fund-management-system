"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
      variant: "success",
      duration: 3000,
    })

    setIsLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-orange-900">Settings</h2>
        </div>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-orange-100">
            <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
              General
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-white data-[state=active]:text-orange-900">
              Team Management
            </TabsTrigger>
            <TabsTrigger
              value="blockchain"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900"
            >
              Blockchain
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900"
            >
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your temple's general settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="temple-id">Temple ID</Label>
                  <Input id="temple-id" value="TEMPLE-001" disabled />
                  <p className="text-sm text-muted-foreground">This is your unique temple identifier in the system</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="temple-currency">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger id="temple-currency" className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="temple-timezone">Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger id="temple-timezone" className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                      <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="temple-language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="temple-language" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="sa">Sanskrit</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-orange-600 hover:bg-orange-700">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="team" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage team members who can access this temple's dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                          RS
                        </span>
                        <div>
                          <h3 className="font-medium">Rajesh Sharma</h3>
                          <p className="text-sm text-muted-foreground">rajesh@example.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Select defaultValue="admin">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          AP
                        </span>
                        <div>
                          <h3 className="font-medium">Anita Patel</h3>
                          <p className="text-sm text-muted-foreground">anita@example.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Select defaultValue="editor">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Add Team Member
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="blockchain" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Blockchain Configuration</CardTitle>
                <CardDescription>Configure blockchain settings for transparency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="wallet-address">Temple Wallet Address</Label>
                  <Input id="wallet-address" value="0x8f7d3b2a1c5d4e6f7g8h9i0j1k2l3m4n5o6p7q8r" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="blockchain-network">Blockchain Network</Label>
                  <Select defaultValue="ethereum">
                    <SelectTrigger id="blockchain-network" className="w-full">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="binance">Binance Smart Chain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-verify" />
                  <Label htmlFor="auto-verify">Automatically verify transactions on blockchain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="public-transparency" defaultChecked />
                  <Label htmlFor="public-transparency">Enable public transparency page</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-orange-600 hover:bg-orange-700">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-donations" defaultChecked />
                      <Label htmlFor="email-donations">New donation notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-expenses" defaultChecked />
                      <Label htmlFor="email-expenses">New expense notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-campaigns" defaultChecked />
                      <Label htmlFor="email-campaigns">Campaign milestone notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-reports" />
                      <Label htmlFor="email-reports">Automatic report delivery</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-donations" />
                      <Label htmlFor="sms-donations">New donation notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-expenses" />
                      <Label htmlFor="sms-expenses">New expense notifications</Label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@shreeratemple.org" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notification-phone">Notification Phone</Label>
                  <Input id="notification-phone" type="tel" defaultValue="+91 9876543210" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={isLoading} className="bg-orange-600 hover:bg-orange-700">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
