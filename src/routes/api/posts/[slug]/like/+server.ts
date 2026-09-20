import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { incrementLikes } from '$lib/server/posts';
import { getDB } from '$lib/server/db';

export const POST: RequestHandler = async ({ params, platform }) => {
  const db = getDB(platform);
  if (!db) throw error(503, 'Database unavailable');
  const likes = await incrementLikes(db, params.slug);
  return json({ likes });
};
