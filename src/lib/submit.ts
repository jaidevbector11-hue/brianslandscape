/** Client helper to POST a form payload to an API route and normalize errors. */
export async function submitForm(endpoint: string, data: Record<string, unknown>) {
  // On the static preview build (GitHub Pages) there is no server to receive
  // submissions, so forms are display-only — point people to the phone instead.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    throw new Error(
      "This preview site can't send messages online yet. Please call or text us at (610) 867-7414 — we'd love to help with your project!"
    );
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || json.ok === false) {
    throw new Error(json.error || "Something went wrong. Please call us at (610) 867-7414.");
  }
  return json;
}
