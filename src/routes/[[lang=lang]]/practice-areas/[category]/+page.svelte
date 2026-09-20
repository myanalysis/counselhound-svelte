<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  import { i18n } from '$lib/i18n/index.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const area = $derived(data.area);
  const ui = $derived(data.ui);

  let visible = $state(false);
  onMount(() => setTimeout(() => visible = true, 100));
</script>

<svelte:head>
  <title>{area.label} | Counsel Hound</title>
  <meta name="description" content={area.intro} />
  <link rel="canonical" href="https://counselhound.com{i18n.href(`/practice-areas/${area.slug}`)}" />
  <meta property="og:title" content="{area.label} | Counsel Hound" />
  <meta property="og:description" content={area.intro} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com{i18n.href(`/practice-areas/${area.slug}`)}" />
  <meta property="og:image" content="https://counselhound.com{area.ogImage ?? '/og-default.jpg'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:title" content="{area.label} | Counsel Hound" />
  <meta name="twitter:description" content={area.intro} />
  <meta name="keywords" content="{area.label}, {area.subs.map(s => s.name).join(', ')}, injury attorney, free consultation, contingency fee lawyer" />
  {@html `<script type="application/ld+json">${JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": area.label,
      "serviceType": area.label,
      "description": area.intro,
      "provider": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "url": `https://counselhound.com${i18n.href(`/practice-areas/${area.slug}`)}`,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${area.label} Legal Services`,
        "itemListElement": area.subs.map((s, i) => ({
          "@type": "Offer",
          "position": i + 1,
          "itemOffered": { "@type": "Service", "name": s.name, "description": s.desc }
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
        { "@type": "ListItem", "position": 2, "name": area.label, "item": `https://counselhound.com${i18n.href(`/practice-areas/${area.slug}`)}` },
      ]
    },
    ...(area.faqs?.length ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": area.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }] : [])
  ])}<\/script>`}
</svelte:head>

<!-- Hero -->
  <section class="relative pt-40 pb-24 px-6 overflow-hidden bg-[#162d39]">
    <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/bg-capitol.webp');"></div>
    <div class="absolute inset-0 bg-linear-to-b from-[rgba(13,27,42,0.6)] to-[#162d39]"></div>
    <div class="relative z-10 max-w-4xl mx-auto text-center">
      <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#d8b269] font-futura transition-all duration-700"
        class:opacity-0={!visible} class:opacity-100={visible}
        style="transition-delay: 100ms;">
        {ui.eyebrow}
      </p>
      <h1 class="uppercase mb-6 text-[#F0EDE8] font-futura transition-all duration-700 text-hero"
        class:opacity-0={!visible} class:-translate-y-4={!visible} class:opacity-100={visible} class:translate-y-0={visible}
        style="transition-delay: 200ms;">
        {area.label}
      </h1>
      <div class="w-16 h-0.5 mx-auto mb-8 bg-[#d8b269] transition-all duration-700"
        class:opacity-0={!visible} class:opacity-100={visible}
        style="transition-delay: 300ms;"></div>
      <p class="text-base leading-relaxed max-w-2xl mx-auto text-[rgba(240,237,232,0.7)] transition-all duration-700"
        class:opacity-0={!visible} class:opacity-100={visible}
        style="transition-delay: 400ms;">
        {area.intro}
      </p>
    </div>
  </section>

  <!-- Sub-cases -->
  <section class="py-24 px-6 bg-[#152232]">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <div class="w-14 h-0.5 mx-auto mb-4 bg-[#d8b269]"></div>
        <h2 class="uppercase tracking-wide text-[#F0EDE8] font-futura text-sub">
          {ui.casesWeHandle}
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each area.subs as sub}
          <div class="p-6 border border-[rgba(216,178,105,0.15)] bg-[#162d39] transition-all duration-300 hover:-translate-y-1 group">
            <div class="w-6 h-0.5 mb-4 bg-[#d8b269] transition-all group-hover:w-10 duration-300"></div>
            <h3 class="text-sm uppercase tracking-widest mb-2 text-[#F0EDE8] font-futura">
              {sub.name}
            </h3>
            <p class="text-xs leading-relaxed text-[rgba(240,237,232,0.55)]">
              {sub.desc}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 px-6 text-center bg-[#162d39]">
    <div class="max-w-2xl mx-auto">
      <div class="w-14 h-0.5 mx-auto mb-6 bg-[#d8b269]"></div>
      <h2 class="uppercase mb-6 text-[#F0EDE8] font-futura text-section">
        {area.cta}
      </h2>
      <p class="text-sm mb-10 text-[rgba(240,237,232,0.6)]">
        {ui.noFeesLine}
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="inline-block bg-[#d8b269] text-[#162d39] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
          {ui.freeConsultation}
        </a>
        <a href="tel:{config.phone}"
          class="inline-block border border-[#d8b269] text-[#d8b269] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#d8b269] hover:text-[#162d39] transition-all duration-200">
          {config.phoneDisplay}
        </a>
      </div>
    </div>
  </section>
