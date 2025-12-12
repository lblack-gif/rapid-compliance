"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Chatbot } from "@/components/chatbot"
import {
  Shield,
  Users,
  Target,
  Heart,
  Zap,
  Building2,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Mail,
  Linkedin,
} from "lucide-react"

export default function AboutPage() {
  const [showChatbot, setShowChatbot] = useState(false)

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former HUD compliance officer with 15+ years in affordable housing. Led Section 3 initiatives for major housing authorities.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "sarah@rapidcompliance.net",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Former Microsoft engineer specializing in AI and government systems. Built compliance platforms for Fortune 500 companies.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "michael@rapidcompliance.net",
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "VP of Compliance",
      bio: "PhD in Public Policy, former HUD regional administrator. Expert in Section 3 regulations and workforce development.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "maria@rapidcompliance.net",
    },
    {
      name: "David Thompson",
      role: "VP of Engineering",
      bio: "15+ years building enterprise software. Previously led engineering teams at Salesforce and Oracle.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "david@rapidcompliance.net",
    },
    {
      name: "Lisa Park",
      role: "VP of Customer Success",
      bio: "Former housing authority director with deep expertise in Section 3 implementation and workforce development.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "lisa@rapidcompliance.net",
    },
    {
      name: "James Wilson",
      role: "VP of Sales",
      bio: "20+ years in government technology sales. Helped 200+ housing authorities modernize their operations.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "james@rapidcompliance.net",
    },
  ]

  const values = [
    {
      icon: Shield,
      title: "Compliance First",
      description:
        "Every feature is designed with HUD Section 3 requirements at its core. We ensure you never miss a deadline or requirement.",
    },
    {
      icon: Users,
      title: "People-Centered",
      description:
        "Section 3 is about creating opportunities for people. Our platform puts workers and communities at the center of everything.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We leverage cutting-edge AI and automation to eliminate manual work and reduce administrative burden by 80%.",
    },
    {
      icon: Heart,
      title: "Partnership",
      description: "We're not just a vendor - we're your compliance partner. Our success is measured by your success.",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description:
        "Our customers achieve 98.5% compliance rates on average. We're obsessed with delivering measurable outcomes.",
    },
    {
      icon: Building2,
      title: "Community Impact",
      description:
        "Every successful Section 3 program creates jobs and builds stronger communities. That's what drives us every day.",
    },
  ]

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description:
        "Started by former HUD compliance officers frustrated with manual processes and spreadsheet-based tracking.",
    },
    {
      year: "2020",
      title: "First Customers",
      description: "Launched with 5 pilot housing authorities. Achieved 95% compliance rates in first year.",
    },
    {
      year: "2021",
      title: "AI Integration",
      description:
        "Introduced AI-powered email triage and automated response generation. Reduced response times by 90%.",
    },
    {
      year: "2022",
      title: "100 Customers",
      description: "Reached 100 housing authorities nationwide. Launched contractor portal and mobile app.",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description: "Raised $15M Series A to accelerate product development and expand nationwide.",
    },
    {
      year: "2024",
      title: "500+ Customers",
      description:
        "Now serving 500+ housing authorities, tracking 50K+ workers, and processing millions in compliance data.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
            <Building2 className="h-4 w-4 mr-2" />
            About Rapid Compliance
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforming{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Section 3 Compliance
            </span>{" "}
            Nationwide
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make Section 3 compliance simple, efficient, and impactful. Our platform has helped
            500+ housing authorities create thousands of jobs and build stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
            >
              Join Our Mission
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-gray-300 hover:border-blue-600 font-semibold text-base sm:text-lg bg-transparent"
            >
              Meet Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { number: "500+", label: "Housing Authorities", icon: Building2 },
              { number: "50K+", label: "Workers Tracked", icon: Users },
              { number: "98.5%", label: "Compliance Rate", icon: CheckCircle },
              { number: "$2.1B", label: "Contract Value Managed", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-2xl sm:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              To eliminate the administrative burden of Section 3 compliance while maximizing employment opportunities
              for low-income residents. We believe technology should serve communities, not complicate their work.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Every day, housing authorities struggle with manual processes, spreadsheet tracking, and complex reporting
              requirements. Meanwhile, qualified workers miss opportunities because of inefficient systems. We're
              changing that.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Reduce administrative burden by 80%</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Increase worker placement rates by 40%</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Achieve 99%+ compliance rates consistently</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-6 sm:p-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  A future where every Section 3 eligible worker has access to meaningful employment opportunities, and
                  every housing authority can focus on building communities instead of managing compliance paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            From a small team with a big vision to the leading Section 3 compliance platform.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-green-600 rounded-full hidden md:block"></div>
          <div className="space-y-8 sm:space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} mb-4 md:mb-0`}
                >
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <Badge className="mb-3 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{milestone.description}</p>
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
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Industry experts, former housing authority leaders, and technology innovators working together to
              transform Section 3 compliance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg sm:text-2xl font-bold text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm sm:text-base text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" size="sm">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to Join Our Mission?</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a housing authority looking to streamline compliance or a talented professional wanting to
              make an impact, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-gray-300 hover:border-blue-600 font-semibold text-base sm:text-lg bg-transparent"
              >
                Contact Our Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Chatbot */}
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
