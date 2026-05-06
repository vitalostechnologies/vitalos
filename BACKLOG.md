# Backlog — Vitalos Technologies Website v1

Items deferred from the v1 brief with reasoning.

## High priority (v1.1)

| Item | Reason deferred |
|---|---|
| `public/og.png` | Requires branded design asset (1200×630 navy with wordmark). Placeholder not shipped. |
| Founder photo and bio on About page | Not yet provided. Placeholder comment in About page. |
| Light mode | Out of scope for v1 per brief. CSS tokens are structured for future addition. |
| `/services/[slug]` individual service pages | Deferred to v2 per brief instructions. Services use anchor links on /services. |
| Social links in Footer | Omitted until real social accounts are confirmed. |

## Medium priority (v1.1–v2)

| Item | Reason deferred |
|---|---|
| Insights / blog content | MDX architecture wired in `app/insights/`; no content yet. |
| Careers page | Not in new IA. Old Vite careers page + Google Sheets webhook preserved in `src/pages/Careers.tsx`. Needs port to Next.js. |
| Investor/stakeholder page | Not in new IA. Old gated investor deck at `src/pages/Investors.tsx`. Needs port or decision to retire. |
| Newsletter signup | Not wired in v1. Old implementation stored in localStorage (no API). Needs Resend audience integration. |
| Interactive demo / chatbot | Old `DemoChat.tsx` component not ported. |
| Blog post 1 (AI in Mental Health) | Well-written 900-word post from old site; needs repositioning for consultancy context. |
| Lighthouse / axe report | Cannot run in this context. Needs Vercel preview deploy + CI tooling. |
| Structured data per-page | Only root Organization/WebSite schema implemented. Service, Article schemas deferred. |
| Case studies | No real case studies. Section deferred until client consent obtained. |

## Low priority (v2+)

| Item | Reason deferred |
|---|---|
| Cookie banner | Not needed (Plausible has no cookies). |
| Dark/light mode toggle | Dark-only in v1. |
| Search functionality | No content volume to justify it. |
| Pricing page | No public pricing model. |
| Multi-language support | UK-only in v1. |

## Decisions to review

| Decision | What to revisit |
|---|---|
| Privacy/Terms pages | Template content — review with solicitor before marketing. |
| Domain: vitalos.co.uk | Confirm this is the canonical domain (old site had vitalos.ai references). |
| VitalOS product line naming | Confirm product names (VitaFlow, VitaInsight, etc.) with founder before publishing. |
| Technology statuses | All proprietary technologies marked "In development". Update when status changes. |
