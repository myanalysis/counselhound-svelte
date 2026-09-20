import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDB } from '$lib/server/db';

function row(r: unknown): Record<string, unknown> {
  return r as Record<string, unknown>;
}

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);

  if (!db) {
    return {
      counts: { contacts: 0, posts: 0, caseResults: 0, testimonials: 0, newContacts: 0 },
      recentContacts: [],
    };
  }

  const [contactsRow, newContactsRow, postsRow, caseResultsRow, testimonialsRow, recentResult] =
    await Promise.all([
      db.prepare('SELECT COUNT(*) as total FROM counselhound_contacts').first(),
      db.prepare("SELECT COUNT(*) as total FROM counselhound_contacts WHERE status = 'new'").first(),
      db.prepare('SELECT COUNT(*) as total FROM counselhound_posts').first(),
      db.prepare('SELECT COUNT(*) as total FROM counselhound_case_results').first(),
      db.prepare('SELECT COUNT(*) as total FROM counselhound_testimonials').first(),
      db.prepare(
        'SELECT id, first_name, last_name, email, phone, case_type, status, created_at FROM counselhound_contacts ORDER BY created_at DESC LIMIT 5'
      ).all(),
    ]);

  return {
    counts: {
      contacts:     Number(row(contactsRow).total ?? 0),
      newContacts:  Number(row(newContactsRow).total ?? 0),
      posts:        Number(row(postsRow).total ?? 0),
      caseResults:  Number(row(caseResultsRow).total ?? 0),
      testimonials: Number(row(testimonialsRow).total ?? 0),
    },
    recentContacts: recentResult.results as Array<Record<string, unknown>>,
  };
};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete('admin_session', { path: '/' });
    throw redirect(303, '/admin/login');
  },
};
