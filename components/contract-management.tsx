"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  FileCheck,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  DollarSign,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Save,
  X,
} from "lucide-react"

interface ExecutedContract {
  id: string
  contractNumber: string
  contractorName: string
  contractType: "JOC" | "Fixed Price" | "Cost Plus" | "Time & Materials"
  projectTitle: string
  contractValue: {
    minimum: number
    maximum: number
  }
  contractTerm: {
    baseYear: string
    optionYears: number
    startDate: string
    endDate: string
  }
  status: "active" | "pending_approval" | "expired" | "terminated"
  dcCouncilApproval: {
    required: boolean
    status: "pending" | "approved" | "not_required"
    submissionDate?: string
    approvalDate?: string
  }
  section3Requirements: {
    laborHourBenchmark: number
    targetedLaborHourBenchmark: number
    subcontractingBenchmark: number
  }
  contractingOfficer: string
  businessAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  signedDate: string
  executionDate: string
  documents: string[]
  amendments: number
  jobOrders: number
  totalSpent: number
  remainingCapacity: number
}

interface JobOrder {
  id: string
  contractId: string
  jobOrderNumber: string
  description: string
  value: number
  status: "pending" | "active" | "completed" | "cancelled"
  startDate: string
  completionDate?: string
  section3Workers: number
  totalWorkers: number
}

interface Amendment {
  id: string
  contractId: string
  amendmentNumber: number
  description: string
  effectiveDate: string
  valueChange: number
  timeExtension: number
  status: "draft" | "pending" | "approved" | "rejected"
}

