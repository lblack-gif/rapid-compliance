"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, Loader2, Database } from "lucide-react"
import { importDCHAContracts } from "@/app/actions/import-actions"
import { initializeDatabase } from "@/app/actions/init-database"

export function CSVImportInterface() {
  const [csvContent, setCSVContent] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [importResult, setImportResult] = useState<any>(null)
  const [previewData, setPreviewData] = useState<string[][]>([])
  const [isInitializing, setIsInitializing] = useState(false)
  const [initResult, setInitResult] = useState<any>(null)

  const handleInitialize = async () => {
    setIsInitializing(true)
    setInitResult(null)

    try {
      console.log("[v0] Starting database initialization...")
      const result = await initializeDatabase()
      console.log("[v0] Initialization result:", result)
      setInitResult(result)
    } catch (error) {
      console.error("[v0] Initialization error:", error)
      setInitResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as string
      setCSVContent(content)

      // Parse preview (first 5 rows)
      const lines = content.split("\n").filter((line) => line.trim())
      const preview = lines.slice(0, 6).map((line) => line.split(",").map((cell) => cell.trim().replace(/"/g, "")))
      setPreviewData(preview)
      setImportResult(null)
    }

    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!csvContent) return

    setIsProcessing(true)
    setImportResult(null)

    try {
      console.log("[v0] Starting CSV import...")
      const result = await importDCHAContracts(csvContent)
      console.log("[v0] Import result:", result)
      setImportResult(result)
    } catch (error) {
      console.error("[v0] Import error:", error)
      setImportResult({
        success: false,
        errors: [error instanceof Error ? error.message : "Unknown error occurred"],
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setCSVContent("")
    setFileName("")
    setPreviewData([])
    setImportResult(null)
    setInitResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import DCHA Contracts</CardTitle>
          <CardDescription>Upload a CSV file containing DCHA contract data to import into the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {importResult &&
            !importResult.success &&
            importResult.errors[0]?.includes("Database tables not initialized") && (
              <Alert className="border-blue-200 bg-blue-50">
                <Database className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-blue-900">Database Setup Required</p>
                      <p className="text-sm text-blue-700 mt-1">
                        The required database tables haven't been created yet. You need to run the initialization script
                        in your Supabase dashboard.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-sm font-medium text-gray-900 mb-2">Setup Instructions:</p>
                      <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                        <li>Go to your Supabase dashboard</li>
                        <li>Navigate to the SQL Editor</li>
                        <li>
                          Copy and paste the contents of{" "}
                          <code className="bg-gray-100 px-1 rounded">scripts/init-import-tables.sql</code>
                        </li>
                        <li>Click "Run" to execute the script</li>
                        <li>Return here and try importing again</li>
                      </ol>
                    </div>
                    <Button
                      onClick={handleInitialize}
                      disabled={isInitializing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isInitializing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Checking Database...
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4 mr-2" />
                          Check Database Status
                        </>
                      )}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

          {initResult && (
            <Alert className={initResult.success ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
              {initResult.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-600" />
              )}
              <AlertDescription>
                <p className={initResult.success ? "text-green-900" : "text-orange-900"}>{initResult.message}</p>
              </AlertDescription>
            </Alert>
          )}

          {/* File Upload Section */}
          {!csvContent && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
                disabled={isProcessing}
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Click to upload CSV file</p>
                <p className="text-sm text-gray-500">or drag and drop your dcha_contracts.csv file here</p>
              </label>
            </div>
          )}

          {/* File Info and Preview */}
          {csvContent && !importResult && (
            <div className="space-y-4">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>
                      <strong>{fileName}</strong> loaded successfully
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      Remove
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>

              {/* CSV Preview */}
              {previewData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Preview (First 5 Rows)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            {previewData[0]?.map((header, index) => (
                              <th key={index} className="px-4 py-2 text-left font-medium text-gray-700">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b hover:bg-gray-50">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-2 text-gray-600">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Import Button */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                  Cancel
                </Button>
                <Button onClick={handleImport} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Contracts
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <div className="space-y-4">
              {importResult.success ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium text-green-900">Import completed successfully!</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Rows Processed</p>
                          <p className="text-2xl font-bold text-green-600">{importResult.totalRows}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contracts Imported</p>
                          <p className="text-2xl font-bold text-green-600">{importResult.contractsInserted}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contracts Skipped</p>
                          <p className="text-2xl font-bold text-orange-600">{importResult.contractsSkipped}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Errors</p>
                          <p className="text-2xl font-bold text-red-600">{importResult.errors.length}</p>
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <p className="font-medium text-red-900">Import failed</p>
                    <p className="text-sm text-red-700 mt-2">{importResult.errors[0]}</p>
                  </AlertDescription>
                </Alert>
              )}

              {/* Example Contract Details */}
              {importResult.exampleContract && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Example Contract Summary</CardTitle>
                    <CardDescription>First Section 3 applicable contract imported</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Contract Number</p>
                        <p className="font-medium">{importResult.exampleContract.contract_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Vendor Name</p>
                        <p className="font-medium">{importResult.exampleContract.vendor_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contract Value</p>
                        <p className="font-medium">${importResult.exampleContract.contract_value?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Section 3 Applicable</p>
                        <Badge variant={importResult.exampleContract.section3_applicable ? "default" : "secondary"}>
                          {importResult.exampleContract.section3_applicable ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>

                    {importResult.section3Summary && (
                      <div className="border-t pt-4 space-y-2">
                        <p className="font-medium text-gray-900">Section 3 Compliance Details</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Applicability Subpart</p>
                            <p className="font-medium">{importResult.section3Summary.applicabilitySubpart}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Labor Hour Benchmark</p>
                            <p className="font-medium">{importResult.section3Summary.laborHourBenchmark}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Targeted Benchmark</p>
                            <p className="font-medium">{importResult.section3Summary.targetedBenchmark}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tasks Generated</p>
                            <p className="font-medium">{importResult.section3Summary.tasksGenerated}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Auto-Generated Tasks */}
                    {importResult.exampleTasks && importResult.exampleTasks.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="font-medium text-gray-900 mb-3">Auto-Generated Tasks</p>
                        <div className="space-y-2">
                          {importResult.exampleTasks.map((task: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{task.title}</p>
                                <p className="text-xs text-gray-600">Due: {task.due_date}</p>
                              </div>
                              <Badge variant="outline">{task.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Errors List */}
              {importResult.errors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      Import Warnings ({importResult.errors.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {importResult.errors.map((error: string, index: number) => (
                        <div
                          key={index}
                          className="text-sm text-gray-700 p-2 bg-orange-50 rounded border-l-2 border-orange-400"
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleReset}>
                  Import Another File
                </Button>
                <Button
                  onClick={() => (window.location.href = "/dashboard?tab=contracts")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Contracts
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSV Format Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Your CSV file must include the following columns:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>client_name</strong> - Client/agency name (e.g., "DCHA")
              </li>
              <li>
                <strong>contract_number</strong> - Unique contract identifier
              </li>
              <li>
                <strong>vendor_name</strong> - Contractor/vendor name
              </li>
              <li>
                <strong>contract_value</strong> - Contract amount (e.g., "$250,000")
              </li>
              <li>
                <strong>start_date</strong> - Contract start date (YYYY-MM-DD)
              </li>
              <li>
                <strong>end_date</strong> - Contract end date (YYYY-MM-DD)
              </li>
              <li>
                <strong>funding_source</strong> - HUD funding source (e.g., "CDBG", "HOME")
              </li>
              <li>
                <strong>section3_applicable</strong> - "true" or "false" (optional, auto-calculated if blank)
              </li>
              <li>
                <strong>title</strong> - Contract title/description
              </li>
              <li>
                <strong>scope_of_work</strong> - Work description
              </li>
              <li>
                <strong>section3_poc</strong> - Section 3 point of contact name
              </li>
              <li>
                <strong>section3_poc_email</strong> - Section 3 POC email
              </li>
              <li>
                <strong>section3_poc_phone</strong> - Section 3 POC phone
              </li>
            </ul>
            <p className="mt-4 text-blue-600">
              <strong>Note:</strong> Contracts with value ≥ $200,000 are automatically marked as Section 3 applicable
              and will trigger automated task generation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
