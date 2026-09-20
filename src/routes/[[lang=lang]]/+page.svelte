<script lang="ts">
  import type { PageData } from './$types';
  import { i18n } from '$lib/i18n/index.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import ResultsTicker from '$lib/components/ResultsTicker.svelte';
  import Founder from '$lib/components/Founder.svelte';
  import PracticeAreas from '$lib/components/PracticeAreas.svelte';
  import Process from '$lib/components/Process.svelte';
  import WhyUs from '$lib/components/WhyUs.svelte';
  import Achievements from '$lib/components/Achievements.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import LocationsSection from '$lib/components/LocationsSection.svelte';
  import VideoPreview from '$lib/components/VideoPreview.svelte';
  import BlogPreview from '$lib/components/BlogPreview.svelte';
  import AiSection from '$lib/components/AiSection.svelte';
  import ChatBubble from '$lib/components/ChatBubble.svelte';

  let { data }: { data: PageData } = $props();

  const faqSchema = $derived(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": i18n.t.faqTeaser.items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  }));
</script>

<svelte:head>
  <title>{i18n.t.meta.title}</title>
  <meta name="description" content={i18n.t.meta.description} />
  <link rel="canonical" href="https://counselhound.com{i18n.href('/')}" />
  <meta property="og:title" content={i18n.t.meta.title} />
  <meta property="og:description" content={i18n.t.meta.ogDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com{i18n.href('/')}" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta property="og:image:secure_url" content="https://counselhound.com/og-default.jpg" />
  <meta property="og:image:alt" content="Counsel Hound — Serious Results for Serious Injuries" />
  <meta name="twitter:title" content={i18n.t.meta.title} />
  <meta name="twitter:description" content={i18n.t.meta.ogDescription} />
  <meta name="keywords" content={i18n.t.meta.keywords} />
  <link rel="preload" as="image" href="/Home-page-Banner-3.webp" fetchpriority="high" />
  <link rel="prefetch" href={i18n.href('/contact')} />
  {@html `<script type="application/ld+json">${faqSchema}<\/script>`}
</svelte:head>

<Hero />
<ResultsTicker caseResults={data.caseResults} />
<Founder />
<PracticeAreas />
<Process />
<WhyUs />
<Achievements />
<Testimonials testimonials={data.testimonials} />
<FAQ />
<AiSection />
<VideoPreview />
{#if data.recentPosts.length > 0}
  <BlogPreview posts={data.recentPosts} />
{/if}
<ContactSection />
<LocationsSection />
<ChatBubble />
