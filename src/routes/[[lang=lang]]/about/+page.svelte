<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  import { i18n } from '$lib/i18n/index.svelte';
  let visible = $state(false);
  let videoOpen = $state(false);

  // Replace with actual YouTube/Vimeo embed URL when available
  const VIDEO_URL = '';

  const a = $derived(i18n.t.pages.about);

  onMount(() => setTimeout(() => visible = true, 100));
</script>

<svelte:head>
  <title>{a.meta.title}</title>
  <meta name="description" content={a.meta.description} />
  <meta name="keywords" content={a.meta.keywords} />
  <link rel="canonical" href="https://counselhound.com{i18n.href('/about')}" />
  <meta property="og:title" content={a.meta.title} />
  <meta property="og:description" content={a.meta.ogDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com{i18n.href('/about')}" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content={a.meta.title} />
  <meta name="twitter:description" content={a.meta.ogDescription} />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Richard Frankowski",
        "jobTitle": "CEO & Founder",
        "worksFor": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" },
        "url": `https://counselhound.com${i18n.href('/about')}`,
        "sameAs": ["https://www.linkedin.com/in/richardfrankowski"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
          { "@type": "ListItem", "position": 2, "name": a.hero.h1, "item": `https://counselhound.com${i18n.href('/about')}` }
        ]
      }
    ]
  })}<\/script>`}
</svelte:head>

<!-- Hero -->
<section class="relative pt-40 pb-16 px-6 overflow-hidden bg-[#162d39]">
  <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/bg-capitol.webp');"></div>
  <div class="absolute inset-0 bg-linear-to-b from-[rgba(13,27,42,0.6)] to-[#162d39]"></div>
  <div class="relative z-10 max-w-4xl mx-auto text-center">
    <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#d8b269] font-futura transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 100ms;">
      {a.hero.eyebrow}
    </p>
    <h1 class="mb-6 text-[#F0EDE8] font-playfair font-bold transition-all duration-700 text-hero"
      class:opacity-0={!visible} class:-translate-y-4={!visible} class:opacity-100={visible} class:translate-y-0={visible}
      style="transition-delay: 200ms;">
      {a.hero.h1}
    </h1>
    <div class="w-16 h-0.5 mx-auto bg-[#d8b269] transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 300ms;"></div>
  </div>
</section>

<!-- About / Founder -->
<section class="py-16 px-6 bg-white">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    <div class="transition-all duration-700"
      class:opacity-0={!visible} class:-translate-x-6={!visible}
      class:opacity-100={visible} class:translate-x-0={visible}
      style="transition-delay: 100ms;">
      <button type="button" onclick={() => videoOpen = true} class="relative block w-full group cursor-pointer">
        <img src="/richard-video.webp" alt={a.video.label} class="w-full border-2 border-[#d8b269] group-hover:brightness-90 transition-all duration-200" width="800" height="600" />
      </button>
    </div>
    <div class="transition-all duration-700"
      class:opacity-0={!visible} class:translate-x-6={!visible}
      class:opacity-100={visible} class:translate-x-0={visible}
      style="transition-delay: 200ms;">
      <p class="text-xs tracking-[0.2em] uppercase mb-3 text-[#d8b269] font-futura">{a.founder.eyebrow}</p>
      <h2 class="mb-6 text-[#162d39] font-playfair font-bold text-section-lg">
        {a.founder.h2}
      </h2>
      <div class="w-14 h-0.5 mb-8 bg-[#d8b269]"></div>
      <div class="flex flex-col gap-4 text-sm leading-relaxed mb-8 text-gray-600">
        <p>{a.founder.p1}</p>
        <p>{a.founder.p2}</p>
        <p>{a.founder.p3}</p>
      </div>
      <!-- Credentials -->
      <div class="grid grid-cols-2 gap-3 mb-8">
        {#each a.founder.credentials as c}
          <div class="border-l-2 border-[#d8b269] pl-3">
            <p class="text-[10px] uppercase tracking-widest text-[#d8b269] font-futura mb-0.5">{c.label}</p>
            <p class="text-xs text-gray-600 leading-snug whitespace-pre-line">{c.value}</p>
          </div>
        {/each}
      </div>

      <blockquote class="border-l-4 border-[#d8b269] pl-5 italic text-lg leading-relaxed text-[#162d39] font-serif">
        {a.founder.quote}
      </blockquote>
      <img src="/signature.webp" alt="Richard Frankowski signature" class="mt-6 h-16 w-auto opacity-80" />
      <p class="mt-2 text-sm text-gray-500 font-futura uppercase tracking-widest">{a.founder.signatureCaption}</p>
    </div>
  </div>
</section>

<!-- Our Approach -->
<section class="py-16 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <p class="text-xs tracking-[0.2em] uppercase mb-3 text-[#d8b269] font-futura">{a.approach.eyebrow}</p>
      <h2 class="mb-6 text-[#162d39] font-playfair font-bold text-section-lg">
        {a.approach.h2}
      </h2>
      <div class="w-14 h-0.5 mb-8 bg-[#d8b269]"></div>
      <div class="flex flex-col gap-4 text-sm leading-relaxed text-gray-600">
        <p>{a.approach.p1}</p>
        <p>{a.approach.p2}</p>
      </div>

      <!-- 3 approach pillars -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {#each a.approach.pillars as p}
          <div class="border-t-2 border-[#d8b269] pt-4">
            <p class="text-xs uppercase tracking-widest font-bold text-[#162d39] mb-1 font-futura">{p.label}</p>
            <p class="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      {#each a.approach.stats as stat, i}
        <div class="bg-[#162d39] p-8 flex flex-col justify-center"
          class:bg-[#d8b269]={i === 0}>
          <p class="font-black font-futura leading-none mb-2 text-section-xl {i === 0 ? 'text-[#162d39]' : 'text-[#d8b269]'}">{stat.value}</p>
          <p class="text-xs uppercase tracking-widest font-futura {i === 0 ? 'text-[#162d39]/70' : 'text-white/70'}">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 px-6 text-center bg-[#d8b269]">
  <div class="max-w-2xl mx-auto">
    <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#162d39]/60 font-futura">{a.cta.eyebrow}</p>
    <h2 class="mb-6 text-[#162d39] font-playfair font-bold text-section">
      {a.cta.h2}
    </h2>
    <p class="text-sm mb-10 text-[#162d39]/70">
      {a.cta.body}
    </p>
    <a href={config.consultationUrl} target="_blank" rel="noopener"
      class="inline-block bg-[#162d39] text-[#d8b269] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-125 transition-all duration-200">
      {a.cta.button}
    </a>
  </div>
</section>

<!-- Video Modal -->
{#if videoOpen}
<dialog open
  class="fixed inset-0 z-100 w-full h-full max-w-none max-h-none m-0 p-0 bg-black/80 flex items-center justify-center"
  onclick={(e) => { if (e.target === e.currentTarget) videoOpen = false; }}
>
  <div class="bg-black w-full max-w-4xl mx-4 shadow-2xl flex flex-col">
    <div class="flex items-center justify-between px-5 py-3 bg-[#162d39]">
      <span class="text-white/70 text-xs uppercase tracking-widest font-futura">{a.video.label}</span>
      <button type="button" onclick={() => videoOpen = false}
        class="text-white/60 hover:text-white transition-colors text-2xl leading-none">&times;</button>
    </div>
    <div class="aspect-video w-full bg-black flex items-center justify-center">
      {#if VIDEO_URL}
        <iframe
          src={VIDEO_URL}
          class="w-full h-full"
          allow="autoplay; fullscreen"
          allowfullscreen
          title={a.video.label}
        ></iframe>
      {:else}
        <p class="text-white/40 text-sm">{a.video.comingSoon}</p>
      {/if}
    </div>
  </div>
</dialog>
{/if}
