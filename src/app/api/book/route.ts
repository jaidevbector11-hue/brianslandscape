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
    console.warn("[book] rejected:", spam.reason);
    return NextResponse.json({ ok: true });
  }

  const { service = "", date, time, name, phone, email, address = {}, notes = "" } = body ?? {};

  if (!isNonEmpty(name) || !isPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and a valid phone number." },
      { status: 422 }
    );
  }
  if (!isNonEmpty(date) || !isNonEmpty(time)) {
    return NextResponse.json(
      { ok: false, error: "Please choose a date and time for your estimate." },
      { status: 422 }
    );
  }

  const summary = `${date} at ${time} — ${name}`;
  const businessBody = [
    "NEW ON-SITE ESTIMATE BOOKING REQUEST",
    "====================================",
    `Requested date:  ${date}`,
    `Requested time:  ${time}`,
    "",
    `Name:            ${name}`,
    `Phone:           ${phone}`,
    `Email:           ${email || "—"}`,
    `Service:         ${service || "General estimate"}`,
    "",
    "Property address:",
    `  ${address.street || "—"}`,
    `  ${[address.city, address.state, address.zip].filter(Boolean).join(", ") || "—"}`,
    "",
    "Notes:",
    notes || "  —",
    "",
    "ACTION: Confirm this time with the customer (or propose an alternative).",
  ].join("\n");

  await dispatchLead({ kind: "booking", summary, businessBody, customer: { name, email } });

  return NextResponse.json({ ok: true });
}
