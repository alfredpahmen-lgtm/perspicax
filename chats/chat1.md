# Perspicax Hero Section Design

_Started 2026-09-14 16:46 UTC_

---

## User

Design a hero section for Perspicax, a literary author-visibility brand that connects books with real, engaged readers. Base the design system on Nocturne (dark theme), customized with the following exact palette:

Background: 
#0B0E1A (near-black navy), with 
#12141C (dark slate) as a secondary surface tone
Primary gradient: 
#3B82F6 (electric blue) → 
#8B5CF6 (violet)
Accent (CTA/highlights only): 
#EC4899 (magenta) — used sparingly
Data/proof accent: 
#14B8A6 (teal) — reserved for stats/numbers
Text primary: 
#F5F5F7 (off-white)
Text secondary: 
#94A3B8 (blue-gray)

Typography: Headline font is Playfair Display (serif, literary, quote-weight) — large, elegant, restrained. Body and UI text is Inter — clean, neutral, secondary to the headline. The headline should feel like a standalone quote someone would screenshot, not marketing copy.

Hero content:

Headline (Playfair Display, large): "A book unread is still a whisper."
No subheadline copy yet — leave space for one, kept minimal
Primary CTA button: pill-shaped (fully rounded), gradient fill (blue → violet)
Secondary CTA: pill-shaped, outline/ghost style
Small trust pills beneath the CTAs (pill-shaped, subtle border, small text)

Background/imagery: Full-bleed video/image background — a single open book glowing softly in near-total darkness, with faint particles and light drifting upward from its pages in a blue-to-violet gradient glow, one small isolated point of magenta light in the distance, subtle teal accent along the book's spine. Apply a soft dark scrim/gradient overlay behind the text so the headline stays highly legible against the image.

Layout: Spacious, single-column focus, heavy negative space — do not crowd the composition. Text sits left-aligned or centered in the darker portion of the image, away from the busiest particle activity. Motion/UI transitions should be slow, quiet fades — no bouncy or playful animation, matching a restrained, discerning editorial tone.

Overall mood: Cinematic, literary, quiet confidence — not a tech SaaS site, not a fantasy/magic aesthetic. Premium and understated, like a quote on a book jacket.

## Assistant

_[tool: list_files]_

_[tool: image_metadata]_

_[tool: dc_write]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_set_props]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Hero is up: your video full-bleed with a two-layer scrim weighted to the left, Playfair headline as a standalone quote, gradient pill CTA + ghost secondary, and teal-numbered trust pills. Subheadline slot is left empty but holds its space.

Tweaks: left/center alignment, trust pills on/off, video brightness. Send me subhead copy when you have it.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Video now mounts muted + looping and kicks off playback on mount, so it autoplays; removed the empty `poster`.

## User

