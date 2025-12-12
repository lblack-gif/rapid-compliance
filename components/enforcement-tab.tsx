"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle, FileWarning, Clock, Send } from "lucide-react"

interface FlaggedContract {
  id: string
  contract_number: string
  contract_name: string
  contract_value: number
  labor_hour_benchmark: number
  current_compliance_rate: number
  variance: number
  status: string
}

interface OverdueTask {
  id: string
  contract_id: string
  contract_number: string
  contract_name: string
  title: string
  due_date: string
  days_overdue: number
  priority: string
}

interface MissingReport {
  contract_id: string
  contract_number: string
  contract_name: string
  report_type: string
  expected_date: string
  days_missing: number
}

export function EnforcementTab() {
  const [flaggedContracts, setFlaggedContracts] = useState<FlaggedContract[]>([])
  const [overdueTasks, setOverdueTasks] = useState<OverdueTask[]>([])
  const [missingReports, setMissingReports] = useState<MissingReport[]>([])
  const [loading, setLoading] = useState(true)
  const [noticeText, setNoticeText] = useState("")
  const [selectedContract, setSelectedContract] = useState<string | null>(null)

  const supabase = createBrowserClient()

  useEffect(() => {
    loadEnforcementData()
  }, [])

  async function loadEnforcementData() {
    try {
      // Load contracts below benchmark
      const { data: summaries } = await supabase
        .from("contract_labor_summary")
        .select(`
          contract_id,
          section3_compliance_rate,
          meets_section3_benchmark,
          contracts!inner (
            id,
            contract_number,
            contract_name,
            contract_value,
            labor_hour_benchmark,
            status
          )
        `)
        .eq("summary_period", "total")
        .eq("meets_section3_benchmark", false)

      const flagged =
        summaries?.map((s) => ({
          id: s.contracts.id,
          contract_number: s.contracts.contract_number,
          contract_name: s.contracts.contract_name,
          contract_value: s.contracts.contract_value,
          labor_hour_benchmark: s.contracts.labor_hour_benchmark,
          current_compliance_rate: s.section3_compliance_rate,
          variance: s.section3_compliance_rate - s.contracts.labor_hour_benchmark,
          status: s.contracts.status,
        })) || []

      setFlaggedContracts(flagged)

      // Load overdue tasks
      const today = new Date().toISOString().split("T")[0]
      const { data: tasks } = await supabase
        .from("tasks")
        .select(`
          id,
          contract_id,
          title,
          due_date,
          priority,
          contracts!inner (
            contract_number,
            contract_name
          )
        `)
        .in("status", ["pending", "in_progress"])
        .lt("due_date", today)

      const overdue =
        tasks?.map((t) => {
          const dueDate = new Date(t.due_date)
          const todayDate = new Date(today)
          const daysOverdue = Math.floor((todayDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

          return {
            id: t.id,
            contract_id: t.contract_id,
            contract_number: t.contracts.contract_number,
            contract_name: t.contracts.contract_name,
            title: t.title,
            due_date: t.due_date,
            days_overdue: daysOverdue,
            priority: t.priority,
          }
        }) || []

      setOverdueTasks(overdue)

      // Load missing reports (quarterly reports not submitted)
      const { data: activeContracts } = await supabase
        .from("contracts")
        .select("id, contract_number, contract_name, start_date")
        .eq("section3_applicable", true)
        .eq("status", "active")

      const missing: MissingReport[] = []

      for (const contract of activeContracts || []) {
        const startDate = new Date(contract.start_date)
        const currentDate = new Date()

        // Calculate expected quarterly reports
        const quartersSinceStart = Math.floor(
          (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 90),
        )

        if (quartersSinceStart > 0) {
          // Check if quarterly reports exist
          const { data: reports } = await supabase
            .from("compliance_forms")
            .select("id")
            .eq("contract_id", contract.id)
            .eq("form_type", "quarterly")

          const reportCount = reports?.length || 0

          if (reportCount < quartersSinceStart) {
            const lastExpectedQuarter = new Date(startDate)
            lastExpectedQuarter.setMonth(lastExpectedQuarter.getMonth() + quartersSinceStart * 3)

            const daysMissing = Math.floor(
              (currentDate.getTime() - lastExpectedQuarter.getTime()) / (1000 * 60 * 60 * 24),
            )

            missing.push({
              contract_id: contract.id,
              contract_number: contract.contract_number,
              contract_name: contract.contract_name,
              report_type: "Quarterly Report",
              expected_date: lastExpectedQuarter.toISOString().split("T")[0],
              days_missing: daysMissing,
            })
          }
        }
      }

      setMissingReports(missing)
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error loading enforcement data:", error)
      setLoading(false)
    }
  }

  async function issueComplianceNotice(contractId: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Log the compliance notice in audit_logs
      const { error } = await supabase.from("audit_logs").insert({
        user_id: user?.id,
        contract_id: contractId,
        action_type: "compliance_notice_issued",
        description: noticeText,
      })

      if (error) throw error

      alert("Compliance notice issued and logged successfully")
      setNoticeText("")
      setSelectedContract(null)
      loadEnforcementData()
    } catch (error) {
      console.error("[v0] Error issuing compliance notice:", error)
      alert("Failed to issue compliance notice")
    }
  }

  if (loading) {
    return <div className="p-4">Loading enforcement data...</div>
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contracts Below Benchmark</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{flaggedContracts.length}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing Reports</CardTitle>
            <FileWarning className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{missingReports.length}</div>
            <p className="text-xs text-muted-foreground">Reports not submitted</p>
          </CardContent>
        </Card>
      </div>

      {/* Flagged Contracts */}
      <Card>
        <CardHeader>
          <CardTitle>Contracts Below Benchmark</CardTitle>
          <CardDescription>Contracts not meeting Section 3 labor hour requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract</TableHead>
                <TableHead>Current Rate</TableHead>
                <TableHead>Benchmark</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{contract.contract_name}</p>
                      <p className="text-sm text-muted-foreground">{contract.contract_number}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-red-600 font-medium">{contract.current_compliance_rate.toFixed(1)}%</span>
                  </TableCell>
                  <TableCell>{contract.labor_hour_benchmark}%</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{contract.variance.toFixed(1)}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={contract.status === "active" ? "default" : "secondary"}>{contract.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract.id)}>
                          <Send className="h-4 w-4 mr-2" />
                          Issue Notice
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Issue Compliance Notice</DialogTitle>
                          <DialogDescription>
                            Send a formal compliance notice for {contract.contract_name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="notice">Notice Details</Label>
                            <Textarea
                              id="notice"
                              placeholder="Enter compliance notice details..."
                              value={noticeText}
                              onChange={(e) => setNoticeText(e.target.value)}
                              rows={6}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => issueComplianceNotice(contract.id)} disabled={!noticeText.trim()}>
                            Issue Notice
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overdue Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Overdue Tasks</CardTitle>
          <CardDescription>Tasks past their due date</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.contract_name}</p>
                      <p className="text-sm text-muted-foreground">{task.contract_number}</p>
                    </div>
                  </TableCell>
                  <TableCell>{task.due_date}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{task.days_overdue} days</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>{task.priority}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Missing Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Missing Reports</CardTitle>
          <CardDescription>Expected reports not yet submitted</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Expected Date</TableHead>
                <TableHead>Days Missing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missingReports.map((report, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.contract_name}</p>
                      <p className="text-sm text-muted-foreground">{report.contract_number}</p>
                    </div>
                  </TableCell>
                  <TableCell>{report.report_type}</TableCell>
                  <TableCell>{report.expected_date}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{report.days_missing} days</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
