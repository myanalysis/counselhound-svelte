# counselhound-svelte — Developer Reference

## Site
- **Client:** Counsel Hound
- **Domain:** counselhound.com
- **Staging:** https://counselhound-svelte.diogenes.workers.dev
- **GitHub:** myanalysis/counselhound-svelte (private)
- **Cloudflare account:** 29ced6abadcf02459573ad7307f18b15 (Diogenes)

## Related Site
**Richard Frankowski** is the founder of Counsel Hound and also the principal attorney at his own firm.
His law firm site lives at: `/Users/benson/Svelte/Site Updates/frankowskifirm-svelte/`
Domain: **frankowskifirm.com**

These two sites share the same owner. Changes to Richard's bio, credentials, contact info, or branding may need to be reflected in both places. When working on either site, check the other for consistency.

## Stack
- SvelteKit 5 + Svelte runes
- Tailwind v4
- Cloudflare Workers via `@sveltejs/adapter-cloudflare`
- Resend for email (package: `resend ^6.9.4`)
- Anthropic SDK for AI chat (`@anthropic-ai/sdk`)

## Dev
```bash
pnpm dev --port 5301
```

## Deploy
```bash
pnpm build && npx wrangler deploy
```

## Colors
- Dark navy: `#0D1B2A`
- Gold: `#C9A84C`
- Lighter gold (nav): `#eed08b`

## Fonts
Self-hosted. No Google Fonts.
- Playfair Display — `@font-face` in `src/routes/app.css`
- Futura — referenced as `font-futura` utility class

## Routes
| Route | Notes |
|---|---|
| `/` | Homepage |
| `/about` | About page |
| `/contact` | Contact form |
| `/practice-areas/[category]` | Dynamic practice area pages |
| `/news-and-blogs` | Blog index (D1) |
| `/news-and-blogs/[slug]` | Blog post (D1) |
| `/counsel-hound-consumer-safety` | Consumer product safety dashboard (CPSC RSS + curated db) |
| `/counsel-hound-medical-safety` | Medical/FDA safety dashboard (openFDA API + curated db) |
| `/admin` | Admin dashboard (auth required) |
| `/admin/login` | Email OTP login — no password |
| `/sitemap.xml` | Dynamic sitemap |

## Admin Auth
Password-based auth was replaced with email OTP (2FA).

Flow: enter email → 6-digit code sent via Resend → enter code → 8h session cookie.

Allowed emails: `richard@counselhound.com`, `diogenes@mac.com`

Secrets required in Cloudflare:
- `RESEND_API_KEY` — set via `npx wrangler secret put RESEND_API_KEY`
- `ADMIN_OTP_SECRET` — HMAC signing key for OTP cookies, set via `npx wrangler secret put ADMIN_OTP_SECRET`

`ADMIN_PASSWORD` in wrangler.toml `[vars]` is no longer used — can be removed.

## Email
- From: `Counsel Hound <noreply@counselhound.com>`
- Leads go to: `richard@counselhound.com`
- Mailer: `src/lib/server/mailer.ts`
- Templates: `src/lib/server/emailTemplates.ts`

## Consultation CTA
Uses LeadConnector iframe, not lawbrokr.
Shared via `ConsultationModal` component — used by Hero and PracticeAreas.

## Safety Dashboards
Two live-data microsites added per client request:
- `/counsel-hound-consumer-safety` — CPSC RSS via allorigins.win proxy, 27-product curated database, 24h localStorage cache
- `/counsel-hound-medical-safety` — openFDA device + drug enforcement APIs, FDA MedWatch RSS ticker, 20 BBW entries, 14 high-risk device entries, pagination

## AI Chat
Streaming SSE at `/api/chat`. Model: `claude-haiku-4-5-20251001`.
Cloudflare AI binding: `env.AI` (bound in wrangler.toml).

## D1 Blog
D1 database binding must be uncommented in `wrangler.toml` when active:
```toml
[[d1_databases]]
binding = "DB"
database_name = "counselhound-blog"
database_id = "YOUR_D1_DATABASE_ID"
```