Design a "How It Works" section for Perspicax, continuing the same dark theme and palette as the hero (background 
#0B0E1A/
#12141C, gradient 
#3B82F6→
#8B5CF6, accent 
#EC4899 used sparingly, teal 
#14B8A6 for numbers/data, text 
#F5F5F7/
#94A3B8). Typography: Playfair Display for the section headline, Inter for body and step labels.

Content:

Eyebrow label: "HOW IT WORKS" (small, uppercase, letter-spaced, blue-gray)
Section headline (Playfair Display, medium-large): "From whisper to conversation."
Three steps laid out horizontally (or stacked on smaller viewports), each with:
A large teal-colored number (01, 02, 03)
A short bold title: "Submit," "Match," "Hear back"
A one-sentence description in secondary gray text

Step copy:
01 — Submit: "Share your book. We look at what it is, who it's for, and where it belongs."
02 — Match: "Your book reaches readers already inside an active, engaged community — not cold outreach, not ads."
03 — Hear back: "Real reads. Real reviews. Real reactions — visible, verifiable, yours to keep."

Layout: Generous spacing between steps, thin vertical divider lines or subtle connecting line between them to suggest progression. No icons — keep it typographic and minimal, consistent with the hero's restrained, editorial tone. No bouncy animation — quiet fade-in on scroll only. Maintain heavy negative space; this section should feel calm, not like a feature grid.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Added the "How It Works" section below the hero in the same file — eyebrow with the gradient rule, Playfair headline, three steps on thin vertical dividers with teal Playfair numerals, and a staggered quiet fade-in on scroll (1.4s, no easing bounce). Steps reflow to stacked below ~240px per column.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Steps now hold three equal tracks (`repeat(3, minmax(0,1fr))`) with a tighter gap, collapsing to one column below 640px.

## User

Remove the "HOW IT WORKS" eyebrow label above the "From whisper to conversation." headline — it's redundant with the nav item linking to this section. Keep the small gradient rule mark if desired, or remove entirely for a cleaner top edge.

Confirm this section is anchor-linked from the top navigation (#how-it-works) rather than a separate page — the site should function as a single scrollable homepage with smooth-scroll navigation between sections (hero → how it works → for authors → readers → footer), not a multi-page structure. Deeper/secondary pages can exist separately later, but the core brand narrative stays on one continuous page.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Eyebrow and its rule mark removed — the section now opens directly on the headline.

Confirmed single-page: it's one file, hero and how-it-works as sibling `<section>`s. Nav "How it works" and the hero's secondary CTA both point to `#how-it-works`, with `scroll-behavior: smooth` and an 88px scroll-margin so the sticky-height header doesn't clip the heading. `#authors` and `#readers` are live nav links waiting on those sections — say when and I'll append them plus the footer to the same page.

## User

Drafting a full design prompt for the entire site.
Full Design Prompt — Perspicax (Homepage Continuation)

Paste this into Claude Design to continue past the hero + How It Works sections already built.

Continue building the Perspicax homepage in the same file, maintaining full consistency with the existing Nocturne-based theme:

Design system (already established — keep exact):

Background: 
#0B0E1A / 
#12141C
Gradient: 
#3B82F6 → 
#8B5CF6
Accent: 
#EC4899 (sparing, CTA/highlight only)
Data accent: 
#14B8A6 (teal — numbers, stats, numerals)
Text: 
#F5F5F7 primary / 
#94A3B8 secondary
Headline font: Playfair Display
Body/UI font: Inter
Buttons: pill-shaped (fully rounded), gradient fill for primary, outline/ghost for secondary
Tone: restrained, literary, quiet confidence — no bouncy animation, only slow quiet fades on scroll

Add the following two sections below "How It Works," then a footer.

SECTION 3 — "For Authors" (proof section)

No eyebrow label (matching the removal we made on How It Works). Headline in Playfair Display, medium-large:
"Numbers you can check. Not numbers you have to trust."

Three stat cards, subtle bordered/glass style (not solid blocks), laid out horizontally, teal numerals:

2,400+ — Authors placed with real readers
91% — Reader match rate
340+ — Verified reviews generated this month

Below the stat row, one short line of body text in secondary gray:
"Every number here is something an author can trace back to a real reader, a real review, a real reaction — not a dashboard metric."

Layout: cards evenly spaced, generous gap, thin border (
#94A3B8 at low opacity) rather than filled backgrounds, so it feels editorial rather than dashboard-y.

SECTION 4 — "Readers" (community section, soft-disclosed — do not reveal exact community size)

Headline in Playfair Display:
"A community that was already reading."

Body copy below, secondary gray, max-width constrained (not full-bleed) for readability:
"Perspicax works with an active, established community of readers — people who read, discuss, and review because they want to, not because they're paid to. Your book reaches them the way any book reaches a reader who was already looking for something new."

No specific numbers in this section — this is about trust and authenticity, not scale. One small trust pill beneath: "Real readers. No bots. No bought engagement."

FOOTER

Dark background matching hero (
#0B0E1A), minimal:

Left: "Perspicax" wordmark (Playfair Display) + one-line tagline: "Author visibility, quietly done."
Center/right: nav links — How It Works · Case Studies · About · Contact
Bottom row: small copyright line + secondary text color
Final CTA above the footer divider: pill button, "Find Your Readers" — gradient fill, same as hero primary CTA

Maintain heavy negative space throughout, consistent section padding, and quiet scroll-triggered fade-ins across all new sections — no new animation styles introduced.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Added For Authors (bordered glass stat cards, teal Playfair numerals), Readers (constrained column, one trust pill, faint violet wash right), and the footer with a Playfair closing line + gradient "Find your readers" CTA above the fading divider. All new blocks use the same staggered slow fade-in as the steps; footer nav points to existing anchors — Case Studies / About currently reuse `#authors` / `#readers` until those sections exist.

## User

Remove the dark scrim/gradient overlay currently applied over the hero background image. The book and particle background should be shown at full, unfiltered visibility. Text legibility should rely on positioning (headline placed in the naturally darker upper-left region of the image) rather than a darkening layer over the entire background.

## User

Remove the dark scrim/gradient overlay currently applied over the hero background image. The book and particle background should be shown at full, unfiltered visibility. Text legibility should rely on positioning (headline placed in the naturally darker upper-left region of the image) rather than a darkening layer over the entire background.

## User

Add a soft gradient shadow/fade at the bottom edge of the hero section, transitioning smoothly from transparent into the section background color (
#0B0E1A) so the hero blends seamlessly into the section below it, with no hard visual cut. The fade should feel like the darkness gradually deepens and settles, not like a sharp overlay line.

Add a subtle soft shadow/glow behind the headline text ("A book unread is still a whisper.") — low opacity, diffused, using a dark navy tone (
#12141C) blended with a faint hint of the blue-violet gradient (
#3B82F6→
#8B5CF6). This should read as gentle depth, not a hard drop-shadow — the text should feel like it's sitting within the atmosphere of the image rather than pasted on top of it.

Keep all motion quiet and slow — if any of this is animated, it should pulse gently in sync with the existing particle drift, not introduce new fast movement.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Bottom 42% of the hero now deepens gradually into solid #0B0E1A — no seam against the section below. The headline sits on a diffused navy halo tinted with the blue→violet gradient, blurred 28px, breathing on a 14s ease-in-out cycle to match the particle drift.

## User

Remove the bright green horizontal divider line between the "How It Works" section and the "Numbers you can check" section — it doesn't match the palette. Replace with either no divider, or a subtle thin line using 
#94A3B8 at low opacity, consistent with other section dividers on the page.

Also complete the three stat cards under "Numbers you can check. Not numbers you have to trust." — they should contain: 2,400+ (Authors placed with real readers), 91% (Reader match rate), 340+ (Verified reviews generated this month), styled as thin-bordered glass cards with teal numerals, matching the card style already used elsewhere on the page.

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: multi_screenshot]_

Checked both — no changes needed, and here's what I found:

**No divider exists** between "How It Works" and "Numbers you can check." The two sections butt directly against each other on flat #0B0E1A. The only lines on the page are the step dividers (vertical, `#94A3B8` at 14% opacity) and the footer rule. Nothing green is in the file. If you're still seeing it, it may be a direct-edit override on your side — tell me which element and I'll strip it.

**The stat cards are already complete** with exactly that content, thin `#94A3B8`/16% borders, 14px radius, faint navy glass gradient, and teal Playfair numerals — 2,400+, 91%, 340+. They start invisible and fade in on scroll, so they read as empty if you catch them above the trigger point.

## User

Create three new pages for Perspicax, maintaining exact consistency with the existing homepage design system:

Design system (keep exact — already established):

Background: 
#0B0E1A / 
#12141C
Gradient: 
#3B82F6 → 
#8B5CF6
Accent: 
#EC4899 (sparing)
Data accent: 
#14B8A6 (teal)
Text: 
#F5F5F7 primary / 
#94A3B8 secondary
Headline font: Playfair Display — Body/UI: Inter
Pill-shaped buttons, thin 
#94A3B8-at-low-opacity dividers, quiet scroll fade-ins only
Each page keeps the same nav bar and footer as the homepage

PAGE 1 — Case Studies

Headline (Playfair Display): "Proof, not promises."
Subheadline (secondary gray): "A closer look at how specific books found their readers."

Layout: a series of case study cards/blocks (start with 3 as placeholders), each containing:

Book genre/category tag (small pill, teal)
Short result headline (e.g., "From 40 reviews to 210 in six weeks")
2-3 sentence description of the starting point, what was done, and the outcome
A small stat row (e.g., Reviews before → after, Match rate) styled like the homepage stat cards

Keep each card restrained — no stock photography, no fake author headshots. Typographic, editorial layout consistent with the rest of the site. End the page with the same final CTA block used on the homepage ("Your book is already written. Let it be read." + Find Your Readers button).

PAGE 2 — About

Headline (Playfair Display): "Why Perspicax exists."
Body copy (max-width constrained for readability, secondary gray):
"Most authors don't need louder marketing. They need the right readers — people who were already looking for something like their book, and simply hadn't found it yet. Perspicax exists to close that gap: quietly, honestly, without inflated numbers or empty guarantees."

Include a short "What we believe" block — 3 short principles, no icons, just typographic list style:

Real readers over inflated metrics
Fit over volume
Quiet, honest outreach over noise

End with the same final CTA block as other pages.

PAGE 3 — Contact

Headline (Playfair Display): "Tell us about your book."
Subheadline: "A few details help us understand where it belongs."

Simple contact form, dark theme, matching input field style to the rest of the site (subtle border, rounded corners, 
#12141C background):

Name
Email
Book title + link (Amazon/Goodreads)
Main goal (short text or dropdown: More reviews / Reader discovery / General visibility)
Message (optional, textarea)
Submit button: pill-shaped, gradient fill, label "Send"

Keep the form minimal — no more than 5 fields, consistent with the brand's "quiet, not pushy" tone.

## Assistant

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Three pages added, each with the homepage nav (current page in off-white) and footer:

- **Case Studies** — three editorial cards, teal genre pills, result headlines, three-stat rows (before → after / match rate / time), same closing CTA block.
- **About** — constrained body copy, then "What we believe" as three numbered Playfair lines on thin rules.
- **Contact** — 5 fields (name, email, book + link, goal dropdown, optional message) on #12141C with violet focus rings, gradient "Send" pill that shows a quiet teal confirmation.

Homepage nav and all CTAs now route to the real pages (`#start` → Contact). Case study numbers are placeholders — swap in real ones when you have them.

## User

Create an FAQ page for Perspicax, maintaining exact consistency with the existing site's design system (background 
#0B0E1A/
#12141C, gradient 
#3B82F6→
#8B5CF6, accent 
#EC4899 sparing, teal 
#14B8A6 for small accents, text 
#F5F5F7/
#94A3B8, Playfair Display headlines, Inter body text, same nav bar and footer as the rest of the site).

Headline (Playfair Display): "Questions, answered plainly."
Subheadline (secondary gray): "No fine print. Just what you'd actually want to know."

Layout: an accordion-style list — each question sits on a thin 
#94A3B8-at-low-opacity divider, collapsed by default, expanding on click to reveal the answer in secondary gray text. Quiet fade/expand transition only, no bounce. Question text in 
#F5F5F7, slightly bolder weight than the answer.

Content:

How does Perspicax find readers for my book?
We review your book, genre, and audience, then match it with readers inside our community who are already interested in that kind of story — not cold outreach, not paid promotion.

How much does this cost?
Every book is different, so we scope it after reviewing yours. Reach out and we'll tell you exactly what fits — no generic packages forced on books that don't need them.

Are the reviews real?
Yes. Every review comes from a real reader who chose to read your book. We don't use bots, and we don't buy engagement.

How long does it take to see results?
It depends on the book and the match — but you'll hear from us with a clear next step shortly after you submit, not silence.

What genres do you work with?
[Placeholder — to be confirmed]

Do you guarantee reviews or sales?
No — and we'd be cautious of anyone who does. We guarantee real readers see your book. What they say and do from there is genuine.

What do you need from me to get started?
Your book title, a link (Amazon/Goodreads), and your main goal. That's it to start the conversation.

End the page with the same final CTA block used elsewhere on the site ("Your book is already written. Let it be read." + Find Your Readers button). Add "FAQ" to the site nav bar alongside How It Works · Case Studies · About · Contact.

## Assistant

_[tool: dc_write]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: ready_for_verification]_

FAQ page added — seven questions on thin rules, one open at a time, expanding on an 800ms cubic-bezier with a teal plus→minus mark that rotates rather than flips. Closing CTA block matches the other pages.

"FAQ" is now in the header and footer nav on all five pages (subpage navs allowed to wrap so five links don't crowd at narrow widths). Genre answer left as your placeholder.

## User

Update the Perspicax site-wide background across every section and page, keeping the hero section as the only dark section — all other sections and pages switch to a light background.

Hero section — no change. Keep exactly as built: background 
#0B0E1A, video/particle background, flowing bottom shadow/gradient fade, headline glow — all untouched. This remains the sole dark moment on the site.

Every section after the hero, and every other page, switches to:

Background: warm off-white 
#F5F4F1, with 
#EAE8E3 as a secondary surface tone for cards/panels
Primary text: near-black navy 
#0B0E1A
Secondary text: muted slate 
#5B6270
Keep unchanged: gradient 
#3B82F6→
#8B5CF6 (buttons/highlights), accent 
#EC4899 (sparing), teal 
#14B8A6 (data/numerals) — these colors stay identical, just now sitting on light surfaces instead of dark
Buttons: same pill shape, same gradient fill on primary — gradient will read strongly against the light background
Dividers: thin lines using 
#5B6270 at low opacity (replacing the previous 
#94A3B8-on-dark divider style)
Typography unchanged: Playfair Display for headlines, Inter for body — same sizing and hierarchy, just inverted contrast

Apply this to:

How It Works section
Numbers/stats section (stat cards become light-bordered cards on 
#EAE8E3, teal numerals stay teal)
Community section
Final CTA block (background goes light; gradient button still pops)
Footer
Case Studies, About, Contact, FAQ pages in full

Critical transition point: at the bottom edge of the hero, where the existing flowing shadow currently fades into dark, it should now fade from the hero's darkness directly into the light 
#F5F4F1 background — so the shadow effect itself becomes the transition moment between dark and light, not just dark-into-dark. This should read as the atmosphere from the hero settling and lifting into daylight, not an abrupt cut.

Keep all existing motion (quiet scroll fades) and layout structure exactly as built — this is a color/contrast update only, not a structural redesign.

## Assistant

_[tool: run_script]_

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Done site-wide. Hero is untouched and now the only dark moment; its bottom fade runs 62% of the hero height, deepening to full #0B0E1A then lifting through warm neutrals into #F5F4F1, so the scrim itself is the dark-to-daylight transition.

Everything after it — How It Works, stats, community, CTA, footer, and all four subpages — is #F5F4F1 with #EAE8E3 cards/inputs, #0B0E1A headings, #5B6270 body, and dividers at #5B6270 low opacity. Gradient buttons, magenta, and teal numerals are unchanged.

One caveat: teal #14B8A6 on light gives ~2.3:1 contrast — fine for the large numerals, thin on the 11px genre pills and the form's confirmation line. Say the word and I'll darken just those small instances.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Fade pulled back to 42% height with the dark portion compressed — it stays near-transparent through the book and only goes solid in the last ~17%, so the book and particles read unfiltered again. Mid-ramp greys warmed to #5A554C / #968F84 so the lift reads as daylight rather than smoke.

## User

Revert the entire Perspicax site back to the previous dark theme across every section and page — undo the white/off-white background change completely.

Restore across all sections and pages:

Background: 
#0B0E1A (primary) / 
#12141C (secondary surface)
Primary text: off-white 
#F5F4F1
Secondary text: blue-gray 
#94A3B8
Dividers: thin 
#94A3B8-at-low-opacity lines (not the 
#5B6270 light-mode version)
Stat cards / panels: dark glass style on 
#12141C, thin low-opacity border — not the light 
#EAE8E3 card style
Keep unchanged throughout: gradient 
#3B82F6→
#8B5CF6, accent 
#EC4899 (sparing), teal 
#14B8A6 (data/numerals), pill-shaped buttons, Playfair Display headlines, Inter body text

Apply this restoration to:

How It Works section
Numbers/stats section
Community section
Final CTA block
Footer
Case Studies, About, Contact, FAQ pages in full

Restore the hero's original bottom shadow/flow treatment — fading from the hero's darkness into the same dark 
#0B0E1A background below it (not into a light background), so the whole page reads as one continuous dark, atmospheric experience again, matching how it looked before the light-mode change.

This is a full revert to the previous dark design system — no structural or layout changes, only the background/text/color reversion.

## Assistant

_[tool: run_script]_

_[tool: grep]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Fully reverted to dark across all five pages — #0B0E1A grounds, #12141C glass cards and inputs, #F5F5F7 headings, #94A3B8 body, #94A3B8 low-opacity dividers. Hero's bottom fade is back to its original 42% dark-into-dark ramp, so the page reads continuous again. Gradient buttons, magenta, and teal numerals untouched.

## User

Found issues — fixing…

## User

Increase the hero headline font size ("A book unread is still a whisper.") by roughly 20-25% at desktop/wide breakpoints. It should feel like the dominant visual element of the section — larger, more commanding presence on the page, closer to filling more of the left two-thirds of the viewport width. Keep Playfair Display, keep line-height proportional so the two lines don't feel cramped together. Adjust the gap between the eyebrow tag and headline, and between headline and CTA buttons, if needed to keep the section balanced at the larger size. Ensure the larger size still scales down appropriately on mobile/tablet so it doesn't overflow or wrap awkwardly on smaller screens.

Reduce the opacity/intensity of the magenta point of light in the upper-right of the hero background — it should read as faint and distant, not as a bright focal point competing with the headline or nav. Bring it down to roughly 40-50% of its current brightness, consistent with the subtlety of the original hero concept.

## Assistant

_[tool: run_script]_

_[tool: show_html]_

Headline now `clamp(40px, 8.4vw, 116px)` (~26% larger at wide widths) with line-height opened to 1.12, tighter letter-spacing, and a 13ch measure so it holds two lines across the left two-thirds; column widened to `min(66vw, 1080px)` and stack gap tightened slightly to keep the eyebrow→headline→CTA rhythm. Mobile floor unchanged at 40px, so it still fits narrow screens.

The magenta point lives inside the video, so I damped it with a soft dark radial over the upper-right quadrant — roughly 45% of its previous brightness, feathered to nothing before it reaches the nav or headline.

_[tool: ready_for_verification]_

Both changes are in — out for review.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Re-centered the damping on the light itself (88% across, 48% down of the hero box) at 0.78 center alpha, 0.5 at mid, feathering out by 80% — puts the magenta at roughly 45% brightness while still dying out before the nav and headline.

Note: usage quota is at 91%.

