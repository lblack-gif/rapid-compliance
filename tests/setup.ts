import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
      update: vi.fn(() => Promise.resolve({ data: null, error: null })),
      delete: vi.fn(() => Promise.resolve({ data: null, error: null })),
    })),
  },
}))

/**
 * vitest fetch mock
 * Makes relative /api/* calls work in unit tests.
 */
import { vi } from "vitest"

vi.stubGlobal("fetch", vi.fn(async (input: any, init?: any) => {
  const url = typeof input === "string" ? input : (input?.url ?? "")

  if (url === "/api/dashboard/kpis") {
    return new Response(JSON.stringify({
      ok: true,
      data: {
        kpis: {
          totalContracts: 0,
          totalContractors: 0,
          totalWorkers: 0,
          section3HoursPct: 0,
          targetedHoursPct: 0
        }
      }
    }), { status: 200, headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } })
})) as any

