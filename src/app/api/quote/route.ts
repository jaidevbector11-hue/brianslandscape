import { NextResponse } from "next/server";
import { checkSpam, dispatchLead, isNonEmpty, isPhone } from "@/lib/leads";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const spam = await checkSpam(body);
  if (!spam.ok) {
    // Pretend success to bots; log for visibility.
    console.warn("[quote] rejected:", spam.reason);
    return NextResponse.json({ ok: true });
  }

  const {
    services = [],
    details = "",
    timeline = "",
    photos = [],
    address = {},
    name,
    phone,
    email,
    contactMethod = "Phone",
    bestTime = "",
  } = body ?? {};

  if (!isNonEmpty(name) || !isPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and a valid phone number." },
      { status: 422 }
    );
  }
  if (!Array.isArray(services) || services.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Please select at least one service." },
      { status: 422 }
    );
  }

  const summary = `${services.join(", ")} for ${name}`;
  const businessBody = [
    "NEW FREE QUOTE REQUEST",
    "========================",
    `Name:            ${name}`,
    `Phone:           ${phone}`,
    `Email:           ${email || "—"}`,
    `Preferred contact: ${contactMethod}${bestTime ? ` (${bestTime})` : ""}`,
    "",
    `Service(s):      ${services.join(", ")}`,
    `Timeline:        ${timeline || "—"}`,
    "",
    "Property address:",
    `  ${address.street || "—"}`,
    `  ${[address.city, address.state, address.zip].filter(Boolean).join(", ") || "—"}`,
    "",
    "Project details:",
    details || "  —",
    "",
    `Photos noted:    ${Array.isArray(photos) && photos.length ? photos.join(", ") : "none"}`,
  ].join("\n");

  await dispatchLead({ kind: "quote", summary, businessBody, customer: { name, email } });

  return NextResponse.json({ ok: true });
}
