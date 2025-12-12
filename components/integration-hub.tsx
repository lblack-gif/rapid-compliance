"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
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
import {
  Database,
  Zap,
  CheckCircle,
  AlertTriangle,
  Settings,
  RefreshCw,
  ExternalLink,
  Shield,
  Activity,
  Clock,
  Users,
  FileText,
  Mail,
  Plus,
  Edit,
  Trash2,
  TestTube,
} from "lucide-react"

export function IntegrationHub() {
  const [integrations, setIntegrations] = useState([
    {
      id: "supabase",
      name: "Supabase Database",
      description: "Primary database for worker and contractor data",
      status: "connected",
      type: "database",
      lastSync: "2 minutes ago",
      health: 98,
      icon: Database,
      color: "green",
      endpoint: "https://your-project.supabase.co",
      apiKey: "••••••••••••••••",
    },
    {
      id: "openai",
      name: "OpenAI GPT-4",
      description: "AI-powered email triage and compliance analysis",
      status: "connected",
      type: "ai",
      lastSync: "5 minutes ago",
      health: 95,
      icon: Zap,
      color: "blue",
      endpoint: "https://api.openai.com/v1",
      apiKey: "••••••••••••••••",
    },
    {
      id: "hud-spears",
      name: "HUD SPEARS API",
      description: "Section 3 reporting and compliance data",
      status: "connected",
      type: "government",
      lastSync: "1 hour ago",
      health: 87,
      icon: Shield,
      color: "purple",
      endpoint: "https://api.hud.gov/spears/v1",
      apiKey: "••••••••••••••••",
    },
    {
      id: "hud-idis",
      name: "HUD IDIS System",
      description: "Integrated Disbursement Information System",
      status: "warning",
      type: "government",
      lastSync: "3 hours ago",
      health: 72,
      icon: FileText,
      color: "orange",
      endpoint: "https://api.hud.gov/idis/v2",
      apiKey: "••••••••••••••••",
    },
    {
      id: "adp-payroll",
      name: "ADP Payroll",
      description: "Payroll and labor hour tracking integration",
      status: "connected",
      type: "payroll",
      lastSync: "30 minutes ago",
      health: 91,
      icon: Users,
      color: "green",
      endpoint: "https://api.adp.com/hr/v2",
      apiKey: "••••••••••••••••",
    },
    {
      id: "quickbooks",
      name: "QuickBooks Enterprise",
      description: "Financial data and contract management",
      status: "disconnected",
      type: "financial",
      lastSync: "2 days ago",
      health: 0,
      icon: Database,
      color: "red",
      endpoint: "https://sandbox-quickbooks.api.intuit.com",
      apiKey: "••••••••••••••••",
    },
    {
      id: "smtp-service",
      name: "Email Service",
      description: "Automated email notifications and alerts",
      status: "connected",
      type: "communication",
      lastSync: "1 minute ago",
      health: 99,
      icon: Mail,
      color: "green",
      endpoint: "smtp.gmail.com:587",
      apiKey: "••••••••••••••••",
    },
  ])

  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [configForm, setConfigForm] = useState({
    name: "",
    description: "",
    endpoint: "",
    apiKey: "",
    type: "api",
    syncFrequency: "hourly",
  })

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: integration.status === "connected" ? "disconnected" : "connected",
              health: integration.status === "connected" ? 0 : 95,
            }
          : integration,
      ),
    )
  }

  const handleConfigure = () => {
    setShowConfigDialog(true)
  }

  const handleAddIntegration = () => {
    setShowAddDialog(true)
    setConfigForm({
      name: "",
      description: "",
      endpoint: "",
      apiKey: "",
      type: "api",
      syncFrequency: "hourly",
    })
  }

  const handleEditIntegration = (integration: any) => {
    setSelectedIntegration(integration)
    setConfigForm({
      name: integration.name,
      description: integration.description,
      endpoint: integration.endpoint,
      apiKey: integration.apiKey,
      type: integration.type,
      syncFrequency: "hourly",
    })
    setShowConfigDialog(true)
  }

  const handleSaveIntegration = async () => {
    try {
      if (selectedIntegration) {
        // Update existing integration
        setIntegrations((prev) =>
          prev.map((int) => (int.id === selectedIntegration.id ? { ...int, ...configForm } : int)),
        )
        alert("✅ Integration updated successfully!")
      } else {
        // Add new integration
        const newIntegration = {
          id: `int-${Date.now()}`,
          ...configForm,
          status: "disconnected",
          lastSync: "Never",
          health: 0,
          icon: Database,
          color: "gray",
        }
        setIntegrations((prev) => [...prev, newIntegration])
        alert("✅ Integration added successfully!")
      }
      setShowConfigDialog(false)
      setShowAddDialog(false)
      setSelectedIntegration(null)
    } catch (error) {
      alert("❌ Error saving integration. Please try again.")
    }
  }

  const handleTestConnection = async (integrationId: string) => {
    try {
      setIntegrations((prev) => prev.map((int) => (int.id === integrationId ? { ...int, status: "testing" } : int)))

      // Simulate connection test
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const success = Math.random() > 0.2 // 80% success rate

      setIntegrations((prev) =>
        prev.map((int) =>
          int.id === integrationId
            ? {
                ...int,
                status: success ? "connected" : "error",
                health: success ? Math.floor(Math.random() * 20) + 80 : 0,
              }
            : int,
        ),
      )

      alert(success ? "✅ Connection test successful!" : "❌ Connection test failed!")
    } catch (error) {
      alert("❌ Error testing connection. Please try again.")
    }
  }

  const handleSyncNow = async (integrationId: string) => {
    try {
      setIntegrations((prev) => prev.map((int) => (int.id === integrationId ? { ...int, status: "syncing" } : int)))

      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setIntegrations((prev) =>
        prev.map((int) =>
          int.id === integrationId
            ? {
                ...int,
                status: "connected",
                lastSync: "Just now",
                health: Math.floor(Math.random() * 20) + 80,
              }
            : int,
        ),
      )

      alert("✅ Sync completed successfully!")
    } catch (error) {
      alert("❌ Error during sync. Please try again.")
    }
  }

  const handleDeleteIntegration = (integrationId: string) => {
    if (confirm("Are you sure you want to delete this integration?")) {
      setIntegrations((prev) => prev.filter((int) => int.id !== integrationId))
      alert("✅ Integration deleted successfully!")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "disconnected":
        return "bg-red-100 text-red-800 border-red-200"
      case "syncing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "testing":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600"
    if (health >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const connectedIntegrations = integrations.filter((i) => i.status === "connected").length
  const totalIntegrations = integrations.length
  const avgHealth = Math.round(integrations.reduce((sum, i) => sum + i.health, 0) / totalIntegrations)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Integrations</h1>
          <p className="text-gray-600">Manage external system connections and data flows</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
          <Button size="sm" onClick={handleConfigure}>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button size="sm" onClick={handleAddIntegration}>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connectedIntegrations}/{totalIntegrations}
            </div>
            <Progress value={(connectedIntegrations / totalIntegrations) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(avgHealth)}`}>{avgHealth}%</div>
            <Progress value={avgHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sync Status</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Live</div>
            <p className="text-xs text-muted-foreground">Last sync: 2 min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="government">Government</TabsTrigger>
          <TabsTrigger value="ai">AI Services</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {integrations.map((integration) => {
              const Icon = integration.icon
              return (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${integration.color}-100`}
                        >
                          <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{integration.name}</h3>
                          <p className="text-gray-600 text-sm">{integration.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {integration.lastSync}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getHealthColor(integration.health)}`}>
                            {integration.health}%
                          </div>
                          <div className="text-xs text-gray-500">Health</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={integration.status === "connected"}
                            onCheckedChange={() => toggleIntegration(integration.id)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTestConnection(integration.id)}
                            disabled={integration.status === "testing" || integration.status === "syncing"}
                          >
                            <TestTube className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSyncNow(integration.id)}
                            disabled={integration.status === "testing" || integration.status === "syncing"}
                          >
                            {integration.status === "syncing" ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditIntegration(integration)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteIntegration(integration.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {["database", "government", "ai", "financial"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="grid gap-4">
              {integrations
                .filter((i) => i.type === type)
                .map((integration) => {
                  const Icon = integration.icon
                  return (
                    <Card key={integration.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${integration.color}-100`}
                            >
                              <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{integration.name}</h3>
                              <p className="text-gray-600 text-sm">{integration.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {integration.lastSync}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${getHealthColor(integration.health)}`}>
                                {integration.health}%
                              </div>
                              <div className="text-xs text-gray-500">Health</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={integration.status === "connected"}
                                onCheckedChange={() => toggleIntegration(integration.id)}
                              />
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Configure Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Integration Configuration</DialogTitle>
            <DialogDescription>Configure global integration settings and preferences</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Default Sync Interval</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Retry Attempts</Label>
                <Input type="number" defaultValue="3" min="1" max="10" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Connection Timeout (seconds)</Label>
                <Input type="number" defaultValue="30" min="5" max="300" />
              </div>
              <div className="space-y-2">
                <Label>Rate Limit (requests/minute)</Label>
                <Input type="number" defaultValue="100" min="10" max="1000" />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Notification Settings</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for integration issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Slack Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Recovery</Label>
                    <p className="text-sm text-muted-foreground">Automatically retry failed connections</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Webhook URL (Optional)</Label>
              <Input placeholder="https://your-webhook-url.com/integrations" />
              <p className="text-xs text-muted-foreground">
                Receive real-time notifications about integration status changes
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowConfigDialog(false)
                alert("✅ Configuration saved successfully!")
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Integration Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Integration</DialogTitle>
            <DialogDescription>Connect a new external system or service</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Integration Name *</Label>
                <Input
                  value={configForm.name}
                  onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                  placeholder="Enter integration name"
                />
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select
                  value={configForm.type}
                  onValueChange={(value) => setConfigForm({ ...configForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API Integration</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="file">File Transfer</SelectItem>
                    <SelectItem value="email">Email Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={configForm.description}
                onChange={(e) => setConfigForm({ ...configForm, description: e.target.value })}
                placeholder="Describe what this integration does"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Endpoint URL *</Label>
                <Input
                  value={configForm.endpoint}
                  onChange={(e) => setConfigForm({ ...configForm, endpoint: e.target.value })}
                  placeholder="https://api.example.com/v1"
                />
              </div>
              <div className="space-y-2">
                <Label>API Key *</Label>
                <Input
                  type="password"
                  value={configForm.apiKey}
                  onChange={(e) => setConfigForm({ ...configForm, apiKey: e.target.value })}
                  placeholder="Enter API key or token"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select
                value={configForm.syncFrequency}
                onValueChange={(value) => setConfigForm({ ...configForm, syncFrequency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="5min">Every 5 minutes</SelectItem>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveIntegration}
              disabled={!configForm.name || !configForm.endpoint || !configForm.apiKey}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
