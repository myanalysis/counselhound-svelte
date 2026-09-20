<script lang="ts">
  import type { ActionData, PageData } from './$types';
  let { form, data }: { form: ActionData; data: PageData } = $props();

  let email = $state('');
  let code = $state('');
</script>

<svelte:head><title>Admin | Counsel Hound</title></svelte:head>

<div class="min-h-screen bg-[#162d39] flex items-center justify-center px-6">
  <div class="w-full max-w-sm">
    <div class="text-center mb-10">
      <img src="/main-logo.svg" alt="Counsel Hound" class="h-12 mx-auto mb-6" />
      <p class="text-white text-xs uppercase tracking-[0.2em]">Admin Access</p>
    </div>

    {#if !data.verify}
      <form method="POST" action="?/sendOtp" novalidate class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="email" class="text-xs uppercase tracking-widest text-white font-futura">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            bind:value={email}
            placeholder="your@email.com"
            required
            class="px-4 py-3 text-sm text-[#162d39] bg-white border-2 border-white outline-none focus:border-[#d8b269] transition-colors placeholder-gray-400"
            autocomplete="email"
          />
        </div>

        {#if form?.error}
          <p class="text-red-400 text-sm">{form.error}</p>
        {/if}

        <button
          type="submit"
          class="py-3 mt-2 bg-[#d8b269] text-[#162d39] font-bold text-sm uppercase tracking-widest hover:bg-[#c9a058] transition-colors duration-200"
        >
          Send Login Code
        </button>
      </form>
    {:else}
      <form method="POST" action="?/verifyOtp" novalidate class="flex flex-col gap-4">
        <p class="text-white/70 text-sm text-center">Enter the 6-digit code sent to your email.</p>

        <div class="flex flex-col gap-2">
          <label for="code" class="text-xs uppercase tracking-widest text-white font-futura">Login Code</label>
          <input
            id="code"
            name="code"
            type="text"
            inputmode="numeric"
            pattern="[0-9]{6}"
            maxlength="6"
            bind:value={code}
            placeholder="000000"
            required
            autofocus
            class="px-4 py-3 text-lg text-[#162d39] bg-white border-2 border-white outline-none focus:border-[#d8b269] transition-colors placeholder-gray-400 tracking-[0.3em] text-center"
            autocomplete="one-time-code"
          />
        </div>

        {#if form?.error}
          <p class="text-red-400 text-sm">{form.error}</p>
        {/if}

        <button
          type="submit"
          class="py-3 mt-2 bg-[#d8b269] text-[#162d39] font-bold text-sm uppercase tracking-widest hover:bg-[#c9a058] transition-colors duration-200"
        >
          Sign In
        </button>
      </form>
      <form method="POST" action="?/clearOtp" class="mt-2">
        <button type="submit"
          class="w-full py-2 text-white/50 text-xs hover:text-white transition-colors bg-transparent border-none cursor-pointer">
          Use a different email
        </button>
      </form>
    {/if}
  </div>
</div>
