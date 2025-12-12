"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  UserPlus,
  Edit,
  Save,
  X,
  Download,
  Upload,
  FileText,
} from "lucide-react"
import {
  fetchWorkerData,
  updateWorker,
  addWorker,
  exportWorkersToCSV,
  parseCSVToWorkers,
  type Worker,
} from "@/scripts/fetch-worker-data"
import { HUD4736DForm, type Form4736DData } from "@/components/forms/hud-4736d-form"

const handleSubmitCertification = async (formData: Form4736DData) => {
  // Placeholder for certification submission logic
  console.log("Certification form submitted with data:", formData)
}

export function WorkersTab() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [showWorkerDetails, setShowWorkerDetails] = useState(false)
  const [showCertificationForm, setShowCertificationForm] = useState(false)
  const [showAddWorker, setShowAddWorker] = useState(false)
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null)
  const [saving, setSaving] = useState(false)
  const [importing, setImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newWorker, setNewWorker] = useState<Omit<Worker, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skills: "",
    isSection3: false,
    isTargeted: false,
    verificationStatus: "pending",
    hourlyRate: "",
    address: "",
    hireDate: new Date().toISOString().split("T")[0],
    availability: "full-time",
    certifications: "",
    emergencyContact: "",
    emergencyPhone: "",
    socialSecurityNumber: "",
    dateOfBirth: "",
    workExperience: "",
    education: "",
    notes: "",
  })

  useEffect(() => {
    loadWorkerData()
  }, [])

  useEffect(() => {
    filterWorkers()
  }, [workers, searchTerm, filterStatus])

  const loadWorkerData = async () => {
    try {
      const data = await fetchWorkerData()
      setWorkers(data)
    } catch (error) {
      console.error("Error loading worker data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterWorkers = () => {
    let filtered = workers

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (worker) =>
          `${worker.firstName} ${worker.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.skills.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((worker) => {
        switch (filterStatus) {
          case "section3":
            return worker.isSection3
          case "targeted":
            return worker.isTargeted
          case "verified":
            return worker.verificationStatus === "verified"
          case "pending":
            return worker.verificationStatus === "pending"
          default:
            return true
        }
      })
    }

    setFilteredWorkers(filtered)
  }

  const handleViewDetails = (worker: Worker) => {
    setSelectedWorker(worker)
    setEditingWorker({ ...worker })
    setShowWorkerDetails(true)
  }

  const handleSaveWorker = async () => {
    if (!editingWorker) return

    setSaving(true)
    try {
      const updatedWorker = await updateWorker(editingWorker.id, editingWorker)
      setWorkers(workers.map((w) => (w.id === updatedWorker.id ? updatedWorker : w)))
      setSelectedWorker(updatedWorker)
      setShowWorkerDetails(false)
    } catch (error) {
      console.error("Error updating worker:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleAddWorker = async () => {
    setSaving(true)
    try {
      const addedWorker = await addWorker(newWorker)
      setWorkers([addedWorker, ...workers])
      setShowAddWorker(false)
      setNewWorker({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skills: "",
        isSection3: false,
        isTargeted: false,
        verificationStatus: "pending",
        hourlyRate: "",
        address: "",
        hireDate: new Date().toISOString().split("T")[0],
        availability: "full-time",
        certifications: "",
        emergencyContact: "",
        emergencyPhone: "",
        socialSecurityNumber: "",
        dateOfBirth: "",
        workExperience: "",
        education: "",
        notes: "",
      })
    } catch (error) {
      console.error("Error adding worker:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleStatsCardClick = (filterType: string) => {
    setFilterStatus(filterType)
    setSearchTerm("")
  }

  const handleExportCSV = () => {
    const csvContent = exportWorkersToCSV(workers)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `workers-export-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportCSV = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    try {
      const text = await file.text()
      const importedWorkers = parseCSVToWorkers(text)

      // Add imported workers to existing workers
      const newWorkers = []
      for (const workerData of importedWorkers) {
        const addedWorker = await addWorker(workerData)
        newWorkers.push(addedWorker)
      }

      setWorkers([...workers, ...newWorkers])

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      alert(`Successfully imported ${newWorkers.length} workers!`)
    } catch (error) {
      console.error("Error importing CSV:", error)
      alert("Error importing CSV file. Please check the format and try again.")
    } finally {
      setImporting(false)
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
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

  const getWorkerTypeBadge = (worker: Worker) => {
    if (worker.isTargeted) {
      return (
        <Badge variant="default" className="bg-purple-100 text-purple-800">
          Targeted Section 3
        </Badge>
      )
    } else if (worker.isSection3) {
      return <Badge variant="secondary">Section 3</Badge>
    }
    return <Badge variant="outline">Regular</Badge>
  }

  const stats = {
    total: workers.length,
    section3: workers.filter((w) => w.isSection3).length,
    targeted: workers.filter((w) => w.isTargeted).length,
    verified: workers.filter((w) => w.verificationStatus === "verified").length,
    pending: workers.filter((w) => w.verificationStatus === "pending").length,
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
          <h2 className="text-2xl font-bold tracking-tight">Worker Management</h2>
          <p className="text-muted-foreground">Manage Section 3 workers and track compliance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportCSV} disabled={importing}>
            <Upload className="h-4 w-4 mr-2" />
            {importing ? "Importing..." : "Import CSV"}
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowAddWorker(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Worker
          </Button>
        </div>
      </div>

      {/* Hidden file input for CSV import */}
      <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} style={{ display: "none" }} />

      {/* Stats Cards - Now Clickable */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStatsCardClick("all")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Active workforce</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleStatsCardClick("section3")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 3</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.section3}</div>
            <Progress value={(stats.section3 / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleStatsCardClick("targeted")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Targeted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.targeted}</div>
            <Progress value={(stats.targeted / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleStatsCardClick("verified")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
            <Progress value={(stats.verified / stats.total) * 100} className="mt-2" />
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
            <p className="text-xs text-muted-foreground">Need verification</p>
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
                placeholder="Search workers by name, email, or skills..."
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
                <SelectItem value="all">All Workers</SelectItem>
                <SelectItem value="section3">Section 3 Only</SelectItem>
                <SelectItem value="targeted">Targeted Section 3</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="pending">Pending Verification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workers List */}
      <div className="grid gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {worker.firstName} {worker.lastName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getWorkerTypeBadge(worker)}
                        {getVerificationBadge(worker.verificationStatus)}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                    {worker.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{worker.email}</span>
                      </div>
                    )}
                    {worker.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{worker.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${worker.hourlyRate}/hr</span>
                    </div>
                  </div>

                  {worker.skills && (
                    <div className="flex flex-wrap gap-1">
                      {worker.skills
                        .split(",")
                        .slice(0, 3)
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill.trim()}
                          </Badge>
                        ))}
                      {worker.skills.split(",").length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{worker.skills.split(",").length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(worker)}>
                    View Details
                  </Button>
                  {worker.verificationStatus === "pending" && (
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No workers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Worker Details Dialog */}
      <Dialog open={showWorkerDetails} onOpenChange={setShowWorkerDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Worker Details - {selectedWorker?.firstName} {selectedWorker?.lastName}
            </DialogTitle>
            <DialogDescription>View and edit worker information. All fields are editable.</DialogDescription>
          </DialogHeader>

          {editingWorker && !showCertificationForm && (
            <div className="grid gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={editingWorker.firstName}
                      onChange={(e) => setEditingWorker({ ...editingWorker, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={editingWorker.lastName}
                      onChange={(e) => setEditingWorker({ ...editingWorker, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={editingWorker.email}
                      onChange={(e) => setEditingWorker({ ...editingWorker, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={editingWorker.phone}
                      onChange={(e) => setEditingWorker({ ...editingWorker, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={editingWorker.dateOfBirth}
                      onChange={(e) => setEditingWorker({ ...editingWorker, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Social Security Number</Label>
                    <Input
                      value={editingWorker.socialSecurityNumber}
                      onChange={(e) => setEditingWorker({ ...editingWorker, socialSecurityNumber: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea
                    value={editingWorker.address}
                    onChange={(e) => setEditingWorker({ ...editingWorker, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Employment Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Hire Date</Label>
                    <Input
                      type="date"
                      value={editingWorker.hireDate}
                      onChange={(e) => setEditingWorker({ ...editingWorker, hireDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hourly Rate</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingWorker.hourlyRate}
                      onChange={(e) => setEditingWorker({ ...editingWorker, hourlyRate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Select
                      value={editingWorker.availability}
                      onValueChange={(value) => setEditingWorker({ ...editingWorker, availability: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Verification Status</Label>
                    <Select
                      value={editingWorker.verificationStatus}
                      onValueChange={(value) => setEditingWorker({ ...editingWorker, verificationStatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingWorker.isSection3}
                      onCheckedChange={(checked) => setEditingWorker({ ...editingWorker, isSection3: checked })}
                    />
                    <Label>Section 3 Worker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingWorker.isTargeted}
                      onCheckedChange={(checked) => setEditingWorker({ ...editingWorker, isTargeted: checked })}
                    />
                    <Label>Targeted Section 3 Worker</Label>
                  </div>
                </div>
              </div>

              {/* Skills and Certifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Skills and Certifications</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Skills (comma-separated)</Label>
                    <Textarea
                      value={editingWorker.skills}
                      onChange={(e) => setEditingWorker({ ...editingWorker, skills: e.target.value })}
                      placeholder="Construction, Electrical, Plumbing"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Certifications</Label>
                    <Textarea
                      value={editingWorker.certifications}
                      onChange={(e) => setEditingWorker({ ...editingWorker, certifications: e.target.value })}
                      placeholder="OSHA 10, Electrical License"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Work Experience</Label>
                  <Textarea
                    value={editingWorker.workExperience}
                    onChange={(e) => setEditingWorker({ ...editingWorker, workExperience: e.target.value })}
                    placeholder="Describe previous work experience"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Education</Label>
                  <Textarea
                    value={editingWorker.education}
                    onChange={(e) => setEditingWorker({ ...editingWorker, education: e.target.value })}
                    placeholder="Educational background"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Emergency Contact</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Emergency Contact Name</Label>
                    <Input
                      value={editingWorker.emergencyContact}
                      onChange={(e) => setEditingWorker({ ...editingWorker, emergencyContact: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Emergency Contact Phone</Label>
                    <Input
                      value={editingWorker.emergencyPhone}
                      onChange={(e) => setEditingWorker({ ...editingWorker, emergencyPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notes</h3>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea
                    value={editingWorker.notes}
                    onChange={(e) => setEditingWorker({ ...editingWorker, notes: e.target.value })}
                    placeholder="Any additional notes about the worker"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3 Certification Tab */}
          <div className="space-y-4 pb-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Section 3 Certification (Form 4736-D)</h3>
              </div>
              {editingWorker?.verificationStatus === "verified" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Verified
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Complete the HUD Form 4736-D to verify Section 3 worker eligibility.
            </p>
            <Button onClick={() => setShowCertificationForm(true)} variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              {editingWorker?.verificationStatus === "verified" ? "View Certification" : "Complete Certification"}
            </Button>
          </div>

          {showCertificationForm && editingWorker && (
            <div>
              <HUD4736DForm worker={editingWorker} onSubmit={handleSubmitCertification} isEditing={true} />
              <Button variant="ghost" onClick={() => setShowCertificationForm(false)} className="mt-4">
                Back to Worker Details
              </Button>
            </div>
          )}

          {!showCertificationForm && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowWorkerDetails(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveWorker} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Worker Dialog */}
      <Dialog open={showAddWorker} onOpenChange={setShowAddWorker}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Worker
            </DialogTitle>
            <DialogDescription>
              Enter the new worker's information. Required fields are marked with *.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input
                    value={newWorker.firstName}
                    onChange={(e) => setNewWorker({ ...newWorker, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input
                    value={newWorker.lastName}
                    onChange={(e) => setNewWorker({ ...newWorker, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={newWorker.email}
                    onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                    placeholder="worker@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input
                    value={newWorker.phone}
                    onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                    placeholder="(202) 555-0123"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={newWorker.dateOfBirth}
                    onChange={(e) => setNewWorker({ ...newWorker, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Social Security Number</Label>
                  <Input
                    value={newWorker.socialSecurityNumber}
                    onChange={(e) => setNewWorker({ ...newWorker, socialSecurityNumber: e.target.value })}
                    placeholder="***-**-****"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address *</Label>
                <Textarea
                  value={newWorker.address}
                  onChange={(e) => setNewWorker({ ...newWorker, address: e.target.value })}
                  placeholder="Enter complete address"
                />
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employment Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Hire Date</Label>
                  <Input
                    type="date"
                    value={newWorker.hireDate}
                    onChange={(e) => setNewWorker({ ...newWorker, hireDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hourly Rate</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newWorker.hourlyRate}
                    onChange={(e) => setNewWorker({ ...newWorker, hourlyRate: e.target.value })}
                    placeholder="25.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select
                    value={newWorker.availability}
                    onValueChange={(value) => setNewWorker({ ...newWorker, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Verification Status</Label>
                  <Select
                    value={newWorker.verificationStatus}
                    onValueChange={(value) => setNewWorker({ ...newWorker, verificationStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newWorker.isSection3}
                    onCheckedChange={(checked) => setNewWorker({ ...newWorker, isSection3: checked })}
                  />
                  <Label>Section 3 Worker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newWorker.isTargeted}
                    onCheckedChange={(checked) => setNewWorker({ ...newWorker, isTargeted: checked })}
                  />
                  <Label>Targeted Section 3 Worker</Label>
                </div>
              </div>
            </div>

            {/* Skills and Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skills and Certifications</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Skills (comma-separated)</Label>
                  <Textarea
                    value={newWorker.skills}
                    onChange={(e) => setNewWorker({ ...newWorker, skills: e.target.value })}
                    placeholder="Construction, Electrical, Plumbing"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <Textarea
                    value={newWorker.certifications}
                    onChange={(e) => setNewWorker({ ...newWorker, certifications: e.target.value })}
                    placeholder="OSHA 10, Electrical License"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Work Experience</Label>
                <Textarea
                  value={newWorker.workExperience}
                  onChange={(e) => setNewWorker({ ...newWorker, workExperience: e.target.value })}
                  placeholder="Describe previous work experience"
                />
              </div>
              <div className="space-y-2">
                <Label>Education</Label>
                <Textarea
                  value={newWorker.education}
                  onChange={(e) => setNewWorker({ ...newWorker, education: e.target.value })}
                  placeholder="Educational background"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Emergency Contact</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Emergency Contact Name</Label>
                  <Input
                    value={newWorker.emergencyContact}
                    onChange={(e) => setNewWorker({ ...newWorker, emergencyContact: e.target.value })}
                    placeholder="Contact person name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Emergency Contact Phone</Label>
                  <Input
                    value={newWorker.emergencyPhone}
                    onChange={(e) => setNewWorker({ ...newWorker, emergencyPhone: e.target.value })}
                    placeholder="(202) 555-0123"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Notes</h3>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  value={newWorker.notes}
                  onChange={(e) => setNewWorker({ ...newWorker, notes: e.target.value })}
                  placeholder="Any additional notes about the worker"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddWorker(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleAddWorker}
              disabled={
                saving ||
                !newWorker.firstName ||
                !newWorker.lastName ||
                !newWorker.email ||
                !newWorker.phone ||
                !newWorker.address
              }
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Worker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
