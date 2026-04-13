<script lang="ts">
  import './app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { lang } from '$lib/i18n';

  let { children } = $props();

  const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0D1B2A" />
  <link rel="icon" type="image/svg+xml" href={favicon} />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
  <link rel="apple-touch-icon" sizes="512x512" href="/apple-touch-icon.png" />
  <!-- Playfair Display self-hosted — see /src/app.css -->
  <!-- Default OG / Twitter fallbacks (individual pages override these) -->
  <meta property="og:site_name" content="Counsel Hound" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Counsel Hound — Serious Results for Serious Injuries" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@counselhound" />
  <meta name="twitter:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:image:alt" content="Counsel Hound — Serious Results for Serious Injuries" />
  <!-- Cloudflare Web Analytics -->
  {@html `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token":"REPLACE_WITH_CF_ANALYTICS_TOKEN"}'></script>`}
  <!-- JSON-LD: Organization -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Counsel Hound",
    "url": "https://counselhound.com",
    "logo": "https://counselhound.com/main-logo.svg",
    "image": "https://counselhound.com/og-default.jpg",
    "description": "Counsel Hound connects injured people with vetted personal injury attorneys across the United States — free of charge.",
    "telephone": "+18558046863",
    "email": "info@counselhound.com",
    "address": [
      { "@type": "PostalAddress", "streetAddress": "231 22nd St S #203", "addressLocality": "Birmingham", "addressRegion": "AL", "postalCode": "35233", "addressCountry": "US" },
      { "@type": "PostalAddress", "streetAddress": "201 S Biscayne Blvd #8910", "addressLocality": "Miami", "addressRegion": "FL", "postalCode": "33131", "addressCountry": "US" },
      { "@type": "PostalAddress", "streetAddress": "12 Greenway Plz #1100", "addressLocality": "Houston", "addressRegion": "TX", "postalCode": "77027", "addressCountry": "US" }
    ],
    "areaServed": "US",
    "priceRange": "Free",
    "founder": {
      "@type": "Person",
      "name": "Richard Frankowski",
      "jobTitle": "CEO & Founder"
    },
    "sameAs": [
      "https://www.facebook.com/CounselHound",
      "https://www.instagram.com/counselhound",
      "https://x.com/counselhound"
    ]
  })}</script>`}
</svelte:head>

{#if isAdmin}
  {@render children()}
{:else}
  <Nav />
  <main>
    {@render children()}
  </main>
  <Footer />
{/if}
