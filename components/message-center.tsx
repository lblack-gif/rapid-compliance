"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  MessageSquare,
  Send,
  Search,
  Filter,
  Archive,
  Reply,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Mail,
} from "lucide-react"

interface Message {
  id: string
  from: string
  fromEmail: string
  to: string
  subject: string
  content: string
  timestamp: string
  status: "unread" | "read" | "replied" | "archived"
  priority: "low" | "normal" | "high" | "urgent"
  category: "compliance" | "general" | "support" | "contractor" | "worker"
  attachments?: number
}

export const getMessageCount = (messages: any[]) => messages.length

export function MessageCenter() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCompose, setShowCompose] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "MSG-001",
      from: "John Smith",
      fromEmail: "j.smith@metroconstruction.com",
      to: "admin@dcha.org",
      subject: "Section 3 Action Plan Submission - Metro Housing Development",
      content:
        "Dear DCHA Team,\n\nI am submitting our Section 3 Action Plan for the Metro Housing Development project. We have identified 15 Section 3 workers who will be employed on this project, representing 32% of our total workforce.\n\nPlease review the attached documentation and let me know if you need any additional information.\n\nBest regards,\nJohn Smith\nProject Manager",
      timestamp: "2024-01-15 14:30:00",
      status: "unread",
      priority: "high",
      category: "compliance",
      attachments: 3,
    },
    {
      id: "MSG-002",
      from: "Sarah Johnson",
      fromEmail: "sarah.j@dcelectric.com",
      to: "admin@dcha.org",
      subject: "Worker Verification Request",
      content:
        "Hello,\n\nI need assistance with verifying the Section 3 status for two of our workers. Could you please review their documentation and update their status in the system?\n\nWorker IDs: W-2024-089, W-2024-090\n\nThank you for your help.",
      timestamp: "2024-01-15 13:45:00",
      status: "read",
      priority: "normal",
      category: "worker",
      attachments: 2,
    },
    {
      id: "MSG-003",
      from: "System Administrator",
      fromEmail: "system@dcha.org",
      to: "admin@dcha.org",
      subject: "Monthly Compliance Report Available",
      content:
        "The monthly Section 3 compliance report for December 2024 has been generated and is ready for review.\n\nKey highlights:\n- Overall compliance rate: 92%\n- Total Section 3 workers: 147\n- Active contracts: 12\n\nPlease review and distribute as needed.",
      timestamp: "2024-01-15 12:00:00",
      status: "read",
      priority: "normal",
      category: "compliance",
    },
    {
      id: "MSG-004",
      from: "Michael Davis",
      fromEmail: "m.davis@capitalplumbing.com",
      to: "admin@dcha.org",
      subject: "Training Program Inquiry",
      content:
        "Hi there,\n\nWe're interested in enrolling some of our workers in Section 3 training programs. Could you provide information about upcoming training sessions and enrollment procedures?\n\nWe have 8 workers who would benefit from this training.\n\nThanks!",
      timestamp: "2024-01-15 11:20:00",
      status: "replied",
      priority: "low",
      category: "support",
    },
    {
      id: "MSG-005",
      from: "Lisa Chen",
      fromEmail: "l.chen@abcconstruction.com",
      to: "admin@dcha.org",
      subject: "URGENT: Compliance Issue - Senior Housing Project",
      content:
        "URGENT: We have identified a compliance issue with our Senior Housing project. Our current Section 3 percentage has dropped to 22%, below the required 25% threshold.\n\nWe need immediate guidance on corrective actions. Can we schedule a meeting this week?\n\nThis requires immediate attention to avoid contract penalties.",
      timestamp: "2024-01-15 10:15:00",
      status: "unread",
      priority: "urgent",
      category: "compliance",
      attachments: 1,
    },
  ])

  // Compose form state
  const [composeForm, setComposeForm] = useState({
    to: "",
    subject: "",
    content: "",
    priority: "normal" as const,
    category: "general" as const,
  })

  // Reply form state
  const [replyForm, setReplyForm] = useState({
    content: "",
  })

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSelectedMessage = () => {
    return messages.find((m) => m.id === selectedMessage)
  }

  const handleCompose = () => {
    setShowCompose(true)
    setComposeForm({
      to: "",
      subject: "",
      content: "",
      priority: "normal",
      category: "general",
    })
  }

  const handleSendMessage = () => {
    if (!composeForm.to || !composeForm.subject || !composeForm.content) {
      alert("Please fill in all required fields")
      return
    }

    const newMessage: Message = {
      id: `MSG-${Date.now()}`,
      from: "DCHA Admin",
      fromEmail: "admin@dcha.org",
      to: composeForm.to,
      subject: composeForm.subject,
      content: composeForm.content,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      status: "read",
      priority: composeForm.priority,
      category: composeForm.category,
    }

    setMessages([newMessage, ...messages])
    setShowCompose(false)
    setSelectedMessage(newMessage.id)
    alert("✅ Message sent successfully!")
  }

  const handleReply = () => {
    const originalMessage = getSelectedMessage()
    if (!originalMessage || !replyForm.content) {
      alert("Please enter a reply message")
      return
    }

    const replyMessage: Message = {
      id: `MSG-${Date.now()}`,
      from: "DCHA Admin",
      fromEmail: "admin@dcha.org",
      to: originalMessage.fromEmail,
      subject: `Re: ${originalMessage.subject}`,
      content: replyForm.content,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      status: "read",
      priority: originalMessage.priority,
      category: originalMessage.category,
    }

    setMessages([replyMessage, ...messages])

    // Update original message status
    setMessages((prev) =>
      prev.map((msg) => (msg.id === originalMessage.id ? { ...msg, status: "replied" as const } : msg)),
    )

    setShowReply(false)
    setReplyForm({ content: "" })
    setSelectedMessage(replyMessage.id)
    alert("✅ Reply sent successfully!")
  }

  const handleArchiveMessage = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status: "archived" as const } : msg)))

    if (selectedMessage === messageId) {
      setSelectedMessage(null)
    }
    alert("✅ Message archived")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Mail className="h-4 w-4 text-blue-600" />
      case "read":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "replied":
        return <Reply className="h-4 w-4 text-purple-600" />
      case "archived":
        return <Archive className="h-4 w-4 text-gray-600" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    urgent: messages.filter((m) => m.priority === "urgent").length,
    compliance: messages.filter((m) => m.category === "compliance").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Center</h1>
          <p className="text-gray-600">Centralized communication hub for Section 3 compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" onClick={handleCompose}>
            <Send className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.compliance}</div>
            <p className="text-xs text-muted-foreground">Related messages</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Messages</CardTitle>
                <Badge variant="secondary">{filteredMessages.length}</Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      selectedMessage === message.id
                        ? "bg-blue-50 border-l-blue-500"
                        : message.status === "unread"
                          ? "border-l-blue-300"
                          : "border-l-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {message.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-semibold text-sm ${message.status === "unread" ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {message.from}
                          </span>
                          {getStatusIcon(message.status)}
                        </div>
                        <p className={`text-sm truncate ${message.status === "unread" ? "font-medium" : ""}`}>
                          {message.subject}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                          <span className="text-xs text-gray-500">{message.timestamp.split(" ")[1]}</span>
                          {message.attachments && (
                            <span className="text-xs text-gray-500">📎 {message.attachments}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {getSelectedMessage()
                          ?.from.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{getSelectedMessage()?.subject}</h3>
                      <p className="text-sm text-gray-600">
                        From: {getSelectedMessage()?.from} &lt;{getSelectedMessage()?.fromEmail}&gt;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(getSelectedMessage()?.priority || "normal")}>
                      {getSelectedMessage()?.priority}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setShowReply(true)}>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleArchiveMessage(selectedMessage)}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getSelectedMessage()?.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {getSelectedMessage()?.category}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm bg-gray-50 p-4 rounded-lg">
                      {getSelectedMessage()?.content}
                    </pre>
                  </div>
                  {getSelectedMessage()?.attachments && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Attachments ({getSelectedMessage()?.attachments})</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline">
                          📄 Section3_ActionPlan_Metro.pdf
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline">
                          📊 Worker_Verification_Forms.xlsx
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view its contents</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Compose Dialog */}
      <Dialog open={showCompose} onOpenChange={setShowCompose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose New Message</DialogTitle>
            <DialogDescription>Send a new message to contractors, workers, or team members</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="to">To *</Label>
                <Input
                  id="to"
                  value={composeForm.to}
                  onChange={(e) => setComposeForm({ ...composeForm, to: e.target.value })}
                  placeholder="recipient@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={composeForm.priority}
                  onValueChange={(value: any) => setComposeForm({ ...composeForm, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={composeForm.subject}
                  onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                  placeholder="Enter message subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={composeForm.category}
                  onValueChange={(value: any) => setComposeForm({ ...composeForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message *</Label>
              <Textarea
                id="content"
                value={composeForm.content}
                onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                placeholder="Type your message here..."
                rows={8}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompose(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReply} onOpenChange={setShowReply}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>Replying to: {getSelectedMessage()?.subject}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Original Message:</h4>
              <p className="text-sm text-gray-600 line-clamp-3">{getSelectedMessage()?.content}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reply-content">Your Reply *</Label>
              <Textarea
                id="reply-content"
                value={replyForm.content}
                onChange={(e) => setReplyForm({ content: e.target.value })}
                placeholder="Type your reply here..."
                rows={6}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReply(false)}>
              Cancel
            </Button>
            <Button onClick={handleReply}>
              <Reply className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
