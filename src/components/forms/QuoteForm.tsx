"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { services } from "@/lib/services";
import { submitForm } from "@/lib/submit";
import { FormError, Honeypot, SelectField, TextArea, TextField } from "./ui";

const STEPS = ["Services", "Details", "Address", "Contact", "Confirm"];
const TIMELINES = ["As soon as possible", "Within a few weeks", "Within a couple months", "Just planning / budgeting"];
const CONTACT_METHODS = ["Phone call", "Text message", "Email"];
const OTHER = "Other / not sure";

export default function QuoteForm() {
  const router = useRouter();
  const [startedAt] = useState(() => Date.now());
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [selected, setSelected] = useState<string[]>([]);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [form, setForm] = useState({
    details: "",
    timeline: TIMELINES[0],
    street: "",
    city: "",
    state: "PA",
    zip: "",
    name: "",
    phone: "",
    email: "",
    contactMethod: CONTACT_METHODS[0],
    bestTime: "",
    gotcha: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function toggleService(name: string) {
    setSelected((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  }

  function validate(current: number): string {
    switch (current) {
      case 0:
        if (selected.length === 0) return "Please select at least one service.";
        return "";
      case 1:
        if (!form.details.trim()) return "Please tell us a little about your project.";
        return "";
      case 2:
        if (!form.street.trim() || !form.city.trim() || !form.zip.trim())
          return "Please enter the property's street, city, and ZIP.";
        return "";
      case 3:
        if (!form.name.trim()) return "Please enter your name.";
        if (form.phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
        return "";
      default:
        return "";
    }
  }

  function next() {
    const msg = validate(step);
    if (msg) return setError(msg);
    setError("");
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }
  function back() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate everything up to confirm.
    for (let i = 0; i < STEPS.length - 1; i++) {
      const msg = validate(i);
      if (msg) {
        setStep(i);
        setError(msg);
        return;
      }
    }
    setSubmitting(true);
    setError("");
    try {
      await submitForm("/api/quote", {
        services: selected,
        details: form.details,
        timeline: form.timeline,
        photos: photoNames,
        address: { street: form.street, city: form.city, state: form.state, zip: form.zip },
        name: form.name,
        phone: form.phone,
        email: form.email,
        contactMethod: form.contactMethod,
        bestTime: form.bestTime,
        _gotcha: form.gotcha,
        _ts: startedAt,
      });
      router.push("/thank-you?type=quote");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={onSubmit} className="relative" noValidate>
      <Honeypot value={form.gotcha} onChange={set("gotcha")} />

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-earth-600">
          <span>
            Step {step + 1} of {STEPS.length}: <span className="text-forest-700">{STEPS[step]}</span>
          </span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-earth-100">
          <div className="h-full rounded-full bg-forest-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <ol className="mt-3 hidden justify-between text-xs text-earth-500 sm:flex">
          {STEPS.map((label, i) => (
            <li key={label} className={i <= step ? "font-semibold text-forest-700" : ""}>
              {label}
            </li>
          ))}
        </ol>
      </div>

      {error && (
        <div className="mb-5">
          <FormError message={error} />
        </div>
      )}

      {/* Step 1: services */}
      {step === 0 && (
        <fieldset className="animate-fade-in">
          <legend className="mb-3 text-sm font-semibold text-forest-900">
            Which service(s) do you need? <span className="text-earth-500">(select all that apply)</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[...services.map((s) => s.name), OTHER].map((name) => {
              const checked = selected.includes(name);
              return (
                <label
                  key={name}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    checked ? "border-forest-600 bg-forest-50" : "border-earth-200 hover:border-forest-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-forest-600"
                    checked={checked}
                    onChange={() => toggleService(name)}
                  />
                  <span className="font-medium text-earth-900">{name}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Step 2: details + photos */}
      {step === 1 && (
        <div className="animate-fade-in space-y-5">
          <TextArea
            label="Tell us about your project"
            name="details"
            value={form.details}
            onChange={set("details")}
            required
            rows={5}
            placeholder="e.g., Remove two large trees near the driveway and grind the stumps; mulch the front beds."
          />
          <SelectField
            label="Timeline"
            name="timeline"
            value={form.timeline}
            onChange={set("timeline")}
            options={TIMELINES.map((t) => ({ value: t, label: t }))}
          />
          <div>
            <label htmlFor="photos" className="mb-1.5 block text-sm font-semibold text-forest-900">
              Add photos <span className="text-earth-500">(optional)</span>
            </label>
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotoNames(Array.from(e.target.files ?? []).map((f) => f.name))}
              className="block w-full text-sm text-earth-700 file:mr-4 file:rounded-full file:border-0 file:bg-forest-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-forest-700 hover:file:bg-forest-200"
            />
            {photoNames.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-earth-600">
                {photoNames.map((n) => (
                  <li key={n}>📎 {n}</li>
                ))}
              </ul>
            )}
            <p className="mt-1 text-xs text-earth-500">
              Photos help us give an accurate estimate. You can also text them to (610) 867-7414.
            </p>
          </div>
        </div>
      )}

      {/* Step 3: address */}
      {step === 2 && (
        <div className="animate-fade-in space-y-5">
          <TextField label="Street address" name="street" value={form.street} onChange={set("street")} required autoComplete="street-address" />
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <TextField label="City / town" name="city" value={form.city} onChange={set("city")} required placeholder="Bethlehem" />
            </div>
            <TextField label="State" name="state" value={form.state} onChange={set("state")} required />
            <TextField label="ZIP" name="zip" value={form.zip} onChange={set("zip")} required inputMode="numeric" placeholder="18018" />
          </div>
          <p className="text-xs text-earth-500">We serve Bethlehem and the surrounding Lehigh Valley.</p>
        </div>
      )}

      {/* Step 4: contact */}
      {step === 3 && (
        <div className="animate-fade-in space-y-5">
          <TextField label="Your name" name="name" value={form.name} onChange={set("name")} required autoComplete="name" />
          <div className="grid gap-5 sm:grid-cols-2">
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
            <TextField
              label="Email"
              name="email"
              type="email"
              inputMode="email"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
              hint="Optional — for your confirmation."
            />
          </div>
        </div>
      )}

      {/* Step 5: confirm */}
      {step === 4 && (
        <div className="animate-fade-in space-y-5">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-forest-900">Preferred contact method</legend>
            <div className="flex flex-wrap gap-3">
              {CONTACT_METHODS.map((m) => (
                <label
                  key={m}
                  className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                    form.contactMethod === m ? "border-forest-600 bg-forest-50 text-forest-700" : "border-earth-200 text-earth-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    className="sr-only"
                    checked={form.contactMethod === m}
                    onChange={() => set("contactMethod")(m)}
                  />
                  {m}
                </label>
              ))}
            </div>
          </fieldset>
          <TextField
            label="Best time to reach you"
            name="bestTime"
            value={form.bestTime}
            onChange={set("bestTime")}
            placeholder="e.g., weekday mornings"
            hint="Optional"
          />

          <div className="rounded-xl border border-earth-200 bg-sand-100 p-4 text-sm">
            <h3 className="font-display text-base font-bold text-forest-900">Review your request</h3>
            <dl className="mt-2 grid gap-1 text-earth-800">
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 font-semibold">Services:</dt>
                <dd>{selected.join(", ") || "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 font-semibold">Timeline:</dt>
                <dd>{form.timeline}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 font-semibold">Address:</dt>
                <dd>{[form.street, form.city, form.state, form.zip].filter(Boolean).join(", ") || "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 font-semibold">Contact:</dt>
                <dd>
                  {form.name} · {form.phone}
                  {form.email ? ` · ${form.email}` : ""}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="mt-7 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-ghost">
            ← Back
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn-primary">
            Continue →
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Sending…" : "Submit Quote Request"}
          </button>
        )}
      </div>
    </form>
  );
}
