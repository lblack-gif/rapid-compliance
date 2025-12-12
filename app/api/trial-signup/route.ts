import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "jobTitle", "company", "currentChallenges"]
    for (const field of requiredFields) {
      if (!formData[field] || !formData[field].trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    if (!formData.email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Log the comprehensive signup data
    console.log("=== NEW TRIAL SIGNUP ===")
    console.log("Name:", `${formData.firstName} ${formData.lastName}`)
    console.log("Email:", formData.email)
    console.log("Phone:", formData.phone || "Not provided")
    console.log("Job Title:", formData.jobTitle)
    console.log("Company:", formData.company)
    console.log("Company Size:", formData.companySize || "Not specified")
    console.log("Industry:", formData.industry || "Not specified")
    console.log("Current Challenges:", formData.currentChallenges)
    console.log("Timeline:", formData.timeline || "Not specified")
    console.log("Budget Range:", formData.budgetRange || "Not specified")
    console.log("Specific Needs:", formData.specificNeeds || "Not specified")
    console.log("How They Heard:", formData.howDidYouHear || "Not specified")
    console.log("Preferred Contact:", formData.preferredContactMethod)
    console.log("Timestamp:", new Date().toISOString())
    console.log("========================")

    // In a real application, you would:
    // 1. Save to database
    // 2. Send notification email to admin
    // 3. Send welcome email to prospect
    // 4. Create trial account
    // 5. Integrate with CRM

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Send notification email (simulated)
    try {
      await sendNotificationEmail(formData)
      await sendWelcomeEmail(formData)
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Trial signup successful",
      data: {
        email: formData.email,
        company: formData.company,
        trialId: `trial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
    })
  } catch (error) {
    console.error("Trial signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function sendNotificationEmail(formData: any) {
  // This would integrate with your email service (SendGrid, Resend, etc.)
  console.log("📧 ADMIN NOTIFICATION EMAIL:")
  console.log("To: admin@rapidcompliance.com")
  console.log("Subject: 🚀 New Trial Signup - " + formData.company)
  console.log("Body:")
  console.log(`
New trial signup from ${formData.firstName} ${formData.lastName}

Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Job Title: ${formData.jobTitle}
Company Size: ${formData.companySize || "Not specified"}
Industry: ${formData.industry || "Not specified"}

Current Challenges:
${formData.currentChallenges}

Timeline: ${formData.timeline || "Not specified"}
Budget: ${formData.budgetRange || "Not specified"}
Specific Needs: ${formData.specificNeeds || "Not specified"}
How They Heard: ${formData.howDidYouHear || "Not specified"}
Preferred Contact: ${formData.preferredContactMethod}

Signed up at: ${new Date().toLocaleString()}
  `)
}

async function sendWelcomeEmail(formData: any) {
  // This would send a welcome email to the prospect
  console.log("📧 WELCOME EMAIL:")
  console.log("To:", formData.email)
  console.log("Subject: Welcome to Rapid Compliance - Your 14-Day Trial is Active!")
  console.log("Body:")
  console.log(`
Hi ${formData.firstName},

Welcome to Rapid Compliance! Your 14-day free trial is now active.

Login Credentials:
Email: ${formData.email}
Password: password123 (please change after first login)

Dashboard: https://rapidcompliance.com/dashboard

Our team will reach out within 24 hours to help you get started and answer any questions about your specific needs around Section 3 compliance.

Best regards,
The Rapid Compliance Team
  `)
}
