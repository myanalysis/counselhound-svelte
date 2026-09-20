<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';
  import { i18n } from '$lib/i18n/index.svelte';

  const cs = $derived(i18n.t.pages.consumerSafety);

  const CFG = {
    CACHE_TTL:    24 * 3600 * 1000,
    REFRESH_HOUR: 6,
    CORS_PROXY:   'https://api.allorigins.win/get?url=',
    CPSC_RSS:     'https://www.cpsc.gov/Recalls.xml',
    CACHE_KEY:    'ch_consumer_recalls_v2',
    CACHE_TS:     'ch_consumer_recalls_ts_v2',
  } as const;

  interface Product { name: string; hazard: string; sev: 'critical'|'high'|'medium'; cat: string; source: string; pop: string; }
  interface Recall  { title: string; link: string; desc: string; date: Date; sev: 'critical'|'high'|'medium'; }

  const PRODUCTS: Product[] = [
    { name: "Children's toys with button/coin cell batteries", hazard: "When swallowed, cause internal chemical burns and death. Button cell batteries are involved in dozens of active recalls across multiple toy brands.", sev: 'critical', cat: 'children', source: 'CPSC', pop: 'Children under 12' },
    { name: "Adult portable bed rails", hazard: "Entrapment between rail and mattress has been linked to asphyxiation deaths. 18 confirmed deaths across multiple brands. 3 million units covered by recalls and warnings.", sev: 'critical', cat: 'adult', source: 'CPSC', pop: 'Elderly adults' },
    { name: "Infant swings marketed for sleep", hazard: "Incline over 10° creates suffocation risk, violating federal safety standards for infant sleep products. Linked to 5 infant deaths.", sev: 'critical', cat: 'children', source: 'CPSC', pop: 'Infants' },
    { name: "Wireless charging pads (MagSafe-style)", hazard: "171 incidents including 39 fires, 13 burn injuries, and 132 cases of bulging or swelling batteries reported to CPSC.", sev: 'high', cat: 'fire', source: 'CPSC/PIRG', pop: 'General public' },
    { name: "Electric pressure washers (no GFCI)", hazard: "Lack required ground-fault circuit interrupters, posing serious electrocution risk. Multi-brand recall announced April 2026.", sev: 'critical', cat: 'fire', source: 'CPSC', pop: 'General public' },
    { name: "Male-to-male extension cords", hazard: "Risk of electrocution and carbon monoxide poisoning when used with generators. Sold at Walmart stores April–November 2025.", sev: 'critical', cat: 'fire', source: 'CPSC', pop: 'General public' },
    { name: "Portable lithium power banks", hazard: "Fire and burn injuries, including one fatality. Casely brand recalled twice. Veektomx mini banks also recalled after fire damage reports.", sev: 'critical', cat: 'fire', source: 'CPSC', pop: 'General public' },
    { name: "Hoverboards & e-scooters", hazard: "Lithium battery fires — a Jetson Rogue hoverboard caused a house fire that killed two sisters in 2022. Ongoing fire risk product category.", sev: 'critical', cat: 'fire', source: 'CPSC', pop: 'All ages' },
    { name: "Lawnmower lithium batteries", hazard: "Spontaneous combustion causing property damage. One case caused $13,000 in losses. Approximately 63,000 batteries recalled December 2024.", sev: 'high', cat: 'fire', source: 'CPSC/PIRG', pop: 'Homeowners' },
    { name: "High-powered magnet sets", hazard: "If multiple magnets are swallowed, they attract through intestinal walls causing perforation and death. Multiple brands recalled 2025.", sev: 'critical', cat: 'children', source: 'CPSC', pop: 'Children' },
    { name: "Unstable dressers (STURDY Act violations)", hazard: "Dressers not anchored to walls tip over and trap children, causing crush injuries and death. Multiple brands recalled 2024–2026.", sev: 'critical', cat: 'children', source: 'CPSC', pop: 'Children' },
    { name: "Thermos Stainless King food jars & bottles", hazard: "8.2 million units recalled — stopper can forcefully eject when opened, causing serious impact and laceration injuries.", sev: 'high', cat: 'adult', source: 'CPSC', pop: 'General public' },
    { name: "Macy's Arch Studio tea kettles", hazard: "Handle detaches from kettle when hot, increasing serious burn injury risk. Sold August 2025–February 2026.", sev: 'high', cat: 'adult', source: 'CPSC', pop: 'General public' },
    { name: "Tabletop alcohol fireplaces", hazard: "Uncontrolled alcohol-fueled fire — one elderly couple killed. CPSC issued urgent safety warning after manufacturer refused recall.", sev: 'critical', cat: 'adult', source: 'CPSC', pop: 'Adults, elderly' },
    { name: "Children's loungewear (flammability)", hazard: "Silks brand loungewear fails mandatory flammability standards for children's sleepwear. Sold January 2024–September 2025.", sev: 'high', cat: 'children', source: 'CPSC', pop: 'Children' },
    { name: "Soccer goal posts (tip-over)", hazard: "A high school student suffered a fatal penetrating brain injury when a pole entered the eye cavity during a fall. CPSC issued safety warning.", sev: 'critical', cat: 'adult', source: 'CPSC', pop: 'Youth athletes' },
    { name: "Iron supplements — non-child-resistant packaging", hazard: "Failure to meet child-resistant packaging standards. Iron overdose is a leading cause of poisoning deaths in young children. Multiple brands recalled 2026.", sev: 'critical', cat: 'adult', source: 'CPSC', pop: 'Children' },
    { name: "Pool drain covers (suction entrapment)", hazard: "Muscccm and Yeeluzan drain covers fail Virginia Graeme Baker Pool Safety Act standards, creating suction entrapment and drowning risk.", sev: 'critical', cat: 'adult', source: 'CPSC', pop: 'Swimmers, children' },
    { name: "Biometric gun safes", hazard: "Opened by unauthorized users including a 6-year-old child. More than 10,000 incidents reported. Serious unintended firearm access risk.", sev: 'critical', cat: 'adult', source: 'CPSC', pop: 'Households with children' },
    { name: "Takata airbags", hazard: "Inflator ruptures sending metal shrapnel into vehicle occupants — multiple deaths confirmed. Tens of millions of vehicles still under recall.", sev: 'critical', cat: 'vehicle', source: 'NHTSA', pop: 'Vehicle occupants' },
    { name: "Chrysler Pacifica & Voyager 2022–2026", hazard: "Side curtain airbags fail required excursion limits. Affects 170,000+ vehicles.", sev: 'high', cat: 'vehicle', source: 'NHTSA', pop: 'Vehicle occupants' },
    { name: "Ford Bronco / Ranger / Bronco Sport / Maverick 2021–2026", hazard: "Multiple issues: wiring may cause fires; transmission misalignment may cause total loss of drive power.", sev: 'high', cat: 'vehicle', source: 'NHTSA', pop: 'Vehicle occupants' },
    { name: "Casely wireless portable power banks", hazard: "Fire and burn risk — one fatality has been reported. Product has been recalled twice by the manufacturer.", sev: 'critical', cat: 'fire', source: 'CPSC', pop: 'General public' },
    { name: "Fisher & Paykel gas ranges", hazard: "Serious burn risk from design issues. Sold at retail stores nationwide June 2025–March 2026.", sev: 'high', cat: 'adult', source: 'CPSC', pop: 'General public' },
    { name: "Vacuum cleaners with lithium batteries", hazard: "17 reports of smoking or burning; 6 battery fires; 2 minor burns and property damage. Approximately 142,000 units recalled February 2024.", sev: 'high', cat: 'fire', source: 'CPSC/PIRG', pop: 'General public' },
    { name: "Smfanlus bicycle lights", hazard: "Accessible button cell batteries can be easily reached by children. Ingested batteries cause internal chemical burns and death.", sev: 'high', cat: 'children', source: 'CPSC', pop: 'Children' },
    { name: "Children's activity cubes (small detachable parts)", hazard: "Atoyus/Melofaver cubes: small parts detach easily creating choking hazard. Violates mandatory small-parts ban for toys for young children.", sev: 'critical', cat: 'children', source: 'CPSC', pop: 'Children under 3' },
  ];

  const CATS = $derived(cs.categories);

  let currentCat   = $state('all');
  let searchQuery  = $state('');
  let liveRecalls  = $state<Recall[]>([]);
  let cacheFresh   = $state(false);
  let cacheMsg     = $state('Connecting to CPSC data feed...');
  let upTime       = $state('—');
  let upNext       = $state('—');
  let upCount      = $state('—');
  let statLive     = $state('...');
  let fetchLoading = $state(true);
  let fetchError   = $state('');

  const filteredProducts = $derived(
    PRODUCTS.filter(p => {
      const txt = (p.name + ' ' + p.hazard + ' ' + p.pop).toLowerCase();
      if (searchQuery && !txt.includes(searchQuery.toLowerCase())) return false;
      return currentCat === 'all' || p.cat.includes(currentCat);
    })
  );

  const tickerItems = $derived(liveRecalls.slice(0, 20));

  function fmtTime(d: Date) { return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }
  function fmtDate(d: Date) { try { return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } }

  function tick() {
    const now  = new Date();
    const next = new Date(now);
    next.setHours(CFG.REFRESH_HOUR, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const diff = next.getTime() - now.getTime();
    upTime = fmtTime(now);
    upNext = `in ${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m`;
  }

  function cacheGet(): { data: Recall[]; age: number } | null {
    try {
      const ts = parseInt(localStorage.getItem(CFG.CACHE_TS) || '0', 10);
      const d  = localStorage.getItem(CFG.CACHE_KEY);
      if (!d || !ts || Date.now() - ts > CFG.CACHE_TTL) return null;
      const data = (JSON.parse(d) as { title: string; link: string; desc: string; date: string; sev: string }[]).map(r => ({ ...r, sev: r.sev as Recall['sev'], date: new Date(r.date) }));
      return { data, age: Date.now() - ts };
    } catch { return null; }
  }

  function cacheSet(data: Recall[]) {
    try {
      localStorage.setItem(CFG.CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CFG.CACHE_TS, String(Date.now()));
    } catch { /* noop */ }
  }

  function parseRSS(xml: string): Recall[] {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    return Array.from(doc.querySelectorAll('item')).map(i => {
      const title   = i.querySelector('title')?.textContent || '';
      const link    = i.querySelector('link')?.textContent  || '';
      const desc    = i.querySelector('description')?.textContent || '';
      const pubDate = i.querySelector('pubDate')?.textContent || '';
      const date    = pubDate ? new Date(pubDate) : new Date();
      const txt     = (title + ' ' + desc).toLowerCase();
      const sev: Recall['sev'] = /death|fatal|electrocution|serious risk of death|asphyx/.test(txt) ? 'critical'
                               : /fire|burn|entrapment|suffocation|laceration|chok|poison/.test(txt) ? 'high' : 'medium';
      return { title, link, desc, date, sev };
    });
  }

  async function fetchCPSC(): Promise<Recall[]> {
    try {
      const r = await fetch(CFG.CORS_PROXY + encodeURIComponent(CFG.CPSC_RSS), { signal: AbortSignal.timeout(12000) });
      const j = await r.json() as { contents?: string };
      if (!j.contents) return [];
      return parseRSS(j.contents);
    } catch { return []; }
  }

  async function initFeed() {
    tick();
    const cached = cacheGet();
    if (cached) {
      liveRecalls  = cached.data;
      cacheFresh   = true;
      cacheMsg     = `Data cached ${Math.floor(cached.age / 3600000)}h ago. Next refresh at ${CFG.REFRESH_HOUR}:00 AM.`;
      fetchLoading = false;
      upCount      = `${liveRecalls.length} live records`;
      statLive     = `${liveRecalls.length}+`;
    } else {
      cacheMsg = 'Fetching fresh recall data from CPSC...';
      const records = await fetchCPSC();
      fetchLoading  = false;
      if (records.length) {
        cacheSet(records);
        liveRecalls = records;
        cacheFresh  = true;
        cacheMsg    = `Live data fetched at ${fmtTime(new Date())}. Refreshes daily at ${CFG.REFRESH_HOUR}:00 AM.`;
        upCount     = `${records.length} live records`;
        statLive    = `${records.length}+`;
      } else {
        cacheFresh  = false;
        cacheMsg    = 'Live feed temporarily unavailable. Displaying curated research database.';
        fetchError  = 'Live CPSC feed could not be reached. Visit CPSC.gov for the latest recalls, or contact Counsel Hound for free legal help.';
        statLive    = '—';
      }
    }
  }

  onMount(() => {
    initFeed();
    const ti = setInterval(tick, 30000);
    const ri = setInterval(() => {
      const now = new Date();
      if (now.getHours() === CFG.REFRESH_HOUR && now.getMinutes() === 0) {
        localStorage.removeItem(CFG.CACHE_KEY);
        localStorage.removeItem(CFG.CACHE_TS);
        initFeed();
      }
    }, 60000);
    return () => { clearInterval(ti); clearInterval(ri); };
  });

  const sevLabel = (s: string) => s === 'critical' ? 'CRITICAL' : s === 'high' ? 'HIGH RISK' : 'MEDIUM';
  const sevBadge = (s: string) => s === 'critical'
    ? 'text-red-400 border border-red-400/40 bg-red-400/10'
    : s === 'high'
    ? 'text-amber-400 border border-amber-400/40 bg-amber-400/10'
    : 'text-teal-400 border border-teal-400/40 bg-teal-400/10';
  const stripeColor = (s: string) => s === 'critical' ? 'bg-red-500' : s === 'high' ? 'bg-amber-500' : 'bg-teal-600';

  const year = new Date().getFullYear();
</script>

<svelte:head>
  <title>{cs.meta.title}</title>
  <meta name="description" content={cs.meta.description} />
  <link rel="canonical" href="https://counselhound.com{i18n.href('/counsel-hound-consumer-safety')}" />
  <meta property="og:title" content={cs.meta.title} />
  <meta property="og:description" content={cs.meta.ogDescription} />
  <meta property="og:url" content="https://counselhound.com{i18n.href('/counsel-hound-consumer-safety')}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content={cs.meta.title} />
  <meta name="twitter:description" content={cs.meta.twitterDescription} />
  <meta name="keywords" content={cs.meta.keywords} />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": cs.meta.title,
        "url": `https://counselhound.com${i18n.href('/counsel-hound-consumer-safety')}`,
        "description": cs.meta.description,
        "about": { "@type": "Thing", "name": "Consumer Product Safety" },
        "publisher": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
          { "@type": "ListItem", "position": 2, "name": cs.productsDb.heading, "item": `https://counselhound.com${i18n.href('/counsel-hound-consumer-safety')}` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": cs.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      }
    ]
  })}<\/script>`}
</svelte:head>

<!-- LIVE RECALL TICKER -->
<div class="bg-[#0a1929] border-b border-[rgba(216,178,105,0.15)] overflow-hidden h-10 flex items-center" aria-label="Live CPSC recall alert ticker">
  <div class="bg-[#d8b269] text-[#162d39] text-[10px] font-bold tracking-widest uppercase px-4 h-10 flex items-center whitespace-nowrap shrink-0">
    {cs.ticker.label}
  </div>
  <div class="overflow-hidden flex-1 h-10 flex items-center">
    {#if tickerItems.length}
      <div class="flex gap-12 whitespace-nowrap pl-8 [animation:ticker_40s_linear_infinite] hover:[animation-play-state:paused]">
        {#each [...tickerItems, ...tickerItems] as item, i (i)}
          <span class="text-xs text-[rgba(240,237,232,0.7)]">&#9888; {item.title}</span>
          <span class="text-[#d8b269] mx-1">|</span>
        {/each}
      </div>
    {:else}
      <span class="text-xs text-[rgba(240,237,232,0.5)] pl-6">{cs.ticker.loading}</span>
    {/if}
  </div>
</div>

<!-- HERO -->
<section class="relative pt-40 pb-24 px-6 overflow-hidden bg-[#162d39]">
  <div class="absolute inset-0 bg-[url('/bg-capitol.webp')] bg-cover bg-center opacity-10"></div>
  <div class="absolute inset-0 bg-linear-to-b from-[rgba(13,27,42,0.4)] to-[#162d39]"></div>
  <div class="relative z-10 max-w-5xl mx-auto">
    <p class="text-[10px] tracking-[0.2em] uppercase mb-4 text-[#d8b269] font-futura">
      {cs.hero.eyebrow}
    </p>
    <h1 class="font-futura uppercase text-hero text-[#F0EDE8] leading-[1.05] mb-6">
      {cs.hero.h1Line1}<br />
      <span class="text-[#d8b269]">{cs.hero.h1Line2}</span>
    </h1>
    <p class="text-base leading-relaxed max-w-2xl text-[rgba(240,237,232,0.7)] mb-8">
      {cs.hero.body}
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
      <a href={config.consultationUrl} target="_blank" rel="noopener"
        class="inline-block bg-[#d8b269] text-[#162d39] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
        {cs.hero.ctaPrimary}
      </a>
      <a href="tel:{config.phone}"
        class="inline-block border border-[rgba(216,178,105,0.4)] text-[#d8b269] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[rgba(216,178,105,0.1)] transition-all duration-200">
        {config.phoneDisplay}
      </a>
    </div>
  </div>
</section>

<!-- NO-FEE STRIP -->
<div class="bg-[#d8b269] flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-6 py-3">
  {#each cs.noFeeStrip as item}
    <span class="text-[#162d39] text-xs font-bold tracking-[0.04em] uppercase">{item}</span>
  {/each}
</div>

<!-- MAIN CONTENT -->
<div class="bg-[#152232]">
  <div class="max-w-7xl mx-auto px-6 py-16">

    <!-- STAT STRIP -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[rgba(216,178,105,0.2)] mb-12">
      {#each [
        { n: '305+',   lbl: cs.stats.cpscRecalls, note: cs.stats.cpscRecallsNote },
        { n: '869',    lbl: cs.stats.injuriesLinked, note: cs.stats.injuriesLinkedNote },
        { n: '25',     lbl: cs.stats.deaths, note: cs.stats.deathsNote },
        { n: '83M+',   lbl: cs.stats.unitsRecalled, note: cs.stats.unitsRecalledNote },
        { n: '33%',    lbl: cs.stats.soldOnline, note: cs.stats.soldOnlineNote },
        { n: statLive, lbl: cs.stats.liveFeedRecords, note: cs.stats.liveFeedRecordsNote },
      ] as stat, i}
        <div class="bg-[#162d39] border-r border-[rgba(216,178,105,0.1)] last:border-r-0 p-5">
          <div class="font-playfair text-3xl font-black text-[#d8b269] leading-none">{stat.n}</div>
          <div class="text-[10px] text-[rgba(240,237,232,0.5)] mt-1 uppercase tracking-wider">{stat.lbl}</div>
          <div class="text-[10px] text-[rgba(240,237,232,0.3)] mt-1">{stat.note}</div>
        </div>
      {/each}
    </div>

    <!-- FEED STATUS ROW -->
    <div class="flex flex-wrap gap-6 bg-[#162d39] border border-[rgba(216,178,105,0.15)] px-6 py-4 mb-6">
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">{cs.feedStatus.label}</div>
        <div class="text-sm font-bold text-[#d8b269]">
          <span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>{cs.feedStatus.live}
        </div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">{cs.feedStatus.lastRefreshed}</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upTime}</div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">{cs.feedStatus.nextRefresh}</div>
        <div class="text-sm font-bold text-[#d8b269]">{upNext}</div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">{cs.feedStatus.recordsLoaded}</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upCount}</div>
      </div>
    </div>

    <!-- CACHE STATUS -->
    <div class="flex items-center gap-2 text-xs text-[rgba(240,237,232,0.45)] mb-10">
      <div class="w-2 h-2 rounded-full {cacheFresh ? 'bg-green-400' : 'bg-amber-400'}"></div>
      <span>{cacheMsg}</span>
    </div>

    <!-- INJURY CTA -->
    <div class="bg-[#162d39] border border-[rgba(216,178,105,0.15)] p-10 text-center mb-12">
      <p class="text-[10px] text-[#d8b269] tracking-[0.14em] uppercase font-bold mb-3">{cs.injuryCta.eyebrow}</p>
      <h2 class="font-playfair text-2xl md:text-3xl font-black text-[#F0EDE8] mb-4 leading-snug">{cs.injuryCta.h2}</h2>
      <p class="text-sm text-[rgba(240,237,232,0.65)] max-w-xl mx-auto mb-6 leading-relaxed">
        {cs.injuryCta.body}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="inline-block bg-[#d8b269] text-[#162d39] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
          {cs.injuryCta.ctaPrimary}
        </a>
        <a href="tel:{config.phone}"
          class="inline-block border border-[rgba(216,178,105,0.4)] text-[#d8b269] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[rgba(216,178,105,0.1)] transition-all duration-200">
          {config.phoneDisplay}
        </a>
      </div>
    </div>

    <!-- PRODUCT DATABASE -->
    <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(216,178,105,0.3)]">
      <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">{cs.productsDb.heading}</h2>
      <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">{cs.productsDb.sourceNote.replace('{count}', String(filteredProducts.length))}</span>
    </div>

    <!-- FILTER TABS -->
    <div class="flex flex-wrap gap-2 mb-4">
      {#each CATS as cat}
        <button
          onclick={() => currentCat = cat.id}
          class="px-4 py-2 text-xs font-semibold tracking-wider uppercase border transition-all duration-200 {currentCat === cat.id
            ? 'border-[#d8b269] text-[#d8b269] bg-[rgba(216,178,105,0.08)]'
            : 'border-[rgba(216,178,105,0.2)] text-[rgba(240,237,232,0.5)] hover:border-[rgba(216,178,105,0.5)] hover:text-[rgba(240,237,232,0.8)]'}">
          {cat.label}
        </button>
      {/each}
    </div>

    <!-- SEARCH -->
    <input
      type="text"
      placeholder={cs.searchPlaceholder}
      bind:value={searchQuery}
      class="w-full md:w-96 bg-[#162d39] border border-[rgba(216,178,105,0.2)] text-[#F0EDE8] text-sm px-4 py-2.5 mb-6 placeholder:text-[rgba(240,237,232,0.3)] focus:border-[#d8b269] focus:outline-none transition-colors"
    />

    <!-- PRODUCT GRID -->
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
      {#each filteredProducts as p}
        <div class="bg-[#162d39] border border-[rgba(216,178,105,0.12)] overflow-hidden hover:-translate-y-0.5 hover:border-[rgba(216,178,105,0.3)] transition-all duration-200">
          <div class="h-1 {stripeColor(p.sev)}"></div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-2 mb-3">
              <div class="font-semibold text-sm text-[#F0EDE8] leading-snug">{p.name}</div>
              <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap shrink-0 rounded-sm {sevBadge(p.sev)}">
                {sevLabel(p.sev)}
              </span>
            </div>
            <p class="text-xs text-[rgba(240,237,232,0.55)] leading-relaxed mb-4">&#9888; {p.hazard}</p>
            <div class="border-t border-[rgba(255,255,255,0.05)] pt-3 flex items-center justify-between">
              <span class="text-[10px] text-[rgba(240,237,232,0.35)] uppercase tracking-wider">{p.source} · {p.pop}</span>
              <a href={config.consultationUrl} target="_blank" rel="noopener"
                class="text-xs font-semibold text-[#d8b269] hover:text-[rgba(240,237,232,0.9)] transition-colors">
                {cs.productsDb.getLegalHelp}
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- LIVE CPSC FEED TABLE -->
    <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(216,178,105,0.3)]">
      <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">{cs.liveFeedTable.heading}</h2>
      <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">{cs.liveFeedTable.sourceNote}</span>
    </div>

    {#if fetchLoading}
      <div class="flex items-center gap-3 py-8 text-sm text-[rgba(240,237,232,0.45)]">
        <div class="w-4 h-4 border-2 border-[rgba(216,178,105,0.2)] border-t-[#d8b269] rounded-full animate-spin shrink-0"></div>
        {cs.liveFeedTable.loading}
      </div>
    {:else if fetchError}
      <div class="bg-amber-400/10 border border-amber-400/30 px-4 py-3 text-sm text-amber-400 mb-6">{fetchError}</div>
    {:else if liveRecalls.length}
      <div class="overflow-x-auto border border-[rgba(216,178,105,0.15)] mb-12">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-[#162d39]">
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#d8b269]">{cs.liveFeedTable.headers.date}</th>
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#d8b269]">{cs.liveFeedTable.headers.product}</th>
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#d8b269]">{cs.liveFeedTable.headers.severity}</th>
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#d8b269]">{cs.liveFeedTable.headers.details}</th>
            </tr>
          </thead>
          <tbody>
            {#each liveRecalls.slice(0, 30) as r}
              <tr class="border-b border-[rgba(255,255,255,0.04)] bg-[#162d39] hover:bg-[#162336] transition-colors">
                <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.4)] whitespace-nowrap">{fmtDate(r.date)}</td>
                <td class="px-4 py-3">
                  <div class="font-semibold text-sm text-[#F0EDE8] mb-0.5">{r.title}</div>
                  <div class="text-[11px] text-[rgba(240,237,232,0.4)]">{r.desc.replace(/<[^>]+>/g, '').substring(0, 120)}...</div>
                </td>
                <td class="px-4 py-3">
                  <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm {sevBadge(r.sev)}">{sevLabel(r.sev)}</span>
                </td>
                <td class="px-4 py-3">
                  {#if r.link}
                    <a href={r.link} target="_blank" rel="noopener" class="text-xs font-semibold text-[#d8b269] hover:underline">{cs.liveFeedTable.headers.view}</a>
                  {:else}
                    <span class="text-[rgba(240,237,232,0.3)]">—</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <!-- HOW TO REPORT -->
    <div class="flex items-end justify-between mb-6 pb-3 border-b border-[rgba(216,178,105,0.3)]">
      <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">{cs.reportSection.heading}</h2>
      <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">{cs.reportSection.sourceNote}</span>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each [
        { ...cs.reportCards[0], href: 'https://www.saferproducts.gov/IncidentReporting' },
        { ...cs.reportCards[1], href: 'https://www.nhtsa.gov/report-a-safety-problem' },
        { ...cs.reportCards[2], href: 'https://reportfraud.ftc.gov/' },
        { ...cs.reportCards[3], href: 'https://www.recalls.gov/' },
        { ...cs.reportCards[4], href: 'https://www.cpsc.gov/Newsroom/Subscribe' },
      ] as r}
        <div class="bg-[#162d39] border border-[rgba(216,178,105,0.12)] border-l-4 border-l-[#d8b269] p-6">
          <div class="font-playfair text-base font-bold text-[#F0EDE8] mb-2">{r.agency}</div>
          <p class="text-xs text-[rgba(240,237,232,0.55)] leading-relaxed mb-3">{r.desc}</p>
          <div class="text-xs font-bold text-[#d8b269] mb-3">{r.phone}</div>
          <a href={r.href} target="_blank" rel="noopener"
            class="block text-center bg-[#162336] text-[#F0EDE8] py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-[#1e3050] transition-colors">
            {r.cta}
          </a>
        </div>
      {/each}

      <!-- Counsel Hound CTA card -->
      <div class="bg-[#d8b269] border border-[#d8b269] border-l-4 p-6">
        <div class="font-playfair text-base font-bold text-[#162d39] mb-2">{cs.counselHoundCard.title}</div>
        <p class="text-xs text-[rgba(13,27,42,0.75)] leading-relaxed mb-3">{cs.counselHoundCard.desc}</p>
        <div class="text-xs font-bold text-[#162d39] mb-3">{config.phoneDisplay}</div>
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="block text-center bg-[#162d39] text-[#d8b269] py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-[#162336] transition-colors">
          {cs.counselHoundCard.cta}
        </a>
      </div>
    </div>

  </div>
</div>

<!-- DISCLAIMER -->
<div class="bg-[#162d39] border-t border-[rgba(216,178,105,0.1)]">
  <div class="max-w-7xl mx-auto px-6 py-6">
    <p class="text-[10px] text-[rgba(240,237,232,0.25)] leading-relaxed">
      <strong class="text-[rgba(240,237,232,0.4)]">{cs.disclaimer.label}</strong> {cs.disclaimer.text}
    </p>
    <p class="text-[10px] text-[rgba(240,237,232,0.2)] mt-2">&copy; {year} Counsel Hound. All Rights Reserved.</p>
  </div>
</div>
