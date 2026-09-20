<script lang="ts">
  import { i18n } from '$lib/i18n/index.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const post = $derived(data.post);
  const b = $derived(i18n.t.blog);

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderContent(text: string): string {
    if (/<[a-z][\s\S]*>/i.test(text)) return text;
    return text.split(/\n\n+/).map(p => `<p>${p.trim()}</p>`).filter(p => p !== '<p></p>').join('');
  }
</script>

<svelte:head>
  <title>{post.title} | Counsel Hound</title>
  <meta name="description" content={post.excerpt} />
  <link rel="canonical" href="https://counselhound.com{i18n.href(`/news-and-blogs/${post.slug}`)}" />
  <meta property="og:title" content="{post.title} | Counsel Hound" />
  <meta property="og:description" content={post.excerpt} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://counselhound.com{i18n.href(`/news-and-blogs/${post.slug}`)}" />
  <meta property="og:image" content={post.featured_image ? `https://counselhound.com${post.featured_image}` : 'https://counselhound.com/og-default.jpg'} />
  <meta property="og:image:alt" content={post.title} />
  <meta property="article:published_time" content={post.created_at} />
  <meta property="article:modified_time" content={post.updated_at ?? post.created_at} />
  <meta property="article:author" content="Counsel Hound" />
  <meta property="article:section" content={post.category} />
  {#each (post.tags ?? []) as tag}<meta property="article:tag" content={tag} />{/each}
  <meta name="keywords" content={[post.category, ...(post.tags ?? [])].join(', ')} />
  <meta name="twitter:title" content="{post.title} | Counsel Hound" />
  <meta name="twitter:description" content={post.excerpt} />
  {@html `<script type="application/ld+json">${JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.featured_image ? `https://counselhound.com${post.featured_image}` : "https://counselhound.com/og-default.jpg",
      "datePublished": post.created_at,
      "dateModified": post.updated_at ?? post.created_at,
      "author": { "@type": "Organization", "name": "Counsel Hound", "url": "https://counselhound.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Counsel Hound",
        "logo": { "@type": "ImageObject", "url": "https://counselhound.com/main-logo.svg" }
      },
      "url": `https://counselhound.com${i18n.href(`/news-and-blogs/${post.slug}`)}`
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
        { "@type": "ListItem", "position": 2, "name": b.metaTitle, "item": `https://counselhound.com${i18n.href('/news-and-blogs')}` },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://counselhound.com${i18n.href(`/news-and-blogs/${post.slug}`)}` },
      ]
    }
  ])}<\/script>`}
</svelte:head>

<!-- Banner -->
<div class="bg-[#162d39] pt-40 pb-16 px-6">
  <div class="max-w-3xl mx-auto">
    <p class="text-[#d8b269] text-xs uppercase tracking-[0.2em] mb-4">{post.category} &bull; {formatDate(post.created_at)}</p>
    <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight font-futura">{post.title}</h1>
  </div>
</div>

<!-- Content -->
<section class="py-20 px-6 bg-white">
  <div class="max-w-3xl mx-auto">

    <div class="text-gray-600 text-base leading-relaxed prose prose-sm max-w-none">
      {@html renderContent(post.content)}
    </div>

    <div class="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
      <a href={i18n.href('/news-and-blogs')} class="text-sm font-bold uppercase tracking-widest text-[#162d39] hover:text-[#d8b269] transition-colors duration-200">
        {b.backToBlog}
      </a>
      <a
        href={i18n.href('/contact')}
        class="inline-block px-8 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors duration-200"
      >
        {b.freeConsultation}
      </a>
    </div>
  </div>
</section>
