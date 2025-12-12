"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"
import {
  BookOpen,
  Users,
  Building2,
  Calculator,
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  ExternalLink,
  Target,
  BarChart3,
  Clock,
  DollarSign,
} from "lucide-react"

export default function Section3GuidePage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const guideTopics = [
    {
      title: "Section 3 Overview",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      description: "Understanding the fundamentals of HUD Section 3 requirements",
    },
    {
      title: "Worker Requirements",
      icon: <Users className="h-6 w-6 text-green-600" />,
      description: "Qualifying and tracking Section 3 workers and residents",
    },
    {
      title: "Business Requirements",
      icon: <Building2 className="h-6 w-6 text-purple-600" />,
      description: "Section 3 business certification and contracting requirements",
    },
    {
      title: "Benchmarks & Goals",
      icon: <Target className="h-6 w-6 text-orange-600" />,
      description: "Meeting labor hour and contracting benchmarks",
    },
    {
      title: "Reporting & Documentation",
      icon: <FileText className="h-6 w-6 text-red-600" />,
      description: "Required reporting and record-keeping procedures",
    },
    {
      title: "Compliance Monitoring",
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
      description: "Ongoing monitoring and performance tracking",
    },
  ]

  const keyRequirements = [
    {
      category: "Labor Hour Benchmark",
      requirement: "25% of total labor hours",
      description: "Must be performed by Section 3 workers on Section 3 projects over $200,000",
      priority: "high",
    },
    {
      category: "Contracting Benchmark",
      requirement: "5% of total dollar amount",
      description: "Must be awarded to Section 3 business concerns",
      priority: "high",
    },
    {
      category: "Worker Documentation",
      requirement: "Maintain eligibility records",
      description: "Document and verify Section 3 worker status and employment",
      priority: "medium",
    },
    {
      category: "Business Certification",
      requirement: "Verify Section 3 status",
      description: "Ensure businesses meet Section 3 certification requirements",
      priority: "medium",
    },
    {
      category: "Annual Reporting",
      requirement: "Submit Section 3 Summary Report",
      description: "Report accomplishments to HUD by January 15th annually",
      priority: "high",
    },
  ]

  const workerCategories = [
    {
      category: "Section 3 Worker",
      definition:
        "Any worker who currently fits or when hired within the past five years fit at least one of the following categories:",
      criteria: [
        "The worker's income for the previous or annualized calendar year is below the income limit established by HUD",
        "The worker is employed by a Section 3 business concern",
        "The worker is a YouthBuild participant",
      ],
    },
    {
      category: "Targeted Section 3 Worker",
      definition: "A Section 3 worker who is:",
      criteria: [
        "Employed by a Section 3 business concern",
        "Currently fits or when hired fit at least one of the following categories:",
        "- Living within the service area or the metropolitan area",
        "- A YouthBuild participant",
      ],
    },
  ]

  const businessTypes = [
    {
      type: "51% or more owned by Section 3 residents",
      description: "Business owned by current public housing residents or HCV participants",
    },
    {
      type: "30% workforce are Section 3 workers",
      description: "At least 30% of full-time employees are Section 3 workers or residents",
    },
    {
      type: "Subcontracting commitment",
      description: "Commits to subcontract 25% or more to Section 3 business concerns",
    },
  ]

  const complianceSteps = [
    {
      step: "1",
      title: "Establish Policies",
      description: "Develop Section 3 policies and procedures for your organization",
      timeframe: "Before project start",
    },
    {
      step: "2",
      title: "Worker Outreach",
      description: "Conduct outreach to identify and recruit Section 3 workers",
      timeframe: "Pre-construction",
    },
    {
      step: "3",
      title: "Contractor Requirements",
      description: "Include Section 3 requirements in all contracts and solicitations",
      timeframe: "During procurement",
    },
    {
      step: "4",
      title: "Monitor Progress",
      description: "Track labor hours and contracting achievements throughout project",
      timeframe: "During construction",
    },
    {
      step: "5",
      title: "Document & Report",
      description: "Maintain records and submit required reports to HUD",
      timeframe: "Ongoing",
    },
  ]

  const commonChallenges = [
    {
      challenge: "Meeting Labor Hour Benchmarks",
      solutions: [
        "Start worker recruitment early in the project timeline",
        "Partner with local workforce development organizations",
        "Provide pre-apprenticeship and skills training programs",
        "Work with contractors to identify suitable positions",
      ],
    },
    {
      challenge: "Contractor Compliance",
      solutions: [
        "Provide clear Section 3 requirements in bid documents",
        "Offer contractor training and technical assistance",
        "Include Section 3 performance in contractor evaluations",
        "Establish penalties for non-compliance",
      ],
    },
    {
      challenge: "Documentation and Reporting",
      solutions: [
        "Implement systematic record-keeping procedures",
        "Use compliance management software",
        "Train staff on documentation requirements",
        "Conduct regular compliance audits",
      ],
    },
    {
      challenge: "Worker Retention",
      solutions: [
        "Provide wraparound support services",
        "Offer career advancement opportunities",
        "Partner with unions for apprenticeship programs",
        "Address transportation and childcare barriers",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            <BookOpen className="h-4 w-4 mr-2" />
            Complete Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Complete{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Section 3 Guide
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to know about HUD Section 3 requirements, from basic compliance to advanced strategies
            for maximizing community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF Guide
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent">
              <ExternalLink className="mr-2 h-5 w-5" />
              View HUD Regulations
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Guide Navigation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Guide Contents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{topic.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 text-sm">{topic.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>What is Section 3?</CardTitle>
                  <CardDescription>Understanding the purpose and scope of HUD Section 3 requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    Section 3 is a HUD regulation that requires recipients of certain HUD funding to provide job
                    training, employment, and contracting opportunities for low- and very low-income residents in
                    connection with projects and activities in their neighborhoods.
                  </p>
                  <p className="text-gray-700">
                    The regulation applies to public housing authorities, developers, and other recipients of HUD
                    funding for housing and community development activities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Requirements Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyRequirements.map((req, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          req.priority === "high" ? "border-l-red-500 bg-red-50" : "border-l-yellow-500 bg-yellow-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{req.category}</h4>
                            <p className="text-sm font-medium text-gray-700 mt-1">{req.requirement}</p>
                            <p className="text-sm text-gray-600 mt-2">{req.description}</p>
                          </div>
                          <Badge variant={req.priority === "high" ? "destructive" : "secondary"}>
                            {req.priority === "high" ? "Critical" : "Important"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workers" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Section 3 Worker Categories</CardTitle>
                  <CardDescription>Understanding different types of Section 3 workers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workerCategories.map((category, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.category}</h3>
                        <p className="text-gray-700 mb-4">{category.definition}</p>
                        <ul className="space-y-2">
                          {category.criteria.map((criterion, criterionIndex) => (
                            <li key={criterionIndex} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              {criterion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Worker Documentation Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="eligibility">
                      <AccordionTrigger>Eligibility Documentation</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">Required documents to verify Section 3 worker status:</p>
                          <ul className="space-y-2">
                            <li className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              Income verification (tax returns, pay stubs, benefit statements)
                            </li>
                            <li className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              Proof of residence in public housing or HCV participation
                            </li>
                            <li className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              YouthBuild participation documentation (if applicable)
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="employment">
                      <AccordionTrigger>Employment Tracking</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">Information to track for each Section 3 worker:</p>
                          <ul className="space-y-2">
                            <li className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              Hours worked on Section 3 projects
                            </li>
                            <li className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              Wages earned and employment duration
                            </li>
                            <li className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              Skills training and career advancement
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="businesses" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Section 3 Business Concerns</CardTitle>
                  <CardDescription>Types of businesses that qualify for Section 3 contracting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {businessTypes.map((business, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{business.type}</h4>
                        <p className="text-sm text-gray-600">{business.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contracting Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Benchmark Requirements</h4>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900">5% Contracting Goal</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          5% of the total dollar amount of all Section 3 projects must be awarded to Section 3 business
                          concerns.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Safe Harbor Provisions</h4>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-900">Compliance Protection</span>
                        </div>
                        <p className="text-sm text-green-800">
                          Meeting the benchmarks provides safe harbor from HUD compliance reviews for that reporting
                          period.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benchmarks" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Labor Hour Benchmark</CardTitle>
                  <CardDescription>Understanding the 25% labor hour requirement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Calculation Method</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm font-medium text-gray-900">Total Section 3 Labor Hours</div>
                          <div className="text-xs text-gray-600">÷ Total Project Labor Hours</div>
                          <div className="text-xs text-gray-600">= Section 3 Percentage</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                          <div className="text-sm font-semibold text-blue-900">Goal: ≥ 25%</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Qualifying Projects</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          Section 3 projects over $200,000
                        </li>
                        <li className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          Housing rehabilitation and construction
                        </li>
                        <li className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          Other public construction projects
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contracting Benchmark</CardTitle>
                  <CardDescription>Meeting the 5% contracting requirement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Calculation Method</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm font-medium text-gray-900">Total Section 3 Contract Dollars</div>
                          <div className="text-xs text-gray-600">÷ Total Project Contract Dollars</div>
                          <div className="text-xs text-gray-600">= Section 3 Percentage</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                          <div className="text-sm font-semibold text-green-900">Goal: ≥ 5%</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Qualifying Contracts</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          Prime contracts with Section 3 businesses
                        </li>
                        <li className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          Subcontracts with Section 3 businesses
                        </li>
                        <li className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          Professional services contracts
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Implementation Steps</CardTitle>
                  <CardDescription>Step-by-step guide to Section 3 compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {complianceSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{step.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.timeframe}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Challenges & Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {commonChallenges.map((item, index) => (
                      <AccordionItem key={index} value={`challenge-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            {item.challenge}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-gray-700 font-medium">Recommended Solutions:</p>
                            <ul className="space-y-2">
                              {item.solutions.map((solution, solutionIndex) => (
                                <li key={solutionIndex} className="flex items-start text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      HUD Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Section 3 Final Rule
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Implementation Guidance
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Frequently Asked Questions
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Templates & Forms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Section 3 Action Plan Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Worker Eligibility Form
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Business Certification Form
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Tools & Calculators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calculator className="h-4 w-4 mr-2" />
                      Benchmark Calculator
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Progress Tracker
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ROI Calculator
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Support</CardTitle>
                  <CardDescription>Get help with your Section 3 compliance questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Expert Consultation</h4>
                      <p className="text-gray-600 mb-4">
                        Schedule a consultation with our Section 3 compliance experts to discuss your specific
                        challenges and get personalized guidance.
                      </p>
                      <Button className="bg-gradient-to-r from-blue-600 to-green-600">Schedule Consultation</Button>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Training Programs</h4>
                      <p className="text-gray-600 mb-4">
                        Join our comprehensive training programs designed for housing authorities, developers, and
                        contractors.
                      </p>
                      <Button variant="outline" className="bg-transparent">
                        View Training Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Streamline Your Section 3 Compliance?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our platform incorporates all these requirements and best practices to help you achieve 100% Section 3
                compliance with minimal effort.
              </p>
              <div className="space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Start Free Trial</Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Schedule Demo
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
