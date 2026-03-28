<script lang="ts">
  import { onMount } from 'svelte';
  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const badges = [
    { src: '/achievement-1.svg', title: 'Expertise.com', desc: 'Best Litigation Attorneys in Birmingham — 2022' },
    { src: '/achievement-2.svg', title: 'Avvo Rating 10.0 Superb', desc: 'Top Attorney — Investment Fraud' },
    { src: '/achievement-3.svg', title: 'AV Preeminent®', desc: 'Martindale-Hubbell — Peer Rated for Highest Level of Professional Excellence' },
    { src: '/achievement-4.svg', title: 'The National Trial Lawyers', desc: 'Top 100 Trial Lawyers' },
    { src: '/achievement-5.svg', title: 'Super Lawyers®', desc: 'Richard Frankowski — SuperLawyers.com' },
    { src: '/achievement-6.svg', title: 'Super Lawyers®', desc: 'Listed Attorney' },
  ];
</script>

<section bind:this={el} class="bg-white py-12 px-6">
  <div class="max-w-5xl mx-auto">

    <div class="text-center mb-14 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-3">Recognition</p>
      <h2 class="text-4xl font-bold text-[#162d39] font-['Playfair_Display']">Our Achievements</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
      {#each badges as badge, i}
        <div
          class="flex items-center justify-center transition-all duration-700"
          class:opacity-0={!visible}
          class:scale-95={!visible}
          class:opacity-100={visible}
          class:scale-100={visible}
          style="transition-delay: {i * 80}ms;"
        >
          <div class="group relative w-full max-w-56 transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_4px_16px_rgba(201,168,76,0.35)]">
            <img src={badge.src} alt={badge.title} class="w-full h-auto object-contain block" />
            <!-- Hover overlay — clipped to image -->
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-[#162d39]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
              <p class="text-[#C9A84C] text-xs font-bold uppercase tracking-widest font-['Futura'] mb-2">{badge.title}</p>
              <p class="text-white/80 text-xs leading-snug">{badge.desc}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
