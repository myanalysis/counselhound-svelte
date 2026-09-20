<script lang="ts">
  import { i18n } from '$lib/i18n/index.svelte';

  const f = $derived(i18n.t.pages.faq);

  let openIndex = $state<number | null>(null);
  function toggle(i: number) { openIndex = openIndex === i ? null : i; }

  const faqSchema = $derived(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": f.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  }));
</script>

<svelte:head>
  <title>{f.meta.title}</title>
  <meta name="description" content={f.meta.description} />
  <link rel="canonical" href="https://counselhound.com{i18n.href('/faq')}" />
  <meta property="og:title" content={f.meta.title} />
  <meta property="og:description" content={f.meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com{i18n.href('/faq')}" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content={f.meta.title} />
  <meta name="twitter:description" content={f.meta.description} />
  {@html `<script type="application/ld+json">${faqSchema}<\/script>`}
</svelte:head>

<!-- Hero -->
<section class="pt-32 pb-16 px-6 bg-[#162d39]">
  <div class="max-w-3xl mx-auto text-center">
    <p class="text-[#d8b269] text-xs uppercase tracking-[0.25em] mb-4 font-futura">{f.hero.eyebrow}</p>
    <h1 class="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">{f.hero.h1}</h1>
    <div class="w-16 h-0.5 bg-[#d8b269] mx-auto mb-6"></div>
    <p class="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
      {f.hero.body}
    </p>
  </div>
</section>

<!-- FAQ Accordion -->
<section class="py-16 px-6 bg-[#152232]">
  <div class="max-w-3xl mx-auto flex flex-col gap-3">
    {#each f.items as item, i}
      <div
        class="border bg-[#162d39] transition-colors duration-200"
        style="border-color: {openIndex === i ? '#d8b269' : 'rgba(216,178,105,0.15)'};"
      >
        <button
          class="w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer"
          onclick={() => toggle(i)}
          aria-expanded={openIndex === i}
        >
          <span class="text-sm uppercase tracking-widest font-futura leading-snug"
            style="color: {openIndex === i ? '#d8b269' : '#F0EDE8'};">
            {item.q}
          </span>
          <span
            class="shrink-0 w-6 h-6 flex items-center justify-center border border-[rgba(216,178,105,0.4)] rounded-full text-[#d8b269] transition-transform duration-300"
            style="transform: {openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'};"
            aria-hidden="true"
          >+</span>
        </button>
        {#if openIndex === i}
          <div class="px-6 pb-6">
            <div class="h-px mb-4 bg-[rgba(216,178,105,0.15)]"></div>
            <p class="text-sm leading-relaxed text-[rgba(240,237,232,0.65)]">{item.a}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<!-- CTA -->
<section class="py-16 px-6 bg-[#0f1c27]">
  <div class="max-w-2xl mx-auto text-center">
    <h2 class="text-2xl font-bold text-white font-playfair mb-4">{f.cta.h2}</h2>
    <p class="text-white/50 mb-8">{f.cta.body}</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href={i18n.href('/contact')} class="px-8 py-4 bg-[#d8b269] text-[#162d39] text-sm font-bold uppercase tracking-widest hover:brightness-110 transition-all">
        {f.cta.sendMessage}
      </a>
      <a href="tel:+18558046863" class="px-8 py-4 border border-[rgba(216,178,105,0.4)] text-[#d8b269] text-sm font-bold uppercase tracking-widest hover:border-[#d8b269] transition-all">
        {f.cta.call}
      </a>
    </div>
  </div>
</section>
