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
  Calendar,
  DollarSign,
  Building2,
  Users,
  Clock,
  MapPin,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  FileText,
  CheckCircle,
  TrendingUp,
} from "lucide-react"

export function JobOrdersPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCreateJobOrderModal, setShowCreateJobOrderModal] = useState(false)
  const [showJobOrderDetailsModal, setShowJobOrderDetailsModal] = useState(false)
  const [selectedJobOrder, setSelectedJobOrder] = useState(null)
  const [newJobOrder, setNewJobOrder] = useState({
    title: "",
    contractor: "",
    project: "",
    value: "",
    startDate: "",
    endDate: "",
    description: "",
    priority: "medium",
  })

  const jobOrders = [
    {
      id: "JO-2024-001",
      title: "Electrical Installation - Phase 1",
      contractor: "Metro Contractors",
      project: "Senior Housing Development",
      value: 125000,
      status: "Active",
      priority: "High",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      progress: 65,
      section3Workers: 8,
      totalWorkers: 12,
      location: "Ward 7, DC",
      description: "Complete electrical installation for Phase 1 of senior housing development",
    },
    {
      id: "JO-2024-002",
      title: "Plumbing Systems Installation",
      contractor: "ABC Construction",
      project: "Affordable Housing Phase 1",
      value: 89000,
      status: "Active",
      priority: "Medium",
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      progress: 42,
      section3Workers: 6,
      totalWorkers: 10,
      location: "Ward 8, DC",
      description: "Installation of complete plumbing systems including fixtures and connections",
    },
    {
      id: "JO-2024-003",
      title: "HVAC System Upgrade",
      contractor: "Urban Builders",
      project: "Community Center Renovation",
      value: 67500,
      status: "Completed",
      priority: "Low",
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      progress: 100,
      section3Workers: 4,
      totalWorkers: 6,
      location: "Ward 5, DC",
      description: "Complete HVAC system upgrade and modernization",
    },
    {
      id: "JO-2024-004",
      title: "Roofing and Waterproofing",
      contractor: "Capital Development",
      project: "Public Housing Modernization",
      value: 156000,
      status: "Pending",
      priority: "High",
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      progress: 0,
      section3Workers: 0,
      totalWorkers: 0,
      location: "Ward 6, DC",
      description: "Complete roof replacement and waterproofing system installation",
    },
  ]

  const handleCreateJobOrder = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `Job Order "${newJobOrder.title}" created successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)

      setNewJobOrder({
        title: "",
        contractor: "",
        project: "",
        value: "",
        startDate: "",
        endDate: "",
        description: "",
        priority: "medium",
      })
      setShowCreateJobOrderModal(false)
    } catch (error) {
      console.error("Error creating job order:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "Pending":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
      case "On Hold":
        return <Badge className="bg-gray-100 text-gray-800">On Hold</Badge>
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

  const filteredJobOrders = jobOrders.filter((jobOrder) => {
    if (activeTab !== "all" && jobOrder.status.toLowerCase() !== activeTab) return false
    if (filterStatus !== "all" && jobOrder.status !== filterStatus) return false
    if (
      searchTerm &&
      !jobOrder.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !jobOrder.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  const totalValue = jobOrders.reduce((sum, jo) => sum + jo.value, 0)
  const activeJobOrders = jobOrders.filter((jo) => jo.status === "Active").length
  const completedJobOrders = jobOrders.filter((jo) => jo.status === "Completed").length
  const avgProgress = jobOrders.reduce((sum, jo) => sum + jo.progress, 0) / jobOrders.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Job Orders</h1>
          <p className="text-gray-600">Manage and track construction job orders and work assignments</p>
        </div>
        <Button
          onClick={() => setShowCreateJobOrderModal(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Job Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-gray-500">All job orders</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeJobOrders}</div>
            <p className="text-xs text-gray-500">Currently in progress</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{completedJobOrders}</div>
            <p className="text-xs text-gray-500">Successfully finished</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{avgProgress.toFixed(1)}%</div>
            <p className="text-xs text-gray-500">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search job orders or contractors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Orders Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeJobOrders})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedJobOrders})</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredJobOrders.map((jobOrder) => (
              <Card key={jobOrder.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{jobOrder.title}</h3>
                        {getStatusBadge(jobOrder.status)}
                        {getPriorityBadge(jobOrder.priority)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{jobOrder.contractor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          <span>{jobOrder.project}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{formatCurrency(jobOrder.value)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{jobOrder.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {jobOrder.startDate} - {jobOrder.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>
                            {jobOrder.section3Workers}/{jobOrder.totalWorkers} Section 3
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4" />
                          <span>{jobOrder.progress}% Complete</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>ID: {jobOrder.id}</span>
                        </div>
                      </div>

                      {jobOrder.status === "Active" && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{jobOrder.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${jobOrder.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 mb-4">{jobOrder.description}</p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedJobOrder(jobOrder)
                          setShowJobOrderDetailsModal(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Job Order Modal */}
      <Dialog open={showCreateJobOrderModal} onOpenChange={setShowCreateJobOrderModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Job Order</DialogTitle>
            <DialogDescription>Create a new job order for construction work</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <Input
                placeholder="Enter job title"
                value={newJobOrder.title}
                onChange={(e) => setNewJobOrder({ ...newJobOrder, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contractor</label>
              <Select
                value={newJobOrder.contractor}
                onValueChange={(value) => setNewJobOrder({ ...newJobOrder, contractor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contractor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metro">Metro Contractors</SelectItem>
                  <SelectItem value="abc">ABC Construction</SelectItem>
                  <SelectItem value="urban">Urban Builders</SelectItem>
                  <SelectItem value="capital">Capital Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project</label>
              <Select
                value={newJobOrder.project}
                onValueChange={(value) => setNewJobOrder({ ...newJobOrder, project: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senior-housing">Senior Housing Development</SelectItem>
                  <SelectItem value="affordable-housing">Affordable Housing Phase 1</SelectItem>
                  <SelectItem value="community-center">Community Center Renovation</SelectItem>
                  <SelectItem value="public-housing">Public Housing Modernization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contract Value</label>
              <Input
                type="number"
                placeholder="Enter contract value"
                value={newJobOrder.value}
                onChange={(e) => setNewJobOrder({ ...newJobOrder, value: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select
                value={newJobOrder.priority}
                onValueChange={(value) => setNewJobOrder({ ...newJobOrder, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <Input
                type="date"
                value={newJobOrder.startDate}
                onChange={(e) => setNewJobOrder({ ...newJobOrder, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <Input
                type="date"
                value={newJobOrder.endDate}
                onChange={(e) => setNewJobOrder({ ...newJobOrder, endDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              placeholder="Enter job description"
              value={newJobOrder.description}
              onChange={(e) => setNewJobOrder({ ...newJobOrder, description: e.target.value })}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateJobOrderModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateJobOrder}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Create Job Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Order Details Modal */}
      <Dialog open={showJobOrderDetailsModal} onOpenChange={setShowJobOrderDetailsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Job Order Details</DialogTitle>
            <DialogDescription>{selectedJobOrder && `Viewing details for ${selectedJobOrder.title}`}</DialogDescription>
          </DialogHeader>
          {selectedJobOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Order ID:</span>
                      <span className="font-medium">{selectedJobOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getStatusBadge(selectedJobOrder.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      {getPriorityBadge(selectedJobOrder.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contract Value:</span>
                      <span className="font-medium">{formatCurrency(selectedJobOrder.value)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{selectedJobOrder.progress}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contractor:</span>
                      <span className="font-medium">{selectedJobOrder.contractor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Project:</span>
                      <span className="font-medium">{selectedJobOrder.project}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedJobOrder.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{selectedJobOrder.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-medium">{selectedJobOrder.endDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Worker Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedJobOrder.section3Workers}</div>
                    <div className="text-sm text-green-700">Section 3 Workers</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedJobOrder.totalWorkers}</div>
                    <div className="text-sm text-blue-700">Total Workers</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedJobOrder.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobOrderDetailsModal(false)}>
              Close
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Job Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
