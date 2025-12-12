"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth"
import { TrialSignupModal } from "@/components/trial-signup-modal"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import {
  Users,
  Building2,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Clock,
  Award,
  RefreshCw,
  Play,
  Pause,
} from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  // Demo state
  const [showDemo, setShowDemo] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [demoProgress, setDemoProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(0.75) // default slower playback
  const TICK_MS = 250 // smoother tick

  const [demoData, setDemoData] = useState({
    workers: 1247,
    contractors: 156,
    complianceRate: 98.5,
    laborHours: 45892,
    activeProjects: 23,
    pendingActions: 12,
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, user, isLoading: authLoading } = useAuth()

  const demoSteps = [
    { title: "Dashboard Overview", description: "Real-time compliance monitoring and key metrics", duration: 3000 },
    { title: "Worker Management", description: "Track Section 3 workers and certifications", duration: 4000 },
    { title: "AI Email Processing", description: "Automated email triage and response generation", duration: 3500 },
    { title: "Contractor Tracking", description: "Monitor contractor compliance and action plans", duration: 4000 },
    { title: "Advanced Analytics", description: "Generate comprehensive compliance reports", duration: 3000 },
    { title: "Integration Hub", description: "Connect with HUD systems and payroll platforms", duration: 2500 },
  ] as const

  useEffect(() => {
    const _status = searchParams.get("status")
    // if (!authLoading && user) router.replace("/dashboard")
  }, [searchParams, user, authLoading, router])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isPlaying && showDemo) {
      interval = setInterval(() => {
        setDemoProgress((prev) => {
          const step = demoSteps[Math.max(0, Math.min(demoStep, demoSteps.length - 1))]
          if (!step) return prev
          const inc = (100 * TICK_MS) / (step.duration * speed)
          const next = prev + inc
          if (next >= 100) {
            if (demoStep < demoSteps.length - 1) {
              setDemoStep((s) => s + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return next
        })

        setDemoData((prev) => ({
          ...prev,
          workers: prev.workers + Math.floor(Math.random() * 3) - 1,
          laborHours: prev.laborHours + Math.floor(Math.random() * 50),
          complianceRate: Math.min(100, prev.complianceRate + (Math.random() - 0.5) * 0.1),
        }))
      }, TICK_MS)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, showDemo, demoStep, demoSteps, speed])

  const handleTrialSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setShowTrialModal(true)
  }

  const startDemo = () => {
    setShowDemo(true)
    setDemoStep(0)
    setDemoProgress(0)
    setIsPlaying(true)
  }

  const resetDemo = () => {
    setDemoStep(0)
    setDemoProgress(0)
    setIsPlaying(false)
  }

  const currentStep = demoSteps[Math.max(0, Math.min(demoStep, demoSteps.length - 1))]
  const safeProgress = Math.max(0, Math.min(100, demoProgress))

  const colorBg: Record<string, string> = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
    red: "bg-red-100",
    indigo: "bg-indigo-100",
  }
  const colorText: Record<string, string> = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
    indigo: "text-indigo-600",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Compliance Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Audit. Track. Win.
            </span>
            <br />
            Section 3 Compliance
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most powerful AI-driven platform for HUD Section 3 compliance. Automate audits, track performance in
            real-time, and win more contracts with 98% compliance rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg"
              onClick={startDemo}
            >
              Watch Demo
              <Play className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg"
              onClick={(e) => {
                e.preventDefault()
                handleTrialSignup()
              }}
            >
              Start Free Trial Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for Section 3 Success</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for housing authorities, contractors, and compliance teams.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Worker Management",
              description: "Track Section 3 workers, certifications, and history.",
              color: "blue",
            },
            {
              icon: Building2,
              title: "Contractor Tracking",
              description: "Monitor contractor compliance and performance.",
              color: "green",
            },
            {
              icon: FileText,
              title: "Action Plan Manager",
              description: "Streamline action plan submissions and approvals.",
              color: "purple",
            },
            {
              icon: BarChart3,
              title: "Advanced Analytics",
              description: "Generate compliance reports and insights for audits.",
              color: "orange",
            },
            {
              icon: Target,
              title: "Compliance Monitoring",
              description: "Real-time alerts to stay compliant.",
              color: "red",
            },
            { icon: Zap, title: "AI Email Triage", description: "Automate Section 3 communications.", color: "indigo" },
          ].map((f, i) => (
            <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className={`w-12 h-12 ${colorBg[f.color]} rounded-lg flex items-center justify-center mb-4`}>
                  <f.icon className={`h-6 w-6 ${colorText[f.color]}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Housing Authorities Nationwide</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands who rely on Rapid Compliance for Section 3 management.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "500+", label: "Housing Authorities", icon: Building2 },
              { num: "50K+", label: "Workers Tracked", icon: Users },
              { num: "99.8%", label: "Compliance Rate", icon: CheckCircle },
              { num: "80%", label: "Time Savings", icon: Clock },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{s.num}</div>
                <div className="text-blue-100">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Compliance Process?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join leading housing authorities who already streamlined their Section 3 compliance with our platform.
            </p>
            <form onSubmit={handleTrialSignup} className="max-w-md mx-auto mb-8">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button
                  type="submit"
                  className="h-12 px-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Start Free Trial
                </Button>
              </div>
            </form>
            <p className="text-sm text-gray-500">
              No credit card required • 14-day free trial • Setup in under 5 minutes
            </p>
          </CardContent>
        </Card>
      </section>

      {/* INTERACTIVE DEMO MODAL */}
      {showDemo && currentStep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900">Interactive Demo — Section 3 Compliance</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDemo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>

            {/* Progress + step pills */}
            <div className="p-2 bg-gray-50 border-b">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={safeProgress} className="h-2" />
                </div>
                <span className="text-sm text-gray-600 min-w-0">{Math.round(safeProgress)}%</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {demoSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDemoStep(index)
                      setDemoProgress(0)
                    }}
                    className={`text-xs px-2 py-1 rounded ${index === demoStep ? "bg-blue-100 text-blue-800" : index < demoStep ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{currentStep.title}</h4>
                <p className="text-gray-600">{currentStep.description}</p>
              </div>

              {/* Demo content based on current step */}
              {demoStep === 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Workers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">{demoData.workers.toLocaleString()}</div>
                      <p className="text-xs text-gray-500">Section 3 eligible</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Active Contractors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">{demoData.contractors}</div>
                      <p className="text-xs text-gray-500">Compliant status</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Compliance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">{demoData.complianceRate.toFixed(1)}%</div>
                      <p className="text-xs text-gray-500">Above target</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Labor Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">{demoData.laborHours.toLocaleString()}</div>
                      <p className="text-xs text-gray-500">This quarter</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {demoStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Worker Database</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Workers</span>
                            <span className="font-medium">{demoData.workers.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Section 3 Certified</span>
                            <span className="font-medium text-green-600">892</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Targeted Section 3</span>
                            <span className="font-medium text-blue-600">445</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Certifications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">HVAC</span>
                            <span className="font-medium">156</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Electrical</span>
                            <span className="font-medium">134</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Plumbing</span>
                            <span className="font-medium">98</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>New worker certified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Training completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Renewal pending</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {demoStep === 2 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        AI Email Processing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">Processed: Section 3 Worker Inquiry</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            "Hi, I'm interested in Section 3 opportunities for HVAC work..."
                          </p>
                          <div className="mt-2 text-xs text-green-600">
                            ✓ Auto-categorized • Response generated • Follow-up scheduled
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">Processed: Contractor Compliance Question</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            "What are the current Section 3 requirements for our project?"
                          </p>
                          <div className="mt-2 text-xs text-blue-600">
                            ✓ Compliance data attached • Sent to project manager
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {demoStep === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Contractor Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">ABC Construction</span>
                            <div className="flex items-center gap-2">
                              <Progress value={85} className="w-16" />
                              <span className="text-sm font-medium text-green-600">85%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Metro Builders</span>
                            <div className="flex items-center gap-2">
                              <Progress value={72} className="w-16" />
                              <span className="text-sm font-medium text-yellow-600">72%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Urban Development</span>
                            <div className="flex items-center gap-2">
                              <Progress value={91} className="w-16" />
                              <span className="text-sm font-medium text-green-600">91%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Action Plans</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Submitted</span>
                            <span className="font-medium">24</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Under Review</span>
                            <span className="font-medium text-yellow-600">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Approved</span>
                            <span className="font-medium text-green-600">16</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {demoStep === 4 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-500" />
                        Compliance Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">98.5%</div>
                          <p className="text-sm text-green-800">Overall Compliance</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">156</div>
                          <p className="text-sm text-blue-800">Active Projects</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">$2.1M</div>
                          <p className="text-sm text-purple-800">Contract Value</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {demoStep === 5 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-green-500" />
                        System Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">HUD Systems</span>
                            <Badge variant="secondary" className="ml-auto">
                              Connected
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">Payroll Systems</span>
                            <Badge variant="secondary" className="ml-auto">
                              Synced
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">Email Systems</span>
                            <Badge variant="secondary" className="ml-auto">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">Document Storage</span>
                            <Badge variant="secondary" className="ml-auto">
                              Secure
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Footer controls */}
            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" size="sm" onClick={resetDemo}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Speed:</span>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDemoStep(Math.max(0, demoStep - 1))}
                  disabled={demoStep === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDemoStep(Math.min(demoSteps.length - 1, demoStep + 1))}
                  disabled={demoStep === demoSteps.length - 1}
                >
                  Next
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={() => {
                    setShowDemo(false)
                    setShowTrialModal(true)
                  }}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRIAL MODAL + CHATBOT */}
      <TrialSignupModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      <Footer />
    </div>
  )
}
