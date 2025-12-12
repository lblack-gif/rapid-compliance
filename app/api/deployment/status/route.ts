import { type NextRequest, NextResponse } from "next/server"

// Mock prerequisites checker since we can't import Node.js modules in edge runtime
interface PrerequisitesResult {
  passed: boolean
  errors: string[]
  warnings: string[]
  summary: {
    total: number
    passed: number
    errors: number
    warnings: number
  }
}

function checkPrerequisites(): PrerequisitesResult {
  const errors: string[] = []
  const warnings: string[] = []
  let passed = 0
  const total = 10

  // Check environment variables
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "OPENAI_API_KEY",
    "JWT_SECRET",
    "ENCRYPTION_KEY",
  ]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    errors.push(`Missing required environment variables: ${missingVars.join(", ")}`)
  } else {
    passed += 4 // Environment checks
  }

  // Check Supabase URL format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl && !supabaseUrl.startsWith("https://") && !supabaseUrl.includes(".supabase.co")) {
    errors.push("Invalid Supabase URL format")
  } else if (supabaseUrl) {
    passed += 1
  }

  // Check JWT secret length
  const jwtSecret = process.env.JWT_SECRET
  if (jwtSecret && jwtSecret.length < 32) {
    errors.push("JWT_SECRET must be at least 32 characters long")
  } else if (jwtSecret) {
    passed += 1
  }

  // Check encryption key length
  const encryptionKey = process.env.ENCRYPTION_KEY
  if (encryptionKey && encryptionKey.length < 32) {
    errors.push("ENCRYPTION_KEY must be at least 32 characters long")
  } else if (encryptionKey) {
    passed += 1
  }

  // Mock other checks
  passed += 3 // Assume Node.js, npm, and package.json are OK

  // Add warnings for missing optional configs
  if (!process.env.SMTP_HOST) {
    warnings.push("SMTP configuration missing - email notifications will not work")
  }

  if (!process.env.TWILIO_ACCOUNT_SID) {
    warnings.push("Twilio configuration missing - SMS notifications will not work")
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    summary: {
      total,
      passed,
      errors: errors.length,
      warnings: warnings.length,
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const result = checkPrerequisites()

    return NextResponse.json({
      success: true,
      canDeploy: result.passed,
      prerequisites: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to check deployment status:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to check deployment prerequisites",
        canDeploy: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (action === "check-prerequisites") {
      const result = checkPrerequisites()

      return NextResponse.json({
        success: true,
        result,
        canDeploy: result.passed,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Deployment status check failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
