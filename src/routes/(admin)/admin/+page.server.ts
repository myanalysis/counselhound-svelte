import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAllPosts, createPost, updatePost, deletePost } from '$lib/server/posts';

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || '1');
  const q = url.searchParams.get('q') || '';
  const limit = 20;
  const { posts, total } = getAllPosts({ page, limit, q });
  return { posts, total, page, limit, q };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const fd = await request.formData();
    const title    = (fd.get('title') as string)?.trim();
    const slug     = (fd.get('slug') as string)?.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const excerpt  = (fd.get('excerpt') as string)?.trim() || '';
    const content  = (fd.get('content') as string)?.trim() || '';
    const category = (fd.get('category') as string)?.trim() || 'Blog';
    const tagsRaw  = (fd.get('tags') as string)?.trim() || '';
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!title || !slug || !content) return fail(400, { error: 'Title, slug, and content are required.' });

    try {
      createPost({ slug, title, excerpt, content, category, tags, published: true, likes: 0 });
    } catch (e: any) {
      return fail(400, { error: e.message });
    }

    throw redirect(303, '/admin');
  },

  update: async ({ request }) => {
    const fd = await request.formData();
    const slug      = fd.get('slug') as string;
    const title     = (fd.get('title') as string)?.trim();
    const excerpt   = (fd.get('excerpt') as string)?.trim() || '';
    const content   = (fd.get('content') as string)?.trim() || '';
    const category  = (fd.get('category') as string)?.trim() || 'Blog';
    const published = fd.get('published') === '1';
    const tagsRaw   = (fd.get('tags') as string)?.trim() || '';
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    updatePost(slug, { title, excerpt, content, category, tags, published });
    throw redirect(303, '/admin');
  },

  delete: async ({ request }) => {
    const fd = await request.formData();
    const slug = fd.get('slug') as string;
    deletePost(slug);
    throw redirect(303, '/admin');
  },

  toggle: async ({ request }) => {
    const fd = await request.formData();
    const slug = fd.get('slug') as string;
    const published = fd.get('published') === '1';
    updatePost(slug, { published });
    throw redirect(303, '/admin');
  },

  logout: async ({ cookies }) => {
    cookies.delete('admin_session', { path: '/' });
    throw redirect(303, '/admin/login');
  },
};
