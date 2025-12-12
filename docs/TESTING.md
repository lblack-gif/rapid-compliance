# Testing Guide

## Overview

This project uses a comprehensive testing strategy with three layers:

1. **Unit Tests** - Vitest + React Testing Library for component and function testing
2. **E2E Tests** - Playwright for end-to-end user flow testing
3. **CI/CD** - GitHub Actions for automated testing on every push and PR

## Running Tests Locally

### Prerequisites

\`\`\`bash
# Install dependencies
pnpm install

# Install Playwright browsers (one-time setup)
pnpm run playwright:install
\`\`\`

### Unit Tests

\`\`\`bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm run test:ui

# Generate coverage report
pnpm run test:coverage
\`\`\`

Coverage reports are generated in `coverage/` directory. Open `coverage/index.html` in your browser to view the detailed report.

### E2E Tests

\`\`\`bash
# Run E2E tests (headless)
pnpm run test:e2e

# Run E2E tests with UI
pnpm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
pnpm run test:e2e:headed

# Debug a specific test
pnpm run test:e2e:debug

# Run specific test file
pnpm exec playwright test tests/e2e/auth.spec.ts
\`\`\`

### Run All Tests

\`\`\`bash
# Run linting, unit tests, and E2E tests
pnpm run test:all
\`\`\`

## Test Structure

\`\`\`
tests/
├── e2e/                    # Playwright E2E tests
│   ├── fixtures/          # Test fixtures and helpers
│   │   └── auth.ts       # Authentication fixture
│   ├── auth.spec.ts      # Authentication tests
│   ├── dashboard.spec.ts # Dashboard tests
│   └── smoke.spec.ts     # Smoke tests
├── unit/                  # Vitest unit tests
│   ├── login-form.test.tsx
│   └── dashboard.test.tsx
└── setup.ts              # Test setup and global mocks
\`\`\`

## Writing Tests

### Unit Tests

Unit tests use Vitest and React Testing Library:

\`\`\`typescript
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MyComponent } from "@/components/my-component"

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
\`\`\`

### E2E Tests

E2E tests use Playwright:

\`\`\`typescript
import { test, expect } from "@playwright/test"

test("my test", async ({ page }) => {
  await page.goto("/my-page")
  await expect(page.locator("text=Hello")).toBeVisible()
})
\`\`\`

## Test Accounts

The following demo accounts are available for testing:

- **Admin**: `admin@rapidcompliance.com` / `password123`
- **Contractor**: `contractor@hamelbuilders.com` / `password123`
- **Resident**: `resident@email.com` / `password123`

## CI/CD

Tests run automatically on:

- Every push to `main` or `develop` branches
- Every pull request
- Vercel preview deployments

### GitHub Actions Workflows

- **Lint & Type Check** - Runs ESLint and TypeScript compiler
- **Unit Tests** - Runs Vitest with coverage
- **E2E Tests** - Runs Playwright against built application
- **Preview Tests** - Runs E2E tests against Vercel preview URL

### Viewing Test Results

1. **GitHub Actions**: Go to Actions tab → Select workflow run → View job logs
2. **Playwright Report**: Download artifact from GitHub Actions → Open `index.html`
3. **Coverage Report**: Available in CI logs or download artifact

## Debugging Failed Tests

### Local Debugging

\`\`\`bash
# Run specific test in debug mode
pnpm exec playwright test tests/e2e/auth.spec.ts --debug

# Show test report from last run
pnpm exec playwright show-report
\`\`\`

### CI Debugging

1. Check GitHub Actions logs for error messages
2. Download Playwright report artifact
3. Download screenshots/videos from test-results artifact
4. Review console errors in test output

## Best Practices

1. **Stable Selectors**: Use `data-testid` for reliable element selection
2. **Wait for Elements**: Use `waitFor` instead of arbitrary timeouts
3. **Mock External Services**: Mock Supabase and external APIs in unit tests
4. **Test User Flows**: E2E tests should cover complete user journeys
5. **Keep Tests Fast**: Unit tests should run in milliseconds, E2E in seconds

## Adding New Tests

### Adding Unit Test

1. Create test file in `tests/unit/` with `.test.tsx` or `.test.ts` extension
2. Import component or function to test
3. Write describe/it blocks with assertions
4. Run `pnpm test` to verify

### Adding E2E Test

1. Create test file in `tests/e2e/` with `.spec.ts` extension
2. Use Playwright test API
3. Add selectors and assertions
4. Run `pnpm run test:e2e` to verify

## Troubleshooting

**Tests failing locally but passing in CI**

- Ensure Playwright browsers are installed: `pnpm run playwright:install`
- Check Node.js version matches CI (v18)

**E2E tests timing out**

- Increase timeout in `playwright.config.ts`
- Check if dev server is running on correct port
- Verify no port conflicts

**Mock not working**

- Check mock is defined before component import
- Verify mock path matches actual import path
- Clear vi.clearAllMocks() between tests
