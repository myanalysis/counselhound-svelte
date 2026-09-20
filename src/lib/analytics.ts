// GA4 wrapper. No-ops everywhere if PUBLIC_GA_ID isn't set — same pattern as
// frankowskifirm-svelte and bad-broker-svelte. Loaded/initialized from +layout.svelte;
// call trackEvent(...) from anywhere client-side.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Injects gtag.js and fires the initial config call. Call once, client-side only. */
export function initGA(measurementId: string) {
  if (!measurementId || initialized || typeof window === 'undefined') return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  // send_page_view off — we fire page_view ourselves on SvelteKit navigation
  window.gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/** Fire any GA4 event. Safe to call even if analytics is disabled/not yet loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

export function trackPageView(path: string, title: string) {
  trackEvent('page_view', { page_path: path, page_title: title });
}