export function ContractManagement() {
  const [contracts, setContracts] = useState<ExecutedContract[]>([])
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([])
  const [amendments, setAmendments] = useState<Amendment[]>([])
  const [filteredContracts, setFilteredContracts] = useState<ExecutedContract[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [selectedContract, setSelectedContract] = useState<ExecutedContract | null>(null)
  const [showContractDetails, setShowContractDetails] = useState(false)
  const [showNewContract, setShowNewContract] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [showNewJobOrder, setShowNewJobOrder] = useState(false)
  const [showNewAmendment, setShowNewAmendment] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("contracts")

  // New contract form state
  const [newContract, setNewContract] = useState({
    contractNumber: "",
    contractorName: "",
    contractType: "Fixed Price" as const,
    projectTitle: "",
    minimumValue: "",
    maximumValue: "",
    startDate: "",
    endDate: "",
    contractingOfficer: "",
    street: "",
    city: "Washington",
    state: "DC",
    zipCode: "",
  })

  // New job order form state
  const [newJobOrder, setNewJobOrder] = useState({
    contractId: "",
    description: "",
    value: "",
    startDate: "",
    section3Workers: "",
    totalWorkers: "",
  })

  // New amendment form state
  const [newAmendment, setNewAmendment] = useState({
    contractId: "",
    description: "",
    effectiveDate: "",
    valueChange: "",
    timeExtension: "",
  })

  useEffect(() => {
    loadContractData()
  }, [])

  useEffect(() => {
    filterContracts()
  }, [contracts, searchTerm, filterStatus, filterType])

  const loadContractData = async () => {
    setLoading(true)
    try {
      const mockContracts = generateMockContracts()
      const mockJobOrders = generateMockJobOrders(mockContracts)
      const mockAmendments = generateMockAmendments(mockContracts)

      setContracts(mockContracts)
      setJobOrders(mockJobOrders)
      setAmendments(mockAmendments)
    } catch (error) {
      console.error("Error loading contract data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockContracts = (): ExecutedContract[] => {
    const contractors = [
      {
        name: "ARS Design Build",
        officer: "Dr. Daanen Strachan",
        address: "2705 Bladensburg Road, NE, Washington, DC",
      },
      { name: "Hamel Builders Inc.", officer: "Michael Hamel", address: "1234 Construction Ave, Washington, DC 20001" },
      { name: "Turner Construction", officer: "Sarah Johnson", address: "5678 Builder Blvd, Washington, DC 20002" },
      { name: "Clark Construction", officer: "David Clark", address: "9012 Development Dr, Washington, DC 20003" },
      { name: "Skanska USA", officer: "Lisa Anderson", address: "3456 Infrastructure Way, Washington, DC 20004" },
      { name: "Gilbane Building", officer: "Robert Martinez", address: "7890 Commercial St, Washington, DC 20005" },
    ]

    const contractTypes: ("JOC" | "Fixed Price" | "Cost Plus" | "Time & Materials")[] = [
      "JOC",
      "Fixed Price",
      "Cost Plus",
      "Time & Materials",
    ]

    return contractors.map((contractor, index) => {
      const contractType = contractTypes[Math.floor(Math.random() * contractTypes.length)]
      const minValue = Math.floor(Math.random() * 100000) + 25000
      const maxValue = minValue * (10 + Math.floor(Math.random() * 40))
      const startDate = new Date(2024, Math.floor(Math.random() * 12), 1)
      const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate())
      const totalSpent = Math.floor(Math.random() * (maxValue * 0.6))

      return {
        id: `contract-${index + 1}`,
        contractNumber: index === 0 ? "54-2024A" : `${50 + index}-2024${String.fromCharCode(65 + index)}`,
        contractorName: contractor.name,
        contractType,
        projectTitle: `${contractor.name} ${contractType === "JOC" ? "Job Order Contract" : "Construction Project"}`,
        contractValue: {
          minimum: minValue,
          maximum: maxValue,
        },
        contractTerm: {
          baseYear: "1 year",
          optionYears: 4,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        },
        status: ["active", "pending_approval", "expired"][Math.floor(Math.random() * 3)] as any,
        dcCouncilApproval: {
          required: maxValue >= 1000000,
          status: maxValue >= 1000000 ? (Math.random() > 0.3 ? "approved" : "pending") : "not_required",
          submissionDate: maxValue >= 1000000 ? startDate.toISOString().split("T")[0] : undefined,
          approvalDate:
            maxValue >= 1000000 && Math.random() > 0.3
              ? new Date(startDate.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
              : undefined,
        },
        section3Requirements: {
          laborHourBenchmark: 25,
          targetedLaborHourBenchmark: 5,
          subcontractingBenchmark: contractType === "JOC" || index < 3 ? 10 : 3,
        },
        contractingOfficer: "Cheryl Moore",
        businessAddress: {
          street: contractor.address.split(",")[0],
          city: "Washington",
          state: "DC",
          zipCode: contractor.address.match(/\d{5}/)?.[0] || "20024",
        },
        signedDate: new Date(startDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        executionDate: startDate.toISOString().split("T")[0],
        documents: [
          "Contract Agreement",
          "General Conditions HUD Form 5370",
          "DCHA Supplemental Conditions",
          "Section 3 Requirements",
          "M/WBE Requirements",
          "Performance Bond",
          "Payment Bond",
        ],
        amendments: Math.floor(Math.random() * 3),
        jobOrders: Math.floor(Math.random() * 15) + 1,
        totalSpent,
        remainingCapacity: maxValue - totalSpent,
      }
    })
  }

  const generateMockJobOrders = (contracts: ExecutedContract[]): JobOrder[] => {
    const jobOrders: JobOrder[] = []

    contracts.forEach((contract) => {
      const numJobOrders = contract.jobOrders
      for (let i = 0; i < numJobOrders; i++) {
        jobOrders.push({
          id: `jo-${contract.id}-${i + 1}`,
          contractId: contract.id,
          jobOrderNumber: `JO-${contract.contractNumber}-${String(i + 1).padStart(3, "0")}`,
          description: `Job Order ${i + 1} - ${["Renovation", "Repair", "Maintenance", "Construction"][Math.floor(Math.random() * 4)]} Work`,
          value: Math.floor(Math.random() * 500000) + 50000,
          status: ["pending", "active", "completed", "cancelled"][Math.floor(Math.random() * 4)] as any,
          startDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          completionDate:
            Math.random() > 0.5
              ? new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
              : undefined,
          section3Workers: Math.floor(Math.random() * 15) + 5,
          totalWorkers: Math.floor(Math.random() * 30) + 20,
        })
      }
    })

    return jobOrders
  }

  const generateMockAmendments = (contracts: ExecutedContract[]): Amendment[] => {
    const amendments: Amendment[] = []

    contracts.forEach((contract) => {
      const numAmendments = contract.amendments
      for (let i = 0; i < numAmendments; i++) {
        amendments.push({
          id: `amend-${contract.id}-${i + 1}`,
          contractId: contract.id,
          amendmentNumber: i + 1,
          description: `Amendment ${i + 1} - ${["Time Extension", "Value Increase", "Scope Change", "Terms Modification"][Math.floor(Math.random() * 4)]}`,
          effectiveDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          valueChange: Math.floor(Math.random() * 200000) - 100000,
          timeExtension: Math.floor(Math.random() * 180),
          status: ["draft", "pending", "approved", "rejected"][Math.floor(Math.random() * 4)] as any,
        })
      }
    })

    return amendments
  }

  const filterContracts = () => {
    let filtered = contracts

    if (searchTerm) {
      filtered = filtered.filter(
        (contract) =>
          contract.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((contract) => contract.status === filterStatus)
    }

    if (filterType !== "all") {
      filtered = filtered.filter((contract) => contract.contractType === filterType)
    }

    setFilteredContracts(filtered)
  }

  const handleCreateContract = async () => {
    try {
      const contract: ExecutedContract = {
        id: `contract-${Date.now()}`,
        contractNumber: newContract.contractNumber,
        contractorName: newContract.contractorName,
        contractType: newContract.contractType,
        projectTitle: newContract.projectTitle,
        contractValue: {
          minimum: Number.parseInt(newContract.minimumValue),
          maximum: Number.parseInt(newContract.maximumValue),
        },
        contractTerm: {
          baseYear: "1 year",
          optionYears: 4,
          startDate: newContract.startDate,
          endDate: newContract.endDate,
        },
        status: "pending_approval",
        dcCouncilApproval: {
          required: Number.parseInt(newContract.maximumValue) >= 1000000,
          status: Number.parseInt(newContract.maximumValue) >= 1000000 ? "pending" : "not_required",
        },
        section3Requirements: {
          laborHourBenchmark: 25,
          targetedLaborHourBenchmark: 5,
          subcontractingBenchmark: newContract.contractType === "JOC" ? 10 : 3,
        },
        contractingOfficer: newContract.contractingOfficer,
        businessAddress: {
          street: newContract.street,
          city: newContract.city,
          state: newContract.state,
          zipCode: newContract.zipCode,
        },
        signedDate: new Date().toISOString().split("T")[0],
        executionDate: newContract.startDate,
        documents: [
          "Contract Agreement",
          "General Conditions HUD Form 5370",
          "DCHA Supplemental Conditions",
          "Section 3 Requirements",
        ],
        amendments: 0,
        jobOrders: 0,
        totalSpent: 0,
        remainingCapacity: Number.parseInt(newContract.maximumValue),
      }

      setContracts([...contracts, contract])
      setShowNewContract(false)
      setNewContract({
        contractNumber: "",
        contractorName: "",
        contractType: "Fixed Price",
        projectTitle: "",
        minimumValue: "",
        maximumValue: "",
        startDate: "",
        endDate: "",
        contractingOfficer: "",
        street: "",
        city: "Washington",
        state: "DC",
        zipCode: "",
      })

      alert("✅ Contract created successfully!")
    } catch (error) {
      alert("❌ Error creating contract. Please try again.")
    }
  }

  const handleCreateJobOrder = async () => {
    try {
      const jobOrder: JobOrder = {
        id: `jo-${Date.now()}`,
        contractId: newJobOrder.contractId,
        jobOrderNumber: `JO-${Date.now()}`,
        description: newJobOrder.description,
        value: Number.parseInt(newJobOrder.value),
        status: "pending",
        startDate: newJobOrder.startDate,
        section3Workers: Number.parseInt(newJobOrder.section3Workers),
        totalWorkers: Number.parseInt(newJobOrder.totalWorkers),
      }

      setJobOrders([...jobOrders, jobOrder])

      // Update contract job order count
      setContracts(contracts.map((c) => (c.id === newJobOrder.contractId ? { ...c, jobOrders: c.jobOrders + 1 } : c)))

      setShowNewJobOrder(false)
      setNewJobOrder({
        contractId: "",
        description: "",
        value: "",
        startDate: "",
        section3Workers: "",
        totalWorkers: "",
      })

      alert("✅ Job Order created successfully!")
    } catch (error) {
      alert("❌ Error creating job order. Please try again.")
    }
  }

  const handleCreateAmendment = async () => {
    try {
      const amendment: Amendment = {
        id: `amend-${Date.now()}`,
        contractId: newAmendment.contractId,
        amendmentNumber: amendments.filter((a) => a.contractId === newAmendment.contractId).length + 1,
        description: newAmendment.description,
        effectiveDate: newAmendment.effectiveDate,
        valueChange: Number.parseInt(newAmendment.valueChange),
        timeExtension: Number.parseInt(newAmendment.timeExtension),
        status: "draft",
      }

      setAmendments([...amendments, amendment])

      // Update contract amendment count
      setContracts(
        contracts.map((c) => (c.id === newAmendment.contractId ? { ...c, amendments: c.amendments + 1 } : c)),
      )

      setShowNewAmendment(false)
      setNewAmendment({
        contractId: "",
        description: "",
        effectiveDate: "",
        valueChange: "",
        timeExtension: "",
      })

      alert("✅ Amendment created successfully!")
    } catch (error) {
      alert("❌ Error creating amendment. Please try again.")
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
      case "pending_approval":
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
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

  const handleViewContract = (contract: ExecutedContract) => {
    setSelectedContract(contract)
    setShowContractDetails(true)
  }

  const stats = {
    total: contracts.length,
    active: contracts.filter((c) => c.status === "active").length,
    pendingApproval: contracts.filter((c) => c.status === "pending_approval").length,
    totalValue: contracts.reduce((sum, c) => sum + c.contractValue.maximum, 0),
    totalSpent: contracts.reduce((sum, c) => sum + c.totalSpent, 0),
    totalJobOrders: jobOrders.length,
    totalAmendments: amendments.length,
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
          <h1 className="text-3xl font-bold text-gray-900">Contract Management</h1>
          <p className="text-gray-600">Manage executed contracts, job orders, and contract compliance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowBulkUpload(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowNewContract(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Executed contracts</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Orders</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobOrders}</div>
            <p className="text-xs text-muted-foreground">Total job orders</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amendments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAmendments}</div>
            <p className="text-xs text-muted-foreground">Contract amendments</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground">Maximum contract value</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
            <p className="text-xs text-muted-foreground">Actual expenditure</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">Executed Contracts</TabsTrigger>
          <TabsTrigger value="job-orders">Job Orders</TabsTrigger>
          <TabsTrigger value="amendments">Amendments</TabsTrigger>
          <TabsTrigger value="bulk-contracts">Bulk Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by contractor name, contract number, or project title..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="JOC">Job Order Contract</SelectItem>
                    <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                    <SelectItem value="Cost Plus">Cost Plus</SelectItem>
                    <SelectItem value="Time & Materials">Time & Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Executed Contracts</CardTitle>
              <CardDescription>Comprehensive contract management and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract Details</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contract Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Job Orders</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contract.contractNumber}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{contract.projectTitle}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contract.contractorName}</div>
                          <div className="text-sm text-muted-foreground">{contract.jobOrders} job orders</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{contract.contractType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatCurrency(contract.contractValue.maximum)}</div>
                          <div className="text-sm text-muted-foreground">
                            Min: {formatCurrency(contract.contractValue.minimum)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{contract.jobOrders}</div>
                          <div className="text-sm text-muted-foreground">active orders</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewContract(contract)}>
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

        <TabsContent value="job-orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Job Orders</h2>
              <p className="text-muted-foreground">Manage job orders across all contracts</p>
            </div>
            <Button onClick={() => setShowNewJobOrder(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Job Order
            </Button>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Order #</TableHead>
                    <TableHead>Contract</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Section 3 Workers</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobOrders.map((jobOrder) => {
                    const contract = contracts.find((c) => c.id === jobOrder.contractId)
                    return (
                      <TableRow key={jobOrder.id}>
                        <TableCell className="font-medium">{jobOrder.jobOrderNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{contract?.contractNumber}</div>
                            <div className="text-sm text-muted-foreground">{contract?.contractorName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{jobOrder.description}</TableCell>
                        <TableCell>{formatCurrency(jobOrder.value)}</TableCell>
                        <TableCell>{getStatusBadge(jobOrder.status)}</TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">{jobOrder.section3Workers}</div>
                            <div className="text-sm text-muted-foreground">of {jobOrder.totalWorkers} total</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amendments" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Contract Amendments</h2>
              <p className="text-muted-foreground">Track contract modifications and changes</p>
            </div>
            <Button onClick={() => setShowNewAmendment(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Amendment
            </Button>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amendment #</TableHead>
                    <TableHead>Contract</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Value Change</TableHead>
                    <TableHead>Time Extension</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amendments.map((amendment) => {
                    const contract = contracts.find((c) => c.id === amendment.contractId)
                    return (
                      <TableRow key={amendment.id}>
                        <TableCell className="font-medium">#{amendment.amendmentNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{contract?.contractNumber}</div>
                            <div className="text-sm text-muted-foreground">{contract?.contractorName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{amendment.description}</TableCell>
                        <TableCell>
                          <span className={amendment.valueChange >= 0 ? "text-green-600" : "text-red-600"}>
                            {amendment.valueChange >= 0 ? "+" : ""}
                            {formatCurrency(amendment.valueChange)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {amendment.timeExtension > 0 ? `+${amendment.timeExtension} days` : "No extension"}
                        </TableCell>
                        <TableCell>{getStatusBadge(amendment.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-contracts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Bulk Contract Processing</h2>
              <p className="text-muted-foreground">Upload and process multiple contracts at once</p>
            </div>
            <Button onClick={() => setShowBulkUpload(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Contracts
            </Button>
          </div>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Zap className="h-5 w-5" />
                AI-Powered Contract Processing
              </CardTitle>
              <CardDescription className="text-blue-700">
                Automatically extract contract details from PDF documents using advanced OCR and AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-white rounded-lg">
                  <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <h3 className="font-medium">OCR Extraction</h3>
                  <p className="text-sm text-muted-foreground">Extract text from scanned PDFs</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Zap className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <h3 className="font-medium">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Identify key contract elements</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <h3 className="font-medium">Validation</h3>
                  <p className="text-sm text-muted-foreground">Verify compliance requirements</p>
                </div>
              </div>
              <Button onClick={() => setShowBulkUpload(true)} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Start Bulk Processing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Contract Dialog */}
      <Dialog open={showNewContract} onOpenChange={setShowNewContract}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Contract</DialogTitle>
            <DialogDescription>Enter the details for the new contract</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Contract Number</Label>
                <Input
                  value={newContract.contractNumber}
                  onChange={(e) => setNewContract({ ...newContract, contractNumber: e.target.value })}
                  placeholder="e.g., 55-2024A"
                />
              </div>
              <div className="space-y-2">
                <Label>Contract Type</Label>
                <Select
                  value={newContract.contractType}
                  onValueChange={(value: any) => setNewContract({ ...newContract, contractType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                    <SelectItem value="JOC">Job Order Contract</SelectItem>
                    <SelectItem value="Cost Plus">Cost Plus</SelectItem>
                    <SelectItem value="Time & Materials">Time & Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Contractor Name</Label>
              <Input
                value={newContract.contractorName}
                onChange={(e) => setNewContract({ ...newContract, contractorName: e.target.value })}
                placeholder="Enter contractor name"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                value={newContract.projectTitle}
                onChange={(e) => setNewContract({ ...newContract, projectTitle: e.target.value })}
                placeholder="Enter project title"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Minimum Value ($)</Label>
                <Input
                  type="number"
                  value={newContract.minimumValue}
                  onChange={(e) => setNewContract({ ...newContract, minimumValue: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum Value ($)</Label>
                <Input
                  type="number"
                  value={newContract.maximumValue}
                  onChange={(e) => setNewContract({ ...newContract, maximumValue: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newContract.startDate}
                  onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={newContract.endDate}
                  onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Contracting Officer</Label>
              <Input
                value={newContract.contractingOfficer}
                onChange={(e) => setNewContract({ ...newContract, contractingOfficer: e.target.value })}
                placeholder="Enter contracting officer name"
              />
            </div>

            <div className="space-y-2">
              <Label>Business Address</Label>
              <Input
                value={newContract.street}
                onChange={(e) => setNewContract({ ...newContract, street: e.target.value })}
                placeholder="Street address"
                className="mb-2"
              />
              <div className="grid gap-2 md:grid-cols-3">
                <Input
                  value={newContract.city}
                  onChange={(e) => setNewContract({ ...newContract, city: e.target.value })}
                  placeholder="City"
                />
                <Input
                  value={newContract.state}
                  onChange={(e) => setNewContract({ ...newContract, state: e.target.value })}
                  placeholder="State"
                />
                <Input
                  value={newContract.zipCode}
                  onChange={(e) => setNewContract({ ...newContract, zipCode: e.target.value })}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewContract(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateContract}>
              <Save className="h-4 w-4 mr-2" />
              Create Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Job Order Dialog */}
      <Dialog open={showNewJobOrder} onOpenChange={setShowNewJobOrder}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Job Order</DialogTitle>
            <DialogDescription>Add a new job order to an existing contract</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Contract</Label>
              <Select
                value={newJobOrder.contractId}
                onValueChange={(value) => setNewJobOrder({ ...newJobOrder, contractId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts
                    .filter((c) => c.status === "active")
                    .map((contract) => (
                      <SelectItem key={contract.id} value={contract.id}>
                        {contract.contractNumber} - {contract.contractorName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newJobOrder.description}
                onChange={(e) => setNewJobOrder({ ...newJobOrder, description: e.target.value })}
                placeholder="Describe the work to be performed"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Value ($)</Label>
                <Input
                  type="number"
                  value={newJobOrder.value}
                  onChange={(e) => setNewJobOrder({ ...newJobOrder, value: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newJobOrder.startDate}
                  onChange={(e) => setNewJobOrder({ ...newJobOrder, startDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Section 3 Workers</Label>
                <Input
                  type="number"
                  value={newJobOrder.section3Workers}
                  onChange={(e) => setNewJobOrder({ ...newJobOrder, section3Workers: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Total Workers</Label>
                <Input
                  type="number"
                  value={newJobOrder.totalWorkers}
                  onChange={(e) => setNewJobOrder({ ...newJobOrder, totalWorkers: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewJobOrder(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateJobOrder}>
              <Save className="h-4 w-4 mr-2" />
              Create Job Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Amendment Dialog */}
      <Dialog open={showNewAmendment} onOpenChange={setShowNewAmendment}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Amendment</DialogTitle>
            <DialogDescription>Add an amendment to modify an existing contract</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Contract</Label>
              <Select
                value={newAmendment.contractId}
                onValueChange={(value) => setNewAmendment({ ...newAmendment, contractId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.contractNumber} - {contract.contractorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newAmendment.description}
                onChange={(e) => setNewAmendment({ ...newAmendment, description: e.target.value })}
                placeholder="Describe the changes being made"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Effective Date</Label>
              <Input
                type="date"
                value={newAmendment.effectiveDate}
                onChange={(e) => setNewAmendment({ ...newAmendment, effectiveDate: e.target.value })}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Value Change ($)</Label>
                <Input
                  type="number"
                  value={newAmendment.valueChange}
                  onChange={(e) => setNewAmendment({ ...newAmendment, valueChange: e.target.value })}
                  placeholder="0 (positive for increase, negative for decrease)"
                />
              </div>
              <div className="space-y-2">
                <Label>Time Extension (days)</Label>
                <Input
                  type="number"
                  value={newAmendment.timeExtension}
                  onChange={(e) => setNewAmendment({ ...newAmendment, timeExtension: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewAmendment(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAmendment}>
              <Save className="h-4 w-4 mr-2" />
              Create Amendment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={showBulkUpload} onOpenChange={setShowBulkUpload}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Contract Processing</DialogTitle>
            <DialogDescription>Upload and process multiple contract documents at once</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-gray-600 mb-4">Supports PDF, DOC, DOCX files up to 50MB each</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="bulk-file-upload"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length > 0) {
                    alert(`Selected ${files.length} files for processing. AI extraction will begin automatically.`)
                    setShowBulkUpload(false)
                  }
                }}
              />
              <Label htmlFor="bulk-file-upload">
                <Button variant="outline" className="cursor-pointer bg-transparent">
                  Select Files
                </Button>
              </Label>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">AI Processing Features:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Automatic contract party identification</li>
                <li>• Contract value and term extraction</li>
                <li>• Section 3 requirement detection</li>
                <li>• DC Council approval requirement analysis</li>
                <li>• Compliance validation and scoring</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkUpload(false)}>
              Cancel
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Start Processing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contract Details Dialog */}
      <Dialog open={showContractDetails} onOpenChange={setShowContractDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contract Details - {selectedContract?.contractNumber}</DialogTitle>
            <DialogDescription>Complete contract information and compliance tracking</DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="terms">Contract Terms</TabsTrigger>
                <TabsTrigger value="compliance">Section 3 Compliance</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contract Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Contract Number</Label>
                        <p className="font-mono">{selectedContract.contractNumber}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Contractor</Label>
                        <p>{selectedContract.contractorName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Contract Type</Label>
                        <p>{selectedContract.contractType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Project Title</Label>
                        <p>{selectedContract.projectTitle}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-1">{getStatusBadge(selectedContract.status)}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Contract Value Range</Label>
                        <p>
                          {formatCurrency(selectedContract.contractValue.minimum)} -{" "}
                          {formatCurrency(selectedContract.contractValue.maximum)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Total Spent</Label>
                        <p className="font-semibold text-green-600">{formatCurrency(selectedContract.totalSpent)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Remaining Capacity</Label>
                        <p className="font-semibold text-blue-600">
                          {formatCurrency(selectedContract.remainingCapacity)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Utilization Rate</Label>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {Math.round((selectedContract.totalSpent / selectedContract.contractValue.maximum) * 100)}
                              %
                            </span>
                            <span className="text-muted-foreground">
                              of {formatCurrency(selectedContract.contractValue.maximum)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min((selectedContract.totalSpent / selectedContract.contractValue.maximum) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="terms" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contract Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Base Year</Label>
                        <p>{selectedContract.contractTerm.baseYear}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Option Years</Label>
                        <p>{selectedContract.contractTerm.optionYears} years</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Contract Period</Label>
                        <p>
                          {selectedContract.contractTerm.startDate} to {selectedContract.contractTerm.endDate}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Execution Date</Label>
                        <p>{selectedContract.executionDate}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contract Administration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Contracting Officer</Label>
                        <p>{selectedContract.contractingOfficer}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Business Address</Label>
                        <p>
                          {selectedContract.businessAddress.street}
                          <br />
                          {selectedContract.businessAddress.city}, {selectedContract.businessAddress.state}{" "}
                          {selectedContract.businessAddress.zipCode}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Job Orders Issued</Label>
                        <p>{selectedContract.jobOrders}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Amendments</Label>
                        <p>{selectedContract.amendments}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Section 3 Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center p-4 border rounded">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedContract.section3Requirements.laborHourBenchmark}%
                        </div>
                        <p className="text-sm text-muted-foreground">Labor Hour Benchmark</p>
                      </div>
                      <div className="text-center p-4 border rounded">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedContract.section3Requirements.targetedLaborHourBenchmark}%
                        </div>
                        <p className="text-sm text-muted-foreground">Targeted Labor Hour Benchmark</p>
                      </div>
                      <div className="text-center p-4 border rounded">
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedContract.section3Requirements.subcontractingBenchmark}%
                        </div>
                        <p className="text-sm text-muted-foreground">Subcontracting Benchmark</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm font-medium">Financial Performance</Label>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Budget Utilization</span>
                              <span>
                                {Math.round(
                                  (selectedContract.totalSpent / selectedContract.contractValue.maximum) * 100,
                                )}
                                %
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width: `${Math.min((selectedContract.totalSpent / selectedContract.contractValue.maximum) * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Activity Level</Label>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Job Orders</span>
                              <span>{selectedContract.jobOrders}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Amendments</span>
                              <span>{selectedContract.amendments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContractDetails(false)}>
              Close
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
