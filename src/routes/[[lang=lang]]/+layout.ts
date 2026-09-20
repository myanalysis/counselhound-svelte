import { langOf } from '$lib/i18n/index.svelte';
import type { LayoutLoad } from './$types';

// Site is SSR on Cloudflare Workers (blog is D1-backed) — not fully static, so we do NOT
// prerender everything here.
export const load: LayoutLoad = ({ params }) => ({ lang: langOf(params.lang) });
