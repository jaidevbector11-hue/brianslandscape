/** Client helper to POST a form payload to an API route and normalize errors. */
export async function submitForm(endpoint: string, data: Record<string, unknown>) {
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
