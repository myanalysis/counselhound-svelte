<script lang="ts">
  import './app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/state';
  import { lang } from '$lib/i18n';

  let { children } = $props();

  const isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
  <meta name="author" content="Richard S. Frankowski, Esq." />
  <meta name="theme-color" content="#0D1B2A" />
  <meta name="color-scheme" content="light" />
  <link rel="icon" type="image/svg+xml" href={favicon} />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
  <link rel="apple-touch-icon" sizes="512x512" href="/apple-touch-icon.png" />
  <link rel="preload" as="font" href="/fonts/playfair-display.woff2" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" as="font" href="/fonts/futuraboldcondensedbt.woff2" type="font/woff2" crossorigin="anonymous" />
  <!-- Default OG / Twitter fallbacks (individual pages override these) -->
  <meta property="og:site_name" content="Counsel Hound" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta property="og:image:secure_url" content="https://counselhound.com/og-default.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Counsel Hound — Serious Results for Serious Injuries" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@counselhound" />
  <meta name="twitter:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:image:alt" content="Counsel Hound — Serious Results for Serious Injuries" />
  <!-- Cloudflare Web Analytics: add token via CF dashboard → Web Analytics → add site -->
  <!-- {@html `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token":"YOUR_TOKEN_HERE"}'><\/script>`} -->
  <!-- Geo: primary office Birmingham, AL -->
  <meta name="geo.region" content="US-AL" />
  <meta name="geo.placename" content="Birmingham, Alabama" />
  <meta name="geo.position" content="33.5100;-86.8050" />
  <meta name="ICBM" content="33.5100, -86.8050" />
  <!-- JSON-LD: WebSite (enables sitelinks searchbox) -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Counsel Hound",
    "url": "https://counselhound.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": "https://counselhound.com/news-and-blogs?q={search_term_string}" },
      "query-input": "required name=search_term_string"
    }
  })}<\/script>`}
  <!-- JSON-LD: LegalService + Person -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://counselhound.com/#firm",
        "name": "Counsel Hound",
        "url": "https://counselhound.com",
        "logo": "https://counselhound.com/main-logo.svg",
        "image": "https://counselhound.com/og-default.jpg",
        "description": "Counsel Hound connects injured people with vetted personal injury attorneys across the United States — free of charge.",
        "telephone": "+18558046863",
        "contactPoint": { "@type": "ContactPoint", "url": "https://counselhound.com/contact", "contactType": "customer service" },
        "openingHours": ["Mo-Fr 09:00-17:00"],
        "hasMap": "https://maps.google.com/?q=231+22nd+St+S+%23203+Birmingham+AL+35233",
        "address": [
          { "@type": "PostalAddress", "streetAddress": "231 22nd St S #203", "addressLocality": "Birmingham", "addressRegion": "AL", "postalCode": "35233", "addressCountry": "US" },
          { "@type": "PostalAddress", "streetAddress": "201 S Biscayne Blvd #8910", "addressLocality": "Miami", "addressRegion": "FL", "postalCode": "33131", "addressCountry": "US" },
          { "@type": "PostalAddress", "streetAddress": "12 Greenway Plz #1100", "addressLocality": "Houston", "addressRegion": "TX", "postalCode": "77027", "addressCountry": "US" }
        ],
        "areaServed": { "@type": "Country", "name": "United States" },
        "priceRange": "Free — Contingency Fee",
        "founder": { "@id": "https://counselhound.com/#founder" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "3", "bestRating": "5", "worstRating": "1" },
        "review": [
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "author": { "@type": "Person", "name": "Sarah M." }, "reviewBody": "Counsel Hound connected me with an attorney who truly understood my case. The process was seamless and stress-free.", "datePublished": "2024-03-01" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "author": { "@type": "Person", "name": "James R." }, "reviewBody": "Within 24 hours I was speaking with a lawyer who fought for me and won.", "datePublished": "2024-01-01" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "author": { "@type": "Person", "name": "Linda T." }, "reviewBody": "The team at Counsel Hound made me feel like I had a friend in my corner. They matched me perfectly.", "datePublished": "2024-02-01" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Legal Practice Areas",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Injury", "url": "https://counselhound.com/practice-areas/personal-injury" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Abuse Litigation", "url": "https://counselhound.com/practice-areas/abuse-litigation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Defective Products", "url": "https://counselhound.com/practice-areas/defective-products" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consumer Fraud", "url": "https://counselhound.com/practice-areas/consumer-fraud" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Medical Injury", "url": "https://counselhound.com/practice-areas/medical-injury" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Toxic Torts", "url": "https://counselhound.com/practice-areas/toxic-torts" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Whistleblower Protection", "url": "https://counselhound.com/practice-areas/whistleblower-protection" } }
          ]
        },
        "mentions": [
          { "@type": "Organization", "name": "CPSC", "url": "https://www.cpsc.gov" },
          { "@type": "Organization", "name": "FDA", "url": "https://www.fda.gov" },
          { "@type": "Organization", "name": "FINRA", "url": "https://www.finra.org" },
          { "@type": "Organization", "name": "SEC", "url": "https://www.sec.gov" },
          { "@type": "Organization", "name": "PIABA", "url": "https://www.piaba.org" }
        ],
        "sameAs": [
          "https://www.facebook.com/CounselHound",
          "https://www.instagram.com/counselhound",
          "https://x.com/counselhound"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://counselhound.com/#founder",
        "name": "Richard S. Frankowski",
        "jobTitle": "CEO & Founder",
        "worksFor": { "@id": "https://counselhound.com/#firm" },
        "description": "AV Preeminent rated attorney. Founder of Counsel Hound and The Frankowski Firm. PIABA Foundation Board member.",
        "memberOf": [
          { "@type": "Organization", "name": "PIABA — Public Investors Advocate Bar Association", "url": "https://www.piaba.org" },
          { "@type": "Organization", "name": "Alabama State Bar" },
          { "@type": "Organization", "name": "Florida Bar" },
          { "@type": "Organization", "name": "State Bar of Texas" }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/the-frankowski-firm",
          "https://www.avvo.com/attorneys/35233-al-richard-frankowski-2052003.html",
          "https://www.martindale.com/richard-stanislaus-frankowski/attorney/2147960/"
        ],
        "knowsAbout": [
          "Personal Injury Law",
          "Consumer Fraud",
          "Defective Products",
          "Toxic Torts",
          "Abuse Litigation",
          "Medical Injury",
          "Whistleblower Protection",
          "FINRA Arbitration",
          "SEC Whistleblower"
        ]
      }
    ]
  })}<\/script>`}
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
