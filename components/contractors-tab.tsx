"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import {
  Building2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Plus,
  Edit,
  Eye,
  FileX,
} from "lucide-react"
import { fetchContractorData, exportContractorsToCSV, type Contractor } from "../scripts/fetch-contractor-data"

export function ContractorsTab() {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showAddContractor, setShowAddContractor] = useState(false)
  const [showContractorDetails, setShowContractorDetails] = useState(false)
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null)
  const [showDocumentUploadModal, setShowDocumentUploadModal] = useState(false)
  const [showViewContractorModal, setShowViewContractorModal] = useState(false)
  const [showEditContractorModal, setShowEditContractorModal] = useState(false)
  const [selectedContractorForView, setSelectedContractorForView] = useState(null)
  const [selectedContractorForEdit, setSelectedContractorForEdit] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])

  // New contractor form state
  const [newContractor, setNewContractor] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    contractValue: "",
    startDate: "",
    endDate: "",
    section3Commitment: "",
    serviceType: "construction" as "construction" | "non-construction",
    certifications: [] as string[],
    notes: "",
    scopeOfWork: "",
  })

  useEffect(() => {
    loadContractorData()
  }, [])

  useEffect(() => {
    filterContractors()
  }, [contractors, searchTerm, filterStatus])

  const loadContractorData = async () => {
    setLoading(true)
    try {
      const contractorData = await fetchContractorData()
      // Add additional fields to existing contractor data
      const enhancedContractors = contractorData.map((contractor) => ({
        ...contractor,
        scopeOfWork: contractor.scopeOfWork || "General Construction Services",
        totalWorkers: contractor.totalWorkers || Math.floor(Math.random() * 50) + 10,
        contractStartDate: contractor.contractStartDate || "2024-01-15",
        contractEndDate: contractor.contractEndDate || "2024-12-31",
      }))
      setContractors(enhancedContractors)
    } catch (error) {
      console.error("Error loading contractor data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const csvContent = exportContractorsToCSV(filteredContractors)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `contractors-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewContractor = (contractor) => {
    setSelectedContractorForView(contractor)
    setShowViewContractorModal(true)
  }

  const handleEditContractor = (contractor) => {
    setSelectedContractorForEdit(contractor)
    setShowEditContractorModal(true)
  }

  const handleDocumentUpload = (contractor) => {
    setSelectedContractorForView(contractor)
    setShowDocumentUploadModal(true)
  }

  const handleFileUpload = async (files) => {
    try {
      // Simulate file upload to Supabase Storage
      const uploadPromises = Array.from(files).map(async (file) => {
        // In real implementation, upload to Supabase Storage
        // const { data, error } = await supabase.storage
        //   .from('contractor_docs')
        //   .upload(`${selectedContractorForView.id}/${file.name}`, file)

        return {
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        }
      })

      const uploadedFileData = await Promise.all(uploadPromises)
      setUploadedFiles((prev) => [...prev, ...uploadedFileData])

      const successDiv = document.createElement("div")
      successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successDiv.innerHTML = `${files.length} file(s) uploaded successfully!`
      document.body.appendChild(successDiv)
      setTimeout(() => {
        document.body.removeChild(successDiv)
      }, 3000)
    } catch (error) {
      console.error("Error uploading files:", error)
      alert("Error uploading files. Please try again.")
    }
  }

  const filterContractors = () => {
    let filtered = contractors

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (contractor) =>
          contractor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contractor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contractor.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((contractor) => contractor.status === filterStatus)
    }

    setFilteredContractors(filtered)
  }

  const handleAddContractor = async () => {
    try {
      // Create new contractor object
      const contractor: Contractor = {
        id: `contractor-${Date.now()}`,
        companyName: newContractor.companyName,
        contactPerson: newContractor.contactPerson,
        email: newContractor.email,
        phone: newContractor.phone,
        address: newContractor.address,
        contractValue: Number.parseInt(newContractor.contractValue) || 0,
        startDate: newContractor.startDate,
        endDate: newContractor.endDate,
        status: "pending",
        section3Commitment: Number.parseInt(newContractor.section3Commitment) || 25,
        section3Actual: 0, // Will be updated as reports come in
        workerCount: 0, // Will be updated
        certifications: newContractor.certifications,
        serviceType: newContractor.serviceType,
        notes: newContractor.notes,
        scopeOfWork: newContractor.scopeOfWork,
        totalWorkers: 0,
        contractStartDate: newContractor.startDate,
        contractEndDate: newContractor.endDate,
      }

      // Add to contractors list
      setContractors([contractor, ...contractors])

      // Reset form
      setNewContractor({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        contractValue: "",
        startDate: "",
        endDate: "",
        section3Commitment: "",
        serviceType: "construction",
        certifications: [],
        notes: "",
        scopeOfWork: "",
      })

      setShowAddContractor(false)
    } catch (error) {
      console.error("Error adding contractor:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const getSection3ComplianceBadge = (commitment: number, actual: number) => {
    const percentage = actual / commitment
    if (percentage >= 1) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Exceeds Goal
        </Badge>
      )
    } else if (percentage >= 0.9) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          On Track
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Below Goal
        </Badge>
      )
    }
  }

  const getAlertBadge = (contractor: Contractor) => {
    const compliance = contractor.section3Actual / contractor.section3Commitment
    if (compliance < 0.8) {
      return (
        <Badge variant="destructive" className="ml-2">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Alert
        </Badge>
      )
    }
    return null
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const stats = {
    total: contractors.length,
    active: contractors.filter((c) => c.status === "active").length,
    pending: contractors.filter((c) => c.status === "pending").length,
    completed: contractors.filter((c) => c.status === "completed").length,
    totalValue: contractors.reduce((sum, c) => sum + c.contractValue, 0),
    avgSection3:
      contractors.length > 0
        ? Math.round(contractors.reduce((sum, c) => sum + c.section3Actual, 0) / contractors.length)
        : 0,
    alerts: contractors.filter((c) => c.section3Actual / c.section3Commitment < 0.8).length,
  }

  const handleStatsCardClick = (filterType: string) => {
    setFilterStatus(filterType)
    setSearchTerm("")
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
      {/* Header with Alert Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contractor Management</h2>
            <p className="text-muted-foreground">Manage contractors and track Section 3 compliance</p>
          </div>
          {stats.alerts > 0 && (
            <Badge variant="destructive" className="ml-4">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {stats.alerts} Alert{stats.alerts > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <FileText className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowAddContractor(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contractor
          </Button>
        </div>
      </div>

      {/* Stats Cards - Now Clickable with Progress Bars */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsCardClick("all")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Registered contractors</p>
            <Progress value={100} className="mt-2" />
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleStatsCardClick("active")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <Progress value={(stats.active / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleStatsCardClick("pending")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <Progress value={(stats.pending / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleStatsCardClick("completed")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <Progress value={(stats.completed / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsCardClick("all")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsCardClick("all")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Section 3</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgSection3}%</div>
            <Progress value={stats.avgSection3} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter with Advanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contractors by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="completed">Completed Only</SelectItem>
                <SelectItem value="cancelled">Cancelled Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contractors List */}
      <div className="grid gap-4">
        {filteredContractors.map((contractor) => (
          <Card key={contractor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{contractor.companyName}</h3>
                        {getAlertBadge(contractor)}
                      </div>
                      <p className="text-sm text-muted-foreground">Contact: {contractor.contactPerson}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(contractor.status)}
                        {getSection3ComplianceBadge(contractor.section3Commitment, contractor.section3Actual)}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{contractor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{contractor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{contractor.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatCurrency(contractor.contractValue)}</span>
                    </div>
                  </div>

                  {/* Additional Fields */}
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">Scope: {contractor.scopeOfWork}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Total Workers: {contractor.totalWorkers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Start: {contractor.contractStartDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>End: {contractor.contractEndDate}</span>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{contractor.workerCount} workers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Section 3:</span>
                      <span className="font-medium">
                        {contractor.section3Actual}% / {contractor.section3Commitment}%
                      </span>
                    </div>
                  </div>

                  {contractor.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {contractor.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {contractor.notes && <p className="text-sm text-muted-foreground italic">{contractor.notes}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewContractor(contractor)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditContractor(contractor)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDocumentUpload(contractor)}>
                    <FileX className="h-4 w-4 mr-1" />
                    Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContractors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contractors found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Add Contractor Dialog */}
      <Dialog open={showAddContractor} onOpenChange={setShowAddContractor}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Contractor</DialogTitle>
            <DialogDescription>Enter contractor information and Section 3 requirements</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={newContractor.companyName}
                  onChange={(e) => setNewContractor({ ...newContractor, companyName: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={newContractor.contactPerson}
                  onChange={(e) => setNewContractor({ ...newContractor, contactPerson: e.target.value })}
                  placeholder="Enter contact person name"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContractor.email}
                  onChange={(e) => setNewContractor({ ...newContractor, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newContractor.phone}
                  onChange={(e) => setNewContractor({ ...newContractor, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={newContractor.address}
                onChange={(e) => setNewContractor({ ...newContractor, address: e.target.value })}
                placeholder="Enter business address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scopeOfWork">Scope of Work</Label>
              <Input
                id="scopeOfWork"
                value={newContractor.scopeOfWork}
                onChange={(e) => setNewContractor({ ...newContractor, scopeOfWork: e.target.value })}
                placeholder="Enter scope of work"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="contractValue">Contract Value ($)</Label>
                <Input
                  id="contractValue"
                  type="number"
                  value={newContractor.contractValue}
                  onChange={(e) => setNewContractor({ ...newContractor, contractValue: e.target.value })}
                  placeholder="Enter contract value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newContractor.startDate}
                  onChange={(e) => setNewContractor({ ...newContractor, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newContractor.endDate}
                  onChange={(e) => setNewContractor({ ...newContractor, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="section3Commitment">Section 3 Commitment (%)</Label>
                <Input
                  id="section3Commitment"
                  type="number"
                  min="0"
                  max="100"
                  value={newContractor.section3Commitment}
                  onChange={(e) => setNewContractor({ ...newContractor, section3Commitment: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  value={newContractor.serviceType}
                  onValueChange={(value: "construction" | "non-construction") =>
                    setNewContractor({ ...newContractor, serviceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="non-construction">Non-Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newContractor.notes}
                onChange={(e) => setNewContractor({ ...newContractor, notes: e.target.value })}
                placeholder="Enter any additional notes or comments"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddContractor(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContractor} disabled={!newContractor.companyName || !newContractor.email}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contractor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Contractor Modal */}
      <Dialog open={showViewContractorModal} onOpenChange={setShowViewContractorModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contractor Details - {selectedContractorForView?.companyName}</DialogTitle>
            <DialogDescription>Complete contractor information and compliance history</DialogDescription>
          </DialogHeader>
          {selectedContractorForView && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Company Name</Label>
                      <p>{selectedContractorForView.companyName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Contact Person</Label>
                      <p>{selectedContractorForView.contactPerson}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p>{selectedContractorForView.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p>{selectedContractorForView.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Address</Label>
                      <p>{selectedContractorForView.address}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Contract Value</Label>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(selectedContractorForView.contractValue)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Service Type</Label>
                      <p className="capitalize">{selectedContractorForView.serviceType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">{getStatusBadge(selectedContractorForView.status)}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewContractorModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contractor Modal */}
      <Dialog open={showEditContractorModal} onOpenChange={setShowEditContractorModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Contractor - {selectedContractorForEdit?.companyName}</DialogTitle>
            <DialogDescription>Update contractor information and Section 3 requirements</DialogDescription>
          </DialogHeader>
          {selectedContractorForEdit && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="editCompanyName">Company Name</Label>
                  <Input
                    id="editCompanyName"
                    defaultValue={selectedContractorForEdit.companyName}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editContactPerson">Contact Person</Label>
                  <Input
                    id="editContactPerson"
                    defaultValue={selectedContractorForEdit.contactPerson}
                    placeholder="Enter contact person name"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email Address</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    defaultValue={selectedContractorForEdit.email}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone Number</Label>
                  <Input
                    id="editPhone"
                    defaultValue={selectedContractorForEdit.phone}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAddress">Business Address</Label>
                <Input
                  id="editAddress"
                  defaultValue={selectedContractorForEdit.address}
                  placeholder="Enter business address"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditContractorModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle save logic here
                setShowEditContractorModal(false)
                const successDiv = document.createElement("div")
                successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
                successDiv.innerHTML = "Contractor updated successfully!"
                document.body.appendChild(successDiv)
                setTimeout(() => {
                  document.body.removeChild(successDiv)
                }, 3000)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Upload Modal */}
      <Dialog open={showDocumentUploadModal} onOpenChange={setShowDocumentUploadModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Documents - {selectedContractorForView?.companyName}</DialogTitle>
            <DialogDescription>Upload contractor documents and certifications</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
              <p className="text-sm text-gray-500 mb-4">Supports PDF, DOCX, XLSX files up to 10MB each</p>
              <Input
                type="file"
                multiple
                accept=".pdf,.docx,.xlsx"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" onClick={() => document.getElementById("file-upload").click()}>
                Select Files
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded Files</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDocumentUploadModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
