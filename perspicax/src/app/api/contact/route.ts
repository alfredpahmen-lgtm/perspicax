import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/mailer";

const GOALS = new Set(["reviews", "discovery", "visibility"]);
const MAX_LEN = { name: 200, email: 320, book: 500, message: 4000 };

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Silently accept so bots don't learn.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const book = typeof body.book === "string" ? body.book.trim() : "";
  const goal = typeof body.goal === "string" ? body.goal.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_LEN.name) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !isEmail(email) || email.length > MAX_LEN.email) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!book || book.length > MAX_LEN.book) {
    return NextResponse.json(
      { ok: false, error: "Please share your book title and a link." },
      { status: 400 },
    );
  }
  if (!GOALS.has(goal)) {
    return NextResponse.json({ ok: false, error: "Please choose a goal." }, { status: 400 });
  }
  if (message.length > MAX_LEN.message) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  try {
    const result = await sendContactNotification({ name, email, book, goal, message });
    if (!result.sent) {
      // Resend isn't configured yet — log so the lead isn't silently lost, and still tell
      // the visitor it went through once an operator sets RESEND_API_KEY.
      console.warn(
        "[contact] Resend not configured — submission logged instead of emailed:",
        { name, email, book, goal, message },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to send notification email:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }
}
