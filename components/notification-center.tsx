"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Search,
  Filter,
  Settings,
  Eye,
  Trash2,
  KanbanSquareDashed as MarkAsUnread,
  Mail,
  MessageSquare,
} from "lucide-react"

interface Notification {
  id: string
  type: "alert" | "reminder" | "update" | "system"
  title: string
  message: string
  priority: "high" | "medium" | "low"
  status: "unread" | "read" | "archived"
  createdAt: string
  relatedEntity?: {
    type: "contractor" | "worker" | "contract" | "report"
    id: string
    name: string
  }
}

const getNotificationCount = (notifications: Notification[]) => {
  return notifications.filter((n) => n.status === "unread").length
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showSendNotification, setShowSendNotification] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Live notification state
  const [unreadCount, setUnreadCount] = useState(0)
  const [lastNotificationCheck, setLastNotificationCheck] = useState(Date.now())

  // Send notification form state
  const [newNotification, setNewNotification] = useState({
    type: "alert" as const,
    title: "",
    message: "",
    priority: "medium" as const,
    recipients: [] as string[],
    sendMethod: "system" as "system" | "email" | "sms" | "all",
  })

  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    systemNotifications: true,
    alertSounds: true,
    autoMarkRead: false,
    digestFrequency: "daily" as "immediate" | "hourly" | "daily" | "weekly",
  })

  const recipients = [
    { id: "1", name: "John Smith", email: "john.smith@dcha.gov", role: "Compliance Manager" },
    { id: "2", name: "Sarah Johnson", email: "sarah.johnson@dcha.gov", role: "Project Manager" },
    { id: "3", name: "Michael Brown", email: "michael.brown@dcha.gov", role: "Contract Officer" },
    { id: "4", name: "Lisa Davis", email: "lisa.davis@dcha.gov", role: "Section 3 Coordinator" },
  ]

  useEffect(() => {
    loadNotifications()
  }, [])

  useEffect(() => {
    filterNotifications()
    updateUnreadCount()
  }, [notifications, searchTerm, filterType, filterStatus])

  const loadNotifications = async () => {
    setLoading(true)
    try {
      const mockNotifications = generateMockNotifications()
      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Error loading notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkForNewNotifications = async () => {
    // Simulate checking for new notifications
    const shouldAddNew = Math.random() > 0.8 // 20% chance of new notification

    if (shouldAddNew) {
      const newNotification = generateRandomNotification()
      setNotifications((prev) => [newNotification, ...prev])

      // Play notification sound if enabled
      if (notificationSettings.alertSounds) {
        playNotificationSound()
      }

      // Show browser notification if supported
      if (Notification.permission === "granted") {
        new Notification(newNotification.title, {
          body: newNotification.message,
          icon: "/rapid-compliance-logo.png",
        })
      }
    }

    setLastNotificationCheck(Date.now())
  }

  const generateRandomNotification = (): Notification => {
    const types = ["alert", "reminder", "update", "system"] as const
    const priorities = ["high", "medium", "low"] as const
    const contractors = ["Hamel Builders Inc.", "Turner Construction", "Clark Construction"]

    const type = types[Math.floor(Math.random() * types.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const contractor = contractors[Math.floor(Math.random() * contractors.length)]

    const messages = {
      alert: [
        `${contractor} has fallen below Section 3 compliance threshold`,
        `Missing documentation from ${contractor}`,
        `Urgent: Contract deadline approaching for ${contractor}`,
      ],
      reminder: [
        `Monthly report due from ${contractor} in 3 days`,
        `Section 3 worker certification renewal required`,
        `Quarterly review meeting scheduled`,
      ],
      update: [
        `New Section 3 worker verified for ${contractor}`,
        `Contract amendment approved`,
        `Compliance status updated`,
      ],
      system: [
        "System maintenance completed successfully",
        "New feature: Enhanced reporting dashboard",
        "Database backup completed",
      ],
    }

    const typeMessages = messages[type]
    const message = typeMessages[Math.floor(Math.random() * typeMessages.length)]

    return {
      id: `notif-${Date.now()}-${Math.random()}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${message.split(":")[0]}`,
      message,
      priority,
      status: "unread",
      createdAt: new Date().toISOString(),
      relatedEntity:
        type !== "system"
          ? {
              type: "contractor",
              id: `contractor-${Math.floor(Math.random() * 3) + 1}`,
              name: contractor,
            }
          : undefined,
    }
  }

  const playNotificationSound = () => {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const generateMockNotifications = (): Notification[] => {
    const notifications: Notification[] = [
      {
        id: "1",
        type: "alert",
        title: "Section 3 Compliance Alert",
        message: "Hamel Builders Inc. has fallen below the 25% Section 3 labor hour benchmark for November 2024.",
        priority: "high",
        status: "unread",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        relatedEntity: {
          type: "contractor",
          id: "contractor-1",
          name: "Hamel Builders Inc.",
        },
      },
      {
        id: "2",
        type: "reminder",
        title: "Monthly Report Due",
        message: "Turner Construction's Section 3 monthly report is due in 3 days.",
        priority: "medium",
        status: "unread",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        relatedEntity: {
          type: "contractor",
          id: "contractor-2",
          name: "Turner Construction",
        },
      },
      {
        id: "3",
        type: "update",
        title: "New Worker Verified",
        message: "Ashley Harris has been successfully verified as a Section 3 worker.",
        priority: "low",
        status: "read",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        relatedEntity: {
          type: "worker",
          id: "worker-123",
          name: "Ashley Harris",
        },
      },
      {
        id: "4",
        type: "alert",
        title: "Subcontracting Compliance Issue",
        message: "Clark Construction has not met the 10% Section 3 subcontracting requirement.",
        priority: "high",
        status: "unread",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        relatedEntity: {
          type: "contractor",
          id: "contractor-3",
          name: "Clark Construction",
        },
      },
      {
        id: "5",
        type: "system",
        title: "System Maintenance Complete",
        message: "Scheduled system maintenance has been completed successfully. All services are now operational.",
        priority: "low",
        status: "read",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
    ]

    return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const filterNotifications = () => {
    let filtered = notifications

    if (searchTerm) {
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.relatedEntity?.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((notification) => notification.type === filterType)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((notification) => notification.status === filterStatus)
    }

    setFilteredNotifications(filtered)
  }

  const updateUnreadCount = () => {
    const count = notifications.filter((n) => n.status === "unread").length
    setUnreadCount(count)
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, status: "read" as const } : n)))
  }

  const markAsUnread = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, status: "unread" as const } : n)))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, status: "read" as const })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "reminder":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "update":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "system":
        return <Settings className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
  }

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    alerts: notifications.filter((n) => n.type === "alert").length,
    highPriority: notifications.filter((n) => n.priority === "high").length,
  }

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  const handleSendNotification = () => {
    // Placeholder for sending notification logic
    console.log("Sending notification:", newNotification)
    setShowSendNotification(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Notification Center
            {unreadCount > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-gray-600">Manage alerts, reminders, and system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button onClick={() => setShowSendNotification(true)}>
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All notifications</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <MarkAsUnread className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.alerts}</div>
            <p className="text-xs text-muted-foreground">Active alerts</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.highPriority}</div>
            <p className="text-xs text-muted-foreground">Urgent items</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="alert">Alerts</SelectItem>
                <SelectItem value="reminder">Reminders</SelectItem>
                <SelectItem value="update">Updates</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark All Read
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Notifications
            {stats.total > 0 && (
              <Badge variant="outline" className="ml-2">
                {stats.total}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {stats.unread > 0 && (
              <Badge variant="destructive" className="ml-2">
                {stats.unread}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts
            {stats.alerts > 0 && (
              <Badge variant="secondary" className="ml-2">
                {stats.alerts}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Complete list of system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      notification.status === "unread" ? "bg-blue-50 border-blue-200" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${notification.status === "unread" ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h4>
                            {getPriorityBadge(notification.priority)}
                            {notification.status === "unread" && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formatTimeAgo(notification.createdAt)}</span>
                            {notification.relatedEntity && (
                              <span className="capitalize">
                                {notification.relatedEntity.type}: {notification.relatedEntity.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            notification.status === "unread"
                              ? markAsRead(notification.id)
                              : markAsUnread(notification.id)
                          }
                        >
                          {notification.status === "unread" ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <MarkAsUnread className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Notifications requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredNotifications
                  .filter((n) => n.status === "unread")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{notification.title}</h4>
                              {getPriorityBadge(notification.priority)}
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{formatTimeAgo(notification.createdAt)}</span>
                              {notification.relatedEntity && (
                                <span className="capitalize">
                                  {notification.relatedEntity.type}: {notification.relatedEntity.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>Critical alerts requiring immediate action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredNotifications
                  .filter((n) => n.type === "alert")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        notification.priority === "high" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <AlertTriangle
                            className={`h-4 w-4 ${notification.priority === "high" ? "text-red-500" : "text-yellow-500"}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${notification.status === "unread" ? "font-semibold" : ""}`}>
                                {notification.title}
                              </h4>
                              {getPriorityBadge(notification.priority)}
                              {notification.status === "unread" && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{formatTimeAgo(notification.createdAt)}</span>
                              {notification.relatedEntity && (
                                <span className="capitalize">
                                  {notification.relatedEntity.type}: {notification.relatedEntity.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              notification.status === "unread"
                                ? markAsRead(notification.id)
                                : markAsUnread(notification.id)
                            }
                          >
                            {notification.status === "unread" ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <MarkAsUnread className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Send Notification Dialog */}
      <Dialog open={showSendNotification} onOpenChange={setShowSendNotification}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>Create and send a notification to team members</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Notification Type</Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value: any) => setNewNotification({ ...newNotification, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newNotification.priority}
                  onValueChange={(value: any) => setNewNotification({ ...newNotification, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                placeholder="Enter notification title"
              />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                placeholder="Enter notification message"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Send Method</Label>
              <Select
                value={newNotification.sendMethod}
                onValueChange={(value: any) => setNewNotification({ ...newNotification, sendMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System Notification Only</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="all">All Methods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={recipient.id}
                      checked={newNotification.recipients.includes(recipient.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewNotification({
                            ...newNotification,
                            recipients: [...newNotification.recipients, recipient.id],
                          })
                        } else {
                          setNewNotification({
                            ...newNotification,
                            recipients: newNotification.recipients.filter((id) => id !== recipient.id),
                          })
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{recipient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {recipient.email} • {recipient.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{newNotification.recipients.length} recipients selected</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendNotification(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendNotification} disabled={!newNotification.title || !newNotification.message}>
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogDescription>Configure your notification preferences</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Notification Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>System Notifications</span>
                  </div>
                  <Checkbox
                    checked={notificationSettings.systemNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemNotifications: !!checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email Notifications</span>
                  </div>
                  <Checkbox
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: !!checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS Notifications</span>
                  </div>
                  <Checkbox
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: !!checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Alert Sounds</span>
                  <Checkbox
                    checked={notificationSettings.alertSounds}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, alertSounds: !!checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto-mark as Read</span>
                  <Checkbox
                    checked={notificationSettings.autoMarkRead}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, autoMarkRead: !!checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Digest Frequency</Label>
              <Select
                value={notificationSettings.digestFrequency}
                onValueChange={(value: any) =>
                  setNotificationSettings({ ...notificationSettings, digestFrequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowSettings(false)}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
