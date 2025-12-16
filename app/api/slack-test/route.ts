import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  const webhook = process.env.SLACK_WEBHOOK_URL
  if (!webhook) {
    console.error("[slack-test] missing SLACK_WEBHOOK_URL")
    return NextResponse.json({ ok: false, error: "missing SLACK_WEBHOOK_URL" }, { status: 500 })
  }

  const payload = { text: `Rapid Compliance Slack test ok. ${new Date().toISOString()}` }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })

    const txt = await res.text().catch(() => "")
    console.log(`[slack-test] status=${res.status} body=${txt.slice(0, 200)}`)

    return NextResponse.json({ ok: res.ok, status: res.status })
  } catch (e) {
    console.error("[slack-test] failed", (e && e.message) ? e.message : e)
    return NextResponse.json({ ok: false, error: (e && e.message) ? e.message : "failed" }, { status: 500 })
  }
}
