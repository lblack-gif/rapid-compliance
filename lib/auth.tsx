"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "contractor" | "resident"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] AuthProvider: Checking for existing session")
    // Check for existing session
    const savedUser = localStorage.getItem("rapidCompliance_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        console.log("[v0] AuthProvider: Found saved user", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("[v0] AuthProvider: Error parsing saved user:", error)
        localStorage.removeItem("rapidCompliance_user")
      }
    } else {
      console.log("[v0] AuthProvider: No saved user found")
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("[v0] login: Starting login for", email)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on email
      let mockUser: User
      if (email.includes("admin")) {
        mockUser = { id: "1", name: "Admin User", email, role: "admin" }
      } else if (email.includes("contractor")) {
        mockUser = { id: "2", name: "Contractor User", email, role: "contractor" }
      } else {
        mockUser = { id: "3", name: "Resident User", email, role: "resident" }
      }

      console.log("[v0] login: Setting user", mockUser)
      setUser(mockUser)
      localStorage.setItem("rapidCompliance_user", JSON.stringify(mockUser))

      await new Promise((resolve) => setTimeout(resolve, 100))

      console.log("[v0] login: Login successful")
      return true
    } catch (error) {
      console.error("[v0] login: Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    console.log("[v0] logout: Starting logout")
    setIsLoading(true)

    try {
      // Clear user data
      setUser(null)
      localStorage.removeItem("rapidCompliance_user")

      // Show confirmation message
      setShowLogoutConfirmation(true)

      // Auto-redirect after 1.5 seconds
      setTimeout(() => {
        setShowLogoutConfirmation(false)
        router.push("/landing")
      }, 1500)
    } catch (error) {
      console.error("[v0] logout: Logout error:", error)
      // Still redirect on error
      router.push("/landing")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}

      {/* Logout Confirmation Overlay */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">You have been signed out</h3>
            <p className="text-gray-600">Redirecting to landing page...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
