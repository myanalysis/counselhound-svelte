<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  let el: HTMLElement;
  let visible = $state(false);
  let playing = $state(false);

  const VIDEO_ID = 'EMRvinK5M-o';

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="py-20 px-6 bg-[#162d39]">
  <div class="max-w-5xl mx-auto">

    <div class="text-center mb-10 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <p class="text-[#d8b269] text-xs uppercase tracking-[0.25em] mb-3 font-futura">{i18n.t.featuredVideo.eyebrow}</p>
      <h2 class="text-3xl md:text-4xl font-bold text-white font-playfair">{i18n.t.featuredVideo.h2}</h2>
    </div>

    <!-- Video wrapper -->
    <div
      class="relative aspect-video w-full max-w-3xl mx-auto shadow-2xl transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
    >
      {#if playing}
        <iframe
          src="https://www.youtube.com/embed/{VIDEO_ID}?autoplay=1&rel=0"
          title="Why I Started Counsel Hound"
          width="100%"
          height="100%"
          style="border:0; position:absolute; inset:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else}
        <button
          type="button"
          onclick={() => playing = true}
          class="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={i18n.t.featuredVideo.play}
        >
          <img
            src="https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg"
            alt="Why I Started Counsel Hound — Richard Frankowski"
            class="w-full h-full object-cover"
            width="1280"
            height="720"
            fetchpriority="auto"
          />
          <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 rounded-full bg-[#d8b269] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-[#162d39] ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </button>
      {/if}
    </div>

    <div class="text-center mt-8 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <a
        href={i18n.href('/videos')}
        class="inline-block text-xs text-[#d8b269] font-bold uppercase tracking-widest hover:brightness-125 transition-all font-futura"
      >{i18n.t.featuredVideo.viewAll}</a>
    </div>

  </div>
</section>
