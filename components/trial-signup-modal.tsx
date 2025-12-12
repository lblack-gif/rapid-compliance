"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2, Building2, Mail, User, Target } from "lucide-react"

interface TrialSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TrialSignupModal({ isOpen, onClose }: TrialSignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    companySize: "",
    industry: "",
    currentChallenges: "",
    timeline: "",
    budgetRange: "",
    howDidYouHear: "",
    specificNeeds: "",
    preferredContactMethod: "email",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/trial-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setTimeout(() => {
          onClose()
          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            jobTitle: "",
            company: "",
            companySize: "",
            industry: "",
            currentChallenges: "",
            timeline: "",
            budgetRange: "",
            howDidYouHear: "",
            specificNeeds: "",
            preferredContactMethod: "email",
          })
          setStatus("idle")
        }, 10000) // Extended timeout to 10 seconds (10000ms) as requested
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Failed to submit trial request. Please try again.")
      }
    } catch (error) {
      console.error("Trial signup error:", error)
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Rapid Compliance!</h3>
            <p className="text-gray-600 mb-4">
              Your 14-day free trial has been activated. We'll be in touch within 24 hours to help you get started.
            </p>
            <p className="text-sm text-gray-500">Check your email for login credentials and setup instructions.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Start Your Free Trial</DialogTitle>
          <DialogDescription className="text-gray-600">
            Get full access to Rapid Compliance for 14 days. No credit card required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Work Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                required
                className="mt-1"
                placeholder="e.g., Compliance Manager, Housing Director"
              />
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              Company Information
            </h4>
            <div>
              <Label htmlFor="company">Organization Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
                className="mt-1"
                placeholder="e.g., DC Housing Authority"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companySize">Organization Size *</Label>
                <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="industry">Industry Type</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing-authority">Housing Authority</SelectItem>
                    <SelectItem value="general-contractor">General Contractor</SelectItem>
                    <SelectItem value="construction">Construction Company</SelectItem>
                    <SelectItem value="consulting">Consulting Firm</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Project Details
            </h4>
            <div>
              <Label htmlFor="currentChallenges">Current Section 3 Challenges *</Label>
              <Textarea
                id="currentChallenges"
                value={formData.currentChallenges}
                onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                required
                className="mt-1"
                rows={3}
                placeholder="Describe your current challenges with Section 3 compliance, worker tracking, or contractor management..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeline">Implementation Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 30 days)</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="exploring">Just exploring options</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budgetRange">Budget Range</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">Under $5,000/month</SelectItem>
                    <SelectItem value="5k-15k">$5,000 - $15,000/month</SelectItem>
                    <SelectItem value="15k-30k">$15,000 - $30,000/month</SelectItem>
                    <SelectItem value="30k-50k">$30,000 - $50,000/month</SelectItem>
                    <SelectItem value="50k+">$50,000+/month</SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="specificNeeds">Specific Features of Interest</Label>
              <Textarea
                id="specificNeeds"
                value={formData.specificNeeds}
                onChange={(e) => handleInputChange("specificNeeds", e.target.value)}
                className="mt-1"
                rows={2}
                placeholder="e.g., AI email processing, contractor tracking, HUD reporting, worker certification management..."
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              Additional Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
                <Select
                  value={formData.howDidYouHear}
                  onValueChange={(value) => handleInputChange("howDidYouHear", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-search">Google Search</SelectItem>
                    <SelectItem value="referral">Referral from colleague</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="industry-event">Industry Event/Conference</SelectItem>
                    <SelectItem value="hud-website">HUD Website</SelectItem>
                    <SelectItem value="trade-publication">Trade Publication</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                <Select
                  value={formData.preferredContactMethod}
                  onValueChange={(value) => handleInputChange("preferredContactMethod", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="text">Text Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {status === "error" && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between pt-6 border-t">
            <p className="text-sm text-gray-500">* Required fields. We'll never share your information.</p>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Starting Trial...
                  </>
                ) : (
                  "Start Free Trial"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
