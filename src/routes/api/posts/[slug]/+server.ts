import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPost, incrementViews } from '$lib/server/posts';
import { getDB } from '$lib/server/db';

export const GET: RequestHandler = async ({ params, platform }) => {
  const db = getDB(platform);
  if (!db) throw error(503, 'Database unavailable');
  const post = await getPost(db, params.slug);
  if (!post) throw error(404, 'Not found');
  await incrementViews(db, params.slug);
  return json(post);
};
