import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDB } from '$lib/server/db';

export type Testimonial = {
  id: number;
  client_name: string;
  quote: string;
  is_published: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);
  if (!db) return { testimonials: [] };

  const { results } = await db.prepare(
    'SELECT * FROM counselhound_testimonials ORDER BY sort_order DESC, created_at DESC'
  ).all();

  return { testimonials: results as Testimonial[] };
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const client_name = (fd.get('client_name') as string)?.trim();
    const quote       = (fd.get('quote')       as string)?.trim();
    const sort_order  = Number(fd.get('sort_order') || 0);

    if (!client_name || !quote) return fail(400, { error: 'Client name and quote are required.' });

    await db.prepare(
      'INSERT INTO counselhound_testimonials (client_name, quote, sort_order) VALUES (?, ?, ?)'
    ).bind(client_name, quote, sort_order).run();

    throw redirect(303, '/admin/testimonials');
  },

  update: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id          = Number(fd.get('id'));
    const client_name = (fd.get('client_name') as string)?.trim();
    const quote       = (fd.get('quote')       as string)?.trim();
    const sort_order  = Number(fd.get('sort_order') || 0);

    if (!client_name || !quote) return fail(400, { error: 'Client name and quote are required.' });

    await db.prepare(
      "UPDATE counselhound_testimonials SET client_name = ?, quote = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(client_name, quote, sort_order, id).run();

    throw redirect(303, '/admin/testimonials');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id = Number(fd.get('id'));
    await db.prepare('DELETE FROM counselhound_testimonials WHERE id = ?').bind(id).run();

    throw redirect(303, '/admin/testimonials');
  },

  toggle: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id           = Number(fd.get('id'));
    const is_published = fd.get('is_published') === '1' ? 1 : 0;
    await db.prepare('UPDATE counselhound_testimonials SET is_published = ? WHERE id = ?').bind(is_published, id).run();

    throw redirect(303, '/admin/testimonials');
  },
};
