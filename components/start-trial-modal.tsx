"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Loader2 } from "lucide-react"

interface StartTrialModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  fullName: string
  workEmail: string
  organization: string
  role: string
  phone: string
  contractVolume: string
  estimatedUsers: string
  primaryUseCase: string
  consent: boolean
}

interface FormErrors {
  [key: string]: string
}

export function StartTrialModal({ isOpen, onClose }: StartTrialModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    workEmail: "",
    organization: "",
    role: "",
    phone: "",
    contractVolume: "",
    estimatedUsers: "",
    primaryUseCase: "",
    consent: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = "Please enter a valid email address"
    }

    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required"
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.contractVolume.trim()) {
      newErrors.contractVolume = "Contract volume is required"
    }

    if (!formData.estimatedUsers.trim()) {
      newErrors.estimatedUsers = "Estimated users is required"
    }

    if (!formData.primaryUseCase.trim()) {
      newErrors.primaryUseCase = "Primary use case is required"
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms to continue"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to leads store
      const response = await fetch("/api/leads/trial-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "start_trial_modal",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit trial request")
      }

      const result = await response.json()

      // Show success state
      setIsSuccess(true)

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        // Reset form
        setFormData({
          fullName: "",
          workEmail: "",
          organization: "",
          role: "",
          phone: "",
          contractVolume: "",
          estimatedUsers: "",
          primaryUseCase: "",
          consent: false,
        })
      }, 3000)
    } catch (error) {
      console.error("Trial signup error:", error)
      setErrors({ submit: "Failed to submit trial request. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.workEmail.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail) &&
      formData.organization.trim() &&
      formData.role.trim() &&
      formData.phone.trim() &&
      formData.contractVolume.trim() &&
      formData.estimatedUsers.trim() &&
      formData.primaryUseCase.trim() &&
      formData.consent &&
      Object.keys(errors).length === 0
    )
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trial Request Submitted!</h3>
            <p className="text-gray-600 mb-4">
              We've sent a confirmation email to {formData.workEmail}. Our team will contact you within 24 hours to set
              up your trial.
            </p>
            <p className="text-sm text-gray-500">This window will close automatically...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Start Your Free Trial</DialogTitle>
          <p className="text-gray-600">Get full access to Rapid Compliance for 14 days, no credit card required.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={errors.fullName ? "border-red-500" : ""}
                placeholder="John Smith"
              />
              {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <Label htmlFor="workEmail">Work Email *</Label>
              <Input
                id="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleInputChange("workEmail", e.target.value)}
                className={errors.workEmail ? "border-red-500" : ""}
                placeholder="john@company.com"
              />
              {errors.workEmail && <p className="text-sm text-red-600 mt-1">{errors.workEmail}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
                className={errors.organization ? "border-red-500" : ""}
                placeholder="Housing Authority"
              />
              {errors.organization && <p className="text-sm text-red-600 mt-1">{errors.organization}</p>}
            </div>

            <div>
              <Label htmlFor="role">Your Role *</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance-director">Compliance Director</SelectItem>
                  <SelectItem value="project-manager">Project Manager</SelectItem>
                  <SelectItem value="operations-manager">Operations Manager</SelectItem>
                  <SelectItem value="executive-director">Executive Director</SelectItem>
                  <SelectItem value="program-coordinator">Program Coordinator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="contractVolume">Annual Contract Volume *</Label>
              <Select
                value={formData.contractVolume}
                onValueChange={(value) => handleInputChange("contractVolume", value)}
              >
                <SelectTrigger className={errors.contractVolume ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1m">Under $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m-25m">$5M - $25M</SelectItem>
                  <SelectItem value="25m-100m">$25M - $100M</SelectItem>
                  <SelectItem value="over-100m">Over $100M</SelectItem>
                </SelectContent>
              </Select>
              {errors.contractVolume && <p className="text-sm text-red-600 mt-1">{errors.contractVolume}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="estimatedUsers">Estimated Number of Users *</Label>
            <Select
              value={formData.estimatedUsers}
              onValueChange={(value) => handleInputChange("estimatedUsers", value)}
            >
              <SelectTrigger className={errors.estimatedUsers ? "border-red-500" : ""}>
                <SelectValue placeholder="How many people will use the platform?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 users</SelectItem>
                <SelectItem value="6-15">6-15 users</SelectItem>
                <SelectItem value="16-50">16-50 users</SelectItem>
                <SelectItem value="51-100">51-100 users</SelectItem>
                <SelectItem value="over-100">Over 100 users</SelectItem>
              </SelectContent>
            </Select>
            {errors.estimatedUsers && <p className="text-sm text-red-600 mt-1">{errors.estimatedUsers}</p>}
          </div>

          <div>
            <Label htmlFor="primaryUseCase">Primary Use Case *</Label>
            <Textarea
              id="primaryUseCase"
              value={formData.primaryUseCase}
              onChange={(e) => handleInputChange("primaryUseCase", e.target.value)}
              className={errors.primaryUseCase ? "border-red-500" : ""}
              placeholder="What's your main goal with Section 3 compliance management?"
              rows={3}
            />
            {errors.primaryUseCase && <p className="text-sm text-red-600 mt-1">{errors.primaryUseCase}</p>}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
              className={errors.consent ? "border-red-500" : ""}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className="text-sm font-normal leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to receive communications about Rapid Compliance and consent to the processing of my personal
                data in accordance with the{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </Label>
              {errors.consent && <p className="text-sm text-red-600">{errors.consent}</p>}
            </div>
          </div>

          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting Trial...
                </>
              ) : (
                "Start Free Trial"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
