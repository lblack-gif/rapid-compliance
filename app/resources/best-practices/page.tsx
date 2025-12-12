"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import {
  CheckCircle,
  Users,
  Building2,
  TrendingUp,
  Award,
  Target,
  FileText,
  ArrowRight,
  Download,
  ExternalLink,
  Star,
  Clock,
} from "lucide-react"

export default function BestPracticesPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)

  const successStories = [
    {
      organization: "DC Housing Authority",
      location: "Washington, DC",
      projectType: "Mixed-Income Housing Development",
      contractValue: "$45M",
      section3Achievement: "32%",
      target: "25%",
      workersHired: 89,
      businessesEngaged: 12,
      timeline: "18 months",
      keyStrategies: [
        "Pre-apprenticeship partnerships with local training centers",
        "Dedicated Section 3 coordinator on-site",
        "Monthly contractor compliance meetings",
        "Community outreach through local organizations",
      ],
      results: [
        "Exceeded Section 3 goals by 28%",
        "Created 89 new jobs for low-income residents",
        "Established ongoing partnerships with 5 training programs",
        "Reduced project timeline by 2 months through efficient workforce",
      ],
      quote:
        "The systematic approach to Section 3 compliance not only met our requirements but created lasting economic opportunities for our community.",
      contact: "Maria Rodriguez, Compliance Director",
    },
    {
      organization: "Philadelphia Housing Development Corp",
      location: "Philadelphia, PA",
      projectType: "Senior Housing Complex",
      contractValue: "$28M",
      section3Achievement: "29%",
      target: "25%",
      workersHired: 54,
      businessesEngaged: 8,
      timeline: "14 months",
      keyStrategies: [
        "Skills-based hiring approach",
        "Partnership with local union training programs",
        "Mentorship program pairing new hires with experienced workers",
        "Flexible scheduling for workers in training programs",
      ],
      results: [
        "16% increase in worker retention rates",
        "Established 3 new apprenticeship pathways",
        "Reduced recruitment costs by 40%",
        "Created model program adopted by 4 other housing authorities",
      ],
      quote:
        "Our success came from treating Section 3 as an opportunity for workforce development, not just a compliance requirement.",
      contact: "James Thompson, Project Manager",
    },
    {
      organization: "Atlanta Housing Authority",
      location: "Atlanta, GA",
      projectType: "Community Revitalization",
      contractValue: "$67M",
      section3Achievement: "35%",
      target: "25%",
      workersHired: 127,
      businessesEngaged: 18,
      timeline: "24 months",
      keyStrategies: [
        "Comprehensive pre-construction workforce planning",
        "Local business development program",
        "Transportation assistance for workers",
        "Childcare support during training periods",
      ],
      results: [
        "40% of hired workers advanced to supervisory roles",
        "Launched 6 new Section 3 businesses",
        "Achieved 98% project completion rate",
        "Generated $2.3M in additional local economic activity",
      ],
      quote:
        "By addressing barriers to employment upfront, we created a pipeline of skilled workers that benefited the entire community.",
      contact: "Dr. Angela Davis, Community Development Director",
    },
  ]

  const bestPractices = [
    {
      category: "Planning & Strategy",
      icon: Target,
      practices: [
        {
          title: "Early Workforce Planning",
          description:
            "Begin Section 3 planning during project design phase, not after contract award. Identify skill requirements and local training resources 6-12 months before construction begins.",
          impact: "Increases worker placement success by 45%",
        },
        {
          title: "Community Partnership Development",
          description:
            "Establish relationships with local workforce development agencies, community colleges, and resident organizations before project launch.",
          impact: "Expands candidate pool by 60% on average",
        },
        {
          title: "Barrier Assessment & Mitigation",
          description:
            "Identify and address common employment barriers (transportation, childcare, training) through targeted support programs.",
          impact: "Reduces worker dropout rates by 35%",
        },
      ],
    },
    {
      category: "Implementation",
      icon: Users,
      practices: [
        {
          title: "Dedicated Section 3 Coordination",
          description:
            "Assign a full-time Section 3 coordinator to manage compliance, worker placement, and contractor relationships throughout the project.",
          impact: "Improves compliance rates to 95%+",
        },
        {
          title: "Progressive Skills Development",
          description:
            "Create pathways for workers to advance from entry-level to skilled positions through on-the-job training and mentorship programs.",
          impact: "Increases worker retention by 50%",
        },
        {
          title: "Regular Compliance Monitoring",
          description:
            "Implement weekly progress tracking and monthly contractor meetings to ensure Section 3 goals remain on track throughout the project.",
          impact: "Prevents compliance issues in 90% of cases",
        },
      ],
    },
    {
      category: "Business Development",
      icon: Building2,
      practices: [
        {
          title: "Local Business Capacity Building",
          description:
            "Provide technical assistance, bonding support, and mentorship to help local businesses compete for and successfully complete contracts.",
          impact: "Increases Section 3 business participation by 75%",
        },
        {
          title: "Subcontracting Opportunities",
          description:
            "Break large contracts into smaller components that local businesses can handle, and facilitate prime-subcontractor partnerships.",
          impact: "Creates 3x more business opportunities",
        },
        {
          title: "Payment & Cash Flow Support",
          description:
            "Implement rapid payment processes and provide access to working capital to help small businesses manage project cash flow.",
          impact: "Reduces business failure rates by 40%",
        },
      ],
    },
    {
      category: "Measurement & Reporting",
      icon: TrendingUp,
      practices: [
        {
          title: "Real-Time Data Tracking",
          description:
            "Use digital platforms to track worker hours, wages, and progression in real-time rather than relying on monthly paper reports.",
          impact: "Improves data accuracy by 85%",
        },
        {
          title: "Outcome-Based Metrics",
          description:
            "Track long-term outcomes like worker advancement, wage progression, and business growth, not just initial placement numbers.",
          impact: "Demonstrates 3x greater community impact",
        },
        {
          title: "Stakeholder Communication",
          description:
            "Provide regular updates to residents, community leaders, and HUD on Section 3 progress and success stories.",
          impact: "Increases community support by 65%",
        },
      ],
    },
  ]

  const implementationSteps = [
    {
      phase: "Pre-Construction (6-12 months before)",
      duration: "6-12 months",
      activities: [
        "Conduct local workforce assessment",
        "Establish partnerships with training providers",
        "Develop Section 3 plan and goals",
        "Begin community outreach and recruitment",
        "Set up tracking and reporting systems",
      ],
    },
    {
      phase: "Construction Start (0-3 months)",
      duration: "3 months",
      activities: [
        "Launch worker orientation programs",
        "Begin skills assessment and placement",
        "Implement mentorship programs",
        "Start regular compliance monitoring",
        "Establish contractor accountability measures",
      ],
    },
    {
      phase: "Mid-Construction (3-18 months)",
      duration: "Variable",
      activities: [
        "Monitor progress against goals",
        "Adjust strategies based on performance",
        "Provide ongoing worker support services",
        "Facilitate worker advancement opportunities",
        "Conduct regular stakeholder meetings",
      ],
    },
    {
      phase: "Project Completion & Beyond",
      duration: "Ongoing",
      activities: [
        "Document lessons learned",
        "Track long-term worker outcomes",
        "Maintain business relationships",
        "Share best practices with other projects",
        "Plan for future Section 3 initiatives",
      ],
    },
  ]

  const resources = [
    {
      title: "Section 3 Implementation Toolkit",
      description:
        "Comprehensive guide with templates, checklists, and best practices for successful Section 3 programs",
      type: "PDF Guide",
      pages: "45 pages",
      downloadUrl: "#",
    },
    {
      title: "Contractor Compliance Handbook",
      description:
        "Step-by-step guide for contractors on meeting Section 3 requirements and maximizing community impact",
      type: "PDF Handbook",
      pages: "32 pages",
      downloadUrl: "#",
    },
    {
      title: "Worker Development Program Template",
      description: "Ready-to-use templates for creating effective worker training and advancement programs",
      type: "Template Pack",
      pages: "12 templates",
      downloadUrl: "#",
    },
    {
      title: "ROI Calculator Spreadsheet",
      description: "Calculate the return on investment of your Section 3 programs with this comprehensive tool",
      type: "Excel Tool",
      pages: "Interactive",
      downloadUrl: "#",
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
                📈 Implementation Success Stories
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Section 3{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Best Practices
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Learn from successful Section 3 implementations across the country. Real strategies, proven results, and
                actionable insights from housing authorities that exceed their compliance goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg"
                  onClick={() => setShowTrialModal(true)}
                >
                  Start Your Success Story
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-gray-300 hover:border-blue-600 font-semibold text-base sm:text-lg bg-transparent"
                >
                  Download Resources
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real results from housing authorities that have transformed their Section 3 programs
              </p>
            </div>

            <div className="space-y-12">
              {successStories.map((story, index) => (
                <Card key={index} className="border-0 shadow-xl overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-2 p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{story.organization}</h3>
                          <p className="text-gray-600">
                            {story.location} • {story.projectType}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            {story.section3Achievement} Section 3 Rate
                          </Badge>
                          <Badge variant="outline">{story.contractValue} Contract</Badge>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{story.workersHired}</div>
                          <div className="text-sm text-gray-600">Workers Hired</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{story.businessesEngaged}</div>
                          <div className="text-sm text-gray-600">Businesses Engaged</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{story.section3Achievement}</div>
                          <div className="text-sm text-gray-600">Achievement Rate</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{story.timeline}</div>
                          <div className="text-sm text-gray-600">Timeline</div>
                        </div>
                      </div>

                      <blockquote className="text-lg italic text-gray-700 mb-4 border-l-4 border-blue-600 pl-4">
                        "{story.quote}"
                      </blockquote>
                      <p className="text-sm text-gray-600 mb-6">— {story.contact}</p>

                      <Tabs defaultValue="strategies" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="strategies">Key Strategies</TabsTrigger>
                          <TabsTrigger value="results">Results</TabsTrigger>
                        </TabsList>
                        <TabsContent value="strategies" className="mt-4">
                          <ul className="space-y-2">
                            {story.keyStrategies.map((strategy, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{strategy}</span>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="results" className="mt-4">
                          <ul className="space-y-2">
                            {story.results.map((result, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-green-600 p-6 sm:p-8 text-white lg:flex lg:flex-col lg:justify-center">
                      <div className="text-center">
                        <Award className="h-12 w-12 mx-auto mb-4 opacity-80" />
                        <h4 className="text-xl font-bold mb-4">Outstanding Achievement</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-3xl font-bold">{story.section3Achievement}</div>
                            <div className="text-sm opacity-80">vs {story.target} target</div>
                          </div>
                          <div className="h-px bg-white/20 my-4"></div>
                          <div className="text-sm opacity-90">
                            This project demonstrates how strategic planning and community partnerships can exceed
                            Section 3 requirements while creating lasting economic opportunities.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Best Practices</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Evidence-based strategies that consistently deliver superior Section 3 outcomes
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {bestPractices.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.practices.map((practice, idx) => (
                        <div key={idx} className="border-l-4 border-blue-600 pl-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{practice.title}</h4>
                          <p className="text-gray-600 mb-2 text-sm">{practice.description}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {practice.impact}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Implementation Timeline</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A proven roadmap for successful Section 3 program implementation
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-green-600 rounded-full"></div>
              <div className="space-y-8 sm:space-y-12">
                {implementationSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} mb-4 md:mb-0`}
                    >
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                              {step.duration}
                            </Badge>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{step.phase}</h3>
                          <ul className="space-y-2">
                            {step.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{activity}</span>
                              </li>
                            ))}
                          </ul>
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

        {/* Resources */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Implementation Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Download practical tools and templates to implement these best practices in your organization
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((resource, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <p className="text-xs text-gray-500">{resource.pages}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 bg-transparent hover:bg-blue-50 hover:border-blue-600"
                      asChild
                    >
                      <a href={resource.downloadUrl}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Resource
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Implement These Best Practices?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of housing authorities using Rapid Compliance to exceed their Section 3 goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => setShowTrialModal(true)}
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
                <a href="/contact">
                  Schedule Consultation
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
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
