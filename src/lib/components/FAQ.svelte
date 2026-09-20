<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  const faqSchema = $derived(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": i18n.t.faqTeaser.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  }));

  let el: HTMLElement;
  let visible = $state(false);
  let openIndex = $state<number | null>(null);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }

  $effect(() => {
    // Reset open item when language changes
    void i18n.lang;
    openIndex = null;
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${faqSchema}<\/script>`}
</svelte:head>

<section bind:this={el} class="py-12 px-6 bg-[#152232]">
  <div class="max-w-3xl mx-auto">

    <div class="text-center mb-14 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <div class="w-14 h-0.5 mx-auto mb-4 bg-[#d8b269]"></div>
      <h2 class="text-3xl uppercase tracking-wide text-[#F0EDE8] font-futura">
        {i18n.t.faqTeaser.h2Top} <span class="text-[#d8b269]">{i18n.t.faqTeaser.h2Gold}</span>
      </h2>
    </div>

    <div class="flex flex-col gap-3">
      {#each i18n.t.faqTeaser.items as item, i}
        <div
          class="border transition-all duration-700 bg-[#162d39]"
          class:opacity-0={!visible}
          class:translate-y-4={!visible}
          class:opacity-100={visible}
          class:translate-y-0={visible}
          style="border-color: {openIndex === i ? '#d8b269' : 'rgba(216,178,105,0.15)'}; transition-delay: {i * 60}ms;"
        >
          <button
            class="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
            onclick={() => toggle(i)}
          >
            <span class="text-sm uppercase tracking-widest font-futura"
              style="color: {openIndex === i ? '#d8b269' : '#F0EDE8'};">
              {item.q}
            </span>
            <span
              class="shrink-0 w-6 h-6 flex items-center justify-center border border-[rgba(216,178,105,0.4)] rounded-full text-[#d8b269] transition-transform duration-300"
              style="transform: {openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'};"
            >
              +
            </span>
          </button>

          {#if openIndex === i}
            <div class="px-6 pb-6">
              <div class="h-px mb-4 bg-[rgba(216,178,105,0.15)]"></div>
              <p class="text-sm leading-relaxed text-[rgba(240,237,232,0.65)]">
                {item.a}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="text-center mt-10">
      <a href={i18n.href('/faq')} class="text-xs font-bold uppercase tracking-widest text-[#d8b269] hover:brightness-110 transition-all">
        {i18n.t.faqTeaser.viewAll}
      </a>
    </div>

  </div>
</section>
