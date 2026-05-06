# Vitalos Technologies — Pre-flight Audit

**Date:** 6 May 2026  
**Auditor:** Claude (Senior Architect / Content Strategist)  
**Purpose:** Pre-implementation audit before full website rebuild per VITALOS_REBUILD_PROMPT.md

---

## 1. Routing structure (file tree of src/pages/)

```
src/pages/
├── Home.tsx          — Homepage: hero (mental health), mission, three pillars, why-section, testimonials
├── Solutions.tsx     — AI mental health platform page (NHS-focused)
├── About.tsx         — Two-sentence placeholder
├── History.tsx       — Five-milestone timeline (2024–Future)
├── Technology.tsx    — Technical architecture: 9 cards (AI, microservices, data, security, etc.)
├── Careers.tsx       — 9 open roles with application modal + CV upload + honeypot
├── CareersSuccess.tsx— Confirmation page after job application
├── Resources.tsx     — Three-line placeholder
├── Blog.tsx          — Blog list: search, tag filtering, 3 posts
├── BlogPost.tsx      — Individual post renderer (markdown → HTML, TOC, share buttons)
├── Research.tsx      — One-line placeholder
├── CaseStudies.tsx   — One simulated NHS pilot case study (−37% triage time, +22% throughput)
├── Contact.tsx       — Contact form → Zoho SMTP via /api/contact
├── Demo.tsx          — Interactive wellness chatbot (6 canned responses)
├── Investors.tsx     — Gated investor deck (HMAC-SHA256 code gate, 4 slides, blank funding amount)
└── api/
    └── contact.ts    — POST /api/contact handler (Zoho SMTP via nodemailer)
```

**Custom SPA router:** uses `window.history.pushState`. No Next.js, no React Router.

---

## 2. Current components

| Component        | File               | What it does                                                   |
|------------------|--------------------|----------------------------------------------------------------|
| Header           | Header.tsx         | Fixed nav, desktop/mobile dropdowns, CTA buttons, hamburger   |
| Footer           | Footer.tsx         | 5-column layout: logo, links, contact info                     |
| Hero             | Hero.tsx           | Full-screen, parallax mouse, particle canvas, aurora blobs     |
| SectionHero      | SectionHero.tsx    | Section header with optional gradient band, used on sub-pages  |
| Card             | Card.tsx           | Icon + title + body text, dark bg, white ring border           |
| BlogCard         | BlogCard.tsx       | Cover image, title, date, excerpt, tags, read-more CTA         |
| Testimonials     | Testimonials.tsx   | Auto-rotating carousel (3 items, 6s), dot nav, partner logos   |
| Newsletter       | Newsletter.tsx     | Email input → localStorage only (no API endpoint wired)        |
| DemoChat         | DemoChat.tsx       | Chatbot with 6 suggestion buttons, canned responses, TXT export|
| Preloader        | Preloader.tsx      | Loading overlay spinner                                         |
| SEO              | SEO.tsx            | Empty component — no functionality                             |

---

## 3. Current homepage copy (verbatim)

**Hero:**  
> "AI that keeps minds well at scale."  
> "Vitalos delivers predictive screening, smart … that make mental healthcare proactive, personalised, and safe."  
> CTAs: "Get Started" / "For investors"

**Mission:**  
> "We use responsible AI to catch risk earlier, match people to the right support faster, and give clinicians superpowers — without adding to their workload."

**Three pillars:** Predict / Support / Safeguard (NHS mental health workflow)

**Why Vitalos (3 cards):** Clinician Copilot · Scalable & Reliable · Outcomes That Matter

---

## 4. Currently working — PRESERVE or MIGRATE

| Item                        | Details                                               | Decision              |
|-----------------------------|-------------------------------------------------------|-----------------------|
| Contact form → email        | POST `/api/contact` → Zoho SMTP (nodemailer), `MAIL_TO=hello@vitalos.co.uk` | **Migrate:** rebuild uses Resend (RESEND_API_KEY already set) |
| Careers application form    | POST `/api/apply` → Google Sheets webhook             | **Note in BACKLOG** — not in new IA; keep old dist accessible until new careers page ships |
| Investor gate               | HMAC-SHA256 code → Resend notification                | **Note in BACKLOG** — not in new IA |
| Resend API key              | `RESEND_API_KEY=re_AyyPR5mx_...` in `.env.local`      | **Preserve** — new contact route uses this |
| `MAIL_TO=hello@vitalos.co.uk` | Destination email configured                        | **Preserve** — use `CONTACT_TO` in new route |
| `public/vitalos_logo_white.png` | White logo PNG                                   | **Preserve** — referenced in new Header/Footer |
| `public/vitalos_logo_black.png` | Black logo PNG                                   | **Preserve** |
| `public/robots.txt`         | Existing robots file                                  | **Replace** with new Next.js-aware version |
| `public/sitemap.xml`        | 16 URLs, hardcoded dates                              | **Replace** with new IA sitemap |
| `.vercel/` folder           | Vercel project config                                 | **Preserve** — same Vercel deployment |

