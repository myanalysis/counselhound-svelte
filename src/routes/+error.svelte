<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'} | Counsel Hound</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-6">
  <div class="max-w-lg text-center">

    <p class="text-[#C9A84C] text-xs uppercase tracking-[0.3em] font-futura mb-4">
      {$page.status === 404 ? 'Error 404' : `Error ${$page.status}`}
    </p>

    <h1 class="text-5xl font-bold text-white font-playfair mb-6">
      {$page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
    </h1>

    <p class="text-[rgba(240,237,232,0.6)] text-sm leading-relaxed mb-10">
      {#if $page.status === 404}
        The page you're looking for doesn't exist or has been moved.
        If you were looking for legal help, we're still here.
      {:else}
        We hit an unexpected error. Please try again or contact us directly.
      {/if}
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/"
        class="px-8 py-3 bg-[#C9A84C] text-[#0D1B2A] text-xs uppercase tracking-widest font-futura font-bold hover:bg-[#e0bf6a] transition-colors">
        Back to Home
      </a>
      <a href="/contact"
        class="px-8 py-3 border border-[#C9A84C] text-[#C9A84C] text-xs uppercase tracking-widest font-futura hover:bg-[#C9A84C]/10 transition-colors">
        Contact Us
      </a>
    </div>

  </div>
</main>
