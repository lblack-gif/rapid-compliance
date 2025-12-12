"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Shield,
  User,
  FileText,
  Database,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Activity,
} from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  user: string
  userRole: string
  action: string
  resource: string
  resourceId: string
  details: string
  ipAddress: string
  userAgent: string
  status: "success" | "failure" | "warning"
  severity: "low" | "medium" | "high" | "critical"
  category: "authentication" | "data_access" | "system_config" | "compliance" | "integration" | "user_management"
}

export function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "LOG-001",
      timestamp: "2024-01-15 14:30:25",
      user: "admin@dcha.org",
      userRole: "System Administrator",
      action: "LOGIN_SUCCESS",
      resource: "Authentication System",
      resourceId: "AUTH-001",
      details: "User successfully logged in from new device",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      severity: "low",
      category: "authentication",
    },
    {
      id: "LOG-002",
      timestamp: "2024-01-15 14:25:12",
      user: "j.smith@metroconstruction.com",
      userRole: "Contractor",
      action: "WORKER_DATA_ACCESS",
      resource: "Worker Database",
      resourceId: "WORKER-2024-089",
      details: "Accessed Section 3 worker verification records",
      ipAddress: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      status: "success",
      severity: "medium",
      category: "data_access",
    },
    {
      id: "LOG-003",
      timestamp: "2024-01-15 14:20:08",
      user: "system@dcha.org",
      userRole: "System",
      action: "COMPLIANCE_REPORT_GENERATED",
      resource: "Reporting System",
      resourceId: "RPT-2024-001",
      details: "Monthly Section 3 compliance report generated automatically",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      status: "success",
      severity: "low",
      category: "compliance",
    },
    {
      id: "LOG-004",
      timestamp: "2024-01-15 14:15:33",
      user: "admin@dcha.org",
      userRole: "System Administrator",
      action: "SYSTEM_CONFIG_CHANGE",
      resource: "System Settings",
      resourceId: "CONFIG-001",
      details: "Updated Section 3 labor benchmark from 24% to 25%",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      severity: "high",
      category: "system_config",
    },
    {
      id: "LOG-005",
      timestamp: "2024-01-15 14:10:45",
      user: "unknown@suspicious.com",
      userRole: "Unknown",
      action: "LOGIN_FAILED",
      resource: "Authentication System",
      resourceId: "AUTH-001",
      details: "Failed login attempt with invalid credentials (5th attempt)",
      ipAddress: "198.51.100.42",
      userAgent: "curl/7.68.0",
      status: "failure",
      severity: "critical",
      category: "authentication",
    },
    {
      id: "LOG-006",
      timestamp: "2024-01-15 14:05:17",
      user: "s.johnson@dcelectric.com",
      userRole: "Contractor",
      action: "CONTRACT_DATA_EXPORT",
      resource: "Contract Database",
      resourceId: "CONTRACT-2024-005",
      details: "Exported contract compliance data to PDF",
      ipAddress: "203.0.113.67",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      severity: "medium",
      category: "data_access",
    },
    {
      id: "LOG-007",
      timestamp: "2024-01-15 14:00:02",
      user: "system@dcha.org",
      userRole: "System",
      action: "INTEGRATION_SYNC",
      resource: "HUD SPEARS API",
      resourceId: "INT-HUD-001",
      details: "Synchronized Section 3 data with HUD SPEARS system",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      status: "success",
      severity: "low",
      category: "integration",
    },
    {
      id: "LOG-008",
      timestamp: "2024-01-15 13:55:28",
      user: "admin@dcha.org",
      userRole: "System Administrator",
      action: "USER_ROLE_CHANGE",
      resource: "User Management",
      resourceId: "USER-2024-012",
      details: "Changed user role from 'Viewer' to 'Contractor' for m.davis@capitalplumbing.com",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      severity: "high",
      category: "user_management",
    },
  ])

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || log.status === filterStatus
    const matchesCategory = filterCategory === "all" || log.category === filterCategory
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity

    return matchesSearch && matchesStatus && matchesCategory && matchesSeverity
  })

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log)
    setShowDetailDialog(true)
  }

  const handleExportLogs = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Resource", "Status", "Severity", "Details"].join(","),
      ...filteredLogs.map((log) =>
        [
          log.timestamp,
          log.user,
          log.action,
          log.resource,
          log.status,
          log.severity,
          `"${log.details.replace(/"/g, '""')}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    alert("✅ Audit logs exported successfully!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </Badge>
        )
      case "failure":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Failure
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Warning
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return <Shield className="h-4 w-4" />
      case "data_access":
        return <Database className="h-4 w-4" />
      case "system_config":
        return <Settings className="h-4 w-4" />
      case "compliance":
        return <FileText className="h-4 w-4" />
      case "integration":
        return <Activity className="h-4 w-4" />
      case "user_management":
        return <User className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const stats = {
    total: logs.length,
    success: logs.filter((l) => l.status === "success").length,
    failures: logs.filter((l) => l.status === "failure").length,
    critical: logs.filter((l) => l.severity === "critical").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Monitor system activities and security events</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button size="sm" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.success / stats.total) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failures</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failures}</div>
            <p className="text-xs text-muted-foreground">Need investigation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="data_access">Data Access</SelectItem>
                <SelectItem value="system_config">System Config</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="user_management">User Management</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterStatus("all")
                setFilterCategory("all")
                setFilterSeverity("all")
                setDateRange("today")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} audit events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      {log.timestamp}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.user}</div>
                      <div className="text-xs text-gray-500">{log.userRole}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.action}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.resource}</div>
                      <div className="text-xs text-gray-500">{log.resourceId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(log.category)}
                      <span className="capitalize">{log.category.replace("_", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(log)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Log Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>Detailed information about the selected audit event</DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Event ID</Label>
                    <p className="font-mono">{selectedLog.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Timestamp</Label>
                    <p className="font-mono">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">User</Label>
                    <p>{selectedLog.user}</p>
                    <p className="text-sm text-gray-500">{selectedLog.userRole}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Action</Label>
                    <p className="font-mono">{selectedLog.action}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Resource</Label>
                    <p>{selectedLog.resource}</p>
                    <p className="text-sm text-gray-500 font-mono">{selectedLog.resourceId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedLog.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Severity</Label>
                    <div className="mt-1">{getSeverityBadge(selectedLog.severity)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Category</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {getCategoryIcon(selectedLog.category)}
                      <span className="capitalize">{selectedLog.category.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Details</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedLog.details}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-gray-500">IP Address</Label>
                  <p className="font-mono">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">User Agent</Label>
                  <p className="text-sm text-gray-600 break-all">{selectedLog.userAgent}</p>
                </div>
              </div>

              {selectedLog.status === "failure" && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Security Alert</h4>
                  <p className="text-sm text-red-700">
                    This event represents a security concern and should be investigated immediately.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
