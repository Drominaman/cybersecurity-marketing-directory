/**
 * Lead/submission notifications via Resend.
 *
 * Used by every public-facing form route (submit-review, submit-provider,
 * claim-profile, contact, email-capture). Each call is best-effort — failure
 * to email never blocks the form response.
 */

import { Resend } from "resend";

const DEFAULT_RECIPIENT = "robbie@contentvisit.com";
const DEFAULT_SENDER = "Cybersecurity Marketing Agencies <onboarding@resend.dev>";

let cachedResend: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!cachedResend) cachedResend = new Resend(apiKey);
  return cachedResend;
}

export interface NotifyPayload {
  /** Short subject prefix, e.g. "New review", "Provider claim" */
  kind: string;
  /** Email associated with the submission (used as Reply-To) */
  fromEmail?: string;
  /** Subject suffix — typically the email or company name */
  subjectDetail?: string;
  /** Key/value pairs rendered in the email body */
  fields: Record<string, string | number | null | undefined>;
  /** Optional context line shown above the fields */
  intro?: string;
}

/**
 * Best-effort email notification for any form submission. Returns silently
 * if Resend isn't configured or send fails — the caller should already have
 * persisted the submission (or logged its failure).
 */
export async function notifySubmission(payload: NotifyPayload): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const recipient = process.env.LEAD_NOTIFICATION_TO || DEFAULT_RECIPIENT;
  const from = process.env.RESEND_FROM || DEFAULT_SENDER;

  const lines: string[] = [];
  if (payload.intro) {
    lines.push(payload.intro);
    lines.push("");
  }
  for (const [key, value] of Object.entries(payload.fields)) {
    if (value === undefined || value === null || value === "") continue;
    lines.push(`${key}: ${value}`);
  }
  lines.push("");
  lines.push(`Time: ${new Date().toISOString()}`);

  const subject = `${payload.kind}${payload.subjectDetail ? `: ${payload.subjectDetail}` : ""}`;

  try {
    await resend.emails.send({
      from,
      to: recipient,
      replyTo: payload.fromEmail,
      subject,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "NOTIFY_EMAIL_FAILED",
        kind: payload.kind,
        subject,
        timestamp: new Date().toISOString(),
        error: String(err),
      })
    );
  }
}
