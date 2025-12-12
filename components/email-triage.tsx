"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Zap, Brain, CheckCircle, Clock, AlertTriangle, Archive, Send, RefreshCw, Settings } from "lucide-react"

interface EmailItem {
  id: string
  from: string
  subject: string
  content: string
  timestamp: string
  priority: "low" | "medium" | "high" | "urgent"
  category: "compliance" | "general" | "support" | "contractor" | "worker" | "system"
  aiAnalysis: {
    sentiment: "positive" | "neutral" | "negative"
    urgency: number
    keywords: string[]
    suggestedAction: string
    confidence: number
  }
  status: "pending" | "processed" | "replied" | "archived"
  suggestedResponse?: string
}

export const getEmailCount = (emails: any[]) => emails.filter((e) => e.status === "pending").length

export function EmailTriage() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [processingMode, setProcessingMode] = useState<"manual" | "auto">("manual")
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processSettings, setProcessSettings] = useState({
    batchSize: 10,
    confidenceThreshold: 80,
    autoReply: false,
    categories: ["compliance", "support", "contractor"],
  })

  const [emails, setEmails] = useState<EmailItem[]>([
    {
      id: "EMAIL-001",
      from: "contractor@metroconstruction.com",
      subject: "Section 3 Worker Documentation Submission",
      content:
        "Dear DCHA Team,\n\nI am submitting the required documentation for our Section 3 workers on the Metro Housing Development project. We have successfully onboarded 12 new Section 3 qualified workers this month.\n\nPlease find attached:\n- Worker verification forms\n- Training certificates\n- Employment agreements\n\nLet me know if you need any additional information.\n\nBest regards,\nJohn Smith",
      timestamp: "2024-01-15 14:30:00",
      priority: "medium",
      category: "compliance",
      status: "pending",
      aiAnalysis: {
        sentiment: "positive",
        urgency: 6,
        keywords: ["Section 3", "documentation", "workers", "verification", "compliance"],
        suggestedAction: "Review and process worker documentation",
        confidence: 92,
      },
      suggestedResponse:
        "Thank you for submitting the Section 3 worker documentation. We will review the materials and update our records accordingly. You should receive confirmation within 2 business days.",
    },
    {
      id: "EMAIL-002",
      from: "urgent@abcconstruction.com",
      subject: "URGENT: Compliance Issue - Need Immediate Assistance",
      content:
        "URGENT MATTER:\n\nWe have a serious compliance issue on the Senior Housing project. Our Section 3 percentage has dropped to 18% due to unexpected worker departures. We need immediate guidance on corrective actions to avoid contract penalties.\n\nCan someone call me today? This is time-sensitive.\n\nMike Johnson\nProject Manager\n(202) 555-0123",
      timestamp: "2024-01-15 13:45:00",
      priority: "urgent",
      category: "compliance",
      status: "pending",
      aiAnalysis: {
        sentiment: "negative",
        urgency: 95,
        keywords: ["URGENT", "compliance issue", "penalties", "time-sensitive", "18%"],
        suggestedAction: "Immediate response required - schedule emergency consultation",
        confidence: 98,
      },
      suggestedResponse:
        "We understand the urgency of your compliance situation. I will have our compliance specialist contact you within the next hour to discuss immediate corrective actions. Please prepare your current worker roster and project timeline for review.",
    },
    {
      id: "EMAIL-003",
      from: "info@dcelectric.com",
      subject: "Monthly Progress Report - December 2024",
      content:
        "Hello,\n\nPlease find our monthly Section 3 progress report for December 2024:\n\n- Total workers: 28\n- Section 3 workers: 9 (32%)\n- New hires this month: 3\n- Training completions: 5\n\nWe're on track to meet our annual compliance targets. Thank you for your continued support.\n\nSarah Williams\nHR Director",
      timestamp: "2024-01-15 12:20:00",
      priority: "low",
      category: "compliance",
      status: "processed",
      aiAnalysis: {
        sentiment: "positive",
        urgency: 3,
        keywords: ["progress report", "32%", "compliance targets", "on track"],
        suggestedAction: "Acknowledge receipt and file report",
        confidence: 89,
      },
    },
    {
      id: "EMAIL-004",
      from: "training@capitalplumbing.com",
      subject: "Training Program Enrollment Request",
      content:
        "Hi there,\n\nWe would like to enroll 6 of our workers in the upcoming Section 3 training program. Could you please send us the enrollment forms and schedule?\n\nWorkers interested:\n- Robert Martinez\n- Lisa Chen\n- David Thompson\n- Maria Rodriguez\n- James Wilson\n- Ashley Davis\n\nThanks!\nTraining Coordinator",
      timestamp: "2024-01-15 11:15:00",
      priority: "medium",
      category: "support",
      status: "pending",
      aiAnalysis: {
        sentiment: "neutral",
        urgency: 4,
        keywords: ["training program", "enrollment", "6 workers", "forms", "schedule"],
        suggestedAction: "Send training enrollment package",
        confidence: 94,
      },
      suggestedResponse:
        "Thank you for your interest in our Section 3 training program. I'm attaching the enrollment forms and current schedule. The next session begins February 5th. Please submit completed forms by January 25th to secure spots for your workers.",
    },
  ])

  const handleProcessNew = async () => {
    setShowProcessDialog(true)
  }

  const executeProcessing = async () => {
    setIsProcessing(true)
    setShowProcessDialog(false)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate new mock emails
      const newEmails: EmailItem[] = [
        {
          id: `EMAIL-${Date.now()}-1`,
          from: "newcontractor@example.com",
          subject: "Section 3 Compliance Question",
          content: "I need clarification on the new Section 3 requirements for our upcoming project...",
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          priority: "medium",
          category: "compliance",
          status: "pending",
          aiAnalysis: {
            sentiment: "neutral",
            urgency: 5,
            keywords: ["Section 3", "requirements", "clarification"],
            suggestedAction: "Provide compliance guidance",
            confidence: 87,
          },
          suggestedResponse: "Thank you for your inquiry. Here are the current Section 3 requirements...",
        },
        {
          id: `EMAIL-${Date.now()}-2`,
          from: "worker@construction.com",
          subject: "Training Certificate Submission",
          content: "I have completed my Section 3 training and would like to submit my certificate...",
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          priority: "low",
          category: "worker",
          status: "pending",
          aiAnalysis: {
            sentiment: "positive",
            urgency: 3,
            keywords: ["training", "certificate", "completed"],
            suggestedAction: "Process certificate submission",
            confidence: 91,
          },
          suggestedResponse: "Congratulations on completing your training! Please submit your certificate...",
        },
      ]

      setEmails((prev) => [...newEmails, ...prev])
      alert(`✅ Processed ${newEmails.length} new emails successfully!`)
    } catch (error) {
      alert("❌ Error processing emails. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSendResponse = async (emailId: string) => {
    const email = emails.find((e) => e.id === emailId)
    if (!email) return

    try {
      // Simulate sending response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEmails((prev) => prev.map((e) => (e.id === emailId ? { ...e, status: "replied" as const } : e)))

      alert("✅ Response sent successfully!")
    } catch (error) {
      alert("❌ Error sending response. Please try again.")
    }
  }

  const getSelectedEmail = () => {
    return emails.find((e) => e.id === selectedEmail)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      case "neutral":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "processed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "replied":
        return <Send className="h-4 w-4 text-blue-600" />
      case "archived":
        return <Archive className="h-4 w-4 text-gray-600" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const stats = {
    total: emails.length,
    pending: emails.filter((e) => e.status === "pending").length,
    urgent: emails.filter((e) => e.priority === "urgent").length,
    avgConfidence: Math.round(emails.reduce((sum, e) => sum + e.aiAnalysis.confidence, 0) / emails.length),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Email Triage</h1>
          <p className="text-gray-600">Intelligent email processing and automated response suggestions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
          <Button size="sm" onClick={handleProcessNew} disabled={isProcessing}>
            {isProcessing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Process New
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">In queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.avgConfidence}%</div>
            <Progress value={stats.avgConfidence} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Email List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                AI Triage Queue
              </CardTitle>
              <CardDescription>Emails processed by AI for priority and content analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      selectedEmail === email.id
                        ? "bg-blue-50 border-l-blue-500"
                        : email.priority === "urgent"
                          ? "border-l-red-500"
                          : "border-l-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(email.status)}
                        <Brain className="h-3 w-3 text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-semibold text-sm ${email.status === "pending" ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {email.from.split("@")[0]}
                          </span>
                          <Badge className={getPriorityColor(email.priority)}>{email.priority}</Badge>
                        </div>
                        <p className={`text-sm truncate ${email.status === "pending" ? "font-medium" : ""}`}>
                          {email.subject}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs ${getSentimentColor(email.aiAnalysis.sentiment)}`}>
                            {email.aiAnalysis.sentiment}
                          </span>
                          <span className="text-xs text-gray-500">{email.aiAnalysis.confidence}% confidence</span>
                          <span className="text-xs text-gray-500">{email.timestamp.split(" ")[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Detail */}
        <div className="lg:col-span-2">
          {selectedEmail ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{getSelectedEmail()?.subject}</h3>
                      <p className="text-sm text-gray-600">From: {getSelectedEmail()?.from}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(getSelectedEmail()?.priority || "low")}>
                        {getSelectedEmail()?.priority}
                      </Badge>
                      {getStatusIcon(getSelectedEmail()?.status || "pending")}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm bg-gray-50 p-4 rounded-lg">
                        {getSelectedEmail()?.content}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Sentiment Analysis</h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${getSentimentColor(getSelectedEmail()?.aiAnalysis.sentiment || "neutral")}`}
                        >
                          {getSelectedEmail()?.aiAnalysis.sentiment}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({getSelectedEmail()?.aiAnalysis.confidence}% confidence)
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Urgency Score</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={getSelectedEmail()?.aiAnalysis.urgency || 0} className="flex-1" />
                        <span className="font-semibold">{getSelectedEmail()?.aiAnalysis.urgency}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedEmail()?.aiAnalysis.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Suggested Action</h4>
                    <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                      {getSelectedEmail()?.aiAnalysis.suggestedAction}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Response */}
              {getSelectedEmail()?.suggestedResponse && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      AI-Generated Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea value={getSelectedEmail()?.suggestedResponse} className="min-h-32" readOnly />
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => handleSendResponse(selectedEmail)}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Response
                      </Button>
                      <Button variant="outline">Edit & Send</Button>
                      <Button variant="outline">Generate New</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select an Email</h3>
                <p className="text-muted-foreground">
                  Choose an email from the triage queue to view AI analysis and suggestions
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Process New Emails Dialog */}
      <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Process New Emails</DialogTitle>
            <DialogDescription>Configure AI processing settings for incoming emails</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Batch Size</Label>
                <Input
                  type="number"
                  value={processSettings.batchSize}
                  onChange={(e) =>
                    setProcessSettings({ ...processSettings, batchSize: Number.parseInt(e.target.value) })
                  }
                  min="1"
                  max="50"
                />
              </div>
              <div className="space-y-2">
                <Label>Confidence Threshold (%)</Label>
                <Input
                  type="number"
                  value={processSettings.confidenceThreshold}
                  onChange={(e) =>
                    setProcessSettings({ ...processSettings, confidenceThreshold: Number.parseInt(e.target.value) })
                  }
                  min="50"
                  max="100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Processing Categories</Label>
              <div className="grid gap-2 md:grid-cols-2">
                {["compliance", "support", "contractor", "worker", "general"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={category}
                      checked={processSettings.categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProcessSettings({
                            ...processSettings,
                            categories: [...processSettings.categories, category],
                          })
                        } else {
                          setProcessSettings({
                            ...processSettings,
                            categories: processSettings.categories.filter((c) => c !== category),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={category} className="capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoReply"
                checked={processSettings.autoReply}
                onChange={(e) => setProcessSettings({ ...processSettings, autoReply: e.target.checked })}
              />
              <Label htmlFor="autoReply">Enable automatic replies for high-confidence responses</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProcessDialog(false)}>
              Cancel
            </Button>
            <Button onClick={executeProcessing}>
              <Brain className="h-4 w-4 mr-2" />
              Start Processing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
