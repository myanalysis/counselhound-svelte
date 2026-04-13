<script lang="ts">
  import { onMount } from 'svelte';
  import ConsultationModal from '$lib/components/ConsultationModal.svelte';
  import { t, lang } from '$lib/i18n';
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
    { label: 'Abuse Litigation',        labelEs: 'Litigios de Abuso',         img: '/pa-abuse.webp' },
    { label: 'Personal Injury',          labelEs: 'Lesiones Personales',        img: '/pa-personal-injury.webp' },
    { label: 'Consumer Fraud',           labelEs: 'Fraude al Consumidor',       img: '/pa-consumer-fraud.webp' },
    { label: 'Defective Products',       labelEs: 'Productos Defectuosos',      img: '/pa-defective-products.webp' },
    { label: 'Medical Injury',           labelEs: 'Lesiones Médicas',           img: '/pa-medical.webp' },
    { label: 'Toxic Torts',              labelEs: 'Daños por Tóxicos',          img: '/pa-toxic.webp' },
    { label: 'Whistleblower Protection', labelEs: 'Protección a Denunciantes',  img: '/pa-whistleblower.webp' },
    { label: 'Investment Fraud',         labelEs: 'Fraude de Inversión',        img: '/bg-capitol.webp' },
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
    <h2 class="text-4xl font-bold text-black mb-10 relative pb-4 text-center font-playfair
      after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-30 after:h-0.5 after:bg-[#EBC24F]">
      {$t.pa_h2}
    </h2>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {#each areas as area}
        <button
          onclick={() => modalOpen = true}
          class="group relative overflow-hidden rounded-xl h-64 w-full text-left focus:outline-none focus:ring-2 focus:ring-[#d8b269]"
        >
          <img
            src={area.img}
            alt={$lang === 'es' ? area.labelEs : area.label}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="400"
            height="256"
            loading="lazy"
          />

          <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

          <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#d8b269] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>

          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-white font-bold text-lg leading-tight font-futura mb-3 group-hover:text-[#f5da98] transition-colors duration-300">
              {$lang === 'es' ? area.labelEs : area.label}
            </h3>
            <span class="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-[#d8b269] text-[#d8b269] rounded group-hover:bg-[#d8b269] group-hover:text-black transition-all duration-300">
              {$t.pa_cta_card}
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
