import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAllPosts, createPost, updatePost, deletePost } from '$lib/server/posts';
import { getDB } from '$lib/server/db';

export const load: PageServerLoad = async ({ url, platform }) => {
  const db = getDB(platform);
  const pg    = Number(url.searchParams.get('page') || '1');
  const q     = url.searchParams.get('q') || '';
  const limit = 20;

  if (!db) return { posts: [], total: 0, page: pg, limit, q };

  const { posts, total } = await getAllPosts(db, { page: pg, limit, q });
  return { posts, total, page: pg, limit, q };
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const title    = (fd.get('title')    as string)?.trim();
    const slug     = (fd.get('slug')     as string)?.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const excerpt  = (fd.get('excerpt')  as string)?.trim() || '';
    const content  = (fd.get('content')  as string)?.trim() || '';
    const category = (fd.get('category') as string)?.trim() || 'Blog';
    const tagsRaw  = (fd.get('tags')     as string)?.trim() || '';
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!title || !slug || !content) return fail(400, { error: 'Title, slug, and content are required.' });

    try {
      await createPost(db, { slug, title, excerpt, content, category, tags, published: true, created_at: new Date().toISOString() });
    } catch (e: unknown) {
      return fail(400, { error: e instanceof Error ? e.message : 'Unknown error' });
    }

    throw redirect(303, '/admin/posts');
  },

  update: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const slug      = fd.get('slug')      as string;
    const title     = (fd.get('title')    as string)?.trim();
    const excerpt   = (fd.get('excerpt')  as string)?.trim() || '';
    const content   = (fd.get('content')  as string)?.trim() || '';
    const category  = (fd.get('category') as string)?.trim() || 'Blog';
    const published = fd.get('published') === '1';
    const tagsRaw   = (fd.get('tags')     as string)?.trim() || '';
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    await updatePost(db, slug, { title, excerpt, content, category, tags, published });
    throw redirect(303, '/admin/posts');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const slug = fd.get('slug') as string;
    await deletePost(db, slug);
    throw redirect(303, '/admin/posts');
  },

  toggle: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const slug      = fd.get('slug')      as string;
    const published = fd.get('published') === '1';
    await updatePost(db, slug, { published });
    throw redirect(303, '/admin/posts');
  },
};
