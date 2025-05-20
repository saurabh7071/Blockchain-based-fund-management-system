"use client"
import { Save, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/templeadmin/dashboard-layout"

export default function TempleInfoPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Temple Information</h2>
            <div className="flex items-center gap-2">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="timings">Timings</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update the basic information about your temple</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="temple-name">Temple Name</Label>
                    <Input id="temple-name" defaultValue="Shree Ram Temple" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="temple-description">Description</Label>
                    <Textarea
                      id="temple-description"
                      rows={5}
                      defaultValue="Shree Ram Temple is a historic temple dedicated to Lord Ram, built in the traditional architectural style. The temple serves as a spiritual center for the community and hosts various religious ceremonies throughout the year."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="temple-address">Address</Label>
                    <Textarea
                      id="temple-address"
                      rows={3}
                      defaultValue="123 Temple Street, Ayodhya, Uttar Pradesh, India - 224123"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="temple-phone">Phone Number</Label>
                      <Input id="temple-phone" defaultValue="+91 9876543210" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="temple-email">Email</Label>
                      <Input id="temple-email" defaultValue="info@shreeratemple.org" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="temple-history">Temple History</Label>
                    <Textarea
                      id="temple-history"
                      rows={8}
                      defaultValue="Founded in 1950, Shree Ram Temple has a rich history of serving the spiritual needs of devotees. The temple was renovated in 2010 to expand its capacity and enhance its facilities. It is known for its beautiful architecture and peaceful atmosphere."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Temple Images</CardTitle>
                  <CardDescription>Upload images of your temple to showcase its beauty</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-2">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Temple Front View"
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm font-medium">Temple Front View</p>
                      <div className="flex justify-between mt-2">
                        <Button variant="outline" size="sm">
                          Replace
                        </Button>
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-2">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Inner Sanctum"
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm font-medium">Inner Sanctum</p>
                      <div className="flex justify-between mt-2">
                        <Button variant="outline" size="sm">
                          Replace
                        </Button>
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-2">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Temple Garden"
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm font-medium">Temple Garden</p>
                      <div className="flex justify-between mt-2">
                        <Button variant="outline" size="sm">
                          Replace
                        </Button>
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Temple Timings</CardTitle>
                  <CardDescription>Set the opening and closing times for your temple</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <Label>Day</Label>
                      <Label>Opening Time</Label>
                      <Label>Closing Time</Label>
                    </div>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="grid grid-cols-3 gap-4 items-center">
                        <div>{day}</div>
                        <div>
                          <Input type="time" defaultValue="05:00" />
                        </div>
                        <div>
                          <Input type="time" defaultValue="21:00" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label className="mb-2 block">Special Timings for Aarti</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="morning-aarti">Morning Aarti</Label>
                        <Input id="morning-aarti" type="time" defaultValue="06:00" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="evening-aarti">Evening Aarti</Label>
                        <Input id="evening-aarti" type="time" defaultValue="19:00" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription>Connect your temple's social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://www.shreeratemple.org" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" defaultValue="https://facebook.com/shreeratemple" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" defaultValue="https://instagram.com/shreeratemple" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input id="youtube" defaultValue="https://youtube.com/shreeratemple" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" defaultValue="https://twitter.com/shreeratemple" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
