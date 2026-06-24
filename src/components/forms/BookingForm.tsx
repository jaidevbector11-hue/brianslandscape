"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/services";
import { submitForm } from "@/lib/submit";
import { FormError, Honeypot, SelectField, TextArea, TextField } from "./ui";

const TIME_WINDOWS = [
  "Morning (7–9 AM)",
  "Late morning (9–11 AM)",
  "Midday (11 AM–1 PM)",
  "Early afternoon (1–3 PM)",
  "Late afternoon (3–6 PM)",
];

export default function BookingForm() {
  const router = useRouter();
  const [startedAt] = useState(() => Date.now());
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: TIME_WINDOWS[0],
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "PA",
    zip: "",
    notes: "",
    gotcha: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Sunday = closed.
  const isSunday = form.date ? new Date(form.date + "T12:00:00").getDay() === 0 : false;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.date) return setError("Please choose a preferred date.");
    if (isSunday) return setError("We're closed on Sundays — please pick Monday–Saturday.");
    setSubmitting(true);
    try {
      await submitForm("/api/book", {
        service: form.service,
        date: form.date,
        time: form.time,
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: { street: form.street, city: form.city, state: form.state, zip: form.zip },
        notes: form.notes,
        _gotcha: form.gotcha,
        _ts: startedAt,
      });
      router.push("/thank-you?type=booking");
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
        <TextField
          label="Preferred date"
          name="date"
          type="date"
          value={form.date}
          onChange={set("date")}
          required
          hint={isSunday ? undefined : "Mon–Sat. We'll confirm the exact time with you."}
          error={isSunday ? "We're closed on Sundays." : undefined}
        />
        <SelectField
          label="Preferred time window"
          name="time"
          value={form.time}
          onChange={set("time")}
          options={TIME_WINDOWS.map((t) => ({ value: t, label: t }))}
        />
      </div>

      <SelectField
        label="What do you need an estimate for?"
        name="service"
        value={form.service}
        onChange={set("service")}
        options={[
          { value: "", label: "Not sure yet / general estimate" },
          ...services.map((s) => ({ value: s.name, label: s.name })),
        ]}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" value={form.name} onChange={set("name")} required autoComplete="name" />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={set("phone")}
          required
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
        autoComplete="email"
        hint="Optional — for your confirmation email."
      />

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-1 text-sm font-semibold text-forest-900">Property address</legend>
        <div className="sm:col-span-2">
          <TextField label="Street address" name="street" value={form.street} onChange={set("street")} autoComplete="street-address" />
        </div>
        <TextField label="City / town" name="city" value={form.city} onChange={set("city")} placeholder="Bethlehem" />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="State" name="state" value={form.state} onChange={set("state")} />
          <TextField label="ZIP" name="zip" value={form.zip} onChange={set("zip")} inputMode="numeric" placeholder="18018" />
        </div>
      </fieldset>

      <TextArea
        label="Anything we should know?"
        name="notes"
        value={form.notes}
        onChange={set("notes")}
        rows={3}
        placeholder="Gate code, the best way to reach you, what you'd like done…"
      />

      <button type="submit" className="btn-accent w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Requesting…" : "Request This Estimate"}
      </button>
      <p className="text-xs text-earth-500">
        This sends a request — we'll call or text to confirm your appointment. Need it sooner? Call{" "}
        <strong>(610) 867-7414</strong>.
      </p>
    </form>
  );
}
