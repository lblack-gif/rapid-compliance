"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"
import {
  Home,
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  LogOut,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Download,
  ExternalLink,
  Clock,
  Building2,
  Award,
  Search,
  Filter,
  AlertTriangle,
  HelpCircle,
  Shield,
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export function ResidentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const { user, logout } = useAuth()

  const residentStats = {
    nearbyProjects: 5,
    jobOpportunities: 12,
    trainingPrograms: 8,
    communityEvents: 3,
  }

  const jobOpportunities = [
    {
      id: "JOB-001",
      title: "Construction Worker",
      company: "ABC Construction",
      location: "Washington, DC",
      type: "Full-time",
      wage: "$18-22/hour",
      section3: true,
      posted: "2 days ago",
      description: "Seeking experienced construction workers for Section 3 housing project.",
    },
    {
      id: "JOB-002",
      title: "HVAC Technician",
      company: "Metro HVAC Services",
      location: "Alexandria, VA",
      type: "Part-time",
      wage: "$25-30/hour",
      section3: true,
      posted: "1 week ago",
      description: "HVAC installation and maintenance for residential properties.",
    },
    {
      id: "JOB-003",
      title: "Electrical Apprentice",
      company: "Capital Electric",
      location: "Arlington, VA",
      type: "Apprenticeship",
      wage: "$16-20/hour",
      section3: true,
      posted: "3 days ago",
      description: "Entry-level electrical apprenticeship with training provided.",
    },
  ]

  const localProjects = [
    {
      id: "PRJ-001",
      name: "Riverside Housing Development",
      location: "Southeast DC",
      status: "Active",
      completion: "65%",
      jobs: 45,
      contractor: "ABC Construction",
      description: "Mixed-income housing development with 200 units",
    },
    {
      id: "PRJ-002",
      name: "Downtown Community Center",
      location: "Downtown DC",
      status: "Planning",
      completion: "15%",
      jobs: 25,
      contractor: "Metro Builders",
      description: "New community center with job training facilities",
    },
    {
      id: "PRJ-003",
      name: "Senior Housing Complex",
      location: "Northeast DC",
      status: "Active",
      completion: "80%",
      jobs: 15,
      contractor: "Urban Development",
      description: "Affordable senior housing with 150 units",
    },
  ]

  const trainingPrograms = [
    {
      id: "TRN-001",
      title: "Construction Safety Certification (OSHA 10)",
      provider: "DC Building Trades",
      duration: "2 weeks",
      cost: "Free",
      nextStart: "March 15, 2024",
      description: "Essential safety training for construction workers",
    },
    {
      id: "TRN-002",
      title: "Electrical Apprenticeship Program",
      provider: "IBEW Local 26",
      duration: "4 years",
      cost: "Paid training",
      nextStart: "September 2024",
      description: "Complete electrical training with job placement",
    },
    {
      id: "TRN-003",
      title: "HVAC Certification Course",
      provider: "UDC Community College",
      duration: "6 months",
      cost: "$500 (scholarships available)",
      nextStart: "April 1, 2024",
      description: "Comprehensive HVAC installation and repair training",
    },
  ]

  const communityEvents = [
    {
      id: "EVT-001",
      title: "Section 3 Job Fair",
      date: "March 25, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "DC Convention Center",
      description: "Meet with contractors and explore Section 3 opportunities",
    },
    {
      id: "EVT-002",
      title: "Skills Assessment Workshop",
      date: "April 5, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Southeast Library",
      description: "Free skills assessment and career counseling",
    },
    {
      id: "EVT-003",
      title: "Financial Literacy Seminar",
      date: "April 12, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center",
      description: "Learn about budgeting, saving, and homeownership",
    },
  ]

  const getSidebarGradient = (itemId: string) => {
    const gradients = {
      overview: "bg-gradient-to-r from-blue-600 to-green-600",
      opportunities: "bg-gradient-to-r from-emerald-600 to-cyan-600",
      projects: "bg-gradient-to-r from-teal-600 to-blue-600",
      training: "bg-gradient-to-r from-violet-600 to-purple-600",
      events: "bg-gradient-to-r from-amber-500 to-orange-600",
      contact: "bg-gradient-to-r from-indigo-600 to-purple-600",
      resources: "bg-gradient-to-r from-slate-600 to-gray-600",
    }
    return gradients[itemId] || "bg-gradient-to-r from-blue-600 to-green-600"
  }

  const sidebarItems = [
    {
      category: "Dashboard",
      items: [
        { id: "overview", label: "Overview", icon: Home },
        { id: "opportunities", label: "Job Opportunities", icon: Briefcase },
      ],
    },
    {
      category: "Community",
      items: [
        { id: "projects", label: "Local Projects", icon: MapPin },
        { id: "training", label: "Training Programs", icon: GraduationCap },
        { id: "events", label: "Events", icon: Calendar },
      ],
    },
    {
      category: "Support",
      items: [
        { id: "contact", label: "Contact Us", icon: MessageSquare },
        { id: "resources", label: "Resources", icon: FileText },
      ],
    },
    {
      category: "Security",
      items: [{ id: "security", label: "Security Information", icon: Shield }],
    },
  ]

  const handleApplyToJob = (job) => {
    const successDiv = document.createElement("div")
    successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    successDiv.innerHTML = `Application submitted for ${job.title}!`
    document.body.appendChild(successDiv)
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 3000)
  }

  const handleRegisterForEvent = (event) => {
    const successDiv = document.createElement("div")
    successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    successDiv.innerHTML = `Registered for ${event.title}!`
    document.body.appendChild(successDiv)
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 3000)
  }

  const handleApplyToTraining = (program) => {
    const successDiv = document.createElement("div")
    successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    successDiv.innerHTML = `Application submitted for ${program.title}!`
    document.body.appendChild(successDiv)
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 3000)
  }

  const handleViewProjectDetails = (project) => {
    alert(
      `Project Details:\n\nName: ${project.name}\nLocation: ${project.location}\nStatus: ${project.status}\nCompletion: ${project.completion}\nAvailable Jobs: ${project.jobs}\nContractor: ${project.contractor}\n\nDescription: ${project.description}`,
    )
  }

  const handleReportBarriers = () => {
    const successDiv = document.createElement("div")
    successDiv.className = "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    successDiv.innerHTML = "Barrier report submitted successfully!"
    document.body.appendChild(successDiv)
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 3000)
  }

  const handleRequestHelp = () => {
    const successDiv = document.createElement("div")
    successDiv.className = "fixed top-4 right-4 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    successDiv.innerHTML = "Help request submitted successfully!"
    document.body.appendChild(successDiv)
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 3000)
  }

  const handleViewSecurityInfo = () => {
    alert("Security information will be provided here.")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 border-transparent shadow-sm font-medium"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="w-72 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg">Resident Portal</h1>
              <p className="text-xs text-gray-500">Community Resources</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">Community Member</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Welcome, {user?.name}</p>
          </div>
        </div>

        <nav className="px-4 py-4 overflow-y-auto flex-1">
          {sidebarItems.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? `${getSidebarGradient(item.id)} text-white shadow-sm`
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 border-transparent font-medium"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Resident Dashboard</h1>
                <p className="text-gray-600 text-lg">
                  Discover Section 3 opportunities and resources in your community
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Nearby Projects</CardTitle>
                    <MapPin className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{residentStats.nearbyProjects}</div>
                    <p className="text-xs text-gray-500">Active in your area</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Job Opportunities</CardTitle>
                    <Briefcase className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{residentStats.jobOpportunities}</div>
                    <p className="text-xs text-gray-500">Available positions</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Training Programs</CardTitle>
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{residentStats.trainingPrograms}</div>
                    <p className="text-xs text-gray-500">Skills development</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Community Events</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{residentStats.communityEvents}</div>
                    <p className="text-xs text-gray-500">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Get Started
                  </CardTitle>
                  <CardDescription>Explore Section 3 opportunities and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Button
                      className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                      onClick={() => setActiveTab("opportunities")}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">Find Jobs</span>
                    </Button>
                    <Button
                      className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                      onClick={() => setActiveTab("training")}
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Training Programs</span>
                    </Button>
                    <Button
                      className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                      onClick={handleReportBarriers}
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">Report Barriers</span>
                    </Button>
                    <Button
                      className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                      onClick={handleRequestHelp}
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <HelpCircle className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="text-sm font-medium">Request Help</span>
                    </Button>
                    <Button
                      className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
                      onClick={() => setActiveTab("security")}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium">Security Information</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-green-600" />
                    Latest Job Opportunities
                  </CardTitle>
                  <CardDescription>New Section 3 positions in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobOpportunities.slice(0, 2).map((job) => (
                      <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-sm text-gray-600">
                              {job.company} • {job.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              {job.wage} • {job.type}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Section 3</Badge>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 bg-transparent"
                      onClick={() => setActiveTab("opportunities")}
                    >
                      View All Opportunities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "opportunities" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
                  <p className="text-gray-600">Current Section 3 job openings in your area</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search jobs..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" className="border-gray-200 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {jobOpportunities.map((job) => (
                  <Card key={job.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            {job.section3 && <Badge className="bg-green-100 text-green-800">Section 3 Eligible</Badge>}
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Company</p>
                              <p className="font-medium text-gray-900">{job.company}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{job.location}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p className="font-medium text-gray-900">{job.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Wage</p>
                              <p className="font-medium text-gray-900">{job.wage}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{job.description}</p>
                          <p className="text-sm text-gray-500">Posted {job.posted}</p>
                        </div>
                        <div className="ml-6">
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                            onClick={() => handleApplyToJob(job)}
                          >
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Local Projects</h1>
                <p className="text-gray-600">HUD-funded projects in your community</p>
              </div>

              <div className="grid gap-6">
                {localProjects.map((project) => (
                  <Card key={project.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                            <Badge
                              variant={project.status === "Active" ? "default" : "secondary"}
                              className={project.status === "Active" ? "bg-green-100 text-green-800" : ""}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{project.location}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Contractor</p>
                              <p className="font-medium text-gray-900">{project.contractor}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Available Jobs</p>
                              <p className="font-medium text-gray-900">{project.jobs} positions</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Completion</p>
                              <p className="font-medium text-gray-900">{project.completion}</p>
                            </div>
                          </div>
                          <p className="text-gray-600">{project.description}</p>
                        </div>
                        <div className="ml-6">
                          <Button
                            variant="outline"
                            className="border-gray-200 bg-transparent"
                            onClick={() => handleViewProjectDetails(project)}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "training" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Training Programs</h1>
                <p className="text-gray-600">Skills development and certification opportunities</p>
              </div>

              <div className="grid gap-6">
                {trainingPrograms.map((program) => (
                  <Card key={program.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Provider</p>
                              <p className="font-medium text-gray-900">{program.provider}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium text-gray-900">{program.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Cost</p>
                              <p className="font-medium text-gray-900">{program.cost}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Next Start</p>
                              <p className="font-medium text-gray-900">{program.nextStart}</p>
                            </div>
                          </div>
                          <p className="text-gray-600">{program.description}</p>
                        </div>
                        <div className="ml-6 space-y-2">
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 w-full"
                            onClick={() => handleApplyToTraining(program)}
                          >
                            Apply Now
                          </Button>
                          <Button variant="outline" className="border-gray-200 w-full bg-transparent">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Community Events</h1>
                <p className="text-gray-600">Upcoming events and activities in your community</p>
              </div>

              <div className="grid gap-6">
                {communityEvents.map((event) => (
                  <Card key={event.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium text-gray-900">{event.date}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Time</p>
                              <p className="font-medium text-gray-900">{event.time}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{event.location}</p>
                            </div>
                          </div>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                        <div className="ml-6">
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                            onClick={() => handleRegisterForEvent(event)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Register
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
                <p className="text-gray-600">Get help and support for Section 3 opportunities</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription>We'll get back to you within 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <Input placeholder="Your full name" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input type="email" placeholder="your.email@example.com" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Subject</label>
                      <Input placeholder="How can we help?" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <Textarea
                        placeholder="Tell us more about your question or concern..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>Multiple ways to reach our support team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Phone Support</p>
                        <p className="text-gray-600">(202) 555-0123</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 5 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email Support</p>
                        <p className="text-gray-600">section3@dcha.org</p>
                        <p className="text-sm text-gray-500">24-hour response time</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Office Location</p>
                        <p className="text-gray-600">1133 North Capitol St NE</p>
                        <p className="text-gray-600">Washington, DC 20002</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">Office Hours</p>
                        <p className="text-gray-600">Monday - Friday: 8:30 AM - 5:00 PM</p>
                        <p className="text-gray-600">Saturday - Sunday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
                <p className="text-gray-600">Downloadable materials and helpful information</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Section 3 Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Complete guide to Section 3 requirements and opportunities</p>
                    <Button variant="outline" className="w-full border-gray-200 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-green-600" />
                      Training Directory
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Directory of all available training programs and providers</p>
                    <Button variant="outline" className="w-full border-gray-200 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      Job Search Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Tips and strategies for finding Section 3 employment</p>
                    <Button variant="outline" className="w-full border-gray-200 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-600" />
                      Certification Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">How to obtain Section 3 worker certification</p>
                    <Button variant="outline" className="w-full border-gray-200 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Business Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Information about Section 3 business opportunities</p>
                    <Button variant="outline" className="w-full border-gray-200 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-green-600" />
                      External Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        HUD Section 3 Website
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        DC Department of Employment
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        UDC Community College
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Security Information</h1>
                <p className="text-gray-600">Important security tips and resources</p>
              </div>

              <div className="grid gap-6">
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      Please ensure you follow all security protocols to protect your personal information and community
                      resources.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 bg-transparent"
                      onClick={handleViewSecurityInfo}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      View Security Tips
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} userRole="resident" />
    </div>
  )
}
