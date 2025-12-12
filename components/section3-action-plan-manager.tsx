"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Eye,
  Edit,
  Plus,
  FileSpreadsheet,
  Zap,
} from "lucide-react"

interface LaborHoursEntry {
  jobTitle: string
  totalHours: number
  section3Hours: number
  targetedSection3Hours: number
  section3Percentage: number
  targetedSection3Percentage: number
  notes: string
}

interface SubcontractorEntry {
  name: string
  contactInfo: string
  contractValue: number
  scopeOfWork: string
  isSection3Business: boolean
}

interface Section3ActionPlan {
  id: string
  contractorName: string
  rfpContractNumber: string
  projectTitle: string
  contractValue: number
  startDate: string
  endDate: string
  reportingContact: {
    name: string
    phone: string
    email: string
  }
  laborHours: LaborHoursEntry[]
  subcontractors: SubcontractorEntry[]
  alternativeOpportunities: string
  pastPerformance: string
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  submissionDate: string
  reviewDate?: string
  reviewNotes?: string
  complianceScore: number
  monthlyReports: MonthlyReport[]
}

interface MonthlyReport {
  id: string
  reportingPeriod: string
  totalLaborHours: number
  section3LaborHours: number
  targetedSection3LaborHours: number
  section3Percentage: number
  targetedSection3Percentage: number
  subcontractingValue: number
  section3SubcontractingValue: number
  subcontractingPercentage: number
  challenges: string
  nextMonthPlans: string
  submissionDate: string
  status: "pending" | "submitted" | "reviewed"
}

