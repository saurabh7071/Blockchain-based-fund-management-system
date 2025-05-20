"use client"

import { useState } from "react"
import { CalendarIcon, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/templeadmin/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveProfile = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <DashboardLayout>
      {/* Content */}
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-orange-900">Profile</h2>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-orange-100">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900"
            >
              Personal Information
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-900"
            >
              Activity Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center text-2xl text-orange-800">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{user?.name || "Temple Admin"}</CardTitle>
                    <CardDescription>{user?.role || "Administrator"}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="name" defaultValue={user?.name || "Temple Admin"} className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="email" defaultValue={user?.email || "admin@temple.org"} className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" defaultValue="+91 9876543210" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="dob" type="date" defaultValue="1980-01-01" className="pl-9" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="Temple administrator with over 10 years of experience in managing temple operations, donations, and events."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Temple Association</CardTitle>
                <CardDescription>Information about your temple association</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="temple-name">Temple Name</Label>
                    <Input id="temple-name" defaultValue="Shree Ram Temple" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temple-id">Temple ID</Label>
                    <Input id="temple-id" defaultValue="TEMPLE-001" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Administrator" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joined-date">Joined Date</Label>
                    <Input id="joined-date" defaultValue="01/01/2020" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-orange-600 hover:bg-orange-700">Update Password</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication adds an extra layer of security to your account by requiring more than
                  just a password to sign in.
                </p>
                <div className="mt-4">
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Login</p>
                      <p className="text-sm text-muted-foreground">Logged in from Mumbai, India</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                  </div>
                  <div className="flex items-start justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Profile Updated</p>
                      <p className="text-sm text-muted-foreground">Updated profile information</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Yesterday, 2:15 PM</p>
                  </div>
                  <div className="flex items-start justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Password Changed</p>
                      <p className="text-sm text-muted-foreground">Changed account password</p>
                    </div>
                    <p className="text-sm text-muted-foreground">May 15, 2023, 11:30 AM</p>
                  </div>
                  <div className="flex items-start justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Login</p>
                      <p className="text-sm text-muted-foreground">Logged in from New Delhi, India</p>
                    </div>
                    <p className="text-sm text-muted-foreground">May 14, 2023, 9:45 AM</p>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-muted-foreground">Account was created</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Jan 1, 2020, 10:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
