"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Calendar, CheckCircle, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompliancePage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Compliance Management</h1>
          <p className="text-muted-foreground">Manage Corrective Action Plans and compliance tracking</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly CAPs</CardTitle>
            <CardDescription>Corrective Action Plans for this quarter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Q1 2025 CAP</p>
                  <p className="text-sm text-muted-foreground">Due: March 31, 2025</p>
                </div>
              </div>
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Q2 2025 CAP</p>
                  <p className="text-sm text-muted-foreground">Due: June 30, 2025</p>
                </div>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Q3 2025 CAP</p>
                  <p className="text-sm text-muted-foreground">Due: September 30, 2025</p>
                </div>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">Metro Contractors Below Threshold</p>
                <p className="text-sm text-red-700">Section 3 compliance at 18% (target: 25%)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg bg-yellow-50">
              <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Quarterly HUD Report Due</p>
                <p className="text-sm text-yellow-700">Due in 7 days - All Projects</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">ABC Construction Exceeded Goals</p>
                <p className="text-sm text-green-700">Affordable Housing Phase 1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
