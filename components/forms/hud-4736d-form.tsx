"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Calendar, CheckCircle2 } from "lucide-react"
import type { Worker } from "@/scripts/fetch-worker-data"

export interface Form4736DData {
  workerId?: string
  certificationDate: string
  section3Status: "targeted" | "non-targeted"
  attestationSigned: boolean
  attestationDate: string
  notes: string
  adminSignature: string
  adminSignatureDate: string
  formStatus: "draft" | "submitted" | "verified"
}

interface HUD4736DFormProps {
  worker: Worker
  onSubmit?: (data: Form4736DData) => Promise<void>
  initialData?: Form4736DData
  isEditing?: boolean
}

export function HUD4736DForm({ worker, onSubmit, initialData, isEditing = false }: HUD4736DFormProps) {
  const [formData, setFormData] = useState<Form4736DData>(
    initialData || {
      workerId: worker.id,
      certificationDate: new Date().toISOString().split("T")[0],
      section3Status: worker.isTargeted ? "targeted" : "non-targeted",
      attestationSigned: false,
      attestationDate: "",
      notes: "",
      adminSignature: "",
      adminSignatureDate: "",
      formStatus: "draft",
    },
  )
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (!formData.attestationSigned) {
      alert("Worker attestation must be signed before submission.")
      return
    }
    if (!formData.adminSignature) {
      alert("Admin signature is required before submission.")
      return
    }

    setSaving(true)
    try {
      if (onSubmit) {
        await onSubmit({ ...formData, formStatus: "submitted" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting form. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle>HUD Form 4736-D - Section 3 Worker Self-Certification</CardTitle>
              </div>
              <CardDescription className="mt-2">
                This form verifies Section 3 employment eligibility for {worker.firstName} {worker.lastName}
              </CardDescription>
            </div>
            {formData.formStatus === "verified" && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Verified
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Worker Information Section */}
          <div className="space-y-4 pb-6 border-b">
            <h3 className="font-semibold text-lg">Worker Information</h3>
            <div className="grid gap-4 md:grid-cols-2 bg-gray-50 p-4 rounded-lg">
              <div>
                <Label className="text-sm text-gray-600">Full Name</Label>
                <p className="font-medium mt-1">
                  {worker.firstName} {worker.lastName}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Email</Label>
                <p className="font-medium mt-1">{worker.email}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Phone</Label>
                <p className="font-medium mt-1">{worker.phone}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Address</Label>
                <p className="font-medium mt-1">{worker.address}</p>
              </div>
            </div>
          </div>

          {/* Certification Information */}
          <div className="space-y-4 pb-6 border-b">
            <h3 className="font-semibold text-lg">Certification Information</h3>

            <div className="space-y-2">
              <Label htmlFor="certificationDate">Certification Date</Label>
              <Input
                id="certificationDate"
                type="date"
                value={formData.certificationDate}
                onChange={(e) => setFormData({ ...formData, certificationDate: e.target.value })}
                disabled={isEditing && formData.formStatus === "verified"}
              />
            </div>

            <div className="space-y-3">
              <Label>Section 3 Employment Status</Label>
              <RadioGroup
                value={formData.section3Status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    section3Status: value as "targeted" | "non-targeted",
                  })
                }
                disabled={isEditing && formData.formStatus === "verified"}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="targeted" id="targeted" />
                  <Label htmlFor="targeted" className="font-normal cursor-pointer">
                    Targeted Section 3 (Low-income, very low-income, or other priority resident)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-targeted" id="non-targeted" />
                  <Label htmlFor="non-targeted" className="font-normal cursor-pointer">
                    Non-Targeted Section 3 (Resident/worker in project area)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Worker Attestation */}
          <div className="space-y-4 pb-6 border-b bg-amber-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Worker Attestation</h3>
            <p className="text-sm text-gray-700">
              I certify that I meet the definition of a Section 3 resident/worker as defined in 24 CFR 135.5 and attest
              that the information provided is true and accurate.
            </p>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="attestationDate">Worker Attestation Date</Label>
                <Input
                  id="attestationDate"
                  type="date"
                  value={formData.attestationDate}
                  onChange={(e) => setFormData({ ...formData, attestationDate: e.target.value })}
                  disabled={isEditing && formData.formStatus === "verified"}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attestationSigned"
                  checked={formData.attestationSigned}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      attestationSigned: checked as boolean,
                    })
                  }
                  disabled={isEditing && formData.formStatus === "verified"}
                />
                <Label htmlFor="attestationSigned" className="font-medium cursor-pointer text-sm">
                  I attest that the information above is true and accurate
                </Label>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4 pb-6 border-b">
            <h3 className="font-semibold text-lg">Notes</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Information (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional notes or documentation references"
                rows={3}
                disabled={isEditing && formData.formStatus === "verified"}
              />
            </div>
          </div>

          {/* Admin Certification */}
          <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Admin Certification</h3>

            <div className="space-y-2">
              <Label htmlFor="adminSignature">Admin Signature/Name</Label>
              <Input
                id="adminSignature"
                value={formData.adminSignature}
                onChange={(e) => setFormData({ ...formData, adminSignature: e.target.value })}
                placeholder="Enter admin name or signature"
                disabled={isEditing && formData.formStatus === "verified"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminSignatureDate">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Verification Date
                </div>
              </Label>
              <Input
                id="adminSignatureDate"
                type="date"
                value={formData.adminSignatureDate}
                onChange={(e) => setFormData({ ...formData, adminSignatureDate: e.target.value })}
                disabled={isEditing && formData.formStatus === "verified"}
              />
            </div>
          </div>

          {/* Status Badge */}
          {isEditing && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <Label className="text-sm font-medium">Form Status</Label>
              <p className="text-sm mt-2 capitalize">
                {formData.formStatus === "draft" && "Draft - Not submitted"}
                {formData.formStatus === "submitted" && "Submitted - Pending admin verification"}
                {formData.formStatus === "verified" && "Verified - Form is complete and verified"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isEditing || formData.formStatus !== "verified" ? (
        <div className="flex gap-3 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Submitting..." : "Submit Certification"}
          </Button>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-800 font-medium">Form 4736-D has been verified and is locked</p>
        </div>
      )}
    </div>
  )
}
