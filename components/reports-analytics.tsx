"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  FileText,
  Target,
  Users,
  Building2,
  DollarSign,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"

export function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("current_month")
  const [selectedReport, setSelectedReport] = useState("compliance_summary")
  const [loading, setLoading] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportFormat, setReportFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [reportRecipients, setReportRecipients] = useState("")

  const reportTypes = [
    {
      value: "compliance_summary",
      label: "Section 3 Compliance Summary",
      description: "Overall compliance status and metrics",
    },
    {
      value: "contractor_performance",
      label: "Contractor Performance Report",
      description: "Individual contractor compliance analysis",
    },
    { value: "labor_hours", label: "Labor Hours Analysis", description: "Detailed labor hour tracking and compliance" },
    {
      value: "subcontracting",
      label: "Subcontracting Report",
      description: "Section 3 business subcontracting analysis",
    },
    { value: "hud_submission", label: "HUD Submission Report", description: "Ready-to-submit HUD compliance report" },
    { value: "quarterly_review", label: "Quarterly Review", description: "Comprehensive quarterly performance review" },
  ]

  const timePeriods = [
    { value: "current_month", label: "Current Month" },
    { value: "last_month", label: "Last Month" },
    { value: "current_quarter", label: "Current Quarter" },
    { value: "last_quarter", label: "Last Quarter" },
    { value: "current_year", label: "Current Year" },
    { value: "custom", label: "Custom Range" },
  ]

  const generateReport = async () => {
    setLoading(true)

    try {
      // Simulate report generation with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const reportType = reportTypes.find((r) => r.value === selectedReport)
      const period = timePeriods.find((p) => p.value === selectedPeriod)

      // Generate mock report data
      const reportData = {
        title: reportType?.label || "Report",
        period: period?.label || "Period",
        generatedAt: new Date().toISOString(),
        format: reportFormat,
        includeCharts,
        recipients: reportRecipients
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean),
        data: generateMockReportData(),
      }

      // Simulate file download
      const fileName = `${reportType?.value || "report"}-${new Date().toISOString().split("T")[0]}.${reportFormat}`

      if (reportFormat === "csv") {
        downloadCSVReport(reportData, fileName)
      } else {
        // For PDF/Excel, show success message
        alert(
          `✅ Report Generated Successfully!\n\nReport: ${reportData.title}\nPeriod: ${reportData.period}\nFormat: ${reportFormat.toUpperCase()}\n\nThe report has been generated and ${reportData.recipients.length > 0 ? `sent to ${reportData.recipients.length} recipients` : "is ready for download"}.`,
        )
      }

      setShowReportDialog(false)
    } catch (error) {
      alert("❌ Error generating report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateMockReportData = () => {
    return {
      summary: {
        totalContractors: 265,
        compliantContractors: 231,
        totalLaborHours: 45680,
        section3LaborHours: 12420,
        complianceRate: 87,
      },
      contractors: [
        { name: "Hamel Builders Inc.", compliance: 95, laborHours: 2400, section3Hours: 2280 },
        { name: "Turner Construction", compliance: 92, laborHours: 3200, section3Hours: 2944 },
        { name: "Clark Construction", compliance: 88, laborHours: 1800, section3Hours: 1584 },
      ],
      trends: [
        { month: "Jul", compliance: 82 },
        { month: "Aug", compliance: 84 },
        { month: "Sep", compliance: 86 },
        { month: "Oct", compliance: 85 },
        { month: "Nov", compliance: 87 },
        { month: "Dec", compliance: 87 },
      ],
    }
  }

  const downloadCSVReport = (reportData: any, fileName: string) => {
    const csvContent = [
      "Contractor Name,Compliance Rate,Total Labor Hours,Section 3 Hours",
      ...reportData.data.contractors.map(
        (contractor: any) =>
          `"${contractor.name}",${contractor.compliance}%,${contractor.laborHours},${contractor.section3Hours}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", fileName)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleGenerateReport = () => {
    setShowReportDialog(true)
  }

  const mockAnalytics = {
    overallCompliance: 87,
    totalContractors: 265,
    compliantContractors: 231,
    atRiskContractors: 24,
    nonCompliantContractors: 10,
    totalLaborHours: 45680,
    section3LaborHours: 12420,
    targetedSection3Hours: 2850,
    totalContractValue: 152000000,
    section3SubcontractingValue: 18500000,
    monthlyTrend: [
      { month: "Jul", compliance: 82 },
      { month: "Aug", compliance: 84 },
      { month: "Sep", compliance: 86 },
      { month: "Oct", compliance: 85 },
      { month: "Nov", compliance: 87 },
      { month: "Dec", compliance: 87 },
    ],
    topPerformers: [
      { name: "Hamel Builders Inc.", compliance: 95, value: 48900000 },
      { name: "Turner Construction", compliance: 92, value: 32500000 },
      { name: "Clark Construction", compliance: 90, value: 28750000 },
    ],
    alerts: [
      { contractor: "ABC Construction", issue: "Below 25% Section 3 benchmark", severity: "high" },
      { contractor: "XYZ Services", issue: "Missing monthly report", severity: "medium" },
      { contractor: "DEF Builders", issue: "Subcontracting below 10%", severity: "high" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive Section 3 compliance reporting and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timePeriods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{mockAnalytics.overallCompliance}%</div>
            <Progress value={mockAnalytics.overallCompliance} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 3 Labor Hours</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round((mockAnalytics.section3LaborHours / mockAnalytics.totalLaborHours) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {mockAnalytics.section3LaborHours.toLocaleString()} of {mockAnalytics.totalLaborHours.toLocaleString()}{" "}
              hours
            </p>
            <Progress
              value={(mockAnalytics.section3LaborHours / mockAnalytics.totalLaborHours) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subcontracting Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {Math.round((mockAnalytics.section3SubcontractingValue / mockAnalytics.totalContractValue) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              ${(mockAnalytics.section3SubcontractingValue / 1000000).toFixed(1)}M Section 3 subcontracting
            </p>
            <Progress
              value={(mockAnalytics.section3SubcontractingValue / mockAnalytics.totalContractValue) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Contractors</CardTitle>
            <Building2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {Math.round((mockAnalytics.compliantContractors / mockAnalytics.totalContractors) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {mockAnalytics.compliantContractors} of {mockAnalytics.totalContractors} contractors
            </p>
            <Progress
              value={(mockAnalytics.compliantContractors / mockAnalytics.totalContractors) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Generate Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Distribution</CardTitle>
                <CardDescription>Breakdown of contractor compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.compliantContractors}</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {Math.round((mockAnalytics.compliantContractors / mockAnalytics.totalContractors) * 100)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={(mockAnalytics.compliantContractors / mockAnalytics.totalContractors) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">At Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.atRiskContractors}</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {Math.round((mockAnalytics.atRiskContractors / mockAnalytics.totalContractors) * 100)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={(mockAnalytics.atRiskContractors / mockAnalytics.totalContractors) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Non-Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{mockAnalytics.nonCompliantContractors}</span>
                      <Badge variant="destructive">
                        {Math.round((mockAnalytics.nonCompliantContractors / mockAnalytics.totalContractors) * 100)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={(mockAnalytics.nonCompliantContractors / mockAnalytics.totalContractors) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Contractors</CardTitle>
                <CardDescription>Highest Section 3 compliance rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{performer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ${(performer.value / 1000000).toFixed(1)}M contract value
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {performer.compliance}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Compliance Alerts</CardTitle>
              <CardDescription>Issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnalytics.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className={`h-4 w-4 ${alert.severity === "high" ? "text-red-600" : "text-yellow-600"}`}
                      />
                      <div>
                        <div className="font-medium">{alert.contractor}</div>
                        <div className="text-sm text-muted-foreground">{alert.issue}</div>
                      </div>
                    </div>
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Labor Hour Performance</CardTitle>
                <CardDescription>Section 3 and Targeted Section 3 labor hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Section 3 Labor Hours</span>
                      <span className="text-sm">
                        {Math.round((mockAnalytics.section3LaborHours / mockAnalytics.totalLaborHours) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(mockAnalytics.section3LaborHours / mockAnalytics.totalLaborHours) * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{mockAnalytics.section3LaborHours.toLocaleString()} hours</span>
                      <span>Target: 25%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Targeted Section 3 Hours</span>
                      <span className="text-sm">
                        {Math.round((mockAnalytics.targetedSection3Hours / mockAnalytics.totalLaborHours) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(mockAnalytics.targetedSection3Hours / mockAnalytics.totalLaborHours) * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{mockAnalytics.targetedSection3Hours.toLocaleString()} hours</span>
                      <span>Target: 5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Contract values and Section 3 subcontracting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-green-600">
                      ${(mockAnalytics.totalContractValue / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-sm text-muted-foreground">Total Contract Value</p>
                  </div>

                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-blue-600">
                      ${(mockAnalytics.section3SubcontractingValue / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-sm text-muted-foreground">Section 3 Subcontracting</p>
                  </div>

                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((mockAnalytics.section3SubcontractingValue / mockAnalytics.totalContractValue) * 100)}
                      %
                    </div>
                    <p className="text-sm text-muted-foreground">Subcontracting Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Trend Analysis</CardTitle>
              <CardDescription>6-month compliance performance trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-6">
                  {mockAnalytics.monthlyTrend.map((month, index) => (
                    <div key={index} className="text-center p-3 border rounded">
                      <div className="text-lg font-bold text-blue-600">{month.compliance}%</div>
                      <p className="text-sm text-muted-foreground">{month.month}</p>
                      {index > 0 && (
                        <div className="flex items-center justify-center mt-1">
                          {month.compliance > mockAnalytics.monthlyTrend[index - 1].compliance ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : month.compliance < mockAnalytics.monthlyTrend[index - 1].compliance ? (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          ) : (
                            <Activity className="h-3 w-3 text-gray-600" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Trend Analysis</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Overall compliance has improved by 5% over the last 6 months</li>
                    <li>• Consistent performance above 80% benchmark</li>
                    <li>• Slight plateau in recent months - opportunity for improvement initiatives</li>
                    <li>• Strong performance indicates effective compliance management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Compliance Reports</CardTitle>
              <CardDescription>Create detailed reports for HUD submission and internal review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select value={selectedReport} onValueChange={setSelectedReport}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((report) => (
                          <SelectItem key={report.value} value={report.value}>
                            <div>
                              <div className="font-medium">{report.label}</div>
                              <div className="text-xs text-muted-foreground">{report.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timePeriods.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleGenerateReport} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Available Report Types</h4>
                  <div className="grid gap-2 md:grid-cols-2 text-sm text-blue-700">
                    <div>• Section 3 Compliance Summary</div>
                    <div>• Contractor Performance Analysis</div>
                    <div>• Labor Hours Detailed Report</div>
                    <div>• Subcontracting Compliance Report</div>
                    <div>• HUD Submission Ready Report</div>
                    <div>• Quarterly Performance Review</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Generation Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Configure your report settings and delivery options</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Report Format</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Include Charts</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="include-charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                  <label htmlFor="include-charts" className="text-sm">
                    Include visual charts and graphs
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email Recipients (Optional)</Label>
              <Input
                value={reportRecipients}
                onChange={(e) => setReportRecipients(e.target.value)}
                placeholder="Enter email addresses separated by commas"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to download only, or enter emails to send automatically
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Report Preview</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Type:</strong> {reportTypes.find((r) => r.value === selectedReport)?.label}
                </p>
                <p>
                  <strong>Period:</strong> {timePeriods.find((p) => p.value === selectedPeriod)?.label}
                </p>
                <p>
                  <strong>Format:</strong> {reportFormat.toUpperCase()}
                </p>
                <p>
                  <strong>Charts:</strong> {includeCharts ? "Included" : "Text only"}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={generateReport} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
