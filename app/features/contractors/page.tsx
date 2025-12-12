"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowRight, FileText, BarChart3, Clock, Target, Bell, Upload } from "lucide-react"

export default function ContractorPortalPage() {
  const features = [
    {
      icon: FileText,
      title: "Action Plan Management",
      description:
        "Streamlined submission and tracking of Section 3 action plans with automated compliance verification.",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Real-time monitoring of contractor performance with detailed analytics and compliance metrics.",
    },
    {
      icon: Clock,
      title: "Labor Hours Reporting",
      description: "Automated tracking and reporting of Section 3 labor hours with real-time compliance calculations.",
    },
    {
      icon: Upload,
      title: "Document Submission",
      description: "Secure document upload and management system for all compliance-related documentation.",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Monitor progress toward Section 3 goals with automated alerts and performance insights.",
    },
    {
      icon: Bell,
      title: "Compliance Alerts",
      description: "Proactive notifications for deadlines, compliance issues, and required actions.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              🏗️ Contractor Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Contractor Portal
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamlined contractor onboarding, action plan management, and real-time compliance tracking for all your
              contractors.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contractor Portal Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything contractors need to manage their Section 3 compliance requirements.
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
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">265</div>
                <div className="text-blue-100 mb-6">Active Contractors</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-blue-100 text-sm">Compliance Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$45M</div>
                    <div className="text-blue-100 text-sm">Contract Value</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Empower Your Contractors</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Self-Service Portal</h3>
                    <p className="text-gray-600">
                      Contractors can manage their own compliance requirements, submit documents, and track progress
                      independently.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Real-time Collaboration</h3>
                    <p className="text-gray-600">
                      Seamless communication between housing authorities and contractors with instant notifications and
                      updates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Automated Compliance</h3>
                    <p className="text-gray-600">
                      Intelligent system automatically checks compliance status and alerts contractors to any issues or
                      requirements.
                    </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Streamline Contractor Management?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Give your contractors the tools they need to succeed with Section 3 compliance.
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
