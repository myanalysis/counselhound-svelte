import type { Handle } from '@sveltejs/kit';

// Runtime `caches.default` is Cloudflare's Cache API — DOM lib types don't know about it.
// This edge-caches every GET page response (D1-backed: homepage, blog listing, sitemap.xml,
// practice-area pages) so repeat hits — crawlers especially, and today's /es/ rollout just
// doubled the crawlable URL surface — don't re-run D1 queries every single request. This is
// the same fix already applied to mybadbroker.com after it blew the D1 free-tier rows_read
// cap; this site and frankowskifirm never got it, which is why the cap got hit again today
// even though the original bug (mybadbroker's uncached COUNT(*)) was already fixed — all
// four sites share one D1 database and one daily quota.
type LooseCache = {
  match(req: unknown): Promise<Response | undefined>;
  put(req: unknown, res: unknown): Promise<void>;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- caches.default isn't in DOM lib types
const edgeCache = (caches as any).default as LooseCache;
const NOT_CACHEABLE_PREFIXES = ['/api', '/admin', '/_app'];
const cacheTtl = (pathname: string) => (pathname === '/sitemap.xml' ? 3600 : 600);

// The old WordPress site (counselhound.com) has ~480 real content URLs indexed, going back
// to 2022 and still being posted to as recently as this old export (no local archive exists
// — pulled from Wayback Machine CDX). All of them 404 on the new site right now. This maps
// them to the closest living equivalent instead of losing that ranking equity to a hard 404.
//
// Strategy, cheapest/highest-confidence first:
//  1. Exact matches for the old site's static pages and bare practice-area slugs
//  2. Practice-area keyword matches → /practice-areas/[slug] (car accident, truck wreck,
//     medical malpractice, etc. all map to the matching new category page)
//  3. Everything else that looks like real WP content → /news-and-blogs, the closest
//     living content hub
//
// Deliberately runs AFTER resolve(), only on an actual 404 — so it can never intercept or
// redirect a route that legitimately exists on the new site.

const LEGACY_EXACT: Record<string, string> = {
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/consultation-request': '/contact',
  '/no-cost-case-evaluation': '/contact',
  '/thank-you': '/contact',
  '/news': '/news-and-blogs',
  '/news-2': '/news-and-blogs',
  '/location': '/',
  '/locations': '/',
  '/other-sections': '/',
  '/privacy-policy': '/privacy-policy',
  '/terms-of-service': '/terms-of-service',
  '/disclaimer': '/disclaimer',
  // Old site used bare practice-area slugs; new site nests them under /practice-areas.
  '/abuse-litigation': '/practice-areas/abuse-litigation',
  '/personal-injury': '/practice-areas/personal-injury',
  '/consumer-fraud': '/practice-areas/consumer-fraud',
  '/defective-products': '/practice-areas/defective-products',
  '/medical-injury': '/practice-areas/medical-injury',
  '/toxic-torts': '/practice-areas/toxic-torts',
  '/whistleblower-protection': '/practice-areas/whistleblower-protection',
  // Bare state names with no city/state pages on the new site — personal injury (mostly
  // car-accident content) is what these old pages were actually about.
  '/alabama': '/practice-areas/personal-injury',
  '/florida': '/practice-areas/personal-injury',
  '/texas': '/practice-areas/personal-injury'
};

// Checked most-specific first so e.g. "camp-lejeune-toxic-water-claim" lands on toxic-torts
// rather than a broader bucket, and "whistleblower"/"securities-fraud" content — thin as it
// is on a personal-injury site — still lands on the one practice area that's actually about it.
const TOPIC_PATTERNS: [RegExp, string][] = [
  [/cerebral-palsy|erbs-palsy|birth-injury|medical-malpractice|covid-vaccine/, '/practice-areas/medical-injury'],
  [/pressure-cooker|pressure-vessel|earplug|\bcpap\b|zantac|nexium|hip-replacement|surgical-stapler|transvaginal-mesh|opioid|dicamba|defective-product/, '/practice-areas/defective-products'],
  [/asbestos|mesothelioma|paraquat|roundup|talcum|toxic|camp-lejeune/, '/practice-areas/toxic-torts'],
  [/\babuse\b|boy-scouts|clergy|trafficking|nursing-home/, '/practice-areas/abuse-litigation'],
  [/data-breach|identity-theft|\btcpa\b|consumer-fraud/, '/practice-areas/consumer-fraud'],
  [/whistleblow|qui-tam|securities-fraud|investment-fraud/, '/practice-areas/whistleblower-protection'],
  [/accident|car-wreck|truck-wreck|motorcycle|bicycle|pedestrian|boating|aviation|drunk-driv|\buber\b|\blyft\b|rideshare|\bvehicle\b|dog-bite|catastrophic-injury|premises-liability|maritime|\bjpml\b|mass-tort|slip-and-fall|wrongful-death|personal-injury/, '/practice-areas/personal-injury']
];

// Only treat clean, WP-slug-shaped paths as migratable content. Excludes app internals,
// real routes, WP exploit-probe paths (wp-login.php etc. never match — dots aren't allowed
// in the slug pattern), and junk crawl artifacts (comma-separated RGB values from an old
// theme CSS bug).
const WP_CONTENT_PATH = /^\/(?:\d{4}\/\d{2}\/\d{2}\/)?[a-z0-9]+(?:-[a-z0-9]+)*\/?$/i;
const EXCLUDED_PREFIXES = [
  '/api', '/admin', '/_app', '/news-and-blogs', '/practice-areas',
  '/sitemap.xml', '/robots.txt', '/videos', '/faq', '/es'
];

function legacyRedirect(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path in LEGACY_EXACT) return LEGACY_EXACT[path];

  if (EXCLUDED_PREFIXES.some((p) => path.startsWith(p))) return null;
  if (!WP_CONTENT_PATH.test(path)) return null;

  const low = path.toLowerCase();
  for (const [pattern, target] of TOPIC_PATTERNS) {
    if (pattern.test(low)) return target;
  }

  // Old dated post URLs and general article slugs are real content with no 1:1 new-site
  // equivalent — send them to the blog hub rather than losing them to a 404.
  return '/news-and-blogs';
}