export function Section3ActionPlanManager() {
  const [actionPlans, setActionPlans] = useState<Section3ActionPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<Section3ActionPlan[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState<Section3ActionPlan | null>(null)
  const [showPlanDetails, setShowPlanDetails] = useState(false)
  const [showNewPlanForm, setShowNewPlanForm] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [loading, setLoading] = useState(true)

  const [newActionPlan, setNewActionPlan] = useState<Partial<Section3ActionPlan>>({
    contractorName: "",
    rfpContractNumber: "",
    projectTitle: "",
    contractValue: 0,
    startDate: "",
    endDate: "",
    reportingContact: {
      name: "",
      phone: "",
      email: "",
    },
    laborHours: [],
    subcontractors: [],
    alternativeOpportunities: "",
    pastPerformance: "",
    status: "draft",
  })

  const [newPlan, setNewPlan] = useState<Partial<Section3ActionPlan>>({
    contractorName: "",
    rfpContractNumber: "",
    projectTitle: "",
    contractValue: 0,
    startDate: "",
    endDate: "",
    reportingContact: {
      name: "",
      phone: "",
      email: "",
    },
    laborHours: [],
    subcontractors: [],
    alternativeOpportunities: "",
    pastPerformance: "",
    status: "draft",
  })

  useEffect(() => {
    loadActionPlans()
  }, [])

  useEffect(() => {
    filterPlans()
  }, [actionPlans, searchTerm, filterStatus])

  const loadActionPlans = async () => {
    setLoading(true)
    try {
      // Simulate loading action plans data
      const mockPlans = generateMockActionPlans()
      setActionPlans(mockPlans)
    } catch (error) {
      console.error("Error loading action plans:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockActionPlans = (): Section3ActionPlan[] => {
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

    return contractors.map((contractor, index) => ({
      id: `plan-${index + 1}`,
      contractorName: contractor,
      rfpContractNumber: `RFP-2024-${String(index + 1).padStart(3, "0")}`,
      projectTitle: `${contractor} Housing Development Project`,
      contractValue: Math.floor(Math.random() * 50000000) + 1000000,
      startDate: "2024-01-15",
      endDate: "2025-12-31",
      reportingContact: {
        name: `Contact Person ${index + 1}`,
        phone: `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
        email: `contact${index + 1}@${contractor.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      },
      laborHours: [
        {
          jobTitle: "General Construction",
          totalHours: 2000,
          section3Hours: 600,
          targetedSection3Hours: 150,
          section3Percentage: 30,
          targetedSection3Percentage: 7.5,
          notes: "Meeting benchmarks consistently",
        },
        {
          jobTitle: "Electrical Work",
          totalHours: 800,
          section3Hours: 200,
          targetedSection3Hours: 40,
          section3Percentage: 25,
          targetedSection3Percentage: 5,
          notes: "Slight shortfall in targeted workers",
        },
      ],
      subcontractors: [
        {
          name: "ABC Electrical Services",
          contactInfo: "contact@abcelectrical.com",
          contractValue: 500000,
          scopeOfWork: "Electrical installation and maintenance",
          isSection3Business: true,
        },
      ],
      alternativeOpportunities: "Workforce training programs for Section 3 residents",
      pastPerformance: "Successfully completed 3 previous DCHA projects with 32% Section 3 compliance",
      status: ["submitted", "under_review", "approved"][Math.floor(Math.random() * 3)] as any,
      submissionDate: "2024-01-30",
      reviewDate: "2024-02-15",
      reviewNotes: "Plan meets requirements with minor recommendations",
      complianceScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      monthlyReports: generateMonthlyReports(),
    }))
  }

  const generateMonthlyReports = (): MonthlyReport[] => {
    const reports: MonthlyReport[] = []
    const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05"]

    months.forEach((month, index) => {
      reports.push({
        id: `report-${month}`,
        reportingPeriod: month,
        totalLaborHours: Math.floor(Math.random() * 1000) + 500,
        section3LaborHours: Math.floor(Math.random() * 300) + 150,
        targetedSection3LaborHours: Math.floor(Math.random() * 100) + 25,
        section3Percentage: Math.floor(Math.random() * 15) + 20, // 20-35%
        targetedSection3Percentage: Math.floor(Math.random() * 8) + 3, // 3-11%
        subcontractingValue: Math.floor(Math.random() * 500000) + 100000,
        section3SubcontractingValue: Math.floor(Math.random() * 100000) + 20000,
        subcontractingPercentage: Math.floor(Math.random() * 15) + 8, // 8-23%
        challenges: "Weather delays affected Section 3 worker availability",
        nextMonthPlans: "Increase outreach to Section 3 worker database",
        submissionDate: `${month}-28`,
        status: index < 3 ? "reviewed" : "submitted",
      })
    })

    return reports
  }

  const filterPlans = () => {
    let filtered = actionPlans

    if (searchTerm) {
      filtered = filtered.filter(
        (plan) =>
          plan.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.rfpContractNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((plan) => plan.status === filterStatus)
    }

    setFilteredPlans(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline">
            <Edit className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Submitted
          </Badge>
        )
      case "under_review":
        return (
          <Badge variant="default">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleViewPlan = (plan: Section3ActionPlan) => {
    setSelectedPlan(plan)
    setShowPlanDetails(true)
  }

  const handleExportPlans = () => {
    // Generate CSV export of all action plans
    const csvContent = generateActionPlansCSV(filteredPlans)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `section3-action-plans-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAddActionPlan = async () => {
    try {
      const actionPlan: Section3ActionPlan = {
        id: `plan-${Date.now()}`,
        ...newActionPlan,
        submissionDate: new Date().toISOString().split("T")[0],
        complianceScore: 0,
        monthlyReports: [],
      } as Section3ActionPlan

      setActionPlans([actionPlan, ...actionPlans])
      setShowNewPlanForm(false)

      // Reset form
      setNewActionPlan({
        contractorName: "",
        rfpContractNumber: "",
        projectTitle: "",
        contractValue: 0,
        startDate: "",
        endDate: "",
        reportingContact: { name: "", phone: "", email: "" },
        laborHours: [],
        subcontractors: [],
        alternativeOpportunities: "",
        pastPerformance: "",
        status: "draft",
      })
    } catch (error) {
      console.error("Error adding action plan:", error)
    }
  }

  const generateActionPlansCSV = (plans: Section3ActionPlan[]): string => {
    const headers = [
      "Contractor Name",
      "RFP/Contract Number",
      "Project Title",
      "Contract Value",
      "Start Date",
      "End Date",
      "Status",
      "Compliance Score",
      "Total Labor Hours",
      "Section 3 Labor Hours",
      "Section 3 Percentage",
      "Targeted Section 3 Hours",
      "Targeted Section 3 Percentage",
      "Reporting Contact",
      "Contact Email",
      "Contact Phone",
    ]

    const csvContent = [
      headers.join(","),
      ...plans.map((plan) => {
        const totalLaborHours = plan.laborHours.reduce((sum, entry) => sum + entry.totalHours, 0)
        const section3LaborHours = plan.laborHours.reduce((sum, entry) => sum + entry.section3Hours, 0)
        const targetedSection3Hours = plan.laborHours.reduce((sum, entry) => sum + entry.targetedSection3Hours, 0)

        return [
          `"${plan.contractorName}"`,
          plan.rfpContractNumber,
          `"${plan.projectTitle}"`,
          plan.contractValue,
          plan.startDate,
          plan.endDate,
          plan.status,
          plan.complianceScore,
          totalLaborHours,
          section3LaborHours,
          totalLaborHours > 0 ? Math.round((section3LaborHours / totalLaborHours) * 100) : 0,
          targetedSection3Hours,
          totalLaborHours > 0 ? Math.round((targetedSection3Hours / totalLaborHours) * 100) : 0,
          `"${plan.reportingContact.name}"`,
          plan.reportingContact.email,
          plan.reportingContact.phone,
        ].join(",")
      }),
    ].join("\n")

    return csvContent
  }

  const stats = {
    total: actionPlans.length,
    submitted: actionPlans.filter((p) => p.status === "submitted").length,
    underReview: actionPlans.filter((p) => p.status === "under_review").length,
    approved: actionPlans.filter((p) => p.status === "approved").length,
    avgCompliance:
      actionPlans.length > 0
        ? Math.round(actionPlans.reduce((sum, p) => sum + p.complianceScore, 0) / actionPlans.length)
        : 0,
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
          <h1 className="text-3xl font-bold text-gray-900">Section 3 Action Plan Manager</h1>
          <p className="text-gray-600">Digitize, track, and monitor contractor Section 3 compliance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowBulkUpload(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline" onClick={handleExportPlans}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowNewPlanForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Action Plan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Action plans managed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submitted}</div>
            <Progress value={(stats.submitted / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.underReview}</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <Progress value={(stats.approved / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getComplianceColor(stats.avgCompliance)}`}>
              {stats.avgCompliance}%
            </div>
            <Progress value={stats.avgCompliance} className="mt-2" />
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
                placeholder="Search by contractor name, project title, or RFP number..."
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
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Action Plans</CardTitle>
          <CardDescription>Manage and monitor Section 3 action plans from all contractors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Contract Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{plan.contractorName}</div>
                      <div className="text-sm text-muted-foreground">{plan.rfpContractNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{plan.projectTitle}</div>
                  </TableCell>
                  <TableCell>{formatCurrency(plan.contractValue)}</TableCell>
                  <TableCell>{getStatusBadge(plan.status)}</TableCell>
                  <TableCell>
                    <div className={`font-medium ${getComplianceColor(plan.complianceScore)}`}>
                      {plan.complianceScore}%
                    </div>
                  </TableCell>
                  <TableCell>{plan.submissionDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewPlan(plan)}>
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

      {/* Bulk Upload Suggestions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Zap className="h-5 w-5" />
            Bulk Processing Recommendations
          </CardTitle>
          <CardDescription className="text-blue-700">
            For your 300+ action plans, here are efficient processing strategies:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">1. OCR + AI Processing</h4>
              <p className="text-sm text-blue-700">
                Use OCR to scan PDF forms, then AI to extract key metrics automatically. This can process 50-100 forms
                per hour.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">2. Template Standardization</h4>
              <p className="text-sm text-blue-700">
                Create digital templates that contractors fill out online, eliminating manual data entry entirely.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">3. Batch Import System</h4>
              <p className="text-sm text-blue-700">
                Upload multiple Excel/CSV files at once with automatic validation and error reporting.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">4. API Integration</h4>
              <p className="text-sm text-blue-700">
                Connect directly with contractor management systems to pull data automatically.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowBulkUpload(true)}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Start Bulk Upload
            </Button>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Setup OCR Processing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Plan Details Dialog */}
      <Dialog open={showPlanDetails} onOpenChange={setShowPlanDetails}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Action Plan Details - {selectedPlan?.contractorName}</DialogTitle>
            <DialogDescription>Complete Section 3 action plan and monthly compliance tracking</DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="labor-hours">Labor Hours</TabsTrigger>
                <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
                <TabsTrigger value="monthly-reports">Monthly Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contract Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <Label className="text-sm font-medium">RFP/Contract Number</Label>
                        <p>{selectedPlan.rfpContractNumber}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Project Title</Label>
                        <p>{selectedPlan.projectTitle}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Contract Value</Label>
                        <p>{formatCurrency(selectedPlan.contractValue)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Project Duration</Label>
                        <p>
                          {selectedPlan.startDate} to {selectedPlan.endDate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reporting Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p>{selectedPlan.reportingContact.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p>{selectedPlan.reportingContact.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p>{selectedPlan.reportingContact.email}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getComplianceColor(selectedPlan.complianceScore)}`}>
                          {selectedPlan.complianceScore}%
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Compliance Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedPlan.laborHours.reduce((sum, entry) => sum + entry.section3Hours, 0)}
                        </div>
                        <p className="text-sm text-muted-foreground">Section 3 Labor Hours</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedPlan.laborHours.reduce((sum, entry) => sum + entry.targetedSection3Hours, 0)}
                        </div>
                        <p className="text-sm text-muted-foreground">Targeted Section 3 Hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="labor-hours" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Labor Hours Tracking</CardTitle>
                    <CardDescription>Detailed breakdown of Section 3 labor hour compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title/Trade</TableHead>
                          <TableHead>Total Hours</TableHead>
                          <TableHead>Section 3 Hours</TableHead>
                          <TableHead>Targeted Section 3</TableHead>
                          <TableHead>Section 3 %</TableHead>
                          <TableHead>Targeted %</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPlan.laborHours.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{entry.jobTitle}</TableCell>
                            <TableCell>{entry.totalHours.toLocaleString()}</TableCell>
                            <TableCell>{entry.section3Hours.toLocaleString()}</TableCell>
                            <TableCell>{entry.targetedSection3Hours.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={entry.section3Percentage >= 25 ? "default" : "destructive"}
                                className={entry.section3Percentage >= 25 ? "bg-green-100 text-green-800" : undefined}
                              >
                                {entry.section3Percentage}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={entry.targetedSection3Percentage >= 5 ? "default" : "destructive"}
                                className={
                                  entry.targetedSection3Percentage >= 5 ? "bg-green-100 text-green-800" : undefined
                                }
                              >
                                {entry.targetedSection3Percentage}%
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{entry.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subcontractors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Subcontractor Compliance</CardTitle>
                    <CardDescription>Section 3 business concern subcontracting requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subcontractor Name</TableHead>
                          <TableHead>Contact Information</TableHead>
                          <TableHead>Contract Value</TableHead>
                          <TableHead>Scope of Work</TableHead>
                          <TableHead>Section 3 Business</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPlan.subcontractors.map((sub, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{sub.name}</TableCell>
                            <TableCell>{sub.contactInfo}</TableCell>
                            <TableCell>{formatCurrency(sub.contractValue)}</TableCell>
                            <TableCell className="max-w-xs truncate">{sub.scopeOfWork}</TableCell>
                            <TableCell>
                              {sub.isSection3Business ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline">No</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monthly-reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Compliance Reports</CardTitle>
                    <CardDescription>Track monthly Section 3 performance and compliance trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPlan.monthlyReports.map((report) => (
                        <Card key={report.id} className="border-l-4 border-l-blue-500">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                Report for{" "}
                                {new Date(report.reportingPeriod).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                })}
                              </CardTitle>
                              <Badge variant={report.status === "reviewed" ? "default" : "secondary"}>
                                {report.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-4 md:grid-cols-4">
                              <div>
                                <Label className="text-sm font-medium">Total Labor Hours</Label>
                                <p className="text-lg font-semibold">{report.totalLaborHours.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Section 3 Hours</Label>
                                <p className="text-lg font-semibold">{report.section3LaborHours.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{report.section3Percentage}%</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Targeted Section 3</Label>
                                <p className="text-lg font-semibold">
                                  {report.targetedSection3LaborHours.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">{report.targetedSection3Percentage}%</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Subcontracting</Label>
                                <p className="text-lg font-semibold">
                                  {formatCurrency(report.section3SubcontractingValue)}
                                </p>
                                <p className="text-sm text-muted-foreground">{report.subcontractingPercentage}%</p>
                              </div>
                            </div>
                            {report.challenges && (
                              <div className="mt-4">
                                <Label className="text-sm font-medium">Challenges</Label>
                                <p className="text-sm text-muted-foreground">{report.challenges}</p>
                              </div>
                            )}
                            {report.nextMonthPlans && (
                              <div className="mt-2">
                                <Label className="text-sm font-medium">Next Month Plans</Label>
                                <p className="text-sm text-muted-foreground">{report.nextMonthPlans}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanDetails(false)}>
              Close
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={showBulkUpload} onOpenChange={setShowBulkUpload}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Upload Action Plans</DialogTitle>
            <DialogDescription>Upload multiple action plans at once using CSV, Excel, or PDF files</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <div className="text-center space-y-2">
                  <FileSpreadsheet className="h-8 w-8 mx-auto text-green-600" />
                  <h3 className="font-medium">Excel/CSV Upload</h3>
                  <p className="text-sm text-muted-foreground">Upload structured data files</p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <div className="text-center space-y-2">
                  <FileText className="h-8 w-8 mx-auto text-blue-600" />
                  <h3 className="font-medium">PDF Processing</h3>
                  <p className="text-sm text-muted-foreground">OCR scan filled PDF forms</p>
                  <Button variant="outline" size="sm">
                    Upload PDFs
                  </Button>
                </div>
              </Card>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <Button>Select Files</Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Processing Options:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Automatic data validation and error detection</li>
                <li>• Duplicate contractor detection and merging</li>
                <li>• Section 3 compliance score calculation</li>
                <li>• Email notifications to contractors for missing information</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkUpload(false)}>
              Cancel
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Start Processing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Action Plan Dialog */}
      <Dialog open={showNewPlanForm} onOpenChange={setShowNewPlanForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Section 3 Action Plan</DialogTitle>
            <DialogDescription>Enter contractor information and Section 3 commitments</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Contractor Name *</Label>
                <Input
                  value={newActionPlan.contractorName || ""}
                  onChange={(e) => setNewActionPlan({ ...newActionPlan, contractorName: e.target.value })}
                  placeholder="Enter contractor name"
                />
              </div>
              <div className="space-y-2">
                <Label>RFP/Contract Number *</Label>
                <Input
                  value={newActionPlan.rfpContractNumber || ""}
                  onChange={(e) => setNewActionPlan({ ...newActionPlan, rfpContractNumber: e.target.value })}
                  placeholder="RFP-2024-001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Title *</Label>
              <Input
                value={newActionPlan.projectTitle || ""}
                onChange={(e) => setNewActionPlan({ ...newActionPlan, projectTitle: e.target.value })}
                placeholder="Enter project title"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Contract Value ($)</Label>
                <Input
                  type="number"
                  value={newActionPlan.contractValue || ""}
                  onChange={(e) => setNewActionPlan({ ...newActionPlan, contractValue: Number(e.target.value) })}
                  placeholder="1000000"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newActionPlan.startDate || ""}
                  onChange={(e) => setNewActionPlan({ ...newActionPlan, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={newActionPlan.endDate || ""}
                  onChange={(e) => setNewActionPlan({ ...newActionPlan, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Reporting Contact</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    value={newActionPlan.reportingContact?.name || ""}
                    onChange={(e) =>
                      setNewActionPlan({
                        ...newActionPlan,
                        reportingContact: { ...newActionPlan.reportingContact!, name: e.target.value },
                      })
                    }
                    placeholder="Contact person name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={newActionPlan.reportingContact?.phone || ""}
                    onChange={(e) =>
                      setNewActionPlan({
                        ...newActionPlan,
                        reportingContact: { ...newActionPlan.reportingContact!, phone: e.target.value },
                      })
                    }
                    placeholder="(202) 555-0123"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newActionPlan.reportingContact?.email || ""}
                    onChange={(e) =>
                      setNewActionPlan({
                        ...newActionPlan,
                        reportingContact: { ...newActionPlan.reportingContact!, email: e.target.value },
                      })
                    }
                    placeholder="contact@contractor.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPlanForm(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddActionPlan}
              disabled={
                !newActionPlan.contractorName || !newActionPlan.rfpContractNumber || !newActionPlan.projectTitle
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Action Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
