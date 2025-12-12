"use server"

import { createClient } from "@supabase/supabase-js"

async function queryDCHAContracts() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  console.log("[v0] Querying DCHA contracts...")

  // Query contracts with client_name = "DCHA"
  const { data: contracts, error } = await supabase
    .from("contracts")
    .select(`
      id,
      contract_number,
      vendor_name,
      title,
      scope_of_work,
      contract_value,
      section3_applicable,
      applicability_subpart,
      labor_hour_benchmark,
      targeted_section3_benchmark,
      clients!inner (
        name
      ),
      funding_sources (
        source_name
      ),
      contract_labor_summary (
        compliance_rate
      ),
      contract_contacts (
        section3_poc,
        section3_poc_email,
        section3_poc_phone,
        compliance_notes
      )
    `)
    .eq("clients.name", "DCHA")
    .limit(10)

  if (error) {
    console.error("[v0] Error querying contracts:", error)
    return
  }

  console.log(`[v0] Found ${contracts?.length || 0} DCHA contracts`)

  // Get audit log counts for each contract
  const contractsWithAuditCounts = await Promise.all(
    (contracts || []).map(async (contract) => {
      const { count } = await supabase
        .from("audit_logs")
        .select("*", { count: "exact", head: true })
        .eq("contract_id", contract.id)

      return {
        contract_number: contract.contract_number,
        vendor_name: contract.vendor_name,
        title: contract.title,
        scope_of_work: contract.scope_of_work,
        contract_value: contract.contract_value,
        funding_source: contract.funding_sources?.source_name || "N/A",
        section3_applicable: contract.section3_applicable,
        applicability_subpart: contract.applicability_subpart || "N/A",
        labor_hour_benchmark: contract.labor_hour_benchmark,
        targeted_section3_benchmark: contract.targeted_section3_benchmark,
        compliance_rate: contract.contract_labor_summary?.[0]?.compliance_rate || 0,
        section3_poc: contract.contract_contacts?.[0]?.section3_poc || "N/A",
        section3_poc_email: contract.contract_contacts?.[0]?.section3_poc_email || "N/A",
        section3_poc_phone: contract.contract_contacts?.[0]?.section3_poc_phone || "N/A",
        compliance_notes: contract.contract_contacts?.[0]?.compliance_notes || "N/A",
        audit_log_entry_count: count || 0,
      }
    }),
  )

  // Display results in a formatted table
  console.log("\n=== DCHA CONTRACTS ===\n")
  console.table(contractsWithAuditCounts)

  // Display detailed view of first contract
  if (contractsWithAuditCounts.length > 0) {
    console.log("\n=== DETAILED VIEW: First Contract ===")
    const first = contractsWithAuditCounts[0]
    console.log(`Contract Number: ${first.contract_number}`)
    console.log(`Vendor: ${first.vendor_name}`)
    console.log(`Title: ${first.title}`)
    console.log(`Scope: ${first.scope_of_work}`)
    console.log(`Value: $${first.contract_value?.toLocaleString()}`)
    console.log(`Funding Source: ${first.funding_source}`)
    console.log(`Section 3 Applicable: ${first.section3_applicable ? "Yes" : "No"}`)
    console.log(`Applicability Subpart: ${first.applicability_subpart}`)
    console.log(`Labor Hour Benchmark: ${first.labor_hour_benchmark}%`)
    console.log(`Targeted Section 3 Benchmark: ${first.targeted_section3_benchmark}%`)
    console.log(`Current Compliance Rate: ${first.compliance_rate}%`)
    console.log(`Section 3 POC: ${first.section3_poc}`)
    console.log(`POC Email: ${first.section3_poc_email}`)
    console.log(`POC Phone: ${first.section3_poc_phone}`)
    console.log(`Compliance Notes: ${first.compliance_notes}`)
    console.log(`Audit Log Entries: ${first.audit_log_entry_count}`)
  }

  return contractsWithAuditCounts
}

queryDCHAContracts()
