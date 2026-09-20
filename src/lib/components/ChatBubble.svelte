<script lang="ts">
  import { tick, onMount } from 'svelte';
  import { i18n } from '$lib/i18n/index.svelte';

  type Message = { role: 'user' | 'assistant'; content: string };

  let open = $state(false);
  let input = $state('');
  let loading = $state(false);
  let messages = $state<Message[]>([]);

  // Reactive initial greeting based on language
  $effect(() => {
    if (messages.length === 0) {
      messages = [{ role: 'assistant', content: i18n.t.chat.greeting }];
    }
  });

  let messagesEl = $state<HTMLDivElement | null>(null);

  async function scrollToBottom() {
    await tick();
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    input = '';
    messages = [...messages, { role: 'user', content: text }];
    loading = true;
    // Add empty assistant message to show typing dots immediately
    messages = [...messages, { role: 'assistant', content: '' }];
    await scrollToBottom();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Strip the client-side greeting (first assistant message) before sending to API
          messages: messages
            .filter((m, i) => !(i === 0 && m.role === 'assistant'))
            .filter(m => m.content !== '')
            .map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!res.ok) throw new Error('Failed');

      const reply = await res.text();
      // Replace the empty placeholder with the real reply
      messages = [...messages.slice(0, -1), { role: 'assistant', content: reply }];
      await scrollToBottom();
    } catch {
      // Replace empty placeholder with error message
      messages = [...messages.slice(0, -1), { role: 'assistant', content: i18n.t.chat.error }];
    } finally {
      loading = false;
      await scrollToBottom();
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  onMount(() => {
    function handleOpenChat(e: Event) {
      const text = (e as CustomEvent).detail?.text;
      open = true;
      if (text) {
        input = text;
        setTimeout(() => send(), 50);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (!open) return;
      const target = e.target as HTMLElement;
      if (!target.closest('[data-chat-window]') && !target.closest('[data-chat-bubble]')) {
        open = false;
      }
    }
    window.addEventListener('ch:openchat', handleOpenChat);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('ch:openchat', handleOpenChat);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
</script>

<!-- Bubble button -->
<button
  type="button"
  onclick={() => open = !open}
  data-chat-bubble
  class="fixed bottom-6 right-6 z-999998 w-14 h-14 rounded-full bg-[#d8b269] shadow-xl flex items-center justify-center hover:brightness-110 transition-all duration-200"
  aria-label={i18n.t.chat.ariaLabel}
>
  {#if open}
    <svg class="w-5 h-5 text-[#162d39]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  {:else}
    <svg class="w-6 h-6 text-[#162d39]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/>
    </svg>
    <!-- Pulse ring -->
    <span class="absolute w-14 h-14 rounded-full bg-[#d8b269]/50 animate-ping"></span>
  {/if}
</button>

<!-- Chat window -->
{#if open}
  <div data-chat-window class="fixed bottom-24 right-6 z-999997 w-90 max-w-[calc(100vw-3rem)] bg-white shadow-2xl flex flex-col rounded-none overflow-hidden"
    style="height: 480px;">

    <!-- Header -->
    <div class="bg-[#162d39] px-5 py-4 flex items-center gap-3 shrink-0">
      <div class="w-8 h-8 rounded-full bg-[#d8b269] flex items-center justify-center shrink-0">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>
      </div>
      <div>
        <p class="text-white text-sm font-bold leading-none">Counsel Hound</p>
        <p class="text-[#d8b269] text-[11px] uppercase tracking-wider mt-0.5">{i18n.t.chat.headerSub}</p>
      </div>
      <div class="ml-auto flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-green-400"></span>
        <span class="text-white/60 text-[11px]">{i18n.t.chat.online}</span>
      </div>
    </div>

    <!-- Messages -->
    <div bind:this={messagesEl} class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f8f7f4]">
      {#each messages as msg}
        <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div
            class="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
            style="background: {msg.role === 'user' ? '#162d39' : 'white'}; color: {msg.role === 'user' ? 'white' : '#374151'}; box-shadow: 0 1px 2px rgba(0,0,0,0.08);"
          >
            {#if msg.content}
              {msg.content}
            {:else}
              <span class="flex gap-1 items-center py-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style="animation-delay:300ms"></span>
              </span>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Input -->
    <div class="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 shrink-0">
      <textarea
        bind:value={input}
        onkeydown={handleKey}
        placeholder={i18n.t.chat.placeholder}
        rows="1"
        disabled={loading}
        class="flex-1 resize-none px-3 py-2 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors bg-white disabled:opacity-50"
      ></textarea>
      <button
        type="button"
        onclick={send}
        disabled={loading || !input.trim()}
        class="px-4 py-2 bg-[#162d39] text-white text-sm font-semibold hover:bg-[#1e3a4a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
      >
        {i18n.t.chat.send}
      </button>
    </div>

    <!-- Footer nudge -->
    <div class="px-4 py-2 bg-white border-t border-gray-100 text-center shrink-0">
      <a href="tel:+18558046863" class="text-[11px] text-[#162d39] font-semibold hover:text-[#d8b269] transition-colors uppercase tracking-wider">
        {i18n.t.chat.callCta}
      </a>
    </div>
  </div>
{/if}
