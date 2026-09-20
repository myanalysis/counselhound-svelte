<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  import { i18n } from '$lib/i18n/index.svelte';

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
    leaveTimer = setTimeout(() => { megaOpen = false; }, 200);
  }

  function close() { mobileOpen = false; mobilePracticeOpen = false; megaOpen = false; }

  const areas = $derived([
    ...i18n.t.practice.areas.map((a) => ({
      label: a.label,
      slug: a.slug as string | null,
      href: undefined as string | undefined,
      subs: a.subs.map((s) => s.name),
    })),
    {
      label: i18n.t.nav.investmentFraud.label,
      slug: null,
      href: 'https://frankowskifirm.com',
      subs: i18n.t.nav.investmentFraud.subs,
    },
  ]);

  function areaHref(area: { slug: string | null; href?: string }) {
    return area.href ?? i18n.href(`/practice-areas/${area.slug}`);
  }
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
    <a href={i18n.href('/')} onclick={(e) => { handleLogoClick(e); close(); }} class="shrink-0 flex items-center gap-3 transition-all duration-300" style="margin-top: {sticky ? '2px' : '-4px'};">
      <img src="/icon-only.svg" alt="Counsel Hound"
        class="w-auto transition-all duration-300"
        style="height: {sticky ? '36px' : '56px'};"
        width="56" height="56" />
      <div class="flex flex-col leading-none gap-0.5">
        <span class="text-[#d8b269] font-light tracking-[0.15em] font-futura uppercase transition-all duration-300"
          style="font-size: {sticky ? '15px' : '20px'};">
          Counsel Hound
        </span>
        {#if !sticky}
          <span class="text-white/70 text-[9px] uppercase tracking-[0.3em] font-futura">{i18n.t.nav.legalAdvocates}</span>
        {/if}
      </div>
    </a>

    <!-- Desktop nav links — centered -->
    <div class="hidden lg:flex items-center justify-center flex-1 gap-1">
      <a href={i18n.href('/')}
        class="relative px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b]"
        class:text-[#eed08b]={page.url.pathname === i18n.href('/')}
        class:after:w-full={page.url.pathname === i18n.href('/')}
        class:after:w-0={page.url.pathname !== i18n.href('/')}>
        {i18n.t.nav.home}
      </a>
      <a href={i18n.href('/about')}
        class="relative px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full"
        class:text-[#eed08b]={page.url.pathname === i18n.href('/about')}
        class:after:w-full={page.url.pathname === i18n.href('/about')}
        class:after:w-0={page.url.pathname !== i18n.href('/about')}>
        {i18n.t.nav.about}
      </a>
      <a href={i18n.href('/contact')}
        class="relative px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full"
        class:text-[#eed08b]={page.url.pathname === i18n.href('/contact')}
        class:after:w-full={page.url.pathname === i18n.href('/contact')}
        class:after:w-0={page.url.pathname !== i18n.href('/contact')}>
        {i18n.t.nav.contact}
      </a>

      <!-- Practice Areas — triggers mega menu -->
      <span
        class="relative px-2 py-4 text-[15px] font-medium capitalize cursor-pointer transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full"
        class:text-[#eed08b]={megaOpen}
        class:after:w-full={megaOpen}
        class:after:w-0={!megaOpen}
        onmouseenter={megaEnter}
        onmouseleave={megaLeave}
        role="button"
        tabindex="0"
      >
        {i18n.t.nav.practiceAreas}
      </span>

      <a href={i18n.href('/news-and-blogs')}
        class="relative px-2 py-4 text-[15px] font-medium capitalize text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full transition-colors duration-300"
        class:text-[#eed08b]={page.url.pathname.includes('/news-and-blogs')}
        class:after:w-full={page.url.pathname.includes('/news-and-blogs')}
        class:after:w-0={!page.url.pathname.includes('/news-and-blogs')}>
        {i18n.t.nav.blog}
      </a>
      <a href={i18n.href('/videos')}
        class="relative px-2 py-4 text-[15px] font-medium capitalize text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full transition-colors duration-300"
        class:text-[#eed08b]={page.url.pathname === i18n.href('/videos')}
        class:after:w-full={page.url.pathname === i18n.href('/videos')}
        class:after:w-0={page.url.pathname !== i18n.href('/videos')}>
        {i18n.t.nav.videos}
      </a>
    </div>

    <!-- Right: phone (compact when sticky, full when at top) -->
    <div class="hidden lg:flex flex-col items-center w-1/4">
      {#if sticky}
        <a href="tel:{config.phone}"
          class="text-[#eed08b] text-lg font-semibold tracking-wide hover:brightness-125 transition-all font-futura">
          {config.phoneDisplay}
        </a>
      {:else}
        <p class="text-white text-sm font-medium uppercase tracking-wide">{i18n.t.nav.freeConsultation}</p>
        <a href="tel:{config.phone}"
          class="text-white text-[27px] font-medium block leading-tight hover:text-[#eed08b] transition-colors">
          {config.phoneDisplay}
        </a>
        <a
          href="sms:{config.text}"
          class="inline-flex items-center px-4 py-1.5 text-[13px] font-semibold text-[#162d39] bg-[#d8b269] hover:bg-[#c9a058] transition-colors duration-200 mt-1 uppercase tracking-wider"
        >
          {i18n.t.nav.textUs}: {config.textDisplay}
        </a>
        <p class="text-white/60 text-[11px] uppercase tracking-wider mt-1.5">{i18n.t.nav.noFees}</p>
      {/if}
    </div>

    <!-- Hamburger -->
    <button
      class="lg:hidden ml-auto flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
      onclick={() => { mobileOpen = !mobileOpen; }}
      aria-label={i18n.t.nav.menu}>
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
      class="absolute left-0 right-0 bg-[#162d39] border-t border-[rgba(247,215,137,0.3)] z-999998 px-10 py-8 shadow-2xl"
      onmouseenter={megaEnter}
      onmouseleave={megaLeave}
    >
      <div class="grid grid-cols-4 gap-x-8 gap-y-6 max-w-7xl mx-auto">
        {#each areas as area}
          <div>
            <a
              href={areaHref(area)}
              target={area.href ? '_blank' : undefined}
              rel={area.href ? 'noopener' : undefined}
              onclick={close}
              class="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#f7d789] hover:brightness-125 transition-all mb-2 font-futura"
            >
              {area.label}
            </a>
            <div class="flex flex-col gap-1">
              {#each area.subs as sub}
                <a
                  href={areaHref(area)}
                  onclick={close}
                  class="text-[12px] text-white/60 hover:text-white transition-colors leading-snug py-0.5"
                >
                  {sub}
                </a>
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
          { label: i18n.t.nav.home,    href: i18n.href('/') },
          { label: i18n.t.nav.about,   href: i18n.href('/about') },
          { label: i18n.t.nav.contact, href: i18n.href('/contact') },
          { label: i18n.t.nav.blog,    href: i18n.href('/news-and-blogs') },
          { label: i18n.t.nav.videos,  href: i18n.href('/videos') },
        ] as link}
          <a href={link.href} onclick={close}
            class="px-6 py-4 text-sm uppercase tracking-wide border-b border-white/10 text-white hover:text-[#eed08b] transition-colors">
            {link.label}
          </a>
        {/each}

        <button
          onclick={() => mobilePracticeOpen = !mobilePracticeOpen}
          class="px-6 py-4 text-sm uppercase tracking-wide border-b border-white/10 text-left flex justify-between items-center text-white bg-transparent border-x-0 cursor-pointer">
          {i18n.t.nav.practiceAreas}
          <svg class="w-3 h-3 transition-transform duration-200" style="transform: {mobilePracticeOpen ? 'rotate(180deg)' : 'rotate(0deg)'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </button>
        {#if mobilePracticeOpen}
          {#each areas as area}
            <a
              href={areaHref(area)}
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
