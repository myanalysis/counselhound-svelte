<script lang="ts">
  import { config } from '$lib/config';
  import ObfuscatedEmail from '$lib/components/ObfuscatedEmail.svelte';
</script>

<svelte:head>
  <title>Legal Disclaimer | Counsel Hound</title>
  <meta name="description" content="Legal disclaimer for Counsel Hound — attorney advertising and no-guarantee-of-results notice."/>
  <link rel="canonical" href="https://counselhound.com/disclaimer"/>
  <meta name="robots" content="noindex"/>
</svelte:head>

<section class="bg-navy py-16">
  <div class="max-w-4xl mx-auto px-6">
    <p class="text-gold text-xs tracking-widest uppercase mb-3 font-semibold">Legal</p>
    <div class="w-12 h-0.5 bg-gold mb-8"></div>
    <h1 class="text-white text-4xl font-futura">Disclaimer</h1>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-4xl mx-auto px-6 prose prose-lg text-gray-600">

    <p class="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

    <h2>Attorney Advertising</h2>
    <p>This website and the content on it may be considered attorney advertising in some jurisdictions. Counsel Hound is not a law firm. Attorneys in our network are responsible for their own compliance with the advertising rules of the jurisdictions in which they practice.</p>

    <h2>No Guarantee of Outcome</h2>
    <p>Case results, testimonials, and any figures referenced on this site describe the experience of specific individuals and do not guarantee a similar outcome in your case. Every legal matter depends on its own facts, and no attorney can promise a particular result before evaluating your situation.</p>

    <h2>Not a Substitute for Legal Advice</h2>
    <p>Nothing on this website should be taken as legal advice for any individual case or situation. The information on this site is general in nature and may not reflect current legal developments in your state. You should consult a licensed attorney for advice regarding your own circumstances.</p>

    <h2>Independent Network Attorneys</h2>
    <p>Attorneys in the Counsel Hound network are independent practitioners, not employees, agents, or partners of Counsel Hound. Counsel Hound does not supervise or control their legal work and is not responsible for the advice they give or the outcome of any matter they handle.</p>

    <h2>Jurisdiction</h2>
    <p>Network attorneys are licensed in specific states. Nothing on this site should be construed as the practice of law in a jurisdiction where a given attorney is not licensed.</p>

    <h2>Questions</h2>
    <p>If you have questions about this disclaimer, contact us at <ObfuscatedEmail email={config.email} class="text-gold hover:text-navy"/>.</p>

  </div>
</section>
