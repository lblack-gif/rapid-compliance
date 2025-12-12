"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Building2,
} from "lucide-react"

export function AmendmentsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showCreateAmendmentModal, setShowCreateAmendmentModal] = useState(false)
  const [showAmendmentDetailsModal, setShowAmendmentDetailsModal] = useState(false)
  const [selectedAmendment, setSelectedAmendment] = useState(null)
  const [newAmendment, setNewAmendment] = useState({
    title: "",
    contract: "",
    type: "",
    reason: "",
    description: "",
    valueChange: "",
    timeChange: "",
  })

  const amendments = [
    {
      id: "AMD-2024-001",
      title: "Scope Extension - Additional Electrical Work",
      contract: "Senior Housing Development - Metro Contractors",
      type: "Scope Change",
      status: "Pending Approval",
      submittedDate: "2024-01-15",
      approvalDate: null,
      originalValue: 125000,
      amendedValue: 145000,
      valueChange: 20000,
      originalEndDate: "2024-03-15",
      amendedEndDate: "2024-04-15",
      timeChange: 30,
      reason: "Additional electrical outlets required per updated building codes",
      description: "Extension of electrical work to include 25 additional outlets and upgraded panel capacity",
      submittedBy: "John Smith - Metro Contractors",
      reviewedBy: null,
      priority: "Medium",
    },
    {
      id: "AMD-2024-002",
      title: "Material Substitution - Plumbing Fixtures",
      contract: "Affordable Housing Phase 1 - ABC Construction",
      type: "Material Change",
      status: "Approved",
      submittedDate: "2024-01-10",
      approvalDate: "2024-01-18",
      originalValue: 89000,
      amendedValue: 92000,
      valueChange: 3000,
      originalEndDate: "2024-04-30",
      amendedEndDate: "2024-04-30",
      timeChange: 0,
      reason: "Original fixtures discontinued, upgraded alternative selected",
      description: "Substitution of plumbing fixtures with energy-efficient alternatives",
      submittedBy: "Sarah Johnson - ABC Construction",
      reviewedBy: "Mike Davis - DCHA",
      priority: "Low",
    },
    {
      id: "AMD-2024-003",
      title: "Schedule Adjustment - Weather Delays",
      contract: "Community Center Renovation - Urban Builders",
      type: "Schedule Change",
      status: "Under Review",
      submittedDate: "2024-01-20",
      approvalDate: null,
      originalValue: 67500,
      amendedValue: 67500,
      valueChange: 0,
      originalEndDate: "2024-01-31",
      amendedEndDate: "2024-02-28",
      timeChange: 28,
      reason: "Severe weather conditions prevented outdoor work for 3 weeks",
      description: "Extension of completion date due to weather-related delays",
      submittedBy: "Robert Wilson - Urban Builders",
      reviewedBy: "Lisa Chen - DCHA",
      priority: "High",
    },
    {
      id: "AMD-2024-004",
      title: "Cost Reduction - Value Engineering",
      contract: "Public Housing Modernization - Capital Development",
      type: "Cost Change",
      status: "Rejected",
      submittedDate: "2024-01-05",
      approvalDate: "2024-01-12",
      originalValue: 156000,
      amendedValue: 142000,
      valueChange: -14000,
      originalEndDate: "2024-06-30",
      amendedEndDate: "2024-06-30",
      timeChange: 0,
      reason: "Value engineering proposal to reduce costs while maintaining quality",
      description: "Alternative construction methods and materials to achieve cost savings",
      submittedBy: "David Brown - Capital Development",
      reviewedBy: "Jennifer Lee - DCHA",
      priority: "Medium",
    },
  ]

  const handleCreateAmendment = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Amendment "${newAmendment.title}" submitted successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setNewAmendment({
        title: "",
        contract: "",
        type: "",
        reason: "",
        description: "",
        valueChange: "",
        timeChange: "",
      })
      setShowCreateAmendmentModal(false)
    } catch (error) {
      console.error("Error creating amendment:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "Pending Approval":
        return <Badge className="bg-orange-100 text-orange-800">Pending Approval</Badge>
      case "Under Review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredAmendments = amendments.filter((amendment) => {
    if (activeTab !== "all" && amendment.status.toLowerCase().replace(" ", "-") !== activeTab) return false
    if (filterType !== "all" && amendment.type !== filterType) return false
    if (
      searchTerm &&
      !amendment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !amendment.contract.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  const totalAmendments = amendments.length
  const pendingAmendments = amendments.filter((a) => a.status === "Pending Approval").length
  const approvedAmendments = amendments.filter((a) => a.status === "Approved").length
  const totalValueChange = amendments.reduce((sum, a) => sum + a.valueChange, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contract Amendments</h1>
          <p className="text-gray-600">Manage contract modifications, scope changes, and approvals</p>
        </div>
        <Button
          onClick={() => setShowCreateAmendmentModal(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Amendment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amendments</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAmendments}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingAmendments}</div>
            <p className="text-xs text-gray-500">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedAmendments}</div>
            <p className="text-xs text-gray-500">Successfully processed</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalValueChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalValueChange >= 0 ? "+" : ""}
              {formatCurrency(totalValueChange)}
            </div>
            <p className="text-xs text-gray-500">Net change</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search amendments or contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Scope Change">Scope Change</SelectItem>
              <SelectItem value="Material Change">Material Change</SelectItem>
              <SelectItem value="Schedule Change">Schedule Change</SelectItem>
              <SelectItem value="Cost Change">Cost Change</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Amendments Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending-approval">Pending ({pendingAmendments})</TabsTrigger>
          <TabsTrigger value="under-review">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedAmendments})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All Amendments</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredAmendments.map((amendment) => (
              <Card key={amendment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{amendment.title}</h3>
                        {getStatusBadge(amendment.status)}
                        {getPriorityBadge(amendment.priority)}
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <Building2 className="inline h-4 w-4 mr-1" />
                        {amendment.contract}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          <span>{amendment.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Submitted: {amendment.submittedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4" />
                          <span className={amendment.valueChange >= 0 ? "text-green-600" : "text-red-600"}>
                            {amendment.valueChange >= 0 ? "+" : ""}
                            {formatCurrency(amendment.valueChange)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{amendment.timeChange} days</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">Reason:</div>
                        <p className="text-sm text-gray-600">{amendment.reason}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Submitted by:</span> {amendment.submittedBy}
                        </div>
                        {amendment.reviewedBy && (
                          <div>
                            <span className="font-medium">Reviewed by:</span> {amendment.reviewedBy}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAmendment(amendment)
                          setShowAmendmentDetailsModal(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Amendment Modal */}
      <Dialog open={showCreateAmendmentModal} onOpenChange={setShowCreateAmendmentModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Amendment</DialogTitle>
            <DialogDescription>Submit a new contract amendment for review</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amendment Title</label>
              <Input
                placeholder="Enter amendment title"
                value={newAmendment.title}
                onChange={(e) => setNewAmendment({ ...newAmendment, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contract</label>
                <Select
                  value={newAmendment.contract}
                  onValueChange={(value) => setNewAmendment({ ...newAmendment, contract: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senior-housing">Senior Housing Development - Metro Contractors</SelectItem>
                    <SelectItem value="affordable-housing">Affordable Housing Phase 1 - ABC Construction</SelectItem>
                    <SelectItem value="community-center">Community Center Renovation - Urban Builders</SelectItem>
                    <SelectItem value="public-housing">Public Housing Modernization - Capital Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amendment Type</label>
                <Select
                  value={newAmendment.type}
                  onValueChange={(value) => setNewAmendment({ ...newAmendment, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scope">Scope Change</SelectItem>
                    <SelectItem value="material">Material Change</SelectItem>
                    <SelectItem value="schedule">Schedule Change</SelectItem>
                    <SelectItem value="cost">Cost Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Value Change ($)</label>
                <Input
                  type="number"
                  placeholder="Enter value change (+ or -)"
                  value={newAmendment.valueChange}
                  onChange={(e) => setNewAmendment({ ...newAmendment, valueChange: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time Change (days)</label>
                <Input
                  type="number"
                  placeholder="Enter time change (+ or -)"
                  value={newAmendment.timeChange}
                  onChange={(e) => setNewAmendment({ ...newAmendment, timeChange: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reason for Amendment</label>
              <Textarea
                placeholder="Enter the reason for this amendment"
                value={newAmendment.reason}
                onChange={(e) => setNewAmendment({ ...newAmendment, reason: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              <Textarea
                placeholder="Provide detailed description of the amendment"
                value={newAmendment.description}
                onChange={(e) => setNewAmendment({ ...newAmendment, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateAmendmentModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateAmendment}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Submit Amendment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Amendment Details Modal */}
      <Dialog open={showAmendmentDetailsModal} onOpenChange={setShowAmendmentDetailsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Amendment Details</DialogTitle>
            <DialogDescription>
              {selectedAmendment && `Viewing details for ${selectedAmendment.title}`}
            </DialogDescription>
          </DialogHeader>
          {selectedAmendment && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Amendment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amendment ID:</span>
                      <span className="font-medium">{selectedAmendment.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedAmendment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getStatusBadge(selectedAmendment.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      {getPriorityBadge(selectedAmendment.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">{selectedAmendment.submittedDate}</span>
                    </div>
                    {selectedAmendment.approvalDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Approved:</span>
                        <span className="font-medium">{selectedAmendment.approvalDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Financial Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Value:</span>
                      <span className="font-medium">{formatCurrency(selectedAmendment.originalValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amended Value:</span>
                      <span className="font-medium">{formatCurrency(selectedAmendment.amendedValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value Change:</span>
                      <span
                        className={`font-medium ${selectedAmendment.valueChange >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {selectedAmendment.valueChange >= 0 ? "+" : ""}
                        {formatCurrency(selectedAmendment.valueChange)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Change:</span>
                      <span className="font-medium">{selectedAmendment.timeChange} days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Contract Information</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedAmendment.contract}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Reason for Amendment</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedAmendment.reason}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Detailed Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedAmendment.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-3">Submitted By</h4>
                  <p className="text-sm text-gray-600">{selectedAmendment.submittedBy}</p>
                </div>
                {selectedAmendment.reviewedBy && (
                  <div>
                    <h4 className="font-semibold mb-3">Reviewed By</h4>
                    <p className="text-sm text-gray-600">{selectedAmendment.reviewedBy}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAmendmentDetailsModal(false)}>
              Close
            </Button>
            {selectedAmendment?.status === "Pending Approval" && (
              <>
                <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                  Reject
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
