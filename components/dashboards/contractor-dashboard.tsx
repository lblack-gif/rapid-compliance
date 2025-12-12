"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth"
import {
  Building2,
  FileText,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Upload,
  LogOut,
  Clock,
  TrendingUp,
  Target,
  Award,
  Download,
  Edit,
  Eye,
  Plus,
  Search,
  FileBarChart,
  Package,
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export function ContractorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeSubTab, setActiveSubTab] = useState("overview")
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [showNewContractModal, setShowNewContractModal] = useState(false)
  const [showSubmitReportModal, setShowSubmitReportModal] = useState(false)
  const [showUpdateWorkersModal, setShowUpdateWorkersModal] = useState(false)
  const [showViewContractsModal, setShowViewContractsModal] = useState(false)
  const [showContractDetailsModal, setShowContractDetailsModal] = useState(false)
  const [showEditContractModal, setShowEditContractModal] = useState(false)
  const [showUploadHUDReportModal, setShowUploadHUDReportModal] = useState(false)
  const [showSubmitActionPlanModal, setShowSubmitActionPlanModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [newContractData, setNewContractData] = useState({
    name: "",
    value: "",
    description: "",
    startDate: "",
    endDate: "",
    section3Target: "25",
  })
  const [reportData, setReportData] = useState({
    type: "monthly",
    period: "",
    description: "",
  })
  const [workerData, setWorkerData] = useState({
    name: "",
    trade: "",
    section3Status: "certified",
    project: "",
  })
  const { user, logout } = useAuth()

  const contractorStats = {
    activeContracts: 3,
    totalWorkers: 45,
    section3Workers: 18,
    complianceRate: 92,
    pendingReports: 2,
    upcomingDeadlines: 1,
  }

  const contracts = [
    {
      id: "CNT-001",
      name: "Riverside Housing Development",
      value: "$2,450,000",
      status: "Active",
      progress: 65,
      deadline: "2024-06-15",
      section3Target: 25,
      currentCompliance: 28,
      description: "Mixed-income housing development with 200 units",
      contractor: "ABC Construction",
      startDate: "2024-01-15",
    },
    {
      id: "CNT-002",
      name: "Downtown Renovation Project",
      value: "$1,800,000",
      status: "Active",
      progress: 40,
      deadline: "2024-08-30",
      section3Target: 25,
      currentCompliance: 22,
      description: "Commercial building renovation in downtown area",
      contractor: "Metro Builders",
      startDate: "2024-02-01",
    },
    {
      id: "CNT-003",
      name: "Community Center Construction",
      value: "$950,000",
      status: "Planning",
      progress: 15,
      deadline: "2024-12-01",
      section3Target: 25,
      currentCompliance: 30,
      description: "New community center with recreational facilities",
      contractor: "Urban Development",
      startDate: "2024-03-01",
    },
  ]

  const workers = [
    {
      id: "WRK-001",
      name: "Marcus Johnson",
      trade: "Electrician",
      section3Status: "Certified",
      hireDate: "2024-01-15",
      project: "Riverside Housing",
      hoursWorked: 320,
    },
    {
      id: "WRK-002",
      name: "Sarah Williams",
      trade: "Plumber",
      section3Status: "Targeted",
      hireDate: "2024-02-01",
      project: "Downtown Renovation",
      hoursWorked: 280,
    },
    {
      id: "WRK-003",
      name: "David Chen",
      trade: "HVAC Technician",
      section3Status: "Certified",
      hireDate: "2024-01-20",
      project: "Community Center",
      hoursWorked: 295,
    },
  ]

  const reports = [
    {
      id: "RPT-001",
      title: "Monthly Progress Report - January",
      type: "Monthly",
      status: "Submitted",
      dueDate: "2024-01-31",
      submittedDate: "2024-01-30",
    },
    {
      id: "RPT-002",
      title: "Quarterly Action Plan - Q1",
      type: "Quarterly",
      status: "Under Review",
      dueDate: "2024-03-31",
      submittedDate: "2024-03-28",
    },
    {
      id: "RPT-003",
      title: "Monthly Progress Report - February",
      type: "Monthly",
      status: "Due Soon",
      dueDate: "2024-02-29",
      submittedDate: null,
    },
  ]

  const getSidebarGradient = (itemId: string) => {
    const gradients = {
      overview: "bg-gradient-to-r from-blue-600 to-green-600",
      contracts: "bg-gradient-to-r from-emerald-600 to-cyan-600",
      workers: "bg-gradient-to-r from-teal-600 to-blue-600",
      reports: "bg-gradient-to-r from-violet-600 to-purple-600",
      "action-plans": "bg-gradient-to-r from-amber-500 to-orange-600",
      deadlines: "bg-gradient-to-r from-orange-500 to-red-500",
      submissions: "bg-gradient-to-r from-indigo-600 to-purple-600",
    }
    return gradients[itemId] || "bg-gradient-to-r from-blue-600 to-green-600"
  }

  const CountBadge = ({ count }) => {
    return (
      <Badge className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">{count}</Badge>
    )
  }

  const sidebarItems = [
    {
      category: "Dashboard",
      items: [
        { id: "overview", label: "Overview", icon: TrendingUp },
        {
          id: "contracts",
          label: (
            <span className="flex items-center">
              My Contracts
              <CountBadge count={contractorStats.activeContracts} />
            </span>
          ),
          icon: FileText,
        },
      ],
    },
    {
      category: "Compliance",
      items: [
        { id: "workers", label: "Section 3 Workers", icon: Users },
        { id: "reports", label: "Reports", icon: FileText },
        { id: "action-plans", label: "Action Plans", icon: Target },
      ],
    },
    {
      category: "Schedule",
      items: [
        { id: "deadlines", label: "Deadlines", icon: Calendar },
        { id: "submissions", label: "Submissions", icon: CheckCircle },
      ],
    },
  ]

  const handleNewContract = () => {
    setShowNewContractModal(true)
  }

  const handleSaveContract = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Contract "${newContractData.name}" created successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setNewContractData({
        name: "",
        value: "",
        description: "",
        startDate: "",
        endDate: "",
        section3Target: "25",
      })
      setShowNewContractModal(false)
    } catch (error) {
      console.error("Error creating contract:", error)
      alert("Error creating contract. Please try again.")
    }
  }

  const handleUploadHUDReport = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = "HUD Report uploaded successfully!"
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setShowUploadHUDReportModal(false)
    } catch (error) {
      console.error("Error uploading HUD report:", error)
      alert("Error uploading HUD report. Please try again.")
    }
  }

  const handleSubmitActionPlan = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = "Action Plan submitted successfully!"
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setShowSubmitActionPlanModal(false)
    } catch (error) {
      console.error("Error submitting action plan:", error)
      alert("Error submitting action plan. Please try again.")
    }
  }

  const handleDownloadContractPackage = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const packageData = `
CONTRACT PACKAGE
===============

Generated: ${new Date().toISOString()}
Contractor: ${user?.name}

ACTIVE CONTRACTS:
${contracts.map((c) => `- ${c.name}: ${c.value}`).join("\n")}

COMPLIANCE STATUS:
- Overall Rate: ${contractorStats.complianceRate}%
- Section 3 Workers: ${contractorStats.section3Workers}
- Total Workers: ${contractorStats.totalWorkers}

REPORTS:
${reports.map((r) => `- ${r.title}: ${r.status}`).join("\n")}
      `

      const blob = new Blob([packageData], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Contract_Package_${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = "Contract package downloaded successfully!"
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)
    } catch (error) {
      console.error("Error downloading contract package:", error)
      alert("Error downloading contract package. Please try again.")
    }
  }

  const handleSubmitReport = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `${reportData.type} report submitted successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setReportData({ type: "monthly", period: "", description: "" })
      setShowSubmitReportModal(false)
    } catch (error) {
      console.error("Error submitting report:", error)
      alert("Error submitting report. Please try again.")
    }
  }

  const handleUpdateWorkers = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Worker "${workerData.name}" updated successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setWorkerData({ name: "", trade: "", section3Status: "certified", project: "" })
      setShowUpdateWorkersModal(false)
    } catch (error) {
      console.error("Error updating worker:", error)
      alert("Error updating worker. Please try again.")
    }
  }

  const handleViewContractDetails = (contract) => {
    setSelectedContract(contract)
    setShowContractDetailsModal(true)
  }

  const handleEditContract = (contract) => {
    setSelectedContract(contract)
    setNewContractData({
      name: contract.name,
      value: contract.value,
      description: contract.description,
      startDate: contract.startDate,
      endDate: contract.deadline,
      section3Target: contract.section3Target.toString(),
    })
    setShowEditContractModal(true)
  }

  const handleDownloadContract = async (contract) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const contractDoc = `
