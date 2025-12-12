import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import {
  createServerClient as createSupabaseServerClient,
  createBrowserClient as createSupabaseBrowserClient,
} from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
const isServiceRoleConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey)

export const supabase = isSupabaseConfigured ? createSupabaseClient(supabaseUrl, supabaseAnonKey) : null

export const supabaseAdmin = isServiceRoleConfigured
  ? createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

/**
 * Creates a basic Supabase client.
 * For server-side use, prefer createServerClient().
 * For client-side use, prefer createBrowserClient().
 */
export function createClient() {
  if (!isSupabaseConfigured) {
    console.warn("[v0] Supabase environment variables not configured. Using mock data mode.")
    return null
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Creates a Supabase browser client for use in Client Components.
 * Handles cookies and authentication on the client side.
 */
export function createBrowserClient() {
  if (!isSupabaseConfigured) {
    console.warn("[v0] Supabase environment variables not configured. Using mock data mode.")
    return null
  }
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Creates a Supabase server client for use in Server Actions and Server Components.
 * Always create a new client within each function - do not use global variables.
 * This is especially important for Fluid compute.
 */
export async function createServerClient() {
  if (!isSupabaseConfigured) {
    console.warn("[v0] Supabase environment variables not configured. Using mock data mode.")
    return null
  }

  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  })
}

// Mock data for development and testing
export const mockData = {
  projects: [
    {
      id: "PROJ-001",
      name: "Senior Housing Development",
      contractor: "Metro Contractors",
      status: "active",
      section3Target: 25,
      section3Actual: 18,
      contractValue: 2500000,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      location: "Ward 7, DC",
      totalHours: 2400,
      section3Hours: 432,
    },
    {
      id: "PROJ-002",
      name: "Affordable Housing Phase 1",
      contractor: "ABC Construction",
      status: "active",
      section3Target: 25,
      section3Actual: 34,
      contractValue: 1800000,
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      location: "Ward 8, DC",
      totalHours: 1800,
      section3Hours: 612,
    },
    {
      id: "PROJ-003",
      name: "Community Center Renovation",
      contractor: "Urban Builders",
      status: "active",
      section3Target: 25,
      section3Actual: 28,
      contractValue: 950000,
      startDate: "2024-03-01",
      endDate: "2024-09-30",
      location: "Ward 5, DC",
      totalHours: 1200,
      section3Hours: 336,
    },
    {
      id: "PROJ-004",
      name: "Public Housing Modernization",
      contractor: "Capital Development",
      status: "planning",
      section3Target: 25,
      section3Actual: 0,
      contractValue: 3200000,
      startDate: "2024-06-01",
      endDate: "2025-03-31",
      location: "Ward 6, DC",
      totalHours: 0,
      section3Hours: 0,
    },
  ],
  workers: [
    {
      id: "W-001",
      name: "Marcus Johnson",
      email: "marcus.johnson@email.com",
      phone: "(202) 555-0101",
      trade: "Construction",
      isSection3: true,
      isTargeted: false,
      status: "active",
      hireDate: "2024-01-20",
      totalHours: 320,
    },
    {
      id: "W-002",
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "(202) 555-0102",
      trade: "Electrical",
      isSection3: true,
      isTargeted: true,
      status: "active",
      hireDate: "2024-02-15",
      totalHours: 280,
    },
    {
      id: "W-003",
      name: "David Rodriguez",
      email: "david.rodriguez@email.com",
      phone: "(202) 555-0103",
      trade: "Plumbing",
      isSection3: true,
      isTargeted: false,
      status: "active",
      hireDate: "2024-01-30",
      totalHours: 295,
    },
    {
      id: "W-004",
      name: "Ashley Davis",
      email: "ashley.davis@email.com",
      phone: "(202) 555-0104",
      trade: "HVAC",
      isSection3: false,
      isTargeted: false,
      status: "active",
      hireDate: "2024-03-10",
      totalHours: 180,
    },
  ],
  laborHours: [
    {
      id: "LH-001",
      workerId: "W-001",
      projectId: "PROJ-001",
      date: "2024-01-22",
      hours: 8,
      description: "Foundation work",
    },
    {
      id: "LH-002",
      workerId: "W-002",
      projectId: "PROJ-002",
      date: "2024-02-16",
      hours: 7.5,
      description: "Electrical installation",
    },
    {
      id: "LH-003",
      workerId: "W-003",
      projectId: "PROJ-003",
      date: "2024-03-05",
      hours: 8,
      description: "Plumbing rough-in",
    },
  ],
}
