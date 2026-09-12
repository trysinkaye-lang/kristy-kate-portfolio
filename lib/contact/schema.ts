import { z } from "zod";
const singleLine = (max: number) => z.string().trim().min(2, "Please enter at least 2 characters.").max(max, `Please keep this under ${max} characters.`).regex(/^[^\r\n\u0000-\u001f]+$/, "Please use a single line of text.");
export const contactSchema = z.object({
  name: singleLine(100),
  email: z.string().trim().max(254).pipe(z.email("Please enter a valid email address.")),
  subject: singleLine(160),
  message: z.string().trim().min(20, "Please tell me a little more (at least 20 characters).").max(5000, "Please keep your message under 5,000 characters."),
  website: z.string().max(0, "Unable to submit this request.").default(""),
  submissionId: z.uuid(),
});
export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
export const MAX_BODY_BYTES = 16_384;

