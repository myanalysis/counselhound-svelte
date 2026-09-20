<script lang="ts">
  import { config } from '$lib/config';
  import ObfuscatedEmail from '$lib/components/ObfuscatedEmail.svelte';
</script>

<svelte:head>
  <title>Terms of Service | Counsel Hound</title>
  <meta name="description" content="Terms of service for the Counsel Hound website and attorney matching service."/>
  <link rel="canonical" href="https://counselhound.com/terms-of-service"/>
  <meta name="robots" content="noindex"/>
</svelte:head>

<section class="bg-navy py-16">
  <div class="max-w-4xl mx-auto px-6">
    <p class="text-gold text-xs tracking-widest uppercase mb-3 font-semibold">Legal</p>
    <div class="w-12 h-0.5 bg-gold mb-8"></div>
    <h1 class="text-white text-4xl font-futura">Terms of Service</h1>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-4xl mx-auto px-6 prose prose-lg text-gray-600">

    <p class="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

    <h2>Acceptance of Terms</h2>
    <p>By accessing this website or submitting a case description, you agree to these terms of service. If you do not agree, please do not use this site.</p>

    <h2>Counsel Hound Is a Matching Service, Not a Law Firm</h2>
    <p>Counsel Hound is a free service that connects individuals with independent attorneys in our network. Counsel Hound does not practice law, does not provide legal advice, and is not a party to any attorney-client relationship you may form with a network attorney. Submitting information to Counsel Hound does not create an attorney-client relationship with Counsel Hound.</p>

    <h2>No Guarantee of a Match or of Results</h2>
    <p>Submitting a case description does not guarantee that an attorney will accept your case, or that any particular outcome will result if one does. Every case is different and must be evaluated on its own facts. Testimonials on this site are not indicative of future results.</p>

    <h2>How We're Paid</h2>
    <p>Counsel Hound is free to use. If an attorney in our network accepts your case, that attorney pays Counsel Hound a referral fee. You are never charged anything by Counsel Hound.</p>

    <h2>No Legal Advice</h2>
    <p>Information on this website is for general informational purposes only and does not constitute legal advice. Do not act on information from this site without first consulting a qualified attorney about your specific situation.</p>

    <h2>Intellectual Property</h2>
    <p>All content on this website, including text, graphics, and logos, is the property of Counsel Hound and may not be reproduced without written permission.</p>

    <h2>External Links</h2>
    <p>This website may link to third-party resources for your convenience. We do not endorse or control those sites and are not responsible for their content.</p>

    <h2>Changes to These Terms</h2>
    <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance.</p>

    <h2>Contact</h2>
    <p>Questions? Contact us at <ObfuscatedEmail email={config.email} class="text-gold hover:text-navy"/>.</p>

  </div>
</section>
