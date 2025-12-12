"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  MessageCircle,
  Play,
  CheckCircle,
  Clock,
  Award,
  Brain,
  AlertCircle,
  FileText,
  Video,
  Users,
} from "lucide-react"

export function TrainingSupport() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { id: 1, type: "ai", message: "Hello! I'm your Section 3 compliance assistant. How can I help you today?" },
    { id: 2, type: "user", message: "What are the current labor hour benchmarks?" },
    {
      id: 3,
      type: "ai",
      message:
        "Under HUD 24 CFR Part 75, recipients must ensure that 25% of the total labor hours are worked by Section 3 workers. For contracting, 5% of total dollar amount should go to Section 3 business concerns.",
    },
  ])

  const quickStartModules = [
    { id: "basics", title: "Section 3 Fundamentals", duration: "30 min", completed: true, progress: 100 },
    { id: "workers", title: "Worker Identification", duration: "25 min", completed: true, progress: 100 },
    { id: "contractors", title: "Contractor Requirements", duration: "35 min", completed: false, progress: 60 },
    { id: "reporting", title: "HUD Reporting Basics", duration: "20 min", completed: false, progress: 0 },
  ]

  const advancedModules = [
    { id: "audit", title: "Audit Preparation", duration: "45 min", completed: false, progress: 0 },
    { id: "compliance", title: "Advanced Compliance Strategies", duration: "60 min", completed: false, progress: 0 },
    { id: "analytics", title: "Performance Analytics", duration: "40 min", completed: false, progress: 0 },
    { id: "integration", title: "System Integration", duration: "50 min", completed: false, progress: 0 },
  ]

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = { id: chatHistory.length + 1, type: "user", message: chatMessage }
      setChatHistory([...chatHistory, newMessage])
      setChatMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatHistory.length + 2,
          type: "ai",
          message:
            "I understand your question about Section 3 compliance. Let me provide you with the most current guidance based on HUD regulations...",
        }
        setChatHistory((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Training & Support</h3>
          <p className="text-sm text-gray-600">AI-powered HUD guidance and comprehensive training modules</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Live Updates
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="quick-start" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quick-start" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Start</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced Training</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Learner Progress</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Smart Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-start" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Essential Section 3 Training
              </CardTitle>
              <CardDescription>
                Start with these fundamental modules to understand Section 3 requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {quickStartModules.map((module) => (
                  <Card key={module.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{module.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </div>
                        </div>
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Play className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full mt-3" variant={module.completed ? "outline" : "default"}>
                        {module.completed ? "Review" : "Continue"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HUD 24 CFR Part 75 Quick Reference</CardTitle>
              <CardDescription>Key compliance points and recent updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Labor Hour Benchmark</h4>
                  <p className="text-2xl font-bold text-blue-700">25%</p>
                  <p className="text-sm text-blue-600">Section 3 worker hours</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Contracting Benchmark</h4>
                  <p className="text-2xl font-bold text-green-700">5%</p>
                  <p className="text-sm text-green-600">Business concern contracts</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Threshold Amount</h4>
                  <p className="text-2xl font-bold text-purple-700">$200K</p>
                  <p className="text-sm text-purple-600">Project minimum</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Advanced Compliance Training
              </CardTitle>
              <CardDescription>Deep-dive modules for compliance professionals and auditors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {advancedModules.map((module) => (
                  <Card key={module.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{module.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </div>
                        </div>
                        <Badge variant="outline">Advanced</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        Start Module
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specialized Training Tracks</CardTitle>
              <CardDescription>Role-specific training paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-4 cursor-pointer hover:bg-gray-50">
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium mb-1">Housing Authority Staff</h4>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive compliance management</p>
                  <Badge variant="outline" className="text-xs">
                    6 modules
                  </Badge>
                </Card>
                <Card className="p-4 cursor-pointer hover:bg-gray-50">
                  <FileText className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium mb-1">Contractors</h4>
                  <p className="text-sm text-gray-600 mb-3">Action plans and reporting</p>
                  <Badge variant="outline" className="text-xs">
                    4 modules
                  </Badge>
                </Card>
                <Card className="p-4 cursor-pointer hover:bg-gray-50">
                  <Award className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium mb-1">Auditors</h4>
                  <p className="text-sm text-gray-600 mb-3">Audit procedures and documentation</p>
                  <Badge variant="outline" className="text-xs">
                    5 modules
                  </Badge>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Learning Progress Dashboard
              </CardTitle>
              <CardDescription>Track your training completion and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Modules Completed</h4>
                  <p className="text-3xl font-bold text-green-600">2</p>
                  <p className="text-sm text-gray-600">of 8 total</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Hours Trained</h4>
                  <p className="text-3xl font-bold text-blue-600">3.5</p>
                  <p className="text-sm text-gray-600">this month</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Certificates Earned</h4>
                  <p className="text-3xl font-bold text-purple-600">1</p>
                  <p className="text-sm text-gray-600">Section 3 Basics</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Next Milestone</h4>
                  <p className="text-3xl font-bold text-orange-600">75%</p>
                  <p className="text-sm text-gray-600">to certification</p>
                </Card>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Recent Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Section 3 Fundamentals Complete</p>
                      <p className="text-sm text-green-700">Earned certificate on January 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Worker Identification Mastery</p>
                      <p className="text-sm text-blue-700">100% quiz score achieved</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI-Powered Section 3 Assistant
              </CardTitle>
              <CardDescription>
                Get instant answers to HUD compliance questions with live regulatory updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScrollArea className="h-64 w-full border rounded-lg p-4">
                  <div className="space-y-3">
                    {chatHistory.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                            message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask about Section 3 compliance..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChatMessage("What are the current benchmarks?")}
                  >
                    Current Benchmarks
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setChatMessage("How do I prepare for an audit?")}>
                    Audit Preparation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChatMessage("Worker documentation requirements?")}
                  >
                    Documentation Help
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setChatMessage("Latest HUD updates?")}>
                    Recent Updates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Support Options</CardTitle>
              <CardDescription>Additional support channels when you need human assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button variant="outline" className="h-auto p-4 flex-col items-start bg-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="h-4 w-4" />
                    <span className="font-medium">Schedule Expert Call</span>
                  </div>
                  <p className="text-sm text-gray-600">1-on-1 consultation with Section 3 experts</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col items-start bg-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-medium">Live Chat Support</span>
                  </div>
                  <p className="text-sm text-gray-600">Real-time assistance during business hours</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
