<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="bg-[#3a5166] py-12 px-6">
  <div class="max-w-6xl mx-auto">

    <!-- Top: label + headline + body — left aligned -->
    <div
      class="max-w-2xl mb-20 transition-all duration-700"
      class:opacity-0={!visible} class:translate-y-6={!visible}
      class:opacity-100={visible} class:translate-y-0={visible}
    >
      <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-3">{i18n.t.whyUs.label}</p>
      <h2 class="text-4xl font-bold text-white mb-6 font-playfair">{i18n.t.whyUs.h2}</h2>
      <p class="text-white/60 text-lg leading-relaxed">
        {i18n.t.whyUs.body}
      </p>
    </div>

    <!-- Stats row — no boxes, just big numbers + dividers -->
    <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
      {#each i18n.t.whyUs.stats as s, i}
        <div
          class="px-8 first:pl-0 last:pr-0 transition-all duration-700"
          class:opacity-0={!visible} class:translate-y-4={!visible}
          class:opacity-100={visible} class:translate-y-0={visible}
          style="transition-delay: {i * 100}ms;"
        >
          <p class="text-[#d8b269] text-5xl font-black font-futura leading-none mb-2">{s.value}</p>
          <p class="text-white text-sm font-bold uppercase tracking-widest mb-3 font-futura">{s.label}</p>
          <p class="text-white/40 text-sm leading-relaxed">{s.desc}</p>
        </div>
      {/each}
    </div>

  </div>
</section>
