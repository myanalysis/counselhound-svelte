<script lang="ts">
  import { browser } from '$app/environment';

  let { post, onclose }: { post: any; onclose: () => void } = $props();

  let likes = $state(post.likes ?? 0);
  let liked = $state(browser ? localStorage.getItem(`liked:${post.slug}`) === '1' : false);

  async function like() {
    if (liked) return;
    const res = await fetch(`/api/posts/${post.slug}/like`, { method: 'POST' });
    const data = await res.json();
    likes = data.likes;
    liked = true;
    if (browser) localStorage.setItem(`liked:${post.slug}`, '1');
  }

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderContent(text: string): string {
    if (/<[a-z][\s\S]*>/i.test(text)) return text;
    return text.split(/\n\n+/).map(p => `<p>${p.trim()}</p>`).filter(p => p !== '<p></p>').join('');
  }
</script>

<dialog
  open
  class="fixed inset-0 z-100 w-full h-full max-w-none max-h-none m-0 p-0 bg-black/60 flex items-center justify-center"
  onclick={(e) => { if (e.target === e.currentTarget) onclose(); }}
>
  <div class="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">

    <!-- Header -->
    <div class="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-start justify-between gap-4 z-10">
      <div>
        <p class="text-[#d8b269] text-xs uppercase tracking-widest font-['Futura'] mb-1">{formatDate(post.created_at)}</p>
        <h2 class="text-2xl font-bold text-[#162d39] font-['Futura'] leading-snug">{post.title}</h2>
      </div>
      <div class="flex items-center gap-4 shrink-0">
        <button type="button" onclick={(e) => { e.stopPropagation(); like(); }} class="flex items-center gap-1.5 text-sm font-semibold" class:text-[#d8b269]={liked} class:text-[#162d39]={!liked}>
          <svg class="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
          </svg>
          {likes}
        </button>
        <button type="button" onclick={onclose} class="text-gray-400 hover:text-black transition-colors" aria-label="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Tags -->
    {#if post.tags?.length}
      <div class="px-8 pt-4 flex flex-wrap gap-1.5">
        {#each post.tags as tag}
          <span class="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#f0ebe0] text-[#162d39] border border-[#d8b269]/40">{tag}</span>
        {/each}
      </div>
    {/if}

    <!-- Body -->
    <div class="px-8 py-8 text-gray-600 text-base leading-relaxed prose prose-sm max-w-none">
      {@html renderContent(post.content)}
    </div>

    <!-- Footer -->
    <div class="px-8 py-5 border-t border-gray-100 flex items-center justify-between">
      <button type="button" onclick={onclose} class="text-sm text-gray-400 hover:text-black transition-colors">
        &larr; Back
      </button>
      <a href="/contact" onclick={onclose} class="inline-block px-8 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200">
        Free Consultation
      </a>
    </div>

  </div>
</dialog>
