<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  import { lang, t } from '$lib/i18n';
  import type { Lang } from '$lib/i18n';

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
    leaveTimer = setTimeout(() => { megaOpen = false; }, 10);
  }

  function close() { mobileOpen = false; mobilePracticeOpen = false; megaOpen = false; }

  function setLang(l: Lang) { lang.set(l); }

  const areas = [
    {
      label: 'Abuse Litigation',
      labelEs: 'Litigios de Abuso',
      slug: 'abuse-litigation',
      subs:   ['Boy Scouts Abuse', 'Clergy Abuse', 'Human Trafficking', 'Elder Abuse', 'Lyft/Uber Abuse', 'Nursing Home Abuse'],
      subsEs: ['Abuso en Boy Scouts', 'Abuso Clerical', 'Tráfico Humano', 'Abuso de Mayores', 'Abuso en Lyft/Uber', 'Abuso en Hogares de Ancianos'],
    },
    {
      label: 'Personal Injury',
      labelEs: 'Lesiones Personales',
      slug: 'personal-injury',
      subs:   ['Car Accident', 'Motorcycle Accidents', 'Drunk Driver Liability', 'Uber & Lyft Accidents', 'Aviation Accidents', 'Bicycle / E-bike', 'Boating & Maritime', 'Pedestrian Accident', 'Truck Accident'],
      subsEs: ['Accidente de Auto', 'Accidentes de Motocicleta', 'Conductor Ebrio', 'Accidentes en Uber & Lyft', 'Accidentes de Aviación', 'Bicicleta / E-bike', 'Náutica y Marítimo', 'Accidente Peatonal', 'Accidente de Camión'],
    },
    {
      label: 'Consumer Fraud',
      labelEs: 'Fraude al Consumidor',
      slug: 'consumer-fraud',
      subs:   ['Data Breach', 'Identity Theft', 'TCPA'],
      subsEs: ['Filtración de Datos', 'Robo de Identidad', 'TCPA'],
    },
    {
      label: 'Defective Products',
      labelEs: 'Productos Defectuosos',
      slug: 'defective-products',
      subs:   ['Opioids', '3M Earplugs', 'Dicamba', 'CPAP', 'Prevacid', 'Zantac', 'Nexium', 'Hip Replacement', 'Pressure Cooker', 'Surgical Stapler', 'Transvaginal Mesh'],
      subsEs: ['Opioides', 'Tapones 3M', 'Dicamba', 'CPAP', 'Prevacid', 'Zantac', 'Nexium', 'Reemplazo de Cadera', 'Olla a Presión', 'Grapadora Quirúrgica', 'Malla Transvaginal'],
    },
    {
      label: 'Medical Injury',
      labelEs: 'Lesiones Médicas',
      slug: 'medical-injury',
      subs:   ['Cerebral Palsy', 'COVID Vaccine Injury', "Erb's Palsy"],
      subsEs: ['Parálisis Cerebral', 'Lesión por Vacuna COVID', 'Parálisis de Erb'],
    },
    {
      label: 'Toxic Torts',
      labelEs: 'Daños por Tóxicos',
      slug: 'toxic-torts',
      subs:   ['Asbestosis', 'Mesothelioma', 'Paraquat', 'Roundup', 'Talcum Powder'],
      subsEs: ['Asbestosis', 'Mesotelioma', 'Paraquat', 'Roundup', 'Polvo de Talco'],
    },
    {
      label: 'Whistleblower Protection',
      labelEs: 'Protección a Denunciantes',
      slug: 'whistleblower-protection',
      subs:   ['Qui Tam', 'SEC Whistleblower'],
      subsEs: ['Qui Tam', 'Denunciante ante la SEC'],
    },
    {
      label: 'Investment Fraud',
      labelEs: 'Fraude de Inversión',
      slug: null,
      href: 'https://frankowskifirm.com',
      subs:   ['Securities Arbitration', 'Broker Misconduct', 'Annuity Fraud'],
      subsEs: ['Arbitraje de Valores', 'Mala Conducta del Corredor', 'Fraude de Anualidades'],
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
      <img src="/icon-only.svg" alt="Counsel Hound" class="h-14 w-auto" width="56" height="56" />
      <div class="flex flex-col leading-none gap-0.5">
        <span class="text-[#d8b269] font-light text-xl tracking-[0.15em] font-futura uppercase">Counsel Hound</span>
        <span class="text-white/70 text-[9px] uppercase tracking-[0.3em] font-futura">Legal Advocates</span>
      </div>
    </a>

    <!-- Desktop nav links — centered -->
    <div class="hidden lg:flex items-center justify-center flex-1 gap-1">
      <a href="/"
        class="relative px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b]"
        class:text-[#eed08b]={$page.url.pathname === '/'}
        class:after:w-full={$page.url.pathname === '/'}
        class:after:w-0={$page.url.pathname !== '/'}>
        {$t.nav_home}
      </a>
      <a href="/about"
        class="relative px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full"
        class:text-[#eed08b]={$page.url.pathname === '/about'}
        class:after:w-full={$page.url.pathname === '/about'}
        class:after:w-0={$page.url.pathname !== '/about'}>
        {$t.nav_about}
      </a>
      <a href="/contact"
        class="relative px-2 py-4 text-[15px] font-medium capitalize transition-colors duration-300 text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full"
        class:text-[#eed08b]={$page.url.pathname === '/contact'}
        class:after:w-full={$page.url.pathname === '/contact'}
        class:after:w-0={$page.url.pathname !== '/contact'}>
        {$t.nav_contact}
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
        {$t.nav_practice}
      </span>

      <a href="/news-and-blogs"
        class="relative px-2 py-4 text-[15px] font-medium capitalize text-white after:absolute after:bottom-2 after:left-0 after:h-0.5 after:bg-[#eed08b] after:transition-all after:duration-300 hover:text-[#eed08b] hover:after:w-full transition-colors duration-300"
        class:text-[#eed08b]={$page.url.pathname.startsWith('/news-and-blogs')}
        class:after:w-full={$page.url.pathname.startsWith('/news-and-blogs')}
        class:after:w-0={!$page.url.pathname.startsWith('/news-and-blogs')}>
        {$t.nav_blog}
      </a>
    </div>

    <!-- Right: phone + text button + lang toggle -->
    <div class="hidden lg:flex flex-col items-center w-1/4">
      <p class="text-white text-sm font-medium uppercase tracking-wide">{$t.nav_free_consultation}</p>
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
      <p class="text-white/60 text-[11px] uppercase tracking-wider mt-1.5">{$t.nav_no_fees}</p>

      <!-- Language toggle -->
      <div class="flex items-center gap-1 mt-2">
        <button
          type="button"
          onclick={() => setLang('en')}
          class="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 transition-colors duration-200 cursor-pointer border-b border-transparent text-white/40"
          class:text-[#d8b269]={$lang === 'en'}
          class:border-[#d8b269]={$lang === 'en'}
        >EN</button>
        <span class="text-white/20 text-[11px]">|</span>
        <button
          type="button"
          onclick={() => setLang('es')}
          class="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 transition-colors duration-200 cursor-pointer border-b border-transparent text-white/40"
          class:text-[#d8b269]={$lang === 'es'}
          class:border-[#d8b269]={$lang === 'es'}
        >ES</button>
      </div>
    </div>

    <!-- Hamburger -->
    <button
      class="lg:hidden ml-auto flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
      onclick={() => { mobileOpen = !mobileOpen; }}
      aria-label={$t.nav_menu}>
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
            <div class="h-0.5 w-8 bg-[#f7d789] mb-2.5"></div>
            <a
              href={area.href ?? `/practice-areas/${area.slug}`}
              target={area.href ? '_blank' : undefined}
              rel={area.href ? 'noopener' : undefined}
              onclick={close}
              class="block text-[22px] font-semibold text-white hover:text-[#eed08b] transition-colors mb-3"
            >
              {$lang === 'es' ? area.labelEs : area.label}
            </a>
            <div class="max-h-60 overflow-y-auto pr-2">
              {#each ($lang === 'es' ? area.subsEs : area.subs) as sub}
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
          { label: $t.nav_home,    href: '/' },
          { label: $t.nav_about,   href: '/about' },
          { label: $t.nav_contact, href: '/contact' },
          { label: $t.nav_blog,    href: '/news-and-blogs' },
        ] as link}
          <a href={link.href} onclick={close}
            class="px-6 py-4 text-sm uppercase tracking-wide border-b border-white/10 text-white hover:text-[#eed08b] transition-colors">
            {link.label}
          </a>
        {/each}

        <button
          onclick={() => mobilePracticeOpen = !mobilePracticeOpen}
          class="px-6 py-4 text-sm uppercase tracking-wide border-b border-white/10 text-left flex justify-between items-center text-white bg-transparent border-x-0 cursor-pointer">
          {$t.nav_practice}
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
              {$lang === 'es' ? area.labelEs : area.label}
            </a>
          {/each}
        {/if}

        <!-- Mobile language toggle -->
        <div class="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          <button
            type="button"
            onclick={() => setLang('en')}
            class="text-xs font-bold uppercase tracking-widest px-3 py-1 transition-colors duration-200 cursor-pointer border border-transparent text-white/40"
            class:text-[#d8b269]={$lang === 'en'}
            class:border-[#d8b269]={$lang === 'en'}
          >EN</button>
          <button
            type="button"
            onclick={() => setLang('es')}
            class="text-xs font-bold uppercase tracking-widest px-3 py-1 transition-colors duration-200 cursor-pointer border border-transparent text-white/40"
            class:text-[#d8b269]={$lang === 'es'}
            class:border-[#d8b269]={$lang === 'es'}
          >ES</button>
        </div>

        <a href="tel:{config.phone}" onclick={close}
          class="mx-6 my-4 py-3 text-center font-bold text-[#162d39] bg-[#d8b269] hover:bg-[#c9a058] transition-colors uppercase tracking-wider">
          {config.phoneDisplay}
        </a>
      </div>
    </div>
  {/if}

</header>
