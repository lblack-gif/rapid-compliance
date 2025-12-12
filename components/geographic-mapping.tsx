"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, BarChart3, Globe, Plus, Search, Filter } from "lucide-react"

export function GeographicMapping() {
  const [activeTab, setActiveTab] = useState("locations")
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    type: "",
    workers: "",
    status: "",
  })
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Downtown Housing Project",
      address: "123 Main St",
      type: "Housing Development",
      workers: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Riverside Community Center",
      address: "456 River Ave",
      type: "Community Facility",
      workers: 23,
      status: "Active",
    },
    {
      id: 3,
      name: "Eastside Rehabilitation",
      address: "789 East Blvd",
      type: "Housing Rehabilitation",
      workers: 67,
      status: "In Progress",
    },
  ])

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address) {
      const location = {
        id: locations.length + 1,
        name: newLocation.name,
        address: newLocation.address,
        type: newLocation.type,
        workers: Number.parseInt(newLocation.workers) || 0,
        status: newLocation.status,
      }
      setLocations([...locations, location])
      setNewLocation({ name: "", address: "", type: "", workers: "", status: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Geographic Mapping</h3>
          <p className="text-sm text-gray-600">Track project locations and worker distribution</p>
        </div>
        <Button onClick={() => setActiveTab("add-location")} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="locations" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Project Locations</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Worker Verification</span>
          </TabsTrigger>
          <TabsTrigger value="census" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Census Data</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Geographic Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{location.name}</CardTitle>
                    <Badge variant={location.status === "Active" ? "default" : "secondary"}>{location.status}</Badge>
                  </div>
                  <CardDescription>{location.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{location.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Workers:</span>
                      <span className="font-medium">{location.workers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Worker Verification by Location</CardTitle>
              <CardDescription>Verify Section 3 worker eligibility by project location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Search workers..." />
                  </div>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {locations.map((location) => (
                    <Card key={location.id} className="p-4">
                      <h4 className="font-medium mb-2">{location.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Verified Workers:</span>
                          <span className="font-medium text-green-600">{Math.floor(location.workers * 0.8)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pending Verification:</span>
                          <span className="font-medium text-yellow-600">{Math.floor(location.workers * 0.2)}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="census" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Census Data Integration</CardTitle>
              <CardDescription>View demographic and economic data for project areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Median Income</h4>
                  <p className="text-2xl font-bold text-blue-600">$45,200</p>
                  <p className="text-sm text-gray-600">Area Median Income</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Unemployment Rate</h4>
                  <p className="text-2xl font-bold text-red-600">8.3%</p>
                  <p className="text-sm text-gray-600">Local Area Rate</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Population</h4>
                  <p className="text-2xl font-bold text-green-600">125,400</p>
                  <p className="text-sm text-gray-600">Service Area</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Analysis</CardTitle>
              <CardDescription>Analyze worker distribution and project impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-4">
                    <h4 className="font-medium mb-4">Worker Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Downtown Area</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded">
                            <div className="w-3/4 h-2 bg-blue-600 rounded"></div>
                          </div>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Riverside</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded">
                            <div className="w-1/2 h-2 bg-green-600 rounded"></div>
                          </div>
                          <span className="text-sm font-medium">50%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Eastside</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded">
                            <div className="w-4/5 h-2 bg-purple-600 rounded"></div>
                          </div>
                          <span className="text-sm font-medium">80%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-4">Project Impact</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Projects:</span>
                        <span className="font-medium">{locations.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Workers:</span>
                        <span className="font-medium">{locations.reduce((sum, loc) => sum + loc.workers, 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Coverage Area:</span>
                        <span className="font-medium">15.2 sq mi</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Location Modal/Form */}
      {activeTab === "add-location" && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Project Location</CardTitle>
            <CardDescription>Enter details for a new Section 3 project location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location-name">Project Name</Label>
                <Input
                  id="location-name"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-address">Address</Label>
                <Input
                  id="location-address"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                  placeholder="Enter project address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-type">Project Type</Label>
                <Select
                  value={newLocation.type}
                  onValueChange={(value) => setNewLocation({ ...newLocation, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Housing Development">Housing Development</SelectItem>
                    <SelectItem value="Housing Rehabilitation">Housing Rehabilitation</SelectItem>
                    <SelectItem value="Community Facility">Community Facility</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-workers">Expected Workers</Label>
                <Input
                  id="location-workers"
                  type="number"
                  value={newLocation.workers}
                  onChange={(e) => setNewLocation({ ...newLocation, workers: e.target.value })}
                  placeholder="Number of workers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-status">Status</Label>
                <Select
                  value={newLocation.status}
                  onValueChange={(value) => setNewLocation({ ...newLocation, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddLocation} className="bg-green-600 hover:bg-green-700">
                Add Location
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("locations")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
