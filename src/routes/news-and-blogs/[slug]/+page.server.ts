import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost, incrementViews } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
  const post = getPost(params.slug);
  if (!post) throw error(404, 'Post not found');
  incrementViews(params.slug);
  return { post };
};
