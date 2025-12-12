"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"
import {
  Users,
  Building2,
  Globe,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Target,
  Zap,
  Shield,
  DollarSign,
} from "lucide-react"

export default function PartnersPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    companySize: "",
    description: "",
    experience: "",
    currentClients: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Partnership application submitted:", formData)
  }

  const partnershipTypes = [
    {
      type: "Technology Integration",
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      description: "Integrate your technology with our Section 3 compliance platform",
      benefits: [
        "API access and technical documentation",
        "Joint go-to-market opportunities",
        "Co-marketing and lead sharing",
        "Technical support and training",
      ],
      ideal: "Software companies, data providers, HR tech platforms",
    },
    {
      type: "Consulting & Services",
      icon: <Users className="h-8 w-8 text-green-600" />,
      description: "Provide Section 3 consulting services to our mutual customers",
      benefits: [
        "Referral program with competitive commissions",
        "Training and certification programs",
        "Marketing support and co-branding",
        "Access to our customer base",
      ],
      ideal: "Compliance consultants, workforce development organizations",
    },
    {
      type: "Channel Partner",
      icon: <Building2 className="h-8 w-8 text-purple-600" />,
      description: "Resell our platform to your existing customer network",
      benefits: [
        "Attractive partner pricing and margins",
        "Sales training and support",
        "Marketing materials and campaigns",
        "Dedicated partner success manager",
      ],
      ideal: "System integrators, government contractors, consultants",
    },
    {
      type: "Strategic Alliance",
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      description: "Long-term strategic partnership for market expansion",
      benefits: [
        "Joint product development opportunities",
        "Shared marketing and sales resources",
        "Executive-level partnership governance",
        "Exclusive market opportunities",
      ],
      ideal: "Large enterprises, industry associations, government agencies",
    },
  ]

  const partnerBenefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: "Revenue Growth",
      description: "Expand your revenue streams with our growing customer base and market demand",
    },
    {
      icon: <Target className="h-6 w-6 text-green-600" />,
      title: "Market Access",
      description: "Gain access to housing authorities and developers nationwide",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Competitive Advantage",
      description: "Differentiate your offerings with leading Section 3 compliance technology",
    },
    {
      icon: <Award className="h-6 w-6 text-orange-600" />,
      title: "Industry Recognition",
      description: "Partner with the recognized leader in Section 3 compliance management",
    },
  ]

  const currentPartners = [
    {
      name: "National Association of Housing Authorities",
      type: "Strategic Alliance",
      description: "Providing Section 3 training and resources to NAHA members nationwide",
    },
    {
      name: "WorkForce Solutions Inc.",
      type: "Consulting Partner",
      description: "Delivering comprehensive workforce development services to our customers",
    },
    {
      name: "GovTech Systems",
      type: "Technology Integration",
      description: "Integrated HR and payroll systems for seamless Section 3 tracking",
    },
    {
      name: "Compliance Experts LLC",
      type: "Channel Partner",
      description: "Reselling our platform to housing authorities in the Southeast region",
    },
  ]

  const requirements = [
    "Established business with relevant industry experience",
    "Strong reputation and customer references",
    "Commitment to customer success and support",
    "Alignment with our mission and values",
    "Technical capabilities (for technology partnerships)",
    "Adequate resources to support partnership goals",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            <Users className="h-4 w-4 mr-2" />
            Partnership Opportunities
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partner With{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Rapid Compliance
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our partner ecosystem and help transform Section 3 compliance for housing authorities nationwide. Grow
            your business while making a meaningful impact on communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Apply to Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent">
              Download Partner Guide
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Partnership Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Partnership Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((partnership, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {partnership.icon}
                    {partnership.type}
                  </CardTitle>
                  <CardDescription>{partnership.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Partner Benefits:</h4>
                      <ul className="space-y-1">
                        {partnership.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        <strong>Ideal for:</strong> {partnership.ideal}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Partner With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Current Partners</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                    <Badge variant="secondary">{partner.type}</Badge>
                  </div>
                  <p className="text-gray-600">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Partnership Application Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Partnership Application</CardTitle>
                <CardDescription>
                  Tell us about your organization and how you'd like to partner with us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="partnershipType">Partnership Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("partnershipType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology Integration</SelectItem>
                          <SelectItem value="consulting">Consulting & Services</SelectItem>
                          <SelectItem value="channel">Channel Partner</SelectItem>
                          <SelectItem value="strategic">Strategic Alliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select onValueChange={(value) => handleInputChange("companySize", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                          <SelectItem value="small">Small (11-50 employees)</SelectItem>
                          <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                          <SelectItem value="large">Large (200+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Company Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell us about your company, services, and target market..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="Describe your experience with Section 3, housing authorities, or related industries..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentClients">Current Client Base</Label>
                    <Textarea
                      id="currentClients"
                      value={formData.currentClients}
                      onChange={(e) => handleInputChange("currentClients", e.target.value)}
                      placeholder="Tell us about your current customers and market reach..."
                      rows={2}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-lg py-6">
                    Submit Partnership Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Requirements & Process */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Partnership Requirements</CardTitle>
                <CardDescription>What we look for in potential partners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partnership Process</CardTitle>
                <CardDescription>How we evaluate and onboard new partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Application Review</h4>
                      <p className="text-sm text-gray-600">We review your application within 5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Discovery Call</h4>
                      <p className="text-sm text-gray-600">30-minute call to discuss partnership opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Evaluation</h4>
                      <p className="text-sm text-gray-600">Technical and business evaluation process</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Agreement</h4>
                      <p className="text-sm text-gray-600">Partnership agreement and onboarding process</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner Support</CardTitle>
                <CardDescription>Resources available to our partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Competitive revenue sharing and commissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Dedicated partner success manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Training and certification programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <span className="text-sm">Marketing support and co-branding opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Partner With Us?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join our growing partner ecosystem and help transform Section 3 compliance while growing your business.
                Let's make a difference together.
              </p>
              <div className="space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Submit Application</Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Schedule Discussion
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
