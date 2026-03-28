<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  let visible = $state(false);
  let videoOpen = $state(false);

  // Replace with actual YouTube/Vimeo embed URL when available
  const VIDEO_URL = '';

  onMount(() => setTimeout(() => visible = true, 100));
</script>

<svelte:head>
  <title>About Us | Counsel Hound</title>
  <meta name="description" content="Learn about Richard Frankowski and the Counsel Hound network of vetted personal injury attorneys across the United States." />
  <link rel="canonical" href="https://counselhound.com/about" />
  <meta property="og:title" content="About Us | Counsel Hound" />
  <meta property="og:description" content="Learn about Richard Frankowski and the Counsel Hound network of vetted personal injury attorneys across the United States." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com/about" />
  <meta name="twitter:title" content="About Us | Counsel Hound" />
  <meta name="twitter:description" content="Learn about Richard Frankowski and the Counsel Hound network of vetted personal injury attorneys across the United States." />
</svelte:head>

<!-- Hero -->
<section class="relative pt-40 pb-16 px-6 overflow-hidden bg-[#0D1B2A]">
  <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/bg-capitol.png');"></div>
  <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(13,27,42,0.6), #0D1B2A);"></div>
  <div class="relative z-10 max-w-4xl mx-auto text-center">
    <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#C9A84C] font-['Futura'] transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 100ms;">
      Our Story
    </p>
    <h1 class="mb-6 text-[#F0EDE8] font-['Playfair_Display'] font-bold transition-all duration-700"
      class:opacity-0={!visible} class:-translate-y-4={!visible} class:opacity-100={visible} class:translate-y-0={visible}
      style="font-size: clamp(2.5rem, 6vw, 4rem); transition-delay: 200ms;">
      About Counsel Hound
    </h1>
    <div class="w-16 h-0.5 mx-auto bg-[#C9A84C] transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 300ms;"></div>
  </div>
</section>

<!-- About / Founder -->
<section class="py-16 px-6 bg-white">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    <div class="transition-all duration-700"
      class:opacity-0={!visible} class:-translate-x-6={!visible}
      class:opacity-100={visible} class:translate-x-0={visible}
      style="transition-delay: 100ms;">
      <button type="button" onclick={() => videoOpen = true} class="relative block w-full group cursor-pointer">
        <img src="/richard-video.png" alt="Richard Frankowski" class="w-full border-2 border-[#C9A84C] group-hover:brightness-90 transition-all duration-200" />
      </button>
    </div>
    <div class="transition-all duration-700"
      class:opacity-0={!visible} class:translate-x-6={!visible}
      class:opacity-100={visible} class:translate-x-0={visible}
      style="transition-delay: 200ms;">
      <p class="text-xs tracking-[0.2em] uppercase mb-3 text-[#C9A84C] font-['Futura']">Our Founder</p>
      <h2 class="mb-6 text-[#162d39] font-['Playfair_Display'] font-bold"
        style="font-size: clamp(1.8rem, 3vw, 2.6rem);">
        About Counsel Hound
      </h2>
      <div class="w-14 h-0.5 mb-8 bg-[#C9A84C]"></div>
      <div class="flex flex-col gap-4 text-sm leading-relaxed mb-8 text-gray-600">
        <p>In a landscape filled with incessant TV advertisements, billboards, and pay-to-play legal referral services, doing your own research to find the right lawyer for the practice area you need can be overwhelming.</p>
        <p>Richard Frankowski founded Counsel Hound to help people cut through the noise and "hunt down" a high-quality lawyer well suited for their particular case. Richard has practiced law around the United States for over twenty years and has worked with amazing lawyers that consistently perform at the highest level.</p>
        <p>Through his relationships, Richard has established a network of highly-qualified counsel that represent clients in almost every area of the law. Richard is the owner of The Frankowski Firm, LLC based in Birmingham, AL, and Incline Village, NV. His practice focuses on representing investors who have been financially injured as a result of stockbroker negligence and fraud.</p>
      </div>
      <!-- Credentials -->
      <div class="grid grid-cols-2 gap-3 mb-8">
        {#each [
          { label: 'Education', value: 'Georgetown University\nUniv. of Alabama School of Law' },
          { label: 'Rating', value: 'AV Preeminent®\nMartindale-Hubbell' },
          { label: 'Memberships', value: 'PIABA Foundation\nBoard Member' },
          { label: 'Published', value: '2 Books — ABA\n& PIABA Press' },
        ] as c}
          <div class="border-l-2 border-[#C9A84C] pl-3">
            <p class="text-[10px] uppercase tracking-widest text-[#C9A84C] font-['Futura'] mb-0.5">{c.label}</p>
            <p class="text-xs text-gray-600 leading-snug whitespace-pre-line">{c.value}</p>
          </div>
        {/each}
      </div>

      <blockquote class="border-l-4 border-[#C9A84C] pl-5 italic text-lg leading-relaxed text-[#162d39] font-serif">
        "We don't all have a best friend that is a lawyer — but now, you do."
      </blockquote>
      <img src="/signature.webp" alt="Richard Frankowski signature" class="mt-6 h-16 w-auto opacity-80" />
      <p class="mt-2 text-sm text-gray-500 font-['Futura'] uppercase tracking-widest">CEO &amp; Founder, Counsel Hound</p>
    </div>
  </div>
