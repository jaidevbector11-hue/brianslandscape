/**
 * Server-side lead handling: spam protection + notification dispatch.
 *
 * Notifications are sent via Resend (https://resend.com) using a plain fetch
 * call — no extra dependency. If RESEND_API_KEY is not configured, submissions
 * are still validated and logged to the server console so no lead is lost.
 * Optional SMS alerts via Twilio when those env vars are present.
 *
 * This is the single integration point to wire up Google Calendar, a CRM, or
 * any other backend for the booking/quote flows.
 */
import "server-only";
import { business, fullAddress } from "./business";

/** Minimum seconds a human takes to fill a form (timing-based bot check). */
export const SPAM_MIN_SECONDS = 3;

export type SpamFields = {
  /** Honeypot — must stay empty. */
  _gotcha?: string;
  /** Epoch ms when the form was rendered. */
  _ts?: number;
  /** Optional reCAPTCHA v3 token. */
  _captcha?: string;
};

export type SpamResult = { ok: true } | { ok: false; reason: string };

export async function checkSpam(fields: SpamFields): Promise<SpamResult> {
  // 1. Honeypot
  if (fields._gotcha && fields._gotcha.trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }
  // 2. Timing
  if (typeof fields._ts === "number" && Number.isFinite(fields._ts)) {
    const elapsed = (Date.now() - fields._ts) / 1000;
    if (elapsed < SPAM_MIN_SECONDS) {
      return { ok: false, reason: "too-fast" };
    }
  }
  // 3. reCAPTCHA (only enforced when configured)
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (secret) {
    const ok = await verifyRecaptcha(fields._captcha, secret);
    if (!ok) return { ok: false, reason: "captcha" };
  }
  return { ok: true };
}

async function verifyRecaptcha(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    return Boolean(data.success) && (data.score === undefined || data.score >= 0.5);
  } catch (err) {
    console.error("[leads] reCAPTCHA verification failed:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Notification dispatch
// ---------------------------------------------------------------------------

type EmailArgs = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

async function sendEmail({ to, subject, text, replyTo }: EmailArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || `Brian's Landscaping <onboarding@resend.dev>`;
  if (!apiKey) {
    // No provider configured — log so the lead is never lost in dev.
    console.info(`[leads] (email not sent — RESEND_API_KEY unset)\nTo: ${to}\nSubject: ${subject}\n${text}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
    });
    if (!res.ok) {
      console.error("[leads] Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[leads] Email send failed:", err);
    return false;
  }
}

async function sendSms(text: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.TWILIO_TO_NUMBER;
  if (!sid || !token || !from || !to) return;
  try {
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: text.slice(0, 1500) }),
    });
  } catch (err) {
    console.error("[leads] SMS send failed:", err);
  }
}

export type LeadKind = "quote" | "booking" | "contact";

export type DispatchArgs = {
  kind: LeadKind;
  /** Short summary used in the SMS + email subject. */
  summary: string;
  /** Full plaintext body for the business notification. */
  businessBody: string;
  /** Customer details for the confirmation email. */
  customer: { name: string; email?: string };
};

/**
 * Sends the business a lead notification (+SMS) and the customer a confirmation.
 * Never throws — failures are logged so the user still gets a success response.
 */
export async function dispatchLead({ kind, summary, businessBody, customer }: DispatchArgs) {
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || business.email;
  const labels: Record<LeadKind, string> = {
    quote: "Free Quote Request",
    booking: "Estimate Booking Request",
    contact: "Contact Message",
  };
  const label = labels[kind];

  await Promise.all([
    sendEmail({
      to: notifyTo,
      subject: `New ${label}: ${summary}`,
      text: businessBody,
      replyTo: customer.email,
    }),
    sendSms(`New ${label} — ${summary}. Check email for details.`),
  ]);

  if (customer.email) {
    await sendEmail({
      to: customer.email,
      subject: `We received your ${label.toLowerCase()} — ${business.name}`,
      text: customerConfirmation(kind, customer.name),
    });
  }
}

function customerConfirmation(kind: LeadKind, name: string): string {
  const intro =
    kind === "booking"
      ? "Thanks for requesting an on-site estimate with Brian's Landscaping!"
      : kind === "quote"
        ? "Thanks for requesting a free quote from Brian's Landscaping!"
        : "Thanks for reaching out to Brian's Landscaping!";
  return [
    `Hi ${name || "there"},`,
    "",
    intro,
    "",
    "We've received your request and will get back to you shortly to confirm the details. If you need us sooner, just give us a call or text.",
    "",
    `Phone: ${business.phone.display}`,
    `Address: ${fullAddress}`,
    "Hours: Mon–Fri 7am–6pm, Sat 8am–4pm, Sun closed",
    "",
    "We appreciate your business and look forward to helping with your project.",
    "",
    "— Brian's Landscaping",
  ].join("\n");
}

// --- small shared validators ----------------------------------------------

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
export function isNonEmpty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}
export function isPhone(v: unknown): v is string {
  return typeof v === "string" && v.replace(/\D/g, "").length >= 10;
}
