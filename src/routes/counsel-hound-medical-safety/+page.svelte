<script lang="ts">
  import { onMount } from 'svelte';
  import { config } from '$lib/config';

  const CFG = {
    CACHE_TTL:     24 * 3600 * 1000,
    REFRESH_HOUR:  6,
    FDA_BASE:      'https://api.fda.gov',
    CORS_PROXY:    'https://api.allorigins.win/get?url=',
    MEDWATCH_RSS:  'https://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/MedWatch/rss.xml',
    CACHE_DEV:     'ch_med_dev_v2',
    CACHE_DEV_TS:  'ch_med_dev_ts_v2',
    CACHE_DRUG:    'ch_med_drug_v2',
    CACHE_DRUG_TS: 'ch_med_drug_ts_v2',
    PAGE_SIZE:     40,
  } as const;

  interface FdaRecord {
    product_description?: string;
    recalling_firm?: string;
    reason_for_recall?: string;
    recall_initiation_date?: string;
    classification?: string;
    status?: string;
    event_id?: string;
    distribution_pattern?: string;
  }

  interface BBWEntry {
    drug: string;
    generic: string;
    cat: string;
    year: string;
    risk: string;
  }

  interface DeviceEntry {
    name: string;
    hazard: string;
    cls: 'critical' | 'amber' | 'other';
    pop: string;
    status: string;
  }

  const BBW_DATA: BBWEntry[] = [
    { drug: 'Ozempic / Wegovy', generic: 'semaglutide', cat: 'Endocrinology', year: '2023', risk: 'Thyroid C-cell tumor risk observed in animal studies — potential thyroid cancer risk in humans cannot be excluded. Contraindicated in patients with personal or family history of medullary thyroid carcinoma or MEN 2.' },
    { drug: 'Ocaliva', generic: 'obeticholic acid', cat: 'Oncology', year: '2024', risk: 'Linked to a 377% higher risk of liver transplant or death in primary biliary cholangitis patients. 19 fatalities and 11 severe liver injuries reported within 18 months of approval. Strengthened December 2024.' },
    { drug: 'Oxbryta', generic: 'voxelotor', cat: 'Oncology', year: '2024', risk: 'Pfizer recalled this sickle cell disease drug globally in September 2024 after patients showed increased vaso-occlusive crises and worse outcomes than placebo in clinical trials.' },
    { drug: 'Depo-Provera', generic: 'medroxyprogesterone acetate', cat: 'Reproductive', year: '2024', risk: 'Long-term use linked to a 5.6× increased risk of intracranial meningiomas (brain tumors). Risk persists with use longer than one year. FDA required new boxed warning in March 2024.' },
    { drug: 'Prolia / Xgeva', generic: 'denosumab', cat: 'Endocrinology', year: '2024', risk: 'Severe life-threatening hypocalcemia in patients with advanced chronic kidney disease (CKD stages 4-5). FDA added boxed warning January 2024 and advises against use in this patient population.' },
    { drug: 'Veozah', generic: 'fezolinetant', cat: 'Endocrinology', year: '2024', risk: 'Rare but serious liver injury reported post-approval. FDA requires liver function monitoring at baseline and at 3, 6, and 9 months. Warning added September 2024.' },
    { drug: 'Antidepressants (SSRIs/SNRIs)', generic: 'fluoxetine, sertraline, escitalopram, venlafaxine, others', cat: 'Psychiatry', year: '2004+', risk: 'Increased risk of suicidal thinking and behavior in children, adolescents, and young adults under 25 during the initial weeks of treatment. All antidepressants carry this class-wide warning since 2004.' },
    { drug: 'Benzodiazepines', generic: 'diazepam, alprazolam, lorazepam, clonazepam, others', cat: 'Psychiatry', year: '2020', risk: 'Serious risks of abuse, addiction, physical dependence, and life-threatening withdrawal reactions including seizures. Concurrent use with opioids dramatically increases risk of overdose death. Class-wide 2020.' },
    { drug: 'Atypical Antipsychotics', generic: 'quetiapine, risperidone, olanzapine, aripiprazole, others', cat: 'Psychiatry', year: '2005', risk: 'Increased mortality in elderly patients with dementia-related psychosis — not approved for this use. Deaths primarily cardiovascular or infectious. Class-wide warning since 2005.' },
    { drug: 'Warfarin (Coumadin)', generic: 'warfarin sodium', cat: 'Cardiovascular', year: '2006', risk: 'Potentially fatal bleeding episodes including intracranial, spinal, and retroperitoneal hemorrhage. Narrow therapeutic index requires regular INR monitoring. Significant drug and food interactions.' },
    { drug: 'Avandia', generic: 'rosiglitazone', cat: 'Cardiovascular', year: '2007', risk: 'Increased risk of myocardial infarction and cardiovascular death. Caused 70% reduction in prescribing after warning. Now available only through a restricted prescribing program.' },
    { drug: 'Opioid Analgesics (all)', generic: 'oxycodone, hydrocodone, morphine, fentanyl, codeine, tramadol', cat: 'Pain', year: '2016+', risk: 'Addiction, abuse, misuse leading to overdose and death. Life-threatening respiratory depression. Neonatal opioid withdrawal syndrome. Fatal interaction with CNS depressants. Class-wide, updated 2016 and 2022.' },
    { drug: 'Tysabri', generic: 'natalizumab', cat: 'Neurology', year: '2006', risk: 'Progressive multifocal leukoencephalopathy (PML) — a rare, often fatal or severely disabling brain infection caused by JC virus reactivation. Risk increases with anti-JCV antibody positivity and treatment duration.' },
    { drug: 'Fluoroquinolone Antibiotics', generic: 'ciprofloxacin, levofloxacin, moxifloxacin, others', cat: 'Infectious Disease', year: '2008+', risk: 'Tendinitis and tendon rupture. Irreversible peripheral neuropathy. Serious CNS effects. Aortic aneurysm or dissection risk. FDA recommends reserving these drugs for infections with no alternative treatment options.' },
    { drug: 'Isotretinoin (Accutane)', generic: 'isotretinoin', cat: 'Reproductive', year: 'ongoing', risk: 'Extremely high risk of severe fetal malformations — cannot be used during pregnancy under any circumstances. Psychiatric adverse events including depression and suicidal ideation. iPLEDGE REMS program required.' },
    { drug: 'TNF Blockers', generic: 'adalimumab (Humira), etanercept (Enbrel), infliximab (Remicade)', cat: 'Rheumatology', year: '2008', risk: 'Serious and life-threatening infections — including tuberculosis, bacterial sepsis, and invasive fungal infections. Malignancy risk including lymphoma. Mandatory TB screening required before initiating therapy.' },
    { drug: 'NSAIDs (non-aspirin)', generic: 'ibuprofen, naproxen, celecoxib (Celebrex), others', cat: 'Pain', year: '2005+', risk: 'Increased risk of serious cardiovascular events including heart attack and stroke — potentially fatal. Risk increases with duration of use. GI bleeding, ulceration, and perforation also carry a boxed warning.' },
    { drug: 'Methadone', generic: 'methadone HCl', cat: 'Pain', year: 'ongoing', risk: 'QT prolongation and potentially fatal cardiac arrhythmias including torsades de pointes. Deaths reported during induction and dose conversion. Requires baseline ECG and ongoing cardiac monitoring.' },
    { drug: 'Valproate (Depakote)', generic: 'valproic acid / sodium valproate', cat: 'Neurology', year: 'ongoing', risk: 'Major fetal harm — neural tube defects (spina bifida), cognitive deficits, reduced IQ in children exposed in utero. Contraindicated in pregnancy for migraine prophylaxis. REMS program required.' },
    { drug: 'Checkpoint Inhibitors', generic: 'pembrolizumab (Keytruda), nivolumab (Opdivo), others', cat: 'Oncology', year: 'ongoing', risk: 'Immune-mediated adverse reactions that can be severe and life-threatening — including pneumonitis, colitis, hepatitis, endocrinopathies, nephritis, and myocarditis. Can be fatal if not identified and treated promptly.' },
  ];

  const DEVICES_DB: DeviceEntry[] = [
    { name: 'Abiomed Impella Left-Sided Blood Pumps', hazard: 'Catheter pierces the left ventricle wall — at least 129 serious injuries and 49 deaths reported. FDA issued Class I recall in March 2024. If you received an Impella device and experienced heart complications, Counsel Hound wants to hear from you.', cls: 'critical', pop: 'Cardiac patients', status: 'Class I Recall 2024' },
    { name: 'Philips CPAP, BiPAP & Ventilator Devices (15M+ units)', hazard: "Polyurethane foam degrades releasing potentially toxic and carcinogenic particles into the patient's breathing path. One of the largest device recalls in history — ongoing since 2021. Philips settled with the FDA and DOJ in 2024.", cls: 'critical', pop: 'Sleep apnea & respiratory patients', status: 'Ongoing recall / settlement 2024' },
    { name: 'Medtronic Pipeline Vantage Embolization Device (027 model)', hazard: 'Fails to attach to blood vessel wall in brain aneurysm procedures — 13 injuries and 4 deaths. Pulled from market by Medtronic in March 2025.', cls: 'critical', pop: 'Neurovascular surgery patients', status: 'Off market — March 2025' },
    { name: 'Rotarex Atherectomy Catheter System (Bard/BD)', hazard: 'Helix component may fracture during use — 30 serious injuries, 4 deaths, and 115 procedures requiring additional intervention as of March 2025.', cls: 'critical', pop: 'Peripheral vascular surgery patients', status: 'Class I — investigation ongoing' },
    { name: 'Smiths Medical Endotracheal Tubes', hazard: 'Diameter too small — patients may receive insufficient ventilation, leading to organ failure, heart attack, or death. 8 injuries reported.', cls: 'critical', pop: 'Ventilated hospital patients', status: 'Class I Recall — March 2025' },
    { name: 'Transvaginal Mesh', hazard: 'Erosion through pelvic tissue, chronic pain, infection, and organ perforation. FDA reclassified transvaginal mesh as Class III in 2016 and required it be taken off the market. Mass tort litigation ongoing.', cls: 'critical', pop: 'Women with pelvic organ prolapse', status: 'Transvaginal mesh off market' },
    { name: 'Metal-on-Metal Hip Implants (DePuy ASR, others)', hazard: 'Cobalt and chromium debris released into surrounding tissue causes metallosis, tissue necrosis, and systemic toxicity. Mass tort litigation has resulted in billions in settlements.', cls: 'critical', pop: 'Hip replacement patients', status: 'Recalls & post-market studies' },
    { name: 'Surgical Mesh (Hernia)', hazard: 'Complications including chronic pain, infection, adhesion, and organ perforation. Bard, Atrium, and Ethicon brands among those facing ongoing litigation. FDA has issued multiple safety communications.', cls: 'amber', pop: 'Hernia repair patients', status: 'Ongoing safety review' },
    { name: 'Hologic BioZorb Implants', hazard: '188 adverse event reports in breast cancer surgery patients — pain, migration, and other complications. Hologic recalled the product in October 2024.', cls: 'amber', pop: 'Breast cancer surgery patients', status: 'Recalled October 2024' },
    { name: 'Fresenius Infusion Pumps', hazard: 'Software issues identified as a potential high-risk recall — first product to receive an FDA Early Alert under the new communications pilot program in November 2024.', cls: 'amber', pop: 'Hospital patients on IV therapy', status: 'Early Alert — November 2024' },
    { name: 'Insulin Pumps — Cybersecurity Vulnerabilities', hazard: "Multiple Medtronic MiniMed pump models recalled for cybersecurity vulnerabilities that could allow unauthorized remote access to insulin dose delivery — a potentially fatal risk for patients.", cls: 'critical', pop: 'Insulin-dependent diabetes patients', status: 'Ongoing recalls by model number' },
    { name: 'Pacemakers / Implantable Defibrillators (Various)', hazard: "Battery depletion, lead fracture, programming errors, and magnetic interference issues documented in the FDA's MAUDE adverse event database. Thousands of adverse events reported annually.", cls: 'amber', pop: 'Cardiac rhythm disorder patients', status: 'Ongoing MAUDE monitoring' },
    { name: 'Adult Portable Bed Rails (Medical Grade)', hazard: 'Entrapment between rail and mattress linked to asphyxiation deaths — 18 confirmed deaths across multiple brands. 3 million units covered by CPSC/FDA recalls and warnings.', cls: 'critical', pop: 'Elderly and assisted living patients', status: 'Multiple active recalls — stop use' },
    { name: 'Baxter Healthcare Solution Sets', hazard: 'Improperly assembled IV solution sets — medication may not be delivered correctly, or patients may lose blood through faulty IV connections.', cls: 'amber', pop: 'Hospital inpatients on IV therapy', status: 'Class II Recall — late 2024' },
  ];

  const BBW_CATS = ['all', 'Oncology', 'Psychiatry', 'Cardiovascular', 'Pain', 'Endocrinology', 'Reproductive', 'Neurology', 'Infectious Disease', 'Rheumatology'];

  type TabId = 'devices' | 'drugs' | 'blackbox' | 'knowndevices' | 'report';
  const TABS: { id: TabId; label: string }[] = [
    { id: 'devices',      label: 'Device Recalls (Live)' },
    { id: 'drugs',        label: 'Drug Recalls (Live)' },
    { id: 'blackbox',     label: 'Black Box Warnings' },
    { id: 'knowndevices', label: 'High-Risk Devices' },
    { id: 'report',       label: 'Report & Get Help' },
  ];

  let activeTab    = $state<TabId>('devices');
  let devData      = $state<FdaRecord[]>([]);
  let drugData     = $state<FdaRecord[]>([]);
  let devSearch    = $state('');
  let devClass     = $state('all');
  let drugSearch   = $state('');
  let drugClass    = $state('all');
  let devPage      = $state(0);
  let drugPage     = $state(0);
  let bbwSearch    = $state('');
  let bbwCat       = $state('all');
  let devLoading   = $state(true);
  let drugLoading  = $state(true);
  let devError     = $state('');
  let drugError    = $state('');
  let upTime       = $state('—');
  let upDevCount   = $state('—');
  let upDrugCount  = $state('—');
  let cacheMsg     = $state('Connecting to FDA openFDA API...');
  let cacheFresh   = $state(false);
  let hstatClass1  = $state('...');
  let hstatAdverse = $state('...');
  let tickerItems  = $state<string[]>([]);

  const devFiltered = $derived(
    devData.filter(r => {
      const txt = ((r.product_description || '') + (r.recalling_firm || '') + (r.reason_for_recall || '')).toLowerCase();
      return (!devSearch || txt.includes(devSearch.toLowerCase())) && (devClass === 'all' || r.classification === devClass);
    })
  );

  const drugFiltered = $derived(
    drugData.filter(r => {
      const txt = ((r.product_description || '') + (r.recalling_firm || '') + (r.reason_for_recall || '')).toLowerCase();
      return (!drugSearch || txt.includes(drugSearch.toLowerCase())) && (drugClass === 'all' || r.classification === drugClass);
    })
  );

  const bbwFiltered = $derived(
    BBW_DATA.filter(w => {
      const txt = (w.drug + ' ' + w.generic + ' ' + w.risk + ' ' + w.cat).toLowerCase();
      return (!bbwSearch || txt.includes(bbwSearch.toLowerCase())) && (bbwCat === 'all' || w.cat === bbwCat);
    })
  );

  const devPageCount  = $derived(Math.ceil(devFiltered.length / CFG.PAGE_SIZE));
  const drugPageCount = $derived(Math.ceil(drugFiltered.length / CFG.PAGE_SIZE));
  const devSlice      = $derived(devFiltered.slice(devPage * CFG.PAGE_SIZE, (devPage + 1) * CFG.PAGE_SIZE));
  const drugSlice     = $derived(drugFiltered.slice(drugPage * CFG.PAGE_SIZE, (drugPage + 1) * CFG.PAGE_SIZE));

  $effect(() => { devSearch; devClass; devPage = 0; });
  $effect(() => { drugSearch; drugClass; drugPage = 0; });

  function fmtTime(d: Date) { return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }
  function fmtDate(s: string) {
    try { return new Date(String(s).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch { return s; }
  }

  function cacheGet(k: string, ts: string): { data: FdaRecord[]; age: number } | null {
    try {
      const t = parseInt(localStorage.getItem(ts) || '0', 10);
      const d = localStorage.getItem(k);
      if (!d || !t || Date.now() - t > CFG.CACHE_TTL) return null;
      return { data: JSON.parse(d) as FdaRecord[], age: Date.now() - t };
    } catch { return null; }
  }

  function cacheSet(k: string, ts: string, data: FdaRecord[]) {
    try { localStorage.setItem(k, JSON.stringify(data)); localStorage.setItem(ts, String(Date.now())); }
    catch { /* noop */ }
  }

  async function fetchFDA(endpoint: string): Promise<FdaRecord[]> {
    try {
      const r = await fetch(`${CFG.FDA_BASE}${endpoint}`, { signal: AbortSignal.timeout(15000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json() as { results?: FdaRecord[] };
      return j.results || [];
    } catch { return []; }
  }

  async function fetchMedWatch() {
    try {
      const r = await fetch(CFG.CORS_PROXY + encodeURIComponent(CFG.MEDWATCH_RSS), { signal: AbortSignal.timeout(10000) });
      const j = await r.json() as { contents?: string };
      if (!j.contents) return;
      const doc = new DOMParser().parseFromString(j.contents, 'text/xml');
      tickerItems = Array.from(doc.querySelectorAll('item')).slice(0, 20).map(i => i.querySelector('title')?.textContent || '').filter(Boolean);
    } catch { /* noop */ }
  }

  async function fetchAdverseCount() {
    try {
      const r = await fetch(`${CFG.FDA_BASE}/drug/event.json?limit=1`, { signal: AbortSignal.timeout(8000) });
      const j = await r.json() as { meta?: { results?: { total?: number } } };
      const total = j.meta?.results?.total;
      if (total) hstatAdverse = Number(total).toLocaleString();
    } catch { /* noop */ }
  }

  onMount(() => {
    upTime = fmtTime(new Date());
    const ti = setInterval(() => { upTime = fmtTime(new Date()); }, 30000);
    const ri = setInterval(() => {
      const now = new Date();
      if (now.getHours() === CFG.REFRESH_HOUR && now.getMinutes() === 0) {
        [CFG.CACHE_DEV, CFG.CACHE_DEV_TS, CFG.CACHE_DRUG, CFG.CACHE_DRUG_TS].forEach(k => localStorage.removeItem(k));
        location.reload();
      }
    }, 60000);

    async function init() {
      // Device recalls
      const dc = cacheGet(CFG.CACHE_DEV, CFG.CACHE_DEV_TS);
      if (dc) {
        devData     = dc.data;
        devLoading  = false;
        upDevCount  = `${devData.length} records`;
        hstatClass1 = `${devData.filter(d => d.classification === 'Class I').length} Class I`;
        setCacheUI(true, `Device data cached (${Math.floor(dc.age / 3600000)}h ago).`);
      } else {
        setCacheUI(false, 'Fetching device recalls from FDA openFDA...');
        devData = await fetchFDA('/device/enforcement.json?search=classification:%22Class+I%22&sort=recall_initiation_date:desc&limit=100');
        if (!devData.length) devData = await fetchFDA('/device/enforcement.json?sort=recall_initiation_date:desc&limit=100');
        devLoading = false;
        if (devData.length) {
          cacheSet(CFG.CACHE_DEV, CFG.CACHE_DEV_TS, devData);
          setCacheUI(true, 'Live device data fetched from openFDA.');
          upDevCount  = `${devData.length} records`;
          hstatClass1 = `${devData.filter(d => d.classification === 'Class I').length} Class I`;
        } else {
          devError = 'Live device recall data temporarily unavailable from openFDA. Visit fda.gov/medical-devices for the latest recall information.';
        }
      }

      // Drug recalls
      const druc = cacheGet(CFG.CACHE_DRUG, CFG.CACHE_DRUG_TS);
      if (druc) {
        drugData    = druc.data;
        drugLoading = false;
        upDrugCount = `${drugData.length} records`;
      } else {
        drugData = await fetchFDA('/drug/enforcement.json?search=classification:%22Class+I%22&sort=recall_initiation_date:desc&limit=100');
        if (!drugData.length) drugData = await fetchFDA('/drug/enforcement.json?sort=recall_initiation_date:desc&limit=100');
        drugLoading = false;
        if (drugData.length) {
          cacheSet(CFG.CACHE_DRUG, CFG.CACHE_DRUG_TS, drugData);
          upDrugCount = `${drugData.length} records`;
        } else {
          drugError = 'Drug recall data temporarily unavailable from openFDA. Visit fda.gov/drugs directly.';
        }
      }

      fetchAdverseCount();
      fetchMedWatch();
    }

    init();
    return () => { clearInterval(ti); clearInterval(ri); };
  });

  function setCacheUI(fresh: boolean, msg: string) {
    cacheFresh = fresh;
    cacheMsg   = msg;
  }

  const classPillStyle = (c?: string) => !c ? 'text-[rgba(240,237,232,0.4)] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]'
    : c === 'Class I'   ? 'text-red-400 border border-red-400/40 bg-red-400/10'
    : c === 'Class II'  ? 'text-amber-400 border border-amber-400/40 bg-amber-400/10'
    : c === 'Class III' ? 'text-teal-400 border border-teal-400/40 bg-teal-400/10'
    : 'text-[rgba(240,237,232,0.4)] border border-[rgba(255,255,255,0.1)]';
  const classPillLabel = (c?: string) => !c ? '—' : c === 'Class I' ? 'CLASS I' : c === 'Class II' ? 'CLASS II' : c === 'Class III' ? 'CLASS III' : c;

  const devBorderColor = (d: DeviceEntry) => d.cls === 'critical' ? 'border-t-red-500' : 'border-t-amber-500';

  const bbwPillStyle = (cat: string) =>
    cat === 'Oncology' || cat === 'Pain' ? 'text-red-400 border border-red-400/40 bg-red-400/10'
    : cat === 'Psychiatry' || cat === 'Cardiovascular' ? 'text-amber-400 border border-amber-400/40 bg-amber-400/10'
    : 'text-teal-400 border border-teal-400/40 bg-teal-400/10';

  const year = new Date().getFullYear();
</script>

<svelte:head>
  <title>Dangerous Medical Devices &amp; Drug Recalls | Counsel Hound</title>
  <meta name="description" content="Counsel Hound tracks FDA-recalled medical devices, dangerous drugs, and black box warnings daily. Free legal help for patients harmed by defective medical products." />
  <link rel="canonical" href="https://counselhound.com/counsel-hound-medical-safety" />
  <meta property="og:title" content="Dangerous Medical Devices & Drug Recalls | Counsel Hound" />
  <meta property="og:description" content="Live FDA recall data, black box warnings, and free legal help for patients harmed by dangerous medical devices or drugs." />
  <meta property="og:url" content="https://counselhound.com/counsel-hound-medical-safety" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://counselhound.com/og-default.jpg" />
  <meta name="twitter:title" content="Dangerous Medical Devices & Drug Recalls | Counsel Hound" />
  <meta name="twitter:description" content="Live FDA recall data, black box warnings, high-risk device database, and free legal help for patients harmed by dangerous medical products." />
  <meta name="keywords" content="medical device recall, FDA recall, drug recall, black box warning, defective medical device, dangerous drugs, medical malpractice attorney, FDA enforcement, patient injury lawsuit" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Dangerous Medical Devices & Drug Recalls | Counsel Hound",
        "url": "https://counselhound.com/counsel-hound-medical-safety",
        "description": "Counsel Hound tracks FDA-recalled medical devices, dangerous drugs, and black box warnings daily. Free legal help for patients harmed by defective medical products.",
        "about": { "@type": "Thing", "name": "Medical Device & Drug Safety" },
        "publisher": { "@type": "LegalService", "name": "Counsel Hound", "url": "https://counselhound.com" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://counselhound.com" },
          { "@type": "ListItem", "position": 2, "name": "Medical Device & Drug Safety", "item": "https://counselhound.com/counsel-hound-medical-safety" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Can I sue a drug manufacturer if I was harmed by a medication?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If a drug caused serious harm that was not adequately disclosed in its warnings, you may have a product liability claim. A black box warning or FDA recall significantly strengthens your case. Many drug injury cases are pursued as mass torts." } },
          { "@type": "Question", "name": "What is an FDA Class I recall and why does it matter?", "acceptedAnswer": { "@type": "Answer", "text": "A Class I recall is the FDA's most serious classification — it means use of the product may cause serious health consequences or death. If you were harmed by a product later subject to a Class I recall, the recall provides powerful evidence in your lawsuit." } },
          { "@type": "Question", "name": "What is a black box warning and how does it affect my case?", "acceptedAnswer": { "@type": "Answer", "text": "A black box warning is the FDA's strongest safety warning, placed on a drug label when there is evidence of serious or life-threatening risk. If a manufacturer downplayed these risks or a physician prescribed the drug without disclosing them, you may have a claim." } },
          { "@type": "Question", "name": "How long do I have to file a defective medical device lawsuit?", "acceptedAnswer": { "@type": "Answer", "text": "Statutes of limitations vary by state and injury type, but typically run 2 to 3 years from the date of injury or discovery. For medical devices, the clock often starts when you learned the device caused your condition — not when you received it." } }
        ]
      }
    ]
  })}<\/script>`}
</svelte:head>

<!-- FDA SAFETY TICKER -->
<div class="bg-[#0a1929] border-b border-[rgba(201,168,76,0.15)] overflow-hidden h-10 flex items-center" aria-label="Live FDA MedWatch safety alert ticker">
  <div class="bg-red-700 text-white text-[10px] font-bold tracking-[0.1em] uppercase px-4 h-10 flex items-center whitespace-nowrap flex-shrink-0">
    FDA SAFETY ALERTS
  </div>
  <div class="overflow-hidden flex-1 h-10 flex items-center">
    {#if tickerItems.length}
      <div class="flex gap-12 whitespace-nowrap pl-8 [animation:ticker_40s_linear_infinite] hover:[animation-play-state:paused]">
        {#each [...tickerItems, ...tickerItems] as item, i (i)}
          <span class="text-xs text-[rgba(240,237,232,0.7)]">&#9877; {item}</span>
          <span class="text-[#C9A84C] mx-1">|</span>
        {/each}
      </div>
    {:else}
      <span class="text-xs text-[rgba(240,237,232,0.5)] pl-6">Loading FDA MedWatch safety alerts...</span>
    {/if}
  </div>
</div>

<!-- HERO -->
<section class="relative pt-40 pb-24 px-6 overflow-hidden bg-[#0D1B2A]">
  <div class="absolute inset-0 bg-[url('/bg-capitol.webp')] bg-cover bg-center opacity-10"></div>
  <div class="absolute inset-0 bg-linear-to-b from-[rgba(13,27,42,0.4)] to-[#0D1B2A]"></div>
  <div class="relative z-10 max-w-5xl mx-auto">
    <p class="text-[10px] tracking-[0.2em] uppercase mb-4 text-[#C9A84C] font-futura">
      Medical Device &amp; Drug Injury Attorneys
    </p>
    <h1 class="font-futura uppercase text-hero text-[#F0EDE8] leading-[1.05] mb-6">
      Recalled Medical Devices<br />
      <span class="text-[#C9A84C]">&amp; Dangerous Drugs That Harm Patients</span>
    </h1>
    <p class="text-base leading-relaxed max-w-2xl text-[rgba(240,237,232,0.7)] mb-8">
      Thousands of medical devices are recalled every year. Hundreds of drugs carry life-threatening black box warnings. If you or a loved one has been injured by a dangerous device, a recalled medication, or a drug the FDA warned about — you may be entitled to significant compensation. Counsel Hound connects you with proven medical injury attorneys at no cost unless we win.
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
  {#each ['No Fees Unless We Win', 'Free Medical Case Evaluation', 'Respond Within 1 Business Day', 'Medical Attorneys in All 50 States'] as item}
    <span class="text-[#0D1B2A] text-xs font-bold tracking-[0.04em] uppercase">{item}</span>
  {/each}
</div>

<!-- MAIN CONTENT -->
<div class="bg-[#152232]">
  <div class="max-w-7xl mx-auto px-6 py-16">

    <!-- MEDICAL DISCLAIMER -->
    <div class="border border-[rgba(201,168,76,0.2)] border-l-4 border-l-[#C9A84C] bg-[#0D1B2A] px-5 py-4 text-xs text-[rgba(240,237,232,0.55)] leading-relaxed mb-10">
      <strong class="text-[#C9A84C]">Medical &amp; Legal Notice:</strong> This page is for informational purposes only and does not constitute medical or legal advice. Always consult your doctor or pharmacist about concerns with your medications or devices. Data is sourced from public FDA databases. If you are experiencing a medical emergency, call 911 immediately. If you believe you have been harmed by a medical product, contact a qualified attorney.
    </div>

    <!-- STAT STRIP -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[rgba(201,168,76,0.2)] mb-10">
      {#each [
        { n: '3,934',       lbl: 'FDA Device Recalls', note: 'FY2020–2024 (GAO)' },
        { n: '400+',        lbl: 'Black Box Warnings', note: 'Active as of 2025' },
        { n: hstatClass1,   lbl: 'Class I Recalls (Live)', note: 'Most dangerous class' },
        { n: hstatAdverse,  lbl: 'Adverse Events (FAERS)', note: 'openFDA live count' },
        { n: '$5M',         lbl: 'Defective Products Verdict', note: 'Counsel Hound network' },
        { n: '$3M',         lbl: 'Medical Injury Verdict', note: 'Counsel Hound network' },
      ] as stat}
        <div class="bg-[#0D1B2A] border-r border-[rgba(201,168,76,0.1)] last:border-r-0 p-5">
          <div class="font-playfair text-3xl font-black text-[#C9A84C] leading-none">{stat.n}</div>
          <div class="text-[10px] text-[rgba(240,237,232,0.5)] mt-1 uppercase tracking-wider">{stat.lbl}</div>
          <div class="text-[10px] text-[rgba(240,237,232,0.3)] mt-1">{stat.note}</div>
        </div>
      {/each}
    </div>

    <!-- FEED STATUS ROW -->
    <div class="flex flex-wrap gap-6 bg-[#0D1B2A] border border-[rgba(201,168,76,0.15)] px-6 py-4 mb-4">
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-[0.1em] mb-1">Feed Status</div>
        <div class="text-sm font-bold text-[#C9A84C]">
          <span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>Live — FDA openFDA API
        </div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-[0.1em] mb-1">Last Refreshed</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upTime}</div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-[0.1em] mb-1">Device Records</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upDevCount}</div>
      </div>
      <div>
        <div class="text-[9px] text-[rgba(240,237,232,0.4)] uppercase tracking-[0.1em] mb-1">Drug Records</div>
        <div class="text-sm font-bold text-[#F0EDE8]">{upDrugCount}</div>
      </div>
    </div>

    <!-- CACHE STATUS -->
    <div class="flex items-center gap-2 text-xs text-[rgba(240,237,232,0.45)] mb-10">
      <div class="w-2 h-2 rounded-full {cacheFresh ? 'bg-green-400' : 'bg-amber-400'}"></div>
      <span>{cacheMsg}</span>
    </div>

    <!-- INJURY CTA -->
    <div class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.15)] p-10 text-center mb-12">
      <p class="text-[10px] text-[#C9A84C] tracking-[0.14em] uppercase font-bold mb-3">Were You Harmed by a Medical Device or Drug?</p>
      <h2 class="font-playfair text-2xl md:text-3xl font-black text-[#F0EDE8] mb-4 leading-snug">Your Doctor Trusted the Manufacturer. They May Have Betrayed That Trust.</h2>
      <p class="text-sm text-[rgba(240,237,232,0.65)] max-w-2xl mx-auto mb-6 leading-relaxed">
        Medical device manufacturers and pharmaceutical companies have a legal duty to warn patients and physicians about known risks. When they fail — concealing defects, downplaying side effects, or rushing products to market — they can and should be held accountable. Counsel Hound's network of medical injury attorneys has the expertise and resources to take on these cases. You pay nothing unless we win.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={config.consultationUrl} target="_blank" rel="noopener"
          class="inline-block bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:brightness-110 transition-all duration-200">
          Get a Free Medical Case Review
        </a>
        <a href="tel:{config.phone}"
          class="inline-block border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200">
          {config.phoneDisplay}
        </a>
      </div>
    </div>

    <!-- TABS -->
    <div class="flex border-b-2 border-[rgba(201,168,76,0.3)] mb-8 overflow-x-auto gap-0">
      {#each TABS as tab}
        <button
          onclick={() => activeTab = tab.id}
          class="px-5 py-3 text-xs font-bold tracking-[0.06em] uppercase whitespace-nowrap border-b-2 -mb-0.5 transition-colors duration-200 {activeTab === tab.id
            ? 'border-[#C9A84C] text-[#C9A84C]'
            : 'border-transparent text-[rgba(240,237,232,0.4)] hover:text-[rgba(240,237,232,0.7)]'}">
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- TAB: DEVICE RECALLS -->
    {#if activeTab === 'devices'}
      <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
        <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">FDA Medical Device Recalls</h2>
        <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">openFDA /device/enforcement.json</span>
      </div>
      <p class="text-xs text-[rgba(240,237,232,0.5)] leading-relaxed mb-5">
        Class I recalls are the most serious — the FDA has determined that use of the device may cause serious adverse health consequences or death. If you have used a recalled device and suffered harm, contact Counsel Hound's attorneys for a free evaluation.
      </p>
      <div class="flex flex-wrap gap-3 mb-5">
        <input type="text" placeholder="Search by device name, manufacturer, or recall reason..." bind:value={devSearch}
          class="flex-1 min-w-48 bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[#F0EDE8] text-sm px-4 py-2.5 placeholder:text-[rgba(240,237,232,0.3)] focus:border-[#C9A84C] focus:outline-none transition-colors" />
        <select bind:value={devClass}
          class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[rgba(240,237,232,0.8)] text-sm px-4 py-2.5 focus:outline-none focus:border-[#C9A84C] transition-colors">
          <option value="all">All recall classes</option>
          <option value="Class I">Class I — Most Dangerous</option>
          <option value="Class II">Class II</option>
          <option value="Class III">Class III</option>
        </select>
      </div>
      {#if devLoading}
        <div class="flex items-center gap-3 py-8 text-sm text-[rgba(240,237,232,0.45)]">
          <div class="w-4 h-4 border-2 border-[rgba(201,168,76,0.2)] border-t-[#C9A84C] rounded-full animate-spin flex-shrink-0"></div>
          Fetching device recalls from FDA openFDA API...
        </div>
      {:else if devError}
        <div class="bg-amber-400/10 border border-amber-400/30 px-4 py-3 text-sm text-amber-400 mb-6">{devError}</div>
      {:else}
        <div class="overflow-x-auto border border-[rgba(201,168,76,0.15)] mb-4">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-[#0D1B2A]">
                {#each ['Recall Date', 'Device & Manufacturer', 'Reason for Recall', 'Class', 'Status', 'Action'] as h}
                  <th class="px-4 py-3 text-left text-[10px] font-bold tracking-[0.1em] uppercase text-[#C9A84C] whitespace-nowrap">{h}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each devSlice as r}
                <tr class="border-b border-[rgba(255,255,255,0.04)] bg-[#0D1B2A] hover:bg-[#162336] transition-colors">
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.4)] whitespace-nowrap">{fmtDate(r.recall_initiation_date || '')}</td>
                  <td class="px-4 py-3">
                    <div class="font-semibold text-sm text-[#F0EDE8] mb-0.5">{(r.product_description || '').substring(0, 80)}</div>
                    <div class="text-[11px] text-[rgba(240,237,232,0.4)]">{r.recalling_firm || ''}</div>
                  </td>
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.5)] max-w-xs">{(r.reason_for_recall || '').substring(0, 140)}...</td>
                  <td class="px-4 py-3">
                    <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm {classPillStyle(r.classification)}">{classPillLabel(r.classification)}</span>
                  </td>
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.4)]">{r.status || '—'}</td>
                  <td class="px-4 py-3">
                    {#if r.event_id}
                      <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm?id={r.event_id}" target="_blank" rel="noopener"
                        class="text-xs font-semibold text-[#C9A84C] hover:underline">FDA →</a>
                    {:else}
                      <a href={config.consultationUrl} target="_blank" rel="noopener"
                        class="text-xs font-semibold text-[#C9A84C] hover:underline">Get Help →</a>
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        {#if devPageCount > 1}
          <div class="flex items-center gap-3 text-xs text-[rgba(240,237,232,0.5)] mb-6">
            <span>Showing {devPage * CFG.PAGE_SIZE + 1}–{Math.min((devPage + 1) * CFG.PAGE_SIZE, devFiltered.length)} of {devFiltered.length}</span>
            <button onclick={() => devPage = Math.max(0, devPage - 1)} disabled={devPage === 0}
              class="border border-[rgba(201,168,76,0.2)] px-3 py-1 hover:border-[#C9A84C] disabled:opacity-30 transition-colors">← Prev</button>
            <button onclick={() => devPage = Math.min(devPageCount - 1, devPage + 1)} disabled={devPage >= devPageCount - 1}
              class="border border-[rgba(201,168,76,0.2)] px-3 py-1 hover:border-[#C9A84C] disabled:opacity-30 transition-colors">Next →</button>
          </div>
        {:else}
          <div class="text-xs text-[rgba(240,237,232,0.4)] mb-6">{devFiltered.length} records from openFDA</div>
        {/if}
      {/if}
    {/if}

    <!-- TAB: DRUG RECALLS -->
    {#if activeTab === 'drugs'}
      <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
        <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">FDA Drug Enforcement Recalls</h2>
        <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">openFDA /drug/enforcement.json</span>
      </div>
      <p class="text-xs text-[rgba(240,237,232,0.5)] leading-relaxed mb-5">
        Drug recalls occur when medications are defective, contaminated, mislabeled, or more dangerous than disclosed. If you were prescribed a recalled drug and suffered harm, Counsel Hound's attorneys can review your case at no charge.
      </p>
      <div class="flex flex-wrap gap-3 mb-5">
        <input type="text" placeholder="Search by drug name, manufacturer, or recall reason..." bind:value={drugSearch}
          class="flex-1 min-w-48 bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[#F0EDE8] text-sm px-4 py-2.5 placeholder:text-[rgba(240,237,232,0.3)] focus:border-[#C9A84C] focus:outline-none transition-colors" />
        <select bind:value={drugClass}
          class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[rgba(240,237,232,0.8)] text-sm px-4 py-2.5 focus:outline-none focus:border-[#C9A84C] transition-colors">
          <option value="all">All recall classes</option>
          <option value="Class I">Class I — Most Dangerous</option>
          <option value="Class II">Class II</option>
          <option value="Class III">Class III</option>
        </select>
      </div>
      {#if drugLoading}
        <div class="flex items-center gap-3 py-8 text-sm text-[rgba(240,237,232,0.45)]">
          <div class="w-4 h-4 border-2 border-[rgba(201,168,76,0.2)] border-t-[#C9A84C] rounded-full animate-spin flex-shrink-0"></div>
          Fetching drug recalls from FDA openFDA API...
        </div>
      {:else if drugError}
        <div class="bg-amber-400/10 border border-amber-400/30 px-4 py-3 text-sm text-amber-400 mb-6">{drugError}</div>
      {:else}
        <div class="overflow-x-auto border border-[rgba(201,168,76,0.15)] mb-4">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-[#0D1B2A]">
                {#each ['Date', 'Drug & Manufacturer', 'Reason', 'Class', 'Distribution', 'Status'] as h}
                  <th class="px-4 py-3 text-left text-[10px] font-bold tracking-[0.1em] uppercase text-[#C9A84C] whitespace-nowrap">{h}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each drugSlice as r}
                <tr class="border-b border-[rgba(255,255,255,0.04)] bg-[#0D1B2A] hover:bg-[#162336] transition-colors">
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.4)] whitespace-nowrap">{fmtDate(r.recall_initiation_date || '')}</td>
                  <td class="px-4 py-3">
                    <div class="font-semibold text-sm text-[#F0EDE8] mb-0.5">{(r.product_description || '').substring(0, 80)}</div>
                    <div class="text-[11px] text-[rgba(240,237,232,0.4)]">{r.recalling_firm || ''}</div>
                  </td>
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.5)] max-w-xs">{(r.reason_for_recall || '').substring(0, 140)}...</td>
                  <td class="px-4 py-3">
                    <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm {classPillStyle(r.classification)}">{classPillLabel(r.classification)}</span>
                  </td>
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.4)]">{(r.distribution_pattern || '').substring(0, 60)}...</td>
                  <td class="px-4 py-3 text-[11px] text-[rgba(240,237,232,0.4)]">{r.status || '—'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        {#if drugPageCount > 1}
          <div class="flex items-center gap-3 text-xs text-[rgba(240,237,232,0.5)] mb-6">
            <span>Showing {drugPage * CFG.PAGE_SIZE + 1}–{Math.min((drugPage + 1) * CFG.PAGE_SIZE, drugFiltered.length)} of {drugFiltered.length}</span>
            <button onclick={() => drugPage = Math.max(0, drugPage - 1)} disabled={drugPage === 0}
              class="border border-[rgba(201,168,76,0.2)] px-3 py-1 hover:border-[#C9A84C] disabled:opacity-30 transition-colors">← Prev</button>
            <button onclick={() => drugPage = Math.min(drugPageCount - 1, drugPage + 1)} disabled={drugPage >= drugPageCount - 1}
              class="border border-[rgba(201,168,76,0.2)] px-3 py-1 hover:border-[#C9A84C] disabled:opacity-30 transition-colors">Next →</button>
          </div>
        {:else}
          <div class="text-xs text-[rgba(240,237,232,0.4)] mb-6">{drugFiltered.length} records from openFDA</div>
        {/if}
      {/if}
    {/if}

    <!-- TAB: BLACK BOX WARNINGS -->
    {#if activeTab === 'blackbox'}
      <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
        <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">FDA Black Box Warnings</h2>
        <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">FDA Drug Safety Communications 2020–2025</span>
      </div>
      <p class="text-xs text-[rgba(240,237,232,0.5)] leading-relaxed mb-5">
        A <strong class="text-[rgba(240,237,232,0.8)]">Black Box Warning</strong> is the FDA's most serious safety alert — placed on drug labels when evidence shows a risk of serious injury, permanent disability, or death. Over 400 prescription drugs currently carry these warnings. If you suffered a serious adverse event from any of these drugs, Counsel Hound can review your case for free.
      </p>
      <div class="flex flex-wrap gap-3 mb-6">
        <input type="text" placeholder="Search by drug name, condition, or risk type..." bind:value={bbwSearch}
          class="flex-1 min-w-48 bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[#F0EDE8] text-sm px-4 py-2.5 placeholder:text-[rgba(240,237,232,0.3)] focus:border-[#C9A84C] focus:outline-none transition-colors" />
        <select bind:value={bbwCat}
          class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.2)] text-[rgba(240,237,232,0.8)] text-sm px-4 py-2.5 focus:outline-none focus:border-[#C9A84C] transition-colors">
          <option value="all">All drug categories</option>
          {#each BBW_CATS.slice(1) as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {#each bbwFiltered as w}
          <div class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.12)] overflow-hidden">
            <div class="bg-[#162336] px-5 py-4">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="font-playfair text-base font-bold text-[#F0EDE8]">{w.drug}</div>
                  <div class="text-[11px] text-[rgba(240,237,232,0.45)] mt-0.5">{w.generic}</div>
                </div>
                <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm flex-shrink-0 {bbwPillStyle(w.cat)}">{w.cat}</span>
              </div>
            </div>
            <div class="p-5">
              <p class="text-xs text-[rgba(240,237,232,0.55)] leading-relaxed mb-4">{w.risk}</p>
              <div class="flex flex-wrap gap-1.5 border-t border-[rgba(255,255,255,0.05)] pt-3 mb-3">
                <span class="text-[10px] text-[rgba(240,237,232,0.35)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 uppercase tracking-wider">Warning: {w.year}</span>
                <span class="text-[10px] text-[rgba(240,237,232,0.35)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 uppercase tracking-wider">Source: FDA</span>
              </div>
              <a href={config.consultationUrl} target="_blank" rel="noopener"
                class="block text-center bg-[#C9A84C] text-[#0D1B2A] py-2 text-[11px] font-bold tracking-wider uppercase hover:brightness-110 transition-all">
                Harmed by This Drug? Free Case Review →
              </a>
            </div>
          </div>
        {/each}
      </div>
      <p class="text-xs text-[rgba(240,237,232,0.35)]">
        Full FDA database: <a href="https://www.accessdata.fda.gov/scripts/cder/safetylabelingchanges/index.cfm" target="_blank" rel="noopener" class="text-[#C9A84C] hover:underline">FDA Safety Labeling Changes →</a>
      </p>
    {/if}

    <!-- TAB: HIGH-RISK DEVICES -->
    {#if activeTab === 'knowndevices'}
      <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
        <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">High-Risk Medical Devices — Research Database</h2>
        <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">FDA / GAO / MedTech Dive — 2023–2026</span>
      </div>
      <p class="text-xs text-[rgba(240,237,232,0.5)] leading-relaxed mb-6">
        These are some of the most significant medical device safety issues documented in recent years. If you have been treated with any of these devices and experienced complications, Counsel Hound's medical injury attorneys can evaluate whether you have a claim — at no cost to you.
      </p>
      <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each DEVICES_DB as d}
          <div class="bg-[#0D1B2A] border border-[rgba(201,168,76,0.12)] border-t-4 {d.cls === 'critical' ? 'border-t-red-500' : 'border-t-amber-500'} p-5">
            <div class="font-semibold text-sm text-[#F0EDE8] mb-3 leading-snug">{d.name}</div>
            <p class="text-xs text-[rgba(240,237,232,0.55)] leading-relaxed mb-4">&#9888; {d.hazard}</p>
            <div class="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(255,255,255,0.05)] pt-3">
              <div class="flex flex-wrap gap-1.5">
                <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm {d.cls === 'critical' ? 'text-red-400 border border-red-400/40 bg-red-400/10' : 'text-amber-400 border border-amber-400/40 bg-amber-400/10'}">
                  {d.cls === 'critical' ? 'CLASS I RISK' : 'CLASS II'}
                </span>
                <span class="inline-block px-2.5 py-0.5 text-[10px] tracking-wider uppercase rounded-sm text-[rgba(240,237,232,0.4)] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)]">{d.pop}</span>
              </div>
              <a href={config.consultationUrl} target="_blank" rel="noopener"
                class="text-xs font-semibold text-[#C9A84C] hover:underline whitespace-nowrap">Get Legal Help →</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- TAB: REPORT & GET HELP -->
    {#if activeTab === 'report'}
      <div class="flex items-end justify-between mb-4 pb-3 border-b border-[rgba(201,168,76,0.3)]">
        <h2 class="font-futura uppercase tracking-wide text-[#F0EDE8] text-xl">Report a Medical Device or Drug Problem</h2>
        <span class="text-[10px] text-[rgba(240,237,232,0.4)] uppercase tracking-wider">Government Channels + Free Legal Help</span>
      </div>
      <p class="text-xs text-[rgba(240,237,232,0.5)] leading-relaxed mb-6">
        Your report to the FDA can trigger the investigation that protects the next patient. And if you have been harmed, speaking with a Counsel Hound attorney — at no cost — is the first step toward the compensation you deserve.
      </p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each [
          { agency: 'FDA MedWatch — Report an Adverse Event', desc: 'Report serious adverse events from drugs, medical devices, biologics, or dietary supplements directly to the FDA. The agency uses these reports to detect safety patterns and issue alerts. Your identity can remain confidential.', phone: 'Hotline: 1-800-332-1088', href: 'https://www.accessdata.fda.gov/scripts/medwatch/index.cfm?action=consumer.reporting1', cta: 'File a MedWatch Report →' },
          { agency: 'FDA Device Recall Database', desc: 'Search the complete FDA medical device recall database by device type, company name, or date. Updated weekly with new enforcement actions and classification decisions. Free public access.', phone: 'accessdata.fda.gov', href: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm', cta: 'Search Device Recalls →' },
          { agency: 'FDA Drug Safety Communications', desc: 'View all current drug safety alerts, black box warning updates, and drug recall enforcement actions. Covers all prescription drugs, OTC products, and biologics regulated by the FDA.', phone: 'fda.gov/drugs', href: 'https://www.fda.gov/drugs/drug-safety-and-availability/drug-alerts-and-statements', cta: 'View Drug Safety Alerts →' },
          { agency: 'Subscribe to FDA MedWatch Alerts', desc: 'Sign up to receive FDA safety alerts by email the moment they are published — used by over 130,000 healthcare professionals and patients. Never miss a warning that could affect your treatment.', phone: 'fda.gov/safety/medwatch', href: 'https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program/subscribe-medwatch-safety-alerts', cta: 'Subscribe to FDA Alerts →' },
          { agency: 'openFDA Adverse Events (FAERS)', desc: "Search millions of adverse event reports submitted by patients and healthcare professionals in the FDA's FAERS database — going back decades. Research whether others have reported the same problem with your drug or device.", phone: 'open.fda.gov', href: 'https://open.fda.gov/apis/drug/event/', cta: 'Search FAERS Database →' },
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
          <div class="font-playfair text-base font-bold text-[#0D1B2A] mb-2">Counsel Hound — Free Medical Injury Case Review</div>
          <p class="text-xs text-[rgba(13,27,42,0.75)] leading-relaxed mb-3">Harmed by a recalled device, a drug with a black box warning, or a product the manufacturer knew was dangerous? Counsel Hound's network of medical injury attorneys can review your case — for free — and pursue maximum compensation. No fees unless we win.</p>
          <div class="text-xs font-bold text-[#0D1B2A] mb-3">{config.phoneDisplay}</div>
          <a href={config.consultationUrl} target="_blank" rel="noopener"
            class="block text-center bg-[#0D1B2A] text-[#C9A84C] py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-[#162336] transition-colors">
            Get Free Case Review →
          </a>
        </div>
      </div>
    {/if}

  </div>
</div>

<!-- DISCLAIMER -->
<div class="bg-[#0D1B2A] border-t border-[rgba(201,168,76,0.1)]">
  <div class="max-w-7xl mx-auto px-6 py-6">
    <p class="text-[10px] text-[rgba(240,237,232,0.25)] leading-relaxed">
      <strong class="text-[rgba(240,237,232,0.4)]">Legal &amp; Medical Disclaimer:</strong> The information on this page is for informational purposes only and does not constitute legal or medical advice. Data is sourced from public FDA databases including the openFDA API, FDA MedWatch, and published government reports. Viewing this page does not create an attorney-client relationship. Results displayed represent past verdicts from the Counsel Hound attorney network and are not a guarantee of future outcomes. If you are experiencing a medical emergency, call 911. If you believe you have been harmed by a medical product, consult with a qualified attorney.
    </p>
    <p class="text-[10px] text-[rgba(240,237,232,0.2)] mt-2">&copy; {year} Counsel Hound. All Rights Reserved.</p>
  </div>
</div>
