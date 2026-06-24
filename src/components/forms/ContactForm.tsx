"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitForm } from "@/lib/submit";
import { FormError, Honeypot, TextArea, TextField } from "./ui";

export default function ContactForm() {
  const router = useRouter();
  const [startedAt] = useState(() => Date.now());
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", gotcha: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitForm("/api/contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        _gotcha: form.gotcha,
        _ts: startedAt,
      });
      router.push("/thank-you?type=contact");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      <Honeypot value={form.gotcha} onChange={set("gotcha")} />
      {error && <FormError message={error} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" value={form.name} onChange={set("name")} required autoComplete="name" />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={set("phone")}
          autoComplete="tel"
          placeholder="(610) 555-0123"
        />
      </div>
      <TextField
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        value={form.email}
        onChange={set("email")}
        required
        autoComplete="email"
      />
      <TextArea
        label="How can we help?"
        name="message"
        value={form.message}
        onChange={set("message")}
        required
        rows={5}
        placeholder="Tell us about your project, property, or question…"
      />
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-earth-500">
        Prefer to talk? Call or text us at <strong>(610) 867-7414</strong>. We never share your info.
      </p>
    </form>
  );
}
