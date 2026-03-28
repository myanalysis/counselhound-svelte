---
name: Resend email config
description: Resend API key and email setup for counselhound.com
type: project
---

Resend API key: REDACTED
From address: noreply@counselhound.com
Lead emails go to: richard@counselhound.com

Currently stored as a plaintext wrangler.toml var — TODO: move to a proper Cloudflare secret via `wrangler secret put RESEND_API_KEY`.

**Why:** nodemailer uses TCP which doesn't work on Cloudflare Workers. Resend uses HTTP and works fine.
