"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Chatbot } from "@/components/chatbot"
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Download, Mail, Users, Lock, Globe } from "lucide-react"

export default function TermsPage() {
  const [showChatbot, setShowChatbot] = useState(false)
  const lastUpdated = "March 15, 2024"
  const effectiveDate = "March 15, 2024"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing or using the Rapid Compliance platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.`,
    },
    {
      id: "description",
      title: "Description of Service",
      icon: FileText,
      content: `Rapid Compliance provides a comprehensive Section 3 compliance management platform designed for housing authorities, contractors, and related organizations. Our Service includes:

• Worker and contractor management systems
• AI-powered email triage and response generation
• Compliance monitoring and reporting tools
• Integration with HUD systems and third-party platforms
• Analytics and business intelligence features
• Mobile applications and web-based interfaces

The Service is provided on a subscription basis with various pricing tiers and feature sets.`,
    },
    {
      id: "user-accounts",
      title: "User Accounts and Registration",
      icon: Users,
      content: `To access certain features of the Service, you must register for an account. When you create an account, you agree to:

• Provide accurate, current, and complete information
• Maintain the security of your password and account
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use
• Not share your account credentials with others
• Use the Service only for lawful purposes

We reserve the right to suspend or terminate accounts that violate these Terms or engage in prohibited activities.`,
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: Shield,
      content: `You agree not to use the Service to:

• Violate any applicable laws or regulations
• Infringe on intellectual property rights
• Transmit harmful, offensive, or inappropriate content
• Attempt to gain unauthorized access to our systems
• Interfere with or disrupt the Service
• Use the Service for competitive intelligence gathering
• Reverse engineer or attempt to extract source code
• Upload malicious software or code

Violation of this policy may result in immediate account suspension or termination.`,
    },
    {
      id: "data-privacy",
      title: "Data and Privacy",
      icon: Lock,
      content: `Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.

Key points regarding data:

• You retain ownership of your data
• We implement enterprise-grade security measures
• Data is encrypted in transit and at rest
• We comply with applicable privacy laws (GDPR, CCPA, etc.)
• You can export your data at any time
• We do not sell your personal information

For detailed information about our data practices, please review our Privacy Policy.`,
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Scale,
      content: `The Service and its original content, features, and functionality are owned by Rapid Compliance and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

Your Rights:
• You retain ownership of data you input into the Service
• You grant us a license to use your data to provide the Service
• You may use the Service according to these Terms

Our Rights:
• We own all intellectual property in the Service
• Our trademarks and logos may not be used without permission
• We reserve all rights not expressly granted to you`,
    },
    {
      id: "payment-terms",
      title: "Payment Terms and Billing",
      icon: FileText,
      content: `Subscription fees are billed in advance on a monthly or annual basis, depending on your chosen plan.

Payment Terms:
• Fees are non-refundable except as required by law
• You authorize us to charge your payment method
• Price changes require 30 days advance notice
• Overdue accounts may be suspended
• You're responsible for all taxes and fees

Free Trial:
• 14-day free trial available for new customers
• No credit card required for trial signup
• Trial automatically converts to paid plan unless cancelled
• All features available during trial period`,
    },
    {
      id: "service-availability",
      title: "Service Availability and Support",
      icon: Globe,
      content: `We strive to maintain high service availability but cannot guarantee uninterrupted access.

Service Level:
• 99.9% uptime target (excluding scheduled maintenance)
• Scheduled maintenance with advance notice
• Emergency maintenance as needed
• Regular backups and disaster recovery procedures

Support:
• Email support for all customers
• Phone support for Professional and Enterprise plans
• Knowledge base and documentation available 24/7
• Response times vary by plan level`,
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, RAPID COMPLIANCE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.

Our total liability to you for any claim arising from or relating to these Terms or the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.

Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for consequential damages, so the above limitations may not apply to you.`,
    },
    {
      id: "indemnification",
      title: "Indemnification",
      icon: Shield,
      content: `You agree to defend, indemnify, and hold harmless Rapid Compliance, its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:

• Your use of the Service
• Your violation of these Terms
• Your violation of any third-party rights
• Any content you submit through the Service

This indemnification obligation will survive termination of these Terms and your use of the Service.`,
    },
    {
      id: "termination",
      title: "Termination",
      icon: FileText,
      content: `Either party may terminate these Terms at any time:

Your Rights:
• Cancel your subscription at any time
• Export your data before termination
• Receive pro-rated refunds where applicable

Our Rights:
• Suspend or terminate accounts for Terms violations
• Discontinue the Service with reasonable notice
• Modify or update the Service as needed

Upon termination:
• Your access to the Service will cease
• Data may be deleted after a reasonable retention period
• Certain provisions of these Terms will survive termination`,
    },
    {
      id: "changes-terms",
      title: "Changes to Terms",
      icon: FileText,
      content: `We reserve the right to modify these Terms at any time. When we make changes:

• We will provide notice through the Service or via email
• Material changes require 30 days advance notice
• Continued use constitutes acceptance of new Terms
• You may terminate your account if you disagree with changes

We encourage you to review these Terms periodically to stay informed of any updates.`,
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      icon: Scale,
      content: `These Terms shall be governed by and construed in accordance with the laws of the District of Columbia, without regard to its conflict of law provisions.

Dispute Resolution:
• Good faith negotiation required before formal proceedings
• Binding arbitration for disputes under $10,000
• Jurisdiction in Washington, D.C. courts for larger disputes
• Class action waiver applies

You and Rapid Compliance agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
            <Scale className="h-4 w-4 mr-2" />
            Terms of Service
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            These terms govern your use of the Rapid Compliance platform. Please read them carefully as they contain
            important information about your rights and obligations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <span>Effective Date: {effectiveDate}</span>
            <span>Last Updated: {lastUpdated}</span>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Fair & Transparent</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Clear terms with no hidden clauses or unexpected obligations
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Your Data Rights</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                You retain ownership and control of your data at all times
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Legal Protection</h3>
              <p className="text-xs sm:text-sm text-gray-600">Balanced terms that protect both parties' interests</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base sm:text-xl">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <section.icon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  {index + 1}. {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Important Notices */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-0 shadow-lg bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-yellow-800 mb-2">Changes to Terms</h3>
                    <p className="text-xs sm:text-sm text-yellow-700 leading-relaxed">
                      We may update these Terms from time to time. Material changes will be communicated with 30 days
                      advance notice. Continued use of the Service constitutes acceptance of updated Terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">Questions About Terms</h3>
                    <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                      If you have questions about these Terms or need clarification on any provisions, please contact
                      our legal team at legal@rapidcompliance.net.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Scale className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Questions About These Terms?</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our legal team is available to help clarify any provisions or answer questions about your rights and
              obligations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
              >
                <Mail className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Contact Legal Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-gray-300 hover:border-blue-600 font-semibold text-base sm:text-lg bg-transparent"
              >
                <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Download Full Terms
              </Button>
            </div>
            <div className="mt-8 text-sm sm:text-base text-gray-500">
              <p className="mb-2">Legal Team: legal@rapidcompliance.net</p>
              <p>Rapid Compliance, Inc. • 1717 N Street NW STE 1 • Washington, DC, 20036</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Chatbot */}
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
