<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const steps = [
    { num: '01', title: 'Fill Out Our Form',         desc: 'Quickly share the details of your legal issue. It only takes a minute to get started.' },
    { num: '02', title: 'Get A Free Consultation',   desc: 'Talk to a lawyer at no cost. No pressure, just answers.' },
    { num: '03', title: 'Speak With Our Legal Team', desc: 'Work with an experienced attorney who has a proven track record in your practice area.' },
  ];
</script>

<section bind:this={el} class="py-12 bg-[#f8f7f4]">
  <div class="max-w-5xl mx-auto px-6">

    <div class="text-center mb-16">
      <p class="text-xs uppercase tracking-[0.2em] text-[#d8b269] mb-3">How It Works</p>
      <h2 class="text-4xl font-bold text-[#162d39] font-['Playfair_Display']">Our 3 Step Process</h2>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {#each steps as step, i}
        <div
          class="flex flex-col transition-all duration-700"
          class:opacity-0={!visible}
          class:translate-y-6={!visible}
          class:opacity-100={visible}
          class:translate-y-0={visible}
          style="transition-delay: {i * 120}ms;"
        >
          <!-- Step number + connector line -->
          <div class="flex items-center gap-4 mb-6">
            <span class="text-5xl font-black text-[#d8b269] leading-none font-['Futura'] select-none">{step.num}</span>
            {#if i < 2}
              <div class="hidden md:block flex-1 h-px bg-[#d8b269]/30"></div>
            {/if}
          </div>

          <!-- Text -->
          <h3 class="text-xl font-bold text-[#162d39] mb-3 font-['Futura']">{step.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
        </div>
      {/each}
    </div>

    <!-- Single CTA below -->
    <div class="text-center mt-14"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      style="transition-delay: 400ms; transition: opacity 0.7s;">
      <a
        href={config.consultationUrl}
        target="_blank"
        rel="noopener"
        class="inline-block px-8 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200"
      >
        Start Your Free Evaluation
      </a>
    </div>

  </div>
</section>
