<script lang="ts">
  import { onMount } from 'svelte';
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const stats = [
    { value: '25+',      label: 'Years Experience',      desc: 'Unmatched insight, strategy, and resilience built over three decades of practice.' },
    { value: '100s',     label: 'of Happy Clients',      desc: 'Hundreds of people have trusted us with their most important legal matters.' },
    { value: '$M+',      label: 'Recovered',             desc: 'Our results speak for themselves — millions secured in settlements and verdicts.' },
    { value: '50',       label: 'States Covered',        desc: 'We connect you with proven attorneys in all 50 states, no matter where you are.' },
  ];
</script>

<section bind:this={el} class="bg-[#3a5166] py-12 px-6">
  <div class="max-w-6xl mx-auto">

    <!-- Top: label + headline + body — left aligned -->
    <div
      class="max-w-2xl mb-20 transition-all duration-700"
      class:opacity-0={!visible} class:translate-y-6={!visible}
      class:opacity-100={visible} class:translate-y-0={visible}
    >
      <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-3">Why Choose Us</p>
      <h2 class="text-4xl font-bold text-white mb-6 font-['Playfair_Display']">Why Counsel Hound?</h2>
      <p class="text-white/60 text-lg leading-relaxed">
        Finding the right lawyer shouldn't be stressful. With over 25 years of experience, we've connected
        hundreds of clients with top-tier legal professionals — resulting in millions recovered. We take the
        guesswork out of your search by matching you with trusted, proven attorneys best suited to your case.
      </p>
    </div>

    <!-- Stats row — no boxes, just big numbers + dividers -->
    <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
      {#each stats as s, i}
        <div
          class="px-8 first:pl-0 last:pr-0 transition-all duration-700"
          class:opacity-0={!visible} class:translate-y-4={!visible}
          class:opacity-100={visible} class:translate-y-0={visible}
          style="transition-delay: {i * 100}ms;"
        >
          <p class="text-[#d8b269] text-5xl font-black font-['Futura'] leading-none mb-2">{s.value}</p>
          <p class="text-white text-sm font-bold uppercase tracking-widest mb-3 font-['Futura']">{s.label}</p>
          <p class="text-white/40 text-sm leading-relaxed">{s.desc}</p>
        </div>
      {/each}
    </div>

  </div>
</section>