---

## 5. Broken, stale, or off-brand — REMOVE or REPLACE

| Issue                          | Detail                                                                     |
|--------------------------------|----------------------------------------------------------------------------|
| Brand identity mismatch        | Site presents as NHS mental health startup; repositioning to tech consultancy |
| About page empty               | Two sentences — no substance                                               |
| Resources page stub            | 3-line placeholder, linked in nav                                          |
| Research page stub             | 1-line placeholder, in sitemap                                             |
| Newsletter not wired           | Emails stored in localStorage only; TODO comment present                   |
| Investor funding blank         | Slide says "GBP X.Xm"                                                    |
| Case study labelled "simulated"| Metrics clearly simulated — credibility risk                               |
| Blog posts 2 & 3 are stubs     | 80-word and 50-word posts                                                  |
| Testimonial logos missing      | `/logos/mindworks.svg`, `/logos/northcare.svg`, `/logos/wellnest.svg` — files don't exist |
| Domain mismatch                | og:url says `vitalos.ai`, email + sitemap use `vitalos.co.uk`             |
| CTA text inconsistency         | "Get Started" / "Request a Demo" / "Explore Solutions" — no clear primary CTA |
| `App.css`                      | Unused Vite template CSS (logo spin animation)                             |
| `SEO.tsx`                      | Empty component                                                            |
| Fabricated KPIs on Solutions   | "−15% wait time, −20% drop-outs, +10hrs saved" — simulated                |

---

## 6. Tech stack

| Property        | Current value                         |
|-----------------|---------------------------------------|
| Framework       | React 19.1.1 (SPA, not SSR)           |
| Bundler         | Vite 7.1.2                            |
| Styling         | TailwindCSS 3.4.17 (no custom tokens) |
| Routing         | Custom pushState router               |
| Animation       | Framer Motion 12.23.12 + canvas API   |
| Icons           | Lucide React 0.542.0                  |
| Email           | Nodemailer 7.0.6 via Zoho SMTP        |
| Email (2nd)     | Resend 6.1.0 (installed, partially used) |
| Deployment      | Vercel (serverless functions in `/api`) |
| Package manager | npm (package-lock.json present)       |
| TypeScript      | 5.8.3, strict                         |
| Node target     | 18+                                   |
| OG image gen    | @vercel/og 0.8.5 (installed, unused)  |

**Stack conflict vs brief:** Brief requires Next.js 15 + App Router + React Server Components + TailwindCSS v4. Current stack is Vite SPA. `next` appears as a devDependency (v15.5.2) but is not the active build tool. **Full framework migration required.**

**Migration path:** Replace Vite with Next.js as primary build. The `src/` SPA structure will remain on disk but will no longer be the build target. Package.json scripts updated to `next dev / build / start`. Old code is preserved as fallback reference.

---

## 7. Decisions made

1. **Framework:** Migrate to Next.js 15 App Router as specified. Old Vite SPA in `src/` left on disk but not built.
2. **Tailwind:** Upgrade to v4 with CSS-based token configuration (`@theme {}`).
3. **Email:** Resend replaces Zoho SMTP for the contact form. `RESEND_API_KEY` already in `.env.local`.
4. **Package manager:** Brief says default to pnpm. Current lockfile is npm. Keeping npm to avoid lockfile churn unless user requests otherwise.
5. **Dark mode:** Dark-first only in v1 as per brief.
6. **Careers/Investor pages:** Not in new IA. Logged in BACKLOG.md.
7. **StatsStrip:** Omitted — no verified numbers available.
8. **OG image:** Placeholder noted; actual branded PNG to be created by designer.
9. **Founder photo:** Not yet provided; About page ships without it (noted in BACKLOG.md).
10. **Social links:** Omitted from footer until real accounts confirmed.
