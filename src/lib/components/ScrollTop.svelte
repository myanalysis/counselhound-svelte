<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  let visible = $state(false);

  onMount(() => {
    const onScroll = () => { visible = window.scrollY > 400; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

{#if visible}
  <button
    type="button"
    onclick={scrollTop}
    aria-label={i18n.t.scrollTop.ariaLabel}
    class="fixed bottom-6 left-6 z-40 w-10 h-10 flex items-center justify-center bg-[#162d39] border border-[#d8b269]/40 text-[#d8b269] hover:bg-[#d8b269] hover:text-[#162d39] transition-all duration-200 shadow-lg"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  </button>
{/if}
