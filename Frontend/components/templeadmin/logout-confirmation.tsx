"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/templeadmin/auth-provider"

export function LogoutConfirmation() {
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)} className="w-full justify-start">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="bg-orange-600 hover:bg-orange-700">
              Yes, Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
