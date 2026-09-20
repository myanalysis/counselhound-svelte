import { page } from '$app/state';
import { type Dict, type Lang, dicts, langOf, localize, delocalize } from './dict';

export * from './dict';

// Reactive accessors for templates — read page state under the hood, so they track navigation.
export const i18n = {
  // Unmatched URLs (404s) never bind the [[lang]] param, so fall back to the path prefix.
  get lang(): Lang { return langOf(page.params.lang ?? (page.url.pathname === '/es' || page.url.pathname.startsWith('/es/') ? 'es' : undefined)); },
  get t(): Dict { return dicts[this.lang]; },
  get other(): Lang { return this.lang === 'es' ? 'en' : 'es'; },
  href(path: string) { return localize(path, this.lang); },
  /** The same page in the other language — for the toggle and hreflang. */
  altHref(to: Lang) { return localize(delocalize(page.url.pathname), to); }
};
