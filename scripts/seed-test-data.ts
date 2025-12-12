import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function seedTestData() {
  console.log("[v0] Starting seed data generation...")

  try {
    // Create 10 test clients (agencies)
    const clients = []
    for (let i = 1; i <= 10; i++) {
      const client = {
        name: `Housing Authority ${i}`,
        address: `${100 + i} Main Street, City ${i}, ST ${10000 + i}`,
        contact_name: `Director ${i}`,
        contact_email: `director${i}@ha${i}.gov`,
        total_contracts: 0,
      }
      clients.push(client)
    }

    const { data: insertedClients, error: clientsError } = await supabase.from("clients").insert(clients).select()

    if (clientsError) throw clientsError
    console.log(`[v0] Created ${insertedClients.length} test clients`)

    // Get funding sources
    const { data: fundingSources } = await supabase.from("funding_sources").select("*").limit(5)

    // Create 50 test contracts
    const contracts = []
    const contractTypes = ["construction", "rehabilitation", "public_construction", "lead_hazard_control"]
    const statuses = ["active", "active", "active", "completed", "draft"] // More active contracts

    for (let i = 1; i <= 50; i++) {
      const clientId = insertedClients[Math.floor(Math.random() * insertedClients.length)].id
      const fundingSource = fundingSources[Math.floor(Math.random() * fundingSources.length)]
      const contractType = contractTypes[Math.floor(Math.random() * contractTypes.length)]

      // Random contract value between $50k and $2M
      const contractValue = Math.floor(Math.random() * 1950000) + 50000

      // HUD funding is 50-100% of contract value
      const hudFundingAmount = contractValue * (0.5 + Math.random() * 0.5)

      // Determine if Section 3 applicable
      const section3Applicable = hudFundingAmount >= fundingSource.default_threshold

      const startDate = new Date(2024, Math.floor(Math.random() * 12), 1)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + 6 + Math.floor(Math.random() * 18)) // 6-24 months

      const contract = {
        contract_number: `CTR-2024-${String(i).padStart(4, "0")}`,
        contract_name: `${contractType.replace("_", " ").toUpperCase()} Project ${i}`,
        client_id: clientId,
        contract_type: contractType,
        contract_value: contractValue,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        hud_funding_amount: hudFundingAmount,
        total_project_cost: contractValue,
        funding_source_id: fundingSource.id,
        section3_applicable: section3Applicable,
        applicability_subpart: section3Applicable ? fundingSource.subpart_type : "N/A",
        applicability_threshold: fundingSource.default_threshold,
        labor_hour_benchmark: section3Applicable ? (fundingSource.subpart_type === "Subpart C" ? 5 : 25) : 0,
        targeted_section3_benchmark: section3Applicable ? 5 : 0,
        lifecycle_stage: "construction",
      }
      contracts.push(contract)
    }

    const { data: insertedContracts, error: contractsError } = await supabase
      .from("contracts")
      .insert(contracts)
      .select()

    if (contractsError) throw contractsError
    console.log(`[v0] Created ${insertedContracts.length} test contracts`)

    // Create tasks for Section 3 applicable contracts
    const tasks = []
    for (const contract of insertedContracts.filter((c) => c.section3_applicable)) {
      const startDate = new Date(contract.start_date)

      // Action Plan task
      const actionPlanDue = new Date(startDate)
      actionPlanDue.setDate(actionPlanDue.getDate() + 14)

      tasks.push({
        contract_id: contract.id,
        client_id: contract.client_id,
        task_type: "document_upload",
        title: "Section 3 Action Plan Submission",
        description: "Submit Section 3 Action Plan detailing recruitment, training, and outreach strategies.",
        due_date: actionPlanDue.toISOString().split("T")[0],
        priority: "high",
        status: Math.random() > 0.3 ? "completed" : "pending",
        is_auto_generated: true,
        auto_generation_rule: "onCreateContract",
      })

      // Worker Verification task
      const verificationDue = new Date(startDate)
      verificationDue.setDate(verificationDue.getDate() + 30)

      tasks.push({
        contract_id: contract.id,
        client_id: contract.client_id,
        task_type: "worker_verification",
        title: "Worker Verification Log Setup",
        description: "Set up worker verification log and collect Section 3 eligibility documentation.",
        due_date: verificationDue.toISOString().split("T")[0],
        priority: "high",
        status: Math.random() > 0.4 ? "completed" : "pending",
        is_auto_generated: true,
        auto_generation_rule: "onCreateContract",
      })

      // Quarterly Report task
      const quarterlyDue = new Date(startDate)
      quarterlyDue.setDate(quarterlyDue.getDate() + 90)

      tasks.push({
        contract_id: contract.id,
        client_id: contract.client_id,
        task_type: "report_submission",
        title: "First Quarterly Report",
        description: "Submit first quarterly Section 3 compliance report.",
        due_date: quarterlyDue.toISOString().split("T")[0],
        priority: "high",
        status: Math.random() > 0.5 ? "completed" : "pending",
        is_auto_generated: true,
        auto_generation_rule: "onCreateContract",
      })
    }

    const { error: tasksError } = await supabase.from("tasks").insert(tasks)
    if (tasksError) throw tasksError
    console.log(`[v0] Created ${tasks.length} test tasks`)

    // Create benchmarks for Section 3 contracts
    const benchmarks = []
    for (const contract of insertedContracts.filter((c) => c.section3_applicable)) {
      benchmarks.push({
        contract_id: contract.id,
        benchmark_type: "labor_hours",
        benchmark_name: "Section 3 Labor Hours",
        target_percentage: contract.labor_hour_benchmark,
        measurement_unit: "percentage",
        period_start: contract.start_date,
        period_end: contract.end_date,
        description: `${contract.labor_hour_benchmark}% of total labor hours must be performed by Section 3 workers`,
      })

      benchmarks.push({
        contract_id: contract.id,
        benchmark_type: "targeted_hours",
        benchmark_name: "Targeted Section 3 Labor Hours",
        target_percentage: contract.targeted_section3_benchmark,
        measurement_unit: "percentage",
        period_start: contract.start_date,
        period_end: contract.end_date,
        description: `${contract.targeted_section3_benchmark}% of total labor hours must be performed by targeted Section 3 workers`,
      })
    }

    const { error: benchmarksError } = await supabase.from("benchmarks").insert(benchmarks)
    if (benchmarksError) throw benchmarksError
    console.log(`[v0] Created ${benchmarks.length} test benchmarks`)

    // Create labor summaries with varying compliance rates
    const laborSummaries = []
    for (const contract of insertedContracts.filter((c) => c.section3_applicable && c.status === "active")) {
      const totalHours = Math.floor(Math.random() * 5000) + 1000

      // Some contracts meet benchmark, some don't
      const meetsTarget = Math.random() > 0.3
      const section3Rate = meetsTarget
        ? contract.labor_hour_benchmark + Math.random() * 10 // Above benchmark
        : contract.labor_hour_benchmark - Math.random() * 10 // Below benchmark

      const section3Hours = (totalHours * section3Rate) / 100
      const targetedRate = Math.random() * 8 // 0-8%
      const targetedHours = (totalHours * targetedRate) / 100

      laborSummaries.push({
        contract_id: contract.id,
        summary_period: "total",
        period_start: contract.start_date,
        period_end: new Date().toISOString().split("T")[0],
        total_hours: totalHours,
        section3_hours: section3Hours,
        targeted_section3_hours: targetedHours,
        total_workers: Math.floor(Math.random() * 50) + 10,
        section3_workers: Math.floor(Math.random() * 20) + 5,
        targeted_section3_workers: Math.floor(Math.random() * 10) + 2,
        section3_compliance_rate: section3Rate,
        targeted_compliance_rate: targetedRate,
        meets_section3_benchmark: section3Rate >= contract.labor_hour_benchmark,
        meets_targeted_benchmark: targetedRate >= contract.targeted_section3_benchmark,
      })
    }

    const { error: summariesError } = await supabase.from("contract_labor_summary").insert(laborSummaries)
    if (summariesError) throw summariesError
    console.log(`[v0] Created ${laborSummaries.length} test labor summaries`)

    console.log("[v0] Seed data generation complete!")
    console.log(`[v0] Summary:`)
    console.log(`  - ${insertedClients.length} clients`)
    console.log(`  - ${insertedContracts.length} contracts`)
    console.log(`  - ${tasks.length} tasks`)
    console.log(`  - ${benchmarks.length} benchmarks`)
    console.log(`  - ${laborSummaries.length} labor summaries`)
  } catch (error) {
    console.error("[v0] Error seeding test data:", error)
    throw error
  }
}

seedTestData()
