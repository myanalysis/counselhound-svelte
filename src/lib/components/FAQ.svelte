<script lang="ts">
  import { onMount } from 'svelte';
  import { faqItems } from '$lib/data/practiceAreas';

  let el: HTMLElement;
  let visible = $state(false);
  let openIndex = $state<number | null>(null);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<section bind:this={el} class="py-12 px-6 bg-[#152232]">
  <div class="max-w-3xl mx-auto">

    <div class="text-center mb-14 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <div class="w-14 h-0.5 mx-auto mb-4 bg-[#C9A84C]"></div>
      <h2 class="text-3xl uppercase tracking-wide text-[#F0EDE8] font-['Futura']">
        Frequently Asked <span class="text-[#C9A84C]">Questions</span>
      </h2>
    </div>

    <div class="flex flex-col gap-3">
      {#each faqItems as item, i}
        <div
          class="border transition-all duration-700 bg-[#0D1B2A]"
          class:opacity-0={!visible}
          class:translate-y-4={!visible}
          class:opacity-100={visible}
          class:translate-y-0={visible}
          style="border-color: {openIndex === i ? '#C9A84C' : 'rgba(201,168,76,0.15)'}; transition-delay: {i * 60}ms;"
        >
          <button
            class="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
            onclick={() => toggle(i)}
          >
            <span class="text-sm uppercase tracking-widest font-['Futura']"
              style="color: {openIndex === i ? '#C9A84C' : '#F0EDE8'};">
              {item.q}
            </span>
            <span
              class="shrink-0 w-6 h-6 flex items-center justify-center border border-[rgba(201,168,76,0.4)] rounded-full text-[#C9A84C] transition-transform duration-300"
              style="transform: {openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'};"
            >
              +
            </span>
          </button>

          {#if openIndex === i}
            <div class="px-6 pb-6">
              <div class="h-px mb-4 bg-[rgba(201,168,76,0.15)]"></div>
              <p class="text-sm leading-relaxed text-[rgba(240,237,232,0.65)]">
                {item.a}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

  </div>
</section>
