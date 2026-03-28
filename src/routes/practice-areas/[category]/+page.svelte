<script lang="ts">
  import { page } from '$app/stores';
  import { practiceAreas } from '$lib/data/practiceAreas';
  import { onMount } from 'svelte';
  import { config } from '$lib/config';

  let visible = $state(false);
  onMount(() => setTimeout(() => visible = true, 100));

  const area = $derived(practiceAreas.find(a => a.slug === $page.params.category));
</script>

<svelte:head>
  <title>{area?.label ?? 'Practice Areas'} | Counsel Hound</title>
  <meta name="description" content={area?.intro ?? ''} />
  {#if area}
    <link rel="canonical" href="https://counselhound.com/practice-areas/{area.slug}" />
    <meta property="og:title" content="{area.label} | Counsel Hound" />
    <meta property="og:description" content={area.intro} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://counselhound.com/practice-areas/{area.slug}" />
    <meta name="twitter:title" content="{area.label} | Counsel Hound" />
    <meta name="twitter:description" content={area.intro} />
    {@html `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": area.label,
      "description": area.intro,
      "provider": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" },
      "url": `https://counselhound.com/practice-areas/${area.slug}`
    })}</script>`}
  {/if}
</svelte:head>

{#if area}
  <!-- Hero -->
  <section class="relative pt-40 pb-24 px-6 overflow-hidden bg-[#0D1B2A]">
    <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/bg-capitol.png');"></div>
    <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(13,27,42,0.6), #0D1B2A);"></div>
    <div class="relative z-10 max-w-4xl mx-auto text-center">
      <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#C9A84C] font-['Futura'] transition-all duration-700"
        class:opacity-0={!visible} class:opacity-100={visible}
        style="transition-delay: 100ms;">
        Practice Areas
      </p>
      <h1 class="uppercase mb-6 text-[#F0EDE8] font-['Futura'] transition-all duration-700"
        class:opacity-0={!visible} class:-translate-y-4={!visible} class:opacity-100={visible} class:translate-y-0={visible}
        style="font-size: clamp(2.5rem, 6vw, 4rem); transition-delay: 200ms;">
        {area.label}
      </h1>
      <div class="w-16 h-0.5 mx-auto mb-8 bg-[#C9A84C] transition-all duration-700"
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
        <div class="w-14 h-0.5 mx-auto mb-4 bg-[#C9A84C]"></div>
        <h2 class="uppercase tracking-wide text-[#F0EDE8] font-['Futura']"
          style="font-size: clamp(1.6rem, 3vw, 2.2rem);">
          Cases We Handle
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each area.subs as sub}
          <div class="p-6 border border-[rgba(201,168,76,0.15)] bg-[#0D1B2A] transition-all duration-300 hover:-translate-y-1 group">
            <div class="w-6 h-0.5 mb-4 bg-[#C9A84C] transition-all group-hover:w-10 duration-300"></div>
            <h3 class="text-sm uppercase tracking-widest mb-2 text-[#F0EDE8] font-['Futura']">
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
  <section class="py-24 px-6 text-center bg-[#0D1B2A]">
    <div class="max-w-2xl mx-auto">
      <div class="w-14 h-0.5 mx-auto mb-6 bg-[#C9A84C]"></div>
      <h2 class="uppercase mb-6 text-[#F0EDE8] font-['Futura']"
        style="font-size: clamp(1.8rem, 3vw, 2.4rem);">
        {area.cta}
      </h2>
      <p class="text-sm mb-10 text-[rgba(240,237,232,0.6)]">
        No fees unless we win. Speak with a qualified attorney at no cost.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="inline-block bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
          Free Consultation
        </a>
        <a href="tel:{config.phone}"
          class="inline-block border border-[#C9A84C] text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-all duration-200">
          {config.phoneDisplay}
        </a>
      </div>
    </div>
  </section>

{:else}
  <section class="pt-40 pb-24 px-6 text-center bg-[#0D1B2A]">
    <h1 class="uppercase text-3xl mb-6 text-[#F0EDE8] font-['Futura']">Page Not Found</h1>
    <a href="/"
      class="inline-block bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
      Back to Home
    </a>
  </section>
{/if}
