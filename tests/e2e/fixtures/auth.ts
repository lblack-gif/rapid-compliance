import { test as base } from "@playwright/test"

type AuthFixtures = {
  authenticatedPage: typeof base
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login page
    await page.goto("/login")

    // Fill in admin credentials
    await page.fill('input[id="email"]', "admin@rapidcompliance.com")
    await page.fill('input[id="password"]', "password123")

    // Click sign in button
    await page.click('button[type="submit"]')

    // Wait for navigation to dashboard
    await page.waitForURL("**/dashboard")

    await use(page)
  },
})

export { expect } from "@playwright/test"
