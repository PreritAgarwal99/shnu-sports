import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  contact?: string;
  message?: string;
  product?: string;
  company?: string; // honeypot
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name || "").trim();
  const contact = (body.contact || "").trim();
  const message = (body.message || "").trim();

  if (!name || !contact || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, contact and message." },
      { status: 400 },
    );
  }

  const subject = `New enquiry from ${name}${body.product ? ` · ${body.product}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Contact: ${contact}`,
    body.product ? `Product: ${body.product}` : null,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL || "onboarding@resend.dev";

  // No email provider configured yet — log it so nothing is lost in dev.
  if (!apiKey || !to) {
    console.info("[enquiry] (email not configured) %s\n%s", subject, text);
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: contact.includes("@") ? contact : undefined,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please WhatsApp or call us." },
      { status: 502 },
    );
  }
}
