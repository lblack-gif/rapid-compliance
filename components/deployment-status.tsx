"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Play,
  Settings,
  Database,
  Key,
  Cloud,
  Terminal,
} from "lucide-react"

interface DeploymentStatus {
  canDeploy: boolean
  prerequisites: {
    passed: boolean
    errors: string[]
    warnings: string[]
    summary: {
      total: number
      passed: number
      errors: number
      warnings: number
    }
  }
  timestamp: string
}

export function DeploymentStatus() {
  const [status, setStatus] = useState<DeploymentStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    checkDeploymentStatus()
  }, [])

  const checkDeploymentStatus = async () => {
    setChecking(true)
    try {
      const response = await fetch("/api/deployment/status")
      const data = await response.json()

      if (data.success) {
        setStatus(data)
      }
    } catch (error) {
      console.error("Failed to check deployment status:", error)
    } finally {
      setLoading(false)
      setChecking(false)
    }
  }

  const getStatusIcon = (hasErrors: boolean, hasWarnings: boolean) => {
    if (hasErrors) return <XCircle className="h-5 w-5 text-red-500" />
    if (hasWarnings) return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    return <CheckCircle className="h-5 w-5 text-green-500" />
  }

  const getStatusBadge = (canDeploy: boolean) => {
    return canDeploy ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Ready to Deploy
      </Badge>
    ) : (
      <Badge variant="destructive">Prerequisites Not Met</Badge>
    )
  }

  const getProgressPercentage = () => {
    if (!status) return 0
    const { passed, total } = status.prerequisites.summary
    return Math.round((passed / total) * 100)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Checking deployment status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Failed to load deployment status. Please try again.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(status.prerequisites.errors.length > 0, status.prerequisites.warnings.length > 0)}
                <span>Deployment Status</span>
              </CardTitle>
              <CardDescription>Prerequisites check for Section 3 Compliance System</CardDescription>
            </div>
            {getStatusBadge(status.canDeploy)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Overview */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Prerequisites Progress</span>
              <span>
                {status.prerequisites.summary.passed}/{status.prerequisites.summary.total}
              </span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{status.prerequisites.summary.passed}</div>
              <div className="text-sm text-gray-500">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{status.prerequisites.summary.errors}</div>
              <div className="text-sm text-gray-500">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{status.prerequisites.summary.warnings}</div>
              <div className="text-sm text-gray-500">Warnings</div>
            </div>
          </div>

          {/* Errors */}
          {status.prerequisites.errors.length > 0 && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Deployment Blocked - Fix These Issues:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {status.prerequisites.errors.map((error, index) => (
                      <li key={index} className="text-sm">
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Warnings */}
          {status.prerequisites.warnings.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Recommendations:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {status.prerequisites.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button onClick={checkDeploymentStatus} disabled={checking} variant="outline">
              {checking ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Recheck Status
            </Button>

            <Button disabled={!status.canDeploy} className={status.canDeploy ? "" : "opacity-50 cursor-not-allowed"}>
              <Play className="h-4 w-4 mr-2" />
              Deploy to Production
            </Button>
          </div>

          {/* Help Text */}
          {!status.canDeploy && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Why is deployment disabled?</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <p>The deployment button is disabled because one or more prerequisites are not met:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Environment Variables:</strong> Required API keys and configuration must be set
                  </li>
                  <li>
                    <strong>Vercel CLI:</strong> Must be installed and authenticated
                  </li>
                  <li>
                    <strong>Dependencies:</strong> All npm packages must be installed
                  </li>
                  <li>
                    <strong>Build Process:</strong> Application must build successfully
                  </li>
                </ul>
                <p className="mt-2">Fix the errors listed above, then click "Recheck Status" to enable deployment.</p>
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-xs text-gray-500 text-center">
            Last checked: {new Date(status.timestamp).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues & Solutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Common Issues & Solutions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Database className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Missing Supabase Configuration</h4>
                <p className="text-sm text-gray-600">
                  Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment file
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Key className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Missing API Keys</h4>
                <p className="text-sm text-gray-600">
                  Ensure OPENAI_API_KEY, JWT_SECRET, and ENCRYPTION_KEY are configured
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Cloud className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Vercel CLI Issues</h4>
                <p className="text-sm text-gray-600">Install with: npm install -g vercel, then run: vercel login</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Terminal className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Build Failures</h4>
                <p className="text-sm text-gray-600">Run npm install and npm run build locally to identify issues</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
