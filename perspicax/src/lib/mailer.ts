import { Resend } from "resend";

export type ContactSubmission = {
  name: string;
  email: string;
  book: string;
  goal: string;
  message?: string;
};

const GOAL_LABELS: Record<string, string> = {
  reviews: "More reviews",
  discovery: "Reader discovery",
  visibility: "General visibility",
};

// resend.dev's shared test sender — swap CONTACT_FROM_EMAIL once a custom domain is verified
// in Resend (a verified domain is required before sending from anything else).
const DEFAULT_FROM = "onboarding@resend.dev";
const DEFAULT_TO = "alfredpahmen@gmail.com";

/**
 * Sends the contact-form notification email via Resend. Returns { sent: false, reason }
 * instead of throwing when the API key isn't configured, so the route can decide how to
 * respond (e.g. still log the lead) rather than 500ing in dev.
 */
export async function sendContactNotification(submission: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  if (!apiKey) {
    return { sent: false as const, reason: "resend_not_configured" as const };
  }

  const resend = new Resend(apiKey);
  const goalLabel = GOAL_LABELS[submission.goal] ?? submission.goal;

  const { error } = await resend.emails.send({
    to,
    from,
    replyTo: submission.email,
    subject: `New Perspicax inquiry — ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Book title + link: ${submission.book}`,
      `Main goal: ${goalLabel}`,
      "",
      "Message:",
      submission.message?.trim() || "(none)",
    ].join("\n"),
    html: `
      <div style="font-family: sans-serif; font-size: 14px; color: #0B0E1A;">
        <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
        <p><strong>Book title + link:</strong> ${escapeHtml(submission.book)}</p>
        <p><strong>Main goal:</strong> ${escapeHtml(goalLabel)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(submission.message?.trim() || "(none)").replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  return { sent: true as const };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
