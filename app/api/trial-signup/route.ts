import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function reqString(v: unknown, name: string) {
  if (typeof v !== "string" || v.trim().length === 0) {
    throw new Error(`${name} is required`)
  }
  return v.trim()
}

function optString(v: unknown) {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Only require name + email
    const firstName = optString(formData.firstName)
    const lastName = optString(formData.lastName)

    const full_name =
      optString(formData.full_name) ??
      optString(formData.fullName) ??
      [firstName, lastName].filter(Boolean).join(" ").trim()

    const email = reqString(formData.email, "email")

    if (!full_name || full_name.length === 0) {
      return NextResponse.json({ error: "full_name is required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Map form fields -> actual Supabase columns
    const phone = optString(formData.phone)
    const job_title = optString(formData.jobTitle) ?? optString(formData.job_title)
    const company = optString(formData.company)
    const company_size = optString(formData.companySize) ?? optString(formData.company_size)
    const industry = optString(formData.industry)
    const challenges = optString(formData.currentChallenges) ?? optString(formData.challenges)
    const timeline = optString(formData.timeline)
    const budget = optString(formData.budgetRange) ?? optString(formData.budget)
    const needs = optString(formData.specificNeeds) ?? optString(formData.needs)
    const source = optString(formData.source)
    const contact_method =
      optString(formData.preferredContactMethod) ?? optString(formData.contact_method)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    
    const slackWebhook = process.env.SLACK_WEBHOOK_URL
console.log("[trial-signup] slackWebhook present =", Boolean(slackWebhook))
if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Server missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    })

    const payload: Record<string, any> = {
      full_name,
      email,
      phone,
      job_title,
      company,
      company_size,
      industry,
      challenges,
      timeline,
      budget,
      needs,
      source,
      contact_method,
    }

    const { data, error } = await supabase
      .from("trial_signups")
      .insert(payload)
      .select("id, created_at")
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
    if (slackWebhook) {
      try {
        await sendSlackNotification(slackWebhook, "Trial signup FAILED (Supabase): " + error.message)
      } catch (e) {
        console.error("[trial-signup] Slack notify failed:", e)
      }
    }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    // New trial signup sent to Slack (non-blocking)
    if (slackWebhook) {
      console.log("[trial-signup] about to send Slack message")
      const msg =
        "New trial signup: " +
        (full_name || ((first_name + " " + last_name).trim())) +
        " | " + email +
        " | " + (company || "n/a") +
        " | source=" + (source || "n/a")

      try {
        await sendSlackNotification(slackWebhook, msg)
      } catch (e) {
        console.error("[trial-signup] Slack notify failed:", e)
      }
    }


    return NextResponse.json({
      success: true,
      id: data.id,
      created_at: data.created_at,
    })
  } catch (e: any) {
    console.error("Trial signup error:", e)
    return NextResponse.json({ error: e?.message ?? "Internal server error" }, { status: 400 })
  }
}

async function sendSlackNotification(webhookUrl: string, text: string) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  const body = await res.text().catch(() => "")
  console.log("[trial-signup] Slack response:", res.status, body || "(no body)")

  if (!res.ok) {
    throw new Error("Slack webhook failed: " + res.status + " " + body)
  }
}


