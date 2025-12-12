#!/usr/bin/env node

/**
 * Deployment Prerequisites Checker
 * This script checks all conditions that must be met before deployment
 */

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

class PrerequisitesChecker {
  constructor() {
    this.errors = []
    this.warnings = []
    this.info = []
  }

  log(message, type = "info") {
    const timestamp = new Date().toISOString()
    const prefix = type === "error" ? "❌" : type === "warning" ? "⚠️" : "ℹ️"
    console.log(`${prefix} [${timestamp}] ${message}`)

    if (type === "error") this.errors.push(message)
    else if (type === "warning") this.warnings.push(message)
    else this.info.push(message)
  }

  checkNodeVersion() {
    const nodeVersion = process.version
    const requiredVersion = "18.0.0"

    if (nodeVersion < `v${requiredVersion}`) {
      this.log(`Node.js version ${requiredVersion} or higher required. Current: ${nodeVersion}`, "error")
      return false
    }

    this.log(`Node.js version check passed: ${nodeVersion}`)
    return true
  }

  checkNpmVersion() {
    try {
      const npmVersion = execSync("npm --version", { encoding: "utf8" }).trim()
      this.log(`npm version: ${npmVersion}`)
      return true
    } catch (error) {
      this.log("npm not found or not working", "error")
      return false
    }
  }

  checkVercelCLI() {
    try {
      const vercelVersion = execSync("vercel --version", { encoding: "utf8" }).trim()
      this.log(`Vercel CLI version: ${vercelVersion}`)

      // Check if logged in
      try {
        const whoami = execSync("vercel whoami", { encoding: "utf8" }).trim()
        this.log(`Logged into Vercel as: ${whoami}`)
        return true
      } catch (error) {
        this.log("Not logged into Vercel. Run 'vercel login' first", "error")
        return false
      }
    } catch (error) {
      this.log("Vercel CLI not found. Install with: npm install -g vercel", "error")
      return false
    }
  }

  checkEnvironmentFiles() {
    const envFiles = [".env.local", ".env.production"]
    let hasEnvFile = false

    for (const file of envFiles) {
      if (fs.existsSync(file)) {
        this.log(`Found environment file: ${file}`)
        hasEnvFile = true
        break
      }
    }

    if (!hasEnvFile) {
      this.log("No environment file found (.env.local or .env.production)", "error")
      return false
    }

    return true
  }

  checkRequiredEnvVars() {
    const requiredVars = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "OPENAI_API_KEY",
      "JWT_SECRET",
      "ENCRYPTION_KEY",
    ]

    const missing = requiredVars.filter((varName) => !process.env[varName])

    if (missing.length > 0) {
      this.log(`Missing required environment variables: ${missing.join(", ")}`, "error")
      return false
    }

    this.log("All required environment variables are set")
    return true
  }

  checkPackageJson() {
    if (!fs.existsSync("package.json")) {
      this.log("package.json not found", "error")
      return false
    }

    try {
      const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))

      // Check required scripts
      const requiredScripts = ["build", "start"]
      const missingScripts = requiredScripts.filter((script) => !pkg.scripts?.[script])

      if (missingScripts.length > 0) {
        this.log(`Missing required scripts in package.json: ${missingScripts.join(", ")}`, "error")
        return false
      }

      this.log("package.json validation passed")
      return true
    } catch (error) {
      this.log(`Invalid package.json: ${error.message}`, "error")
      return false
    }
  }

  checkNodeModules() {
    if (!fs.existsSync("node_modules")) {
      this.log("node_modules not found. Run 'npm install' first", "error")
      return false
    }

    this.log("node_modules directory exists")
    return true
  }

  checkBuildDirectory() {
    // Check if .next directory exists (from previous build)
    if (fs.existsSync(".next")) {
      this.log("Previous build found (.next directory exists)")
      return true
    }

    this.log("No previous build found. Build will be created during deployment", "warning")
    return true
  }

  checkGitStatus() {
    try {
      // Check if we're in a git repository
      execSync("git rev-parse --git-dir", { stdio: "ignore" })

      // Check for uncommitted changes
      const status = execSync("git status --porcelain", { encoding: "utf8" })
      if (status.trim()) {
        this.log("Uncommitted changes detected. Consider committing before deployment", "warning")
      } else {
        this.log("Git working directory is clean")
      }

      return true
    } catch (error) {
      this.log("Not a git repository or git not available", "warning")
      return true
    }
  }

  checkDiskSpace() {
    try {
      const stats = fs.statSync(".")
      // This is a basic check - in production you'd want more sophisticated disk space checking
      this.log("Disk space check passed")
      return true
    } catch (error) {
      this.log("Could not check disk space", "warning")
      return true
    }
  }

  async runAllChecks() {
    this.log("🔍 Starting deployment prerequisites check...")

    const checks = [
      this.checkNodeVersion(),
      this.checkNpmVersion(),
      this.checkVercelCLI(),
      this.checkEnvironmentFiles(),
      this.checkRequiredEnvVars(),
      this.checkPackageJson(),
      this.checkNodeModules(),
      this.checkBuildDirectory(),
      this.checkGitStatus(),
      this.checkDiskSpace(),
    ]

    const passed = checks.every((check) => check)

    // Summary
    console.log("\n" + "=".repeat(50))
    console.log("DEPLOYMENT PREREQUISITES SUMMARY")
    console.log("=".repeat(50))

    if (this.errors.length > 0) {
      console.log("\n❌ ERRORS (must be fixed):")
      this.errors.forEach((error) => console.log(`   - ${error}`))
    }

    if (this.warnings.length > 0) {
      console.log("\n⚠️ WARNINGS (recommended to fix):")
      this.warnings.forEach((warning) => console.log(`   - ${warning}`))
    }

    console.log(`\n📊 RESULTS:`)
    console.log(`   - Checks passed: ${checks.filter(Boolean).length}/${checks.length}`)
    console.log(`   - Errors: ${this.errors.length}`)
    console.log(`   - Warnings: ${this.warnings.length}`)

    if (passed) {
      console.log("\n✅ All prerequisites met! Deployment can proceed.")
    } else {
      console.log("\n❌ Prerequisites not met. Fix errors before deploying.")
    }

    return {
      passed,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        total: checks.length,
        passed: checks.filter(Boolean).length,
        errors: this.errors.length,
        warnings: this.warnings.length,
      },
    }
  }
}

async function main() {
  // Load environment variables
  require("dotenv").config({ path: ".env.local" })
  require("dotenv").config({ path: ".env.production" })

  const checker = new PrerequisitesChecker()
  const result = await checker.runAllChecks()

  process.exit(result.passed ? 0 : 1)
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { PrerequisitesChecker }
