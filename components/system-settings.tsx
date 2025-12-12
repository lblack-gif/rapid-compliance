"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Settings,
  Shield,
  Download,
  Save,
  RefreshCw,
  Database,
  Bell,
  FileText,
  Lock,
  Globe,
  Zap,
  AlertTriangle,
  Upload,
  Trash2,
} from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    organizationName: "District of Columbia Housing Authority",
    systemName: "Section3AI Compliance System",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    language: "en-US",
    theme: "light",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    alertThreshold: 80,
    reminderDays: 7,
    escalationHours: 24,
    digestFrequency: "daily",

    // Compliance Settings
    section3LaborBenchmark: 25,
    targetedSection3Benchmark: 5,
    constructionSubcontractingBenchmark: 10,
    nonConstructionSubcontractingBenchmark: 3,
    reportingFrequency: "monthly",
    complianceGracePeriod: 30,
    penaltyCalculationMethod: "progressive",

    // Security Settings
    sessionTimeout: 30,
    passwordExpiry: 90,
    twoFactorAuth: true,
    auditLogging: true,
    ipWhitelisting: false,
    encryptionLevel: "AES-256",
    backupRetention: 365,

    // AI Settings
    aiProcessingEnabled: true,
    aiConfidenceThreshold: 85,
    autoResponseEnabled: false,
    sentimentAnalysis: true,
    keywordExtraction: true,
    languageDetection: true,

    // Integration Settings
    hudApiEnabled: true,
    emailIntegration: true,
    smsProvider: "twilio",
    backupFrequency: "daily",
    syncInterval: 15,
    rateLimitPerMinute: 1000,

    // Performance Settings
    cacheEnabled: true,
    cacheTTL: 3600,
    maxConcurrentUsers: 100,
    databasePoolSize: 20,
    logLevel: "info",
    metricsEnabled: true,
  })

  const [showBackupDialog, setShowBackupDialog] = useState(false)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [activeBackups, setActiveBackups] = useState([
    { id: 1, name: "Daily_Backup_2024-01-15", size: "2.3 GB", date: "2024-01-15 02:00:00", type: "automatic" },
    { id: 2, name: "Manual_Backup_2024-01-14", size: "2.1 GB", date: "2024-01-14 14:30:00", type: "manual" },
    { id: 3, name: "Weekly_Backup_2024-01-08", size: "2.0 GB", date: "2024-01-08 02:00:00", type: "automatic" },
  ])

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("✅ Settings saved successfully!")
    } catch (error) {
      alert("❌ Error saving settings. Please try again.")
    }
  }

  const resetSettings = async () => {
    try {
      // Reset to default values
      await new Promise((resolve) => setTimeout(resolve, 500))
      setShowResetDialog(false)
      alert("✅ Settings reset to defaults")
    } catch (error) {
      alert("❌ Error resetting settings. Please try again.")
    }
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "section3ai-settings.json"
    link.click()
    alert("✅ Settings exported successfully!")
  }

  const createBackup = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const newBackup = {
        id: Date.now(),
        name: `Manual_Backup_${new Date().toISOString().split("T")[0]}`,
        size: "2.4 GB",
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        type: "manual",
      }
      setActiveBackups([newBackup, ...activeBackups])
      setShowBackupDialog(false)
      alert("✅ Backup created successfully!")
    } catch (error) {
      alert("❌ Error creating backup. Please try again.")
    }
  }

  const deleteBackup = (backupId: number) => {
    if (confirm("Are you sure you want to delete this backup?")) {
      setActiveBackups((prev) => prev.filter((b) => b.id !== backupId))
      alert("✅ Backup deleted successfully!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and compliance parameters</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline" onClick={() => setShowResetDialog(true)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Organization Settings
                </CardTitle>
                <CardDescription>Basic organization and system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={settings.organizationName}
                    onChange={(e) => handleSettingChange("organizationName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange("systemName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Timezone, date format, and currency preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) => handleSettingChange("dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Section 3 Compliance Parameters
              </CardTitle>
              <CardDescription>Configure HUD Section 3 benchmarks and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="section3LaborBenchmark">Section 3 Labor Hour Benchmark (%)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[settings.section3LaborBenchmark]}
                        onValueChange={(value) => handleSettingChange("section3LaborBenchmark", value[0])}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-sm font-medium">{settings.section3LaborBenchmark}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">HUD requirement: 25%</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetedSection3Benchmark">Targeted Section 3 Benchmark (%)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[settings.targetedSection3Benchmark]}
                        onValueChange={(value) => handleSettingChange("targetedSection3Benchmark", value[0])}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-sm font-medium">{settings.targetedSection3Benchmark}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">HUD requirement: 5%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="constructionSubcontractingBenchmark">
                      Construction Subcontracting Benchmark (%)
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[settings.constructionSubcontractingBenchmark]}
                        onValueChange={(value) => handleSettingChange("constructionSubcontractingBenchmark", value[0])}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-sm font-medium">{settings.constructionSubcontractingBenchmark}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">HUD requirement: 10%</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nonConstructionSubcontractingBenchmark">
                      Non-Construction Subcontracting Benchmark (%)
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[settings.nonConstructionSubcontractingBenchmark]}
                        onValueChange={(value) =>
                          handleSettingChange("nonConstructionSubcontractingBenchmark", value[0])
                        }
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-sm font-medium">
                        {settings.nonConstructionSubcontractingBenchmark}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">HUD requirement: 3%</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="reportingFrequency">Reporting Frequency</Label>
                  <Select
                    value={settings.reportingFrequency}
                    onValueChange={(value) => handleSettingChange("reportingFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complianceGracePeriod">Grace Period (days)</Label>
                  <Input
                    id="complianceGracePeriod"
                    type="number"
                    min="0"
                    max="90"
                    value={settings.complianceGracePeriod}
                    onChange={(e) => handleSettingChange("complianceGracePeriod", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="penaltyCalculationMethod">Penalty Calculation</Label>
                  <Select
                    value={settings.penaltyCalculationMethod}
                    onValueChange={(value) => handleSettingChange("penaltyCalculationMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Rate</SelectItem>
                      <SelectItem value="progressive">Progressive</SelectItem>
                      <SelectItem value="percentage">Percentage Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Channels
                </CardTitle>
                <CardDescription>Configure notification delivery methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alert Settings
                </CardTitle>
                <CardDescription>Configure when and how alerts are triggered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[settings.alertThreshold]}
                      onValueChange={(value) => handleSettingChange("alertThreshold", value[0])}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-sm font-medium">{settings.alertThreshold}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Send alerts when compliance falls below this percentage
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderDays">Reminder Days</Label>
                  <Input
                    id="reminderDays"
                    type="number"
                    min="1"
                    max="30"
                    value={settings.reminderDays}
                    onChange={(e) => handleSettingChange("reminderDays", Number.parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">Days before deadline to send reminders</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="escalationHours">Escalation Time (hours)</Label>
                  <Input
                    id="escalationHours"
                    type="number"
                    min="1"
                    max="168"
                    value={settings.escalationHours}
                    onChange={(e) => handleSettingChange("escalationHours", Number.parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">Hours before escalating unresolved issues</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Authentication & Access
                </CardTitle>
                <CardDescription>Configure security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    min="30"
                    max="365"
                    value={settings.passwordExpiry}
                    onChange={(e) => handleSettingChange("passwordExpiry", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelisting</Label>
                    <p className="text-sm text-muted-foreground">Restrict access by IP address</p>
                  </div>
                  <Switch
                    checked={settings.ipWhitelisting}
                    onCheckedChange={(checked) => handleSettingChange("ipWhitelisting", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Data Protection
                </CardTitle>
                <CardDescription>Configure data encryption and audit settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel">Encryption Level</Label>
                  <Select
                    value={settings.encryptionLevel}
                    onValueChange={(value) => handleSettingChange("encryptionLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-128">AES-128</SelectItem>
                      <SelectItem value="AES-256">AES-256</SelectItem>
                      <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                  <Input
                    id="backupRetention"
                    type="number"
                    min="30"
                    max="2555"
                    value={settings.backupRetention}
                    onChange={(e) => handleSettingChange("backupRetention", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all system activities</p>
                  </div>
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => handleSettingChange("auditLogging", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Processing
                </CardTitle>
                <CardDescription>Configure AI-powered features and processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Processing Enabled</Label>
                    <p className="text-sm text-muted-foreground">Enable AI-powered email triage and analysis</p>
                  </div>
                  <Switch
                    checked={settings.aiProcessingEnabled}
                    onCheckedChange={(checked) => handleSettingChange("aiProcessingEnabled", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiConfidenceThreshold">AI Confidence Threshold (%)</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[settings.aiConfidenceThreshold]}
                      onValueChange={(value) => handleSettingChange("aiConfidenceThreshold", value[0])}
                      max={100}
                      min={50}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-sm font-medium">{settings.aiConfidenceThreshold}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum confidence for automated actions</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Response</Label>
                    <p className="text-sm text-muted-foreground">Automatically send AI-generated responses</p>
                  </div>
                  <Switch
                    checked={settings.autoResponseEnabled}
                    onCheckedChange={(checked) => handleSettingChange("autoResponseEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  AI Features
                </CardTitle>
                <CardDescription>Enable specific AI analysis features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sentiment Analysis</Label>
                    <p className="text-sm text-muted-foreground">Analyze emotional tone of communications</p>
                  </div>
                  <Switch
                    checked={settings.sentimentAnalysis}
                    onCheckedChange={(checked) => handleSettingChange("sentimentAnalysis", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Keyword Extraction</Label>
                    <p className="text-sm text-muted-foreground">Extract key topics from messages</p>
                  </div>
                  <Switch
                    checked={settings.keywordExtraction}
                    onCheckedChange={(checked) => handleSettingChange("keywordExtraction", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Language Detection</Label>
                    <p className="text-sm text-muted-foreground">Automatically detect message language</p>
                  </div>
                  <Switch
                    checked={settings.languageDetection}
                    onCheckedChange={(checked) => handleSettingChange("languageDetection", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  External Systems
                </CardTitle>
                <CardDescription>Configure connections to external systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>HUD API Integration</Label>
                    <p className="text-sm text-muted-foreground">Connect to HUD SPEARS and IDIS systems</p>
                  </div>
                  <Switch
                    checked={settings.hudApiEnabled}
                    onCheckedChange={(checked) => handleSettingChange("hudApiEnabled", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Integration</Label>
                    <p className="text-sm text-muted-foreground">Process incoming emails automatically</p>
                  </div>
                  <Switch
                    checked={settings.emailIntegration}
                    onCheckedChange={(checked) => handleSettingChange("emailIntegration", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smsProvider">SMS Provider</Label>
                  <Select
                    value={settings.smsProvider}
                    onValueChange={(value) => handleSettingChange("smsProvider", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="aws-sns">AWS SNS</SelectItem>
                      <SelectItem value="messagebird">MessageBird</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Sync Settings
                </CardTitle>
                <CardDescription>Configure data synchronization parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                  <Input
                    id="syncInterval"
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.syncInterval}
                    onChange={(e) => handleSettingChange("syncInterval", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimitPerMinute">Rate Limit (requests/minute)</Label>
                  <Input
                    id="rateLimitPerMinute"
                    type="number"
                    min="100"
                    max="10000"
                    value={settings.rateLimitPerMinute}
                    onChange={(e) => handleSettingChange("rateLimitPerMinute", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>Configure system performance and resource settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cache Enabled</Label>
                    <p className="text-sm text-muted-foreground">Enable system-wide caching</p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => handleSettingChange("cacheEnabled", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cacheTTL">Cache TTL (seconds)</Label>
                  <Input
                    id="cacheTTL"
                    type="number"
                    min="300"
                    max="86400"
                    value={settings.cacheTTL}
                    onChange={(e) => handleSettingChange("cacheTTL", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxConcurrentUsers">Max Concurrent Users</Label>
                  <Input
                    id="maxConcurrentUsers"
                    type="number"
                    min="10"
                    max="1000"
                    value={settings.maxConcurrentUsers}
                    onChange={(e) => handleSettingChange("maxConcurrentUsers", Number.parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database & Logging
                </CardTitle>
                <CardDescription>Configure database and logging settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="databasePoolSize">Database Pool Size</Label>
                  <Input
                    id="databasePoolSize"
                    type="number"
                    min="5"
                    max="100"
                    value={settings.databasePoolSize}
                    onChange={(e) => handleSettingChange("databasePoolSize", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange("logLevel", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Metrics Enabled</Label>
                    <p className="text-sm text-muted-foreground">Collect system performance metrics</p>
                  </div>
                  <Switch
                    checked={settings.metricsEnabled}
                    onCheckedChange={(checked) => handleSettingChange("metricsEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Management
                </CardTitle>
                <CardDescription>Create and manage system backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={() => setShowBackupDialog(true)} className="flex-1">
                    <Database className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                  <Button variant="outline" onClick={() => setShowRestoreDialog(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Automatic Backup Schedule</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily at 2:00 AM</SelectItem>
                      <SelectItem value="weekly">Weekly on Sunday</SelectItem>
                      <SelectItem value="monthly">Monthly on 1st</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Backup Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Backups are encrypted and stored securely</li>
                    <li>• Keep at least 3 recent backups</li>
                    <li>• Test restore process regularly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Backups
                </CardTitle>
                <CardDescription>View and manage existing backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeBackups.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{backup.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{backup.size}</span>
                          <span>{backup.date}</span>
                          <Badge variant={backup.type === "automatic" ? "default" : "secondary"}>{backup.type}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteBackup(backup.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Backup Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create System Backup</DialogTitle>
            <DialogDescription>Create a complete backup of your Section 3 compliance system data</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• This process may take several minutes</li>
                <li>• System performance may be affected during backup</li>
                <li>• Ensure sufficient storage space is available</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createBackup}>
              <Database className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Settings to Defaults</DialogTitle>
            <DialogDescription>
              This will reset all system settings to their default values. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">⚠️ Warning</h4>
            <p className="text-sm text-red-700">
              All custom configurations will be lost. Make sure you have a backup before proceeding.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={resetSettings}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
