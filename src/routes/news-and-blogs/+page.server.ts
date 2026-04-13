import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/posts';

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || '1');
  const q = url.searchParams.get('q') || '';
  const tag = url.searchParams.get('tag') || '';
  const limit = 12;
  const { posts: rawPosts, total } = getPosts({ page, limit, q, tag });
  const posts = rawPosts.map(({ content: _content, ...p }) => p);
  return { posts, total, page, limit, q, tag };
};
