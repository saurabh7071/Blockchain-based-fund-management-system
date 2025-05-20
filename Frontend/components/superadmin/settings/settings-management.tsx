"use client"

import { useState } from "react"
import { Save, SettingsIcon, Moon, Sun, Info, AlertTriangle, Trash2, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsManagement() {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="temples">Temples</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your basic system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="Temple Management System" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@temple.org" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-description">System Description</Label>
                <Textarea
                  id="system-description"
                  defaultValue="Multi-temple management system for tracking donations, expenses, and temple activities."
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme Mode</Label>
                  <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <SettingsIcon className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="mr">Marathi</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                    <SelectItem value="pa">Punjabi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="Asia/Kolkata">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                    <SelectItem value="Asia/Dubai">Dubai (GMT+4:00)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT+0:00)</SelectItem>
                    <SelectItem value="America/New_York">New York (GMT-5:00)</SelectItem>
                    <SelectItem value="Asia/Singapore">Singapore (GMT+8:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="INR">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Donation Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive email for new donations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Expense Approvals</Label>
                      <p className="text-sm text-muted-foreground">Receive email for expense approval requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>User Registrations</Label>
                      <p className="text-sm text-muted-foreground">Receive email for new user registrations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive email for system alerts and maintenance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Real-time Alerts</Label>
                      <p className="text-sm text-muted-foreground">Show real-time notifications in the dashboard</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">Play sound for important notifications</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Email Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send alerts for suspicious login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Strong Password Requirement</Label>
                      <p className="text-sm text-muted-foreground">Require complex passwords for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue placeholder="Select expiry period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeout period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Concurrent Sessions</Label>
                      <p className="text-sm text-muted-foreground">Allow users to be logged in from multiple devices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Data Protection</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Enable encryption for sensitive data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all user actions for security auditing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="temples" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temple Management Settings</CardTitle>
              <CardDescription>Configure settings for temple management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Temple Registration</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-approve Temples</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve new temple registrations</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Verification Documents</Label>
                      <p className="text-sm text-muted-foreground">Require documents for temple verification</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Donation Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Anonymous Donations</Label>
                      <p className="text-sm text-muted-foreground">Allow donors to remain anonymous</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Minimum Donation Amount</Label>
                      <p className="text-sm text-muted-foreground">Set minimum donation amount (in ₹)</p>
                    </div>
                    <Input type="number" className="w-24" defaultValue="100" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Recurring Donations</Label>
                      <p className="text-sm text-muted-foreground">Allow donors to set up recurring donations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Expense Management</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Approval for Expenses</Label>
                      <p className="text-sm text-muted-foreground">Require admin approval for all expenses</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Expense Approval Threshold</Label>
                      <p className="text-sm text-muted-foreground">Auto-approve expenses below this amount (in ₹)</p>
                    </div>
                    <Input type="number" className="w-24" defaultValue="5000" />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Campaign Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-approve Campaigns</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve new campaigns</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Campaign Duration Limit</Label>
                      <p className="text-sm text-muted-foreground">Maximum campaign duration (in days)</p>
                    </div>
                    <Input type="number" className="w-24" defaultValue="90" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings and maintenance options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Blockchain Integration</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Blockchain Ledger</Label>
                      <p className="text-sm text-muted-foreground">
                        Record transactions on blockchain for transparency
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockchain-network">Blockchain Network</Label>
                    <Select defaultValue="ethereum">
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="binance">Binance Smart Chain</SelectItem>
                        <SelectItem value="solana">Solana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Gas Fee Optimization</Label>
                      <p className="text-sm text-muted-foreground">Optimize gas fees for blockchain transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Database Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Schedule automatic database backups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select backup frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Backup Retention</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">System Maintenance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      defaultValue="The system is currently undergoing scheduled maintenance. Please check back later."
                    />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>These actions affect system data. Please proceed with caution.</AlertDescription>
                  </Alert>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Export System Data</h4>
                      <p className="text-sm text-muted-foreground">Export all system data for backup</p>
                    </div>
                    <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Export System Data</DialogTitle>
                          <DialogDescription>Select the data you want to export from the system.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="export-temples" defaultChecked />
                            <Label htmlFor="export-temples">Temple Data</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="export-donations" defaultChecked />
                            <Label htmlFor="export-donations">Donation Records</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="export-expenses" defaultChecked />
                            <Label htmlFor="export-expenses">Expense Records</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="export-users" defaultChecked />
                            <Label htmlFor="export-users">User Data</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="export-campaigns" defaultChecked />
                            <Label htmlFor="export-campaigns">Campaign Data</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="export-blockchain" defaultChecked />
                            <Label htmlFor="export-blockchain">Blockchain Records</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsExportDialogOpen(false)}>Export Selected Data</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-600">Reset System</h4>
                      <p className="text-sm text-muted-foreground">Reset the system to factory settings</p>
                    </div>
                    <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Reset System
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reset System</DialogTitle>
                          <DialogDescription>
                            This action will reset the system to factory settings. All data will be permanently deleted.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                              This action cannot be undone. Please make sure you have backed up all important data.
                            </AlertDescription>
                          </Alert>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-reset">Type "RESET" to confirm</Label>
                            <Input id="confirm-reset" placeholder="RESET" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={() => setIsResetDialogOpen(false)}>
                            Reset System
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
