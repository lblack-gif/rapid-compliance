import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a helpful Section 3 compliance assistant for Rapid Compliance platform. You help users with:

1. Section 3 compliance requirements and regulations
2. Worker management and certification tracking
3. Contractor oversight and action plans
4. HUD reporting requirements
5. Platform features and functionality
6. General compliance questions

Key platform features:
- AI-powered email triage and response generation
- Comprehensive worker database with certification tracking
- Contractor performance monitoring and compliance scoring
- Automated reporting for HUD requirements
- Real-time compliance alerts and notifications
- Integration with payroll systems and HUD databases
- Geographic mapping and analytics
- Mobile interface for field workers

Always be helpful, accurate, and provide actionable guidance. If asked about features not available in the platform, politely explain what is available instead.`,
      prompt: message,
      maxTokens: 500,
    })

    return NextResponse.json({
      response: text,
      quickActions: [
        { label: "Check Compliance Status", action: "compliance_check" },
        { label: "View Worker Database", action: "view_workers" },
        { label: "Generate Report", action: "generate_report" },
        { label: "Contact Support", action: "contact_support" },
      ],
    })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
