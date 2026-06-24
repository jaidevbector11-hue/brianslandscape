import { NextResponse } from "next/server";
import { checkSpam, dispatchLead, isEmail, isNonEmpty } from "@/lib/leads";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const spam = await checkSpam(body);
  if (!spam.ok) {
    console.warn("[contact] rejected:", spam.reason);
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone = "", message } = body ?? {};

  if (!isNonEmpty(name) || !isEmail(email) || !isNonEmpty(message)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, a valid email, and a message." },
      { status: 422 }
    );
  }

  const summary = `${name}`;
  const businessBody = [
    "NEW CONTACT MESSAGE",
    "===================",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  await dispatchLead({ kind: "contact", summary, businessBody, customer: { name, email } });

  return NextResponse.json({ ok: true });
}
