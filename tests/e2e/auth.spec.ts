import { test, expect } from "@playwright/test"

test.describe("Authentication", () => {
  test("should display login page", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator("text=Welcome Back")).toBeVisible()
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[id="password"]')).toBeVisible()
  })

  test("should login with admin credentials", async ({ page }) => {
    await page.goto("/login")

    await page.fill('input[id="email"]', "admin@rapidcompliance.com")
    await page.fill('input[id="password"]', "password123")

    await page.click('button[type="submit"]')

    await page.waitForURL("**/dashboard")
    await expect(page).toHaveURL(/.*dashboard/)
  })

  test("should login with contractor credentials", async ({ page }) => {
    await page.goto("/login")

    await page.fill('input[id="email"]', "contractor@hamelbuilders.com")
    await page.fill('input[id="password"]', "password123")
    await page.click('button[type="submit"]')

    await page.waitForURL("**/dashboard")
    await expect(page).toHaveURL(/.*dashboard/)
  })

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/login")

    await page.fill('input[id="email"]', "invalid@email.com")
    await page.fill('input[id="password"]', "wrongpassword")
    await page.click('button[type="submit"]')

    await expect(page.locator("text=Invalid email or password")).toBeVisible()
  })

  test("should display demo account information", async ({ page }) => {
    await page.goto("/login")

    await expect(page.locator("text=Demo Accounts:")).toBeVisible()
    await expect(page.locator("text=admin@rapidcompliance.com")).toBeVisible()
    await expect(page.locator("text=contractor@hamelbuilders.com")).toBeVisible()
  })
})
