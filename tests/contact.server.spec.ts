import { test, expect } from "@playwright/test";
import { contactSchema } from "../lib/contact/schema";
import { createMemoryLimiter } from "../lib/contact/rate-limit";
import { deliverContact } from "../lib/contact/delivery";
const valid = { name: "Test Person", email: "test@example.com", subject: "A project inquiry", message: "A meaningful project inquiry for a local automated test.", website: "", submissionId: "0cc7f8b0-7f97-4fd2-bcd0-3e3252143695" };
test("validation rejects malformed, oversized, injection, and honeypot input", () => {
  expect(contactSchema.safeParse(valid).success).toBe(true);
  for (const change of [{ name: " " }, { email: "not-an-email" }, { subject: "hello\r\nBcc: test@example.com" }, { message: "short" }, { message: "x".repeat(5001) }, { website: "spam.example" }, { submissionId: "bad" }]) expect(contactSchema.safeParse({ ...valid, ...change }).success).toBe(false);
});
test("rate limit isolates keys, rejects repeated attempts, and expires", () => {
  const check = createMemoryLimiter(2, 1000);
  expect(check("a", 100).allowed).toBe(true);
  expect(check("a", 200).allowed).toBe(true);
  expect(check("a", 300).allowed).toBe(false);
  expect(check("b", 300).allowed).toBe(true);
  expect(check("a", 1100).allowed).toBe(true);
});
test("missing credentials never call an email provider", async () => {
  let called = false;
  const result = await deliverContact(valid, { to: "owner@example.com" }, async () => { called = true; return Response.json({ id: "mock" }); });
  expect(result).toEqual({ ok: false, reason: "unconfigured" });
  expect(called).toBe(false);
});
test("provider adapter keeps sender fixed, sets reply-to, and requires confirmation", async () => {
  let payload: Record<string, unknown> = {};
  let key = "";
  const result = await deliverContact(valid, { apiKey: "test-key", from: "portfolio@example.com", to: "owner@example.com" }, async (_url, options) => {
    payload = JSON.parse(options!.body as string);
    key = new Headers(options!.headers).get("Idempotency-Key")!;
    return Response.json({ id: "provider-confirmed-id" });
  });
  expect(result.ok).toBe(true);
  expect(payload.from).toBe("portfolio@example.com");
  expect(payload.to).toEqual(["owner@example.com"]);
  expect(payload.reply_to).toBe("test@example.com");
  expect(payload.html).toBeUndefined();
  expect(key).toContain(valid.submissionId);
  for (const response of [Response.json({ error: "failed" }, { status: 500 }), Response.json({})]) {
    expect((await deliverContact(valid, { apiKey: "test-key", from: "portfolio@example.com", to: "owner@example.com" }, async () => response)).ok).toBe(false);
  }
  expect((await deliverContact(valid, { apiKey: "test-key", from: "portfolio@example.com", to: "owner@example.com" }, async () => { throw new Error("Timeout"); })).ok).toBe(false);
});
test("API rejects cross-origin, malformed, oversized, and invalid requests", async ({ request }) => {
  expect((await request.post("/api/contact", { headers: { Origin: "https://unrelated.example" }, data: valid })).status()).toBe(403);
  expect((await request.post("/api/contact", { headers: { "Content-Type": "text/plain" }, data: "hello" })).status()).toBe(415);
  expect((await request.post("/api/contact", { headers: { "Content-Type": "application/json" }, data: "{broken" })).status()).toBe(400);
  expect((await request.post("/api/contact", { data: { ...valid, message: "x".repeat(20_000) } })).status()).toBe(413);
  expect((await request.post("/api/contact", { data: { ...valid, website: "spam" } })).status()).toBe(400);
  const invalid = await request.post("/api/contact", { data: { ...valid, email: "not an email" } });
  expect(invalid.status()).toBe(400);
  expect((await invalid.json()).errors.email).toBeTruthy();
});

