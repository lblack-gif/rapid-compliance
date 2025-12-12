"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import {
  Users,
  Mail,
  Linkedin,
  Twitter,
  ArrowRight,
  Award,
  Building2,
  Code,
  Shield,
  TrendingUp,
  Heart,
  Globe,
  Briefcase,
} from "lucide-react"

export default function TeamPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)

  const leadership = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former HUD compliance officer with 15+ years in affordable housing. Led Section 3 initiatives for major housing authorities across the East Coast. Sarah holds an MBA from Georgetown and is a certified housing professional.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#",
      email: "sarah@rapidcompliance.com",
      expertise: ["Section 3 Compliance", "Housing Policy", "Strategic Leadership", "Community Development"],
      achievements: [
        "Led Section 3 programs managing $500M+ in HUD contracts",
        "Developed compliance frameworks adopted by 50+ housing authorities",
        "Speaker at National Association of Housing and Redevelopment Officials",
      ],
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Former Microsoft engineer specializing in AI and government systems. Built compliance platforms for Fortune 500 companies. Michael has a PhD in Computer Science from Stanford and 12+ years in enterprise software.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#",
      email: "michael@rapidcompliance.com",
      expertise: ["AI/Machine Learning", "Enterprise Architecture", "Government Systems", "Product Development"],
      achievements: [
        "Built AI systems processing 10M+ compliance documents annually",
        "Led engineering teams at Microsoft and Oracle",
        "Published 15+ papers on AI applications in government",
      ],
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "VP of Compliance",
      bio: "PhD in Public Policy from Harvard, former HUD regional administrator. Expert in Section 3 regulations and workforce development with 20+ years of experience in federal housing programs.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#",
      email: "maria@rapidcompliance.com",
      expertise: ["HUD Regulations", "Policy Analysis", "Workforce Development", "Federal Compliance"],
      achievements: [
        "Administered $2B+ in HUD programs as Regional Administrator",
        "Authored HUD guidance documents on Section 3 implementation",
        "Testified before Congress on affordable housing policy",
      ],
    },
  ]

  const team = [
    {
      name: "David Thompson",
      role: "VP of Engineering",
      department: "Engineering",
      bio: "15+ years building enterprise software. Previously led engineering teams at Salesforce and Oracle, specializing in scalable cloud platforms.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "david@rapidcompliance.com",
    },
    {
      name: "Lisa Park",
      role: "VP of Customer Success",
      department: "Customer Success",
      bio: "Former housing authority director with deep expertise in Section 3 implementation and workforce development programs.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "lisa@rapidcompliance.com",
    },
    {
      name: "James Wilson",
      role: "VP of Sales",
      department: "Sales",
      bio: "20+ years in government technology sales. Helped 200+ housing authorities modernize their operations and compliance processes.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "james@rapidcompliance.com",
    },
    {
      name: "Dr. Angela Davis",
      role: "Director of Product",
      department: "Product",
      bio: "Former UX researcher at Google with expertise in government software design. PhD in Human-Computer Interaction from MIT.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "angela@rapidcompliance.com",
    },
    {
      name: "Robert Kim",
      role: "Director of Security",
      department: "Engineering",
      bio: "Cybersecurity expert with 12+ years protecting government and financial systems. Former NSA cybersecurity analyst.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "robert@rapidcompliance.com",
    },
    {
      name: "Jennifer Martinez",
      role: "Director of Marketing",
      department: "Marketing",
      bio: "Marketing leader with expertise in B2B SaaS and government markets. Former marketing director at Salesforce Government Cloud.",
      image: "/placeholder-user.jpg",
      linkedin: "#",
      email: "jennifer@rapidcompliance.com",
    },
  ]

  const advisors = [
    {
      name: "Hon. Shaun Donovan",
      role: "Strategic Advisor",
      bio: "Former HUD Secretary and OMB Director. Currently Senior Fellow at NYU Wagner School of Public Service.",
      expertise: "Housing Policy & Federal Programs",
    },
    {
      name: "Dr. Rachel Bratt",
      role: "Policy Advisor",
      bio: "Professor Emeritus at Tufts University, leading expert on affordable housing and community development.",
      expertise: "Community Development & Housing Research",
    },
    {
      name: "Marcus Johnson",
      role: "Industry Advisor",
      bio: "Former Executive Director of National Association of Housing and Redevelopment Officials (NAHRO).",
      expertise: "Housing Authority Operations",
    },
  ]

  const companyStats = [
    {
      number: "45",
      label: "Team Members",
      description: "Across engineering, compliance, and customer success",
    },
    {
      number: "8",
      label: "Offices",
      description: "In major cities nationwide",
    },
    {
      number: "15+",
      label: "Years Experience",
      description: "Average team experience in housing/compliance",
    },
    {
      number: "500+",
      label: "Customers Served",
      description: "Housing authorities nationwide",
    },
  ]

  const departments = [
    {
      name: "Engineering",
      icon: Code,
      description: "Building scalable, secure platforms for compliance management",
      teamSize: 18,
    },
    {
      name: "Compliance",
      icon: Shield,
      description: "Ensuring our platform meets all HUD requirements and best practices",
      teamSize: 8,
    },
    {
      name: "Customer Success",
      icon: Heart,
      description: "Supporting housing authorities in achieving their Section 3 goals",
      teamSize: 12,
    },
    {
      name: "Sales & Marketing",
      icon: TrendingUp,
      description: "Connecting with housing authorities and sharing our mission",
      teamSize: 7,
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
                👥 Meet Our Team
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                The People Behind{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Rapid Compliance
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                We're a diverse team of housing experts, technologists, and community advocates united by our mission to
                transform Section 3 compliance and create economic opportunities for low-income residents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                  asChild
                >
                  <a href="/about/careers">
                    Join Our Team
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-gray-300 hover:border-blue-600 font-semibold text-base sm:text-lg bg-transparent"
                  onClick={() => setShowTrialModal(true)}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry veterans with deep expertise in housing policy, technology, and community development
              </p>
            </div>

            <div className="space-y-12">
              {leadership.map((leader, index) => (
                <Card key={index} className="border-0 shadow-xl overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-2 p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                          <span className="text-2xl sm:text-3xl font-bold text-white">
                            {leader.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                          <p className="text-blue-600 font-medium mb-4">{leader.role}</p>
                          <p className="text-gray-600 mb-6 leading-relaxed">{leader.bio}</p>

                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {leader.expertise.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                            <ul className="space-y-2">
                              {leader.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Award className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <Button variant="outline" size="sm" className="bg-transparent" asChild>
                              <a href={leader.email}>
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent" asChild>
                              <a href={leader.linkedin}>
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent" asChild>
                              <a href={leader.twitter}>
                                <Twitter className="h-4 w-4 mr-2" />
                                Twitter
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-green-600 p-6 sm:p-8 text-white lg:flex lg:items-center lg:justify-center">
                      <div className="text-center">
                        <Building2 className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <h4 className="text-xl font-bold mb-2">Leadership Excellence</h4>
                        <p className="text-sm opacity-90">
                          Bringing decades of experience in housing policy, technology, and community development to
                          transform Section 3 compliance.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Departments</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cross-functional teams working together to deliver exceptional Section 3 compliance solutions
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {departments.map((dept, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <dept.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription className="text-sm">{dept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{dept.teamSize}</div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Talented professionals dedicated to making Section 3 compliance simple and effective
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm sm:text-base text-blue-600 font-medium mb-2">{member.role}</p>
                    <Badge variant="outline" className="mb-4 text-xs">
                      {member.department}
                    </Badge>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent" asChild>
                        <a href={member.email}>
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent" asChild>
                        <a href={member.linkedin}>
                          <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advisors */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advisory Board</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry leaders and policy experts who guide our strategic direction
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {advisors.map((advisor, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{advisor.name}</h3>
                    <p className="text-sm sm:text-base text-blue-600 font-medium mb-3">{advisor.role}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">{advisor.bio}</p>
                    <Badge variant="outline" className="text-xs">
                      {advisor.expertise}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              We're always looking for talented individuals who share our passion for community development and
              technology innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <a href="/about/careers">
                  View Open Positions
                  <Briefcase className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
                onClick={() => setShowTrialModal(true)}
              >
                Try Our Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
    </>
  )
}
