"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowRight, BarChart3, TrendingUp, FileText, Target, Database, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Dashboards",
      description: "Interactive dashboards with live compliance metrics, performance indicators, and trend analysis.",
    },
    {
      icon: FileText,
      title: "Automated HUD Reports",
      description: "Generate HUD-compliant reports automatically with accurate data and professional formatting.",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Deep insights into contractor performance, worker productivity, and compliance trends.",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Monitor progress toward Section 3 goals with visual indicators and milestone tracking.",
    },
    {
      icon: Database,
      title: "Data Integration",
      description: "Seamlessly integrate data from multiple sources for comprehensive reporting and analysis.",
    },
    {
      icon: Calendar,
      title: "Scheduled Reports",
      description: "Automatically generate and distribute reports on custom schedules to stakeholders.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
              📊 Analytics & Reporting
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Analytics & Reporting
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Powerful analytics and automated reporting capabilities that provide deep insights into your Section 3
              compliance performance and help you make data-driven decisions.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Analytics & Reporting Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced analytics tools that transform your Section 3 data into actionable insights.
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
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100 mb-6">Report Types</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-blue-100 text-sm">HUD Compliant</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Real-time</div>
                    <div className="text-blue-100 text-sm">Data Updates</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Data-Driven Decisions</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Automated HUD Reporting</h3>
                    <p className="text-gray-600">
                      Generate all required HUD reports automatically with accurate data and professional formatting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Real-time Performance Monitoring</h3>
                    <p className="text-gray-600">
                      Monitor compliance performance in real-time with interactive dashboards and instant alerts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
                    <p className="text-gray-600">
                      Identify trends and predict compliance issues before they occur with advanced analytics.
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Transform your Section 3 data into actionable insights with our powerful analytics platform.
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
