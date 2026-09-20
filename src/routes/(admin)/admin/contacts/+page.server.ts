import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDB } from '$lib/server/db';

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  case_type: string;
  message: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);
  if (!db) return { contacts: [] };

  const { results } = await db.prepare(
    'SELECT * FROM counselhound_contacts ORDER BY created_at DESC'
  ).all();

  return { contacts: results as Contact[] };
};

export const actions: Actions = {
  updateStatus: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id     = Number(fd.get('id'));
    const status = (fd.get('status') as string)?.trim() || 'new';
    const notes  = (fd.get('notes')  as string)?.trim() || '';

    await db.prepare(
      "UPDATE counselhound_contacts SET status = ?, notes = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(status, notes, id).run();

    throw redirect(303, '/admin/contacts');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id = Number(fd.get('id'));
    await db.prepare('DELETE FROM counselhound_contacts WHERE id = ?').bind(id).run();

    throw redirect(303, '/admin/contacts');
  },
};
