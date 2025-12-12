import { test, expect } from "./fixtures/auth"

test.describe("Admin Dashboard", () => {
  test("should load admin dashboard without errors", async ({ authenticatedPage: page }) => {
    await expect(page.locator("text=Section 3 Compliance Dashboard")).toBeVisible()

    const logs: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        logs.push(msg.text())
      }
    })

    // Wait a bit to collect any console errors
    await page.waitForTimeout(2000)

    expect(logs.filter((log) => !log.includes("[v0]"))).toHaveLength(0)
  })

  test("should navigate to different tabs", async ({ authenticatedPage: page }) => {
    await page.click("text=Overview")
    await expect(page.locator("text=Total Labor Hours")).toBeVisible()

    await page.click("text=Notifications")
    await page.waitForTimeout(500)

    await page.click("text=Messages")
    await page.waitForTimeout(500)

    await page.click("text=Workers")
    await page.waitForTimeout(500)

    await page.click("text=Contractors")
    await page.waitForTimeout(500)
  })

  test("should display KPI cards", async ({ authenticatedPage: page }) => {
    await expect(page.locator("text=Total Labor Hours")).toBeVisible()
    await expect(page.locator("text=Section 3 Hours")).toBeVisible()
    await expect(page.locator("text=Targeted Section 3 Hours")).toBeVisible()
    await expect(page.locator("text=Quarterly CAPs Completed")).toBeVisible()
  })

  test("should open Quick Actions modals", async ({ authenticatedPage: page }) => {
    await page.click("text=Register Worker")
    await expect(page.locator("text=Register Section 3 Worker")).toBeVisible()
    await page.press("body", "Escape")

    await page.click("text=Log Hours")
    await expect(page.locator("text=Log Labor Hours")).toBeVisible()
    await page.press("body", "Escape")
  })
})
