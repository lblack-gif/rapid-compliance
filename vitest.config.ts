import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],

    // Only run unit tests. Do NOT run Playwright E2E specs in Vitest.
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],

    // Exclude E2E + any duplicated copied folder content
    exclude: [
      "tests/e2e/**",
      "**/tests/e2e/**",
      "**/*@0.1.0 build/**",
      "**/playwright/**",
      "**/node_modules/**"
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: ["node_modules/", "tests/", "*.config.*", "**/*.d.ts", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
