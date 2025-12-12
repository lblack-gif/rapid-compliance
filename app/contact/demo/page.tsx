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
  Calendar,
  Clock,
  Users,
  Building2,
  CheckCircle,
  Play,
  Shield,
  BarChart3,
  Zap,
  FileText,
  ArrowRight,
} from "lucide-react"

export default function DemoPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    organizationType: "",
    currentChallenges: "",
    preferredDate: "",
    preferredTime: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Demo request submitted:", formData)
  }

  const demoFeatures = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Worker Management",
      description: "See how to track Section 3 workers, certifications, and employment outcomes in real-time.",
    },
    {
      icon: <Building2 className="h-6 w-6 text-green-600" />,
      title: "Contractor Portal",
      description: "Experience our contractor interface for submitting action plans and tracking compliance.",
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      title: "AI Email Triage",
      description: "Watch our AI automatically process and respond to Section 3 related emails.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      title: "Analytics Dashboard",
      description: "Explore comprehensive reporting and analytics for HUD compliance tracking.",
    },
    {
      icon: <FileText className="h-6 w-6 text-red-600" />,
      title: "Automated Reporting",
      description: "See how we generate HUD-compliant reports automatically from your data.",
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: "Compliance Monitoring",
      description: "Learn about our proactive compliance monitoring and alert systems.",
    },
  ]

  const demoProcess = [
    {
      step: "1",
      title: "Schedule Your Demo",
      description: "Choose a time that works for you and tell us about your specific needs.",
    },
    {
      step: "2",
      title: "Personalized Walkthrough",
      description: "Our expert will show you features most relevant to your organization.",
    },
    {
      step: "3",
      title: "Q&A Session",
      description: "Get answers to your specific questions about implementation and pricing.",
    },
    {
      step: "4",
      title: "Next Steps",
      description: "Receive a customized proposal and implementation timeline.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            <Play className="h-4 w-4 mr-2" />
            Live Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Rapid Compliance{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">in Action</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Schedule a personalized demo to see how our Section 3 compliance platform can transform your workflow and
            ensure 100% HUD compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              30-minute session
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              Tailored to your needs
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              No commitment required
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Demo Request Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Schedule Your Demo</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll contact you within 24 hours to schedule your personalized demo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

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

                  <div>
                    <Label htmlFor="organization">Organization Name *</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Your Role *</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        placeholder="e.g., Section 3 Coordinator"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="organizationType">Organization Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("organizationType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="housing-authority">Housing Authority</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="contractor">General Contractor</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currentChallenges">Current Section 3 Challenges</Label>
                    <Textarea
                      id="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                      placeholder="Tell us about your current Section 3 compliance challenges..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Select onValueChange={(value) => handleInputChange("preferredTime", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9am">9:00 AM</SelectItem>
                          <SelectItem value="10am">10:00 AM</SelectItem>
                          <SelectItem value="11am">11:00 AM</SelectItem>
                          <SelectItem value="1pm">1:00 PM</SelectItem>
                          <SelectItem value="2pm">2:00 PM</SelectItem>
                          <SelectItem value="3pm">3:00 PM</SelectItem>
                          <SelectItem value="4pm">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-lg py-6">
                    Schedule My Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* What You'll See */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll See in Your Demo</h2>
              <div className="space-y-4">
                {demoFeatures.map((feature, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Demo Process</h3>
              <div className="space-y-4">
                {demoProcess.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Schedule a Demo */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Schedule a Demo?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalized Experience</h3>
              <p className="text-sm text-gray-600">
                See exactly how our platform addresses your organization's specific Section 3 challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-sm text-gray-600">
                Get insights from our Section 3 compliance experts on best practices and implementation strategies.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">
                Choose a time that works for you, with demos available throughout the business day.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
