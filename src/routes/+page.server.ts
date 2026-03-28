import type { PageServerLoad } from './$types';
import { getRecentPosts } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
  return { recentPosts: getRecentPosts(3) };
};
