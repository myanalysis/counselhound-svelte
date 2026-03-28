<script lang="ts">
  import { onMount } from 'svelte';

  let el: HTMLElement;
  let visible = $state(false);
  let widgetEl: HTMLDivElement;

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);

    // Load Trustpilot bootstrap if not already loaded
    if (!document.querySelector('script[src*="trustpilot"]')) {
      const script = document.createElement('script');
      script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      script.onload = () => initWidget();
      document.head.appendChild(script);
    } else {
      initWidget();
    }

    return () => obs.disconnect();
  });

  function initWidget() {
    if (widgetEl && (window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(widgetEl);
    }
  }
</script>

<section bind:this={el} class="pt-20 pb-10 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto">

    <div class="text-center mb-10 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-3">Testimonials</p>
      <h2 class="text-4xl font-bold text-[#162d39] font-['Playfair_Display']">What Our Clients Say</h2>
    </div>

    <div
      class="transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}
    >
      <div
        bind:this={widgetEl}
        class="trustpilot-widget"
        data-locale="en-US"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id="68a229c58ab85d60204ba331"
        data-style-height="140px"
        data-style-width="100%"
        data-theme="light"
        data-stars="1,2,3,4,5"
      >
        <a href="https://www.trustpilot.com/review/counselhound.com" target="_blank" rel="noopener">Trustpilot</a>
      </div>
    </div>

  </div>
</section>
