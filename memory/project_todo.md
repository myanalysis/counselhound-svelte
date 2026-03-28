---
name: Project TODO list
description: Outstanding tasks for the counselhound-svelte project
type: project
---

- Migrate posts from static JSON to Cloudflare D1 database (currently bundled at build time — admin writes don't persist on Cloudflare)
- Set Resend API key as a proper Cloudflare secret instead of a wrangler.toml var (currently exposed in plaintext)
- Point counselhound.com domain to the Cloudflare Worker
- Add video URL for Richard Frankowski modal on the About page (VIDEO_URL is blank in src/routes/about/+page.svelte)

**Why:** Site is deployed read-only to Cloudflare Workers. DB needed for admin CRUD, likes, views to work in production.
