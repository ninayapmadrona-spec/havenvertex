import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

/**
 * Stub endpoint for the "Let's Build Together" contact form. Validates the
 * payload shape and returns success — swap the TODO for a real email
 * provider (e.g. Resend, SendGrid) before going live in production.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  // TODO: send via a real email provider (Resend, SendGrid, etc.)
  console.log("[Haven Vertex] New enquiry:", body);

  return NextResponse.json({ ok: true });
}
