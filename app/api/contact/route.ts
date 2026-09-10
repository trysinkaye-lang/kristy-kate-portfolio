import { contactSchema, MAX_BODY_BYTES, type ContactErrors } from "@/lib/contact/schema";
import { checkContactRateLimit } from "@/lib/contact/rate-limit";
import { deliverContact } from "@/lib/contact/delivery";
import { site } from "@/data/site";
export const runtime = "nodejs";
export const maxDuration = 30;
const reply = (body: object, status = 200, headers?: Record<string, string>) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new RangeError("Body too large");
  if (!request.body) throw new SyntaxError("Missing body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError("Body too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let sameOrigin = false;
    try {
      const source = new URL(origin);
      // Next's internal request URL may use localhost behind its HTTP listener.
      // Host is the actual browser destination, unlike arbitrary forwarded headers.
      sameOrigin = ["http:", "https:"].includes(source.protocol) && source.host === (request.headers.get("host") || new URL(request.url).host);
    } catch { /* Malformed and opaque origins are rejected. */ }
    if (!sameOrigin) return reply({ ok: false, message: "Please submit this form from the portfolio website." }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply({ ok: false, message: "Expected a JSON request." }, 415);
  let raw: unknown;
  try { raw = await readBody(request); } catch (error) { return reply({ ok: false, message: error instanceof RangeError ? "This message is too large." : "The form could not be read. Please try again." }, error instanceof RangeError ? 413 : 400); }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "subject" || field === "message") errors[field] ??= issue.message;
    }
    return reply({ ok: false, message: Object.keys(errors).length ? "Please check the highlighted fields." : "Unable to submit this request.", errors }, 400);
  }
  try {
    const limit = await checkContactRateLimit(request);
    if (!limit.allowed) return reply({ ok: false, message: "Too many attempts. Please wait a few minutes, or email me directly." }, 429, { "Retry-After": String(limit.retryAfter) });
  } catch { return reply({ ok: false, message: "Messaging is temporarily unavailable. Please email me directly." }, 503); }
  const delivery = await deliverContact(parsed.data, { apiKey: process.env.RESEND_API_KEY, from: process.env.CONTACT_FROM_EMAIL, to: process.env.CONTACT_TO_EMAIL || site.email });
  if (!delivery.ok) return reply({ ok: false, message: delivery.reason === "unconfigured" ? "Online messaging is not connected yet. Please email trysinkaye@gmail.com directly; your message has not been sent." : "The email service could not confirm delivery. Your message is still here. Please retry or email me directly." }, delivery.reason === "unconfigured" ? 503 : 502);
  return reply({ ok: true, message: "Your message has been accepted for delivery. Thank you for getting in touch." });
}

