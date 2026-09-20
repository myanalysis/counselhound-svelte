import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDB } from '$lib/server/db';

export type Referral = {
  id: number;
  referring_name: string;
  referring_firm: string;
  referring_email: string;
  referring_phone: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  matter: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export const load: PageServerLoad = async ({ platform, url }) => {
  const db = getDB(platform);
  if (!db) return { referrals: [], counts: { total: 0, new: 0, active: 0, closed: 0 } };

  const filter = url.searchParams.get('status') || 'all';
  const whereClause = filter !== 'all' ? `WHERE status = '${filter}'` : '';

  const [{ results }, countsRows] = await Promise.all([
    db.prepare(`SELECT * FROM counselhound_referrals ${whereClause} ORDER BY created_at DESC`).all(),
    db.prepare(`
      SELECT status, COUNT(*) as cnt FROM counselhound_referrals GROUP BY status
    `).all(),
  ]);

  const counts = { total: 0, new: 0, active: 0, closed: 0 };
  for (const row of (countsRows.results as Array<{ status: string; cnt: number }>)) {
    counts.total += row.cnt;
    if (row.status === 'new') counts.new = row.cnt;
    if (row.status === 'active') counts.active = row.cnt;
    if (row.status === 'closed') counts.closed = row.cnt;
  }

  return { referrals: results as Referral[], counts, filter };
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const fields = {
      referring_name:  (fd.get('referring_name')  as string)?.trim() || '',
      referring_firm:  (fd.get('referring_firm')  as string)?.trim() || '',
      referring_email: (fd.get('referring_email') as string)?.trim() || '',
      referring_phone: (fd.get('referring_phone') as string)?.trim() || '',
      client_name:     (fd.get('client_name')     as string)?.trim() || '',
      client_email:    (fd.get('client_email')    as string)?.trim() || '',
      client_phone:    (fd.get('client_phone')    as string)?.trim() || '',
      matter:          (fd.get('matter')          as string)?.trim() || '',
    };

    if (!fields.referring_name || !fields.client_name) {
      return fail(400, { error: 'Referring attorney name and client name are required.' });
    }

    await db.prepare(`
      INSERT INTO counselhound_referrals (referring_name, referring_firm, referring_email, referring_phone,
        client_name, client_email, client_phone, matter, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).bind(...Object.values(fields)).run();

    throw redirect(303, '/admin/referrals');
  },

  update: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id     = Number(fd.get('id'));
    const status = (fd.get('status') as string)?.trim() || 'new';
    const notes  = (fd.get('notes')  as string)?.trim() || '';

    await db.prepare(
      "UPDATE counselhound_referrals SET status = ?, notes = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(status, notes, id).run();

    throw redirect(303, '/admin/referrals');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    await db.prepare('DELETE FROM counselhound_referrals WHERE id = ?').bind(Number(fd.get('id'))).run();
    throw redirect(303, '/admin/referrals');
  },
};
