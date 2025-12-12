"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Shield, Users, Zap, Settings, Phone, Clock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"

export default function EnterprisePlanPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const features = [
    "Unlimited workers",
    "Unlimited contractors",
    "Full compliance automation",
    "AI-powered insights",
    "Real-time reporting",
    "24/7 dedicated support",
    "White-label options",
    "API access",
    "Custom workflows",
    "Advanced security",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-800">
            🏢 Enterprise Solution
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Compliance Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete Section 3 compliance solution for large organizations with unlimited scale and advanced
            customization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent" asChild>
              <a href="/contact">Contact Sales</a>
            </Button>
            <Button
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg"
              onClick={() => setShowTrialModal(true)}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Plan Details */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pricing Card */}
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold">Enterprise Plan</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                For large organizations with complex needs
              </CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">$1,299</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Custom pricing available</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Everything in Professional, plus:</h4>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="/contact">Contact Sales Team</a>
              </Button>
            </CardContent>
          </Card>

          {/* Features Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enterprise Features</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Security</h3>
                    <p className="text-gray-600">SOC 2 compliance, SSO, and enterprise-grade encryption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Workflows</h3>
                    <p className="text-gray-600">Tailored processes to match your organization's needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">White-Label Options</h3>
                    <p className="text-gray-600">Brand the platform with your organization's identity</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dedicated Support</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                    <p className="text-gray-600">Dedicated support team available around the clock</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customer Success Manager</h3>
                    <p className="text-gray-600">Dedicated CSM to ensure your success</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Priority Response</h3>
                    <p className="text-gray-600">Guaranteed response times for critical issues</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Enterprise?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Maximum Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enterprise-grade security with SOC 2 compliance, advanced encryption, and audit trails.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Unlimited Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No limits on workers, contractors, or projects. Scale as your organization grows.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Full Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Custom workflows, white-label options, and API access for complete integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Compliance?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact our enterprise team to discuss your specific requirements and get a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <a href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
              onClick={() => setShowTrialModal(true)}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
