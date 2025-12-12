"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Building2,
  FileText,
  Download,
  Plus,
  Edit,
  Target,
} from "lucide-react"

interface LaborEntry {
  id: string
  projectId: string
  projectName: string
  workerId: string
  workerName: string
  workerType: "section3" | "regular"
  date: string
  hoursWorked: number
  hourlyRate: number
  jobCategory: string
  verified: boolean
}

interface ProjectSummary {
  id: string
  name: string
  totalHours: number
  section3Hours: number
  section3Percentage: number
  targetPercentage: number
  status: "compliant" | "at_risk" | "non_compliant"
  workers: number
  section3Workers: number
}

const mockLaborEntries: LaborEntry[] = [
  {
    id: "1",
    projectId: "ABC-123",
    projectName: "Housing Development Phase 1",
    workerId: "W001",
    workerName: "John Smith",
    workerType: "section3",
    date: "2024-01-15",
    hoursWorked: 8,
    hourlyRate: 25.5,
    jobCategory: "Construction",
    verified: true,
  },
  {
    id: "2",
    projectId: "ABC-123",
    projectName: "Housing Development Phase 1",
    workerId: "W002",
    workerName: "Maria Garcia",
    workerType: "section3",
    date: "2024-01-15",
    hoursWorked: 8,
    hourlyRate: 28.0,
    jobCategory: "Electrical",
    verified: true,
  },
  {
    id: "3",
    projectId: "XYZ-456",
    projectName: "Community Center Renovation",
    workerId: "W003",
    workerName: "Robert Johnson",
    workerType: "regular",
    date: "2024-01-15",
    hoursWorked: 8,
    hourlyRate: 30.0,
    jobCategory: "Plumbing",
    verified: false,
  },
]

const mockProjectSummaries: ProjectSummary[] = [
  {
    id: "ABC-123",
    name: "Housing Development Phase 1",
    totalHours: 1200,
    section3Hours: 360,
    section3Percentage: 30,
    targetPercentage: 25,
    status: "compliant",
    workers: 45,
    section3Workers: 18,
  },
  {
    id: "XYZ-456",
    name: "Community Center Renovation",
    totalHours: 800,
    section3Hours: 160,
    section3Percentage: 20,
    targetPercentage: 25,
    status: "at_risk",
    workers: 23,
    section3Workers: 8,
  },
  {
    id: "DEF-789",
    name: "Infrastructure Upgrade",
    totalHours: 1500,
    section3Hours: 450,
    section3Percentage: 30,
    targetPercentage: 25,
    status: "compliant",
    workers: 67,
    section3Workers: 25,
  },
]

const weeklyData = [
  { week: "Week 1", section3: 120, total: 480, percentage: 25 },
  { week: "Week 2", section3: 135, total: 520, percentage: 26 },
  { week: "Week 3", section3: 110, total: 450, percentage: 24 },
  { week: "Week 4", section3: 145, total: 580, percentage: 25 },
]

const categoryData = [
  { name: "Construction", hours: 450, color: "#8884d8" },
  { name: "Electrical", hours: 320, color: "#82ca9d" },
  { name: "Plumbing", hours: 280, color: "#ffc658" },
  { name: "HVAC", hours: 200, color: "#ff7300" },
  { name: "Other", hours: 150, color: "#00ff00" },
]

