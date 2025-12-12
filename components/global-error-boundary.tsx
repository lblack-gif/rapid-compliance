"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface GlobalErrorBoundaryProps {
  children: React.ReactNode
}

interface GlobalErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class GlobalErrorBoundary extends React.Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Global Error Boundary caught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || "An unexpected error occurred while rendering this page."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()} variant="outline">
                Reload Page
              </Button>
              <Button onClick={() => (window.location.href = "/landing")}>Go to Home</Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
