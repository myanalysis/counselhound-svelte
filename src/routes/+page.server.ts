import type { PageServerLoad } from './$types';
import { getRecentPosts } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
  const posts = getRecentPosts(3).map(({ content: _content, ...p }) => p);
  return { recentPosts: posts };
};
