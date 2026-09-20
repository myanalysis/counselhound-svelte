<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  const featured = [
    { id: 'Ibf61-Gvktw', title: 'Cut Through the Noise and Let Counsel Hound Find the Right Attorney for You' },
    { id: 'lTOUir6R_DY', title: 'Let Us Connect You to the Right Attorney for Your Car Accident Case' },
    { id: 'KQzNIrAklBo', title: 'Let Us Connect You to the Right Lawyer for Your Medical Malpractice Case' },
  ];

  let activeId = $state<string | null>(null);
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') activeId = null; };
    window.addEventListener('keydown', onKey);
    return () => { obs.disconnect(); window.removeEventListener('keydown', onKey); };
  });
</script>

<section bind:this={el} class="py-20 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto">

    <div class="flex items-end justify-between mb-12 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <div>
        <p class="text-[#d8b269] text-xs uppercase tracking-[0.25em] mb-3 font-futura">{i18n.t.videoPreview.eyebrow}</p>
        <h2 class="text-3xl font-bold text-[#162d39] font-playfair">{i18n.t.videoPreview.h2}</h2>
      </div>
      <a href={i18n.href('/videos')} class="text-xs font-bold uppercase tracking-widest text-[#d8b269] hover:brightness-110 transition-all hidden sm:block">
        {i18n.t.videoPreview.viewAll}
      </a>
    </div>

    <div class="grid sm:grid-cols-3 gap-6 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      {#each featured as v, i}
        <button
          type="button"
          onclick={() => activeId = v.id}
          class="group text-left bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
          style="transition-delay: {i * 80}ms;"
        >
          <div class="relative overflow-hidden aspect-video bg-[#162d39]">
            <img
              src="https://img.youtube.com/vi/{v.id}/hqdefault.jpg"
              alt={v.title}
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width="480"
              height="360"
              onerror={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`; }}
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-200">
              <div class="w-12 h-12 rounded-full bg-[#d8b269] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-[#162d39] ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="text-xs font-semibold text-[#162d39] leading-snug group-hover:text-[#d8b269] transition-colors duration-150 line-clamp-2">{v.title}</p>
          </div>
        </button>
      {/each}
    </div>

    <div class="text-center mt-8 sm:hidden">
      <a href={i18n.href('/videos')} class="text-xs font-bold uppercase tracking-widest text-[#d8b269] hover:brightness-110 transition-all">
        {i18n.t.videoPreview.viewAll}
      </a>
    </div>

  </div>
</section>

{#if activeId}
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Video player"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
    onclick={() => activeId = null}
    onkeydown={(e) => e.key === 'Escape' && (activeId = null)}
  >
    <div
      class="relative w-full max-w-3xl aspect-video bg-black"
      onclick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <button
        type="button"
        onclick={() => activeId = null}
        class="absolute -top-10 right-0 text-white/60 hover:text-white text-3xl leading-none transition-colors"
        aria-label="Close video"
      >&times;</button>
      <iframe
        src="https://www.youtube.com/embed/{activeId}?autoplay=1&rel=0"
        title="Counsel Hound video"
        width="100%"
        height="100%"
        style="border:0;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
{/if}
