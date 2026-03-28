<script lang="ts">
  import type { PageData } from './$types';
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
  import BlogPreview from '$lib/components/BlogPreview.svelte';
  import AiSection from '$lib/components/AiSection.svelte';
  import ChatBubble from '$lib/components/ChatBubble.svelte';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Counsel Hound | Serious Results for Serious Injuries</title>
  <meta name="description" content="Counsel Hound connects you with trusted, vetted attorneys for personal injury, abuse litigation, consumer fraud, defective products, and more — free of charge." />
  <link rel="canonical" href="https://counselhound.com" />
  <meta property="og:title" content="Counsel Hound | Serious Results for Serious Injuries" />
  <meta property="og:description" content="Free attorney matching. No fees until we win. Call +1-855-804-6863." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://counselhound.com" />
  <meta name="twitter:title" content="Counsel Hound | Serious Results for Serious Injuries" />
  <meta name="twitter:description" content="Free attorney matching. No fees until we win. Call +1-855-804-6863." />
</svelte:head>

<Hero />
<ResultsTicker />
<Founder />
<PracticeAreas />
<Process />
<WhyUs />
<Achievements />
<Testimonials />
<FAQ />
<AiSection />
{#if data.recentPosts.length > 0}
  <BlogPreview posts={data.recentPosts} />
{/if}
<ContactSection />
<ChatBubble />
