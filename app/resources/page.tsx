"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, Download, Search, ArrowRight, Clock, Star, Play, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"

export default function ResourcesPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const documentation = [
    {
      title: "Getting Started Guide",
      description: "Complete setup and onboarding guide for new users",
      category: "Setup",
      readTime: "15 min",
      popularity: 5,
      href: "/docs/getting-started",
    },
    {
      title: "Section 3 Requirements Overview",
      description: "Comprehensive guide to HUD Section 3 compliance requirements",
      category: "Compliance",
      readTime: "25 min",
      popularity: 5,
      href: "/docs/section3-overview",
    },
    {
      title: "Worker Management Best Practices",
      description: "How to effectively track and manage Section 3 workers",
      category: "Management",
      readTime: "20 min",
      popularity: 4,
      href: "/docs/worker-management",
    },
    {
      title: "Contractor Portal Setup",
      description: "Step-by-step guide for setting up contractor access",
      category: "Setup",
      readTime: "12 min",
      popularity: 4,
      href: "/docs/contractor-portal",
    },
    {
      title: "Reporting and Analytics",
      description: "Generate compliance reports and analyze performance data",
      category: "Analytics",
      readTime: "18 min",
      popularity: 4,
      href: "/docs/reporting",
    },
    {
      title: "API Integration Guide",
      description: "Connect Rapid Compliance with your existing systems",
      category: "Integration",
      readTime: "30 min",
      popularity: 3,
      href: "/docs/api-integration",
    },
  ]

  const videos = [
    {
      title: "Platform Overview Demo",
      description: "Complete walkthrough of the Rapid Compliance platform",
      duration: "12:34",
      category: "Overview",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Platform+Demo",
      href: "/videos/platform-overview",
    },
    {
      title: "Setting Up Your First Project",
      description: "Learn how to create and configure your first Section 3 project",
      duration: "8:45",
      category: "Tutorial",
      thumbnail: "/placeholder.svg?height=180&width=320&text=First+Project",
      href: "/videos/first-project",
    },
    {
      title: "Worker Certification Process",
      description: "Step-by-step guide to certifying Section 3 workers",
      duration: "15:22",
      category: "Tutorial",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Worker+Certification",
      href: "/videos/worker-certification",
    },
    {
      title: "Advanced Reporting Features",
      description: "Unlock the full potential of compliance reporting",
      duration: "18:56",
      category: "Advanced",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Advanced+Reporting",
      href: "/videos/advanced-reporting",
    },
  ]

  const webinars = [
    {
      title: "Section 3 Compliance in 2024: What's New",
      description: "Latest updates to HUD Section 3 requirements and best practices",
      date: "January 25, 2024",
      time: "2:00 PM EST",
      status: "upcoming",
      attendees: 245,
      href: "/webinars/section3-2024",
    },
    {
      title: "Maximizing Worker Placement Success",
      description: "Strategies for improving Section 3 worker placement rates",
      date: "January 18, 2024",
      time: "1:00 PM EST",
      status: "recorded",
      attendees: 189,
      href: "/webinars/worker-placement",
    },
    {
      title: "AI-Powered Compliance Management",
      description: "How artificial intelligence is transforming compliance workflows",
      date: "January 11, 2024",
      time: "3:00 PM EST",
      status: "recorded",
      attendees: 312,
      href: "/webinars/ai-compliance",
    },
  ]

  const templates = [
    {
      title: "Section 3 Action Plan Template",
      description: "Standard template for contractor Section 3 action plans",
      format: "PDF",
      size: "2.1 MB",
      downloads: 1247,
      href: "/templates/action-plan.pdf",
    },
    {
      title: "Worker Certification Checklist",
      description: "Comprehensive checklist for Section 3 worker verification",
      format: "PDF",
      size: "1.8 MB",
      downloads: 892,
      href: "/templates/worker-checklist.pdf",
    },
    {
      title: "Compliance Report Template",
      description: "HUD-compliant reporting template for quarterly submissions",
      format: "Excel",
      size: "3.2 MB",
      downloads: 654,
      href: "/templates/compliance-report.xlsx",
    },
    {
      title: "Contractor Evaluation Form",
      description: "Standardized form for evaluating contractor performance",
      format: "PDF",
      size: "1.5 MB",
      downloads: 423,
      href: "/templates/contractor-evaluation.pdf",
    },
  ]

  const filteredDocs = documentation.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPopularityStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            📚 Knowledge Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resources &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to master Section 3 compliance with comprehensive guides, tutorials, and expert
            insights.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="documentation" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="documentation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
              <Badge variant="outline">{filteredDocs.length} articles</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocs.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{doc.category}</Badge>
                      <div className="flex items-center gap-1">{getPopularityStars(doc.popularity)}</div>
                    </div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {doc.readTime}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.href}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
              <Badge variant="outline">{videos.length} videos</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((video, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{video.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      asChild
                    >
                      <a href={video.href}>
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webinars" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Webinars</h2>
              <Badge variant="outline">{webinars.length} sessions</Badge>
            </div>
            <div className="space-y-4">
              {webinars.map((webinar, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant={webinar.status === "upcoming" ? "default" : "secondary"}
                            className={webinar.status === "upcoming" ? "bg-green-100 text-green-800" : ""}
                          >
                            {webinar.status === "upcoming" ? "Upcoming" : "Recorded"}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            {webinar.attendees} attendees
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                        <p className="text-gray-600 mb-3">{webinar.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{webinar.date}</span>
                          <span>{webinar.time}</span>
                        </div>
                      </div>
                      <div className="ml-6">
                        <Button
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                          asChild
                        >
                          <a href={webinar.href}>
                            {webinar.status === "upcoming" ? "Register" : "Watch Recording"}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Templates & Forms</h2>
              <Badge variant="outline">{templates.length} downloads</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {templates.map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      {template.title}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{template.format}</span>
                        <span>{template.size}</span>
                        <span>{template.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={template.href}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Template
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Put these resources to work with a free trial of Rapid Compliance.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            onClick={() => setShowTrialModal(true)}
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
    </div>
  )
}
