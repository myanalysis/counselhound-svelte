<script lang="ts">
  import { onMount } from 'svelte';

  let { posts }: { posts: any[] } = $props();

  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<section bind:this={el} class="py-12 px-6 bg-white">
  <div class="max-w-6xl mx-auto">

    <div class="flex items-end justify-between mb-16 transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <div>
        <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-3">Legal Insights</p>
        <h2 class="text-4xl font-bold text-[#162d39] font-['Playfair_Display']">News &amp; Blogs</h2>
      </div>
      <a href="/news-and-blogs" class="text-sm font-bold uppercase tracking-widest text-[#162d39] hover:text-[#d8b269] transition-colors duration-200 hidden md:block">
        View All &rarr;
      </a>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {#each posts as post, i}
        <a
          href="/news-and-blogs/{post.slug}"
          class="group flex flex-col bg-[#f8f7f4] hover:shadow-lg transition-all duration-300"
          class:opacity-0={!visible} class:translate-y-6={!visible}
          class:opacity-100={visible} class:translate-y-0={visible}
          style="transition-delay: {i * 100}ms;"
        >
          <div class="h-1 bg-[#d8b269]"></div>
          <div class="flex flex-col flex-1 p-6 gap-4">
            <p class="text-[#d8b269] text-xs uppercase tracking-widest font-['Futura']">{formatDate(post.created_at)}</p>
            <h3 class="text-[#162d39] font-bold text-lg leading-snug font-['Futura'] group-hover:text-[#d8b269] transition-colors duration-200 line-clamp-3">
              {post.title}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
            <span class="text-xs font-bold uppercase tracking-widest text-[#162d39] group-hover:text-[#d8b269] transition-colors duration-200">
              Read More &rarr;
            </span>
          </div>
        </a>
      {/each}
    </div>

    <div class="text-center mt-10 md:hidden transition-all duration-700"
      class:opacity-0={!visible} class:opacity-100={visible}>
      <a href="/news-and-blogs" class="inline-block px-8 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200">
        View All Posts
      </a>
    </div>

  </div>
</section>
