<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let sending = $state(false);
</script>

<svelte:head><title>Send Email — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <h1 class="text-2xl font-bold text-navy mb-2">Send Email</h1>
  <p class="text-gray-400 text-sm mb-8">Send a direct email from the Counsel Hound account.</p>

  <div class="max-w-xl">
    {#if form?.sent}
      <div class="mb-6 px-5 py-4 bg-green-50 border border-green-200 rounded text-sm text-green-700 font-medium">
        Email sent successfully.
      </div>
    {/if}
    {#if form?.error}
      <div class="mb-6 px-5 py-4 bg-red-50 border border-red-200 rounded text-sm text-red-600">
        {form.error}
      </div>
    {/if}

    <form
      method="POST"
      action="?/send"
      use:enhance={() => {
        sending = true;
        return async ({ update }) => {
          await update();
          sending = false;
        };
      }}
      class="flex flex-col gap-5 bg-white border border-gray-100 rounded p-6"
    >
      <div class="flex flex-col gap-1.5">
        <label for="to" class="text-xs uppercase tracking-widest text-gray-400">To *</label>
        <input id="to" name="to" type="text" required placeholder="recipient@example.com"
          class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="subject" class="text-xs uppercase tracking-widest text-gray-400">Subject *</label>
        <input id="subject" name="subject" type="text" required
          class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="body" class="text-xs uppercase tracking-widest text-gray-400">Body *</label>
        <textarea id="body" name="body" rows="6" required
          class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors resize-none"></textarea>
      </div>
      <div>
        <button type="submit" disabled={sending}
          class="px-8 py-3 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {sending ? 'Sending…' : 'Send Email'}
        </button>
      </div>
    </form>
  </div>
</div>
