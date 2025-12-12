"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Clock,
  Users,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Timer,
  BarChart3,
  Filter,
  Search,
  RefreshCw,
  Eye,
} from "lucide-react"

export function RealtimeTrackingPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock real-time data
  const [realtimeData, setRealtimeData] = useState({
    activeWorkers: 156,
    ongoingProjects: 12,
    todayHours: 1247,
    complianceRate: 94.2,
    alerts: 3,
  })

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "worker_checkin",
      worker: "Marcus Johnson",
      project: "Senior Housing Development",
      time: "2 minutes ago",
      status: "active",
      location: "Ward 7, DC",
    },
    {
      id: 2,
      type: "hours_logged",
      worker: "Sarah Williams",
      project: "Community Center Renovation",
      hours: 8,
      time: "5 minutes ago",
      status: "completed",
      location: "Ward 5, DC",
    },
    {
      id: 3,
      type: "compliance_alert",
      project: "Affordable Housing Phase 1",
      message: "Approaching Section 3 threshold",
      time: "12 minutes ago",
      status: "warning",
      location: "Ward 8, DC",
    },
    {
      id: 4,
      type: "worker_checkout",
      worker: "David Rodriguez",
      project: "Public Housing Modernization",
      time: "18 minutes ago",
      status: "completed",
      location: "Ward 6, DC",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => ({
        ...prev,
        activeWorkers: prev.activeWorkers + Math.floor(Math.random() * 3) - 1,
        todayHours: prev.todayHours + Math.floor(Math.random() * 5),
        complianceRate: Math.max(90, Math.min(100, prev.complianceRate + (Math.random() - 0.5) * 0.5)),
      }))
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "worker_checkin":
        return <Users className="h-4 w-4 text-green-600" />
      case "worker_checkout":
        return <Users className="h-4 w-4 text-gray-600" />
      case "hours_logged":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "compliance_alert":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800">Warning</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredActivities = activities.filter((activity) => {
    if (activeFilter !== "all" && activity.status !== activeFilter) return false
    if (
      searchTerm &&
      !activity.worker?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !activity.project.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Real-Time Tracking</h1>
          <p className="text-gray-600">Live monitoring of worker activities and project progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <div className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{realtimeData.activeWorkers}</div>
            <p className="text-xs text-gray-500">Currently on-site</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{realtimeData.ongoingProjects}</div>
            <p className="text-xs text-gray-500">Active projects</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{realtimeData.todayHours.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Hours logged today</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-teal-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{realtimeData.complianceRate.toFixed(1)}%</div>
            <Progress value={realtimeData.complianceRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{realtimeData.alerts}</div>
            <p className="text-xs text-gray-500">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="warning">Warnings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search workers or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
      </div>

      {/* Activity Feed */}
      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Activity Feed</TabsTrigger>
          <TabsTrigger value="map">Location Map</TabsTrigger>
          <TabsTrigger value="analytics">Live Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Activity Feed</CardTitle>
              <CardDescription>Real-time updates from all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {activity.worker && <span className="font-medium">{activity.worker}</span>}
                          {activity.message && <span className="font-medium">{activity.message}</span>}
                          {activity.hours && (
                            <span className="text-sm text-gray-600">logged {activity.hours} hours</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{activity.project}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                          <span>•</span>
                          <Timer className="h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(activity.status)}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Worker Location Map</CardTitle>
              <CardDescription>Real-time worker locations across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive map with live worker locations</p>
                  <p className="text-sm text-gray-400">Real-time GPS tracking integration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Activity</CardTitle>
                <CardDescription>Worker activity throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Live activity chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Real-time project completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Senior Housing Development</span>
                    <span className="text-sm text-gray-600">78%</span>
                  </div>
                  <Progress value={78} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Community Center Renovation</span>
                    <span className="text-sm text-gray-600">92%</span>
                  </div>
                  <Progress value={92} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Affordable Housing Phase 1</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
