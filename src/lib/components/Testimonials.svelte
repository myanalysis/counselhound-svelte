<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  type Testimonial = { id: number; client_name: string; quote: string };
  let { testimonials = [] }: { testimonials: Testimonial[] } = $props();

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

<section bind:this={el} class="py-20 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto">

    <div class="text-center mb-14 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <p class="text-[#8B6914] text-xs uppercase tracking-[0.2em] mb-3">{i18n.t.testimonials.label}</p>
      <h2 class="text-4xl font-bold text-[#162d39] font-playfair">{i18n.t.testimonials.h2}</h2>
    </div>

    {#if testimonials.length === 0}
      <p class="text-center text-gray-400 text-sm py-8">{i18n.t.testimonials.empty}</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each testimonials as t, i}
          <div
            class="bg-white rounded-lg p-7 flex flex-col gap-5 shadow-sm transition-all duration-700"
            class:opacity-0={!visible} class:translate-y-4={!visible}
            class:opacity-100={visible} class:translate-y-0={visible}
            style="transition-delay: {i * 80}ms;"
          >
            <!-- Quote mark -->
            <svg class="w-8 h-8 text-[#d8b269]/40 shrink-0" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
            </svg>

            <p class="text-gray-700 text-sm leading-relaxed flex-1">"{t.quote}"</p>

            <p class="text-xs font-bold text-[#162d39] uppercase tracking-widest border-t border-gray-100 pt-4">
              — {t.client_name}
            </p>
          </div>
        {/each}
      </div>
    {/if}

  </div>
</section>
