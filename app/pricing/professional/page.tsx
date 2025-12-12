"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Users, Building2, Zap, BarChart3, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"

export default function ProfessionalPlanPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const features = [
    "Up to 200 workers",
    "15 active contractors",
    "Advanced compliance monitoring",
    "AI email triage",
    "Weekly automated reports",
    "Priority support",
    "Custom integrations",
    "Advanced analytics",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-500 text-white px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Most Popular Plan
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Section 3 Management
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The most popular choice for mid-size organizations with advanced compliance needs and AI-powered automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg"
              onClick={() => setShowTrialModal(true)}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent" asChild>
              <a href="/contact">Contact Sales</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Plan Details */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pricing Card */}
          <Card className="shadow-xl border-2 border-blue-500">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold">Professional Plan</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Most popular for mid-size organizations</CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">$599</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">14-day free trial included</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Everything in Starter, plus:</h4>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={() => setShowTrialModal(true)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Features Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Features</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Email Triage</h3>
                    <p className="text-gray-600">Automatically process and respond to compliance inquiries</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
                    <p className="text-gray-600">Detailed insights and predictive compliance analytics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Integrations</h3>
                    <p className="text-gray-600">Connect with your existing systems and workflows</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Mid-Size Housing Authorities</h3>
                    <p className="text-gray-600">Organizations managing 50-200 Section 3 workers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Multiple Contractors</h3>
                    <p className="text-gray-600">Working with up to 15 active contractors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compare Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>$299/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Up to 50 workers</li>
                  <li>5 contractors</li>
                  <li>Basic tracking</li>
                  <li>Monthly reports</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Professional
                  <Badge className="bg-blue-500 text-white">Popular</Badge>
                </CardTitle>
                <CardDescription>$599/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Up to 200 workers</li>
                  <li>15 contractors</li>
                  <li>AI email triage</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>$1,299/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Unlimited workers</li>
                  <li>Unlimited contractors</li>
                  <li>Full automation</li>
                  <li>24/7 support</li>
                  <li>White-label options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
