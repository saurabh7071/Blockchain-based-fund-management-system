"use client"

import type React from "react"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Edit,
  Save,
  CreditCard,
  Download,
  Upload,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProfileData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    avatar: string
    role: string
    joinDate: string
    lastActive: string
  }
  accountSettings: {
    emailNotifications: boolean
    smsNotifications: boolean
    twoFactorAuth: boolean
    loginAlerts: boolean
    darkMode: boolean
    language: string
  }
  activityHistory: {
    id: string
    action: string
    timestamp: string
    details: string
    ip: string
  }[]
  donationHistory: {
    id: string
    amount: number
    temple: string
    date: string
    status: string
  }[]
}

const profileData: ProfileData = {
  personalInfo: {
    name: "Super Admin",
    email: "admin@temple.org",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Super Administrator",
    joinDate: "2022-01-15T10:00:00",
    lastActive: "2023-05-08T14:23:15",
  },
  accountSettings: {
    emailNotifications: true,
    smsNotifications: true,
    twoFactorAuth: true,
    loginAlerts: true,
    darkMode: false,
    language: "English",
  },
  activityHistory: [
    {
      id: "ACT10001",
      action: "Login",
      timestamp: "2023-05-08T14:23:15",
      details: "Successful login from Mumbai, Maharashtra",
      ip: "192.168.1.100",
    },
    {
      id: "ACT10002",
      action: "Export Report",
      timestamp: "2023-05-08T11:45:22",
      details: "Exported monthly financial report for April 2023",
      ip: "192.168.1.100",
    },
    {
      id: "ACT10003",
      action: "Approve Expense",
      timestamp: "2023-05-07T16:32:41",
      details: "Approved expense E45922 for ISKCON Temple",
      ip: "192.168.1.100",
    },
    {
      id: "ACT10004",
      action: "Create Campaign",
      timestamp: "2023-05-07T14:18:33",
      details: "Created new campaign 'Diwali Celebration Fund' for ISKCON Temple",
      ip: "192.168.1.100",
    },
    {
      id: "ACT10005",
      action: "Add Temple",
      timestamp: "2023-05-06T10:22:15",
      details: "Added new temple 'Jagannath Temple' to the platform",
      ip: "192.168.1.100",
    },
  ],
  donationHistory: [
    {
      id: "D75001",
      amount: 25000,
      temple: "ISKCON Temple",
      date: "2023-04-15T10:30:22",
      status: "completed",
    },
    {
      id: "D74852",
      amount: 15000,
      temple: "Shree Siddhivinayak Temple",
      date: "2023-03-22T14:45:33",
      status: "completed",
    },
    {
      id: "D74123",
      amount: 10000,
      temple: "Tirupati Balaji Temple",
      date: "2023-02-18T09:15:41",
      status: "completed",
    },
  ],
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function ProfileManagement() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(profileData.personalInfo)
  const [accountSettings, setAccountSettings] = useState(profileData.accountSettings)
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false)

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleChange = (setting: keyof typeof accountSettings) => {
    setAccountSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditMode(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information and photo</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={personalInfo.avatar || "/placeholder.svg"} alt={personalInfo.name} />
                <AvatarFallback>{personalInfo.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {isEditMode && (
                <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                  <Upload className="h-4 w-4" />
                </Button>
              )}
            </div>
            <h3 className="text-xl font-semibold">{personalInfo.name}</h3>
            <Badge className="mt-1">{personalInfo.role}</Badge>
            <div className="mt-4 w-full space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {formatDate(personalInfo.joinDate)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download My Data
            </Button>
            <Button variant="outline" className="w-full text-red-500 hover:bg-red-50 hover:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={personalInfo.name}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={personalInfo.location}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={accountSettings.emailNotifications}
                      onCheckedChange={() => handleToggleChange("emailNotifications")}
                      disabled={!isEditMode}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={accountSettings.smsNotifications}
                      onCheckedChange={() => handleToggleChange("smsNotifications")}
                      disabled={!isEditMode}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize your interface preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                    </div>
                    <Switch checked={accountSettings.darkMode} onCheckedChange={() => handleToggleChange("darkMode")} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={accountSettings.language}
                      onChange={(e) => setAccountSettings((prev) => ({ ...prev, language: e.target.value }))}
                      disabled={!isEditMode}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Punjabi">Punjabi</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Label>Two-Factor Authentication</Label>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Enabled
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={accountSettings.twoFactorAuth}
                      onCheckedChange={() => handleToggleChange("twoFactorAuth")}
                      disabled={!isEditMode}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts for new login attempts</p>
                    </div>
                    <Switch
                      checked={accountSettings.loginAlerts}
                      onCheckedChange={() => handleToggleChange("loginAlerts")}
                      disabled={!isEditMode}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Change your password</p>
                        <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Key className="mr-2 h-4 w-4" />
                            Change Password
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your current password and a new password to change your password.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
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
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsChangePasswordDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setIsChangePasswordDialogOpen(false)}>Update Password</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active login sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Mumbai, Maharashtra • 192.168.1.100</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Active Now
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Chrome on Windows</p>
                          <p className="text-xs text-muted-foreground">Mumbai, Maharashtra • Last active 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Logout from All Devices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>Recent actions and login activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>IP Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profileData.activityHistory.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.action}</TableCell>
                          <TableCell>{formatDateTime(activity.timestamp)}</TableCell>
                          <TableCell>{activity.details}</TableCell>
                          <TableCell>{activity.ip}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="donations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                  <CardDescription>Your personal donations to temples</CardDescription>
                </CardHeader>
                <CardContent>
                  {profileData.donationHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Temple</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profileData.donationHistory.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">{donation.id}</TableCell>
                            <TableCell>{donation.temple}</TableCell>
                            <TableCell>{formatDate(donation.date)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(donation.amount)}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="capitalize bg-green-50 text-green-600 border-green-200"
                              >
                                {donation.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <CreditCard className="h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">No donations yet</h3>
                      <p className="text-sm text-muted-foreground">
                        You haven't made any donations through the platform yet.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Total Donations:{" "}
                    <strong>
                      {formatCurrency(profileData.donationHistory.reduce((sum, donation) => sum + donation.amount, 0))}
                    </strong>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download History
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
