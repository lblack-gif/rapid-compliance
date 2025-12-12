import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "fullName",
      "workEmail",
      "organization",
      "role",
      "phone",
      "contractVolume",
      "estimatedUsers",
      "primaryUseCase",
    ]

    for (const field of requiredFields) {
      if (!body[field] || !body[field].toString().trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    if (!body.consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.workEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Save to database/leads store
    // 2. Send confirmation email to user
    // 3. Send notification to admin team
    // 4. Integrate with CRM system

    // For now, we'll simulate the process
    console.log("Trial signup received:", {
      email: body.workEmail,
      organization: body.organization,
      timestamp: body.timestamp,
      source: body.source,
    })

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Trial request submitted successfully",
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    })
  } catch (error) {
    console.error("Trial signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
