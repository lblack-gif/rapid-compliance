"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Shield,
  Users,
  Building2,
  FileText,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Database,
  Bell,
  Settings,
} from "lucide-react"

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Users,
      title: "Worker Management",
      description:
        "Comprehensive tracking of Section 3 workers, certifications, and employment status with automated verification and compliance monitoring.",
      features: [
        "Worker certification tracking",
        "Employment status monitoring",
        "Training program management",
        "Automated compliance verification",
      ],
      href: "/features/workers",
    },
    {
      icon: Building2,
      title: "Contractor Portal",
      description:
        "Streamlined contractor onboarding, action plan management, and real-time compliance tracking for all your contractors.",
      features: [
        "Action plan submission",
        "Real-time compliance tracking",
        "Document management",
        "Performance analytics",
      ],
      href: "/features/contractors",
    },
    {
      icon: Zap,
      title: "AI Email Triage",
      description:
        "Intelligent email processing and automated responses for Section 3 inquiries, reducing manual workload by 80%.",
      features: [
        "Automated email classification",
        "Smart response generation",
        "Priority queue management",
        "Integration with existing systems",
      ],
      href: "/features/ai-triage",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description:
        "Comprehensive compliance analytics with automated HUD reporting capabilities and real-time performance insights.",
      features: ["Automated HUD reports", "Real-time dashboards", "Custom analytics", "Performance benchmarking"],
      href: "/features/analytics",
    },
  ]

  const additionalFeatures = [
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document storage with automated compliance document generation and version control.",
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description:
        "Real-time compliance monitoring with alerts and automated corrective actions to prevent violations.",
    },
    {
      icon: Clock,
      title: "Labor Hours Tracking",
      description: "Precise tracking of labor hours with automated Section 3 calculations and reporting.",
    },
    {
      icon: Target,
      title: "Goal Management",
      description: "Set and track Section 3 goals with automated progress monitoring and achievement alerts.",
    },
    {
      icon: Database,
      title: "System Integrations",
      description: "Seamless integration with HUD systems, payroll platforms, and existing compliance tools.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Intelligent notification system that alerts you to compliance issues before they become problems.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🚀 Complete Section 3 Management Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Section 3 Success
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything you need to manage HUD Section 3 compliance efficiently. From worker tracking to automated
              reporting, our platform handles every aspect of compliance management.
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

      {/* Core Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools designed specifically for Section 3 compliance management.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 group-hover:text-white group-hover:border-transparent transition-all bg-transparent"
                    asChild
                  >
                    <Link href={feature.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extended features that make our platform the most comprehensive Section 3 solution available.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for Section 3 compliance with deep understanding of HUD requirements.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Save 15+ Hours Weekly</h3>
              <p className="text-gray-600">
                Automate manual processes and reduce administrative overhead with intelligent automation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Compliance</h3>
              <p className="text-gray-600">Ensure perfect compliance with automated monitoring and real-time alerts.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Integration</h3>
              <p className="text-gray-600">Seamlessly integrate with your existing systems and workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of organizations already using our platform to streamline their Section 3 compliance.
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
