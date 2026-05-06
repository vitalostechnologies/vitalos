# Vitalos Technologies — Website

Technology consultancy website. Built with Next.js 15 + App Router, Tailwind CSS v4, TypeScript.

## Stack
- **Framework:** Next.js 15.x (App Router, React Server Components)
- **Language:** TypeScript 5.x (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-based configuration in `app/globals.css`)
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend API
- **Analytics:** Plausible (privacy-first, no cookie banner needed)
- **Deployment:** Vercel

## Local development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` (already present in repo for development):

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for contact form emails |
| `CONTACT_TO` | No | Destination email (defaults to `MAIL_TO` then `hello@vitalos.co.uk`) |
| `MAIL_TO` | No | Fallback destination email |

## Deployment

Deployed on Vercel. Push to `main` triggers production deploy. Ensure environment variables are set in Vercel project settings.

## Design decisions

- **Dark-first:** No light mode in v1. Documented decision; light mode is in backlog.
- **No UI library:** All components hand-rolled for maximum control and minimal JS.
- **Plausible analytics:** Privacy-preserving analytics — no cookie banner required.
- **Font:** Inter (body) + Inter Tight (headings) + JetBrains Mono (code/tags) — all via `next/font`.

## Assets needed

- `public/og.png` — 1200×630 branded OG image (navy background, Vitalos wordmark, tagline). Not yet provided.
- Founder photo for About page — not yet provided.

## Backlog

See `BACKLOG.md`.
