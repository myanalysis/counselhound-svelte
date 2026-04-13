<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  let el: HTMLElement;
  let visible = $state(false);
  let videoOpen = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="relative py-12 px-6 bg-white overflow-hidden">
  <div
    class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center transition-all duration-700"
    class:opacity-0={!visible}
    class:translate-y-8={!visible}
    class:opacity-100={visible}
    class:translate-y-0={visible}
  >
    <!-- Image left -->
    <div class="flex justify-center lg:justify-start">
      <button
        type="button"
        onclick={() => videoOpen = true}
        class="relative group cursor-pointer w-full max-w-lg focus:outline-none"
        aria-label="Play founder video"
      >
        <img
          src="/richard-video.webp"
          alt="Richard Frankowski, Founder"
          class="w-full"
          width="800"
          height="600"
          loading="lazy"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-20 h-20 rounded-full bg-[#162d39]/80 flex items-center justify-center group-hover:bg-[#d8b269] transition-colors duration-200">
            <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </button>
    </div>

    <!-- Text right -->
    <div>
      <h2 class="text-3xl font-bold text-black mb-4 font-futura">
        {$t.founder_h2}
      </h2>
      <p class="text-gray-500 text-lg leading-relaxed mb-4">
        {$t.founder_p1}
      </p>
      <p class="text-gray-500 text-lg leading-relaxed mb-8">
        {$t.founder_p2}
      </p>
      <a
        href="/about"
        class="inline-block px-10 py-4 bg-[#162d39] text-white font-semibold text-sm uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200"
      >
        {$t.founder_cta}
      </a>
    </div>
  </div>

  <!-- Decorative watermark bottom-right -->
  <img
    src="/frame-gold.webp"
    alt=""
    aria-hidden="true"
    class="absolute bottom-0 right-0 opacity-10 w-48 pointer-events-none"
    width="192"
    height="192"
  />
</section>

<!-- Video Modal -->
{#if videoOpen}
  <div
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Founder video"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
    onclick={() => videoOpen = false}
    onkeydown={(e) => e.key === 'Escape' && (videoOpen = false)}
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="relative w-full max-w-3xl aspect-video bg-black"
      onclick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onclick={() => videoOpen = false}
        class="absolute -top-10 right-0 text-white text-sm uppercase tracking-widest hover:text-[#d8b269] transition-colors"
      >
        {$t.founder_close} ✕
      </button>
      <div class="w-full h-full flex items-center justify-center text-white/40 text-sm uppercase tracking-widest">
        {$t.founder_video_soon}
      </div>
    </div>
  </div>
{/if}
