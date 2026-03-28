<script lang="ts">
  const results = [
    { label: 'Georgia Opioid Settlement',                 amount: 'Over $1B over the next 18 years' },
    { label: 'Opioid Abuse Litigation',                   amount: '$728M for Alabama' },
    { label: 'Mississippi Opioid Settlement',             amount: '$370 Million' },
    { label: 'Blue Cross Blue Shield Provider Settlement', amount: '$2.67B Settlement Fund' },
    { label: 'Consumer Fraud',                            amount: '$5 Million' },
    { label: 'Defective Products',                        amount: '$3 Million' },
    { label: 'Medical Injury',                            amount: '$1 Million' },
    { label: 'Personal Injury',                           amount: '$3 Million' },
    { label: 'Abuse Litigation',                          amount: '$1 Million' },
    { label: 'Personal Injury',                           amount: '$4 Million' },
  ];
  const doubled = [...results, ...results];
</script>

<!-- Dark navy bg, gold top/bottom border — matches .million_slider -->
<div class="overflow-hidden py-5 bg-[#162d39] border-t-2 border-b-2 border-[#d8b269]">
  <div class="flex w-max animate-[ticker_60s_linear_infinite] hover:[animation-play-state:paused]">
    {#each doubled as r, i}
      <div class="flex flex-col items-center px-8 text-center min-w-44"
        class:border-l={i !== 0}
        style={i !== 0 ? 'border-color: rgba(255,255,255,0.2);' : ''}>
        <p class="text-[10px] font-black uppercase tracking-[2px] mb-2 bg-linear-to-r from-[#ffe3b3] to-[#b78a2b] bg-clip-text text-transparent">
          {r.label}
        </p>
        <h3 class="text-base font-black uppercase text-white">
          {r.amount}
        </h3>
      </div>
    {/each}
  </div>
</div>
