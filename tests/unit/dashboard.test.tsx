import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"

import DashboardPage from "@/app/dashboard/page"

/**
 * Hoist-safe mocks for next/navigation
 * We expose spies on globalThis so assertions are stable.
 */
vi.mock("next/navigation", async () => {
  const actual: any = await vi.importActual("next/navigation")

  ;(globalThis as any).__mockPush ??= vi.fn()
  ;(globalThis as any).__mockReplace ??= vi.fn()
  ;(globalThis as any).__mockRedirect ??= vi.fn()

  return {
    ...actual,
    useRouter: () => ({
      push: (globalThis as any).__mockPush,
      replace: (globalThis as any).__mockReplace,
    }),
    redirect: (globalThis as any).__mockRedirect,
  }
})

/**
 * Mock Supabase helper expected by admin-dashboard.tsx
 */
vi.mock("@/lib/supabase", async (importOriginal) => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    mockData: {
      contracts: [],
      contractors: [],
      workers: [],
      projects: [],
      submissions: [],
      notifications: [],
      laborHours: [],
      complianceReports: [],
    },
  }
})

/**
 * Mock auth hook
 */
vi.mock("@/lib/auth", () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from "@/lib/auth"

describe("DashboardPage", () => {
  beforeEach(() => {
    ;(globalThis as any).__mockPush?.mockReset?.()
    ;(globalThis as any).__mockReplace?.mockReset?.()
    ;(globalThis as any).__mockRedirect?.mockReset?.()
  })

  it("shows loading state when loading", () => {
    ;(useAuth as any).mockReturnValue({ user: null, isLoading: true })

    render(<DashboardPage />)

    expect(document.body.textContent?.toLowerCase()).toContain("loading")
  })

  it("navigates to login when no user", () => {
    ;(useAuth as any).mockReturnValue({ user: null, isLoading: false })

    render(<DashboardPage />)

    const didReplace = ((globalThis as any).__mockReplace?.mock.calls?.length ?? 0) > 0
    const didPush = ((globalThis as any).__mockPush?.mock.calls?.length ?? 0) > 0
    const didRedirect = ((globalThis as any).__mockRedirect?.mock.calls?.length ?? 0) > 0

    expect(didReplace || didPush || didRedirect).toBe(true)
  })

  it("renders dashboard for admin user", () => {
    ;(useAuth as any).mockReturnValue({
      user: { id: "1", email: "admin@test.com", role: "admin" },
      isLoading: false,
    })

    render(<DashboardPage />)

    expect(document.body.textContent?.toLowerCase()).toMatch(/dashboard|section 3|compliance/)
  })
})
