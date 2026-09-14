import nodemailer from "nodemailer";

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

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/**
 * Sends the contact-form notification email. Returns { sent: false, reason }
 * instead of throwing when SMTP isn't configured, so the route can decide
 * how to respond (e.g. still log the lead) rather than 500ing in dev.
 */
export async function sendContactNotification(submission: ContactSubmission) {
  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

  if (!transport || !to || !from) {
    return { sent: false as const, reason: "smtp_not_configured" as const };
  }

  const goalLabel = GOAL_LABELS[submission.goal] ?? submission.goal;

  await transport.sendMail({
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
