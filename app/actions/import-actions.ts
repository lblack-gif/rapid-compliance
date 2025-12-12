"use server"

import { createServerClient } from "@/lib/supabase"
import { processNewContract } from "./compliance-actions"

interface DCHAContractRow {
  client_name: string
  contract_number: string
  vendor_name: string
  contract_value: string
  start_date: string
  end_date: string
  funding_source: string
  section3_applicable: string
  title: string
  scope_of_work: string
  point_of_contact: string
  phone: string
  email: string
  address: string
  compliance_notes: string
  section3_poc: string
  section3_poc_email: string
  section3_poc_phone: string
}

interface ImportResult {
  success: boolean
  totalRows: number
  contractsInserted: number
  contractsSkipped: number
  exampleContract?: any
  exampleTasks?: any[]
  section3Summary?: any
  errors: string[]
}

/**
 * Import DCHA contracts from CSV data
 */
export async function importDCHAContracts(csvContent: string): Promise<ImportResult> {
  const supabase = await createServerClient()

  if (!supabase) {
    throw new Error("Supabase client is not initialized")
  }

  const result: ImportResult = {
    success: false,
    totalRows: 0,
    contractsInserted: 0,
    contractsSkipped: 0,
    errors: [],
  }

  try {
    console.log("[v0] Starting DCHA contract import...")

    console.log("[v0] Checking if required tables exist...")

    const { error: clientsCheckError } = await supabase.from("clients").select("id").limit(1)

    if (clientsCheckError && clientsCheckError.code === "42P01") {
      throw new Error(
        "Database tables not initialized. Please run the initialization script first. " +
          "Go to the Scripts section and run 'init-import-tables.sql' to create the required tables.",
      )
    }

    console.log("[v0] Database tables verified")

    // Parse CSV content
    const lines = csvContent.split("\n").filter((line) => line.trim())
    if (lines.length < 2) {
      throw new Error("CSV file is empty or has no data rows")
    }

    // Parse header
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
    console.log("[v0] CSV Headers:", headers)

    const columnMap = new Map<string, string>()

    headers.forEach((header) => {
      const normalized = header.toLowerCase().replace(/[^a-z0-9]/g, "")

      // Direct mappings for exact column names
      if (header === "client_name") {
        columnMap.set(header, "client_name")
      } else if (header === "contract_number") {
        columnMap.set(header, "contract_number")
      } else if (header === "vendor_name") {
        columnMap.set(header, "vendor_name")
      } else if (header === "contract_value") {
        columnMap.set(header, "contract_value")
      } else if (header === "start_date") {
        columnMap.set(header, "start_date")
      } else if (header === "end_date") {
        columnMap.set(header, "end_date")
      } else if (header === "funding_source") {
        columnMap.set(header, "funding_source")
      } else if (header === "section3_applicable") {
        columnMap.set(header, "section3_applicable")
      } else if (header === "scope_of_work") {
        columnMap.set(header, "scope_of_work")
      } else if (header === "phone") {
        columnMap.set(header, "phone")
      } else if (header === "email") {
        columnMap.set(header, "email")
      } else if (header === "address") {
        columnMap.set(header, "address")
      } else if (header === "notes") {
        columnMap.set(header, "compliance_notes")
      } else if (header === "section3_poc") {
        columnMap.set(header, "section3_poc")
      } else if (header === "section3_poc_email") {
        columnMap.set(header, "section3_poc_email")
      } else if (header === "section3_poc_phone") {
        columnMap.set(header, "section3_poc_phone")
      }
      // Fallback to normalized matching for variations
      else if (normalized.includes("clientname") || normalized === "client") {
        columnMap.set(header, "client_name")
      } else if (header === "Contract #" || normalized.includes("contractnumber") || normalized === "contract") {
        columnMap.set(header, "contract_number")
      } else if (
        header === "Vendor Name" ||
        header === "vender_name" ||
        normalized.includes("vendorname") ||
        normalized.includes("vendername") ||
        normalized === "vendor"
      ) {
        columnMap.set(header, "vendor_name")
      } else if (header === "Contract Value" || normalized.includes("contractvalue") || normalized === "value") {
        columnMap.set(header, "contract_value")
      } else if (
        header === "Contract Start Date" ||
        header === "contract_start_date" ||
        normalized.includes("startdate") ||
        normalized === "start"
      ) {
        columnMap.set(header, "start_date")
      } else if (
        header === "Contract End Date" ||
        header === "contract_end_date" ||
        normalized.includes("enddate") ||
        normalized === "end"
      ) {
        columnMap.set(header, "end_date")
      } else if (normalized.includes("fundingsource") || normalized === "funding") {
        columnMap.set(header, "funding_source")
      } else if (
        header === "Section 3 Applicable (Y/N)" ||
        header === "section_3_applicable (Y/N)" ||
        normalized.includes("section3applicable") ||
        normalized.includes("section3yn")
      ) {
        columnMap.set(header, "section3_applicable")
      } else if (
        header === "Title: Scope of Work" ||
        normalized.includes("title") ||
        normalized.includes("scopeofwork")
      ) {
        columnMap.set(header, "scope_of_work")
      } else if (
        header === "Point of Contact" ||
        header === "point_of_contact" ||
        normalized.includes("pointofcontact") ||
        normalized === "poc"
      ) {
        columnMap.set(header, "point_of_contact")
      } else if (
        header === "Compliance Notes / Behaviors Towards Section (3) Compliance" ||
        header === "compliance_notes" ||
        normalized.includes("compliancenotes") ||
        normalized.includes("behaviors") ||
        normalized === "notes"
      ) {
        columnMap.set(header, "compliance_notes")
      } else if (
        header === "Section (3) POC Email" ||
        header === "section (3) POC Email" ||
        (normalized.includes("section3poc") && normalized.includes("email"))
      ) {
        columnMap.set(header, "section3_poc_email")
      } else if (
        header === "Section (3) POC Phone" ||
        header === "section (3) POC Phone" ||
        (normalized.includes("section3poc") && normalized.includes("phone"))
      ) {
        columnMap.set(header, "section3_poc_phone")
      } else if (header === "Section (3) POC" || header === "section (3) POC" || normalized.includes("section3poc")) {
        columnMap.set(header, "section3_poc")
      }
    })

    console.log("[v0] Column mapping:", Object.fromEntries(columnMap))

    const essentialFields = ["contract_number", "vendor_name", "contract_value"]
    const mappedFields = new Set(columnMap.values())

    for (const field of essentialFields) {
      if (!mappedFields.has(field)) {
        throw new Error(`Missing required column: ${field}. Available columns: ${headers.join(", ")}`)
      }
    }

    result.totalRows = lines.length - 1

    // Get or create DCHA client
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id

    const { data: dchaClientData, error: clientLookupError } = await supabase
      .from("clients")
      .select("*")
      .eq("name", "DCHA")
      .maybeSingle()

    let clientId: string

    if (clientLookupError) {
      throw new Error(`Error looking up DCHA client: ${clientLookupError.message}`)
    }

    if (!dchaClientData) {
      console.log("[v0] Creating DCHA client record...")
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          name: "DCHA",
          address: "1133 North Capitol Street NE, Washington, DC 20002",
          contact_name: "DCHA Compliance Team",
          contact_email: "compliance@dchousing.org",
          total_contracts: 0,
        })
        .select()
        .single()

      if (clientError) {
        throw new Error(`Error creating DCHA client: ${clientError.message}`)
      }

      clientId = newClient.id
    } else {
      clientId = dchaClientData.id
    }

    console.log("[v0] Using client ID:", clientId)

    // Get funding source mapping
    const { data: fundingSources, error: fundingError } = await supabase.from("funding_sources").select("*")

    if (fundingError) {
      throw new Error(`Error fetching funding sources: ${fundingError.message}`)
    }

    const fundingSourceMap = new Map(fundingSources?.map((fs) => [fs.source_name.toLowerCase(), fs.id]) || [])

    // Process each row
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))

        const rawRow: any = {}
        headers.forEach((header, index) => {
          rawRow[header] = values[index] || ""
        })

        // Create normalized row using column mapping
        const row: any = {}
        columnMap.forEach((fieldName, csvHeader) => {
          row[fieldName] = rawRow[csvHeader] || ""
        })

        console.log(`[v0] Processing row ${i}:`, row.contract_number)

        const clientName = row.client_name || "DCHA"

        // Parse contract value
        const contractValue = Number.parseFloat((row.contract_value || "0").replace(/[$,]/g, "")) || 0

        // Determine Section 3 applicability
        const section3Applicable =
          row.section3_applicable?.toLowerCase() === "true" ||
          row.section3_applicable?.toLowerCase() === "yes" ||
          row.section3_applicable?.toLowerCase() === "y" ||
          contractValue >= 200000

        // Find funding source
        const fundingSourceName = row.funding_source?.toLowerCase() || "cdbg"
        const fundingSourceId = fundingSourceMap.get(fundingSourceName) || fundingSourceMap.get("cdbg")

        let title = row.contract_number || "Untitled Contract"
        let scopeOfWork = row.scope_of_work || ""

        if (!scopeOfWork && title.includes(":")) {
          const parts = title.split(":")
          title = parts[0].trim()
          scopeOfWork = parts.slice(1).join(":").trim()
        }

        // Insert contract
        const { data: contract, error: contractError } = await supabase
          .from("contracts")
          .insert({
            client_id: clientId,
            contract_name: title,
            contract_number: row.contract_number,
            vendor_name: row.vendor_name,
            contract_value: contractValue,
            start_date: row.start_date || null,
            end_date: row.end_date || null,
            funding_source_id: fundingSourceId,
            section3_applicable: section3Applicable,
            scope_of_work: scopeOfWork || row.title,
            status: "active",
            contract_type: contractValue >= 200000 ? "construction" : "other",
            hud_funding_amount: contractValue,
            total_project_cost: contractValue,
          })
          .select()
          .single()

        if (contractError) {
          console.error(`[v0] Error inserting contract ${row.contract_number}:`, contractError)
          result.errors.push(`Row ${i}: ${contractError.message}`)
          result.contractsSkipped++
          continue
        }

        console.log(`[v0] Inserted contract:`, contract.id)

        // Insert contact information
        const { error: contactError } = await supabase.from("contract_contacts").insert({
          contract_id: contract.id,
          point_of_contact: row.point_of_contact || null,
          phone: row.phone || null,
          email: row.email || null,
          address: row.address || null,
          section3_poc: row.section3_poc || null,
          section3_poc_email: row.section3_poc_email || null,
          section3_poc_phone: row.section3_poc_phone || null,
          compliance_notes: row.compliance_notes || null,
        })

        if (contactError) {
          console.error(`[v0] Error inserting contact for ${row.contract_number}:`, contactError)
        }

        // Run processNewContract if Section 3 applicable
        if (section3Applicable) {
          console.log(`[v0] Running processNewContract for ${row.contract_number}...`)
          const processResult = await processNewContract(contract.id)

          if (!processResult.success) {
            console.error(`[v0] Error processing contract ${row.contract_number}:`, processResult.error)
            result.errors.push(`Row ${i}: Failed to process contract - ${processResult.error}`)
          } else {
            console.log(`[v0] Successfully processed contract ${row.contract_number}`)

            // Store example for first Section 3 contract
            if (!result.exampleContract) {
              result.exampleContract = contract

              // Fetch generated tasks
              const { data: tasks } = await supabase
                .from("tasks")
                .select("*")
                .eq("contract_id", contract.id)
                .order("due_date", { ascending: true })

              result.exampleTasks = tasks || []

              result.section3Summary = {
                contractNumber: contract.contract_number,
                contractValue: contract.contract_value,
                section3Applicable: contract.section3_applicable,
                applicabilitySubpart: processResult.applicability?.subpart,
                laborHourBenchmark: processResult.applicability?.laborHourBenchmark,
                targetedBenchmark: processResult.applicability?.targetedBenchmark,
                tasksGenerated: tasks?.length || 0,
              }
            }
          }
        }

        result.contractsInserted++

        // Log to audit_logs
        await supabase.from("audit_logs").insert({
          user_id: userId,
          contract_id: contract.id,
          action_type: "contract_imported",
          description: `Imported contract ${row.contract_number} from DCHA CSV`,
        })
      } catch (rowError) {
        console.error(`[v0] Error processing row ${i}:`, rowError)
        const errorMessage = rowError instanceof Error ? rowError.message : "Unknown error"
        result.errors.push(`Row ${i}: ${errorMessage}`)
        result.contractsSkipped++
      }
    }

    // Update client total_contracts
    await supabase.from("clients").update({ total_contracts: result.contractsInserted }).eq("id", clientId)

    // Log import completion
    await supabase.from("audit_logs").insert({
      user_id: userId,
      action_type: "bulk_import_completed",
      description: `DCHA CSV import completed: ${result.contractsInserted} contracts inserted, ${result.contractsSkipped} skipped`,
    })

    result.success = true
    console.log("[v0] Import completed successfully")
    console.log("[v0] Summary:", {
      totalRows: result.totalRows,
      inserted: result.contractsInserted,
      skipped: result.contractsSkipped,
      errors: result.errors.length,
    })

    return result
  } catch (error) {
    console.error("[v0] Fatal error during import:", error)
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    result.errors.push(errorMessage)
    return result
  }
}
