"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import {
  Target,
  Heart,
  Users,
  Building2,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
  Globe,
  Award,
  Lightbulb,
  UserCheck,
} from "lucide-react"

export default function MissionPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)

  const missionPillars = [
    {
      icon: Target,
      title: "Simplify Compliance",
      description:
        "Transform complex Section 3 requirements into streamlined, automated processes that housing authorities can manage with confidence.",
      impact: "80% reduction in administrative burden",
    },
    {
      icon: Users,
      title: "Empower Communities",
      description:
        "Create meaningful employment opportunities for low-income residents through strategic workforce development and job placement programs.",
      impact: "50,000+ workers placed in quality jobs",
    },
    {
      icon: Building2,
      title: "Support Housing Authorities",
      description:
        "Provide housing authorities with the tools, expertise, and support they need to exceed their Section 3 goals and create lasting community impact.",
      impact: "500+ housing authorities served",
    },
    {
      icon: TrendingUp,
      title: "Drive Innovation",
      description:
        "Leverage cutting-edge technology and AI to continuously improve compliance processes and outcomes for all stakeholders.",
      impact: "98.5% average compliance rate achieved",
    },
  ]

  const coreValues = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "Every decision we make is guided by its impact on the communities we serve. We believe that successful Section 3 programs create ripple effects of positive change that extend far beyond individual job placements.",
      principles: [
        "Prioritize community needs in product development",
        "Measure success by community outcomes, not just compliance metrics",
        "Engage residents and local organizations in our design process",
        "Advocate for policies that strengthen community development",
      ],
    },
    {
      icon: Shield,
      title: "Integrity & Transparency",
      description:
        "We operate with complete transparency in our processes, pricing, and outcomes. Our commitment to integrity means we always do what's right for our customers and their communities, even when it's not the easiest path.",
      principles: [
        "Transparent pricing with no hidden fees",
        "Open communication about platform capabilities and limitations",
        "Honest reporting of outcomes and areas for improvement",
        "Ethical data handling and privacy protection",
      ],
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description:
        "We're constantly evolving our platform based on user feedback, regulatory changes, and emerging best practices. Innovation isn't just about technology—it's about finding better ways to serve our communities.",
      principles: [
        "Regular platform updates based on user feedback",
        "Investment in emerging technologies that benefit communities",
        "Collaboration with industry experts and thought leaders",
        "Commitment to staying ahead of regulatory changes",
      ],
    },
    {
      icon: UserCheck,
      title: "Partnership & Collaboration",
      description:
        "We believe the best outcomes come from working together. We partner with housing authorities, contractors, training providers, and community organizations to create comprehensive solutions.",
      principles: [
        "Build long-term relationships, not just transactions",
        "Collaborate with industry partners to expand opportunities",
        "Share knowledge and best practices across our network",
        "Support the broader affordable housing and workforce development ecosystem",
      ],
    },
  ]

  const impactMetrics = [
    {
      number: "500+",
      label: "Housing Authorities",
      description: "Across 45 states and territories",
    },
    {
      number: "50,000+",
      label: "Workers Placed",
      description: "In quality Section 3 jobs",
    },
    {
      number: "$2.1B",
      label: "Contract Value",
      description: "Managed through our platform",
    },
    {
      number: "98.5%",
      label: "Compliance Rate",
      description: "Average across all customers",
    },
    {
      number: "80%",
      label: "Time Savings",
      description: "Reduction in administrative work",
    },
    {
      number: "40%",
      label: "Better Outcomes",
      description: "Increase in worker placement rates",
    },
  ]

  const timeline = [
    {
      year: "2019",
      title: "The Problem Identified",
      description:
        "Our founders, former HUD compliance officers, experienced firsthand the challenges of managing Section 3 requirements with outdated tools and manual processes.",
    },
    {
      year: "2020",
      title: "Solution Development",
      description:
        "We began developing our platform with input from housing authorities, contractors, and community organizations to ensure we addressed real-world needs.",
    },
    {
      year: "2021",
      title: "First Customers",
      description:
        "Launched with 5 pilot housing authorities and achieved 95% compliance rates in our first year, proving the effectiveness of our approach.",
    },
    {
      year: "2022",
      title: "AI Integration",
      description:
        "Introduced AI-powered email triage and automated response generation, reducing response times by 90% and improving customer satisfaction.",
    },
    {
      year: "2023",
      title: "National Expansion",
      description:
        "Reached 100 housing authorities nationwide and launched our contractor portal and mobile app to serve the entire Section 3 ecosystem.",
    },
    {
      year: "2024",
      title: "Industry Leadership",
      description:
        "Now serving 500+ housing authorities with the most comprehensive Section 3 compliance platform, setting new standards for the industry.",
    },
  ]

  return (
    <>
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
                🎯 Our Mission & Values
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Building{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Stronger Communities
                </span>{" "}
                Through Technology
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to transform Section 3 compliance from a bureaucratic burden into a powerful tool for
                community development and economic opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                  onClick={() => setShowTrialModal(true)}
                >
                  Join Our Mission
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                  asChild
                >
                  <a href="/about/team">Meet Our Team</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 sm:p-12 border border-blue-100">
              <blockquote className="text-xl sm:text-2xl text-gray-800 leading-relaxed italic mb-6">
                "To eliminate the administrative burden of Section 3 compliance while maximizing employment
                opportunities for low-income residents, creating technology that serves communities and builds stronger,
                more equitable neighborhoods."
              </blockquote>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-gray-600 font-medium">— The Rapid Compliance Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Achieve Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Four key pillars guide our work and define our approach to Section 3 compliance
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {missionPillars.map((pillar, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <pillar.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{pillar.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{pillar.description}</p>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {pillar.impact}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These values shape our culture, guide our decisions, and define how we work with our customers and
                communities
              </p>
            </div>

            <div className="space-y-12">
              {coreValues.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-2 p-6 sm:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                          <value.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{value.description}</p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">How we live this value:</h4>
                        <ul className="space-y-2">
                          {value.principles.map((principle, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{principle}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-green-600 p-6 sm:p-8 text-white lg:flex lg:items-center lg:justify-center">
                      <div className="text-center">
                        <value.icon className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                        <p className="text-sm opacity-90">
                          This value is embedded in every aspect of our platform and customer relationships.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Measurable results that demonstrate our commitment to community development
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{metric.number}</div>
                  <div className="text-lg sm:text-xl font-semibold text-blue-100 mb-1">{metric.label}</div>
                  <div className="text-sm text-blue-200">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From identifying a critical need to becoming the industry leader in Section 3 compliance
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-green-600 rounded-full"></div>
              <div className="space-y-8 sm:space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} mb-4 md:mb-0`}
                    >
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                            {item.year}
                          </Badge>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="relative z-10 hidden md:block">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    <div className="w-full md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8 sm:p-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Whether you're a housing authority looking to transform your Section 3 program or a professional
                  passionate about community development, we'd love to work with you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                    onClick={() => setShowTrialModal(true)}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                    asChild
                  >
                    <a href="/about/careers">View Open Positions</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
    </>
  )
}
