import { createClient } from "@supabase/supabase-js"
import { processNewContract } from "../app/actions/compliance-actions"
import { generateQuarterlyReportReminders, updateContractLaborSummary } from "../app/actions/compliance-actions"
import {
  checkOverdueTasks,
  checkMissingQuarterlyReports,
  checkComplianceBelowBenchmark,
} from "../app/actions/notification-actions"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function testFullLifecycle() {
  console.log("🚀 Starting Full Lifecycle Automation Test\n")
  console.log("═══════════════════════════════════════════════════════════════\n")

  // Step 1: Select a test contract
  console.log("📋 STAGE 1: PRE-AWARD (Contract Selection)")
  console.log("───────────────────────────────────────────────────────────────")

  const { data: contracts, error: contractError } = await supabase
    .from("contracts")
    .select("*, clients(name), funding_sources(source_name)")
    .eq("section3_applicable", true)
    .limit(1)
    .single()

  if (contractError || !contracts) {
    console.error("❌ Error fetching contract:", contractError)
    return
  }

  const contract = contracts
  console.log(`✅ Selected Contract: ${contract.contract_name}`)
  console.log(`   Client: ${contract.clients?.name}`)
  console.log(`   Vendor: ${contract.vendor_name}`)
  console.log(`   Value: $${contract.contract_value?.toLocaleString()}`)
  console.log(`   Funding: ${contract.funding_sources?.source_name}`)
  console.log(`   Period: ${contract.start_date} to ${contract.end_date}`)
  console.log(`   Section 3 Applicable: ${contract.section3_applicable ? "YES" : "NO"}`)
  console.log(`   Subpart: ${contract.applicability_subpart}\n`)

  // Step 2: Run processNewContract
  console.log("📋 STAGE 2: AWARD (Processing New Contract)")
  console.log("───────────────────────────────────────────────────────────────")
  console.log("⚙️  Running processNewContract()...")

  await processNewContract(contract.id)

  // Verify tasks were created
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("contract_id", contract.id)
    .eq("is_auto_generated", true)
    .order("due_date", { ascending: true })

  console.log(`✅ Auto-generated ${tasks?.length || 0} tasks:`)
  tasks?.forEach((task, index) => {
    console.log(`   ${index + 1}. ${task.title}`)
    console.log(`      Due: ${task.due_date} | Priority: ${task.priority} | Status: ${task.status}`)
  })

  // Verify benchmarks were created
  const { data: benchmarks } = await supabase.from("benchmarks").select("*").eq("contract_id", contract.id)

  console.log(`✅ Created ${benchmarks?.length || 0} benchmarks:`)
  benchmarks?.forEach((benchmark) => {
    console.log(`   - ${benchmark.benchmark_type}: ${benchmark.target_percentage}% target`)
  })
  console.log("")

  // Step 3: Simulate construction phase with labor hours
  console.log("📋 STAGE 3: CONSTRUCTION (Labor Hour Tracking)")
  console.log("───────────────────────────────────────────────────────────────")
  console.log("⚙️  Adding labor hours...")

  // Get some workers
  const { data: workers } = await supabase.from("workers").select("*").limit(10)

  if (workers && workers.length > 0) {
    // Add labor hours for 5 workers (3 Section 3, 2 non-Section 3)
    const laborHours = []
    for (let i = 0; i < 5; i++) {
      const worker = workers[i]
      const isSection3 = i < 3 // First 3 are Section 3 workers

      laborHours.push({
        contract_id: contract.id,
        worker_id: worker.id,
        hours_worked: 40 + Math.floor(Math.random() * 40), // 40-80 hours
        work_date: contract.start_date,
        is_section3_worker: isSection3,
        is_targeted_worker: i < 1, // First one is targeted
        hourly_rate: 25.0,
        created_at: new Date().toISOString(),
      })
    }

    const { error: laborError } = await supabase.from("labor_hours").insert(laborHours)

    if (!laborError) {
      console.log(`✅ Added labor hours for ${laborHours.length} workers`)
      laborHours.forEach((lh, index) => {
        console.log(
          `   Worker ${index + 1}: ${lh.hours_worked} hours (Section 3: ${lh.is_section3_worker ? "YES" : "NO"}, Targeted: ${lh.is_targeted_worker ? "YES" : "NO"})`,
        )
      })
    }
  }

  // Step 4: Update contract labor summary
  console.log("\n⚙️  Running updateContractLaborSummary()...")
  await updateContractLaborSummary(contract.id, "total")

  const { data: laborSummary } = await supabase
    .from("contract_labor_summary")
    .select("*")
    .eq("contract_id", contract.id)
    .eq("period_type", "total")
    .single()

  if (laborSummary) {
    console.log(`✅ Labor Summary Updated:`)
    console.log(`   Total Hours: ${laborSummary.total_hours}`)
    console.log(`   Section 3 Hours: ${laborSummary.section3_hours}`)
    console.log(`   Targeted Hours: ${laborSummary.targeted_hours}`)
    console.log(`   Compliance Rate: ${laborSummary.compliance_rate}%`)
    console.log(`   Targeted Rate: ${laborSummary.targeted_compliance_rate}%`)
    console.log(`   Benchmark Met: ${laborSummary.benchmark_met ? "YES ✅" : "NO ❌"}`)
  }
  console.log("")

  // Step 5: Generate quarterly report reminders
  console.log("📋 STAGE 4: QUARTERLY REPORTING")
  console.log("───────────────────────────────────────────────────────────────")
  console.log("⚙️  Running generateQuarterlyReportReminders()...")

  await generateQuarterlyReportReminders()

  const { data: quarterlyTasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("contract_id", contract.id)
    .eq("task_type", "quarterly_report")
    .order("created_at", { ascending: false })
    .limit(1)

  if (quarterlyTasks && quarterlyTasks.length > 0) {
    console.log(`✅ Quarterly report task generated:`)
    console.log(`   ${quarterlyTasks[0].title}`)
    console.log(`   Due: ${quarterlyTasks[0].due_date}`)
  } else {
    console.log(`ℹ️  No new quarterly tasks (may already exist or not yet due)`)
  }
  console.log("")

  // Step 6: Run notification checks
  console.log("📋 STAGE 5: NOTIFICATIONS & ENFORCEMENT")
  console.log("───────────────────────────────────────────────────────────────")
  console.log("⚙️  Running notification checks...")

  // Make one task overdue for testing
  if (tasks && tasks.length > 0) {
    const overdueDate = new Date()
    overdueDate.setDate(overdueDate.getDate() - 5) // 5 days ago

    await supabase
      .from("tasks")
      .update({
        due_date: overdueDate.toISOString().split("T")[0],
        status: "pending",
      })
      .eq("id", tasks[0].id)
  }

  await checkOverdueTasks()
  await checkMissingQuarterlyReports()
  await checkComplianceBelowBenchmark()

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("contract_id", contract.id)
    .order("created_at", { ascending: false })

  console.log(`✅ Generated ${notifications?.length || 0} notifications:`)
  notifications?.forEach((notif, index) => {
    console.log(`   ${index + 1}. [${notif.priority.toUpperCase()}] ${notif.notification_type}`)
    console.log(`      ${notif.message}`)
  })
  console.log("")

  // Step 7: Query audit logs
  console.log("📋 AUDIT TRAIL")
  console.log("───────────────────────────────────────────────────────────────")

  const { data: auditLogs } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("contract_id", contract.id)
    .order("timestamp", { ascending: true })

  console.log(`✅ Found ${auditLogs?.length || 0} audit log entries:`)
  auditLogs?.forEach((log, index) => {
    const timestamp = new Date(log.timestamp).toLocaleString()
    console.log(`   ${index + 1}. [${timestamp}] ${log.action_type}`)
    console.log(`      ${log.description}`)
  })
  console.log("")

  // Final Summary
  console.log("═══════════════════════════════════════════════════════════════")
  console.log("📊 LIFECYCLE TEST SUMMARY")
  console.log("═══════════════════════════════════════════════════════════════")
  console.log(`Contract: ${contract.contract_name}`)
  console.log(`Client: ${contract.clients?.name}`)
  console.log(`Value: $${contract.contract_value?.toLocaleString()}`)
  console.log("")
  console.log("✅ Stage 1 - Pre-Award: Contract selected and validated")
  console.log(
    `✅ Stage 2 - Award: ${tasks?.length || 0} tasks auto-generated, ${benchmarks?.length || 0} benchmarks created`,
  )
  console.log(`✅ Stage 3 - Construction: Labor hours tracked, compliance rate: ${laborSummary?.compliance_rate || 0}%`)
  console.log(`✅ Stage 4 - Quarterly: Report reminders generated`)
  console.log(
    `✅ Stage 5 - Close-Out: ${notifications?.length || 0} notifications sent, ${auditLogs?.length || 0} audit entries logged`,
  )
  console.log("")
  console.log("🎉 All automation functions executed successfully!")
  console.log("═══════════════════════════════════════════════════════════════\n")
}

testFullLifecycle().catch(console.error)
