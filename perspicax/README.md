# Perspicax

Author-visibility marketing site. Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4.

Implemented from the Claude Design handoff bundle in `../project` (see `../README.md` and
`../chats/chat1.md` for the original design brief and iteration history).

## Design system

- **Fonts:** Playfair Display (headlines) + Inter (body/UI), via `next/font/google`.
- **Palette:** background `#0B0E1A` / surface `#12141C`, gradient `#3B82F6 → #8B5CF6`,
  accent `#EC4899` (sparing), data accent `#14B8A6`, text `#F5F5F7` / `#94A3B8`. Defined as
  CSS custom properties in `src/app/globals.css` and mapped into Tailwind's theme.
- **Motion:** scroll-triggered reveals use a single standard fade — opacity only, ease-out,
  ~200ms (`.fade-in` in `globals.css`, driven by `src/components/RevealOnScroll.tsx`). No
  slide, no bounce, no per-section animation styles.

## Pages

`/` (Hero, #how-it-works, #authors, #readers, footer CTA) · `/case-studies` · `/about` ·
`/contact` · `/faq`. Navigation (`src/lib/nav.ts`) is identical on every page.

## Contact form

`src/components/ContactForm.tsx` posts to `POST /api/contact`
(`src/app/api/contact/route.ts`), which validates the payload, rejects honeypot bot
submissions, and emails a notification via SMTP (`src/lib/mailer.ts`, using `nodemailer`).

Copy `.env.example` to `.env.local` and fill in:

```
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Works with any SMTP provider (Resend, Postmark, SES, Gmail app password, etc). Without
these set, submissions still validate and return success, but are only logged to the
server console — nothing is silently dropped in dev.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```
