"use server"

import { createServerClient } from "@/lib/supabase"

interface Notification {
  user_id: string
  notification_type: string
  title: string
  message: string
  priority: "low" | "medium" | "high"
  related_contract_id?: string
  related_task_id?: string
}

/**
 * Check for overdue tasks (3+ days past due) and create alerts
 */
export async function checkOverdueTasks() {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Supabase not configured", alertsCreated: 0 }
  }

  try {
    const today = new Date()
    const threeDaysAgo = new Date(today)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    // Find tasks that are 3+ days overdue
    const { data: overdueTasks } = await supabase
      .from("tasks")
      .select(`
        id,
        title,
        due_date,
        contract_id,
        assigned_to,
        contracts!inner (
          contract_name,
          contract_number
        )
      `)
      .in("status", ["pending", "in_progress"])
      .lte("due_date", threeDaysAgo.toISOString().split("T")[0])

    const notifications: Notification[] = []

    for (const task of overdueTasks || []) {
      const dueDate = new Date(task.due_date)
      const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

      const contractNumber = task.contracts?.[0]?.contract_number || "Unknown"

      notifications.push({
        user_id: task.assigned_to,
        notification_type: "overdue_task",
        title: "Overdue Task Alert",
        message: `Task "${task.title}" for contract ${contractNumber} is ${daysOverdue} days overdue.`,
        priority: "high",
        related_contract_id: task.contract_id,
        related_task_id: task.id,
      })
    }

    if (notifications.length > 0) {
      const { error } = await supabase.from("notifications").insert(notifications)
      if (error) throw error
    }

    return { success: true, alertsCreated: notifications.length }
  } catch (error) {
    console.error("[v0] Error checking overdue tasks:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Check for missing quarterly reports
 */
export async function checkMissingQuarterlyReports() {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Supabase not configured", alertsCreated: 0 }
  }

  try {
    const today = new Date()

    // Get all active Section 3 contracts
    const { data: contracts } = await supabase
      .from("contracts")
      .select("id, contract_name, contract_number, start_date, client_id")
      .eq("section3_applicable", true)
      .eq("status", "active")

    const notifications: Notification[] = []

    for (const contract of contracts || []) {
      const startDate = new Date(contract.start_date)
      const quartersSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 90))

      if (quartersSinceStart > 0) {
        // Check if quarterly reports exist
        const { data: reports } = await supabase
          .from("compliance_forms")
          .select("id")
          .eq("contract_id", contract.id)
          .eq("form_type", "quarterly")

        const reportCount = reports?.length || 0

        if (reportCount < quartersSinceStart) {
          // Get users associated with this contract's client
          const { data: users } = await supabase
            .from("profiles")
            .select("id")
            .eq("client_id", contract.client_id)
            .in("role", ["client_admin", "compliance_manager"])

          for (const user of users || []) {
            notifications.push({
              user_id: user.id,
              notification_type: "missing_report",
              title: "Missing Quarterly Report",
              message: `Quarterly Section 3 report is missing for contract ${contract.contract_number} - ${contract.contract_name}.`,
              priority: "high",
              related_contract_id: contract.id,
            })
          }
        }
      }
    }

    if (notifications.length > 0) {
      const { error } = await supabase.from("notifications").insert(notifications)
      if (error) throw error
    }

    return { success: true, alertsCreated: notifications.length }
  } catch (error) {
    console.error("[v0] Error checking missing reports:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Check for contracts below benchmark
 */
export async function checkComplianceBelowBenchmark() {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Supabase not configured", alertsCreated: 0 }
  }

  try {
    // Find contracts not meeting benchmarks
    const { data: summaries } = await supabase
      .from("contract_labor_summary")
      .select(`
        contract_id,
        section3_compliance_rate,
        meets_section3_benchmark,
        contracts!inner (
          contract_name,
          contract_number,
          labor_hour_benchmark,
          client_id
        )
      `)
      .eq("summary_period", "total")
      .eq("meets_section3_benchmark", false)

    const notifications: Notification[] = []

    for (const summary of summaries || []) {
      const contract = summary.contracts?.[0]
      if (!contract) continue

      const variance = summary.section3_compliance_rate - contract.labor_hour_benchmark

      // Get users associated with this contract's client
      const { data: users } = await supabase
        .from("profiles")
        .select("id")
        .eq("client_id", contract.client_id)
        .in("role", ["client_admin", "compliance_manager", "admin"])

      for (const user of users || []) {
        notifications.push({
          user_id: user.id,
          notification_type: "below_benchmark",
          title: "Compliance Below Benchmark",
          message: `Contract ${contract.contract_number} is ${Math.abs(variance).toFixed(1)}% below the Section 3 benchmark (${summary.section3_compliance_rate.toFixed(1)}% vs ${contract.labor_hour_benchmark}% required).`,
          priority: "high",
          related_contract_id: summary.contract_id,
        })
      }
    }

    if (notifications.length > 0) {
      const { error } = await supabase.from("notifications").insert(notifications)
      if (error) throw error
    }

    return { success: true, alertsCreated: notifications.length }
  } catch (error) {
    console.error("[v0] Error checking compliance benchmarks:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Run all notification checks (can be called by cron job)
 */
export async function runAllNotificationChecks() {
  const results = await Promise.all([
    checkOverdueTasks(),
    checkMissingQuarterlyReports(),
    checkComplianceBelowBenchmark(),
  ])

  const totalAlerts = results.reduce((sum, r) => sum + (r.alertsCreated || 0), 0)

  return {
    success: results.every((r) => r.success),
    totalAlerts,
    results,
  }
}
