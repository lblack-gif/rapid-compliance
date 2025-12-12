import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { LoginForm } from "@/components/auth/login-form"

// Mock useAuth hook
vi.mock("@/lib/auth", () => ({
  useAuth: () => ({
    login: vi.fn((email, password) => {
      if (email === "admin@rapidcompliance.com" && password === "password123") {
        return Promise.resolve(true)
      }
      return Promise.resolve(false)
    }),
  }),
}))

describe("LoginForm", () => {
  it("renders login form", () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("displays demo account information", () => {
    render(<LoginForm />)

    expect(screen.getByText(/demo accounts:/i)).toBeInTheDocument()
    expect(screen.getByText(/admin@rapidcompliance.com/i)).toBeInTheDocument()
  })

  it("shows validation for empty fields", async () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole("button", { name: /sign in/i })
    fireEvent.click(submitButton)

    // HTML5 validation should prevent submission
    const emailInput = screen.getByLabelText(/email address/i)
    expect(emailInput).toBeRequired()
  })

  it("updates input values on change", () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password" } })

    expect(emailInput.value).toBe("test@example.com")
    expect(passwordInput.value).toBe("password")
  })
})
