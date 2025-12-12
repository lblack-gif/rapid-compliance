import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import DashboardPage from "@/app/dashboard/page"

// Mock useAuth
const mockUseAuth = vi.fn()
vi.mock("@/lib/auth", () => ({
  useAuth: () => mockUseAuth(),
}))

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("shows loading state when loading", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: true,
    })

    render(<DashboardPage />)
    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument()
  })

  it("redirects to login when no user", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
    })

    render(<DashboardPage />)
    // Component should return null when no user
    expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument()
  })

  it("renders admin dashboard for admin user", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "1", email: "admin@test.com", role: "admin" },
      isLoading: false,
    })

    render(<DashboardPage />)
    // AdminDashboard should render
    expect(screen.queryByText(/loading dashboard/i)).not.toBeInTheDocument()
  })
})
