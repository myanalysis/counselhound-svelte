import type { D1DB } from './db';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  views: number;
  likes: number;
  // Not in the DB schema yet — always undefined today. Optional so pages can reference it
  // for a future per-post social-share image without breaking; they already fall back to
  // og-default.jpg when it's absent.
  featured_image?: string;
};

function row(r: unknown): Record<string, unknown> {
  return r as Record<string, unknown>;
}

function parsePost(r: unknown): Post {
  const p = row(r);
  return {
    slug:       String(p.slug),
    title:      String(p.title),
    excerpt:    String(p.excerpt ?? ''),
    content:    String(p.content ?? ''),
    category:   String(p.category ?? 'Blog'),
    tags:       (() => { try { return JSON.parse(String(p.tags ?? '[]')) } catch { return [] } })(),
    published:  p.published === 1 || p.published === true,
    created_at: String(p.created_at),
    updated_at: String(p.updated_at ?? p.created_at),
    views:      Number(p.views ?? 0),
    likes:      Number(p.likes ?? 0),
  };
}

// Same fix as frankowskifirm-svelte's posts.ts — COUNT(*) reads every matching row
// regardless of indexing, and it was being recomputed on every distinct
// /news-and-blogs?page=N&tag=X&q=Y combination. Decoupled and cached with a long TTL since
// the post count only changes when someone publishes.
// Lazy — accessing the `caches` global at module load time (rather than inside a function,
// called only at actual request time) crashes SvelteKit's build-time route analysis, which
// runs this module in plain Node.js and has no `caches` global at all.
type LooseCache = { match(r: unknown): Promise<Response | undefined>; put(r: unknown, res: unknown): Promise<void> };
function getEdgeCache(): LooseCache | null {
  if (typeof caches === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- caches.default isn't in DOM lib types
  return (caches as any).default as LooseCache;
}

async function cachedCount(db: D1DB, table: string, where: string, params: unknown[]): Promise<number> {
  const edgeCache = getEdgeCache();
  const cacheKey = `https://internal-cache.invalid/count/${table}/${encodeURIComponent(where)}/${encodeURIComponent(JSON.stringify(params))}`;
  const cached = await edgeCache?.match(cacheKey);
  if (cached) return Number(await cached.text());

  const result = await db.prepare(`SELECT COUNT(*) as total FROM ${table} WHERE ${where}`).bind(...params).first();
  const total = (row(result).total as number) ?? 0;

  await edgeCache?.put(
    cacheKey,
    new Response(String(total), { headers: { 'Cache-Control': 'public, max-age=3600' } })
  );
  return total;
}

export async function getPosts(
  db: D1DB,
  { page = 1, limit = 12, q = '', tag = '' } = {}
): Promise<{ posts: Post[]; total: number }> {
  const offset = (page - 1) * limit;
  const conditions: string[] = ['published = 1'];
  const params: unknown[] = [];

  if (q) {
    conditions.push('(title LIKE ? OR excerpt LIKE ?)');
    params.push(`%${q}%`, `%${q}%`);
  }
  if (tag) {
    conditions.push('tags LIKE ?');
    params.push(`%${tag}%`);
  }

  const where = conditions.join(' AND ');

  const [listResult, total] = await Promise.all([
    db.prepare(
      `SELECT slug,title,excerpt,category,tags,published,likes,views,created_at,updated_at FROM counselhound_posts WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(...params, limit, offset).all(),
    cachedCount(db, 'counselhound_posts', where, params),
  ]);

  return { posts: listResult.results.map(parsePost), total };
}

export async function getPost(db: D1DB, slug: string): Promise<Post | null> {
  const r = await db.prepare(
    'SELECT * FROM counselhound_posts WHERE slug = ? AND published = 1'
  ).bind(slug).first();
  return r ? parsePost(r) : null;
}

export async function getRecentPosts(db: D1DB, n = 3): Promise<Post[]> {
  const { results } = await db.prepare(
    'SELECT slug,title,excerpt,category,tags,likes,views,created_at,updated_at FROM counselhound_posts WHERE published = 1 ORDER BY created_at DESC LIMIT ?'
  ).bind(n).all();
  return results.map(parsePost);
}

export async function getAllPosts(
  db: D1DB,
  { page = 1, limit = 20, q = '' } = {}
): Promise<{ posts: Post[]; total: number }> {
  const offset = (page - 1) * limit;
  const params: unknown[] = [];
  let where = '1=1';
  if (q) {
    where = 'title LIKE ?';
    params.push(`%${q}%`);
  }

  const [listResult, total] = await Promise.all([
    db.prepare(
      `SELECT slug,title,excerpt,category,tags,published,likes,views,created_at,updated_at FROM counselhound_posts WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(...params, limit, offset).all(),
    cachedCount(db, 'counselhound_posts', where, params),
  ]);
  return { posts: listResult.results.map(parsePost), total };
}

export async function incrementLikes(db: D1DB, slug: string): Promise<number> {
  await db.prepare('UPDATE counselhound_posts SET likes = likes + 1 WHERE slug = ?').bind(slug).run();
  const r = await db.prepare('SELECT likes FROM counselhound_posts WHERE slug = ?').bind(slug).first();
  return r ? (row(r).likes as number) : 0;
}

export async function incrementViews(db: D1DB, slug: string): Promise<void> {
  await db.prepare('UPDATE counselhound_posts SET views = views + 1 WHERE slug = ?').bind(slug).run();
}

export async function createPost(
  db: D1DB,
  data: Omit<Post, 'views' | 'likes' | 'updated_at'>
): Promise<Post> {
  const now = new Date().toISOString();
  await db.prepare(
    'INSERT INTO counselhound_posts (slug,title,excerpt,content,category,tags,published,likes,views,created_at,updated_at) VALUES (?,?,?,?,?,?,?,0,0,?,?)'
  ).bind(
    data.slug, data.title, data.excerpt, data.content, data.category ?? 'Blog',
    JSON.stringify(data.tags ?? []),
    data.published ? 1 : 0,
    data.created_at ?? now, now
  ).run();
  const post = await db.prepare('SELECT * FROM counselhound_posts WHERE slug = ?').bind(data.slug).first();
  if (!post) throw new Error('Post creation failed');
  return parsePost(post);
}

export async function updatePost(
  db: D1DB,
  slug: string,
  data: Partial<Omit<Post, 'slug' | 'views' | 'likes'>>
): Promise<Post> {
  const now = new Date().toISOString();
  const fields: string[] = [];
  const params: unknown[] = [];

  if (data.title      !== undefined) { fields.push('title = ?');      params.push(data.title); }
  if (data.excerpt    !== undefined) { fields.push('excerpt = ?');     params.push(data.excerpt); }
  if (data.content    !== undefined) { fields.push('content = ?');     params.push(data.content); }
  if (data.category   !== undefined) { fields.push('category = ?');    params.push(data.category); }
  if (data.tags       !== undefined) { fields.push('tags = ?');        params.push(JSON.stringify(data.tags)); }
  if (data.published  !== undefined) { fields.push('published = ?');   params.push(data.published ? 1 : 0); }
  if (data.created_at !== undefined) { fields.push('created_at = ?');  params.push(data.created_at); }
  fields.push('updated_at = ?'); params.push(now);
  params.push(slug);

  await db.prepare(`UPDATE counselhound_posts SET ${fields.join(', ')} WHERE slug = ?`).bind(...params).run();
  const r = await db.prepare('SELECT * FROM counselhound_posts WHERE slug = ?').bind(slug).first();
  if (!r) throw new Error('Post not found after update');
  return parsePost(r);
}

export async function deletePost(db: D1DB, slug: string): Promise<void> {
  await db.prepare('DELETE FROM counselhound_posts WHERE slug = ?').bind(slug).run();
}
