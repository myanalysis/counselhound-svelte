<script lang="ts">
  import { i18n } from '$lib/i18n/index.svelte';

  type CaseResult = { amount: string; description: string; category: string };

  let { caseResults = [] }: { caseResults: CaseResult[] } = $props();

  const items = $derived(caseResults.length > 0 ? caseResults : i18n.t.ticker.fallback);
  const doubled = $derived([...items, ...items]);
</script>

<!-- Dark navy bg, gold top/bottom border — matches .million_slider -->
<div class="overflow-hidden py-5 bg-[#162d39] border-t-2 border-b-2 border-[#d8b269]">
  <div class="flex w-max animate-[ticker_60s_linear_infinite] hover:[animation-play-state:paused]">
    {#each doubled as r, i}
      <div class="flex flex-col items-center px-8 text-center min-w-44"
        class:border-l={i !== 0}
        style={i !== 0 ? 'border-color: rgba(255,255,255,0.2);' : ''}>
        <p class="text-[10px] font-black uppercase tracking-[2px] mb-2 bg-linear-to-r from-[#ffe3b3] to-[#b78a2b] bg-clip-text text-transparent">
          {r.category}
        </p>
        <p class="text-base font-black uppercase text-white">
          {r.amount}
        </p>
      </div>
    {/each}
  </div>
</div>
