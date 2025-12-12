"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  TrendingUp,
  Shield,
  Clock,
  FileText,
  BarChart3,
  MessageSquare,
  Bell,
} from "lucide-react"
import { TrialSignupModal } from "@/components/trial-signup-modal"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export default function LandingPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            🚀 Trusted by 500+ Housing Authorities
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Automate Your <span className="text-blue-600">Section 3</span> Compliance
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The only AI-powered platform that handles email triage, contract analysis, worker tracking, and compliance
            reporting automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-8 py-4 text-lg" onClick={() => setShowTrialModal(true)}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Housing Authorities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Compliance Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">75%</div>
              <div className="text-gray-600">Time Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">$2M+</div>
              <div className="text-gray-600">Jobs Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Section 3 Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI agent handles the complex work so you can focus on creating opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI Email Triage</CardTitle>
                <CardDescription>
                  Automatically categorizes and prioritizes Section 3 emails, drafts responses, and escalates urgent
                  matters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Smart categorization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Auto-draft responses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Priority escalation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Contract Analysis</CardTitle>
                <CardDescription>
                  AI-powered contract ingestion that extracts key Section 3 requirements and tracks compliance
                  automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Requirement extraction
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Compliance tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Risk assessment
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Worker Management</CardTitle>
                <CardDescription>
                  Comprehensive tracking of Section 3 workers, labor hours, and benchmarks with real-time updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Worker database
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Hour tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Benchmark monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Automated Reporting</CardTitle>
                <CardDescription>
                  Generate HUD-compliant reports automatically with scheduled delivery and real-time compliance
                  dashboards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    HUD compliance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Scheduled delivery
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time dashboards
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Bell className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Smart Notifications</CardTitle>
                <CardDescription>
                  Proactive alerts for compliance deadlines, benchmark thresholds, and required follow-ups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Deadline alerts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Threshold monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Follow-up reminders
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>
                  Complete audit trail with document versioning, change tracking, and compliance history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Document versioning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Change tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Compliance history
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Transform Your Section 3 Operations</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Save 75% of Administrative Time</h3>
                    <p className="text-gray-600">
                      Automate routine tasks and focus on strategic initiatives that create real impact
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Achieve 98% Compliance Rate</h3>
                    <p className="text-gray-600">
                      Never miss a deadline or requirement with AI-powered monitoring and alerts
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Building className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Scale Your Impact</h3>
                    <p className="text-gray-600">
                      Handle more contracts and create more opportunities without increasing staff
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ROI Calculator</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Time Saved per Week</span>
                  <span className="font-semibold">30 hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Cost Savings per Year</span>
                  <span className="font-semibold text-green-600">$156,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Compliance Improvement</span>
                  <span className="font-semibold text-blue-600">+23%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">ROI in First Year</span>
                  <span className="font-semibold text-purple-600">312%</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg" onClick={() => setShowTrialModal(true)}>
                Calculate Your Savings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Housing Authorities Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              See how we're helping create opportunities and build stronger communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
                <p className="text-gray-600 mb-6">
                  "This platform transformed our Section 3 compliance. We went from struggling to meet benchmarks to
                  exceeding them consistently."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Director, Metro Housing Authority</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
                <p className="text-gray-600 mb-6">
                  "The AI email triage alone saves us 20 hours per week. Our team can now focus on what really matters -
                  creating jobs."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">Section 3 Coordinator, City Housing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Reporting used to take days. Now it's automated and always accurate. HUD audits are no longer
                  stressful."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Rodriguez</div>
                    <div className="text-sm text-gray-500">Compliance Manager, Regional HA</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Section 3 Compliance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 500+ housing authorities already using our platform to create opportunities and build stronger
            communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" onClick={() => setShowTrialModal(true)}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <TrialSignupModal open={showTrialModal} onOpenChange={setShowTrialModal} />
    </div>
  )
}