export const handle: Handle = async ({ event, resolve }) => {
  const needsHostFix = event.url.hostname === 'www.counselhound.com'; // www → apex

  const cacheable =
    event.request.method === 'GET' && !NOT_CACHEABLE_PREFIXES.some((p) => event.url.pathname.startsWith(p));

  // Note: Cloudflare's zone-level edge cache (honors the Cache-Control set below) intercepts
  // repeat requests before they ever reach this Worker — confirmed via cf-cache-status: HIT
  // in production on the sibling frankowskifirm-svelte deploy. This caches.default layer is
  // defense-in-depth for requests that land here anyway, not the primary mechanism.
  if (cacheable && !needsHostFix) {
    const cached = await edgeCache.match(event.request.url /* not event.url: SvelteKit strips /__data.json from it, which collided JSON with the page under one key */);
    if (cached) return cached;
  }

  // Stamp the real <html lang> server-side so it's correct on first paint (not just after
  // a client-side effect runs) — matters for SEO/a11y on /es pages.
  const isSpanish = event.url.pathname === '/es' || event.url.pathname.startsWith('/es/');
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => (isSpanish ? html.replace('<html lang="en">', '<html lang="es-US">') : html)
  });

  if (response.status === 404 && event.request.method === 'GET') {
    const target = legacyRedirect(event.url.pathname);
    if (target && target !== event.url.pathname) {
      const host = needsHostFix ? event.url.hostname.slice(4) : event.url.hostname;
      return Response.redirect(`https://${host}${target}`, 301);
    }
  }

  if (needsHostFix) {
    return Response.redirect(
      `https://${event.url.hostname.slice(4)}${event.url.pathname}${event.url.search}`,
      301
    );
  }

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (cacheable && response.status === 200) {
    const ttl = cacheTtl(event.url.pathname);
    const toCache = response.clone();
    toCache.headers.set('Cache-Control', `public, max-age=${ttl}, s-maxage=${ttl}`);
    event.platform?.ctx.waitUntil(edgeCache.put(event.request.url, toCache));
  }

  return response;
};
