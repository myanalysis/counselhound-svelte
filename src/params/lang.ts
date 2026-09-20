import type { ParamMatcher } from '@sveltejs/kit';
// Only "es" is a locale prefix; anything else falls through to the English routes (and 404s naturally).
export const match: ParamMatcher = (param) => param === 'es';
