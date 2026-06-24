import type { ReactNode } from "react";

const baseInput =
  "w-full rounded-xl border border-earth-300 bg-white px-4 py-3 text-earth-950 placeholder:text-earth-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/40";

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-forest-900">
        {label}
        {required && <span className="ml-0.5 text-earth-500" aria-hidden> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-earth-500">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
  hint,
  error,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <Field label={label} htmlFor={name} required={required} hint={hint} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={baseInput}
      />
    </Field>
  );
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
  hint,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  hint?: string;
  error?: string;
}) {
  return (
    <Field label={label} htmlFor={name} required={required} hint={hint} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={baseInput}
      />
    </Field>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
  hint,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  hint?: string;
  error?: string;
}) {
  return (
    <Field label={label} htmlFor={name} required={required} hint={hint} error={error}>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={baseInput}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** Honeypot — hidden from humans, tempting to bots. Keep it empty. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="company-website">Company website (leave blank)</label>
      <input
        id="company-website"
        name="_gotcha"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
      {message}
    </div>
  );
}
