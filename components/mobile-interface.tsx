"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Clock, Users, MapPin, Plus, Send as Sync, Wifi, WifiOff } from "lucide-react"

export function MobileInterface() {
  const [isOnline, setIsOnline] = useState(true)
  const [quickEntry, setQuickEntry] = useState({
    workerName: "",
    projectLocation: "",
    hoursWorked: "",
    taskDescription: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [recentEntries, setRecentEntries] = useState([
    { id: 1, worker: "John Smith", project: "Downtown Housing", hours: 8, date: "2024-01-15", status: "Synced" },
    { id: 2, worker: "Maria Garcia", project: "Riverside Center", hours: 6, date: "2024-01-15", status: "Pending" },
    { id: 3, worker: "David Johnson", project: "Eastside Rehab", hours: 7.5, date: "2024-01-14", status: "Synced" },
  ])

  const handleQuickEntry = () => {
    if (quickEntry.workerName && quickEntry.projectLocation && quickEntry.hoursWorked) {
      const newEntry = {
        id: recentEntries.length + 1,
        worker: quickEntry.workerName,
        project: quickEntry.projectLocation,
        hours: Number.parseFloat(quickEntry.hoursWorked),
        date: quickEntry.date,
        status: isOnline ? "Synced" : "Pending",
      }
      setRecentEntries([newEntry, ...recentEntries])
      setQuickEntry({
        workerName: "",
        projectLocation: "",
        hoursWorked: "",
        taskDescription: "",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  const handleSync = () => {
    setRecentEntries((entries) =>
      entries.map((entry) => (entry.status === "Pending" ? { ...entry, status: "Synced" } : entry)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mobile Interface</h3>
          <p className="text-sm text-gray-600">Quick data entry and offline sync capabilities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOnline(!isOnline)}
            className={isOnline ? "text-green-600" : "text-red-600"}
          >
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            {isOnline ? "Online" : "Offline"}
          </Button>
          <Button onClick={handleSync} size="sm" disabled={!isOnline}>
            <Sync className="h-4 w-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>

      <Tabs defaultValue="quick-entry" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick-entry" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Entry</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Recent Entries</span>
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Offline Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-entry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Entry Form
              </CardTitle>
              <CardDescription>Rapidly enter worker hours and project data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="worker-name">Worker Name</Label>
                  <Input
                    id="worker-name"
                    value={quickEntry.workerName}
                    onChange={(e) => setQuickEntry({ ...quickEntry, workerName: e.target.value })}
                    placeholder="Enter worker name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-location">Project Location</Label>
                  <Select
                    value={quickEntry.projectLocation}
                    onValueChange={(value) => setQuickEntry({ ...quickEntry, projectLocation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Downtown Housing">Downtown Housing Project</SelectItem>
                      <SelectItem value="Riverside Center">Riverside Community Center</SelectItem>
                      <SelectItem value="Eastside Rehab">Eastside Rehabilitation</SelectItem>
                      <SelectItem value="Northside Development">Northside Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours-worked">Hours Worked</Label>
                  <Input
                    id="hours-worked"
                    type="number"
                    step="0.5"
                    value={quickEntry.hoursWorked}
                    onChange={(e) => setQuickEntry({ ...quickEntry, hoursWorked: e.target.value })}
                    placeholder="8.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-date">Date</Label>
                  <Input
                    id="work-date"
                    type="date"
                    value={quickEntry.date}
                    onChange={(e) => setQuickEntry({ ...quickEntry, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="task-description">Task Description (Optional)</Label>
                  <Textarea
                    id="task-description"
                    value={quickEntry.taskDescription}
                    onChange={(e) => setQuickEntry({ ...quickEntry, taskDescription: e.target.value })}
                    placeholder="Brief description of work performed"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleQuickEntry} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setQuickEntry({
                      workerName: "",
                      projectLocation: "",
                      hoursWorked: "",
                      taskDescription: "",
                      date: new Date().toISOString().split("T")[0],
                    })
                  }
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Entries
              </CardTitle>
              <CardDescription>Latest worker hour entries and sync status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{entry.worker}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {entry.project}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {entry.hours}h
                        </div>
                        <span>{entry.date}</span>
                      </div>
                    </div>
                    <Badge variant={entry.status === "Synced" ? "default" : "secondary"}>{entry.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Offline Data Management
              </CardTitle>
              <CardDescription>Manage data when working without internet connection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Pending Sync</h4>
                    <p className="text-2xl font-bold text-yellow-600">
                      {recentEntries.filter((entry) => entry.status === "Pending").length}
                    </p>
                    <p className="text-sm text-gray-600">Entries waiting</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Synced Today</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {recentEntries.filter((entry) => entry.status === "Synced").length}
                    </p>
                    <p className="text-sm text-gray-600">Successfully synced</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Storage Used</h4>
                    <p className="text-2xl font-bold text-blue-600">2.3MB</p>
                    <p className="text-sm text-gray-600">Local storage</p>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Offline Capabilities</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Worker hour entry</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Project data collection</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Photo documentation</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">GPS location tracking</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Download Mobile App
                  </Button>
                  <Button variant="outline" disabled={!isOnline}>
                    <Sync className="h-4 w-4 mr-2" />
                    Force Sync
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
