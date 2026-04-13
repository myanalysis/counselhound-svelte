---
name: Project TODO list
description: Outstanding tasks for the counselhound-svelte project
type: project
---

**Must do before go-live:**
- Point counselhound.com domain to the Cloudflare Worker
- Revoke leaked Resend API key at resend.com and run `wrangler secret put RESEND_API_KEY` with new key
- Move ADMIN_PASSWORD out of wrangler.toml → `wrangler secret put ADMIN_PASSWORD`
- Add Cloudflare Web Analytics token — replace REPLACE_WITH_CF_ANALYTICS_TOKEN in src/routes/+layout.svelte, get token from CF dashboard → Web Analytics → Add Site
- Submit sitemap to Google Search Console once domain is live: https://counselhound.com/sitemap.xml

**Content:**
- Add video URL for Richard Frankowski modal on the About page (VIDEO_URL is blank in src/routes/about/+page.svelte)
- Replace placeholder testimonials (Sarah M., James R., Linda T.) with real client reviews
- Verify achievement badge descriptions match actual awards

**Functionality:**
- Migrate posts from static JSON to Cloudflare D1 database (admin writes, likes, views don't persist without it)
- Test contact form end-to-end with new Resend key — confirm emails land at richard@counselhound.com
