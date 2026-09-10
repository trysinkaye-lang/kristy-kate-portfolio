"use client";
import { useRef, useState, type FormEvent } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";
import type { ContactErrors } from "@/lib/contact/schema";
import styles from "./contact.module.css";
export function ContactForm({ configured }: { configured: boolean }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const started = useRef(false);
  const submissionId = useRef<string | null>(null);
  const status = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setPending(true); setResult(null); setErrors({});
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), submissionId: submissionId.current }), signal: AbortSignal.timeout(20_000) });
      const body = await response.json();
      const ok = response.ok && body.ok === true;
      setResult({ ok, message: typeof body.message === "string" ? body.message : "Messaging is unavailable. Please email me directly." });
      setErrors(body.errors ?? {});
      trackPortfolioEvent("contact_submit", { outcome: ok ? "accepted" : "error", status: response.status });
      if (ok) { form.reset(); submissionId.current = null; }
      else if (body.errors) {
        const field = Object.keys(body.errors)[0];
        const input = form.elements.namedItem(field);
        if (input instanceof HTMLElement) input.focus();
      }
    } catch {
      setResult({ ok: false, message: "I couldn’t confirm that your message was sent. Please try again or email me directly." });
      trackPortfolioEvent("contact_submit", { outcome: "network_error" });
    } finally { setPending(false); }
  }
  return <form className={styles.form} onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; trackPortfolioEvent("contact_start", { source: "form" }); } }} aria-label="Contact Kristy Kate" aria-describedby="form-note">
    <p id="form-note" className={styles.note}>{configured ? "Tell me what you’re working on. All fields are required." : "Online messaging is not connected yet. Please email me directly. You can still fill in the form, but it cannot send until the service is connected."}</p>
    <div className={styles.fieldPair}>
      <label htmlFor="name"><span id="name-label">Your name</span><input id="name" aria-labelledby="name-label" name="name" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name ? <span id="name-error" className={styles.fieldError}>{errors.name}</span> : null}</label>
      <label htmlFor="email"><span id="email-label">Email address</span><input id="email" aria-labelledby="email-label" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email ? <span id="email-error" className={styles.fieldError}>{errors.email}</span> : null}</label>
    </div>
    <label htmlFor="subject"><span id="subject-label">What’s it about?</span><input id="subject" aria-labelledby="subject-label" name="subject" required minLength={2} maxLength={160} placeholder="A website, a system, an opportunity…" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />{errors.subject ? <span id="subject-error" className={styles.fieldError}>{errors.subject}</span> : null}</label>
    <label htmlFor="message"><span id="message-label">Your message</span><textarea id="message" aria-labelledby="message-label" name="message" required minLength={20} maxLength={5000} rows={5} placeholder="A little context, what you need, and any timing you have in mind." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message ? <span id="message-error" className={styles.fieldError}>{errors.message}</span> : null}</label>
    <div className={styles.honeypot} aria-hidden="true"><label htmlFor="website">Leave this field empty<input id="website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className={styles.submitRow}><button type="submit" disabled={pending} aria-busy={pending}>{pending ? "Sending…" : "Send message"}<span aria-hidden="true">↗</span></button><p>Your details are used only<br />to respond to your inquiry.</p></div>
    <div ref={status} role="status" aria-live="polite" aria-atomic="true" className={styles.result} data-success={result?.ok}>{result?.message}</div>
    <noscript><p>JavaScript is needed to submit this form. Please email trysinkaye@gmail.com directly.</p></noscript>
  </form>;
}
