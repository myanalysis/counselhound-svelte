<script lang="ts">
  import { onMount } from 'svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  let visible = $state(false);
  onMount(() => setTimeout(() => visible = true, 100));

  const c = $derived(i18n.t.pages.contact);
</script>

<svelte:head>
  <title>{c.meta.title}</title>
  <meta name="description" content={c.meta.description} />
  <link rel="canonical" href="https://counselhound.com{i18n.href('/contact')}" />
  <meta property="og:title" content={c.meta.title} />
  <meta property="og:description" content={c.meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com{i18n.href('/contact')}" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content={c.meta.title} />
  <meta name="twitter:description" content={c.meta.description} />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": c.meta.title,
        "url": `https://counselhound.com${i18n.href('/contact')}`,
        "description": c.meta.description,
        "mainEntity": {
          "@type": "LegalService",
          "name": "Counsel Hound",
          "telephone": "+18558046863",
          "contactPoint": { "@type": "ContactPoint", "contactType": "customer support", "telephone": "+18558046863", "availableLanguage": ["English", "Spanish"] }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
          { "@type": "ListItem", "position": 2, "name": c.hero.h1, "item": `https://counselhound.com${i18n.href('/contact')}` }
        ]
      }
    ]
  })}<\/script>`}
</svelte:head>

<!-- Hero -->
<section class="relative pt-40 pb-20 px-6 overflow-hidden bg-[#162d39]">
  <div class="absolute inset-0 bg-cover bg-center opacity-[0.15]" style="background-image: url('/bg-capitol.webp');"></div>
  <div class="absolute inset-0 bg-linear-to-b from-[rgba(13,27,42,0.6)] to-[#162d39]"></div>
  <div class="relative z-10 max-w-4xl mx-auto text-center">
    <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#d8b269] font-futura transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 100ms;">
      {c.hero.eyebrow}
    </p>
    <h1 class="mb-6 text-[#F0EDE8] font-playfair font-bold transition-all duration-700 text-hero"
      class:opacity-0={!visible} class:-translate-y-4={!visible} class:opacity-100={visible} class:translate-y-0={visible}
      style="transition-delay: 200ms;">
      {c.hero.h1}
    </h1>
    <div class="w-16 h-0.5 mx-auto bg-[#d8b269] transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 300ms;"></div>
  </div>
</section>

<ContactSection />
