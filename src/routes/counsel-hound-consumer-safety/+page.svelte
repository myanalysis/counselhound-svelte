<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';

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

  const CATS = [
    { id: 'all',      label: 'All Products' },
    { id: 'children', label: "Children's" },
    { id: 'fire',     label: 'Fire & Electrical' },
    { id: 'adult',    label: 'Home & Adult' },
    { id: 'vehicle',  label: 'Vehicles' },
  ];

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
  <title>Dangerous &amp; Defective Products | Counsel Hound</title>
  <meta name="description" content="Counsel Hound tracks recalled and dangerous consumer products daily. Live CPSC recall data, injury statistics, and free legal help for victims of defective products." />
  <link rel="canonical" href="https://counselhound.com/counsel-hound-consumer-safety" />
  <meta property="og:title" content="Dangerous & Defective Products | Counsel Hound" />
  <meta property="og:description" content="Counsel Hound tracks recalled and dangerous consumer products daily. Free legal help for injury victims." />
  <meta property="og:url" content="https://counselhound.com/counsel-hound-consumer-safety" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content="Dangerous & Defective Products | Counsel Hound" />
  <meta name="twitter:description" content="Live CPSC recall data, dangerous product database, and free legal help for injury victims." />
  <meta name="keywords" content="defective products, product recall, CPSC recall, consumer safety, product liability attorney, dangerous products, recall lawyer, injury from product, product defect lawsuit" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Dangerous & Defective Products | Counsel Hound",
        "url": "https://counselhound.com/counsel-hound-consumer-safety",
        "description": "Counsel Hound tracks recalled and dangerous consumer products daily. Live CPSC recall data, injury statistics, and free legal help for victims of defective products.",
        "about": { "@type": "Thing", "name": "Consumer Product Safety" },
        "publisher": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
          { "@type": "ListItem", "position": 2, "name": "Consumer Product Safety", "item": "https://counselhound.com/counsel-hound-consumer-safety" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Can I sue if I was injured by a recalled product?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. A recall can actually strengthen your case by proving the manufacturer knew about the defect. You may be entitled to compensation for medical bills, lost wages, pain and suffering, and other damages — even if you never returned the product." } },
          { "@type": "Question", "name": "How do I know if a product has been recalled?", "acceptedAnswer": { "@type": "Answer", "text": "The CPSC maintains a public recall database at recalls.gov. You can search by product name, brand, or category. Counsel Hound tracks active CPSC recalls daily and highlights the most dangerous products on this page." } },
          { "@type": "Question", "name": "What types of product liability claims are available?", "acceptedAnswer": { "@type": "Answer", "text": "There are three types: manufacturing defect (the specific product you received was flawed), design defect (the entire product line is inherently dangerous), and failure to warn (the manufacturer did not adequately disclose known risks). All three can support a lawsuit." } },
          { "@type": "Question", "name": "Do I need to keep the defective product as evidence?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — preserve it if at all possible. Do not return it, repair it, or discard it. Take photos of any visible defects and your injuries. If you no longer have the product, you can still pursue a claim with strong medical records and purchase documentation." } }
        ]
      }
    ]
  })}<\/script>`}
</svelte:head>

<!-- LIVE RECALL TICKER -->
<div class="bg-[#0a1929] border-b border-[rgba(201,168,76,0.15)] overflow-hidden h-10 flex items-center" aria-label="Live CPSC recall alert ticker">
  <div class="bg-[#C9A84C] text-[#0D1B2A] text-[10px] font-bold tracking-widest uppercase px-4 h-10 flex items-center whitespace-nowrap shrink-0">
    LIVE RECALL ALERTS
  </div>
  <div class="overflow-hidden flex-1 h-10 flex items-center">
    {#if tickerItems.length}
      <div class="flex gap-12 whitespace-nowrap pl-8 [animation:ticker_40s_linear_infinite] hover:[animation-play-state:paused]">
        {#each [...tickerItems, ...tickerItems] as item, i (i)}
          <span class="text-xs text-[rgba(240,237,232,0.7)]">&#9888; {item.title}</span>
          <span class="text-[#C9A84C] mx-1">|</span>
        {/each}
      </div>
    {:else}
      <span class="text-xs text-[rgba(240,237,232,0.5)] pl-6">Loading latest recall data from CPSC...</span>
    {/if}
  </div>
</div>

<!-- HERO -->
<section class="relative pt-40 pb-24 px-6 overflow-hidden bg-[#0D1B2A]">
  <div class="absolute inset-0 bg-[url('/bg-capitol.webp')] bg-cover bg-center opacity-10"></div>
  <div class="absolute inset-0 bg-linear-to-b from-[rgba(13,27,42,0.4)] to-[#0D1B2A]"></div>
  <div class="relative z-10 max-w-5xl mx-auto">
    <p class="text-[10px] tracking-[0.2em] uppercase mb-4 text-[#C9A84C] font-futura">
      Defective Product Injury Attorneys
    </p>
    <h1 class="font-futura uppercase text-hero text-[#F0EDE8] leading-[1.05] mb-6">
      Dangerous &amp; Defective<br />
      <span class="text-[#C9A84C]">Products That Have Hurt Americans</span>
    </h1>
    <p class="text-base leading-relaxed max-w-2xl text-[rgba(240,237,232,0.7)] mb-8">
      Every day, millions of unsafe products remain in homes across America. If you or a loved one has been injured by a recalled, defective, or dangerous product, you may be entitled to significant compensation. Counsel Hound connects you with proven trial attorneys — at no cost until we win.
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
      <a href={config.consultationUrl} target="_blank" rel="noopener"
        class="inline-block bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
        Get a Free Case Evaluation
      </a>
      <a href="tel:{config.phone}"
        class="inline-block border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200">
        {config.phoneDisplay}
      </a>
    </div>
  </div>
</section>

<!-- NO-FEE STRIP -->
<div class="bg-[#C9A84C] flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-6 py-3">
  {#each ['No Fees Unless We Win', 'Free Case Evaluation', 'Respond Within 1 Business Day', 'Attorneys in All 50 States'] as item}
    <span class="text-[#0D1B2A] text-xs font-bold tracking-[0.04em] uppercase">{item}</span>
  {/each}
</div>

<!-- MAIN CONTENT -->
<div class="bg-[#152232]">
  <div class="max-w-7xl mx-auto px-6 py-16">

    <!-- STAT STRIP -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[rgba(201,168,76,0.2)] mb-12">
      {#each [
        { n: '305+',   lbl: 'CPSC Recalls — 2024', note: 'Live from CPSC feed' },
        { n: '869',    lbl: 'Injuries Linked — 2024', note: '8-year high (PIRG)' },
        { n: '25',     lbl: 'Deaths — 2024', note: '15 from recalled products' },
        { n: '83M+',   lbl: 'Units Recalled', note: '2024 total' },
        { n: '33%',    lbl: 'Sold Online Only', note: '2× violation rate' },
        { n: statLive, lbl: 'Live Feed Records', note: 'From CPSC RSS' },
      ] as stat, i}
        <div class="bg-[#0D1B2A] border-r border-[rgba(201,168,76,0.1)] last:border-r-0 p-5">
          <div class="font-playfair text-3xl font-black text-[#C9A84C] leading-none">{stat.n}</div>
          <div class="text-[10px] text-[rgba(240,237,232,0.5)] mt-1 uppercase tracking-wider">{stat.lbl}</div>
          <div class="text-[10px] text-[rgba(240,237,232,0.3)] mt-1">{stat.note}</div>
        </div>
      {/each}
    </div>

    <!-- FEED STATUS ROW -->
    <div class="flex flex-wrap gap-6 bg-[#0D1B2A] border border-[rgba(201,168,76,0.15)] px-6 py-4 mb-6">
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">Feed Status</div>
        <div class="text-sm font-bold text-[#C9A84C]">
          <span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>Live — Updated Daily
        </div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">Last Refreshed</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upTime}</div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">Next Auto-Refresh</div>
        <div class="text-sm font-bold text-[#C9A84C]">{upNext}</div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-widest mb-1">Records Loaded</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upCount}</div>
      </div>
    </div>

    <!-- CACHE STATUS -->
    <div class="flex items-center gap-2 text-xs text-[rgba(240,237,232,0.45)] mb-10">
      <div class="w-2 h-2 rounded-full {cacheFresh ? 'bg-green-400' : 'bg-amber-400'}"></div>
      <span>{cacheMsg}</span>
    </div>

    <!-- INJURY CTA -->
    <div class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.15)] p-10 text-center mb-12">
      <p class="text-[10px] text-[#C9A84C] tracking-[0.14em] uppercase font-bold mb-3">Were You or a Loved One Injured?</p>
      <h2 class="font-playfair text-2xl md:text-3xl font-black text-[#F0EDE8] mb-4 leading-snug">You Don't Have to Fight Big Companies Alone.</h2>
      <p class="text-sm text-[rgba(240,237,232,0.65)] max-w-xl mx-auto mb-6 leading-relaxed">
        Product liability claims against major manufacturers are complex. The right attorney makes all the difference. Counsel Hound has spent 25+ years connecting injured victims with top-tier trial lawyers who have collectively recovered millions of dollars for their clients.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="inline-block bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
          Get Your Free Case Review
        </a>
        <a href="tel:{config.phone}"
          class="inline-block border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200">
          {config.phoneDisplay}
        </a>
      </div>
    </div>

    <!-- PRODUCT DATABASE -->
    <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
      <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">Recalled &amp; Dangerous Products Database</h2>
      <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">{filteredProducts.length} products · CPSC + PIRG + CFA 2024–2026</span>
    </div>

    <!-- FILTER TABS -->
    <div class="flex flex-wrap gap-2 mb-4">
      {#each CATS as cat}
        <button
          onclick={() => currentCat = cat.id}
          class="px-4 py-2 text-xs font-semibold tracking-wider uppercase border transition-all duration-200 {currentCat === cat.id
            ? 'border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.08)]'
            : 'border-[rgba(201,168,76,0.2)] text-[rgba(240,237,232,0.5)] hover:border-[rgba(201,168,76,0.5)] hover:text-[rgba(240,237,232,0.8)]'}">
          {cat.label}
        </button>
      {/each}
    </div>

    <!-- SEARCH -->
    <input
      type="text"
      placeholder="Search products, brands, or hazard type..."
      bind:value={searchQuery}
      class="w-full md:w-96 bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[#F0EDE8] text-sm px-4 py-2.5 mb-6 placeholder:text-[rgba(240,237,232,0.3)] focus:border-[#C9A84C] focus:outline-none transition-colors"
    />

    <!-- PRODUCT GRID -->
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
      {#each filteredProducts as p}
        <div class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.12)] overflow-hidden hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.3)] transition-all duration-200">
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
              <span class="text-[10px] text-[rgba(240,237,232,0.35)] uppercase tracking-wider">Source: {p.source} · {p.pop}</span>
              <a href={config.consultationUrl} target="_blank" rel="noopener"
                class="text-xs font-semibold text-[#C9A84C] hover:text-[rgba(240,237,232,0.9)] transition-colors">
                Get Legal Help →
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- LIVE CPSC FEED TABLE -->
    <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
      <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">Live CPSC Recall Feed</h2>
      <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">SOURCE: CPSC RSS — AUTO-UPDATED DAILY AT 6:00 AM</span>
    </div>

    {#if fetchLoading}
      <div class="flex items-center gap-3 py-8 text-sm text-[rgba(240,237,232,0.45)]">
        <div class="w-4 h-4 border-2 border-[rgba(201,168,76,0.2)] border-t-[#C9A84C] rounded-full animate-spin shrink-0"></div>
        Fetching latest recalls from CPSC...
      </div>
    {:else if fetchError}
      <div class="bg-amber-400/10 border border-amber-400/30 px-4 py-3 text-sm text-amber-400 mb-6">{fetchError}</div>
    {:else if liveRecalls.length}
      <div class="overflow-x-auto border border-[rgba(201,168,76,0.15)] mb-12">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-[#0D1B2A]">
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">Date</th>
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">Product &amp; Description</th>
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">Severity</th>
              <th class="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">Details</th>
            </tr>
          </thead>
          <tbody>
            {#each liveRecalls.slice(0, 30) as r}
              <tr class="border-b border-[rgba(255,255,255,0.04)] bg-[#0D1B2A] hover:bg-[#162336] transition-colors">
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
                    <a href={r.link} target="_blank" rel="noopener" class="text-xs font-semibold text-[#C9A84C] hover:underline">View →</a>
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
    <div class="flex items-end justify-between mb-6 pb-3 border-b border-[rgba(201,168,76,0.3)]">
      <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">Report a Dangerous Product</h2>
      <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">Official Government Channels</span>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each [
        { agency: 'CPSC — SaferProducts.gov', desc: 'Report injuries or dangerous consumer products directly to the U.S. Consumer Product Safety Commission. Your report helps trigger investigations and recalls that protect other families.', phone: 'Hotline: 1-800-638-2772', href: 'https://www.saferproducts.gov/IncidentReporting', cta: 'File a Report →' },
        { agency: 'NHTSA — Vehicle Safety', desc: 'Report vehicle defects, tire failures, car seat problems, or equipment safety issues. Use the VIN lookup tool to check if your vehicle has an open recall right now.', phone: 'Hotline: 1-888-327-4236', href: 'https://www.nhtsa.gov/report-a-safety-problem', cta: 'File a Complaint →' },
        { agency: 'FTC — ReportFraud.ftc.gov', desc: 'Report businesses that sold defective products deceptively, used fake safety certifications, or made misleading claims about product safety. Every report counts.', phone: 'ReportFraud.ftc.gov', href: 'https://reportfraud.ftc.gov/', cta: 'Report to FTC →' },
        { agency: 'Recalls.gov — All Agencies', desc: 'One-stop federal portal to search all active recalls across CPSC, NHTSA, FDA, and USDA. Check any product before you buy — or after you\'ve been injured.', phone: 'Recalls.gov', href: 'https://www.recalls.gov/', cta: 'Search All Recalls →' },
        { agency: 'Subscribe to CPSC Alerts', desc: 'Never miss a recall that could affect your family. Sign up for weekly CPSC recall email alerts — free, instant, and delivered the moment a new danger is identified.', phone: 'cpsc.gov/Newsroom/Subscribe', href: 'https://www.cpsc.gov/Newsroom/Subscribe', cta: 'Subscribe Now →' },
      ] as r}
        <div class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.12)] border-l-4 border-l-[#C9A84C] p-6">
          <div class="font-playfair text-base font-bold text-[#F0EDE8] mb-2">{r.agency}</div>
          <p class="text-xs text-[rgba(240,237,232,0.55)] leading-relaxed mb-3">{r.desc}</p>
          <div class="text-xs font-bold text-[#C9A84C] mb-3">{r.phone}</div>
          <a href={r.href} target="_blank" rel="noopener"
            class="block text-center bg-[#162336] text-[#F0EDE8] py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-[#1e3050] transition-colors">
            {r.cta}
          </a>
        </div>
      {/each}

      <!-- Counsel Hound CTA card -->
      <div class="bg-[#C9A84C] border border-[#C9A84C] border-l-4 p-6">
        <div class="font-playfair text-base font-bold text-[#0D1B2A] mb-2">Counsel Hound — Free Legal Help</div>
        <p class="text-xs text-[rgba(13,27,42,0.75)] leading-relaxed mb-3">Injured by a recalled or defective product? Counsel Hound's network of attorneys handles defective product cases on a contingency basis — no fees unless you win.</p>
        <div class="text-xs font-bold text-[#0D1B2A] mb-3">{config.phoneDisplay}</div>
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="block text-center bg-[#0D1B2A] text-[#C9A84C] py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-[#162336] transition-colors">
          Get Free Case Review →
        </a>
      </div>
    </div>

  </div>
</div>

<!-- DISCLAIMER -->
<div class="bg-[#0D1B2A] border-t border-[rgba(201,168,76,0.1)]">
  <div class="max-w-7xl mx-auto px-6 py-6">
    <p class="text-[10px] text-[rgba(240,237,232,0.25)] leading-relaxed">
      <strong class="text-[rgba(240,237,232,0.4)]">Legal Disclaimer:</strong> The information on this page is for general informational purposes only and does not constitute legal advice. Data is compiled from publicly available government sources including the CPSC, NHTSA, FTC, and PIRG. Viewing this page does not create an attorney-client relationship. If you have been injured by a product, consult with a qualified attorney. Counsel Hound is a legal referral service. Results shown are representative and not a guarantee of outcome.
    </p>
    <p class="text-[10px] text-[rgba(240,237,232,0.2)] mt-2">&copy; {year} Counsel Hound. All Rights Reserved.</p>
  </div>
</div>