export function LaborHoursTracker() {
  const [laborEntries, setLaborEntries] = useState<LaborEntry[]>(mockLaborEntries)
  const [projectSummaries, setProjectSummaries] = useState<ProjectSummary[]>(mockProjectSummaries)
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("month")
  const [isAddingEntry, setIsAddingEntry] = useState(false)

  const filteredEntries =
    selectedProject === "all" ? laborEntries : laborEntries.filter((entry) => entry.projectId === selectedProject)

  const totalSection3Hours = filteredEntries
    .filter((entry) => entry.workerType === "section3")
    .reduce((sum, entry) => sum + entry.hoursWorked, 0)

  const totalHours = filteredEntries.reduce((sum, entry) => sum + entry.hoursWorked, 0)
  const section3Percentage = totalHours > 0 ? (totalSection3Hours / totalHours) * 100 : 0

  const getStatusColor = (status: ProjectSummary["status"]) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800 border-green-200"
      case "at_risk":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "non_compliant":
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const getStatusIcon = (status: ProjectSummary["status"]) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4" />
      case "at_risk":
        return <AlertTriangle className="h-4 w-4" />
      case "non_compliant":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Labor Hours Tracker</h2>
          <p className="text-gray-600">Monitor Section 3 compliance and track worker hours</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" onClick={() => setIsAddingEntry(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-3xl font-bold text-gray-900">{totalHours.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Section 3 Hours</p>
                <p className="text-3xl font-bold text-green-600">{totalSection3Hours.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">{section3Percentage.toFixed(1)}% of total</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-3xl font-bold text-purple-600">
                  {projectSummaries.filter((p) => p.status === "compliant").length}
                </p>
                <p className="text-xs text-purple-600 mt-1">of {projectSummaries.length} projects</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-3xl font-bold text-orange-600">{projectSummaries.length}</p>
                <p className="text-xs text-orange-600 mt-1">Currently tracking</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectSummaries.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Hours Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5" />
                  <span>Weekly Labor Hours</span>
                </CardTitle>
                <CardDescription>Section 3 vs. total hours by week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="section3" fill="#10b981" name="Section 3 Hours" />
                    <Bar dataKey="total" fill="#e5e7eb" name="Total Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Job Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Hours by Job Category</CardTitle>
                <CardDescription>Distribution of Section 3 hours by job type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="hours"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Progress</CardTitle>
                <CardDescription>Section 3 percentage by project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectSummaries.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate">{project.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{project.section3Percentage}%</span>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {getStatusIcon(project.status)}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={project.section3Percentage} className="h-2" />
                    <div className="text-xs text-gray-500">
                      Target: {project.targetPercentage}% | Section 3: {project.section3Hours}h / Total:{" "}
                      {project.totalHours}h
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Entries</span>
                </CardTitle>
                <CardDescription>Latest labor hour submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {laborEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{entry.workerName}</p>
                        <p className="text-xs text-gray-500">
                          {entry.projectName} • {entry.jobCategory}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{entry.hoursWorked}h</p>
                        <div className="flex items-center space-x-1">
                          <Badge
                            variant={entry.workerType === "section3" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {entry.workerType === "section3" ? "S3" : "REG"}
                          </Badge>
                          {entry.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
              <CardDescription>Section 3 compliance status for all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Project</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Total Hours</th>
                      <th className="text-left p-3">Section 3 Hours</th>
                      <th className="text-left p-3">Percentage</th>
                      <th className="text-left p-3">Workers</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectSummaries.map((project) => (
                      <tr key={project.id} className="border-b">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-gray-500">{project.id}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={getStatusColor(project.status)}>
                            {getStatusIcon(project.status)}
                            <span className="ml-1 capitalize">{project.status.replace("_", " ")}</span>
                          </Badge>
                        </td>
                        <td className="p-3 font-medium">{project.totalHours.toLocaleString()}</td>
                        <td className="p-3 font-medium text-green-600">{project.section3Hours.toLocaleString()}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{project.section3Percentage}%</span>
                            <div className="w-16">
                              <Progress value={project.section3Percentage} className="h-1" />
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p>{project.section3Workers} Section 3</p>
                            <p className="text-gray-500">{project.workers} Total</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Labor Hour Entries</CardTitle>
              <CardDescription>Detailed view of all labor hour submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Worker</th>
                      <th className="text-left p-3">Project</th>
                      <th className="text-left p-3">Category</th>
                      <th className="text-left p-3">Hours</th>
                      <th className="text-left p-3">Rate</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry) => (
                      <tr key={entry.id} className="border-b">
                        <td className="p-3">{new Date(entry.date).toLocaleDateString()}</td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{entry.workerName}</p>
                            <p className="text-sm text-gray-500">{entry.workerId}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{entry.projectName}</p>
                            <p className="text-sm text-gray-500">{entry.projectId}</p>
                          </div>
                        </td>
                        <td className="p-3">{entry.jobCategory}</td>
                        <td className="p-3 font-medium">{entry.hoursWorked}</td>
                        <td className="p-3">${entry.hourlyRate}</td>
                        <td className="p-3">
                          <Badge variant={entry.workerType === "section3" ? "default" : "secondary"}>
                            {entry.workerType === "section3" ? "Section 3" : "Regular"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          {entry.verified ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-yellow-200 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trend</CardTitle>
                <CardDescription>Section 3 percentage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[20, 30]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="percentage" stroke="#10b981" strokeWidth={2} name="Section 3 %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{Math.round(section3Percentage)}%</p>
                    <p className="text-sm text-blue-600">Overall Compliance</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {projectSummaries.filter((p) => p.status === "compliant").length}
                    </p>
                    <p className="text-sm text-green-600">Compliant Projects</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {laborEntries.filter((e) => e.workerType === "section3").length}
                    </p>
                    <p className="text-sm text-purple-600">Section 3 Workers</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{totalSection3Hours}</p>
                    <p className="text-sm text-orange-600">Section 3 Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
