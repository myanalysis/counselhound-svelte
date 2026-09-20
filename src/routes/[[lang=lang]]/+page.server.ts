import type { PageServerLoad } from './$types';
import { getRecentPosts } from '$lib/server/posts';
import { getDB } from '$lib/server/db';

type Testimonial = { id: number; client_name: string; quote: string };

async function fetchLiveReviews(): Promise<Testimonial[]> {
  try {
    const res = await fetch(
      'https://app.trustanalytica.com/api/test/getPaginatedReviews?page=1&partnerId=75567',
      { headers: { 'Accept': 'application/json' } }
    );
    if (!res.ok) return [];
    const data = await res.json() as { reviews?: { author: string; text: string }[] };
    return (data.reviews ?? [])
      .filter(r => r.text?.trim())
      .map((r, i) => ({ id: i + 1, client_name: r.author, quote: r.text }));
  } catch {
    return [];
  }
}

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDB(platform);
  if (!db) return { recentPosts: [], testimonials: [], caseResults: [] };

  // D1 being unavailable (quota exceeded, transient outage) shouldn't 500 the homepage —
  // degrade to empty sections instead. Not specific to today's quota incident; any D1
  // hiccup was crashing the whole page before this.
  try {
    const [posts, { results: caseResults }, liveReviews] = await Promise.all([
      getRecentPosts(db, 3),
      db.prepare(
        'SELECT amount, description, category FROM counselhound_case_results WHERE is_published = 1 ORDER BY sort_order DESC, id ASC'
      ).all(),
      fetchLiveReviews(),
    ]);

    let testimonials: Testimonial[] = liveReviews;
    if (testimonials.length === 0) {
      const { results } = await db.prepare(
        'SELECT id, client_name, quote FROM counselhound_testimonials WHERE is_published = 1 ORDER BY sort_order ASC, id ASC'
      ).all();
      testimonials = results as Testimonial[];
    }

    return {
      recentPosts: posts.map(({ content: _content, ...p }) => p),
      testimonials,
      caseResults: caseResults as { amount: string; description: string; category: string }[],
    };
  } catch (err) {
    console.error('Homepage D1 load failed, degrading gracefully:', err);
    return { recentPosts: [], testimonials: [], caseResults: [] };
  }
};
