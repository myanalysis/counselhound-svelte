import { error } from '@sveltejs/kit';
import { langOf, dictOf } from '$lib/i18n/dict';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const lang = langOf(params.lang);
  const dict = dictOf(lang);
  const area = dict.practice.areas.find((a) => a.slug === params.category);
  if (!area) error(404, 'Practice area not found');
  return { area, ui: dict.practice.ui };
};
