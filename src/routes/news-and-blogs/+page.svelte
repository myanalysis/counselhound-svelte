<script lang="ts">
  import PostModal from '$lib/components/PostModal.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let activePost = $state<any>(null);

  const totalPages = $derived.by(() => Math.ceil(data.total / data.limit));

  const ALL_TAGS = [
    'Car Accidents', 'Truck Accidents', 'Motorcycle Accidents',
    'Medical Malpractice', 'Personal Injury', 'Wrongful Death',
    'Product Liability', 'Rideshare Accidents', 'Mass Torts', 'Settlements'
  ];

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function tagHref(tag: string) {
    return `/news-and-blogs?tag=${encodeURIComponent(tag)}${data.q ? '&q=' + data.q : ''}`;
  }

  function pageHref(p: number) {
    return `?page=${p}${data.q ? '&q=' + data.q : ''}${data.tag ? '&tag=' + encodeURIComponent(data.tag) : ''}`;
  }
</script>

<svelte:head>
  <title>Legal News &amp; Blogs | Counsel Hound</title>
  <meta name="description" content="Stay informed with the latest legal news, case updates, and insights from the Counsel Hound team." />
  <link rel="canonical" href="https://counselhound.com/news-and-blogs" />
  <meta property="og:title" content="Legal News & Blogs | Counsel Hound" />
  <meta property="og:description" content="Stay informed with the latest legal news, case updates, and insights from the Counsel Hound team." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com/news-and-blogs" />
  <meta name="twitter:title" content="Legal News & Blogs | Counsel Hound" />
  <meta name="twitter:description" content="Stay informed with the latest legal news, case updates, and insights from the Counsel Hound team." />
</svelte:head>

<!-- Hero -->
<div class="bg-[#162d39] pt-40 pb-16 px-6 text-center">
  <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-3 font-['Futura']">Insights & Updates</p>
  <h1 class="font-bold text-white font-['Playfair_Display']" style="font-size: clamp(2.5rem, 6vw, 4rem);">Legal News &amp; Blogs</h1>
</div>

<section class="py-20 px-6 bg-[#f8f7f4]">
  <div class="max-w-6xl mx-auto">

    <!-- Search -->
    <form class="mb-8 flex gap-3 max-w-lg">
      <input
        name="q"
        value={data.q}
        type="search"
        placeholder="Search posts…"
        class="flex-1 px-5 py-3 text-sm border border-gray-200 bg-white outline-none focus:border-[#162d39] transition-colors"
      />
      {#if data.tag}<input type="hidden" name="tag" value={data.tag} />{/if}
      <button type="submit" class="px-6 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors">
        Search
      </button>
      {#if data.q || data.tag}
        <a href="/news-and-blogs" class="px-4 py-3 text-sm text-gray-400 border border-gray-200 bg-white hover:text-black transition-colors">
          Clear
        </a>
      {/if}
    </form>

    <!-- Tag filter bar -->
    <div class="flex flex-wrap gap-2 mb-10">
      <a
        href="/news-and-blogs{data.q ? '?q=' + data.q : ''}"
        data-sveltekit-noscroll
        class="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors duration-150"
        style="background: {!data.tag ? '#162d39' : 'white'}; color: {!data.tag ? 'white' : '#162d39'}; border-color: {!data.tag ? '#162d39' : '#d1d5db'};"
      >All</a>
      {#each ALL_TAGS as tag}
        <a
          href={tagHref(tag)}
          data-sveltekit-noscroll
          class="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors duration-150"
          style="background: {data.tag === tag ? '#162d39' : 'white'}; color: {data.tag === tag ? 'white' : '#162d39'}; border-color: {data.tag === tag ? '#162d39' : '#d1d5db'};"
        >{tag}</a>
      {/each}
    </div>

    {#if data.q}
      <p class="text-sm text-gray-400 mb-6">{data.total} result{data.total !== 1 ? 's' : ''} for "<span class="text-[#162d39] font-semibold">{data.q}</span>"</p>
    {/if}

    {#if data.posts.length === 0}
      <p class="text-center text-gray-400 py-20">No posts yet.</p>
    {:else}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.posts as post}
          <div class="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300 text-left w-full">
            <div class="h-1 bg-[#d8b269]"></div>
            <div class="flex flex-col flex-1 p-6 gap-4">
              <p class="text-[#d8b269] text-xs uppercase tracking-widest font-['Futura']">{formatDate(post.created_at)}</p>
              <h2 class="text-[#162d39] font-bold text-lg leading-snug font-['Futura'] group-hover:text-[#d8b269] transition-colors duration-200 line-clamp-3">
                {post.title}
              </h2>
              <p class="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
              {#if post.tags?.length}
                <div class="flex flex-wrap gap-1.5">
                  {#each post.tags as tag}
                    <span class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#f0ebe0] text-[#162d39] border border-[#d8b269]/30">
                      {tag}
                    </span>
                  {/each}
                </div>
              {/if}
              <div class="flex items-center justify-between">
                <button
                  type="button"
                  onclick={() => activePost = post}
                  class="text-xs font-bold uppercase tracking-widest text-[#162d39] hover:text-[#d8b269] transition-colors duration-200 cursor-pointer"
                >
                  Read More &rarr;
                </button>
                <span class="flex items-center gap-1 text-gray-500 text-xs">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/></svg>
                  {post.likes ?? 0}
                </span>
              </div>
            </div>
          </div>
        {/each}
      </div>

      {#if totalPages > 1}
        {@const p = data.page}
        {@const pages = (() => {
          const items: (number | '…')[] = [];
          for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= p - 2 && i <= p + 2)) {
              items.push(i);
            } else if (items[items.length - 1] !== '…') {
              items.push('…');
            }
          }
          return items;
        })()}
        <div class="flex justify-center items-center gap-1 mt-16">
          <a href={p > 1 ? pageHref(p - 1) : undefined}
            class="px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors duration-200 font-['Futura']"
            class:pointer-events-none={p === 1} class:opacity-30={p === 1}
            class:border-[#162d39]={p > 1} class:text-[#162d39]={p > 1} class:hover:bg-[#162d39]={p > 1} class:hover:text-white={p > 1}
          >&larr;</a>

          {#each pages as pg}
            {#if pg === '…'}
              <span class="px-3 py-2 text-xs text-gray-400 select-none">…</span>
            {:else}
              <a href={pageHref(pg)}
                class="w-9 h-9 flex items-center justify-center text-xs font-bold font-['Futura'] border transition-colors duration-200"
                class:bg-[#162d39]={p === pg} class:text-white={p === pg} class:border-[#162d39]={p === pg}
                class:bg-white={p !== pg} class:text-[#162d39]={p !== pg} class:border-gray-200={p !== pg}
                class:hover:border-[#162d39]={p !== pg}
              >{pg}</a>
            {/if}
          {/each}

          <a href={p < totalPages ? pageHref(p + 1) : undefined}
            class="px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors duration-200 font-['Futura']"
            class:pointer-events-none={p === totalPages} class:opacity-30={p === totalPages}
            class:border-[#162d39]={p < totalPages} class:text-[#162d39]={p < totalPages} class:hover:bg-[#162d39]={p < totalPages} class:hover:text-white={p < totalPages}
          >&rarr;</a>
        </div>
        <p class="text-center text-xs text-gray-400 mt-4 font-['Futura']">Page {p} of {totalPages}</p>
      {/if}
    {/if}

  </div>
</section>

{#if activePost}
  <PostModal post={activePost} onclose={() => activePost = null} />
{/if}
