"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Bell,
  Send,
  Mail,
  MessageSquare,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ComplianceAlert {
  id: string
  contractorName: string
  alertType: "labor_hours" | "subcontracting" | "reporting" | "documentation"
  severity: "high" | "medium" | "low"
  description: string
  dueDate: string
  status: "open" | "in_progress" | "resolved"
  assignedTo: string
  createdDate: string
}

interface ComplianceMetric {
  contractorId: string
  contractorName: string
  projectName: string
  reportingPeriod: string
  totalLaborHours: number
  section3LaborHours: number
  targetedSection3Hours: number
  section3Percentage: number
  targetedSection3Percentage: number
  section3Benchmark: number
  targetedSection3Benchmark: number
  complianceStatus: "compliant" | "at_risk" | "non_compliant"
  subcontractingValue: number
  section3SubcontractingValue: number
  subcontractingPercentage: number
  subcontractingBenchmark: number
  lastReportDate: string
  nextReportDue: string
}

interface AlertRecipient {
  id: string
  name: string
  email: string
  role: string
  selected: boolean
}

export function ComplianceMonitoring() {
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([])
  const [metrics, setMetrics] = useState<ComplianceMetric[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<ComplianceAlert[]>([])
  const [filteredMetrics, setFilteredMetrics] = useState<ComplianceMetric[]>([])
  const [alertFilter, setAlertFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [complianceFilter, setComplianceFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Alert sending state
  const [showSendAlerts, setShowSendAlerts] = useState(false)
  const [alertRecipients, setAlertRecipients] = useState<AlertRecipient[]>([])
  const [alertSubject, setAlertSubject] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("email")
  const [sendingAlerts, setSendingAlerts] = useState(false)

  useEffect(() => {
    loadComplianceData()
    loadAlertRecipients()
  }, [])

  useEffect(() => {
    filterAlerts()
  }, [alerts, alertFilter, severityFilter])

  useEffect(() => {
    filterMetrics()
  }, [metrics, complianceFilter])

  const loadComplianceData = async () => {
    setLoading(true)
    try {
      const mockAlerts = generateMockAlerts()
      const mockMetrics = generateMockMetrics()

      setAlerts(mockAlerts)
      setMetrics(mockMetrics)
    } catch (error) {
      console.error("Error loading compliance data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadAlertRecipients = () => {
    const recipients: AlertRecipient[] = [
      { id: "1", name: "John Smith", email: "john.smith@dcha.gov", role: "Compliance Manager", selected: true },
      { id: "2", name: "Sarah Johnson", email: "sarah.johnson@dcha.gov", role: "Project Manager", selected: true },
      { id: "3", name: "Michael Brown", email: "michael.brown@dcha.gov", role: "Contract Officer", selected: false },
      { id: "4", name: "Lisa Davis", email: "lisa.davis@dcha.gov", role: "Section 3 Coordinator", selected: true },
      { id: "5", name: "Robert Wilson", email: "robert.wilson@dcha.gov", role: "Audit Manager", selected: false },
    ]
    setAlertRecipients(recipients)
  }

  const generateMockAlerts = (): ComplianceAlert[] => {
    const contractors = [
      "Hamel Builders Inc.",
      "Turner Construction",
      "Clark Construction",
      "Skanska USA",
      "Gilbane Building",
      "McKinsey & Company",
      "Deloitte Consulting",
      "KPMG LLP",
    ]

    const alertTypes = [
      {
        type: "labor_hours" as const,
        descriptions: [
          "Section 3 labor hours below 25% benchmark",
          "Targeted Section 3 hours below 5% requirement",
          "Declining Section 3 worker participation",
        ],
      },
      {
        type: "subcontracting" as const,
        descriptions: [
          "Section 3 subcontracting below 10% requirement",
          "Missing Section 3 business documentation",
          "Subcontractor compliance verification needed",
        ],
      },
      {
        type: "reporting" as const,
        descriptions: [
          "Monthly report overdue by 5 days",
          "Incomplete labor hour documentation",
          "Missing payroll records for Section 3 workers",
        ],
      },
      {
        type: "documentation" as const,
        descriptions: [
          "Section 3 worker certifications expired",
          "Missing action plan updates",
          "Incomplete subcontractor agreements",
        ],
      },
    ]

    const alerts: ComplianceAlert[] = []

    contractors.forEach((contractor, index) => {
      const alertCount = Math.floor(Math.random() * 3) + 1

      for (let i = 0; i < alertCount; i++) {
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
        const description = alertType.descriptions[Math.floor(Math.random() * alertType.descriptions.length)]

        alerts.push({
          id: `alert-${index}-${i}`,
          contractorName: contractor,
          alertType: alertType.type,
          severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as any,
          description,
          dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          status: ["open", "in_progress", "resolved"][Math.floor(Math.random() * 3)] as any,
          assignedTo: `Compliance Officer ${Math.floor(Math.random() * 3) + 1}`,
          createdDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        })
      }
    })

    return alerts
  }

  const generateMockMetrics = (): ComplianceMetric[] => {
    const contractors = [
      "Hamel Builders Inc.",
      "Turner Construction",
      "Clark Construction",
      "Skanska USA",
      "Gilbane Building",
      "McKinsey & Company",
      "Deloitte Consulting",
      "KPMG LLP",
    ]

    return contractors.map((contractor, index) => {
      const totalLaborHours = Math.floor(Math.random() * 2000) + 1000
      const section3LaborHours = Math.floor(totalLaborHours * (0.15 + Math.random() * 0.25))
      const targetedSection3Hours = Math.floor(section3LaborHours * (0.2 + Math.random() * 0.3))
      const section3Percentage = Math.round((section3LaborHours / totalLaborHours) * 100)
      const targetedSection3Percentage = Math.round((targetedSection3Hours / totalLaborHours) * 100)

      const subcontractingValue = Math.floor(Math.random() * 500000) + 100000
      const section3SubcontractingValue = Math.floor(subcontractingValue * (0.05 + Math.random() * 0.15))
      const subcontractingPercentage = Math.round((section3SubcontractingValue / subcontractingValue) * 100)

      let complianceStatus: "compliant" | "at_risk" | "non_compliant"
      if (section3Percentage >= 25 && targetedSection3Percentage >= 5) {
        complianceStatus = "compliant"
      } else if (section3Percentage >= 20 || targetedSection3Percentage >= 3) {
        complianceStatus = "at_risk"
      } else {
        complianceStatus = "non_compliant"
      }

      return {
        contractorId: `contractor-${index}`,
        contractorName: contractor,
        projectName: `${contractor} Housing Development`,
        reportingPeriod: "2024-11",
        totalLaborHours,
        section3LaborHours,
        targetedSection3Hours,
        section3Percentage,
        targetedSection3Percentage,
        section3Benchmark: 25,
        targetedSection3Benchmark: 5,
        complianceStatus,
        subcontractingValue,
        section3SubcontractingValue,
        subcontractingPercentage,
        subcontractingBenchmark: index < 4 ? 10 : 3,
        lastReportDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        nextReportDue: new Date(Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }
    })
  }

  const filterAlerts = () => {
    let filtered = alerts

    if (alertFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === alertFilter)
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter)
    }

    setFilteredAlerts(filtered)
  }

  const filterMetrics = () => {
    let filtered = metrics

    if (complianceFilter !== "all") {
      filtered = filtered.filter((metric) => metric.complianceStatus === complianceFilter)
    }

    setFilteredMetrics(filtered)
  }

  const handleSendAlerts = () => {
    const highPriorityAlerts = alerts.filter((alert) => alert.severity === "high" && alert.status === "open")

    setAlertSubject(`Urgent: ${highPriorityAlerts.length} High Priority Compliance Alerts`)
    setAlertMessage(`Dear Team,

We have identified ${highPriorityAlerts.length} high priority compliance alerts that require immediate attention:

${highPriorityAlerts.map((alert, index) => `${index + 1}. ${alert.contractorName}: ${alert.description}`).join("\n")}

Please review and take appropriate action within 24 hours.

Best regards,
Rapid Compliance System`)

    setShowSendAlerts(true)
  }

  const sendAlertsToRecipients = async () => {
    setSendingAlerts(true)

    const selectedRecipients = alertRecipients.filter((r) => r.selected)

    // Simulate sending alerts
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    alert(`Alerts sent successfully to ${selectedRecipients.length} recipients via ${alertType}!`)

    setSendingAlerts(false)
    setShowSendAlerts(false)
  }

  const toggleRecipient = (recipientId: string) => {
    setAlertRecipients((recipients) =>
      recipients.map((r) => (r.id === recipientId ? { ...r, selected: !r.selected } : r)),
    )
  }

  const getAlertSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline">
            <CheckCircle className="h-3 w-3 mr-1" />
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Compliant
          </Badge>
        )
      case "at_risk":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            At Risk
          </Badge>
        )
      case "non_compliant":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Non-Compliant
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Open
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const alertStats = {
    total: alerts.length,
    open: alerts.filter((a) => a.status === "open").length,
    high: alerts.filter((a) => a.severity === "high").length,
    overdue: alerts.filter((a) => new Date(a.dueDate) < new Date()).length,
  }

  const complianceStats = {
    total: metrics.length,
    compliant: metrics.filter((m) => m.complianceStatus === "compliant").length,
    atRisk: metrics.filter((m) => m.complianceStatus === "at_risk").length,
    nonCompliant: metrics.filter((m) => m.complianceStatus === "non_compliant").length,
    avgSection3: Math.round(metrics.reduce((sum, m) => sum + m.section3Percentage, 0) / metrics.length),
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Monitoring</h1>
          <p className="text-gray-600">Real-time Section 3 compliance monitoring and alert management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={loadComplianceData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleSendAlerts}>
            <Bell className="h-4 w-4 mr-2" />
            Send Alerts
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.open}</div>
            <p className="text-xs text-muted-foreground">{alertStats.high} high priority</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceStats.compliant}</div>
            <Progress value={(complianceStats.compliant / complianceStats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{complianceStats.atRisk}</div>
            <p className="text-xs text-muted-foreground">Require monitoring</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Section 3</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{complianceStats.avgSection3}%</div>
            <Progress value={complianceStats.avgSection3} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Compliance Alerts</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Alert Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Select value={alertFilter} onValueChange={setAlertFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>Active compliance issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Alert Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.contractorName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {alert.alertType.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{alert.description}</TableCell>
                      <TableCell>{getAlertSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>{alert.dueDate}</TableCell>
                      <TableCell>{alert.assignedTo}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          {/* Metrics Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Select value={complianceFilter} onValueChange={setComplianceFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contractors</SelectItem>
                    <SelectItem value="compliant">Compliant Only</SelectItem>
                    <SelectItem value="at_risk">At Risk Only</SelectItem>
                    <SelectItem value="non_compliant">Non-Compliant Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Section 3 compliance performance by contractor</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Section 3 %</TableHead>
                    <TableHead>Targeted %</TableHead>
                    <TableHead>Subcontracting %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Report</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMetrics.map((metric) => (
                    <TableRow key={metric.contractorId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{metric.contractorName}</div>
                          <div className="text-sm text-muted-foreground">{metric.projectName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              metric.section3Percentage >= metric.section3Benchmark ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {metric.section3Percentage}%
                          </span>
                          {metric.section3Percentage >= metric.section3Benchmark ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">Target: {metric.section3Benchmark}%</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              metric.targetedSection3Percentage >= metric.targetedSection3Benchmark
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {metric.targetedSection3Percentage}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">Target: {metric.targetedSection3Benchmark}%</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              metric.subcontractingPercentage >= metric.subcontractingBenchmark
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {metric.subcontractingPercentage}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">Target: {metric.subcontractingBenchmark}%</div>
                      </TableCell>
                      <TableCell>{getComplianceStatusBadge(metric.complianceStatus)}</TableCell>
                      <TableCell>{metric.lastReportDate}</TableCell>
                      <TableCell>{metric.nextReportDue}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
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
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Trends</CardTitle>
              <CardDescription>Historical compliance performance and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Section 3 Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Month</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{complianceStats.avgSection3}%</span>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <Progress value={complianceStats.avgSection3} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Previous Month</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{complianceStats.avgSection3 - 3}%</span>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <Progress value={complianceStats.avgSection3 - 3} className="h-2" />

                      <div className="text-sm text-green-600 font-medium">↗ 3% improvement from last month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alert Resolution Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resolved This Month</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Resolution Time</span>
                        <span className="font-medium">3.2 days</span>
                      </div>
                      <Progress value={68} className="h-2" />

                      <div className="text-sm text-green-600 font-medium">↗ 15% faster resolution than last month</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Send Alerts Dialog */}
      <Dialog open={showSendAlerts} onOpenChange={setShowSendAlerts}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Compliance Alerts</DialogTitle>
            <DialogDescription>Send notifications about compliance issues to team members</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Alert Type Selection */}
            <div className="space-y-2">
              <Label>Notification Method</Label>
              <Select value={alertType} onValueChange={setAlertType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="sms">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      SMS
                    </div>
                  </SelectItem>
                  <SelectItem value="both">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Email + SMS
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                {alertRecipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={recipient.id}
                      checked={recipient.selected}
                      onCheckedChange={() => toggleRecipient(recipient.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{recipient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {recipient.email} • {recipient.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {alertRecipients.filter((r) => r.selected).length} recipients selected
              </p>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={alertSubject}
                onChange={(e) => setAlertSubject(e.target.value)}
                placeholder="Enter alert subject"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Enter alert message"
                rows={8}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendAlerts(false)}>
              Cancel
            </Button>
            <Button
              onClick={sendAlertsToRecipients}
              disabled={sendingAlerts || alertRecipients.filter((r) => r.selected).length === 0}
            >
              {sendingAlerts ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Alerts
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
