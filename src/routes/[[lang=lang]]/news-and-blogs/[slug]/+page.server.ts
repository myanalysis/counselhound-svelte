import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost, incrementViews } from '$lib/server/posts';
import { getDB } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, platform }) => {
  const db = getDB(platform);
  if (!db) throw error(503, 'Database unavailable');
  let post;
  try {
    post = await getPost(db, params.slug);
  } catch (err) {
    // Distinct from a genuine 404 — a D1 outage isn't "this post doesn't exist," and
    // treating it as one risks Google deindexing a real page over a transient error.
    console.error('Blog post D1 load failed:', err);
    throw error(503, 'Temporarily unavailable — please try again shortly.');
  }
  if (!post) throw error(404, 'Post not found');
  incrementViews(db, params.slug).catch((err) => console.error('incrementViews failed:', err));
  return { post };
};
