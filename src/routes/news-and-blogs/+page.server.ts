import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/posts';

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || '1');
  const q = url.searchParams.get('q') || '';
  const tag = url.searchParams.get('tag') || '';
  const limit = 12;
  const { posts, total } = getPosts({ page, limit, q, tag });
  return { posts, total, page, limit, q, tag };
};
