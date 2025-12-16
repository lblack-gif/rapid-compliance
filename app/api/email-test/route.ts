import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  const to = process.env.OWNER_NOTIFY_EMAIL

  if (!apiKey) return NextResponse.json({ ok: false, error: "missing RESEND_API_KEY" }, { status: 500 })
  if (!from) return NextResponse.json({ ok: false, error: "missing EMAIL_FROM" }, { status: 500 })
  if (!to) return NextResponse.json({ ok: false, error: "missing OWNER_NOTIFY_EMAIL" }, { status: 500 })

  const resend = new Resend(apiKey)

  try {
    const r = await resend.emails.send({
      from,
      to: [to],
      subject: "Rapid Compliance email test",
      text: `Email test ok at ${new Date().toISOString()}`,
    })
    return NextResponse.json({ ok: true, id: r?.data?.id ?? null })
  } catch (e) {
    const msg = (e && (e as any).message) ? (e as any).message : String(e)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
