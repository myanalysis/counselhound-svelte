<script lang="ts">
  import { onMount } from 'svelte';
  import LeafletMap from '$lib/components/LeafletMap.svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  type Location = { city: string; addr: string; lat: number; lon: number; mapUrl: string };

  const locations: Location[] = [
    {
      city: 'Birmingham, AL',
      addr: '231 22nd St S #203\nBirmingham, AL 35233',
      lat: 33.5089,
      lon: -86.8019,
      mapUrl: 'https://maps.google.com/maps?q=231+22nd+St+S+%23203+Birmingham+AL+35233',
    },
    {
      city: 'Miami, FL',
      addr: '201 S Biscayne Blvd #8910\nMiami, FL 33131',
      lat: 25.7700,
      lon: -80.1865,
      mapUrl: 'https://maps.google.com/maps?q=201+S+Biscayne+Blvd+%238910+Miami+FL+33131',
    },
    {
      city: 'Houston, TX',
      addr: '12 Greenway Plz #1100\nHouston, TX 77027',
      lat: 29.7375,
      lon: -95.4574,
      mapUrl: 'https://maps.google.com/maps?q=12+Greenway+Plaza+%231100+Houston+TX+77027',
    },
  ];

  let active = $state<Location>(locations[0]);
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="py-20 px-6 bg-[#0f1c27]">
  <div class="max-w-6xl mx-auto">

    <div class="text-center mb-14 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <p class="text-[#d8b269] text-xs uppercase tracking-[0.25em] mb-3 font-futura">{i18n.t.locations.eyebrow}</p>
      <h2 class="text-3xl uppercase tracking-wide text-white font-futura">{i18n.t.locations.h2Plain} <span class="text-[#d8b269]">{i18n.t.locations.h2Gold}</span></h2>
      <div class="w-14 h-0.5 mx-auto mt-5 bg-[#d8b269]"></div>
    </div>

    <div class="grid lg:grid-cols-[1fr_2fr] gap-8 items-start transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>

      <!-- Location cards -->
      <div class="flex flex-col gap-3">
        {#each locations as loc}
          <button
            type="button"
            onclick={() => active = loc}
            class="text-left p-5 border transition-all duration-200 cursor-pointer"
            style="border-color: {active === loc ? '#d8b269' : 'rgba(216,178,105,0.15)'}; background: {active === loc ? 'rgba(216,178,105,0.06)' : 'transparent'};"
          >
            <div class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 shrink-0 transition-colors duration-200"
                style="color: {active === loc ? '#d8b269' : 'rgba(240,237,232,0.3)'};"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
              </svg>
              <div class="flex-1">
                <p class="text-xs font-bold uppercase tracking-widest mb-1 font-futura transition-colors duration-200"
                  style="color: {active === loc ? '#d8b269' : '#F0EDE8'};">
                  {loc.city}
                </p>
                <p class="text-xs leading-relaxed whitespace-pre-line text-white/40">{loc.addr}</p>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-white/10 flex justify-end">
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onclick={(e) => e.stopPropagation()}
                class="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-[#d8b269] transition-colors duration-150 font-futura"
              >
                {i18n.t.locations.openInMaps}
              </a>
            </div>
          </button>
        {/each}
      </div>

      <!-- Leaflet map -->
      <div class="relative" style="height: 420px; border: 1px solid rgba(216,178,105,0.15);">
        {#if visible}
          {#key active}
            <LeafletMap lat={active.lat} lon={active.lon} label={active.city} />
          {/key}
        {/if}
        <div class="absolute top-0 left-0 z-[1000] bg-[#162d39]/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#d8b269] font-futura pointer-events-none">
          {active.city}
        </div>
      </div>

    </div>
  </div>
</section>
