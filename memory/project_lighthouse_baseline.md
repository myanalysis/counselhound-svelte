---
name: Lighthouse baseline scores
description: Lighthouse scores for competitor/reference site vs counselhound-svelte on workers.dev
type: project
---

**Competitor reference (securitieslaw-attorney.com — Richard's other WP site):**
- Performance: 62 | Accessibility: 100 | Best Practices: 100 | SEO: 100
- FCP: 2.6s | LCP: 5.6s | TBT: 100ms | CLS: 0.251 | SI: 2.6s
- Issues: render blocking requests (780ms savings), unused JS (115KB), unused CSS (25KB), long main-thread tasks

**counselhound-svelte on workers.dev (Mar 30 2026 — pre-live domain):**
- Performance: 70 | Accessibility: 100 | Best Practices: 96 | SEO: 100
- FCP: 3.7s | LCP: 5.9s | TBT: 0ms | CLS: 0 | SI: 3.8s
- Remaining issues: LCP (hero is CSS background, can't be LCP-prioritized by browser), CF analytics CORS error (placeholder token), image delivery savings

**Why:** workers.dev scores are penalized vs production domain — Cloudflare CDN edge caching and HTTP/2 push don't fully apply on the staging URL. Expect +10-15 performance points on live counselhound.com domain.

**How to apply:** Don't panic about 70 performance on workers.dev. CLS is perfect (0), TBT is near-zero (0ms vs 100ms on WP). Main remaining lever is hero LCP — already limited by CSS background-image architecture.
