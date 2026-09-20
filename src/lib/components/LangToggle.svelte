<script lang="ts">
  import { i18n } from '$lib/i18n/index.svelte';
  import type { Lang } from '$lib/i18n/index.svelte';
</script>

<div class="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-px shadow-lg">
  {#each (['en', 'es'] as Lang[]) as l}
    <a
      href={i18n.altHref(l)}
      aria-pressed={i18n.lang === l}
      class="px-2.5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 leading-none {i18n.lang === l ? 'bg-[#d8b269] text-[#162d39]' : 'bg-[#162d39] text-white/50 hover:text-white/80'}"
    >{l.toUpperCase()}</a>
  {/each}
</div>
