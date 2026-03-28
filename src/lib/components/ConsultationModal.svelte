<script lang="ts">
  let { onclose }: { onclose: () => void } = $props();
</script>

<div
  class="fixed inset-0 z-999998 bg-black/60 flex justify-center"
  onclick={onclose}
  onkeydown={(e) => e.key === 'Escape' && onclose()}
  role="dialog"
  tabindex="-1"
  aria-modal="true"
  aria-label="Free Case Evaluation"
>
  <div
    class="relative bg-white w-full max-w-xl flex flex-col shadow-2xl mt-40 max-h-[calc(100dvh-160px)]"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.stopPropagation()}
    role="document"
  >
    <!-- Sticky header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
      <h3 class="text-xl font-bold text-[#162d39] font-['Futura']">Free Case Evaluation</h3>
      <button
        onclick={onclose}
        class="text-gray-400 hover:text-black bg-transparent border-none cursor-pointer"
        aria-label="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <!-- Scrollable body -->
    <div class="flex-1 overflow-y-auto px-6 pb-4">
      <p class="text-gray-500 text-sm mt-3 mb-0">
        Our professionals will evaluate your case and recommend trusted lawyers in all 50 states. Free — no fees until we win.
      </p>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/Grc2KAlvIjaEDjQzv4XT"
        class="-mt-6 w-full"
        style="height:856px; border:none;"
        title="Consultation Request Form"
      ></iframe>
      <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    </div>
  </div>
</div>
