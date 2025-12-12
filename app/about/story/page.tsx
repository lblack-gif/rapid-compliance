"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Users, Target, Lightbulb } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StartTrialModal } from "@/components/start-trial-modal"
import { Chatbot } from "@/components/chatbot"

export default function OurStoryPage() {
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const milestones = [
    {
      year: "2019",
      title: "The Problem Identified",
      description:
        "Former HUD compliance officers Sarah Johnson and Dr. Maria Rodriguez witnessed firsthand the struggles housing authorities faced with manual Section 3 tracking and spreadsheet-based reporting.",
    },
    {
      year: "2020",
      title: "Company Founded",
      description:
        "Rapid Compliance was born from the frustration of seeing qualified workers miss opportunities due to inefficient systems. Our founders combined their compliance expertise with cutting-edge technology.",
    },
    {
      year: "2021",
      title: "First Customers",
      description:
        "Launched with 5 pilot housing authorities who achieved 95% compliance rates in their first year, proving our approach could transform Section 3 management.",
    },
    {
      year: "2022",
      title: "AI Integration",
      description:
        "Introduced AI-powered email triage and automated response generation, reducing administrative burden by 80% and response times by 90%.",
    },
    {
      year: "2023",
      title: "Rapid Growth",
      description:
        "Reached 100 housing authorities nationwide and launched our contractor portal and mobile app, creating a comprehensive ecosystem for Section 3 compliance.",
    },
    {
      year: "2024",
      title: "Industry Leader",
      description:
        "Now serving 500+ housing authorities, tracking 50K+ workers, and processing millions in compliance data with 98.5% average compliance rates.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartTrial={() => setShowTrialModal(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
            📖 Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Frustration to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Innovation
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The story of how former HUD compliance officers transformed their frustration with manual processes into the
            leading Section 3 compliance platform.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem We Witnessed</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              As former HUD compliance officers, our founders spent years watching housing authorities struggle with
              Section 3 requirements. They saw qualified workers miss opportunities because of inefficient tracking
              systems, and watched compliance teams drown in paperwork instead of focusing on creating jobs.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The breaking point came when a major housing authority nearly lost federal funding due to a simple
              reporting error that could have been prevented with better technology. That's when Sarah Johnson and Dr.
              Maria Rodriguez decided to build the solution they wished they'd had.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">The Vision</h3>
                <p className="text-gray-600">Technology should serve communities, not complicate their work.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "We realized that every minute spent on manual compliance tracking was a minute not spent helping
                  people find jobs and build careers."
                </blockquote>
                <cite className="text-sm font-semibold text-gray-900">— Sarah Johnson, CEO & Founder</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">From a small team with a big vision to the industry leader</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-green-600 rounded-full hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    } mb-4 md:mb-0`}
                  >
                    <Card className="border-0 shadow-lg bg-white">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
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

      {/* Impact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact Today</h2>
          <p className="text-xl text-gray-600">The numbers tell the story of our success</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <p className="text-gray-600">Housing Authorities</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <p className="text-gray-600">Workers Tracked</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98.5%</div>
              <p className="text-gray-600">Compliance Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">80%</div>
              <p className="text-gray-600">Time Savings</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Be Part of Our Story</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the hundreds of organizations already transforming their Section 3 compliance with Rapid Compliance.
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
              <a href="/about/team">Meet Our Team</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StartTrialModal isOpen={showTrialModal} onClose={() => setShowTrialModal(false)} />
      <Chatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </div>
  )
}