CONTRACT DOCUMENT
================

Contract ID: ${contract.id}
Name: ${contract.name}
Value: ${contract.value}
Status: ${contract.status}
Progress: ${contract.progress}%
Section 3 Target: ${contract.section3Target}%
Current Compliance: ${contract.currentCompliance}%
Deadline: ${contract.deadline}

Description:
${contract.description}

Generated: ${new Date().toISOString()}
      `

      const blob = new Blob([contractDoc], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${contract.name.replace(/\s+/g, "_")}_Contract.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Contract "${contract.name}" downloaded successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)
    } catch (error) {
      console.error("Error downloading contract:", error)
      alert("Error downloading contract. Please try again.")
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 border-transparent shadow-sm font-medium"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="w-72 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg">Contractor Dashboard</h1>
              <p className="text-xs text-gray-500">Section 3 Compliance Portal</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">Real-time contractor insights and reporting</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Welcome, {user?.name}</p>
          </div>
        </div>

        <nav className="px-4 py-4 overflow-y-auto flex-1">
          {sidebarItems.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? `${getSidebarGradient(item.id)} text-white shadow-sm`
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 border-transparent font-medium"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600 text-lg">
                  Manage your Section 3 compliance requirements and track progress
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Contracts</CardTitle>
                    <FileText className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{contractorStats.activeContracts}</div>
                    <p className="text-xs text-gray-500">Currently executing</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Section 3 Workers</CardTitle>
                    <Users className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{contractorStats.section3Workers}</div>
                    <p className="text-xs text-gray-500">of {contractorStats.totalWorkers} total workers</p>
                    <Progress
                      value={(contractorStats.section3Workers / contractorStats.totalWorkers) * 100}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Compliance Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{contractorStats.complianceRate}%</div>
                    <Progress value={contractorStats.complianceRate} className="mt-2" />
                    <div className="text-sm text-green-600 mt-1">Above target</div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Items</CardTitle>
                    <Clock className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{contractorStats.pendingReports}</div>
                    <p className="text-xs text-gray-500">Reports due</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg border shadow-sm">
                <div className="grid grid-cols-4 bg-gray-50 rounded-t-lg">
                  <button
                    onClick={() => setActiveSubTab("overview")}
                    className={`px-4 py-3 text-sm font-medium rounded-tl-lg flex items-center gap-2 ${
                      activeSubTab === "overview" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-100"
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveSubTab("compliance")}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
                      activeSubTab === "compliance" ? "bg-green-500 text-white" : "text-gray-600 hover:bg-green-100"
                    }`}
                  >
                    <Target className="h-4 w-4" />
                    Compliance
                  </button>
                  <button
                    onClick={() => setActiveSubTab("reports")}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
                      activeSubTab === "reports" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-100"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    Reports
                  </button>
                  <button
                    onClick={() => setActiveSubTab("schedule")}
                    className={`px-4 py-3 text-sm font-medium rounded-tr-lg flex items-center gap-2 ${
                      activeSubTab === "schedule" ? "bg-purple-500 text-white" : "text-gray-600 hover:bg-purple-100"
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </button>
                </div>

                <div className="p-6">
                  {activeSubTab === "overview" && (
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          Quick Actions
                        </CardTitle>
                        <CardDescription>Common tasks for Section 3 compliance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                            onClick={() => setShowUploadHUDReportModal(true)}
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Upload className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium">Upload HUD Report</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                            onClick={() => setShowUpdateWorkersModal(true)}
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-sm font-medium">View Workers</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                            onClick={() => setShowSubmitActionPlanModal(true)}
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <FileBarChart className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium">Submit Action Plan</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                            onClick={handleDownloadContractPackage}
                          >
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-orange-600" />
                            </div>
                            <span className="text-sm font-medium">Download Contract Package</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSubTab === "compliance" && (
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle>Compliance Status</CardTitle>
                        <CardDescription>Current Section 3 compliance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Section 3 Workers</span>
                            <div className="flex items-center gap-2">
                              <Progress value={75} className="w-24" />
                              <span className="text-sm font-medium">28% / 25%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Targeted Section 3</span>
                            <div className="flex items-center gap-2">
                              <Progress value={60} className="w-24" />
                              <span className="text-sm font-medium">15% / 5%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Section 3 Business</span>
                            <div className="flex items-center gap-2">
                              <Progress value={80} className="w-24" />
                              <span className="text-sm font-medium">8% / 10%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSubTab === "reports" && (
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle>Recent Reports</CardTitle>
                        <CardDescription>Your submitted compliance reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {reports.slice(0, 3).map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h3 className="font-semibold">{report.title}</h3>
                                <p className="text-sm text-gray-600">{report.type} Report</p>
                              </div>
                              <Badge
                                className={
                                  report.status === "Submitted"
                                    ? "bg-green-100 text-green-800"
                                    : report.status === "Under Review"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-orange-100 text-orange-800"
                                }
                              >
                                {report.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSubTab === "schedule" && (
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                        <CardDescription>Important dates and milestones</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h3 className="font-semibold">Monthly Progress Report</h3>
                              <p className="text-sm text-gray-600">Due: February 29, 2024</p>
                            </div>
                            <Badge variant="destructive" className="bg-red-100 text-red-800">
                              5 days
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h3 className="font-semibold">Quarterly Action Plan</h3>
                              <p className="text-sm text-gray-600">Due: March 31, 2024</p>
                            </div>
                            <Badge className="bg-orange-100 text-orange-800">30 days</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {contractorStats.upcomingDeadlines > 0 && (
                <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      Upcoming Deadlines
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      You have {contractorStats.upcomingDeadlines} report due within 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-800 hover:bg-orange-100 bg-transparent"
                      onClick={() => setActiveTab("deadlines")}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "contracts" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Contracts</h1>
                  <p className="text-gray-600">Manage your active Section 3 contracts</p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={handleNewContract}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Contract
                </Button>
              </div>

              <div className="grid gap-6">
                {contracts.map((contract) => (
                  <Card key={contract.id} className="shadow-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-gray-900">{contract.name}</CardTitle>
                          <CardDescription className="text-gray-600">Contract ID: {contract.id}</CardDescription>
                        </div>
                        <Badge
                          variant={contract.status === "Active" ? "default" : "secondary"}
                          className={contract.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {contract.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Contract Value</p>
                          <p className="font-semibold text-gray-900">{contract.value}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Progress</p>
                          <div className="flex items-center gap-2">
                            <Progress value={contract.progress} className="flex-1" />
                            <span className="text-sm font-medium text-gray-900">{contract.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Section 3 Compliance</p>
                          <p
                            className={`font-semibold ${contract.currentCompliance >= contract.section3Target ? "text-green-600" : "text-orange-600"}`}
                          >
                            {contract.currentCompliance}% / {contract.section3Target}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Deadline</p>
                          <p className="font-semibold text-gray-900">{contract.deadline}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 bg-transparent"
                          onClick={() => handleViewContractDetails(contract)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 bg-transparent"
                          onClick={() => handleEditContract(contract)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 bg-transparent"
                          onClick={() => handleDownloadContract(contract)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "workers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Section 3 Workers</h1>
                  <p className="text-gray-600">Track and manage your Section 3 workforce</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search workers..." className="pl-10 w-64" />
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={() => setShowUpdateWorkersModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Worker
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {workers.map((worker) => (
                  <Card key={worker.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 flex-1">
                          <div>
                            <p className="text-sm text-gray-500">Worker Name</p>
                            <p className="font-semibold text-gray-900">{worker.name}</p>
                            <p className="text-sm text-gray-600">ID: {worker.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Trade</p>
                            <p className="font-semibold text-gray-900">{worker.trade}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Section 3 Status</p>
                            <Badge
                              variant={worker.section3Status === "Certified" ? "default" : "secondary"}
                              className={
                                worker.section3Status === "Certified"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {worker.section3Status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Current Project</p>
                            <p className="font-semibold text-gray-900">{worker.project}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Hours Worked</p>
                            <p className="font-semibold text-gray-900">{worker.hoursWorked}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                  <p className="text-gray-600">Track your reporting requirements and submissions</p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={() => setShowSubmitReportModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </div>

              <div className="grid gap-4">
                {reports.map((report) => (
                  <Card key={report.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                          <div>
                            <p className="text-sm text-gray-500">Report Title</p>
                            <p className="font-semibold text-gray-900">{report.title}</p>
                            <p className="text-sm text-gray-600">ID: {report.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Type</p>
                            <p className="font-semibold text-gray-900">{report.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <Badge
                              variant={
                                report.status === "Submitted"
                                  ? "default"
                                  : report.status === "Under Review"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                report.status === "Submitted"
                                  ? "bg-green-100 text-green-800"
                                  : report.status === "Under Review"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-orange-100 text-orange-800"
                              }
                            >
                              {report.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Due Date</p>
                            <p className="font-semibold text-gray-900">{report.dueDate}</p>
                            {report.submittedDate && (
                              <p className="text-sm text-gray-600">Submitted: {report.submittedDate}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "action-plans" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Action Plans</h1>
                  <p className="text-gray-600">Manage Section 3 action plans and compliance strategies</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Action Plan
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Current Action Plans
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                        <div>
                          <p className="font-medium text-gray-900">Q1 2024 Action Plan</p>
                          <p className="text-sm text-gray-600">Riverside Housing Development</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                        <div>
                          <p className="font-medium text-gray-900">Q2 2024 Action Plan</p>
                          <p className="text-sm text-gray-600">Downtown Renovation</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Compliance Targets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Section 3 Workers</span>
                          <span className="font-medium text-gray-900">28% / 25%</span>
                        </div>
                        <Progress value={112} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Targeted Section 3</span>
                          <span className="font-medium text-gray-900">15% / 5%</span>
                        </div>
                        <Progress value={300} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Section 3 Business</span>
                          <span className="font-medium text-gray-900">8% / 10%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "deadlines" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Upcoming Deadlines</h1>
                <p className="text-gray-600">Important dates and milestones for your projects</p>
              </div>

              <div className="grid gap-4">
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">Monthly Progress Report</h3>
                        <p className="text-sm text-gray-600">Riverside Housing Development</p>
                        <p className="text-sm text-gray-500">Due: February 29, 2024</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          5 days
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">High Priority</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">Quarterly Action Plan</h3>
                        <p className="text-sm text-gray-600">Downtown Renovation Project</p>
                        <p className="text-sm text-gray-500">Due: March 31, 2024</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-orange-100 text-orange-800">30 days</Badge>
                        <p className="text-sm text-gray-500 mt-1">Medium Priority</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
                <p className="text-gray-600">Track your submitted reports and documents</p>
              </div>

              <div className="bg-white rounded-lg border shadow-sm">
                <div className="grid grid-cols-3 bg-gray-50 rounded-t-lg">
                  <button className="px-4 py-3 text-sm font-medium bg-blue-500 text-white rounded-tl-lg flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Recent Submissions
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-orange-100 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Pending Review
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-green-100 rounded-tr-lg flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approved
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <Card key={report.id} className="shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-900">{report.title}</h3>
                            <p className="text-sm text-gray-600">{report.type} Report</p>
                            {report.submittedDate && (
                              <p className="text-sm text-gray-500">Submitted: {report.submittedDate}</p>
                            )}
                          </div>
                          <Badge
                            className={
                              report.status === "Submitted"
                                ? "bg-green-100 text-green-800"
                                : report.status === "Under Review"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showNewContractModal} onOpenChange={setShowNewContractModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Contract</DialogTitle>
            <DialogDescription>Enter the details for your new Section 3 contract</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contract Name</label>
              <Input
                placeholder="Enter contract name"
                value={newContractData.name}
                onChange={(e) => setNewContractData({ ...newContractData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contract Value</label>
                <Input
                  placeholder="$0.00"
                  value={newContractData.value}
                  onChange={(e) => setNewContractData({ ...newContractData, value: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section 3 Target (%)</label>
                <Select
                  value={newContractData.section3Target}
                  onValueChange={(value) => setNewContractData({ ...newContractData, section3Target: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="30">30%</SelectItem>
                    <SelectItem value="35">35%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={newContractData.startDate}
                  onChange={(e) => setNewContractData({ ...newContractData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="date"
                  value={newContractData.endDate}
                  onChange={(e) => setNewContractData({ ...newContractData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Enter contract description"
                value={newContractData.description}
                onChange={(e) => setNewContractData({ ...newContractData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewContractModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveContract}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Create Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUploadHUDReportModal} onOpenChange={setShowUploadHUDReportModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload HUD Report</DialogTitle>
            <DialogDescription>Upload your Section 3 compliance report to HUD</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reporting Period</label>
              <Input placeholder="e.g., January 2024" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload File</label>
              <Input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea placeholder="Add any additional notes or comments" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadHUDReportModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUploadHUDReport}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Upload Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSubmitActionPlanModal} onOpenChange={setShowSubmitActionPlanModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Action Plan</DialogTitle>
            <DialogDescription>Submit your Section 3 action plan for review</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Action Plan Type</label>
              <Select defaultValue="quarterly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarterly">Quarterly Action Plan</SelectItem>
                  <SelectItem value="annual">Annual Action Plan</SelectItem>
                  <SelectItem value="project">Project-Specific Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riverside">Riverside Housing Development</SelectItem>
                  <SelectItem value="downtown">Downtown Renovation Project</SelectItem>
                  <SelectItem value="community">Community Center Construction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Action Plan</label>
              <Input type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Summary</label>
              <Textarea placeholder="Provide a brief summary of your action plan" rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitActionPlanModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitActionPlan}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Submit Action Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSubmitReportModal} onOpenChange={setShowSubmitReportModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Compliance Report</DialogTitle>
            <DialogDescription>Submit your Section 3 compliance report</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <Select value={reportData.type} onValueChange={(value) => setReportData({ ...reportData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reporting Period</label>
              <Input
                placeholder="e.g., January 2024"
                value={reportData.period}
                onChange={(e) => setReportData({ ...reportData, period: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Report Description</label>
              <Textarea
                placeholder="Describe the report contents and key findings"
                value={reportData.description}
                onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitReportModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReport}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUpdateWorkersModal} onOpenChange={setShowUpdateWorkersModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Worker Information</DialogTitle>
            <DialogDescription>Add or update Section 3 worker details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Worker Name</label>
              <Input
                placeholder="Enter worker name"
                value={workerData.name}
                onChange={(e) => setWorkerData({ ...workerData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Trade</label>
                <Select
                  value={workerData.trade}
                  onValueChange={(value) => setWorkerData({ ...workerData, trade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section 3 Status</label>
                <Select
                  value={workerData.section3Status}
                  onValueChange={(value) => setWorkerData({ ...workerData, section3Status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certified">Certified</SelectItem>
                    <SelectItem value="targeted">Targeted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Assigned Project</label>
              <Select
                value={workerData.project}
                onValueChange={(value) => setWorkerData({ ...workerData, project: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riverside">Riverside Housing Development</SelectItem>
                  <SelectItem value="downtown">Downtown Renovation Project</SelectItem>
                  <SelectItem value="community">Community Center Construction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateWorkersModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateWorkers}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Update Worker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewContractsModal} onOpenChange={setShowViewContractsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Contracts Overview</DialogTitle>
            <DialogDescription>Complete list of your contracts and their status</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{contract.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{contract.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Value:</span>
                          <span className="font-medium ml-1">{contract.value}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Progress:</span>
                          <span className="font-medium ml-1">{contract.progress}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Compliance:</span>
                          <span className="font-medium ml-1">{contract.currentCompliance}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Deadline:</span>
                          <span className="font-medium ml-1">{contract.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={contract.status === "Active" ? "default" : "secondary"}
                      className={contract.status === "Active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {contract.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewContractsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showContractDetailsModal} onOpenChange={setShowContractDetailsModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contract Details - {selectedContract?.name}</DialogTitle>
            <DialogDescription>Complete contract information and metrics</DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Contract Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">ID:</span> {selectedContract.id}
                    </div>
                    <div>
                      <span className="text-gray-500">Value:</span> {selectedContract.value}
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span> {selectedContract.status}
                    </div>
                    <div>
                      <span className="text-gray-500">Start Date:</span> {selectedContract.startDate}
                    </div>
                    <div>
                      <span className="text-gray-500">Deadline:</span> {selectedContract.deadline}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Compliance Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Section 3 Target:</span> {selectedContract.section3Target}%
                    </div>
                    <div>
                      <span className="text-gray-500">Current Compliance:</span> {selectedContract.currentCompliance}%
                    </div>
                    <div>
                      <span className="text-gray-500">Progress:</span> {selectedContract.progress}%
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-gray-600">{selectedContract.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Progress Overview</h3>
                <Progress value={selectedContract.progress} className="mb-2" />
                <p className="text-sm text-gray-600">{selectedContract.progress}% complete</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContractDetailsModal(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownloadContract(selectedContract)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditContractModal} onOpenChange={setShowEditContractModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contract - {selectedContract?.name}</DialogTitle>
            <DialogDescription>Update contract details and information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contract Name</label>
              <Input
                placeholder="Enter contract name"
                value={newContractData.name}
                onChange={(e) => setNewContractData({ ...newContractData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contract Value</label>
                <Input
                  placeholder="$0.00"
                  value={newContractData.value}
                  onChange={(e) => setNewContractData({ ...newContractData, value: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section 3 Target (%)</label>
                <Select
                  value={newContractData.section3Target}
                  onValueChange={(value) => setNewContractData({ ...newContractData, section3Target: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="30">30%</SelectItem>
                    <SelectItem value="35">35%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={newContractData.startDate}
                  onChange={(e) => setNewContractData({ ...newContractData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="date"
                  value={newContractData.endDate}
                  onChange={(e) => setNewContractData({ ...newContractData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Enter contract description"
                value={newContractData.description}
                onChange={(e) => setNewContractData({ ...newContractData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditContractModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveContract}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} userRole="contractor" />
    </div>
  )
}
