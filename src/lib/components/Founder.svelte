<script lang="ts">
  import { onMount } from 'svelte';
  let el: HTMLElement;
  let visible = $state(false);
  let videoOpen = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="relative py-12 px-6 bg-white overflow-hidden">
  <div
    class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center transition-all duration-700"
    class:opacity-0={!visible}
    class:translate-y-8={!visible}
    class:opacity-100={visible}
    class:translate-y-0={visible}
  >
    <!-- Image left -->
    <div class="flex justify-center lg:justify-start">
      <button
        type="button"
        onclick={() => videoOpen = true}
        class="relative group cursor-pointer w-full max-w-lg focus:outline-none"
        aria-label="Play founder video"
      >
        <img
          src="/richard-video.png"
          alt="Richard Frankowski, Founder"
          class="w-full"
        />
        <!-- Play button overlay -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-20 h-20 rounded-full bg-[#162d39]/80 flex items-center justify-center group-hover:bg-[#d8b269] transition-colors duration-200">
            <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </button>
    </div>

    <!-- Text right -->
    <div>
      <h2 class="text-3xl font-bold text-black mb-4 font-['Futura']">
        A Message From our Founder, Richard Frankowski
      </h2>
      <p class="text-gray-500 text-lg leading-relaxed mb-4">
        Richard has practiced law around the United States for over thirty-five years.
        He has worked with amazing lawyers throughout his career who consistently perform
        at the highest level. Through his extensive network of highly-qualified counsel,
        Richard became passionate about connecting people to lawyers in the practice area
        of their need.
      </p>
      <p class="text-gray-500 text-lg leading-relaxed mb-8">
        We don't all have a best friend that is a lawyer to make a recommendation for us
        but now, you do. Richard created Counsel Hound to help you find your lawyer.
      </p>
      <a
        href="/about"
        class="inline-block px-10 py-4 bg-[#162d39] text-white font-semibold text-sm uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200"
      >
        About Us
      </a>
    </div>
  </div>

  <!-- Decorative watermark bottom-right -->
  <img
    src="/frame-gold.png"
    alt=""
    aria-hidden="true"
    class="absolute bottom-0 right-0 opacity-10 w-48 pointer-events-none"
  />
</section>

<!-- Video Modal -->
{#if videoOpen}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Founder video"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
    onclick={() => videoOpen = false}
    onkeydown={(e) => e.key === 'Escape' && (videoOpen = false)}
  >
    <div
      class="relative w-full max-w-3xl aspect-video bg-black"
      onclick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onclick={() => videoOpen = false}
        class="absolute -top-10 right-0 text-white text-sm uppercase tracking-widest hover:text-[#d8b269] transition-colors"
      >
        Close ✕
      </button>
      <!-- Replace src with actual video URL when available -->
      <div class="w-full h-full flex items-center justify-center text-white/40 text-sm uppercase tracking-widest">
        Video coming soon
      </div>
    </div>
  </div>
{/if}
