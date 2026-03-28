import { getPosts } from '$lib/server/posts';
import { practiceAreas } from '$lib/data/practiceAreas';
import type { RequestHandler } from './$types';

const SITE = 'https://counselhound.com';

const STATIC_PAGES = [
  { url: '/',               priority: '1.0', changefreq: 'weekly'  },
  { url: '/about',          priority: '0.8', changefreq: 'monthly' },
  { url: '/contact',        priority: '0.8', changefreq: 'monthly' },
  { url: '/news-and-blogs', priority: '0.9', changefreq: 'daily'   },
];

export const GET: RequestHandler = async () => {
  const { posts } = getPosts({ page: 1, limit: 10000 });

  const practiceUrls = practiceAreas.map(a => ({
    url: `/practice-areas/${a.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const postUrls = posts.map(p => ({
    url: `/news-and-blogs/${p.slug}`,
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: p.created_at,
  }));

  const allUrls = [...STATIC_PAGES, ...practiceUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(u => `  <url>
    <loc>${SITE}${u.url}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
