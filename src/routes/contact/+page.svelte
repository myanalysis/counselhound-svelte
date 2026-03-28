<script lang="ts">
  import { onMount } from 'svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';

  let visible = $state(false);
  onMount(() => setTimeout(() => visible = true, 100));
</script>

<svelte:head>
  <title>Contact Us | Counsel Hound</title>
  <meta name="description" content="Contact Counsel Hound for a free case evaluation. Call, text, or email us. We respond within one business day." />
  <link rel="canonical" href="https://counselhound.com/contact" />
  <meta property="og:title" content="Contact Us | Counsel Hound" />
  <meta property="og:description" content="Contact Counsel Hound for a free case evaluation. Call, text, or email us. We respond within one business day." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com/contact" />
  <meta name="twitter:title" content="Contact Us | Counsel Hound" />
  <meta name="twitter:description" content="Contact Counsel Hound for a free case evaluation. Call, text, or email us." />
</svelte:head>

<!-- Hero -->
<section class="relative pt-40 pb-20 px-6 overflow-hidden bg-[#0D1B2A]">
  <div class="absolute inset-0 bg-cover bg-center opacity-[0.15]" style="background-image: url('/bg-capitol.png');"></div>
  <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(13,27,42,0.6), #0D1B2A);"></div>
  <div class="relative z-10 max-w-4xl mx-auto text-center">
    <p class="text-xs tracking-[0.2em] uppercase mb-4 text-[#C9A84C] font-['Futura'] transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 100ms;">
      Get In Touch
    </p>
    <h1 class="mb-6 text-[#F0EDE8] font-['Playfair_Display'] font-bold transition-all duration-700"
      class:opacity-0={!visible} class:-translate-y-4={!visible} class:opacity-100={visible} class:translate-y-0={visible}
      style="font-size: clamp(2.5rem, 6vw, 4rem); transition-delay: 200ms;">
      Contact Us
    </h1>
    <div class="w-16 h-0.5 mx-auto bg-[#C9A84C] transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
      style="transition-delay: 300ms;"></div>
  </div>
</section>

<ContactSection />
