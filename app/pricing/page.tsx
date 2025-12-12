"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Star, Zap, Shield, Users, Building2, BarChart3 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"

export default function PricingPage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Starter",
      description: "Best for: Small contractors (1–5 employees)",
      monthlyPrice: 399,
      yearlyPrice: 3990,
      features: [
        "Up to 5 contracts",
        "Access to Section 3 dashboard",
        "Labor hour tracking (Section 3 + Targeted)",
        "HUD benchmark monitoring",
        "Basic compliance alerts",
        "Document upload & storage (10GB)",
        "Email support",
        "Downloadable monthly compliance reports",
      ],
      limitations: ["Limited to 10 projects", "Basic analytics only", "No API access"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "Best for: Mid-size contractors (5–25 employees)",
      monthlyPrice: 799,
      yearlyPrice: 7990,
      features: [
        "Up to 15 contracts",
        "Automated compliance tracking",
        "Mock audits (quarterly)",
        "Priority email support",
        "Advanced analytics & reporting",
        "Automated HUD 60002 reports",
        "50GB storage",
        "Contractor verification",
        "Targeted hiring & skills matching",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Best for: Large contractors & public agencies (25+ employees or >$5M in HUD contracts)",
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      features: [
        "Unlimited contracts",
        "White-label portal (your logo/brand)",
        "Dedicated account manager",
        "Bi-weekly compliance huddles",
        "24/7 support with SLA",
        "Custom integrations (API)",
        "Full audit trail and versioning",
        "Multi-tenant architecture",
        "99.9% uptime guarantee",
        "Unlimited document storage",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const features = [
    {
      icon: Users,
      title: "Worker Management",
      description: "Complete worker lifecycle management with automated compliance tracking",
    },
    {
      icon: Building2,
      title: "Contractor Portal",
      description: "Self-service portal for contractors to manage their Section 3 requirements",
    },
    {
      icon: Zap,
      title: "AI Email Triage",
      description: "Intelligent email processing and automated responses for compliance inquiries",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics with HUD-ready compliance reports",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and data encryption",
    },
  ]

  const getPrice = (plan: any) => {
    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
    const monthlyEquivalent = billingCycle === "yearly" ? Math.round(price / 12) : price
    return { price, monthlyEquivalent }
  }

  const getSavings = (plan: any) => {
    if (billingCycle === "yearly") {
      const monthlyCost = plan.monthlyPrice * 12
      const yearlyCost = plan.yearlyPrice
      const savings = monthlyCost - yearlyCost
      const percentage = Math.round((savings / monthlyCost) * 100)
      return { savings, percentage }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setIsTrialModalOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            💰 Save 20% with Annual Billing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your organization. All plans include a 14-day free trial with no credit card
            required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const { price, monthlyEquivalent } = getPrice(plan)
              const savings = getSavings(plan)

              return (
                <Card
                  key={index}
                  className={`relative ${
                    plan.popular ? "border-2 border-blue-500 shadow-xl scale-105" : "border border-gray-200 shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">${monthlyEquivalent}</span>
                        <span className="text-gray-500 ml-1">/month</span>
                      </div>
                      {billingCycle === "yearly" && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">${price} billed annually</span>
                          {savings && (
                            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                              Save ${savings.savings}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start gap-3">
                              <div className="h-5 w-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                                <div className="h-1 w-3 bg-gray-400 rounded"></div>
                              </div>
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                          : "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      }`}
                      onClick={() => {
                        if (plan.cta === "Start Free Trial") {
                          setIsTrialModalOpen(true)
                        } else {
                          // Navigate to contact page for enterprise
                          window.location.href = "/contact"
                        }
                      }}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Section 3 compliance management with enterprise-grade features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about our pricing and features.</p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Is there a free trial?",
                answer:
                  "Yes! All plans include a 14-day free trial with full access to features. No credit card required to start.",
              },
              {
                question: "Can I change plans anytime?",
                answer:
                  "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, ACH transfers, and can accommodate purchase orders for annual plans.",
              },
              {
                question: "Is there a setup fee?",
                answer:
                  "No setup fees for any plan. We include onboarding and training to help you get started quickly.",
              },
              {
                question: "What if I need more than the Enterprise plan offers?",
                answer:
                  "We offer custom enterprise solutions for organizations with unique requirements. Contact our sales team to discuss your specific needs.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of organizations using Rapid Compliance to streamline their Section 3 management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => setIsTrialModalOpen(true)}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <a href="/contact">Contact Sales</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Start Trial Modal */}
      <StartTrialModal isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} />
    </div>
  )
}
