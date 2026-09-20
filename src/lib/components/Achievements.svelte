<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="bg-white py-12 px-6">
  <div class="max-w-5xl mx-auto">

    <div class="text-center mb-14 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <p class="text-[#8B6914] text-xs uppercase tracking-[0.2em] mb-3">{i18n.t.achievements.label}</p>
      <h2 class="text-4xl font-bold text-[#162d39] font-playfair">{i18n.t.achievements.h2}</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
      {#each i18n.t.achievements.badges as badge, i}
        <div
          class="flex items-center justify-center transition-all duration-700"
          class:opacity-0={!visible}
          class:scale-95={!visible}
          class:opacity-100={visible}
          class:scale-100={visible}
          style="transition-delay: {i * 80}ms;"
        >
          <div class="group relative w-full max-w-56 transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_4px_16px_rgba(216,178,105,0.35)]">
            <img src={badge.src} alt={badge.title} class="w-full h-auto object-contain block" loading="lazy" width="224" height="224" />
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-[#162d39]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
              <p class="text-[#d8b269] text-xs font-bold uppercase tracking-widest font-futura mb-2">{badge.title}</p>
              <p class="text-white/80 text-xs leading-snug">{badge.desc}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
