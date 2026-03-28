import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPost, incrementViews } from '$lib/server/posts';

export const GET: RequestHandler = async ({ params }) => {
  const post = getPost(params.slug);
  if (!post) throw error(404, 'Not found');
  incrementViews(params.slug);
  return json(post);
};
