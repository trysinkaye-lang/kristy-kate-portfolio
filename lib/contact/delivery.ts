import type { ContactInput } from "./schema";
export type DeliveryConfig = { apiKey?: string; from?: string; to: string };
export async function deliverContact(input: ContactInput, config: DeliveryConfig, providerFetch: typeof fetch = fetch) {
  if (!config.apiKey || !config.from) return { ok: false as const, reason: "unconfigured" as const };
  try {
    const response = await providerFetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${input.submissionId}` },
      body: JSON.stringify({ from: config.from, to: [config.to], reply_to: input.email, subject: `Portfolio inquiry: ${input.subject}`, text: `From: ${input.name}\nReply to: ${input.email}\n\n${input.message}` }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false as const, reason: "provider" as const };
    const body = await response.json();
    if (typeof body.id !== "string" || !body.id) return { ok: false as const, reason: "provider" as const };
    return { ok: true as const };
  } catch { return { ok: false as const, reason: "provider" as const }; }
}

