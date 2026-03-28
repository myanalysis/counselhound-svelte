import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { incrementLikes } from '$lib/server/posts';

export const POST: RequestHandler = async ({ params }) => {
  const likes = incrementLikes(params.slug);
  if (likes === 0) throw error(404, 'Not found');
  return json({ likes });
};
