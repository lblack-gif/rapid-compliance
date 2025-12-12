import { test, expect } from "@playwright/test"

const publicRoutes = ["/", "/landing", "/login", "/pricing", "/features", "/about", "/contact", "/resources", "/help"]

test.describe("Smoke Tests", () => {
  for (const route of publicRoutes) {
    test(`${route} should load without errors`, async ({ page }) => {
      const response = await page.goto(route)

      expect(response?.status()).toBeLessThan(400)

      const errors: string[] = []
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text())
        }
      })

      await page.waitForTimeout(1000)

      const realErrors = errors.filter((e) => !e.includes("[v0]") && !e.includes("favicon"))
      expect(realErrors).toHaveLength(0)
    })
  }

  test("should not have broken internal links", async ({ page }) => {
    await page.goto("/landing")

    const links = await page.locator('a[href^="/"]').all()

    for (const link of links.slice(0, 10)) {
      // Test first 10 links
      const href = await link.getAttribute("href")
      if (href && !href.includes("#")) {
        const response = await page.goto(href)
        expect(response?.status()).toBeLessThan(400)
      }
    }
  })
})
