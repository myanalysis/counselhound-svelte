<script lang="ts">
  import { page } from '$app/state'

  const is404 = $derived(page.status === 404)
</script>

<svelte:head>
  <title>{is404 ? '404 — Page Not Found' : `${page.status} — Something Went Wrong`} | Counsel Hound</title>
  <meta name="robots" content="noindex"/>
</svelte:head>

<main class="min-h-screen bg-[#162d39] flex items-center justify-center px-6 overflow-hidden relative">

  <!-- Ghost status number -->
  <span aria-hidden="true"
    class="absolute inset-0 flex items-center justify-center
           text-[28rem] font-bold text-white/3 select-none
           leading-none pointer-events-none font-playfair">
    {page.status}
  </span>

  <!-- Decorative hound paw, top right -->
  <div class="absolute top-10 right-10 opacity-[0.06] hidden lg:block" aria-hidden="true">
    <svg width="140" height="140" viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg">
      <!-- Paw print -->
      <ellipse cx="32" cy="40" rx="12" ry="10"/>
      <ellipse cx="18" cy="28" rx="6" ry="7"/>
      <ellipse cx="46" cy="28" rx="6" ry="7"/>
      <ellipse cx="24" cy="18" rx="5" ry="6"/>
      <ellipse cx="40" cy="18" rx="5" ry="6"/>
    </svg>
  </div>

  <div class="relative z-10 text-center max-w-xl">

    <!-- Gold rule + label -->
    <div class="flex items-center justify-center gap-4 mb-8">
      <div class="h-px bg-[#d8b269] flex-1 max-w-15"></div>
      <p class="text-[#d8b269] text-xs tracking-[0.3em] uppercase font-semibold">
        {is404 ? 'Error 404' : `Error ${page.status}`}
      </p>
      <div class="h-px bg-[#d8b269] flex-1 max-w-15"></div>
    </div>

    <!-- Headline -->
    <h1 class="text-white font-playfair text-3xl md:text-4xl leading-tight mb-6">
      {#if is404}
        Even Our Hound<br/>Couldn't Find This Page
      {:else}
        Our Hound Hit<br/>a Dead End
      {/if}
    </h1>

    <!-- Copy -->
    <p class="text-white/50 text-sm leading-relaxed mb-10 max-w-md mx-auto">
      {#if is404}
        Sniffed every corner of the internet. Nothing. The good news — we're
        still very good at tracking down the right attorney for you.
      {:else}
        Sometimes even a good hound loses the scent. Try again, or reach out
        and we'll point you in the right direction.
      {/if}
    </p>

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/"
        class="px-8 py-4 bg-[#d8b269] text-[#162d39] text-xs uppercase
               tracking-widest font-bold hover:bg-[#c9a058] transition-colors">
        Back to Home
      </a>
      <a href="/contact"
        class="px-8 py-4 border border-[#d8b269]/30 text-[#d8b269] text-xs
               uppercase tracking-widest hover:bg-[#d8b269]/10 transition-colors">
        Contact Us
      </a>
    </div>

    <!-- Footer note -->
    <p class="mt-14 text-white/20 text-xs tracking-widest uppercase">
      Counsel Hound — Find the Right Attorney
    </p>

  </div>
</main>
