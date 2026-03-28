<script lang="ts">
  import type { ActionData } from './$types';
  let { form }: { form: ActionData } = $props();

  let email = $state('');
  let password = $state('');

  function autofill() {
    email = 'richard@frankowskifirm.com';
    password = 'pwd123';
  }
</script>

<svelte:head><title>Admin | Counsel Hound</title></svelte:head>

<div class="min-h-screen bg-[#162d39] flex items-center justify-center px-6">
  <div class="w-full max-w-sm">
    <div class="text-center mb-10">
      <img src="/main-logo.svg" alt="Counsel Hound" class="h-12 mx-auto mb-6" />
      <p class="text-white text-xs uppercase tracking-[0.2em]">Admin Access</p>
    </div>

    <form method="POST" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label class="text-xs uppercase tracking-widest text-white font-['Futura']">Email</label>
        <input
          name="email"
          type="email"
          bind:value={email}
          placeholder="your@email.com"
          class="px-4 py-3 text-sm text-[#162d39] bg-white border-2 border-white outline-none focus:border-[#d8b269] transition-colors placeholder-gray-400"
          autocomplete="email"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xs uppercase tracking-widest text-white font-['Futura']">Password</label>
        <input
          name="password"
          type="password"
          bind:value={password}
          placeholder="••••••••"
          class="px-4 py-3 text-sm text-[#162d39] bg-white border-2 border-white outline-none focus:border-[#d8b269] transition-colors placeholder-gray-400"
          autocomplete="current-password"
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
      <button
        type="button"
        onclick={autofill}
        class="py-2 text-white/50 text-xs hover:text-white transition-colors"
      >
        Autofill credentials
      </button>
    </form>
  </div>
</div>
