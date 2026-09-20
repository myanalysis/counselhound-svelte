import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/posts';
import { getDB } from '$lib/server/db';

export const load: PageServerLoad = async ({ url, platform }) => {
  const db = getDB(platform);
  if (!db) return { posts: [], total: 0, page: 1, limit: 12, q: '', tag: '' };
  const page = Number(url.searchParams.get('page') || '1');
  const q = url.searchParams.get('q') || '';
  const tag = url.searchParams.get('tag') || '';
  const limit = 12;
  try {
    const { posts: rawPosts, total } = await getPosts(db, { page, limit, q, tag });
    const posts = rawPosts.map(({ content: _content, ...p }) => p);
    return { posts, total, page, limit, q, tag };
  } catch (err) {
    console.error('Blog listing D1 load failed, degrading gracefully:', err);
    return { posts: [], total: 0, page, limit, q, tag };
  }
};
