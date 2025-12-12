"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function LogoutButton({ variant = "ghost", size = "sm", className = "" }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Clear localStorage first
      if (typeof window !== "undefined") {
        localStorage.removeItem("rapidCompliance_user")
        localStorage.removeItem("auth_token")
        localStorage.clear()
      }

      // Call server logout endpoint
      const response = await fetch("/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.redirected) {
        // Follow the server redirect
        window.location.href = response.url
      } else {
        // Fallback redirect
        window.location.href = "/?status=loggedout"
      }
    } catch (error) {
      console.error("Logout failed:", error)
      // Fallback: clear client state and redirect
      if (typeof window !== "undefined") {
        localStorage.clear()
        document.cookie = "rapidCompliance_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }
      window.location.href = "/?status=loggedout"
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} className={`flex items-center gap-2 ${className}`}>
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  )
}
