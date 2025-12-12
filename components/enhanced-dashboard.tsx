"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  DollarSign,
  FileText,
  Home,
  Mail,
  Settings,
  Users,
  Zap,
  Shield,
  Target,
  Activity,
  Bell,
  User,
} from "lucide-react"

import { WorkersTab } from "./workers-tab"
import { ContractorsTab } from "./contractors-tab"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  variant?: "default" | "destructive" | "outline" | "secondary"
}

export function EnhancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalWorkers: 147,
    section3Workers: 89,
    targetedWorkers: 27,
    verifiedWorkers: 125,
    pendingVerification: 22,
    activeContracts: 12,
    complianceRate: 92,
    totalContractValue: 15200000,
  })

  const quickActions: QuickAction[] = [
    {
      id: "generate-report",
      title: "Generate Compliance Report",
      description: "Create monthly Section 3 compliance report",
      icon: FileText,
      action: () => {
        alert("Generating compliance report...")
        // In real app, this would trigger report generation
      },
    },
    {
      id: "verify-workers",
      title: "Verify Pending Workers",
      description: "Review and verify pending worker applications",
      icon: CheckCircle,
      action: () => {
        setActiveTab("workers")
        // In real app, this would filter to pending workers
      },
    },
    {
      id: "send-reminders",
      title: "Send Contractor Reminders",
      description: "Send Section 3 compliance reminders to contractors",
      icon: Mail,
      action: () => {
        alert("Sending reminders to contractors...")
        // In real app, this would send email reminders
      },
    },
    {
      id: "schedule-training",
      title: "Schedule Training Session",
      description: "Schedule Section 3 training for new workers",
      icon: Calendar,
      action: () => {
        alert("Opening training scheduler...")
        // In real app, this would open training scheduler
      },
    },
  ]

  const sidebarNavigation = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Overview",
          icon: Home,
          isActive: activeTab === "overview",
          onClick: () => setActiveTab("overview"),
        },
        {
          title: "Analytics",
          icon: BarChart3,
          isActive: activeTab === "analytics",
          onClick: () => setActiveTab("analytics"),
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Workers",
          icon: Users,
          isActive: activeTab === "workers",
          onClick: () => setActiveTab("workers"),
        },
        {
          title: "Contractors",
          icon: Building2,
          isActive: activeTab === "contractors",
          onClick: () => setActiveTab("contractors"),
        },
      ],
    },
    {
      title: "Compliance",
      items: [
        {
          title: "Reports",
          icon: FileText,
          isActive: activeTab === "reports",
          onClick: () => setActiveTab("reports"),
        },
        {
          title: "Monitoring",
          icon: Activity,
          isActive: activeTab === "monitoring",
          onClick: () => setActiveTab("monitoring"),
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          title: "Email Triage",
          icon: Mail,
          isActive: activeTab === "email",
          onClick: () => setActiveTab("email"),
        },
        {
          title: "Notifications",
          icon: Bell,
          isActive: activeTab === "notifications",
          onClick: () => setActiveTab("notifications"),
        },
      ],
    },
  ]

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWorkers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 3 Workers</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.section3Workers}</div>
            <Progress value={(stats.section3Workers / stats.totalWorkers) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.complianceRate}%</div>
            <p className="text-xs text-muted-foreground">Above 90% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contract Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalContractValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Active contracts</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => (
              <Card key={action.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                      <Button size="sm" variant={action.variant || "outline"} className="mt-3" onClick={action.action}>
                        Execute
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New worker verified",
                details: "Ashley Harris completed Section 3 verification",
                time: "2 hours ago",
                icon: CheckCircle,
                color: "text-green-600",
              },
              {
                action: "Contract updated",
                details: "DC Construction Partners increased Section 3 commitment",
                time: "4 hours ago",
                icon: Building2,
                color: "text-blue-600",
              },
              {
                action: "Report generated",
                details: "Monthly compliance report for November 2024",
                time: "1 day ago",
                icon: FileText,
                color: "text-purple-600",
              },
              {
                action: "Training scheduled",
                details: "Section 3 orientation for 12 new workers",
                time: "2 days ago",
                icon: Calendar,
                color: "text-orange-600",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                <item.icon className={`h-5 w-5 mt-0.5 ${item.color}`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.details}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlaceholderContent = (title: string, description: string) => (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Shield className="size-4" />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Section3AI</span>
                        <span className="truncate text-xs">Compliance System</span>
                      </div>
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    side="bottom"
                    sideOffset={4}
                  >
                    <DropdownMenuItem>
                      <span>System Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>User Management</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            {sidebarNavigation.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive} onClick={item.onClick}>
                          <button className="w-full">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <User className="h-4 w-4" />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Admin User</span>
                        <span className="truncate text-xs">admin@section3ai.com</span>
                      </div>
                      <ChevronDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuItem>
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Preferences</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-sidebar-border" />
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "workers" && "Worker Management"}
                  {activeTab === "contractors" && "Contractor Management"}
                  {activeTab === "analytics" && "Analytics"}
                  {activeTab === "reports" && "Compliance Reports"}
                  {activeTab === "monitoring" && "System Monitoring"}
                  {activeTab === "email" && "Email Triage"}
                  {activeTab === "notifications" && "Notifications"}
                </h1>
              </div>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {activeTab === "overview" && renderOverviewContent()}
            {activeTab === "workers" && <WorkersTab />}
            {activeTab === "contractors" && <ContractorsTab />}
            {activeTab === "analytics" &&
              renderPlaceholderContent("Analytics Dashboard", "Advanced analytics and reporting features coming soon")}
            {activeTab === "reports" &&
              renderPlaceholderContent("Compliance Reports", "Generate and manage compliance reports")}
            {activeTab === "monitoring" &&
              renderPlaceholderContent("System Monitoring", "Monitor system health and performance")}
            {activeTab === "email" &&
              renderPlaceholderContent("Email Triage", "AI-powered email processing and triage")}
            {activeTab === "notifications" &&
              renderPlaceholderContent("Notifications", "Manage system notifications and alerts")}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
