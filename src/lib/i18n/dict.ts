// Locale plumbing with no runtime dependency on $app/state — safe to import from server loads and endpoints.
import { en } from './en';
import { es } from './es';

export type Lang = 'en' | 'es';
export type Dict = typeof en;
export const LANGS: Lang[] = ['en', 'es'];
export const dicts: Record<Lang, Dict> = { en, es };

export const langOf = (param: string | undefined): Lang => (param === 'es' ? 'es' : 'en');
export const dictOf = (lang: Lang): Dict => dicts[lang];

/** Prefix a site-relative path for a locale. English is unprefixed. */
export const localize = (path: string, lang: Lang) => (lang === 'es' ? (path === '/' ? '/es' : `/es${path}`) : path);
/** Strip a locale prefix back to the canonical English path. */
export const delocalize = (pathname: string) => (pathname === '/es' ? '/' : pathname.replace(/^\/es(?=\/)/, ''));
