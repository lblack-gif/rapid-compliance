"use server"

import {
  calculateComplianceRate,
  calculateSection3Applicability,
  checkBenchmarkCompliance,
} from "@/lib/compliance-logic"
import { createServerClient } from "@/lib/supabase"

/**
 * Workflow Automation: onCreateContract
 * Runs applicability formula and generates required tasks
 */
export async function processNewContract(contractId: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    throw new Error("Supabase client is not initialized")
  }

  try {
    // Fetch contract details
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .select(`
        *,
        funding_sources (
          id,
          source_name,
          source_type,
          default_threshold,
          subpart_type
        )
      `)
      .eq("id", contractId)
      .single()

    if (contractError) throw contractError

    // Calculate Section 3 applicability
    const applicability = calculateSection3Applicability(
      contract.contract_type,
      contract.hud_funding_amount,
      contract.total_project_cost,
      contract.funding_sources,
    )

    // Update contract with applicability results
    const { error: updateError } = await supabase
      .from("contracts")
      .update({
        section3_applicable: applicability.isApplicable,
        applicability_subpart: applicability.subpart,
        applicability_threshold: applicability.threshold,
        applicability_reason: applicability.reason,
        labor_hour_benchmark: applicability.laborHourBenchmark,
        targeted_section3_benchmark: applicability.targetedBenchmark,
        applicability_calculated_at: new Date().toISOString(),
      })
      .eq("id", contractId)

    if (updateError) throw updateError

    if (applicability.isApplicable) {
      const startDate = new Date(contract.start_date)
      const endDate = new Date(contract.end_date)

      // Calculate due dates
      const actionPlanDue = new Date(startDate)
      actionPlanDue.setDate(actionPlanDue.getDate() + 14) // 14 days after start

      const verificationLogDue = new Date(startDate)
      verificationLogDue.setDate(verificationLogDue.getDate() + 30) // 30 days after start

      const firstQuarterlyDue = new Date(startDate)
      firstQuarterlyDue.setDate(firstQuarterlyDue.getDate() + 90) // 90 days after start

      const finalReportDue = new Date(endDate)
      finalReportDue.setDate(finalReportDue.getDate() + 15) // 15 days after end

      // Create the 4 required tasks
      const tasksToInsert = [
        {
          contract_id: contractId,
          client_id: contract.client_id,
          task_type: "document_upload",
          title: "Section 3 Action Plan Submission",
          description:
            "Submit Section 3 Action Plan detailing recruitment, training, and outreach strategies for this contract.",
          due_date: actionPlanDue.toISOString().split("T")[0],
          priority: "high",
          is_auto_generated: true,
          auto_generation_rule: "onCreateContract",
          status: "pending",
        },
        {
          contract_id: contractId,
          client_id: contract.client_id,
          task_type: "worker_verification",
          title: "Worker Verification Log Setup",
          description:
            "Set up worker verification log and begin collecting Section 3 eligibility documentation for all workers.",
          due_date: verificationLogDue.toISOString().split("T")[0],
          priority: "high",
          is_auto_generated: true,
          auto_generation_rule: "onCreateContract",
          status: "pending",
        },
        {
          contract_id: contractId,
          client_id: contract.client_id,
          task_type: "report_submission",
          title: "First Quarterly Report",
          description:
            "Submit first quarterly Section 3 compliance report including labor hours, worker counts, and qualitative efforts.",
          due_date: firstQuarterlyDue.toISOString().split("T")[0],
          priority: "high",
          is_auto_generated: true,
          auto_generation_rule: "onCreateContract",
          status: "pending",
        },
        {
          contract_id: contractId,
          client_id: contract.client_id,
          task_type: "report_submission",
          title: "Final Report",
          description:
            "Submit final Section 3 compliance report summarizing all activities, outcomes, and lessons learned for this contract.",
          due_date: finalReportDue.toISOString().split("T")[0],
          priority: "high",
          is_auto_generated: true,
          auto_generation_rule: "onCreateContract",
          status: "pending",
        },
      ]

      const { error: tasksError } = await supabase.from("tasks").insert(tasksToInsert)

      if (tasksError) throw tasksError

      // Log the task creation in audit_logs
      const { data: userData } = await supabase.auth.getUser()

      await supabase.from("audit_logs").insert({
        user_id: userData?.user?.id || null,
        contract_id: contractId,
        action_type: "tasks_auto_generated",
        description: `Auto-generated 4 compliance tasks for Section 3 applicable contract: ${contract.contract_name}`,
      })

      // Create initial benchmarks
      const benchmarks = [
        {
          contract_id: contractId,
          benchmark_type: "labor_hours",
          benchmark_name: "Section 3 Labor Hours",
          target_percentage: applicability.laborHourBenchmark,
          measurement_unit: "percentage",
          period_start: contract.start_date,
          period_end: contract.end_date,
          description: `${applicability.laborHourBenchmark}% of total labor hours must be performed by Section 3 workers`,
        },
        {
          contract_id: contractId,
          benchmark_type: "targeted_hours",
          benchmark_name: "Targeted Section 3 Labor Hours",
          target_percentage: applicability.targetedBenchmark,
          measurement_unit: "percentage",
          period_start: contract.start_date,
          period_end: contract.end_date,
          description: `${applicability.targetedBenchmark}% of total labor hours must be performed by targeted Section 3 workers`,
        },
      ]

      const { error: benchmarksError } = await supabase.from("benchmarks").insert(benchmarks)

      if (benchmarksError) throw benchmarksError

      // Log benchmark creation
      await supabase.from("audit_logs").insert({
        user_id: userData?.user?.id || null,
        contract_id: contractId,
        action_type: "benchmarks_created",
        description: `Created Section 3 benchmarks: ${applicability.laborHourBenchmark}% labor hours, ${applicability.targetedBenchmark}% targeted hours`,
      })
    }

    return { success: true, applicability }
  } catch (error) {
    console.error("[v0] Error processing new contract:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Workflow Automation: onQuarterEnd
 * Generates quarterly report reminders
 */
export async function generateQuarterlyReportReminders() {
  const supabase = await createServerClient()

  if (!supabase) {
    throw new Error("Supabase client is not initialized")
  }

  try {
    // Get all active contracts with Section 3 applicability
    const { data: contracts, error: contractsError } = await supabase
      .from("contracts")
      .select("id, contract_name, start_date, end_date")
      .eq("section3_applicable", true)
      .eq("status", "active")

    if (contractsError) throw contractsError

    const today = new Date()
    const currentQuarterEnd = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 3, 0)
    const dueDate = new Date(currentQuarterEnd)
    dueDate.setDate(dueDate.getDate() + 15)

    const tasksToCreate: any[] = []

    for (const contract of contracts || []) {
      // Check if task already exists for this quarter
      const { data: existingTask } = await supabase
        .from("tasks")
        .select("id")
        .eq("contract_id", contract.id)
        .eq("task_type", "report_submission")
        .gte("due_date", currentQuarterEnd.toISOString().split("T")[0])
        .single()

      if (!existingTask) {
        tasksToCreate.push({
          contract_id: contract.id,
          task_type: "report_submission",
          title: `Quarterly Section 3 Report Due - Q${Math.floor(today.getMonth() / 3) + 1} ${today.getFullYear()}`,
          description: `Submit quarterly Section 3 compliance report for ${contract.contract_name}`,
          due_date: dueDate.toISOString().split("T")[0],
          priority: "high",
          is_auto_generated: true,
          auto_generation_rule: "onQuarterEnd",
          status: "pending",
        })
      }
    }

    if (tasksToCreate.length > 0) {
      const { error: insertError } = await supabase.from("tasks").insert(tasksToCreate)

      if (insertError) throw insertError
    }

    return { success: true, tasksCreated: tasksToCreate.length }
  } catch (error) {
    console.error("[v0] Error generating quarterly reminders:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Updates contract labor summary and benchmark progress
 */
export async function updateContractLaborSummary(contractId: string, period: "monthly" | "quarterly" | "total") {
  const supabase = await createServerClient()

  if (!supabase) {
    throw new Error("Supabase client is not initialized")
  }

  try {
    // Get contract details
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .select("labor_hour_benchmark, targeted_section3_benchmark")
      .eq("id", contractId)
      .single()

    if (contractError) throw contractError

    // Calculate period dates
    const today = new Date()
    let periodStart: Date
    const periodEnd: Date = today

    if (period === "monthly") {
      periodStart = new Date(today.getFullYear(), today.getMonth(), 1)
    } else if (period === "quarterly") {
      periodStart = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)
    } else {
      // Total - from contract start
      const { data: contractDates } = await supabase
        .from("contracts")
        .select("start_date")
        .eq("id", contractId)
        .single()
      periodStart = new Date(contractDates?.start_date || today)
    }

    // Aggregate labor hours from labor_hours table
    const { data: laborData, error: laborError } = await supabase
      .from("labor_hours")
      .select(`
        hours_worked,
        worker_id,
        workers!inner (
          is_section3_worker,
          is_targeted_section3_worker
        )
      `)
      .eq("contract_id", contractId)
      .gte("work_date", periodStart.toISOString().split("T")[0])
      .lte("work_date", periodEnd.toISOString().split("T")[0])

    if (laborError) throw laborError

    type LaborRecord = {
      hours_worked: number
      worker_id: string
      workers:
        | {
            is_section3_worker: boolean
            is_targeted_section3_worker: boolean
          }
        | {
            is_section3_worker: boolean
            is_targeted_section3_worker: boolean
          }[]
    }

    const typedLaborData = (laborData || []) as LaborRecord[]

    // Calculate totals
    let totalHours = 0
    let section3Hours = 0
    let targetedSection3Hours = 0
    const workerIds = new Set<string>()
    const section3WorkerIds = new Set<string>()
    const targetedWorkerIds = new Set<string>()

    for (const record of typedLaborData) {
      totalHours += record.hours_worked

      const workerInfo = Array.isArray(record.workers) ? record.workers[0] : record.workers

      if (workerInfo?.is_section3_worker) {
        section3Hours += record.hours_worked
        section3WorkerIds.add(record.worker_id)
      }

      if (workerInfo?.is_targeted_section3_worker) {
        targetedSection3Hours += record.hours_worked
        targetedWorkerIds.add(record.worker_id)
      }

      workerIds.add(record.worker_id)
    }

    const section3Rate = calculateComplianceRate(totalHours, section3Hours)
    const targetedRate = calculateComplianceRate(totalHours, targetedSection3Hours)

    const meetsSection3 = checkBenchmarkCompliance(section3Rate, contract.labor_hour_benchmark || 25)
    const meetsTargeted = checkBenchmarkCompliance(targetedRate, contract.targeted_section3_benchmark || 5)

    // Upsert summary
    const { error: summaryError } = await supabase.from("contract_labor_summary").upsert(
      {
        contract_id: contractId,
        summary_period: period,
        period_start: periodStart.toISOString().split("T")[0],
        period_end: periodEnd.toISOString().split("T")[0],
        total_hours: totalHours,
        section3_hours: section3Hours,
        targeted_section3_hours: targetedSection3Hours,
        total_workers: workerIds.size,
        section3_workers: section3WorkerIds.size,
        targeted_section3_workers: targetedWorkerIds.size,
        section3_compliance_rate: section3Rate,
        targeted_compliance_rate: targetedRate,
        meets_section3_benchmark: meetsSection3.isMet,
        meets_targeted_benchmark: meetsTargeted.isMet,
        last_calculated_at: new Date().toISOString(),
      },
      {
        onConflict: "contract_id,summary_period,period_start,period_end",
      },
    )

    if (summaryError) throw summaryError

    return {
      success: true,
      summary: {
        totalHours,
        section3Hours,
        section3Rate,
        meetsSection3: meetsSection3.isMet,
      },
    }
  } catch (error) {
    console.error("[v0] Error updating contract labor summary:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
