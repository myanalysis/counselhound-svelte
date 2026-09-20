import { getPosts } from '$lib/server/posts';
import { getDB } from '$lib/server/db';
import { en } from '$lib/i18n/en';
import type { RequestHandler } from './$types';

const SITE = 'https://counselhound.com';

const TODAY = new Date().toISOString().split('T')[0];

// Translated routes — every URL here gets both an en (unprefixed) and es (/es prefix) entry
// with reciprocal hreflang alternates. English-only routes (privacy/terms/disclaimer, blog
// post bodies) are listed separately below with no alternates.
const TRANSLATED_PAGES = [
  { url: '/',                                   priority: '1.0', changefreq: 'weekly',  lastmod: TODAY },
  { url: '/about',                              priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { url: '/contact',                            priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { url: '/faq',                                priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { url: '/videos',                             priority: '0.6', changefreq: 'monthly', lastmod: TODAY },
  { url: '/news-and-blogs',                     priority: '0.9', changefreq: 'daily',   lastmod: TODAY },
  { url: '/counsel-hound-consumer-safety',      priority: '0.8', changefreq: 'daily',   lastmod: TODAY },
  { url: '/counsel-hound-medical-safety',       priority: '0.8', changefreq: 'daily',   lastmod: TODAY },
];

const ENGLISH_ONLY_PAGES = [
  { url: '/privacy-policy',   priority: '0.3', changefreq: 'yearly', lastmod: TODAY },
  { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly', lastmod: TODAY },
  { url: '/disclaimer',       priority: '0.3', changefreq: 'yearly', lastmod: TODAY },
];

function urlEntry(path: string, priority: string, changefreq: string, lastmod: string, translated: boolean) {
  const loc = translated ? `${SITE}${path}` : `${SITE}${path}`;
  const altEn = `${SITE}${path}`;
  const altEs = path === '/' ? `${SITE}/es` : `${SITE}/es${path}`;
  const alternates = translated
    ? `\n    <xhtml:link rel="alternate" hreflang="en-US" href="${altEn}" />\n    <xhtml:link rel="alternate" hreflang="es-US" href="${altEs}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${altEn}" />`
    : '';
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${alternates}
  </url>`;
}

export const GET: RequestHandler = async ({ platform }) => {
  const db = getDB(platform);

  const practiceUrls = en.practice.areas.map((a) => ({
    url: `/practice-areas/${a.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: TODAY,
  }));

  let postUrls: Array<{ url: string; priority: string; changefreq: string; lastmod: string }> = [];

  // D1 being unavailable (quota exceeded, transient outage) shouldn't break the whole
  // sitemap — the static/practice-area URLs above don't need D1, so still serve those.
  if (db) {
    try {
      const { posts } = await getPosts(db, { page: 1, limit: 10000 });
      postUrls = posts.map((p) => ({
        url: `/news-and-blogs/${p.slug}`,
        priority: '0.7',
        changefreq: 'yearly',
        lastmod: p.updated_at || p.created_at,
      }));
    } catch (err) {
      console.error('Sitemap blog query failed, serving static URLs only:', err);
    }
  }

  const translatedUrls = [...TRANSLATED_PAGES, ...practiceUrls];

  const entries = [
    ...translatedUrls.flatMap((u) => [
      urlEntry(u.url, u.priority, u.changefreq, u.lastmod, true),
      urlEntry(u.url === '/' ? '/es' : `/es${u.url}`, u.priority, u.changefreq, u.lastmod, false),
    ]),
    // Blog post bodies stay English-only — no /es alternate, no hreflang block.
    ...postUrls.map((u) => urlEntry(u.url, u.priority, u.changefreq, u.lastmod, false)),
    ...ENGLISH_ONLY_PAGES.map((u) => urlEntry(u.url, u.priority, u.changefreq, u.lastmod, false)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
