import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDB } from '$lib/server/db';

export type Attorney = {
  id: number;
  slug: string;
  name: string;
  title: string;
  firm: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  bio: string;
  photo_url: string;
  practice_areas: string;
  is_active: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);
  if (!db) return { attorneys: [] };

  const { results } = await db.prepare(
    'SELECT * FROM counselhound_attorneys ORDER BY sort_order ASC, name ASC'
  ).all();

  return { attorneys: results as Attorney[] };
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const name  = (fd.get('name') as string)?.trim();
    const slug  = slugify((fd.get('slug') as string)?.trim() || name || '');
    const title = (fd.get('title') as string)?.trim() || '';
    const firm  = (fd.get('firm')  as string)?.trim() || '';
    const email = (fd.get('email') as string)?.trim() || '';
    const phone = (fd.get('phone') as string)?.trim() || '';
    const state = (fd.get('state') as string)?.trim() || '';
    const city  = (fd.get('city')  as string)?.trim() || '';
    const bio   = (fd.get('bio')   as string)?.trim() || '';
    const photo = (fd.get('photo_url') as string)?.trim() || '';
    const areasRaw = (fd.get('practice_areas') as string)?.trim() || '';
    const areas = JSON.stringify(areasRaw.split(',').map(a => a.trim()).filter(Boolean));

    if (!name) return fail(400, { error: 'Name is required.' });

    try {
      await db.prepare(`
        INSERT INTO counselhound_attorneys (slug, name, title, firm, email, phone, state, city, bio, photo_url, practice_areas)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(slug, name, title, firm, email, phone, state, city, bio, photo, areas).run();
    } catch (e: unknown) {
      return fail(400, { error: e instanceof Error ? e.message : 'Slug already exists.' });
    }

    throw redirect(303, '/admin/attorneys');
  },

  update: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd   = await request.formData();
    const id   = Number(fd.get('id'));
    const name = (fd.get('name')  as string)?.trim() || '';
    const title = (fd.get('title') as string)?.trim() || '';
    const firm  = (fd.get('firm')  as string)?.trim() || '';
    const email = (fd.get('email') as string)?.trim() || '';
    const phone = (fd.get('phone') as string)?.trim() || '';
    const state = (fd.get('state') as string)?.trim() || '';
    const city  = (fd.get('city')  as string)?.trim() || '';
    const bio   = (fd.get('bio')   as string)?.trim() || '';
    const photo = (fd.get('photo_url') as string)?.trim() || '';
    const areasRaw = (fd.get('practice_areas') as string)?.trim() || '';
    const areas = JSON.stringify(areasRaw.split(',').map(a => a.trim()).filter(Boolean));

    await db.prepare(`
      UPDATE counselhound_attorneys
      SET name = ?, title = ?, firm = ?, email = ?, phone = ?, state = ?, city = ?,
          bio = ?, photo_url = ?, practice_areas = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(name, title, firm, email, phone, state, city, bio, photo, areas, id).run();

    throw redirect(303, '/admin/attorneys');
  },

  toggleActive: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd        = await request.formData();
    const id        = Number(fd.get('id'));
    const is_active = fd.get('is_active') === '1' ? 0 : 1;

    await db.prepare(
      "UPDATE counselhound_attorneys SET is_active = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(is_active, id).run();

    throw redirect(303, '/admin/attorneys');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    await db.prepare('DELETE FROM counselhound_attorneys WHERE id = ?').bind(Number(fd.get('id'))).run();
    throw redirect(303, '/admin/attorneys');
  },
};
