# Changes

Complete list of files created, modified, or deleted for the v1 website rebuild (6 May 2026).

## Created

| File | Reason |
|---|---|
| `app/globals.css` | Tailwind v4 design tokens and base styles |
| `app/layout.tsx` | Next.js App Router root layout with fonts, metadata, structured data |
| `app/page.tsx` | Homepage |
| `app/services/page.tsx` | Services overview page (8 services) |
| `app/industries/page.tsx` | Industries page (6 sectors) |
| `app/technologies/page.tsx` | Proprietary technologies page (7 categories) |
| `app/solutions/page.tsx` | Solution concepts page (5 demonstrators) |
| `app/about/page.tsx` | About page |
| `app/contact/page.tsx` | Contact page with enquiry form |
| `app/insights/page.tsx` | Insights stub (MDX architecture wired, no content yet) |
| `app/privacy/page.tsx` | Privacy notice (template — review with solicitor) |
| `app/terms/page.tsx` | Terms of service (template — review with solicitor) |
| `app/api/contact/route.ts` | Contact form handler (Resend, rate limiting, honeypot) |
| `components/ui/Button.tsx` | Button primitive (primary/secondary/ghost × sm/md/lg) |
| `components/ui/Card.tsx` | Card primitive |
| `components/ui/Container.tsx` | Max-width wrapper |
| `components/ui/Input.tsx` | Labelled input with error state |
| `components/ui/Textarea.tsx` | Labelled textarea with error state |
| `components/ui/Select.tsx` | Labelled select with error state |
| `components/ui/Tag.tsx` | Pill/tag component |
| `components/layout/Header.tsx` | Sticky header with scroll blur, mobile nav |
| `components/layout/Footer.tsx` | Site footer |
| `components/layout/PageLayout.tsx` | Main content wrapper |
| `components/sections/SectionHeader.tsx` | Eyebrow/heading/lede pattern |
| `components/sections/HeroSection.tsx` | Homepage hero |
| `components/sections/PositioningStrip.tsx` | Service tag strip |
| `components/sections/ServicesGrid.tsx` | 8-service card grid |
| `components/sections/IndustriesGrid.tsx` | 6-industry card grid |
| `components/sections/WhyVitalos.tsx` | 6-reason section |
| `components/sections/ProcessSection.tsx` | 5-step process |
| `components/sections/TechnologiesShowcase.tsx` | Technology preview (4 cards) |
| `components/sections/CTASection.tsx` | Reusable CTA banner |
| `components/forms/ContactForm.tsx` | Contact form (RHF + Zod + Resend) |
| `next.config.ts` | Next.js configuration |
| `BACKLOG.md` | Deferred items |
| `CHANGES.md` | This file |

## Modified

| File | Reason |
|---|---|
| `package.json` | Replaced Vite with Next.js 15; added RHF, Zod; removed Framer Motion, nodemailer, remark |
| `tsconfig.json` | Replaced Vite/project-references config with Next.js TypeScript config |
| `postcss.config.js` | Replaced tailwindcss/autoprefixer with @tailwindcss/postcss (v4) |
| `AUDIT.md` | Replaced partial audit with full pre-flight audit per brief section 0 |
| `README.md` | Replaced product-focused README with engineering README |
| `public/robots.txt` | Updated to reference new sitemap URL |
| `public/sitemap.xml` | Updated with new IA routes (old routes removed) |

## Preserved (not modified)

| File | Reason |
|---|---|
| `src/` | Old Vite SPA left on disk; not built by Next.js. Remove after confirming new site is live. |
| `.env` / `.env.local` | Existing credentials preserved |
| `.vercel/` | Vercel project configuration preserved |
| `public/vitalos_logo_white.png` | Used in Header and Footer |
| `public/vitalos_logo_black.png` | Preserved for future use |
