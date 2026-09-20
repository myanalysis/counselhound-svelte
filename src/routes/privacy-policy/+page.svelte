<script lang="ts">
  import { config } from '$lib/config';
  import ObfuscatedEmail from '$lib/components/ObfuscatedEmail.svelte';
</script>

<svelte:head>
  <title>Privacy Policy | Counsel Hound</title>
  <meta name="description" content="Privacy policy for Counsel Hound — free attorney matching service."/>
  <link rel="canonical" href="https://counselhound.com/privacy-policy"/>
  <meta name="robots" content="noindex"/>
</svelte:head>

<section class="bg-navy py-16">
  <div class="max-w-4xl mx-auto px-6">
    <p class="text-gold text-xs tracking-widest uppercase mb-3 font-semibold">Legal</p>
    <div class="w-12 h-0.5 bg-gold mb-8"></div>
    <h1 class="text-white text-4xl font-futura">Privacy Policy</h1>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-4xl mx-auto px-6 prose prose-lg text-gray-600">

    <p class="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

    <h2>What Counsel Hound Is</h2>
    <p>Counsel Hound is a free attorney matching service, not a law firm. We connect people who submit a case description with independent attorneys in our referral network. We do not provide legal advice or legal representation.</p>

    <h2>Information We Collect</h2>
    <p>When you submit a case description or contact form, we collect the information you voluntarily provide — your name, contact details, and a description of your situation. We also collect standard server log data (IP address, browser type, pages visited) through our hosting provider.</p>

    <h2>How We Use Your Information</h2>
    <p>We use your information to evaluate your case description and, where appropriate, share it with one or more attorneys in our network who may be able to help. We do not sell your information to third parties, and we do not share it for advertising purposes.</p>

    <h2>Sharing With Attorney Network Partners</h2>
    <p>If your case appears to be a fit for representation, we share the information you submitted with one or more attorneys in our vetted network so they can evaluate and, if appropriate, contact you directly. Those attorneys are independent and are bound by their own professional obligations of confidentiality once they are engaged.</p>

    <h2>No Attorney-Client Privilege</h2>
    <p>Submitting a form to Counsel Hound does not create an attorney-client relationship with Counsel Hound or with any attorney in our network. Do not send confidential information you would not want shared with a prospective attorney.</p>

    <h2>Cookies</h2>
    <p>Our website uses minimal cookies for basic functionality, such as remembering your preferences. We do not use tracking cookies for advertising purposes.</p>

    <h2>Data Security</h2>
    <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

    <h2>Contact Us</h2>
    <p>If you have questions about this privacy policy, contact us at <ObfuscatedEmail email={config.email} class="text-gold hover:text-navy"/> or call <a href="tel:{config.phone}" class="text-gold hover:text-navy">{config.phoneDisplay}</a>.</p>

  </div>
</section>
