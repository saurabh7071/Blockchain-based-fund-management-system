"use client"

import { useState, useEffect } from "react"
import { Plus, Search, MoreVertical, Check, X, Pencil, Trash2, User, MapPin, Calendar, ArrowUpDown, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TempleAdmin {
  _id: string
  name: string
  email: string
  phone: string
  role: string
  templeName: string
  templeLocation: string
  status: string
  loginType?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function TempleManagement() {
  const [templeAdmins, setTempleAdmins] = useState<TempleAdmin[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("active")
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    templeName: "",
    templeLocation: "",
  })

  const fetchTempleAdmins = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `http://localhost:5050/api/v1/templeAdmin/get-all-Temple-Admins?page=${pagination.page}&limit=${pagination.limit}&sort=name&order=asc&status=${statusFilter}`,
        {
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch temple admins")
      }

      const data = await response.json()
      if (data.success) {
        setTempleAdmins(data.data.templeAdmins)
        setPagination(data.data.pagination)
      } else {
        throw new Error(data.message || "Failed to fetch temple admins")
      }
    } catch (error: any) {
      toast.error(
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Error</p>
          <p className="text-sm text-muted-foreground">
            {error.message || "Failed to fetch temple admins"}
          </p>
        </div>
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTempleAdmins()
  }, [pagination.page, pagination.limit, statusFilter])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5050/api/v1/templeAdmin/register-Temple-Admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          templeName: formData.templeName,
          templeLocation: formData.templeLocation,
        }),
      })

      const responseText = await response.text()
      let data

      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        if (responseText.includes("Temple Admin with this email or phone already exists")) {
          toast.error(
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Registration Failed</p>
              <p className="text-sm text-muted-foreground">
                A temple admin with this email or phone number is already registered.
              </p>
            </div>
          )
          return
        }
        throw new Error("Server returned an invalid response")
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to register temple admin")
      }

      if (data.success) {
        toast.success(
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Temple Admin Registered Successfully!</p>
            <p className="text-sm text-muted-foreground">
              {data.data.name} has been registered as admin for {data.data.templeName}
            </p>
          </div>
        )
        setFormData({
          name: "",
          email: "",
          phone: "",
          templeName: "",
          templeLocation: "",
        })
        fetchTempleAdmins() // Refresh the list
      }
    } catch (error: any) {
      toast.error(
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Registration Failed</p>
          <p className="text-sm text-muted-foreground">
            {error.message || "Failed to register temple admin"}
          </p>
        </div>
      )
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAdmins = templeAdmins.filter((admin) => {
    return (
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.templeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.templeLocation.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Temple Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Temple Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Temple Admin</DialogTitle>
              <DialogDescription className="text-base">
                Register a new temple admin. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Temple Information</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="templeName" className="text-right font-medium">
                        Temple Name
                      </Label>
                      <Input
                        id="templeName"
                        name="templeName"
                        placeholder="Enter temple name"
                        className="col-span-3"
                        value={formData.templeName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="templeLocation" className="text-right font-medium">
                        Location
                      </Label>
                      <Input
                        id="templeLocation"
                        name="templeLocation"
                        placeholder="Enter temple location"
                        className="col-span-3"
                        value={formData.templeLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Admin Information</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right font-medium">
                        Admin Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter admin name"
                        className="col-span-3"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right font-medium">
                        Admin Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter admin email"
                        className="col-span-3"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right font-medium">
                        Admin Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter admin phone"
                        className="col-span-3"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      templeName: "",
                      templeLocation: "",
                    })
                  }}
                >
                  Clear Form
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register Temple Admin"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temple Admins</CardTitle>
          <CardDescription>
            View and manage temple admin registrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end mb-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search temple admins..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Temple</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : filteredAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No temple admins found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAdmins.map((admin) => (
                    <TableRow key={admin._id}>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.phone}</TableCell>
                      <TableCell>{admin.templeName}</TableCell>
                      <TableCell>{admin.templeLocation}</TableCell>
                      <TableCell>
                        <Badge variant={admin.status === "active" ? "default" : "secondary"}>
                          {admin.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAdmins.length} of {pagination.total} temple admins
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={!pagination.hasPrevPage}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={!pagination.hasNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
