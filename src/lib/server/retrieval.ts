import postsData from '../../../data/posts.json';

type Post = { slug: string; title: string; excerpt: string; content: string; tags: string[] };

const _posts: Post[] = (postsData as any[])
  .filter((p: any) => p.published)
  .map((p: any) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || '',
    content: p.content || '',
    tags: p.tags || [],
  }));

function score(post: Post, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 3);
  let s = 0;
  if (post.title.toLowerCase().includes(q)) s += 10;
  for (const word of words) {
    if (post.title.toLowerCase().includes(word)) s += 3;
    if (post.tags.some(t => t.toLowerCase().includes(word))) s += 2;
    if (post.excerpt.toLowerCase().includes(word)) s += 1;
  }
  return s;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function retrieve(query: string, n = 3): string {
  const scored = _posts
    .map(p => ({ p, s: score(p, query) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n);

  if (scored.length === 0) return '';

  return scored.map(({ p }) => {
    const body = stripHtml(p.content).slice(0, 600);
    return `## ${p.title}\n${p.excerpt}\n${body}`;
  }).join('\n\n---\n\n');
}
