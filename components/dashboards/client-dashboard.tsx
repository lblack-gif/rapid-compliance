"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle2, Clock, FileText, TrendingUp, Users } from "lucide-react"

interface Contract {
  id: string
  contract_number: string
  contract_name: string
  contract_value: number
  status: string
  section3_applicable: boolean
  labor_hour_benchmark: number
  targeted_section3_benchmark: number
  start_date: string
  end_date: string
}

interface ComplianceSummary {
  totalContracts: number
  activeContracts: number
  section3Contracts: number
  avgComplianceRate: number
  activeTasks: number
  overdueTasks: number
}

interface ContractDetail {
  contract: Contract
  laborSummary: {
    total_hours: number
    section3_hours: number
    section3_compliance_rate: number
    meets_section3_benchmark: boolean
  }
  tasks: Array<{
    id: string
    title: string
    status: string
    due_date: string
    priority: string
  }>
}

export function ClientDashboard() {
  const [clientId, setClientId] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [summary, setSummary] = useState<ComplianceSummary | null>(null)
  const [selectedContract, setSelectedContract] = useState<ContractDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient()

  useEffect(() => {
    loadClientData()
  }, [])

  async function loadClientData() {
    try {
      // Get current user and their client_id
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Get user profile with role and client_id
      const { data: profile } = await supabase.from("profiles").select("role, client_id").eq("id", user.id).single()

      if (!profile?.client_id) {
        console.error("[v0] No client_id found for user")
        return
      }

      setClientId(profile.client_id)
      setUserRole(profile.role)

      // Load contracts for this client
      const { data: contractsData } = await supabase
        .from("contracts")
        .select("*")
        .eq("client_id", profile.client_id)
        .order("created_at", { ascending: false })

      setContracts(contractsData || [])

      // Calculate summary statistics
      const activeContracts = contractsData?.filter((c) => c.status === "active") || []
      const section3Contracts = contractsData?.filter((c) => c.section3_applicable) || []

      // Get task counts
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("status, due_date")
        .eq("client_id", profile.client_id)

      const activeTasks = tasksData?.filter((t) => t.status === "pending" || t.status === "in_progress").length || 0
      const overdueTasks =
        tasksData?.filter((t) => {
          const dueDate = new Date(t.due_date)
          return dueDate < new Date() && (t.status === "pending" || t.status === "in_progress")
        }).length || 0

      // Get average compliance rate
      const { data: summaryData } = await supabase
        .from("contract_labor_summary")
        .select("section3_compliance_rate")
        .in(
          "contract_id",
          section3Contracts.map((c) => c.id),
        )
        .eq("summary_period", "total")

      const avgRate =
        summaryData && summaryData.length > 0
          ? summaryData.reduce((sum, s) => sum + (s.section3_compliance_rate || 0), 0) / summaryData.length
          : 0

      setSummary({
        totalContracts: contractsData?.length || 0,
        activeContracts: activeContracts.length,
        section3Contracts: section3Contracts.length,
        avgComplianceRate: avgRate,
        activeTasks,
        overdueTasks,
      })

      setLoading(false)
    } catch (error) {
      console.error("[v0] Error loading client data:", error)
      setLoading(false)
    }
  }

  async function loadContractDetail(contractId: string) {
    try {
      const { data: contract } = await supabase.from("contracts").select("*").eq("id", contractId).single()

      const { data: laborSummary } = await supabase
        .from("contract_labor_summary")
        .select("*")
        .eq("contract_id", contractId)
        .eq("summary_period", "total")
        .single()

      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("contract_id", contractId)
        .order("due_date", { ascending: true })

      setSelectedContract({
        contract,
        laborSummary: laborSummary || {
          total_hours: 0,
          section3_hours: 0,
          section3_compliance_rate: 0,
          meets_section3_benchmark: false,
        },
        tasks: tasks || [],
      })
    } catch (error) {
      console.error("[v0] Error loading contract detail:", error)
    }
  }

  const canEdit = userRole === "client_admin" || userRole === "compliance_manager"

  if (loading) {
    return <div className="p-8">Loading client dashboard...</div>
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Client Compliance Dashboard</h1>
        <p className="text-muted-foreground">Monitor Section 3 compliance across all contracts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalContracts || 0}</div>
            <p className="text-xs text-muted-foreground">{summary?.activeContracts || 0} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 3 Contracts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.section3Contracts || 0}</div>
            <p className="text-xs text-muted-foreground">Require compliance tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.avgComplianceRate.toFixed(1)}%</div>
            <Progress value={summary?.avgComplianceRate || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.activeTasks || 0}</div>
            <p className="text-xs text-red-600">{summary?.overdueTasks || 0} overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">All Contracts</TabsTrigger>
          <TabsTrigger value="detail">Contract Detail</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract List</CardTitle>
              <CardDescription>All contracts for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract Number</TableHead>
                    <TableHead>Contract Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Section 3</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.contract_number}</TableCell>
                      <TableCell>{contract.contract_name}</TableCell>
                      <TableCell>${contract.contract_value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {contract.section3_applicable ? (
                          <Badge variant="default">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Applicable
                          </Badge>
                        ) : (
                          <Badge variant="outline">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {contract.section3_applicable && (
                          <span className="text-sm">Target: {contract.labor_hour_benchmark}%</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => loadContractDetail(contract.id)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail" className="space-y-4">
          {selectedContract ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedContract.contract.contract_name}</CardTitle>
                  <CardDescription>Contract #{selectedContract.contract.contract_number}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium">Contract Value</p>
                      <p className="text-2xl font-bold">${selectedContract.contract.contract_value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Period</p>
                      <p className="text-sm">
                        {selectedContract.contract.start_date} to {selectedContract.contract.end_date}
                      </p>
                    </div>
                  </div>

                  {selectedContract.contract.section3_applicable && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Section 3 Compliance Rate</p>
                        <p className="text-2xl font-bold">
                          {selectedContract.laborSummary.section3_compliance_rate.toFixed(1)}%
                        </p>
                      </div>
                      <Progress value={selectedContract.laborSummary.section3_compliance_rate} />
                      <div className="flex items-center gap-2">
                        {selectedContract.laborSummary.meets_section3_benchmark ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Meets benchmark</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-red-600">Below benchmark</span>
                          </>
                        )}
                      </div>
                      <div className="grid gap-2 md:grid-cols-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Hours</p>
                          <p className="font-medium">{selectedContract.laborSummary.total_hours.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Section 3 Hours</p>
                          <p className="font-medium">{selectedContract.laborSummary.section3_hours.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tasks & Milestones</CardTitle>
                  <CardDescription>Compliance tasks for this contract</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedContract.tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.due_date}</TableCell>
                          <TableCell>
                            <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                              {task.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={task.status === "completed" ? "default" : "outline"}>{task.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Select a contract from the list to view details
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {!canEdit && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="py-4">
            <p className="text-sm text-yellow-800">
              <AlertCircle className="inline h-4 w-4 mr-2" />
              You have view-only access. Contact your client admin to make changes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
