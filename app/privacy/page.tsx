"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Database,
  Globe,
  Mail,
  CheckCircle,
  AlertTriangle,
  Download,
} from "lucide-react"

export default function PrivacyPage() {
  const [showChatbot, setShowChatbot] = useState(false)
  const lastUpdated = "March 15, 2024"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, phone number, and job title",
            "Organization name and address",
            "User account credentials and preferences",
            "Communication preferences and contact history",
          ],
        },
        {
          subtitle: "Section 3 Data",
          items: [
            "Worker information including eligibility status",
            "Contractor details and compliance records",
            "Project information and labor hour tracking",
            "Training records and certifications",
          ],
        },
        {
          subtitle: "Technical Information",
          items: [
            "IP addresses and device information",
            "Browser type and operating system",
            "Usage patterns and feature interactions",
            "Log files and system performance data",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Delivery",
          items: [
            "Provide Section 3 compliance management services",
            "Generate reports and analytics",
            "Process and respond to communications",
            "Maintain and improve platform functionality",
          ],
        },
        {
          subtitle: "Legal Compliance",
          items: [
            "Comply with HUD reporting requirements",
            "Meet federal and state regulatory obligations",
            "Respond to legal requests and investigations",
            "Maintain audit trails and compliance records",
          ],
        },
        {
          subtitle: "Communication",
          items: [
            "Send service updates and notifications",
            "Provide customer support and training",
            "Share compliance alerts and deadlines",
            "Deliver requested information and resources",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Users,
      content: [
        {
          subtitle: "We DO NOT sell your personal information",
          items: [
            "Your data is never sold to third parties",
            "We do not engage in data brokering activities",
            "Personal information is not used for advertising",
            "We maintain strict data confidentiality",
          ],
        },
        {
          subtitle: "Limited Sharing Scenarios",
          items: [
            "HUD reporting as required by law",
            "Service providers under strict confidentiality agreements",
            "Legal compliance when required by court order",
            "Business transfers with equivalent privacy protections",
          ],
        },
        {
          subtitle: "Data Processing Partners",
          items: [
            "Cloud hosting providers (AWS, Microsoft Azure)",
            "Email service providers for communications",
            "Analytics services for platform improvement",
            "Security monitoring and threat detection services",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security and Protection",
      icon: Shield,
      content: [
        {
          subtitle: "Technical Safeguards",
          items: [
            "End-to-end encryption for data in transit and at rest",
            "Multi-factor authentication for all user accounts",
            "Regular security audits and penetration testing",
            "SOC 2 Type II compliance and certification",
          ],
        },
        {
          subtitle: "Access Controls",
          items: [
            "Role-based access control (RBAC) system",
            "Principle of least privilege access",
            "Regular access reviews and deprovisioning",
            "Audit logging of all data access activities",
          ],
        },
        {
          subtitle: "Infrastructure Security",
          items: [
            "Secure cloud hosting with enterprise-grade protection",
            "Network segmentation and firewall protection",
            "Intrusion detection and prevention systems",
            "Regular security updates and patch management",
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "Your Privacy Rights",
      icon: Lock,
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "Right to access your personal information",
            "Right to correct inaccurate or incomplete data",
            "Right to delete your personal information",
            "Right to data portability and export",
          ],
        },
        {
          subtitle: "Communication Preferences",
          items: [
            "Opt-out of marketing communications",
            "Control notification preferences",
            "Choose communication channels",
            "Update contact information anytime",
          ],
        },
        {
          subtitle: "State-Specific Rights",
          items: [
            "California Consumer Privacy Act (CCPA) rights",
            "Virginia Consumer Data Protection Act (VCDPA) rights",
            "Other applicable state privacy law rights",
            "Right to non-discrimination for exercising privacy rights",
          ],
        },
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention and Deletion",
      icon: FileText,
      content: [
        {
          subtitle: "Retention Periods",
          items: [
            "Active account data: Retained while account is active",
            "Compliance records: 7 years as required by HUD",
            "Communication logs: 3 years for support purposes",
            "Technical logs: 1 year for security and performance",
          ],
        },
        {
          subtitle: "Deletion Process",
          items: [
            "Secure deletion using industry-standard methods",
            "Verification of complete data removal",
            "Retention of legally required records only",
            "Notification of deletion completion",
          ],
        },
      ],
    },
  ]

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls",
      icon: Shield,
    },
    {
      name: "GDPR Compliant",
      description: "European data protection regulation compliance",
      icon: Globe,
    },
    {
      name: "CCPA Compliant",
      description: "California Consumer Privacy Act compliance",
      icon: Lock,
    },
    {
      name: "FISMA Moderate",
      description: "Federal information security standards",
      icon: FileText,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Privacy</span>{" "}
            Matters
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and maintaining the security of your personal information. This
            policy explains how we collect, use, and safeguard your data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm text-gray-500">
            <span>Last Updated: {lastUpdated}</span>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Clear, understandable policies about how we handle your data
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Security</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Enterprise-grade security measures to protect your information
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Control</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                You maintain control over your personal information and privacy settings
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Security Certifications</h2>
            <p className="text-base sm:text-lg text-gray-600">
              We maintain the highest standards of data protection and security
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8 sm:space-y-12">
          {sections.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg sm:text-2xl">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <section.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">{subsection.subtitle}</h4>
                      <ul className="space-y-2">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Our privacy team is here to help you understand and exercise your rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-base sm:text-lg"
            >
              <Mail className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Contact Privacy Team
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-base sm:text-lg bg-transparent"
            >
              <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Download Full Policy
            </Button>
          </div>
          <div className="mt-8 text-sm sm:text-base text-blue-100">
            <p className="mb-2">Privacy Officer: privacy@rapidcompliance.net</p>
            <p>Response time: Within 30 days as required by law</p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-0 shadow-lg bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-xs sm:text-sm text-yellow-700 leading-relaxed">
                  This privacy policy may be updated periodically to reflect changes in our practices or legal
                  requirements. We will notify you of any material changes via email or through our platform. Your
                  continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Chatbot */}
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
