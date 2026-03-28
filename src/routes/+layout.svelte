<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';

  let { children } = $props();

  const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href={favicon} />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
  <link rel="apple-touch-icon" sizes="512x512" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
  <!-- Default OG / Twitter fallbacks (pages override these) -->
  <meta property="og:site_name" content="Counsel Hound" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@counselhound" />
  <meta name="twitter:image" content="https://counselhound.com/og-default.jpg" />
  <!-- JSON-LD: Organization -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Counsel Hound",
    "url": "https://counselhound.com",
    "logo": "https://counselhound.com/main-logo.svg",
    "description": "Counsel Hound connects injured people with vetted personal injury attorneys across the United States — free of charge.",
    "telephone": "+18558046863",
    "email": "info@counselhound.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Richard Frankowski",
      "jobTitle": "CEO & Founder"
    },
    "sameAs": []
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
