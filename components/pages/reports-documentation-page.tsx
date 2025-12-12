"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Share2,
  FileSpreadsheet,
  BarChart3,
  Users,
  Target,
  TrendingUp,
} from "lucide-react"

interface Report {
  id: string
  title: string
  type: "monthly" | "quarterly" | "annual" | "custom"
  status: "draft" | "pending" | "approved" | "submitted"
  format: "pdf" | "excel" | "word"
  createdDate: string
  dueDate: string
  submittedDate?: string
  author: string
  description: string
  size: string
  tags: string[]
}

interface Template {
  id: string
  name: string
  description: string
  type: "compliance" | "financial" | "operational"
  lastUsed: string
  usageCount: number
}

export function ReportsDocumentationPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [showCreateReport, setShowCreateReport] = useState(false)
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showReportDetails, setShowReportDetails] = useState(false)

  // New report form state
  const [newReport, setNewReport] = useState({
    title: "",
    type: "monthly" as const,
    format: "pdf" as const,
    dueDate: "",
    description: "",
    template: "",
    includeCharts: true,
    includeWorkerData: true,
    includeContractorData: true,
    includeFinancials: false,
  })

  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    type: "compliance" as const,
    sections: [] as string[],
  })

  useEffect(() => {
    loadReportsAndTemplates()
  }, [])

  const loadReportsAndTemplates = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockReports: Report[] = [
        {
          id: "RPT-001",
          title: "November 2024 Section 3 Compliance Report",
          type: "monthly",
          status: "approved",
          format: "pdf",
          createdDate: "2024-11-28",
          dueDate: "2024-12-05",
          submittedDate: "2024-12-01",
          author: "Sarah Johnson",
          description: "Monthly compliance report covering all active projects and Section 3 worker activities",
          size: "2.4 MB",
          tags: ["compliance", "monthly", "section3"],
        },
        {
          id: "RPT-002",
          title: "Q4 2024 Contractor Performance Analysis",
          type: "quarterly",
          status: "pending",
          format: "excel",
          createdDate: "2024-11-25",
          dueDate: "2024-12-15",
          author: "Michael Brown",
          description: "Quarterly analysis of contractor compliance rates and performance metrics",
          size: "1.8 MB",
          tags: ["contractors", "quarterly", "performance"],
        },
        {
          id: "RPT-003",
          title: "Annual Section 3 Summary 2024",
          type: "annual",
          status: "draft",
          format: "pdf",
          createdDate: "2024-11-20",
          dueDate: "2025-01-31",
          author: "Lisa Davis",
          description: "Comprehensive annual report summarizing all Section 3 activities and outcomes",
          size: "Draft",
          tags: ["annual", "summary", "comprehensive"],
        },
        {
          id: "RPT-004",
          title: "Worker Training Effectiveness Report",
          type: "custom",
          status: "submitted",
          format: "word",
          createdDate: "2024-11-15",
          dueDate: "2024-11-30",
          submittedDate: "2024-11-29",
          author: "John Smith",
          description: "Analysis of training program effectiveness and worker skill development",
          size: "956 KB",
          tags: ["training", "workers", "analysis"],
        },
      ]

      const mockTemplates: Template[] = [
        {
          id: "TPL-001",
          name: "Monthly Compliance Report Template",
          description: "Standard template for monthly Section 3 compliance reporting",
          type: "compliance",
          lastUsed: "2024-11-28",
          usageCount: 24,
        },
        {
          id: "TPL-002",
          name: "Quarterly Financial Summary Template",
          description: "Template for quarterly financial reporting and budget analysis",
          type: "financial",
          lastUsed: "2024-10-15",
          usageCount: 8,
        },
        {
          id: "TPL-003",
          name: "Annual Performance Review Template",
          description: "Comprehensive template for annual performance and compliance review",
          type: "operational",
          lastUsed: "2024-01-15",
          usageCount: 3,
        },
        {
          id: "TPL-004",
          name: "Contractor Audit Report Template",
          description: "Template for contractor compliance audits and assessments",
          type: "compliance",
          lastUsed: "2024-11-10",
          usageCount: 12,
        },
      ]

      setReports(mockReports)
      setTemplates(mockTemplates)
    } catch (error) {
      console.error("Error loading reports and templates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateReport = async () => {
    try {
      const report: Report = {
        id: `RPT-${Date.now()}`,
        title: newReport.title,
        type: newReport.type,
        status: "draft",
        format: newReport.format,
        createdDate: new Date().toISOString().split("T")[0],
        dueDate: newReport.dueDate,
        author: "Current User",
        description: newReport.description,
        size: "Draft",
        tags: [newReport.type, "draft"],
      }

      setReports([report, ...reports])
      setShowCreateReport(false)
      setNewReport({
        title: "",
        type: "monthly",
        format: "pdf",
        dueDate: "",
        description: "",
        template: "",
        includeCharts: true,
        includeWorkerData: true,
        includeContractorData: true,
        includeFinancials: false,
      })

      // Show success message
      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Report "${report.title}" created successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)
    } catch (error) {
      console.error("Error creating report:", error)
      alert("Error creating report. Please try again.")
    }
  }

  const handleCreateTemplate = async () => {
    try {
      const template: Template = {
        id: `TPL-${Date.now()}`,
        name: newTemplate.name,
        description: newTemplate.description,
        type: newTemplate.type,
        lastUsed: new Date().toISOString().split("T")[0],
        usageCount: 0,
      }

      setTemplates([template, ...templates])
      setShowCreateTemplate(false)
      setNewTemplate({
        name: "",
        description: "",
        type: "compliance",
        sections: [],
      })

      // Show success message
      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Template "${template.name}" created successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)
    } catch (error) {
      console.error("Error creating template:", error)
      alert("Error creating template. Please try again.")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case "word":
        return <FileText className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return <Target className="h-4 w-4 text-blue-500" />
      case "financial":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "operational":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    const matchesType = filterType === "all" || report.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    totalReports: reports.length,
    draftReports: reports.filter((r) => r.status === "draft").length,
    pendingReports: reports.filter((r) => r.status === "pending").length,
    submittedReports: reports.filter((r) => r.status === "submitted").length,
    overdueReports: reports.filter((r) => new Date(r.dueDate) < new Date() && r.status !== "submitted").length,
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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Documentation</h1>
          <p className="text-gray-600">Manage compliance reports, templates, and documentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowCreateTemplate(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
          <Button onClick={() => setShowCreateReport(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">All reports</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Reports</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftReports}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submittedReports}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdueReports}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>Manage and track all compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {getFormatIcon(report.format)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{report.title}</h4>
                          {getStatusBadge(report.status)}
                          <Badge variant="outline" className="capitalize">
                            {report.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By {report.author}</span>
                          <span>Created {report.createdDate}</span>
                          <span>Due {report.dueDate}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedReport(report)
                          setShowReportDetails(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Manage reusable report templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(template.type)}
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {template.type}
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>Used {template.usageCount} times</span>
                        <span>Last used {template.lastUsed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1">
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Trends</CardTitle>
                <CardDescription>Monthly report creation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600">Report trends chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Usage</CardTitle>
                <CardDescription>Most popular report templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates
                    .sort((a, b) => b.usageCount - a.usageCount)
                    .slice(0, 3)
                    .map((template, index) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">{template.usageCount} uses</div>
                          </div>
                        </div>
                        <Progress value={(template.usageCount / 24) * 100} className="w-20" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Report Dialog */}
      <Dialog open={showCreateReport} onOpenChange={setShowCreateReport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>Generate a new compliance report</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Title</label>
                <Input
                  placeholder="Enter report title"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select
                  value={newReport.type}
                  onValueChange={(value: any) => setNewReport({ ...newReport, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Output Format</label>
                <Select
                  value={newReport.format}
                  onValueChange={(value: any) => setNewReport({ ...newReport, format: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="word">Word Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={newReport.dueDate}
                  onChange={(e) => setNewReport({ ...newReport, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter report description"
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Template (Optional)</label>
              <Select
                value={newReport.template}
                onValueChange={(value) => setNewReport({ ...newReport, template: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Include Sections</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReport.includeCharts}
                    onChange={(e) => setNewReport({ ...newReport, includeCharts: e.target.checked })}
                  />
                  <span className="text-sm">Charts and Visualizations</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReport.includeWorkerData}
                    onChange={(e) => setNewReport({ ...newReport, includeWorkerData: e.target.checked })}
                  />
                  <span className="text-sm">Worker Data and Statistics</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReport.includeContractorData}
                    onChange={(e) => setNewReport({ ...newReport, includeContractorData: e.target.checked })}
                  />
                  <span className="text-sm">Contractor Performance Data</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReport.includeFinancials}
                    onChange={(e) => setNewReport({ ...newReport, includeFinancials: e.target.checked })}
                  />
                  <span className="text-sm">Financial Summary</span>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateReport(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport} disabled={!newReport.title || !newReport.dueDate}>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Template Dialog */}
      <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>Create a reusable report template</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Template Name</label>
              <Input
                placeholder="Enter template name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Template Type</label>
              <Select
                value={newTemplate.type}
                onValueChange={(value: any) => setNewTemplate({ ...newTemplate, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance">Compliance Template</SelectItem>
                  <SelectItem value="financial">Financial Template</SelectItem>
                  <SelectItem value="operational">Operational Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter template description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateTemplate(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTemplate} disabled={!newTemplate.name || !newTemplate.description}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Details Dialog */}
      <Dialog open={showReportDetails} onOpenChange={setShowReportDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
            <DialogDescription>Report details and actions</DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="capitalize">
                      {selectedReport.type}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Format</label>
                  <div className="mt-1 flex items-center gap-2">
                    {getFormatIcon(selectedReport.format)}
                    <span className="capitalize">{selectedReport.format}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Author</label>
                  <div className="mt-1">{selectedReport.author}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created Date</label>
                  <div className="mt-1">{selectedReport.createdDate}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Due Date</label>
                  <div className="mt-1">{selectedReport.dueDate}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedReport.description}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedReport.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
