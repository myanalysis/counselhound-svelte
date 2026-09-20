import { fail, redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export type AdminUser = {
  id: number;
  email: string;
  name: string;
  is_active: number;
  created_at: string;
};

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);
  if (!db) return { users: null };

  const { results } = await db.prepare(
    'SELECT * FROM admin_users ORDER BY created_at ASC'
  ).all();

  return { users: results as AdminUser[] };
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const email = (fd.get('email') as string)?.trim().toLowerCase();
    const name  = (fd.get('name')  as string)?.trim() || '';

    if (!email || !email.includes('@')) {
      return fail(400, { error: 'Valid email required' });
    }

    try {
      await db.prepare(
        'INSERT INTO admin_users (email, name) VALUES (?, ?)'
      ).bind(email, name).run();
    } catch {
      return fail(400, { error: 'That email is already a user' });
    }

    throw redirect(303, '/admin/users');
  },

  toggle: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id        = Number(fd.get('id'));
    const is_active = fd.get('is_active') === '1' ? 0 : 1;

    await db.prepare(
      'UPDATE admin_users SET is_active = ? WHERE id = ?'
    ).bind(is_active, id).run();

    throw redirect(303, '/admin/users');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id = Number(fd.get('id'));

    await db.prepare('DELETE FROM admin_users WHERE id = ?').bind(id).run();

    throw redirect(303, '/admin/users');
  },
};
