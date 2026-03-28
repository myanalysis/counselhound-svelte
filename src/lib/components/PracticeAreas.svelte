<script lang="ts">
  import { onMount } from 'svelte';
  import ConsultationModal from '$lib/components/ConsultationModal.svelte';
  let el: HTMLElement;
  let visible = $state(false);
  let modalOpen = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const areas = [
    { label: 'Abuse Litigation',        img: '/pa-abuse.jpg' },
    { label: 'Personal Injury',          img: '/pa-personal-injury.jpg' },
    { label: 'Consumer Fraud',           img: '/pa-consumer-fraud.jpg' },
    { label: 'Defective Products',       img: '/pa-defective-products.jpg' },
    { label: 'Medical Injury',           img: '/pa-medical.jpg' },
    { label: 'Toxic Torts',              img: '/pa-toxic.jpg' },
    { label: 'Whistleblower Protection', img: '/pa-whistleblower.jpg' },
    { label: 'Investment Fraud',         img: '/pa-personal-injury.jpg' },
  ];
</script>

<section bind:this={el} class="py-12 px-6 bg-white">
  <div
    class="max-w-6xl mx-auto transition-all duration-700"
    class:opacity-0={!visible}
    class:translate-y-8={!visible}
    class:opacity-100={visible}
    class:translate-y-0={visible}
  >
    <h2 class="text-4xl font-bold text-black mb-10 relative pb-4 text-center font-['Playfair_Display']
      after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-30 after:h-0.5 after:bg-[#EBC24F]">
      Where we Fight For You
    </h2>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {#each areas as area}
        <button
          onclick={() => modalOpen = true}
          class="group relative overflow-hidden rounded-xl h-64 w-full text-left focus:outline-none focus:ring-2 focus:ring-[#d8b269]"
        >
          <!-- Full-bleed photo -->
          <img
            src={area.img}
            alt={area.label}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <!-- Always-on dark gradient from bottom -->
          <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

          <!-- Gold left border accent — appears on hover -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#d8b269] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>

          <!-- Text + button pinned to bottom -->
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-white font-bold text-lg leading-tight font-['Futura'] mb-3 group-hover:text-[#f5da98] transition-colors duration-300">
              {area.label}
            </h3>
            <span class="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-[#d8b269] text-[#d8b269] rounded group-hover:bg-[#d8b269] group-hover:text-black transition-all duration-300">
              Get Free Help
            </span>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

{#if modalOpen}
  <ConsultationModal onclose={() => modalOpen = false} />
{/if}
