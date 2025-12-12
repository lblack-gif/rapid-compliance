"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"
import {
  HelpCircle,
  Search,
  MessageSquare,
  Phone,
  Mail,
  BookOpen,
  Video,
  FileText,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

export default function HelpPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const supportOptions = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 2 minutes",
      action: "Start Chat",
    },
    {
      icon: <Phone className="h-8 w-8 text-green-600" />,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      availability: "Mon-Fri 8AM-6PM EST",
      responseTime: "Immediate",
      action: "Call Now",
    },
    {
      icon: <Mail className="h-8 w-8 text-purple-600" />,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "24/7",
      responseTime: "< 4 hours",
      action: "Send Email",
    },
    {
      icon: <Video className="h-8 w-8 text-orange-600" />,
      title: "Screen Share",
      description: "Get personalized help with screen sharing",
      availability: "Mon-Fri 9AM-5PM EST",
      responseTime: "Same day",
      action: "Schedule Session",
    },
  ]

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I set up my Section 3 program in the platform?",
          answer:
            "Start by completing the Setup Wizard in your dashboard. This will guide you through configuring your organization settings, defining your Section 3 goals, and setting up your first project. The wizard takes about 10-15 minutes to complete.",
        },
        {
          question: "What information do I need to get started?",
          answer:
            "You'll need your organization's basic information, HUD program details, current Section 3 policies (if any), and information about your upcoming projects. Having your contractor contact list ready will also help speed up the setup process.",
        },
        {
          question: "How long does implementation take?",
          answer:
            "Most organizations are up and running within 1-2 weeks. This includes initial setup, data import, staff training, and contractor onboarding. Our Customer Success team provides hands-on support throughout the process.",
        },
      ],
    },
    {
      category: "Worker Management",
      questions: [
        {
          question: "How do I add Section 3 workers to the system?",
          answer:
            "You can add workers individually through the Workers tab or bulk import using our Excel template. For each worker, you'll need to verify their Section 3 eligibility and upload supporting documentation.",
        },
        {
          question: "What documents are required for worker verification?",
          answer:
            "Required documents include income verification (tax returns, pay stubs, or benefit statements), proof of residence for targeted workers, and any relevant training certifications. Our system guides you through the specific requirements for each worker type.",
        },
        {
          question: "How do I track worker hours and wages?",
          answer:
            "Contractors can submit timesheets directly through the platform, or you can import payroll data. The system automatically calculates labor hour percentages and tracks progress toward your benchmarks.",
        },
      ],
    },
    {
      category: "Contractor Management",
      questions: [
        {
          question: "How do contractors access the platform?",
          answer:
            "Contractors receive email invitations with login credentials. They can access a dedicated contractor portal where they submit action plans, upload worker documentation, and track their Section 3 performance.",
        },
        {
          question: "What if a contractor isn't meeting their Section 3 commitments?",
          answer:
            "The platform provides early warning alerts when contractors are falling behind. You can send automated reminders, schedule check-in meetings, and provide additional resources to help them get back on track.",
        },
        {
          question: "Can contractors submit their own worker documentation?",
          answer:
            "Yes, contractors can upload worker eligibility documents, timesheets, and other required documentation directly through their portal. All submissions are automatically routed to you for review and approval.",
        },
      ],
    },
    {
      category: "Reporting & Compliance",
      questions: [
        {
          question: "How do I generate HUD reports?",
          answer:
            "Navigate to the Reports section and select the report type you need. The system automatically pulls data from your projects and generates HUD-compliant reports in the required format. You can preview, edit, and download reports as needed.",
        },
        {
          question: "What reports are available?",
          answer:
            "The platform generates all required HUD reports including the Section 3 Summary Report, quarterly progress reports, and custom reports for internal tracking. You can also create ad-hoc reports for specific projects or time periods.",
        },
        {
          question: "How often should I run compliance reports?",
          answer:
            "We recommend running monthly progress reports to stay on top of your benchmarks. The annual Section 3 Summary Report is due to HUD by January 15th each year. The platform will remind you of all reporting deadlines.",
        },
      ],
    },
  ]

  const resources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all platform features",
      icon: <Video className="h-6 w-6 text-blue-600" />,
      items: [
        "Platform Overview (5 min)",
        "Setting Up Your First Project (8 min)",
        "Managing Section 3 Workers (12 min)",
        "Contractor Portal Walkthrough (6 min)",
        "Generating HUD Reports (10 min)",
      ],
    },
    {
      title: "User Guides",
      description: "Detailed written documentation and best practices",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      items: [
        "Complete User Manual",
        "Section 3 Compliance Guide",
        "Best Practices Handbook",
        "Troubleshooting Guide",
        "API Documentation",
      ],
    },
    {
      title: "Templates & Forms",
      description: "Ready-to-use templates for common Section 3 tasks",
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      items: [
        "Section 3 Action Plan Template",
        "Worker Eligibility Forms",
        "Contractor Evaluation Forms",
        "Progress Tracking Spreadsheets",
        "Policy Templates",
      ],
    },
  ]

  const trainingOptions = [
    {
      title: "Live Webinars",
      description: "Interactive training sessions with Q&A",
      schedule: "Every Tuesday & Thursday",
      duration: "1 hour",
      topics: ["Platform Basics", "Advanced Features", "Compliance Updates"],
    },
    {
      title: "On-Demand Training",
      description: "Self-paced video courses available 24/7",
      schedule: "Available anytime",
      duration: "2-4 hours total",
      topics: ["Complete Platform Training", "Section 3 Fundamentals", "Reporting Mastery"],
    },
    {
      title: "Custom Training",
      description: "Personalized training for your organization",
      schedule: "By appointment",
      duration: "2-8 hours",
      topics: ["Tailored to your needs", "On-site or virtual", "Team training sessions"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Can We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Help You?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find answers to your questions, get support from our team, and access resources to help you succeed with
            Section 3 compliance.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-green-600">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              24/7 Support Available
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              Expert Section 3 Team
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              99.9% Customer Satisfaction
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{option.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-500">
                      <strong>Available:</strong> {option.availability}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Response:</strong> {option.responseTime}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="workers">Workers</TabsTrigger>
              <TabsTrigger value="contractors">Contractors</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
            </TabsList>

            {faqCategories.map((category, categoryIndex) => (
              <TabsContent
                key={categoryIndex}
                value={category.category.toLowerCase().replace(" ", "-")}
                className="mt-8"
              >
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`faq-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Resources & Documentation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {resource.icon}
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {resource.items.map((item, itemIndex) => (
                      <Button
                        key={itemIndex}
                        variant="outline"
                        className="w-full justify-start bg-transparent text-left"
                      >
                        <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Training */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Training & Education</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trainingOptions.map((training, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{training.title}</CardTitle>
                  <CardDescription>{training.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Schedule:</span>
                        <p className="text-gray-600">{training.schedule}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Duration:</span>
                        <p className="text-gray-600">{training.duration}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 block mb-2">Topics Covered:</span>
                      <ul className="space-y-1">
                        {training.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Still Need Help?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">1-800-RAPID-3</p>
              <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM EST</p>
            </div>
            <div>
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">support@rapidcompliance.com</p>
              <p className="text-sm text-gray-500">Response within 4 hours</p>
            </div>
            <div>
              <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-2">Available 24/7</p>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600" onClick={() => setShowChatbot(true)}>
                Start Chat
              </Button>
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
