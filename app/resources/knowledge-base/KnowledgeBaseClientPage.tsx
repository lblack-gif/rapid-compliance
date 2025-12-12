"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  ArrowLeft,
  CheckSquare,
  Play,
  FileDown,
} from "lucide-react"

export default function KnowledgeBaseClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModal, setSelectedModal] = useState<string | null>(null)

  const categories = [
    {
      title: "Section 3 Basics",
      description: "Fundamental concepts and requirements",
      articles: [
        {
          id: "section3-requirements",
          title: "Understanding Section 3 Requirements",
          type: "article",
          readTime: "5 min",
          content:
            "Section 3 of the Housing and Urban Development Act of 1968 requires that recipients of certain HUD financial assistance provide job training, employment, and contracting opportunities for low- and very low-income residents in connection with projects and activities in their neighborhoods. This comprehensive guide covers the fundamental requirements, eligibility criteria, and compliance obligations that organizations must understand to successfully implement Section 3 programs.",
        },
        {
          id: "eligible-activities",
          title: "Eligible Activities Overview",
          type: "article",
          readTime: "8 min",
          content:
            "Section 3 applies to housing rehabilitation, housing construction, and other public construction projects assisted under HUD programs when the total amount of assistance exceeds $200,000. This includes Community Development Block Grant (CDBG), HOME Investment Partnerships Program, Housing Trust Fund, and other HUD-assisted projects. Understanding which activities qualify is crucial for proper compliance implementation.",
        },
        {
          id: "compliance-thresholds",
          title: "Compliance Thresholds",
          type: "article",
          readTime: "6 min",
          content:
            "Section 3 compliance thresholds are specific benchmarks that recipients must meet to demonstrate compliance with Section 3 requirements. For labor hours, recipients must ensure that 25% of the total number of labor hours worked by all workers are worked by Section 3 workers. For contracting, recipients must award at least 5% of the total dollar amount of all Section 3 projects to Section 3 business concerns.",
        },
      ],
    },
    {
      title: "Worker Management",
      description: "Managing Section 3 workers and documentation",
      articles: [
        {
          id: "worker-registration",
          title: "Worker Registration Process",
          type: "guide",
          readTime: "10 min",
          content:
            "The worker registration process involves collecting and verifying documentation that establishes an individual's eligibility as a Section 3 worker. This includes income verification, residency documentation, and maintaining accurate records. The process must be streamlined while ensuring compliance with all HUD requirements and maintaining proper documentation for audit purposes.",
        },
        {
          id: "documentation-requirements",
          title: "Documentation Requirements",
          type: "checklist",
          readTime: "7 min",
          items: [
            "Income verification documents (tax returns, pay stubs, benefit statements)",
            "Proof of residency in the service area",
            "Section 3 worker self-certification form",
            "Employment eligibility verification (I-9 forms)",
            "Skills assessment and training records",
            "Work history and references",
            "Safety training certificates",
            "Background check documentation (if required)",
          ],
        },
        {
          id: "training-certification",
          title: "Training and Certification",
          type: "video",
          readTime: "15 min",
          videoUrl: "https://example.com/training-video",
          content:
            "Comprehensive training program covering Section 3 worker certification requirements, safety protocols, and skill development opportunities. This video series provides step-by-step guidance for both workers and administrators on the certification process.",
        },
      ],
    },
    {
      title: "Contractor Compliance",
      description: "Contractor requirements and best practices",
      articles: [
        {
          id: "contractor-obligations",
          title: "Contractor Obligations",
          type: "article",
          readTime: "12 min",
          content:
            "Contractors working on Section 3 projects have specific obligations including making best efforts to provide employment and training opportunities to Section 3 workers and contracting opportunities to Section 3 business concerns. This includes developing action plans, maintaining records, and reporting on compliance efforts.",
        },
        {
          id: "action-plan-development",
          title: "Action Plan Development",
          type: "guide",
          readTime: "20 min",
          content:
            "Action plans are detailed strategies that contractors must develop to demonstrate how they will meet Section 3 requirements. These plans should include specific goals, timelines, outreach strategies, and methods for tracking progress. The plan must be realistic, measurable, and aligned with project requirements.",
        },
        {
          id: "reporting-requirements",
          title: "Reporting Requirements",
          type: "article",
          readTime: "9 min",
          content:
            "Contractors must submit regular reports documenting their Section 3 compliance efforts, including the number of Section 3 workers employed, hours worked, wages paid, and contracts awarded to Section 3 business concerns. Reports must be accurate, timely, and include supporting documentation.",
        },
      ],
    },
    {
      title: "Reporting & Analytics",
      description: "HUD reporting and compliance tracking",
      articles: [
        {
          id: "hud-reporting-templates",
          title: "HUD Reporting Templates",
          type: "download",
          readTime: "2 min",
          downloadUrl: "https://example.com/hud-templates.zip",
          content:
            "Official HUD reporting templates and forms required for Section 3 compliance reporting. Includes quarterly reports, annual summaries, and project-specific documentation templates.",
        },
        {
          id: "quarterly-report-generation",
          title: "Quarterly Report Generation",
          type: "guide",
          readTime: "15 min",
          content:
            "Step-by-step guide for generating quarterly Section 3 compliance reports. Covers data collection, report formatting, submission procedures, and common pitfalls to avoid. Includes templates and examples of properly completed reports.",
        },
        {
          id: "performance-metrics",
          title: "Performance Metrics",
          type: "article",
          readTime: "11 min",
          content:
            "Key performance indicators for measuring Section 3 compliance success, including labor hour percentages, contracting benchmarks, and worker progression metrics. Understanding these metrics is essential for maintaining compliance and demonstrating program effectiveness.",
        },
      ],
    },
  ]

  const quickLinks = [
    {
      id: "hud-forms",
      title: "HUD Forms",
      description: "Official HUD Section 3 forms and templates",
      icon: Download,
      content:
        "Access the complete collection of official HUD Section 3 forms and templates. This includes worker certification forms, contractor reporting templates, compliance checklists, and quarterly reporting forms. All forms are current and comply with the latest HUD requirements.",
      items: [
        "Section 3 Worker Self-Certification Form",
        "Contractor Section 3 Action Plan Template",
        "Quarterly Compliance Report Form",
        "Business Concern Certification Form",
        "Labor Hours Tracking Sheet",
      ],
    },
    {
      id: "compliance-checklist",
      title: "Compliance Checklist",
      description: "Essential compliance verification checklist",
      icon: CheckSquare,
      content:
        "Comprehensive checklist to ensure full Section 3 compliance across all project phases. Use this checklist to verify that all requirements are met and documentation is properly maintained.",
      items: [
        "Project threshold verification completed",
        "Section 3 workers identified and certified",
        "Contractor action plans approved and implemented",
        "Labor hour tracking system in place",
        "Quarterly reports submitted on time",
        "Business concern contracts documented",
        "Training programs established",
        "Audit documentation organized",
      ],
    },
    {
      id: "training-videos",
      title: "Training Videos",
      description: "Comprehensive video training library",
      icon: Video,
      content:
        "Access our complete library of Section 3 training videos covering all aspects of compliance, from basic requirements to advanced reporting strategies. Videos are organized by topic and skill level.",
      items: [
        "Section 3 Fundamentals (30 min)",
        "Worker Certification Process (20 min)",
        "Contractor Compliance Requirements (25 min)",
        "Reporting and Documentation (15 min)",
        "Audit Preparation (35 min)",
        "Best Practices Case Studies (40 min)",
      ],
    },
    {
      id: "best-practices",
      title: "Best Practices",
      description: "Industry best practices and case studies",
      icon: BookOpen,
      content:
        "Learn from successful Section 3 implementations with our collection of best practices, case studies, and proven strategies. These resources provide practical insights for improving compliance outcomes.",
      items: [
        "Successful Worker Recruitment Strategies",
        "Effective Contractor Engagement Methods",
        "Streamlined Documentation Processes",
        "Community Partnership Development",
        "Performance Measurement Techniques",
        "Audit Success Stories",
      ],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "download":
        return <Download className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "checklist":
        return <CheckSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800"
      case "download":
        return "bg-green-100 text-green-800"
      case "guide":
        return "bg-blue-100 text-blue-800"
      case "checklist":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const openModal = (id: string) => {
    setSelectedModal(id)
  }

  const closeModal = () => {
    setSelectedModal(null)
  }

  const getModalContent = (id: string) => {
    // Check if it's a quick link
    const quickLink = quickLinks.find((link) => link.id === id)
    if (quickLink) {
      return {
        title: quickLink.title,
        content: quickLink.content,
        type: "quicklink",
        items: quickLink.items,
      }
    }

    // Check if it's an article
    for (const category of categories) {
      const article = category.articles.find((a) => a.id === id)
      if (article) {
        return {
          title: article.title,
          content: article.content,
          type: article.type,
          items: article.items || [],
          videoUrl: article.videoUrl,
          downloadUrl: article.downloadUrl,
        }
      }
    }

    return null
  }

  const modalContent = selectedModal ? getModalContent(selectedModal) : null

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      articles: category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.articles.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/resources"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Resources</span>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Knowledge Base</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Section 3 compliance, from basic requirements to advanced reporting
              strategies.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search knowledge base..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredCategories.map((category, index) => (
            <Card key={index} className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => openModal(article.id)}
                    >
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(article.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{article.title}</h4>
                          <p className="text-sm text-gray-500">{article.readTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getTypeBadgeColor(article.type)}`}>{article.type}</Badge>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="justify-start bg-transparent h-auto p-4 flex-col items-start space-y-2"
                onClick={() => openModal(link.id)}
              >
                <div className="flex items-center gap-2 w-full">
                  <link.icon className="h-4 w-4" />
                  <span className="font-medium">{link.title}</span>
                </div>
                <p className="text-xs text-gray-500 text-left">{link.description}</p>
              </Button>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?{" "}
            <Link href="/contact/support" className="text-blue-600 hover:text-blue-500 font-medium">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedModal} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modalContent && getTypeIcon(modalContent.type)}
              {modalContent?.title}
            </DialogTitle>
            <DialogDescription>
              {modalContent?.type === "video" && "Training Video Content"}
              {modalContent?.type === "download" && "Downloadable Resources"}
              {modalContent?.type === "checklist" && "Compliance Checklist"}
              {modalContent?.type === "guide" && "Step-by-Step Guide"}
              {modalContent?.type === "article" && "Detailed Article"}
              {modalContent?.type === "quicklink" && "Quick Reference"}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              {modalContent?.type === "video" && (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Play className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Video Player</p>
                  <Button>Play Training Video</Button>
                </div>
              )}

              {modalContent?.type === "download" && (
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <FileDown className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resources
                  </Button>
                </div>
              )}

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{modalContent?.content}</p>
              </div>

              {modalContent?.items && modalContent.items.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {modalContent.type === "checklist" ? "Checklist Items:" : "Included Resources:"}
                  </h4>
                  <ul className="space-y-2">
                    {modalContent.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {modalContent.type === "checklist" ? (
                          <CheckSquare className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        )}
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
