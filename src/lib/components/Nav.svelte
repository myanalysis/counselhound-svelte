<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { config } from '$lib/config';

  let sticky = $state(false);
  let mobileOpen = $state(false);
  let mobilePracticeOpen = $state(false);
  let megaOpen = $state(false);
  let leaveTimer: ReturnType<typeof setTimeout>;
  let logoClicks = $state(0);
  let clickTimer: ReturnType<typeof setTimeout>;

  function handleLogoClick(e: MouseEvent) {
    clearTimeout(clickTimer);
    logoClicks += 1;
    if (logoClicks >= 5) {
      logoClicks = 0;
      e.preventDefault();
      window.location.href = '/admin/login';
      return;
    }
    clickTimer = setTimeout(() => { logoClicks = 0; }, 2000);
    // let normal navigation happen (href="/")
  }

  onMount(() => {
    const onScroll = () => { sticky = window.scrollY > 110; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function megaEnter() {
    clearTimeout(leaveTimer);
    megaOpen = true;
  }

  function megaLeave() {
    leaveTimer = setTimeout(() => { megaOpen = false; }, 10);
  }

  function close() { mobileOpen = false; mobilePracticeOpen = false; megaOpen = false; }

  const areas = [
    {
      label: 'Abuse Litigation',
      slug: 'abuse-litigation',
      subs: ['Boy Scouts Abuse', 'Clergy Abuse', 'Human Trafficking', 'Elder Abuse', 'Lyft/Uber Abuse', 'Nursing Home Abuse'],
    },
    {
      label: 'Personal Injury',
      slug: 'personal-injury',
      subs: ['Car Accident', 'Motorcycle Accidents', 'Drunk Driver Liability', 'Uber & Lyft Accidents', 'Aviation Accidents', 'Bicycle / E-bike', 'Boating & Maritime', 'Pedestrian Accident', 'Truck Accident'],
    },
    {
      label: 'Consumer Fraud',
      slug: 'consumer-fraud',
      subs: ['Data Breach', 'Identity Theft', 'TCPA'],
    },
    {
      label: 'Defective Products',
      slug: 'defective-products',
      subs: ['Opioids', '3M Earplugs', 'Dicamba', 'CPAP', 'Prevacid', 'Zantac', 'Nexium', 'Hip Replacement', 'Pressure Cooker', 'Surgical Stapler', 'Transvaginal Mesh'],
    },
    {
      label: 'Medical Injury',
      slug: 'medical-injury',
      subs: ['Cerebral Palsy', 'COVID Vaccine Injury', "Erb's Palsy"],
    },
    {
      label: 'Toxic Torts',
      slug: 'toxic-torts',
      subs: ['Asbestosis', 'Mesothelioma', 'Paraquat', 'Roundup', 'Talcum Powder'],
    },
    {
      label: 'Whistleblower Protection',
      slug: 'whistleblower-protection',
      subs: ['Qui Tam', 'SEC Whistleblower'],
    },
    {
      label: 'Investment Fraud',
      slug: null,
      href: 'https://frankowskifirm.com',
      subs: ['Securities Arbitration', 'Broker Misconduct', 'Annuity Fraud'],
    },
  ];
</script>

<header
  class="top-0 left-0 right-0 z-50 w-full transition-all duration-300"
  class:absolute={!sticky}
  class:fixed={sticky}
  class:bg-transparent={!sticky}
  class:bg-[#162d39]={sticky}
  class:animate-[fadeInDown_0.3s_ease]={sticky}
>
  <!-- Main row -->
  <div class="flex items-center mx-8 py-2.5" class:py-0={sticky}>

    <!-- Logo -->
    <a href="/" onclick={(e) => { handleLogoClick(e); close(); }} class="shrink-0 flex items-center gap-3 -mt-1">
      <img src="/icon-only.svg" alt="Counsel Hound" class="h-14 w-auto" />
      <div class="flex flex-col leading-none gap-0.5">
        <span class="text-[#d8b269] font-light text-xl tracking-[0.15em] font-['Futura'] uppercase">Counsel Hound</span>
        <span class="text-white/70 text-[9px] uppercase tracking-[0.3em] font-['Futura']">Legal Advocates</span>
      </div>
    </a>

    <!-- Desktop nav links — centered -->
    <div class="hidden lg:flex items-center justify-center flex-1 gap-1">
      <a href="/"
        class="px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300"
        style="color: {$page.url.pathname === '/' ? '#eed08b' : '#fff'};">
        Home
      </a>
      <a href="/about"
        class="px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300"
        style="color: {$page.url.pathname === '/about' ? '#eed08b' : '#fff'};">
        About Us
      </a>
      <a href="/contact"
        class="px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300"
        style="color: {$page.url.pathname === '/contact' ? '#eed08b' : '#fff'};">
        Contact Us
      </a>

      <!-- Practice Areas — triggers mega menu -->
      <span
        class="px-2 py-4 text-[15px] font-medium capitalize cursor-pointer transition-colors duration-300"
        style="color: {megaOpen ? '#eed08b' : '#fff'};"
        onmouseenter={megaEnter}
        onmouseleave={megaLeave}
        role="button"
        tabindex="0"
      >
        Practice Areas
      </span>

      <a href="/news-and-blogs"
        class="px-2 py-4 text-[15px] font-medium capitalize text-white hover:text-[#eed08b] transition-colors duration-300">
        Legal News &amp; Blogs
      </a>
    </div>

    <!-- Right: phone + text button -->
    <div class="hidden lg:flex flex-col items-center w-1/4">
      <p class="text-white text-sm font-medium uppercase tracking-wide">Free Consultation</p>
      <a href="tel:{config.phone}"
        class="text-white text-[27px] font-medium block leading-tight hover:text-[#eed08b] transition-colors">
        {config.phoneDisplay}
      </a>
      <a
        href="sms:{config.text}"
        class="inline-flex items-center px-4 py-1.5 text-[13px] font-semibold text-[#162d39] bg-[#d8b269] hover:bg-[#c9a058] transition-colors duration-200 mt-1 uppercase tracking-wider"
      >
        Text Us: {config.textDisplay}
      </a>
      <p class="text-white/60 text-[11px] uppercase tracking-wider mt-1.5">No Fees Until We Win</p>
    </div>

    <!-- Hamburger -->
    <button
      class="lg:hidden ml-auto flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
      onclick={() => { mobileOpen = !mobileOpen; }}
      aria-label="Menu">
      <span class="block w-6 h-0.5 bg-white transition-all duration-300"
        style="transform: {mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none'};"></span>
      <span class="block w-6 h-0.5 bg-white transition-all duration-300"
        style="opacity: {mobileOpen ? '0' : '1'};"></span>
      <span class="block w-6 h-0.5 bg-white transition-all duration-300"
        style="transform: {mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none'};"></span>
    </button>
  </div>

  <!-- Mega menu — full width panel below main row -->
  {#if megaOpen}
    <div
      role="navigation"
      aria-label="Practice Areas menu"
      class="absolute left-0 right-0 bg-[#162d39] border-t-2 border-b-2 border-[#f7d789] z-999998 px-10 py-8"
      onmouseenter={megaEnter}
      onmouseleave={megaLeave}
    >
      <div class="flex flex-wrap gap-10 max-w-7xl mx-auto">
        {#each areas as area}
          <div class="w-[22%] min-w-44">
            <!-- Gold bar before each column -->
            <div class="h-0.5 w-8 bg-[#f7d789] mb-2.5"></div>
            <a
              href={area.href ?? `/practice-areas/${area.slug}`}
              target={area.href ? '_blank' : undefined}
              rel={area.href ? 'noopener' : undefined}
              onclick={close}
              class="block text-[22px] font-semibold text-white hover:text-[#eed08b] transition-colors mb-3"
            >
              {area.label}
            </a>
            <div class="max-h-60 overflow-y-auto pr-2">
              {#each area.subs as sub}
                <div class="mb-2.5 pr-5">
                  <a
                    href={area.href ?? `/practice-areas/${area.slug}`}
                    onclick={close}
                    class="block text-base font-semibold text-white hover:text-[#eed08b] transition-colors leading-snug"
                  >
                    {sub}
                  </a>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="lg:hidden bg-[#162d39]">
      <div class="flex flex-col">
        {#each [
          { label: 'Home',               href: '/' },
          { label: 'About Us',           href: '/about' },
          { label: 'Contact Us',         href: '/contact' },
          { label: 'Legal News & Blogs', href: '/news-and-blogs' },
        ] as link}
          <a href={link.href} onclick={close}
            class="px-6 py-4 text-sm uppercase tracking-wide border-b border-white/10 text-white hover:text-[#eed08b] transition-colors">
            {link.label}
          </a>
        {/each}

        <button
          onclick={() => mobilePracticeOpen = !mobilePracticeOpen}
          class="px-6 py-4 text-sm uppercase tracking-wide border-b border-white/10 text-left flex justify-between items-center text-white bg-transparent border-x-0 cursor-pointer">
          Practice Areas
          <svg class="w-3 h-3 transition-transform duration-200" style="transform: {mobilePracticeOpen ? 'rotate(180deg)' : 'rotate(0deg)'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </button>
        {#if mobilePracticeOpen}
          {#each areas as area}
            <a
              href={area.href ?? `/practice-areas/${area.slug}`}
              target={area.href ? '_blank' : undefined}
              rel={area.href ? 'noopener' : undefined}
              onclick={close}
              class="block pl-10 pr-6 py-3 text-sm border-b border-white/10 text-white/70 hover:text-[#eed08b] transition-colors bg-black/20">
              {area.label}
            </a>
          {/each}
        {/if}

        <a href="tel:{config.phone}" onclick={close}
          class="mx-6 my-4 py-3 text-center font-bold text-[#162d39] bg-[#d8b269] hover:bg-[#c9a058] transition-colors uppercase tracking-wider">
          {config.phoneDisplay}
        </a>
      </div>
    </div>
  {/if}

</header>
