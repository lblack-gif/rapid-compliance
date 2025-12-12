"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Users, Building2, FileText, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"

export default function StarterPlanPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const features = [
    "Up to 50 workers",
    "5 active contractors",
    "Basic compliance tracking",
    "Monthly reports",
    "Email support",
    "Mobile app access",
  ]

  const limitations = ["Limited to 10 projects", "Basic analytics only", "No API access"]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            💼 Starter Plan
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Perfect for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Small Organizations
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get started with essential Section 3 compliance tools designed for small housing authorities and
            organizations.
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
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold">Starter Plan</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Perfect for small housing authorities</CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">$299</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">14-day free trial included</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {limitations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Limitations:</h4>
                  <ul className="space-y-3">
                    {limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-5 w-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                          <div className="h-1 w-3 bg-gray-400 rounded"></div>
                        </div>
                        <span className="text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Small Housing Authorities</h3>
                    <p className="text-gray-600">Organizations managing up to 50 Section 3 workers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Limited Contractor Network</h3>
                    <p className="text-gray-600">Working with up to 5 active contractors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Basic Reporting Needs</h3>
                    <p className="text-gray-600">Monthly compliance reports and basic tracking</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Included</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                    <p className="text-gray-600">Get help via email during business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Documentation Access</h3>
                    <p className="text-gray-600">Complete guides and tutorials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I upgrade to a higher plan later?",
                answer:
                  "Yes, you can upgrade to Professional or Enterprise plans at any time. We'll prorate the billing difference.",
              },
              {
                question: "What happens if I exceed the worker limit?",
                answer:
                  "We'll notify you when you approach the limit and help you upgrade to accommodate more workers.",
              },
              {
                question: "Is training included?",
                answer: "Yes, we provide onboarding training and access to our complete documentation library.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
