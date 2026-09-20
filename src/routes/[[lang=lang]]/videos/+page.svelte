<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  const v = $derived(i18n.t.pages.videos);

  const videos = [
    { id: 'EMRvinK5M-o', title: 'Why I Started Counsel Hound to Connect You to the Right Lawyer' },
    { id: 'Ibf61-Gvktw', title: 'Cut Through the Noise and Let Counsel Hound Find the Right Attorney for You' },
    { id: 'WGaq3DiJ-fw', title: 'Let Us Find the Right Legal Help for You' },
    { id: 'lTOUir6R_DY', title: 'Let Us Connect You to the Right Attorney for Your Car Accident Case' },
    { id: '7cqgyMyNbiE', title: 'Counsel Hound Connects You to the Right Lawyer for Your Truck Accident Case' },
    { id: 'F0K-bPP9WeM', title: 'Counsel Hound Connects You to the Right Lawyer for Your Rideshare Case' },
    { id: 'KQzNIrAklBo', title: 'Let Us Connect You to the Right Lawyer for Your Medical Malpractice Case' },
    { id: 'x8PVhjBUePo', title: 'Counsel Hound Connects You to the Right Lawyer for Your Nursing Home Neglect Case' },
    { id: 'ySoZbj7AGxs', title: 'If You Need Legal Help, Call Counsel Hound and We\'ll Find the Right Lawyer for You' },
    { id: 'q58xEh125RA', title: 'Lost Money Due to Stockbroker Negligence? Call Counsel Hound.' },
  ];

  let activeId = $state<string | null>(null);

  function open(id: string) { activeId = id; }
  function close() { activeId = null; }

  onMount(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<svelte:head>
  <title>{v.meta.title}</title>
  <meta name="description" content={v.meta.description} />
  <link rel="canonical" href="https://counselhound.com{i18n.href('/videos')}" />
  <meta property="og:title" content={v.meta.title} />
  <meta property="og:description" content={v.meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com{i18n.href('/videos')}" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content={v.meta.title} />
  <meta name="twitter:description" content={v.meta.description} />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": videos.map((v, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "VideoObject",
        "name": v.title,
        "description": v.title,
        "thumbnailUrl": `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
        "embedUrl": `https://www.youtube.com/embed/${v.id}`,
        "publisher": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" }
      }
    }))
  })}<\/script>`}
</svelte:head>

<!-- Hero -->
<section class="pt-32 pb-16 px-6 bg-[#162d39]">
  <div class="max-w-5xl mx-auto text-center">
    <p class="text-[#d8b269] text-xs uppercase tracking-[0.25em] mb-4 font-futura">{v.hero.eyebrow}</p>
    <h1 class="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">{v.hero.h1}</h1>
    <div class="w-16 h-0.5 bg-[#d8b269] mx-auto mb-6"></div>
    <p class="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
      {v.hero.body}
    </p>
  </div>
</section>

<!-- Grid -->
<section class="py-16 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each videos as v}
        <button
          type="button"
          onclick={() => open(v.id)}
          class="group text-left bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
          <!-- Thumbnail -->
          <div class="relative overflow-hidden aspect-video bg-[#162d39]">
            <img
              src="https://img.youtube.com/vi/{v.id}/maxresdefault.jpg"
              alt={v.title}
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width="1280"
              height="720"
              onerror={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }}
            />
            <!-- Play button overlay -->
            <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-200">
              <div class="w-14 h-14 rounded-full bg-[#d8b269] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-[#162d39] ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          <!-- Title -->
          <div class="p-4">
            <p class="text-sm font-semibold text-[#162d39] leading-snug group-hover:text-[#d8b269] transition-colors duration-150">{v.title}</p>
          </div>
        </button>
      {/each}
    </div>

    <div class="text-center mt-12">
      <a
        href="https://www.youtube.com/@CounselHound"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-[#162d39] text-[#d8b269] text-xs font-bold uppercase tracking-widest hover:bg-[#d8b269] hover:text-[#162d39] transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        {v.viewAllYoutube}
      </a>
    </div>
  </div>
</section>

<!-- Modal player -->
{#if activeId}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Video player"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
    onclick={close}
    onkeydown={(e) => e.key === 'Escape' && close()}
  >
    <div
      class="relative w-full max-w-3xl aspect-video bg-black"
      onclick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <button
        type="button"
        onclick={close}
        class="absolute -top-10 right-0 text-white/60 hover:text-white text-3xl leading-none transition-colors"
        aria-label={v.closeVideo}
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
