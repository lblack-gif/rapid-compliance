"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { ContractorDashboard } from "@/components/dashboards/contractor-dashboard"
import { ResidentDashboard } from "@/components/dashboards/resident-dashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?next=%2Fdashboard')
    }
  }, [isLoading, user, router])
  useEffect(() => {
    console.log("[v0] DashboardPage: user =", user, "isLoading =", isLoading)

    if (!isLoading && !user) {
      console.log("[v0] DashboardPage: No user found, redirecting to login")
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    console.log("[v0] DashboardPage: Loading...")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log("[v0] DashboardPage: No user, returning null")
    return null
  }

  console.log("[v0] DashboardPage: Rendering dashboard for role:", user.role)

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard />
    case "contractor":
      return <ContractorDashboard />
    case "resident":
      return <ResidentDashboard />
    default:
      return <AdminDashboard />
  }
}


