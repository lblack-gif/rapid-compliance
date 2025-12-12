"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowRight, Mail, Bot, Clock, Target, BarChart3, Shield } from "lucide-react"

export default function AITriagePage() {
  const features = [
    {
      icon: Mail,
      title: "Smart Email Classification",
      description: "Automatically categorize incoming emails by priority, type, and required action using advanced AI.",
    },
    {
      icon: Bot,
      title: "Automated Responses",
      description: "Generate intelligent, contextual responses to common Section 3 inquiries and requests.",
    },
    {
      icon: Target,
      title: "Priority Queue Management",
      description: "Automatically prioritize emails based on urgency, compliance requirements, and deadlines.",
    },
    {
      icon: Clock,
      title: "24/7 Processing",
      description: "Round-the-clock email processing ensures no important communications are missed.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into email volume, response times, and communication patterns.",
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Automatically flag emails requiring compliance action or containing sensitive information.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
              ⚡ AI Email Triage
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Intelligent{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Email Automation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Reduce email workload by 80% with AI-powered email triage that automatically processes, categorizes, and
              responds to Section 3 communications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link href="/pricing">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent" asChild>
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Email Triage Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI capabilities that transform how you handle Section 3 communications.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Transform Email Management</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">80% Reduction in Manual Work</h3>
                    <p className="text-gray-600">
                      AI handles routine email processing, freeing your team to focus on high-value compliance
                      activities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Response Times</h3>
                    <p className="text-gray-600">
                      Automated responses ensure stakeholders receive immediate acknowledgment and information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Never Miss Important Communications</h3>
                    <p className="text-gray-600">
                      Intelligent prioritization ensures critical compliance communications are handled immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <div className="text-blue-100 mb-6">Emails Processed Monthly</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">80%</div>
                    <div className="text-blue-100 text-sm">Automated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">&lt; 1 min</div>
                    <div className="text-blue-100 text-sm">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Automate Your Email Workflow?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let AI handle your Section 3 communications while you focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/pricing">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
