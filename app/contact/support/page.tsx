"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  FileText,
  Video,
  Users,
  ArrowRight,
  Download,
  BookOpen,
  Zap,
  Shield,
} from "lucide-react"

export default function SupportPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    priority: "",
    category: "",
    subject: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        organization: "",
        priority: "",
        category: "",
        subject: "",
        description: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email with detailed responses",
      contact: "support@rapidcompliance.com",
      responseTime: "Within 4 hours",
      availability: "24/7",
      bestFor: "Technical issues, account questions, feature requests",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time chat with our support team",
      contact: "Available in-app",
      responseTime: "Immediate",
      availability: "Mon-Fri, 9AM-6PM EST",
      bestFor: "Quick questions, navigation help, general inquiries",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our compliance experts",
      contact: "(555) 123-4567",
      responseTime: "Immediate",
      availability: "Mon-Fri, 9AM-6PM EST",
      bestFor: "Urgent issues, complex problems, training sessions",
    },
    {
      icon: Video,
      title: "Screen Share Support",
      description: "One-on-one screen sharing sessions",
      contact: "Schedule via support portal",
      responseTime: "Same day",
      availability: "Mon-Fri, 9AM-5PM EST",
      bestFor: "Setup assistance, training, troubleshooting",
    },
  ]

  const faqCategories = [
    {
      category: "Getting Started",
      icon: Zap,
      faqs: [
        {
          question: "How do I set up my first Section 3 project?",
          answer:
            "Start by navigating to the Projects section and clicking 'New Project'. Our setup wizard will guide you through entering project details, setting Section 3 goals, and configuring contractor requirements. The process typically takes 10-15 minutes.",
        },
        {
          question: "What information do I need to get started?",
          answer:
            "You'll need basic project information (name, contract value, timeline), Section 3 goals, contractor details, and any existing worker or business data you want to import. Our platform can also start with minimal information and build your database over time.",
        },
        {
          question: "How long does implementation take?",
          answer:
            "Most housing authorities are fully operational within 2-3 weeks. This includes data migration, user training, and system configuration. We provide dedicated onboarding support to ensure a smooth transition.",
        },
      ],
    },
    {
      category: "Account & Billing",
      icon: Shield,
      faqs: [
        {
          question: "How do I upgrade or downgrade my plan?",
          answer:
            "You can change your plan anytime from the Account Settings page. Upgrades take effect immediately, while downgrades take effect at your next billing cycle. We'll prorate any billing adjustments automatically.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, ACH transfers, and can accommodate purchase orders for annual plans. All payments are processed securely through our encrypted payment system.",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer:
            "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. We also offer data export options to ensure you retain your compliance records.",
        },
      ],
    },
    {
      category: "Features & Functionality",
      icon: BookOpen,
      faqs: [
        {
          question: "How does the AI email triage work?",
          answer:
            "Our AI system automatically categorizes incoming Section 3 emails, identifies key information, and can generate draft responses based on your organization's policies. You maintain full control over all outgoing communications.",
        },
        {
          question: "Can I integrate with our existing systems?",
          answer:
            "Yes, we offer integrations with popular HRIS systems, accounting software, and project management tools. We also provide API access for custom integrations. Our team can help assess your specific integration needs.",
        },
        {
          question: "How do I generate HUD compliance reports?",
          answer:
            "Navigate to the Reports section and select 'HUD Compliance Report'. Choose your reporting period and the system will automatically generate a compliant report with all required data points. Reports can be exported in multiple formats.",
        },
      ],
    },
  ]

  const resources = [
    {
      title: "User Guide",
      description: "Complete guide to using all platform features",
      type: "PDF",
      icon: FileText,
      url: "#",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      type: "Video Library",
      icon: Video,
      url: "#",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      type: "Online Docs",
      icon: BookOpen,
      url: "#",
    },
    {
      title: "Best Practices Guide",
      description: "Section 3 compliance best practices",
      type: "PDF",
      icon: CheckCircle,
      url: "#",
    },
  ]

  const serviceCommitments = [
    {
      icon: Clock,
      title: "Response Time Guarantee",
      description: "Email responses within 4 hours, phone support available during business hours",
    },
    {
      icon: Users,
      title: "Dedicated Support Team",
      description: "Specialized Section 3 compliance experts, not generic tech support",
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "SOC 2 compliant with enterprise-grade security and data protection",
    },
    {
      icon: CheckCircle,
      title: "Success Guarantee",
      description: "We're committed to your success with ongoing training and optimization",
    },
  ]

  if (isSubmitted) {
    return (
      <>
        <Navigation onStartTrial={() => setShowTrialModal(true)} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Request Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              We've received your support request and will get back to you within 4 hours during business hours.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  organization: "",
                  priority: "",
                  category: "",
                  subject: "",
                  description: "",
                })
              }}
              variant="outline"
              className="bg-transparent"
            >
              Submit Another Request
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
                🛟 Support Center
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                We're Here to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Help You Succeed
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get expert support from our Section 3 compliance specialists. Whether you need technical help, training,
                or strategic guidance, we're committed to your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                >
                  <MessageSquare className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Start Live Chat
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-gray-300 hover:border-blue-600 font-semibold text-base sm:text-lg bg-transparent"
                >
                  <Phone className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Call Support
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Multiple Ways to Get Help</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the support channel that works best for your needs and urgency level
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <channel.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{channel.title}</CardTitle>
                        <CardDescription>{channel.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Contact:</span>
                          <p className="text-gray-600">{channel.contact}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Response Time:</span>
                          <p className="text-gray-600">{channel.responseTime}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Availability:</span>
                          <p className="text-gray-600">{channel.availability}</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">Best for:</span>
                        <p className="text-gray-600 text-sm">{channel.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support Form and FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="support-form" className="space-y-8">
              <div className="text-center">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                  <TabsTrigger value="support-form">Submit Request</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="support-form">
                <div className="max-w-2xl mx-auto">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">Submit Support Request</CardTitle>
                      <CardDescription className="text-center">
                        Fill out the form below and we'll get back to you within 4 hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="John Smith"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="john@organization.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization</Label>
                          <Input
                            id="organization"
                            value={formData.organization}
                            onChange={(e) => handleInputChange("organization", e.target.value)}
                            placeholder="Housing Authority Name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="priority">Priority Level</Label>
                            <Select
                              value={formData.priority}
                              onValueChange={(value) => handleInputChange("priority", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low - General question</SelectItem>
                                <SelectItem value="medium">Medium - Need assistance</SelectItem>
                                <SelectItem value="high">High - Blocking my work</SelectItem>
                                <SelectItem value="urgent">Urgent - System down</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => handleInputChange("category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technical">Technical Issue</SelectItem>
                                <SelectItem value="account">Account & Billing</SelectItem>
                                <SelectItem value="training">Training & Onboarding</SelectItem>
                                <SelectItem value="compliance">Compliance Question</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            placeholder="Brief description of your issue"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Please provide detailed information about your issue, including any error messages and steps to reproduce the problem..."
                            rows={5}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Support Request"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="faq">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                    <p className="text-gray-600">Find quick answers to common questions</p>
                  </div>

                  <div className="space-y-8">
                    {faqCategories.map((category, index) => (
                      <Card key={index} className="border-0 shadow-lg">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                              <category.icon className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-xl">{category.category}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {category.faqs.map((faq, faqIndex) => (
                              <div key={faqIndex} className="border-l-4 border-blue-600 pl-4">
                                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Self-Service Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access comprehensive documentation, tutorials, and guides
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    <Badge variant="outline" className="mb-4">
                      {resource.type}
                    </Badge>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={resource.url}>
                        <Download className="h-4 w-4 mr-2" />
                        Access Resource
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Commitments */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Commitments</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">What you can expect from our support team</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {serviceCommitments.map((commitment, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <commitment.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{commitment.title}</h3>
                    <p className="text-gray-600 text-sm">{commitment.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Still Need Help?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our Section 3 compliance experts are standing by to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Live Chat
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
