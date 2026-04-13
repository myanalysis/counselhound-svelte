<script lang="ts">
  import ConsultationModal from '$lib/components/ConsultationModal.svelte';
  import { t } from '$lib/i18n';
  let modalOpen = $state(false);
</script>

<section
  aria-label="Hero — Serious Results for Serious Injuries"
  class="relative h-screen flex items-center justify-center bg-cover bg-bottom bg-scroll md:bg-fixed"
  style="background-image: url('/Home-page-Banner-3.webp');"
>

<div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
    <div class="inline-block border border-[#C9A017]/60 px-8 py-3 mb-10">
      <span class="text-[#C9A017] text-sm tracking-[0.25em] uppercase font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {$t.hero_badge}
      </span>
    </div>

    <h1 class="font-futura text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.05] tracking-tight mb-8 [text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.4)]">
      <span class="text-white font-thin">{$t.hero_h1_top}</span><br />
      <span class="text-[#C9A017]">{@html $t.hero_h1_bot.replace('\n', '<br />')}</span>
    </h1>

    <p class="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 [text-shadow:0_2px_6px_rgba(0,0,0,0.7)]">
      {$t.hero_sub}
    </p>

    <button
      type="button"
      onclick={() => modalOpen = true}
      class="inline-block bg-[#d8b269] text-[#162d39] font-bold text-lg tracking-wide uppercase px-10 py-4 hover:bg-[#c9a058] transition-colors duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.4)] cursor-pointer">
      {$t.hero_cta}
    </button>
  </div>
</section>

{#if modalOpen}
  <ConsultationModal onclose={() => modalOpen = false} />
{/if}
