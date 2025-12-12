import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyData() {
  console.log("[v0] Starting data verification...\n")

  // Get record counts per table
  const tables = [
    "clients",
    "contracts",
    "workers",
    "tasks",
    "benchmarks",
    "contract_labor_summary",
    "funding_sources",
    "audit_logs",
    "notifications",
  ]

  console.log("📊 RECORD COUNTS PER TABLE")
  console.log("=".repeat(50))

  const counts: Record<string, number> = {}

  for (const table of tables) {
    const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true })

    if (error) {
      console.log(`❌ ${table}: Error - ${error.message}`)
    } else {
      counts[table] = count || 0
      console.log(`✅ ${table}: ${count} records`)
    }
  }

  console.log("\n")

  // Get example contract with auto-generated tasks
  console.log("📋 EXAMPLE CONTRACT WITH AUTO-GENERATED TASKS")
  console.log("=".repeat(50))

  const { data: contracts, error: contractError } = await supabase
    .from("contracts")
    .select("*")
    .eq("section3_applicable", true)
    .limit(1)
    .single()

  if (contractError) {
    console.log("❌ Error fetching contract:", contractError.message)
  } else if (contracts) {
    console.log(`\nContract: ${contracts.contract_name}`)
    console.log(`Vendor: ${contracts.vendor_name}`)
    console.log(`Value: $${contracts.contract_value?.toLocaleString()}`)
    console.log(`Start Date: ${contracts.start_date}`)
    console.log(`End Date: ${contracts.end_date}`)
    console.log(`Section 3 Applicable: ${contracts.section3_applicable}`)
    console.log(`Applicability Subpart: ${contracts.applicability_subpart}`)
    console.log(`Labor Hour Benchmark: ${contracts.labor_hour_benchmark}%`)

    // Get tasks for this contract
    const { data: tasks, error: tasksError } = await supabase
      .from("tasks")
      .select("*")
      .eq("contract_id", contracts.id)
      .eq("is_auto_generated", true)
      .order("due_date", { ascending: true })

    if (tasksError) {
      console.log("\n❌ Error fetching tasks:", tasksError.message)
    } else if (tasks) {
      console.log(`\n🎯 Auto-Generated Tasks (${tasks.length} total):`)
      tasks.forEach((task, index) => {
        console.log(`\n${index + 1}. ${task.title}`)
        console.log(`   Type: ${task.task_type}`)
        console.log(`   Due Date: ${task.due_date}`)
        console.log(`   Priority: ${task.priority}`)
        console.log(`   Status: ${task.status}`)
        console.log(`   Auto-Generation Rule: ${task.auto_generation_rule}`)
      })
    }

    // Get benchmarks for this contract
    const { data: benchmarks, error: benchmarksError } = await supabase
      .from("benchmarks")
      .select("*")
      .eq("contract_id", contracts.id)

    if (!benchmarksError && benchmarks) {
      console.log(`\n📊 Benchmarks (${benchmarks.length} total):`)
      benchmarks.forEach((benchmark, index) => {
        console.log(`\n${index + 1}. ${benchmark.benchmark_type}`)
        console.log(`   Target: ${benchmark.target_percentage}%`)
        console.log(`   Actual: ${benchmark.actual_percentage}%`)
        console.log(`   Status: ${benchmark.status}`)
      })
    }
  }

  console.log("\n")

  // Check audit logs for automation execution
  console.log("🔍 AUTOMATION EXECUTION CONFIRMATION")
  console.log("=".repeat(50))

  const automationActions = [
    "contract_created",
    "tasks_auto_generated",
    "benchmarks_created",
    "quarterly_reminder_generated",
    "labor_summary_updated",
  ]

  for (const action of automationActions) {
    const { count, error } = await supabase
      .from("audit_logs")
      .select("*", { count: "exact", head: true })
      .eq("action_type", action)

    if (error) {
      console.log(`❌ ${action}: Error - ${error.message}`)
    } else {
      console.log(`✅ ${action}: ${count} executions logged`)
    }
  }

  // Verify specific automation functions
  console.log("\n📝 AUTOMATION FUNCTION VERIFICATION")
  console.log("=".repeat(50))

  // Check processNewContract execution
  const { count: contractCreatedCount } = await supabase
    .from("audit_logs")
    .select("*", { count: "exact", head: true })
    .eq("action_type", "contract_created")

  console.log(`✅ processNewContract() executed: ${contractCreatedCount} times`)

  // Check task generation
  const { count: autoTaskCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("is_auto_generated", true)

  console.log(`✅ Auto-generated tasks created: ${autoTaskCount} tasks`)

  // Check benchmark creation
  const { count: benchmarkCount } = await supabase.from("benchmarks").select("*", { count: "exact", head: true })

  console.log(`✅ Benchmarks created: ${benchmarkCount} benchmarks`)

  // Check labor summary updates
  const { count: laborSummaryCount } = await supabase
    .from("contract_labor_summary")
    .select("*", { count: "exact", head: true })

  console.log(`✅ updateContractLaborSummary() executed: ${laborSummaryCount} summaries created`)

  // Check quarterly reminders
  const { count: quarterlyReminderCount } = await supabase
    .from("audit_logs")
    .select("*", { count: "exact", head: true })
    .eq("action_type", "quarterly_reminder_generated")

  console.log(`✅ generateQuarterlyReportReminders() executed: ${quarterlyReminderCount} reminders generated`)

  console.log("\n")
  console.log("=".repeat(50))
  console.log("✅ DATA VERIFICATION COMPLETE")
  console.log("=".repeat(50))

  // Summary statistics
  console.log("\n📈 SUMMARY STATISTICS")
  console.log("=".repeat(50))
  console.log(`Total Clients: ${counts.clients}`)
  console.log(`Total Contracts: ${counts.contracts}`)
  console.log(`Total Workers: ${counts.workers}`)
  console.log(`Total Tasks: ${counts.tasks}`)
  console.log(`  - Auto-generated: ${autoTaskCount}`)
  console.log(`  - Manual: ${counts.tasks - autoTaskCount}`)
  console.log(`Total Benchmarks: ${counts.benchmarks}`)
  console.log(`Total Labor Summaries: ${counts.contract_labor_summary}`)
  console.log(`Total Audit Log Entries: ${counts.audit_logs}`)
  console.log(`Total Notifications: ${counts.notifications}`)
}

verifyData().catch(console.error)