</section>

<!-- Our Approach -->
<section class="py-16 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <p class="text-xs tracking-[0.2em] uppercase mb-3 text-[#C9A84C] font-['Futura']">How We Work</p>
      <h2 class="mb-6 text-[#162d39] font-['Playfair_Display'] font-bold"
        style="font-size: clamp(1.8rem, 3vw, 2.6rem);">
        Our Approach
      </h2>
      <div class="w-14 h-0.5 mb-8 bg-[#C9A84C]"></div>
      <div class="flex flex-col gap-4 text-sm leading-relaxed text-gray-600">
        <p>Counsel Hound refers clients only to lawyers that we personally know to have an excellent reputation for zealous trial advocacy and/or attorneys that we have thoroughly researched. If the lawyers at Counsel Hound do not have a relationship with a lawyer well-suited for your case, our lawyers will utilize our network of attorneys and extensively research any lawyer we recommend.</p>
        <p>We will also research all publicly available information on state bar websites that provide information about every recommended lawyer's licensing, firm affiliation, education, court admissions, areas of expertise, specialties, and disciplinary history.</p>
      </div>

      <!-- 3 approach pillars -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {#each [
          { label: 'Vetted Network', desc: 'Every attorney is personally vetted for reputation and results.' },
          { label: 'Deep Research', desc: 'We check bar records, track records, and disciplinary history.' },
          { label: 'No Cost to You', desc: 'Our referral service is completely free — no fees unless you win.' },
        ] as p}
          <div class="border-t-2 border-[#C9A84C] pt-4">
            <p class="text-xs uppercase tracking-widest font-bold text-[#162d39] mb-1 font-['Futura']">{p.label}</p>
            <p class="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      {#each [
        { value: '35+',       label: 'Years Experience' },
        { value: '50',        label: 'States Served' },
        { value: '1,000+',    label: 'Clients Helped' },
        { value: '$M+',       label: 'Recovered' },
      ] as stat, i}
        <div class="bg-[#162d39] p-8 flex flex-col justify-center"
          class:bg-[#C9A84C]={i === 0}>
          <p class="font-black font-['Futura'] leading-none mb-2 {i === 0 ? 'text-[#162d39]' : 'text-[#C9A84C]'}"
            style="font-size: clamp(2rem, 4vw, 3rem);">{stat.value}</p>
          <p class="text-xs uppercase tracking-widest font-['Futura'] {i === 0 ? 'text-[#162d39]/70' : 'text-white/70'}">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 px-6 text-center bg-[#C9A84C]">
  <div class="max-w-2xl mx-auto">
    <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#0D1B2A]/60 font-['Futura']">Get Started</p>
    <h2 class="mb-6 text-[#0D1B2A] font-['Playfair_Display'] font-bold"
      style="font-size: clamp(1.8rem, 3vw, 2.4rem);">
      Ready to Find Your Lawyer?
    </h2>
    <p class="text-sm mb-10 text-[#0D1B2A]/70">
      Let us connect you with a trusted attorney — at no cost to you.
    </p>
    <a href={config.consultationUrl} target="_blank" rel="noopener"
      class="inline-block bg-[#0D1B2A] text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-125 transition-all duration-200">
      Request Free Consultation
    </a>
  </div>
</section>

<!-- Video Modal -->
{#if videoOpen}
<dialog open
  class="fixed inset-0 z-100 w-full h-full max-w-none max-h-none m-0 p-0 bg-black/80 flex items-center justify-center"
  onclick={(e) => { if (e.target === e.currentTarget) videoOpen = false; }}
>
  <div class="bg-black w-full max-w-4xl mx-4 shadow-2xl flex flex-col">
    <div class="flex items-center justify-between px-5 py-3 bg-[#162d39]">
      <span class="text-white/70 text-xs uppercase tracking-widest font-['Futura']">Richard Frankowski</span>
      <button type="button" onclick={() => videoOpen = false}
        class="text-white/60 hover:text-white transition-colors text-2xl leading-none">&times;</button>
    </div>
    <div class="aspect-video w-full bg-black flex items-center justify-center">
      {#if VIDEO_URL}
        <iframe
          src={VIDEO_URL}
          class="w-full h-full"
          allow="autoplay; fullscreen"
          allowfullscreen
          title="Richard Frankowski"
        ></iframe>
      {:else}
        <p class="text-white/40 text-sm">Video coming soon.</p>
      {/if}
    </div>
  </div>
</dialog>
{/if}
