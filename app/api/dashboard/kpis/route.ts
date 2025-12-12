import { NextResponse } from "next/server"
import { supabaseAdmin, supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

const mockLaborData = {
  totalLaborHours: 5400,
  section3Hours: 1380,
  targetedSection3Hours: 828,
  quarterlyCAPs: { completed: 2, total: 3 },
}

const mockWorkerData = {
  workers: {
    total: 147,
    section3: 48,
    targeted: 29,
    active: 142,
  },
  recentWorkers: [
    { id: "1", name: "Marcus Johnson", isSection3: true, isTargeted: false, status: "verified" },
    { id: "2", name: "Sarah Williams", isSection3: true, isTargeted: true, status: "verified" },
    { id: "3", name: "David Rodriguez", isSection3: true, isTargeted: false, status: "verified" },
    { id: "4", name: "Ashley Davis", isSection3: false, isTargeted: false, status: "active" },
    { id: "5", name: "James Wilson", isSection3: true, isTargeted: true, status: "verified" },
  ],
}

async function safeQuery<T>(
  db: NonNullable<typeof supabase>,
  table: string,
  selectFields: string,
  filters?: { field: string; operator: string; value: string }[],
): Promise<{ data: T[] | null; error: Error | null }> {
  try {
    let query = db.from(table).select(selectFields)

    if (filters) {
      for (const filter of filters) {
        if (filter.operator === "gte") {
          query = query.gte(filter.field, filter.value)
        } else if (filter.operator === "lte") {
          query = query.lte(filter.field, filter.value)
        } else if (filter.operator === "eq") {
          query = query.eq(filter.field, filter.value)
        }
      }
    }

    const result = await query

    // Check for Supabase errors (including table not found)
    if (result.error) {
      return { data: null, error: new Error(result.error.message) }
    }

    return { data: result.data as T[], error: null }
  } catch (err) {
    // Catch network/fetch errors
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
}

export async function GET() {
  try {
    const db = supabaseAdmin || supabase

    if (!db) {
      // No database connection, return all mock data
      return NextResponse.json({ ...mockLaborData, ...mockWorkerData })
    }

    let totalWorkers = 0
    let section3Workers = 0
    let targetedWorkers = 0
    let activeWorkers = 0
    let recentWorkers: Array<{
      id: string
      name: string
      isSection3: boolean
      isTargeted: boolean
      status: string
    }> = []

    const { data: workersData, error: workersError } = await db
      .from("workers")
      .select(
        "id, first_name, last_name, is_section3_worker, is_targeted_section3_worker, verification_status, created_at",
      )
      .order("created_at", { ascending: false })

    if (!workersError && workersData && workersData.length > 0) {
      totalWorkers = workersData.length
      section3Workers = workersData.filter((w) => w.is_section3_worker).length
      targetedWorkers = workersData.filter((w) => w.is_targeted_section3_worker).length
      activeWorkers = workersData.filter(
        (w) => w.verification_status === "verified" || w.verification_status === "active",
      ).length

      recentWorkers = workersData.slice(0, 10).map((w) => ({
        id: w.id,
        name: `${w.first_name || ""} ${w.last_name || ""}`.trim() || "Unknown",
        isSection3: w.is_section3_worker || false,
        isTargeted: w.is_targeted_section3_worker || false,
        status: w.verification_status || "pending",
      }))

      // Return real worker data with mock labor hours data
      return NextResponse.json({
        ...mockLaborData,
        workers: {
          total: totalWorkers,
          section3: section3Workers,
          targeted: targetedWorkers,
          active: activeWorkers,
        },
        recentWorkers,
      })
    }

    // Workers query failed or no data, return all mock data
    return NextResponse.json({ ...mockLaborData, ...mockWorkerData })
  } catch (error) {
    // Fallback to mock data on any error
    return NextResponse.json({ ...mockLaborData, ...mockWorkerData })
  }
}
