import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDB } from '$lib/server/db';

export type CaseResult = {
  id: number;
  amount: string;
  amount_cents: number;
  description: string;
  category: string;
  year: number | null;
  is_published: number;
  sort_order: number;
  created_at: string;
};

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);
  if (!db) return { results: [] };

  const { results } = await db.prepare(
    'SELECT * FROM counselhound_case_results ORDER BY sort_order DESC, created_at DESC'
  ).all();

  return { results: results as CaseResult[] };
};

function parseCents(amount: string): number {
  const digits = amount.replace(/[^0-9.]/g, '');
  return Math.round(parseFloat(digits || '0') * 100);
}

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const amount      = (fd.get('amount')      as string)?.trim();
    const description = (fd.get('description') as string)?.trim() || '';
    const category    = (fd.get('category')    as string)?.trim() || '';
    const year        = fd.get('year') ? Number(fd.get('year')) : null;
    const sort_order  = Number(fd.get('sort_order') || 0);

    if (!amount) return fail(400, { error: 'Amount is required.' });

    const amount_cents = parseCents(amount);

    await db.prepare(
      'INSERT INTO counselhound_case_results (amount, amount_cents, description, category, year, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(amount, amount_cents, description, category, year, sort_order).run();

    throw redirect(303, '/admin/case-results');
  },

  update: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id          = Number(fd.get('id'));
    const amount      = (fd.get('amount')      as string)?.trim();
    const description = (fd.get('description') as string)?.trim() || '';
    const category    = (fd.get('category')    as string)?.trim() || '';
    const year        = fd.get('year') ? Number(fd.get('year')) : null;
    const sort_order  = Number(fd.get('sort_order') || 0);
    const amount_cents = parseCents(amount ?? '');

    await db.prepare(
      'UPDATE counselhound_case_results SET amount = ?, amount_cents = ?, description = ?, category = ?, year = ?, sort_order = ? WHERE id = ?'
    ).bind(amount, amount_cents, description, category, year, sort_order, id).run();

    throw redirect(303, '/admin/case-results');
  },

  delete: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id = Number(fd.get('id'));
    await db.prepare('DELETE FROM counselhound_case_results WHERE id = ?').bind(id).run();

    throw redirect(303, '/admin/case-results');
  },

  toggle: async ({ request, platform }) => {
    const db = getDB(platform);
    if (!db) return fail(503, { error: 'Database unavailable' });

    const fd = await request.formData();
    const id           = Number(fd.get('id'));
    const is_published = fd.get('is_published') === '1' ? 1 : 0;
    await db.prepare('UPDATE counselhound_case_results SET is_published = ? WHERE id = ?').bind(is_published, id).run();

    throw redirect(303, '/admin/case-results');
  },
};
