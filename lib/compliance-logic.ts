// Section 3 Compliance Logic Engine
// HUD 24 CFR Part 75 applicability and threshold calculations

export interface ContractApplicability {
  isApplicable: boolean
  subpart: "Subpart B" | "Subpart C" | "N/A"
  threshold: number
  laborHourBenchmark: number
  targetedBenchmark: number
  reason: string
}

export interface FundingSource {
  id: string
  sourceName: string
  sourceType: string
  defaultThreshold: number
  subpartType: "Subpart B" | "Subpart C"
}

/**
 * Determines Section 3 applicability based on HUD 24 CFR Part 75
 *
 * Rules:
 * - Subpart B (most projects): $200,000 threshold
 * - Subpart C (Lead Hazard Control): $100,000 threshold
 * - Applies to entire project even if partially HUD-funded
 * - Does not apply to materials-only contracts
 */
export function calculateSection3Applicability(
  contractType: string,
  hudFundingAmount: number,
  totalProjectCost: number,
  fundingSource: FundingSource | null,
): ContractApplicability {
  // Materials-only contracts are exempt
  if (contractType === "materials_only") {
    return {
      isApplicable: false,
      subpart: "N/A",
      threshold: 0,
      laborHourBenchmark: 0,
      targetedBenchmark: 0,
      reason: "Materials-only contracts are exempt from Section 3 requirements",
    }
  }

  // Determine threshold and subpart based on funding source
  let threshold = 200000 // Default Subpart B threshold
  let subpart: "Subpart B" | "Subpart C" = "Subpart B"
  let laborHourBenchmark = 25 // 25% for Subpart B
  const targetedBenchmark = 5 // 5% for targeted Section 3 workers

  if (fundingSource) {
    threshold = fundingSource.defaultThreshold
    subpart = fundingSource.subpartType

    // Subpart C (Lead Hazard Control) has 5% labor hour benchmark
    if (subpart === "Subpart C") {
      laborHourBenchmark = 5
    }
  } else if (contractType === "lead_hazard_control") {
    // Lead Hazard Control defaults to Subpart C
    threshold = 100000
    subpart = "Subpart C"
    laborHourBenchmark = 5
  }

  // Check if HUD funding exceeds threshold
  const isApplicable = hudFundingAmount >= threshold

  let reason = ""
  if (isApplicable) {
    reason =
      `Section 3 applies: HUD funding ($${hudFundingAmount.toLocaleString()}) exceeds ${subpart} threshold ($${threshold.toLocaleString()}). ` +
      `Required labor hour benchmark: ${laborHourBenchmark}% Section 3 workers, ${targetedBenchmark}% targeted Section 3 workers.`
  } else {
    reason = `Section 3 does not apply: HUD funding ($${hudFundingAmount.toLocaleString()}) is below ${subpart} threshold ($${threshold.toLocaleString()}).`
  }

  return {
    isApplicable,
    subpart: isApplicable ? subpart : "N/A",
    threshold,
    laborHourBenchmark: isApplicable ? laborHourBenchmark : 0,
    targetedBenchmark: isApplicable ? targetedBenchmark : 0,
    reason,
  }
}

/**
 * Calculates compliance rate for a given period
 */
export function calculateComplianceRate(totalLaborHours: number, section3LaborHours: number): number {
  if (totalLaborHours === 0) return 0
  return (section3LaborHours / totalLaborHours) * 100
}

/**
 * Determines if compliance benchmarks are met
 */
export function checkBenchmarkCompliance(
  actualRate: number,
  requiredBenchmark: number,
): {
  isMet: boolean
  variance: number
  status: "exceeds" | "meets" | "below"
} {
  const variance = actualRate - requiredBenchmark

  let status: "exceeds" | "meets" | "below"
  if (actualRate > requiredBenchmark) {
    status = "exceeds"
  } else if (actualRate >= requiredBenchmark) {
    status = "meets"
  } else {
    status = "below"
  }

  return {
    isMet: actualRate >= requiredBenchmark,
    variance,
    status,
  }
}

/**
 * Generates required compliance tasks based on contract applicability
 */
export function generateComplianceTasks(
  contractId: string,
  startDate: Date,
  endDate: Date,
  isApplicable: boolean,
): Array<{
  taskType: string
  title: string
  description: string
  dueDate: Date
  priority: string
  autoGenerationRule: string
}> {
  if (!isApplicable) return []

  const tasks = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Generate quarterly reporting tasks
  const currentQuarter = new Date(start)
  currentQuarter.setMonth(Math.floor(currentQuarter.getMonth() / 3) * 3 + 3)
  currentQuarter.setDate(0) // Last day of quarter

  while (currentQuarter <= end) {
    const dueDate = new Date(currentQuarter)
    dueDate.setDate(dueDate.getDate() + 15) // Due 15 days after quarter end

    tasks.push({
      taskType: "report_submission",
      title: `Quarterly Section 3 Report Due - Q${Math.floor(currentQuarter.getMonth() / 3) + 1} ${currentQuarter.getFullYear()}`,
      description: `Submit quarterly Section 3 compliance report including labor hours, worker counts, and qualitative efforts.`,
      dueDate,
      priority: "high",
      autoGenerationRule: "onQuarterEnd",
    })

    // Move to next quarter
    currentQuarter.setMonth(currentQuarter.getMonth() + 3)
  }

  // Initial worker verification task
  const verificationDue = new Date(start)
  verificationDue.setDate(verificationDue.getDate() + 30)

  tasks.push({
    taskType: "worker_verification",
    title: "Initial Section 3 Worker Verification",
    description:
      "Verify Section 3 status for all workers on this contract. Collect and review eligibility documentation.",
    dueDate: verificationDue,
    priority: "high",
    autoGenerationRule: "onCreateContract",
  })

  // Section 3 Plan submission
  const planDue = new Date(start)
  planDue.setDate(planDue.getDate() + 14)

  tasks.push({
    taskType: "document_upload",
    title: "Submit Section 3 Compliance Plan",
    description: "Upload Section 3 compliance plan detailing recruitment, training, and outreach strategies.",
    dueDate: planDue,
    priority: "high",
    autoGenerationRule: "onCreateContract",
  })

  return tasks
}

/**
 * Determines next reporting period based on contract dates
 */
export function getNextReportingPeriod(
  contractStartDate: Date,
  lastReportEndDate: Date | null,
): {
  periodStart: Date
  periodEnd: Date
  dueDate: Date
  formType: "quarterly" | "annual" | "final"
} {
  const start = lastReportEndDate
    ? new Date(lastReportEndDate.getTime() + 86400000) // Next day after last report
    : new Date(contractStartDate)

  // Calculate quarter end
  const quarterEnd = new Date(start)
  quarterEnd.setMonth(Math.floor(start.getMonth() / 3) * 3 + 3, 0)

  // Due date is 15 days after quarter end
  const dueDate = new Date(quarterEnd)
  dueDate.setDate(dueDate.getDate() + 15)

  return {
    periodStart: start,
    periodEnd: quarterEnd,
    dueDate,
    formType: "quarterly",
  }
}
