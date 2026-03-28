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

  function openChat() {
    window.dispatchEvent(new CustomEvent('ch:openchat', { detail: {} }));
  }
</script>

<section bind:this={el} class="bg-[#C9A84C] py-16 px-6">
  <div class="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

    <!-- Left: copy -->
    <div class="transition-all duration-700"
      class:opacity-0={!visible} class:translate-y-4={!visible}
      class:opacity-100={visible} class:translate-y-0={visible}>
      <p class="text-[#3a5166] text-xs uppercase tracking-[0.2em] mb-3 font-['Futura']">AI-Assisted Legal Guidance</p>
      <h2 class="text-[#0D1B2A] font-['Playfair_Display'] font-bold mb-5" style="font-size: clamp(1.8rem, 3vw, 2.4rem);">
        Chat With Our AI Legal Assistant
      </h2>
      <p class="text-[#0D1B2A]/70 text-sm leading-relaxed mb-4">
        Not sure if you have a case? Our AI assistant is available 24/7 to help you understand your legal options — no forms, no waiting, no judgment.
      </p>
      <p class="text-[#0D1B2A]/70 text-sm leading-relaxed">
        Describe your situation in plain English and get immediate, confidential guidance. When you're ready, we'll connect you with the right attorney.
      </p>
    </div>

    <!-- Right: chat prompt card -->
    <div class="transition-all duration-700"
      class:opacity-0={!visible} class:translate-y-4={!visible}
      class:opacity-100={visible} class:translate-y-0={visible}
      style="transition-delay: 150ms;">
      <div class="bg-[#0D1B2A] p-8 flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#0D1B2A]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/>
            </svg>
          </div>
          <div>
            <p class="text-white text-sm font-bold leading-none font-['Futura']">Counsel Hound AI</p>
            <p class="text-[#C9A84C] text-[11px] uppercase tracking-wider mt-0.5 font-['Futura']">Available 24/7</p>
          </div>
          <div class="ml-auto flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-green-400"></span>
            <span class="text-white/50 text-[11px]">Online</span>
          </div>
        </div>

        <div class="bg-white/10 px-4 py-3 text-white/70 text-sm leading-relaxed italic">
          "Hi — have you or a loved one been injured or wronged? Tell me what happened and I'll help you understand your options."
        </div>

        <button
          type="button"
          onclick={openChat}
          class="w-full py-4 bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all duration-200 font-['Futura']"
        >
          Start the Conversation
        </button>

        <p class="text-center text-white/30 text-[11px]">Free &mdash; Confidential &mdash; No obligation</p>
      </div>
    </div>

  </div>
</section>
