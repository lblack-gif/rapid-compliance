"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Zap,
  Shield,
  Award,
  Coffee,
  Laptop,
  Plane,
  GraduationCap,
  ArrowRight,
  Building2,
} from "lucide-react"

export default function CareersPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote / Washington, DC",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      description:
        "Join our engineering team to build the next generation of Section 3 compliance tools. You'll work on AI-powered features, data analytics, and scalable cloud infrastructure.",
      requirements: [
        "5+ years of full-stack development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Strong problem-solving and communication skills",
      ],
      preferred: [
        "Experience with AI/ML technologies",
        "Government or compliance software background",
        "Open source contributions",
      ],
    },
    {
      title: "Section 3 Compliance Specialist",
      department: "Customer Success",
      location: "Remote / Washington, DC",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      description:
        "Help our customers achieve Section 3 compliance success. You'll provide expert guidance, training, and support to housing authorities and developers nationwide.",
      requirements: [
        "3+ years of Section 3 compliance experience",
        "Strong knowledge of HUD regulations",
        "Excellent communication and training skills",
        "Experience with housing authorities or developers",
      ],
      preferred: [
        "Certified Section 3 Professional",
        "Experience with compliance software",
        "Public speaking experience",
      ],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / Washington, DC",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      description:
        "Drive product strategy and roadmap for our compliance platform. You'll work closely with customers, engineering, and design to deliver features that solve real compliance challenges.",
      requirements: [
        "4+ years of product management experience",
        "Experience with B2B SaaS products",
        "Strong analytical and strategic thinking",
        "Customer-focused mindset",
      ],
      preferred: [
        "Government or compliance industry experience",
        "Technical background",
        "Experience with AI/automation products",
      ],
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      salary: "$50,000 - $65,000 + Commission",
      description:
        "Generate and qualify leads for our sales team. You'll be the first point of contact for potential customers, helping them understand how we can solve their Section 3 challenges.",
      requirements: [
        "1-2 years of sales or customer-facing experience",
        "Strong communication and interpersonal skills",
        "Goal-oriented and self-motivated",
        "Comfortable with CRM and sales tools",
      ],
      preferred: ["Government or B2B sales experience", "Knowledge of housing industry", "College degree"],
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / Washington, DC",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      description:
        "Design intuitive and accessible interfaces for our compliance platform. You'll conduct user research, create wireframes and prototypes, and ensure our product is easy to use.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Strong portfolio demonstrating design process",
        "Experience with user research and testing",
      ],
      preferred: [
        "Experience with complex B2B applications",
        "Knowledge of accessibility standards",
        "Government or compliance software experience",
      ],
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      description:
        "Build and maintain our cloud infrastructure and deployment pipelines. You'll ensure our platform is secure, scalable, and reliable for our customers.",
      requirements: [
        "3+ years of DevOps/Infrastructure experience",
        "Experience with AWS, Docker, and Kubernetes",
        "Knowledge of CI/CD pipelines",
        "Strong scripting and automation skills",
      ],
      preferred: [
        "Security and compliance experience",
        "Infrastructure as Code (Terraform)",
        "Monitoring and observability tools",
      ],
    },
  ]

  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipend.",
    },
    {
      icon: <Plane className="h-6 w-6 text-blue-500" />,
      title: "Time Off",
      description: "Unlimited PTO policy, 12 company holidays, and sabbatical opportunities after 5 years.",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      title: "Financial Benefits",
      description: "Competitive salary, equity participation, 401(k) with company match, and performance bonuses.",
    },
    {
      icon: <Laptop className="h-6 w-6 text-purple-500" />,
      title: "Remote First",
      description: "Work from anywhere with home office stipend and co-working space allowance.",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-orange-500" />,
      title: "Learning & Development",
      description: "Annual learning budget, conference attendance, and internal training programs.",
    },
    {
      icon: <Coffee className="h-6 w-6 text-yellow-600" />,
      title: "Work-Life Balance",
      description: "Flexible hours, family leave policies, and company retreats and team building events.",
    },
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Mission-Driven",
      description: "We're passionate about creating economic opportunities for low-income communities.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Collaborative",
      description: "We believe the best solutions come from diverse perspectives working together.",
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Innovation",
      description: "We use cutting-edge technology to solve complex compliance challenges.",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Excellence",
      description: "We hold ourselves to the highest standards in everything we do.",
    },
  ]

  const departments = [
    { name: "Engineering", count: 8, description: "Build the platform that powers Section 3 compliance" },
    { name: "Product", count: 3, description: "Define and deliver features that solve customer problems" },
    { name: "Customer Success", count: 5, description: "Help customers achieve compliance success" },
    { name: "Sales & Marketing", count: 4, description: "Share our mission with housing authorities nationwide" },
    { name: "Operations", count: 3, description: "Support our team and scale our business" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            <Building2 className="h-4 w-4 mr-2" />
            Join Our Team
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Build the Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Section 3 Compliance
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join a mission-driven team that's transforming how housing authorities manage Section 3 compliance. Help us
            create more economic opportunities for low-income communities across America.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why Work Here */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Work at Rapid Compliance?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Open Positions</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All ({openPositions.length})</TabsTrigger>
              <TabsTrigger value="engineering">Engineering (2)</TabsTrigger>
              <TabsTrigger value="product">Product (1)</TabsTrigger>
              <TabsTrigger value="sales">Sales (1)</TabsTrigger>
              <TabsTrigger value="design">Design (1)</TabsTrigger>
              <TabsTrigger value="customer">Customer (1)</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="space-y-6">
                {openPositions.map((position, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{position.title}</CardTitle>
                          <CardDescription className="text-base mt-2">{position.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">{position.department}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {position.salary}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-sm text-gray-600 flex items-start">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Preferred</h4>
                          <ul className="space-y-2">
                            {position.preferred.map((pref, prefIndex) => (
                              <li key={prefIndex} className="text-sm text-gray-600 flex items-start">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {pref}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t">
                        <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would filter the positions by department */}
            <TabsContent value="engineering" className="mt-8">
              <div className="space-y-6">
                {openPositions
                  .filter((pos) => pos.department === "Engineering")
                  .map((position, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      {/* Same card structure as above */}
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-3">{dept.count}</div>
                  <p className="text-gray-600">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Hiring Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Application</h3>
              <p className="text-sm text-gray-600">Submit your application and we'll review it within 48 hours.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Screen</h3>
              <p className="text-sm text-gray-600">30-minute call to discuss your background and the role.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interviews</h3>
              <p className="text-sm text-gray-600">Meet with team members and demonstrate your skills.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Offer</h3>
              <p className="text-sm text-gray-600">Reference check and offer discussion with our team.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join our mission to transform Section 3 compliance and create more economic opportunities for low-income
                communities. We'd love to hear from you.
              </p>
              <div className="space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">View All Positions</Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Contact Our Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
