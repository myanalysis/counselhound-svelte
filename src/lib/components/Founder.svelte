<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';
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
        {i18n.t.founder.h2}
      </h2>
      <p class="text-gray-500 text-lg leading-relaxed mb-4">
        {i18n.t.founder.p1}
      </p>
      <p class="text-gray-500 text-lg leading-relaxed mb-8">
        {i18n.t.founder.p2}
      </p>
      <div class="flex items-center gap-6 flex-wrap">
        <a
          href={i18n.href('/about')}
          class="inline-block px-10 py-4 bg-[#162d39] text-white font-semibold text-sm uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200"
        >
          {i18n.t.founder.cta}
        </a>
        <a href={i18n.href('/videos')} class="text-xs font-bold uppercase tracking-widest text-[#d8b269] hover:brightness-110 transition-all">
          {i18n.t.founder.viewAllVideos}
        </a>
      </div>
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
        {i18n.t.founder.close} ✕
      </button>
      <iframe
        src="https://www.youtube.com/embed/EMRvinK5M-o?autoplay=1&rel=0"
        title="Why I Started Counsel Hound — Richard Frankowski"
        width="100%"
        height="100%"
        style="border:0;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
{/if}
