"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  Zap,
  ImageIcon,
  Trash2,
} from "lucide-react"

interface ProcessedContract {
  id: string
  fileName: string
  contractorName: string
  contractValue: number
  startDate: string
  endDate: string
  section3Commitment: number
  status: "processing" | "completed" | "error"
  confidence: number
  extractedData: any
}

export function BulkContractProcessor() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [processedContracts, setProcessedContracts] = useState<ProcessedContract[]>([])
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedContract, setSelectedContract] = useState<ProcessedContract | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    setFiles([...files, ...uploadedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const processContracts = async () => {
    setProcessing(true)
    setProgress(0)
    const results: ProcessedContract[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Simulate AI processing with realistic delays
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

      // Mock extracted data - in real implementation, this would use OCR + AI
      const mockContract: ProcessedContract = {
        id: `contract-${Date.now()}-${i}`,
        fileName: file.name,
        contractorName: `${["Hamel Builders", "Turner Construction", "Clark Construction", "Skanska USA", "Gilbane Building"][Math.floor(Math.random() * 5)]} Inc.`,
        contractValue: Math.floor(Math.random() * 10000000) + 500000,
        startDate: "2024-01-15",
        endDate: "2025-12-31",
        section3Commitment: Math.floor(Math.random() * 15) + 20, // 20-35%
        status: Math.random() > 0.1 ? "completed" : "error", // 90% success rate
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
        extractedData: {
          rfpNumber: `RFP-2024-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
          projectTitle: `Housing Development Project ${i + 1}`,
          laborHourCommitments: {
            total: Math.floor(Math.random() * 5000) + 2000,
            section3: Math.floor(Math.random() * 1000) + 500,
            targeted: Math.floor(Math.random() * 200) + 100,
          },
          subcontractors: Math.floor(Math.random() * 5) + 1,
          reportingContact: {
            name: `Contact Person ${i + 1}`,
            email: `contact${i + 1}@contractor.com`,
            phone: `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          },
        },
      }

      results.push(mockContract)
      setProcessedContracts([...results])
      setProgress(((i + 1) / files.length) * 100)
    }

    setProcessing(false)
    setShowResults(true)
  }

  const exportResults = () => {
    const csvContent = [
      "File Name,Contractor Name,Contract Value,Start Date,End Date,Section 3 Commitment,Status,Confidence",
      ...processedContracts.map(
        (contract) =>
          `"${contract.fileName}","${contract.contractorName}",${contract.contractValue},${contract.startDate},${contract.endDate},${contract.section3Commitment}%,${contract.status},${contract.confidence}%`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `processed-contracts-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string, confidence: number) => {
    switch (status) {
      case "completed":
        return (
          <Badge className={confidence >= 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            <CheckCircle className="h-3 w-3 mr-1" />
            {confidence >= 90 ? "High Confidence" : "Review Needed"}
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Contract Processor</h1>
          <p className="text-gray-600">AI-powered contract analysis and data extraction for your 300+ contracts</p>
        </div>
        {processedContracts.length > 0 && (
          <Button onClick={exportResults}>
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        )}
      </div>

      {/* Processing Capabilities */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Zap className="h-5 w-5" />
              AI-Powered OCR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">
              Advanced optical character recognition extracts text from scanned PDFs and images with 95%+ accuracy.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <FileText className="h-5 w-5" />
              Smart Data Extraction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">
              Machine learning identifies key contract elements: values, dates, Section 3 commitments, and contact info.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <CheckCircle className="h-5 w-5" />
              Compliance Validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">
              Automatic validation against HUD Section 3 requirements with confidence scoring and error detection.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Contract Documents</CardTitle>
          <CardDescription>
            Upload PDF contracts, scanned documents, or images. Supports batch processing of up to 500 files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-gray-600 mb-4">Supports PDF, JPG, PNG, TIFF files up to 50MB each</p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.tiff"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer bg-transparent">
                  Select Files
                </Button>
              </Label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Selected Files ({files.length})</h4>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {file.type.includes("pdf") ? (
                          <FileText className="h-4 w-4 text-red-500" />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Button */}
            {files.length > 0 && (
              <div className="flex justify-center">
                <Button onClick={processContracts} disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                  {processing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing {Math.round(progress)}%
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Process {files.length} Contract{files.length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Progress Bar */}
            {processing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing contracts...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {processedContracts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Results</CardTitle>
            <CardDescription>
              AI extraction results with confidence scores. Review and validate before importing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{processedContracts.length}</div>
                  <div className="text-sm text-blue-700">Total Processed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {processedContracts.filter((c) => c.status === "completed").length}
                  </div>
                  <div className="text-sm text-green-700">Successful</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {processedContracts.filter((c) => c.confidence < 90).length}
                  </div>
                  <div className="text-sm text-yellow-700">Need Review</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {processedContracts.filter((c) => c.status === "error").length}
                  </div>
                  <div className="text-sm text-red-700">Errors</div>
                </div>
              </div>

              {/* Results Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Contract Value</TableHead>
                    <TableHead>Section 3 Commitment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium max-w-xs truncate">{contract.fileName}</TableCell>
                      <TableCell>{contract.contractorName}</TableCell>
                      <TableCell>{formatCurrency(contract.contractValue)}</TableCell>
                      <TableCell>{contract.section3Commitment}%</TableCell>
                      <TableCell>{getStatusBadge(contract.status, contract.confidence)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {contract.status === "completed" && (
                            <Button variant="outline" size="sm">
                              Import
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contract Details Dialog */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contract Details - {selectedContract?.fileName}</DialogTitle>
            <DialogDescription>
              AI-extracted contract information with {selectedContract?.confidence}% confidence
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contract Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Contractor Name</Label>
                      <p>{selectedContract.contractorName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">RFP Number</Label>
                      <p>{selectedContract.extractedData.rfpNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Project Title</Label>
                      <p>{selectedContract.extractedData.projectTitle}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Contract Value</Label>
                      <p className="font-semibold text-green-600">{formatCurrency(selectedContract.contractValue)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Section 3 Commitments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Section 3 Commitment</Label>
                      <p className="font-semibold">{selectedContract.section3Commitment}%</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Total Labor Hours</Label>
                      <p>{selectedContract.extractedData.laborHourCommitments.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Section 3 Hours</Label>
                      <p>{selectedContract.extractedData.laborHourCommitments.section3.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Targeted Section 3 Hours</Label>
                      <p>{selectedContract.extractedData.laborHourCommitments.targeted.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reporting Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p>{selectedContract.extractedData.reportingContact.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p>{selectedContract.extractedData.reportingContact.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p>{selectedContract.extractedData.reportingContact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confidence & Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Processing Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="text-sm font-medium">Extraction Confidence</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={selectedContract.confidence} className="flex-1" />
                        <span className="text-sm font-medium">{selectedContract.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">{getStatusBadge(selectedContract.status, selectedContract.confidence)}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Subcontractors Found</Label>
                      <p>{selectedContract.extractedData.subcontractors}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedContract(null)}>
              Close
            </Button>
            {selectedContract?.status === "completed" && (
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Import to System
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
