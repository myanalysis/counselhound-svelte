<?php
/*
 * Template Name: Counsel Hound Medical Safety
 * Template Post Type: page
 * Description: Counsel Hound — Dangerous Medical Devices & Drug Recalls Dashboard
 *              with live FDA openFDA API data, black box warnings, daily auto-refresh,
 *              and legal CTAs for medical injury victims.
 *
 * INSTALLATION:
 *   1. Upload this file to /wp-content/themes/YOUR-THEME-NAME/
 *   2. In WordPress Admin → Pages → Add New
 *   3. Set the page title to: Counsel Hound Medical Safety
 *   4. Set the slug to: counsel-hound-medical-safety
 *   5. Under Page Attributes → Template, select "Counsel Hound Medical Safety"
 *   6. Publish the page
 *   7. Page will be live at: counselhound.com/counsel-hound-medical-safety/
 *
 * SPELLING NOTE: "Counsel Hound" is always two words in all display text.
 *   URLs use the registered domain: counselhound.com (one word, as registered).
 *
 * DATA SOURCES:
 *   - openFDA Device Enforcement API: https://api.fda.gov/device/enforcement.json
 *   - openFDA Drug Enforcement API:   https://api.fda.gov/drug/enforcement.json
 *   - openFDA Drug Adverse Events:    https://api.fda.gov/drug/event.json
 *   - FDA MedWatch RSS:               https://www.fda.gov/.../MedWatch/rss.xml
 *   All are free public APIs. No authentication required for < 1000 req/day.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dangerous Medical Devices &amp; Drug Recalls | Counsel Hound</title>
<meta name="description" content="Counsel Hound tracks FDA-recalled medical devices, dangerous drugs, and black box warnings daily. Free legal help for patients harmed by defective medical products.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="<?php echo esc_url( get_permalink() ); ?>">
<meta property="og:title" content="Dangerous Medical Devices &amp; Drug Recalls | Counsel Hound">
<meta property="og:description" content="Live FDA recall data, black box warnings, and free legal help for patients harmed by dangerous medical devices or drugs.">
<meta property="og:url" content="<?php echo esc_url( get_permalink() ); ?>">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Counsel Hound">

<?php wp_head(); ?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
/* ═══════════════════════════════════════════════
   COUNSEL HOUND — Medical Safety Page Styles
   Brand name: "Counsel Hound" (two words always)
   Domain: counselhound.com (registered one word)
   ═══════════════════════════════════════════════ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --navy:#0d1b2a;--navy2:#162336;--navy3:#1e3050;
  --gold:#c9a84c;--gold2:#e8c97a;
  --red:#c0392b;--red-bg:rgba(192,57,43,0.1);
  --amber:#d4890a;--amber-bg:rgba(212,137,10,0.1);
  --teal:#1a7a6e;--teal-bg:rgba(26,122,110,0.1);
  --white:#ffffff;--off:#f5f3ef;--text:#1a1a2e;--muted:#5a6478;
  --border:rgba(201,168,76,0.2);--border2:rgba(201,168,76,0.4);
  --font-serif:'Playfair Display',Georgia,serif;
  --font-sans:'Inter',sans-serif;
}
html{scroll-behavior:smooth;}
body{background:var(--off);color:var(--text);font-family:var(--font-sans);font-size:15px;line-height:1.6;margin:0;padding:0;}
.wp-site-blocks,.entry-header,.entry-footer,.site-footer,.site-header{display:none!important;}
#page,#content,#primary,#main,.site,.hentry{display:block!important;margin:0!important;padding:0!important;max-width:none!important;}
.topbar{background:var(--gold);color:var(--navy);text-align:center;padding:9px 1rem;font-size:12px;font-weight:700;letter-spacing:0.06em;}
.topbar a{color:var(--navy);text-decoration:none;border-bottom:1px solid rgba(0,0,0,0.3);}
header.ch-header{background:var(--navy);position:sticky;top:0;z-index:1000;border-bottom:2px solid var(--gold);}
.header-inner{max-width:1280px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:72px;}
.logo-wrap{display:flex;align-items:center;gap:14px;text-decoration:none;}
.logo-paw{font-size:28px;line-height:1;}
.logo-name{font-family:var(--font-serif);font-size:22px;color:var(--white);font-weight:700;line-height:1;}
.logo-tag{font-size:10px;color:var(--gold);letter-spacing:0.12em;text-transform:uppercase;font-weight:600;}
.header-cta{display:flex;align-items:center;gap:1rem;}
.phone-link{color:var(--gold);font-weight:700;font-size:15px;text-decoration:none;}
.cta-btn{background:var(--gold);color:var(--navy);font-weight:700;font-size:13px;padding:10px 22px;border-radius:4px;text-decoration:none;letter-spacing:0.04em;transition:background 0.2s;}
.cta-btn:hover{background:var(--gold2);}
.ch-nav{display:flex;gap:0;margin-left:2rem;}
.ch-nav a{color:rgba(255,255,255,0.75);text-decoration:none;padding:0 14px;font-size:13px;font-weight:500;border-right:1px solid rgba(255,255,255,0.1);transition:color 0.2s;}
.ch-nav a:first-child{border-left:1px solid rgba(255,255,255,0.1);}
.ch-nav a:hover{color:var(--gold);}
.ticker-wrap{background:var(--navy2);border-bottom:1px solid var(--border);overflow:hidden;height:38px;display:flex;align-items:center;}
.ticker-label{background:var(--red);color:var(--white);font-size:10px;font-weight:700;letter-spacing:0.1em;padding:0 16px;height:38px;display:flex;align-items:center;white-space:nowrap;flex-shrink:0;}
.ticker-track{display:flex;gap:3rem;animation:ch-ticker 40s linear infinite;white-space:nowrap;padding-left:2rem;}
.ticker-track:hover{animation-play-state:paused;}
@keyframes ch-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ticker-item{font-size:12px;color:rgba(255,255,255,0.75);}
.ticker-sep{color:var(--gold);margin:0 4px;}
.hero{background:var(--navy);background-image:linear-gradient(135deg,var(--navy) 0%,#0d2340 100%);padding:5rem 2rem 4rem;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
.hero-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr auto;gap:4rem;align-items:center;position:relative;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:1.25rem;}
.hero-eyebrow::before{content:'';display:block;width:28px;height:2px;background:var(--gold);}
.hero-h1{font-family:var(--font-serif);font-size:clamp(32px,5vw,58px);color:var(--white);line-height:1.1;font-weight:900;margin-bottom:1.25rem;}
.hero-h1 em{color:var(--gold);font-style:normal;}
.hero-sub{font-size:16px;color:rgba(255,255,255,0.72);line-height:1.75;max-width:520px;margin-bottom:2rem;}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;}
.btn-primary{background:var(--gold);color:var(--navy);font-weight:700;font-size:14px;padding:14px 30px;border-radius:4px;text-decoration:none;letter-spacing:0.04em;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px;}
.btn-primary:hover{background:var(--gold2);transform:translateY(-1px);}
.btn-outline{background:transparent;color:var(--white);font-weight:600;font-size:14px;padding:13px 28px;border-radius:4px;border:1.5px solid rgba(255,255,255,0.35);text-decoration:none;transition:all 0.2s;}
.btn-outline:hover{border-color:var(--gold);color:var(--gold);}
.hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(201,168,76,0.2);border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.hs-cell{background:rgba(255,255,255,0.04);padding:1.25rem;text-align:center;}
.hs-n{font-family:var(--font-serif);font-size:30px;color:var(--gold);font-weight:900;line-height:1;}
.hs-l{font-size:10px;color:rgba(255,255,255,0.5);margin-top:4px;text-transform:uppercase;letter-spacing:0.07em;}
.nofee-strip{background:var(--gold);display:flex;align-items:center;justify-content:center;gap:2rem;padding:1rem 2rem;flex-wrap:wrap;}
.nofee-item{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--navy);letter-spacing:0.04em;}
.ch-page{max-width:1280px;margin:0 auto;padding:3rem 2rem 5rem;}
.med-disclaimer{background:var(--navy2);border:1px solid var(--border);border-left:4px solid var(--gold);border-radius:4px;padding:1rem 1.25rem;font-size:12px;color:rgba(255,255,255,0.6);line-height:1.65;margin-bottom:2.5rem;}
.med-disclaimer strong{color:var(--gold);}
.stat-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));border:1px solid var(--border2);border-radius:6px;overflow:hidden;margin-bottom:2.5rem;background:var(--navy);}
.stat-cell{padding:1.5rem;border-right:1px solid rgba(201,168,76,0.15);background:var(--navy2);}
.stat-cell:last-child{border-right:none;}
.stat-n{font-family:var(--font-serif);font-size:34px;font-weight:900;color:var(--gold);line-height:1;}
.stat-lbl{font-size:11px;color:rgba(255,255,255,0.55);margin-top:5px;text-transform:uppercase;letter-spacing:0.07em;}
.stat-note{font-size:11px;color:rgba(255,255,255,0.3);margin-top:4px;}
.ch-tabs{display:flex;border-bottom:2px solid var(--gold);margin-bottom:2rem;gap:0;overflow-x:auto;}
.tab-btn{background:none;border:none;padding:0.9rem 1.5rem;font-family:var(--font-sans);font-size:12px;font-weight:700;letter-spacing:0.06em;color:var(--muted);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:color 0.2s;white-space:nowrap;text-transform:uppercase;}
.tab-btn.active{color:var(--navy);border-bottom-color:var(--gold);}
.tab-btn:hover:not(.active){color:var(--navy);}
.tab-panel{display:none;}
.tab-panel.active{display:block;}
.section-head{display:flex;align-items:center;justify-content:space-between;margin:2.5rem 0 1.25rem;padding-bottom:0.75rem;border-bottom:2px solid var(--gold);}
.section-title{font-family:var(--font-serif);font-size:22px;font-weight:700;color:var(--navy);}
.section-meta{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;}
.search-row{display:flex;gap:10px;margin-bottom:1.25rem;flex-wrap:wrap;}
.ch-search{flex:1;min-width:200px;background:var(--white);border:1.5px solid rgba(0,0,0,0.15);border-radius:4px;color:var(--text);font-family:var(--font-sans);font-size:13px;padding:10px 14px;outline:none;transition:border-color 0.2s;}
.ch-search:focus{border-color:var(--gold);}
.ch-search::placeholder{color:var(--muted);}
.filter-sel{background:var(--white);border:1.5px solid rgba(0,0,0,0.15);color:var(--text);font-family:var(--font-sans);font-size:13px;padding:10px 12px;border-radius:4px;outline:none;cursor:pointer;}
.table-wrap{overflow-x:auto;border:1px solid rgba(0,0,0,0.1);border-radius:6px;background:var(--white);}
.recall-table{width:100%;border-collapse:collapse;}
.recall-table th{background:var(--navy);color:var(--gold);font-size:10px;letter-spacing:0.1em;font-weight:700;text-transform:uppercase;padding:0.75rem 1rem;text-align:left;}
.recall-table td{padding:0.75rem 1rem;border-bottom:1px solid rgba(0,0,0,0.06);font-size:13px;vertical-align:top;}
.recall-table tr:last-child td{border-bottom:none;}
.recall-table tr:hover td{background:rgba(201,168,76,0.04);}
.prod-name{font-weight:600;color:var(--text);margin-bottom:2px;}
.prod-firm{font-size:11px;color:var(--muted);}
.prod-desc{font-size:11px;color:var(--muted);margin-top:3px;line-height:1.5;}
.pill{display:inline-block;padding:3px 10px;border-radius:3px;font-size:10px;font-weight:700;letter-spacing:0.06em;white-space:nowrap;}
.pill-red{background:var(--red-bg);color:var(--red);border:1px solid rgba(192,57,43,0.25);}
.pill-amber{background:var(--amber-bg);color:var(--amber);border:1px solid rgba(212,137,10,0.25);}
.pill-teal{background:var(--teal-bg);color:var(--teal);border:1px solid rgba(26,122,110,0.25);}
.pill-navy{background:rgba(13,27,42,0.08);color:var(--navy);border:1px solid rgba(13,27,42,0.2);}
.ext-link{color:var(--gold);font-size:11px;font-weight:600;text-decoration:none;}
.ext-link:hover{text-decoration:underline;}
.bbw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;}
.bbw-card{background:var(--white);border:1px solid rgba(0,0,0,0.1);border-radius:6px;overflow:hidden;}
.bbw-header{background:var(--navy);padding:1rem 1.25rem;}
.bbw-drug{font-family:var(--font-serif);font-size:16px;font-weight:700;color:var(--white);}
.bbw-generic{font-size:11px;color:rgba(255,255,255,0.5);margin-top:3px;}
.bbw-body{padding:1.25rem;}
.bbw-text{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:1rem;}
.bbw-meta{display:flex;flex-wrap:wrap;gap:6px;border-top:1px solid rgba(0,0,0,0.07);padding-top:10px;}
.bbw-tag{font-size:10px;color:var(--muted);background:rgba(0,0,0,0.04);padding:3px 8px;border-radius:3px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;}
.bbw-cta{display:block;text-align:center;background:var(--gold);color:var(--navy);font-size:11px;font-weight:700;padding:8px;text-decoration:none;letter-spacing:0.05em;transition:background 0.2s;margin-top:10px;}
.bbw-cta:hover{background:var(--gold2);}
.device-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;}
.device-card{background:var(--white);border:1px solid rgba(0,0,0,0.1);border-radius:6px;border-top:3px solid var(--gold);padding:1.25rem;}
.device-card.critical{border-top-color:var(--red);}
.device-card.amber-card{border-top-color:var(--amber);}
.device-name{font-weight:700;font-size:14px;margin-bottom:8px;color:var(--text);}
.device-hazard{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:12px;}
.device-footer{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;border-top:1px solid rgba(0,0,0,0.07);padding-top:10px;gap:8px;}
.device-action{font-size:12px;font-weight:600;color:var(--gold);text-decoration:none;}
.injury-callout{background:var(--navy);border-radius:6px;padding:2.5rem;text-align:center;margin:3rem 0;}
.ic-sub{font-size:11px;color:var(--gold);letter-spacing:0.14em;text-transform:uppercase;font-weight:700;margin-bottom:0.75rem;}
.ic-h{font-family:var(--font-serif);font-size:26px;color:var(--white);font-weight:900;margin-bottom:1rem;line-height:1.2;}
.ic-p{font-size:14px;color:rgba(255,255,255,0.7);max-width:560px;margin:0 auto 1.5rem;line-height:1.75;}
.ic-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.report-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
.report-card{background:var(--white);border:1px solid rgba(0,0,0,0.1);border-left:4px solid var(--gold);border-radius:4px;padding:1.5rem;}
.rc-agency{font-family:var(--font-serif);font-size:17px;font-weight:700;color:var(--navy);margin-bottom:8px;}
.rc-desc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:12px;}
.rc-phone{font-size:12px;font-weight:700;color:var(--gold);margin-bottom:12px;}
.rc-btn{display:block;text-align:center;background:var(--navy);color:var(--white);padding:10px;border-radius:4px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.05em;transition:background 0.2s;}
.rc-btn:hover{background:var(--navy3);}
.ch-loader{display:flex;align-items:center;gap:10px;padding:2rem 0;color:var(--muted);font-size:13px;}
.ch-spin{width:16px;height:16px;border:2px solid rgba(0,0,0,0.1);border-top-color:var(--gold);border-radius:50%;animation:ch-spin 0.7s linear infinite;flex-shrink:0;}
@keyframes ch-spin{to{transform:rotate(360deg)}}
.error-box{background:var(--amber-bg);border:1px solid rgba(212,137,10,0.3);border-radius:4px;padding:1rem;font-size:13px;color:var(--amber);}
.update-row{display:flex;align-items:center;gap:2rem;background:var(--navy2);border:1px solid var(--border);border-radius:6px;padding:1rem 1.5rem;margin-bottom:1.5rem;flex-wrap:wrap;}
.ur-item{display:flex;flex-direction:column;gap:2px;}
.ur-label{font-size:9px;color:rgba(255,255,255,0.45);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;}
.ur-val{font-size:14px;font-weight:700;color:var(--white);}
.ur-val.gold{color:var(--gold);}
.live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#27ae60;animation:ch-pulse 2s infinite;margin-right:6px;}
@keyframes ch-pulse{0%,100%{opacity:1}50%{opacity:0.4}}
.cache-row{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);margin-bottom:1rem;}
.cdot{width:7px;height:7px;border-radius:50%;}
.cdot.fresh{background:#27ae60;}
.cdot.stale{background:var(--amber);}
.ch-footer{background:var(--navy);border-top:2px solid var(--gold);}
.footer-inner{max-width:1280px;margin:0 auto;padding:3rem 2rem 2rem;display:grid;grid-template-columns:2fr 1fr 1fr;gap:2.5rem;}
.footer-logo{font-family:var(--font-serif);font-size:20px;color:var(--white);font-weight:700;margin-bottom:0.75rem;}
.footer-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:300px;}
.footer-phone{font-size:15px;font-weight:700;color:var(--gold);margin-top:1rem;}
.footer-col h4{font-size:12px;color:var(--gold);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:0.75rem;}
.footer-col a{display:block;font-size:13px;color:rgba(255,255,255,0.55);text-decoration:none;margin-bottom:5px;transition:color 0.2s;}
.footer-col a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.1);padding:1.25rem 2rem;max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.3);flex-wrap:wrap;gap:0.5rem;}
.footer-disclaimer{font-size:10px;color:rgba(255,255,255,0.25);line-height:1.6;padding:0 2rem 1.5rem;max-width:1280px;margin:0 auto;}
@media(max-width:768px){
  .hero-inner{grid-template-columns:1fr;}
  .hero-stats{display:none;}
  .ch-nav{display:none;}
  .header-inner{padding:0 1rem;}
  .ch-page{padding:2rem 1rem 4rem;}
  .footer-inner{grid-template-columns:1fr;}
}
</style>
</head>
<body <?php body_class( 'counsel-hound-medical-safety' ); ?>>
<?php wp_body_open(); ?>

<!-- ═══════════════════════════════════════════
     COUNSEL HOUND — Medical Safety Dashboard
     Brand name: "Counsel Hound" (two words)
     Domain: counselhound.com (registered one word)
     ═══════════════════════════════════════════ -->

<div class="topbar">⚕ Harmed by a Medical Device or Dangerous Drug? Our Attorneys Fight for Maximum Compensation. <a href="https://counselhound.lawbrokr.com/">Free Case Review →</a></div>

<header class="ch-header">
  <div class="header-inner">
    <a class="logo-wrap" href="https://counselhound.com">
      <div class="logo-paw">🐾</div>
      <div>
        <div class="logo-name">Counsel Hound</div>
        <div class="logo-tag">Serious Results for Serious Injuries</div>
      </div>
    </a>
    <nav class="ch-nav">
      <a href="https://counselhound.com/practice-area/medical-injury/">Medical Injury</a>
      <a href="https://counselhound.com/practice-area/defective-products/">Defective Products</a>
      <a href="https://counselhound.com/practice-area/toxic-torts/">Toxic Torts</a>
      <a href="https://counselhound.com/about-us/">About Counsel Hound</a>
    </nav>
    <div class="header-cta">
      <a class="phone-link" href="tel:+18558046863">📞 1-855-804-6863</a>
      <a class="cta-btn" href="https://counselhound.lawbrokr.com/">Free Consultation</a>
    </div>
  </div>
</header>

<div class="ticker-wrap" aria-label="Live FDA MedWatch safety alert ticker">
  <div class="ticker-label">⚕ FDA SAFETY ALERTS</div>
  <div class="ticker-track" id="tickerTrack">
    <span class="ticker-item">Loading FDA MedWatch safety alerts…</span>
  </div>
</div>

<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="hero-eyebrow">Medical Device &amp; Drug Injury Attorneys</div>
      <h1 class="hero-h1">Recalled Medical Devices<br>&amp; <em>Dangerous Drugs</em><br>That Harm Patients</h1>
      <p class="hero-sub">Thousands of medical devices are recalled every year. Hundreds of drugs carry life-threatening black box warnings. If you or a loved one has been injured by a dangerous device, a recalled medication, or a drug the FDA warned about — you may be entitled to significant compensation. Counsel Hound connects you with proven medical injury attorneys at no cost to you unless we win.</p>
      <div class="hero-actions">
        <a class="btn-primary" href="https://counselhound.lawbrokr.com/">⚖️ Get a Free Case Evaluation</a>
        <a class="btn-outline" href="tel:+18558046863">Call 1-855-804-6863</a>
      </div>
    </div>
    <div class="hero-stats">
      <div class="hs-cell"><div class="hs-n">3,934</div><div class="hs-l">Device Recalls FY2020–24</div></div>
      <div class="hs-cell"><div class="hs-n">400+</div><div class="hs-l">Active Black Box Warnings</div></div>
      <div class="hs-cell"><div class="hs-n">$5M</div><div class="hs-l">Defective Products Verdict</div></div>
      <div class="hs-cell"><div class="hs-n">25+</div><div class="hs-l">Years Connecting Victims</div></div>
    </div>
  </div>
</section>

<div class="nofee-strip">
  <div class="nofee-item">✅ No Fees Unless We Win</div>
  <div class="nofee-item">📋 Free Medical Case Evaluation</div>
  <div class="nofee-item">⚡ Respond Within 1 Business Day</div>
  <div class="nofee-item">🌎 Medical Attorneys in All 50 States</div>
</div>

<main class="ch-page" id="main-content">

  <div class="med-disclaimer">
    <strong>⚕ Medical &amp; Legal Notice:</strong> This page is for informational purposes only and does not constitute medical or legal advice. Always consult your doctor or pharmacist about concerns with your medications or devices. Data is sourced from public FDA databases. If you are experiencing a medical emergency, call 911 immediately. If you believe you have been harmed by a medical product, contact a qualified attorney.
  </div>

  <div class="stat-strip">
    <div class="stat-cell"><div class="stat-n">3,934</div><div class="stat-lbl">FDA Device Recalls</div><div class="stat-note">FY2020–2024 (GAO)</div></div>
    <div class="stat-cell"><div class="stat-n">400+</div><div class="stat-lbl">Black Box Warnings</div><div class="stat-note">Active as of 2025</div></div>
    <div class="stat-cell"><div class="stat-n" id="hstat-class1">…</div><div class="stat-lbl">Class I Recalls (Live)</div><div class="stat-note">Most dangerous class</div></div>
    <div class="stat-cell"><div class="stat-n" id="hstat-adverse">…</div><div class="stat-lbl">Adverse Events (FAERS)</div><div class="stat-note">openFDA live count</div></div>
    <div class="stat-cell"><div class="stat-n">$5M</div><div class="stat-lbl">Defective Products Verdict</div><div class="stat-note">Counsel Hound network</div></div>
    <div class="stat-cell"><div class="stat-n">$3M</div><div class="stat-lbl">Medical Injury Verdict</div><div class="stat-note">Counsel Hound network</div></div>
  </div>

  <div class="update-row">
    <div class="ur-item"><div class="ur-label">Feed Status</div><div class="ur-val gold"><span class="live-dot"></span>Live — FDA openFDA API</div></div>
    <div class="ur-item"><div class="ur-label">Last Refreshed</div><div class="ur-val" id="upTime">—</div></div>
    <div class="ur-item"><div class="ur-label">Device Records</div><div class="ur-val" id="upDevCount">—</div></div>
    <div class="ur-item"><div class="ur-label">Drug Records</div><div class="ur-val" id="upDrugCount">—</div></div>
  </div>

  <div class="cache-row"><div class="cdot" id="cacheDot"></div><span id="cacheStatus">Connecting to FDA openFDA API…</span></div>

  <div class="injury-callout">
    <div class="ic-sub">Were You Harmed by a Medical Device or Drug?</div>
    <h2 class="ic-h">Your Doctor Trusted the Manufacturer. They May Have Betrayed That Trust.</h2>
    <p class="ic-p">Medical device manufacturers and pharmaceutical companies have a legal duty to warn patients and physicians about known risks. When they fail — concealing defects, downplaying side effects, or rushing products to market — they can and should be held accountable. Counsel Hound's network of medical injury attorneys has the expertise and resources to take on these cases. You pay nothing unless we win.</p>
    <div class="ic-actions">
      <a class="btn-primary" href="https://counselhound.lawbrokr.com/">⚖️ Get a Free Medical Case Review →</a>
      <a class="btn-outline" href="tel:+18558046863">📞 Call Now: 1-855-804-6863</a>
    </div>
  </div>

  <div class="ch-tabs" role="tablist">
    <button class="tab-btn active" onclick="chTab('devices',this)">Device Recalls (Live)</button>
    <button class="tab-btn" onclick="chTab('drugs',this)">Drug Recalls (Live)</button>
    <button class="tab-btn" onclick="chTab('blackbox',this)">⬛ Black Box Warnings</button>
    <button class="tab-btn" onclick="chTab('knowndevices',this)">High-Risk Devices</button>
    <button class="tab-btn" onclick="chTab('report',this)">Report &amp; Get Help</button>
  </div>

  <!-- DEVICE RECALLS TAB -->
  <div class="tab-panel active" id="tab-devices">
    <div class="section-head">
      <div class="section-title">FDA Medical Device Recalls</div>
      <div class="section-meta">openFDA /device/enforcement.json — Updated Weekly</div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-bottom:1.25rem;line-height:1.7;">Class I recalls are the most serious — the FDA has determined that use of the device may cause serious adverse health consequences or death. If you have used a recalled device and suffered harm, contact Counsel Hound's attorneys for a free evaluation.</p>
    <div class="search-row">
      <input class="ch-search" type="text" id="devSearch" placeholder="Search by device name, manufacturer, or recall reason…" oninput="filterDevices()">
      <select class="filter-sel" id="devClass" onchange="filterDevices()">
        <option value="all">All recall classes</option>
        <option value="Class I">Class I — Most Dangerous</option>
        <option value="Class II">Class II</option>
        <option value="Class III">Class III</option>
      </select>
    </div>
    <div id="devLoader" class="ch-loader"><div class="ch-spin"></div>Fetching device recalls from FDA openFDA API…</div>
    <div id="devError" style="display:none;" class="error-box"></div>
    <div id="devTableWrap" style="display:none;" class="table-wrap">
      <table class="recall-table"><thead><tr>
        <th>Recall Date</th><th>Device &amp; Manufacturer</th><th>Reason for Recall</th><th>Class</th><th>Status</th><th>Action</th>
      </tr></thead><tbody id="devTbody"></tbody></table>
    </div>
    <div id="devPager" style="margin-top:0.75rem;font-size:12px;color:var(--muted);"></div>
  </div>

  <!-- DRUG RECALLS TAB -->
  <div class="tab-panel" id="tab-drugs">
    <div class="section-head">
      <div class="section-title">FDA Drug Enforcement Recalls</div>
      <div class="section-meta">openFDA /drug/enforcement.json — Updated Weekly</div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-bottom:1.25rem;line-height:1.7;">Drug recalls occur when medications are defective, contaminated, mislabeled, or more dangerous than disclosed. If you were prescribed a recalled drug and suffered harm, Counsel Hound's attorneys can review your case at no charge.</p>
    <div class="search-row">
      <input class="ch-search" type="text" id="drugSearch" placeholder="Search by drug name, manufacturer, or recall reason…" oninput="filterDrugs()">
      <select class="filter-sel" id="drugClass" onchange="filterDrugs()">
        <option value="all">All recall classes</option>
        <option value="Class I">Class I — Most Dangerous</option>
        <option value="Class II">Class II</option>
        <option value="Class III">Class III</option>
      </select>
    </div>
    <div id="drugLoader" class="ch-loader"><div class="ch-spin"></div>Fetching drug recalls from FDA openFDA API…</div>
    <div id="drugError" style="display:none;" class="error-box"></div>
    <div id="drugTableWrap" style="display:none;" class="table-wrap">
      <table class="recall-table"><thead><tr>
        <th>Date</th><th>Drug &amp; Manufacturer</th><th>Reason</th><th>Class</th><th>Distribution</th><th>Status</th>
      </tr></thead><tbody id="drugTbody"></tbody></table>
    </div>
    <div id="drugPager" style="margin-top:0.75rem;font-size:12px;color:var(--muted);"></div>
  </div>

  <!-- BLACK BOX WARNINGS TAB -->
  <div class="tab-panel" id="tab-blackbox">
    <div class="section-head">
      <div class="section-title">⬛ FDA Black Box Warnings</div>
      <div class="section-meta">FDA Drug Safety Communications 2020–2025</div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-bottom:1.25rem;line-height:1.7;">A <strong>Black Box Warning</strong> is the FDA's most serious safety alert — placed on drug labels when evidence shows a risk of serious injury, permanent disability, or death. Over 400 prescription drugs currently carry these warnings. If you suffered a serious adverse event from any of these drugs, Counsel Hound can review your case for free.</p>
    <div class="search-row">
      <input class="ch-search" type="text" id="bbwSearch" placeholder="Search by drug name, condition, or risk type…" oninput="filterBBW()">
      <select class="filter-sel" id="bbwCat" onchange="filterBBW()">
        <option value="all">All drug categories</option>
        <option value="Oncology">Oncology</option>
        <option value="Psychiatry">Psychiatry / Mental Health</option>
        <option value="Cardiovascular">Cardiovascular</option>
        <option value="Pain">Pain / Opioids</option>
        <option value="Endocrinology">Endocrinology / Diabetes</option>
        <option value="Reproductive">Reproductive / OB-GYN</option>
        <option value="Neurology">Neurology</option>
        <option value="Infectious Disease">Infectious Disease</option>
        <option value="Rheumatology">Rheumatology / Immunology</option>
      </select>
    </div>
    <div class="bbw-grid" id="bbwGrid"></div>
    <p style="margin-top:1.5rem;font-size:12px;color:var(--muted);">Full FDA database: <a class="ext-link" href="https://www.accessdata.fda.gov/scripts/cder/safetylabelingchanges/index.cfm" target="_blank" rel="noopener">FDA Safety Labeling Changes →</a></p>
  </div>

  <!-- HIGH-RISK DEVICES TAB -->
  <div class="tab-panel" id="tab-knowndevices">
    <div class="section-head">
      <div class="section-title">High-Risk Medical Devices — Research Database</div>
      <div class="section-meta">FDA / GAO / MedTech Dive — 2023–2026</div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-bottom:1.5rem;line-height:1.7;">These are some of the most significant medical device safety issues documented in recent years. If you have been treated with any of these devices and experienced complications, Counsel Hound's medical injury attorneys can evaluate whether you have a claim — at no cost to you.</p>
    <div class="device-grid" id="deviceGrid"></div>
  </div>

  <!-- REPORT & GET HELP TAB -->
  <div class="tab-panel" id="tab-report">
    <div class="section-head">
      <div class="section-title">Report a Medical Device or Drug Problem</div>
      <div class="section-meta">Government Channels + Free Legal Help from Counsel Hound</div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-bottom:1.5rem;line-height:1.7;">Your report to the FDA can trigger the investigation that protects the next patient. And if you have been harmed, speaking with a Counsel Hound attorney — at no cost — is the first step toward the compensation you deserve.</p>
    <div class="report-grid">
      <div class="report-card">
        <div class="rc-agency">FDA MedWatch — Report an Adverse Event</div>
        <div class="rc-desc">Report serious adverse events from drugs, medical devices, biologics, or dietary supplements directly to the FDA. The agency uses these reports to detect safety patterns and issue alerts. Your identity can remain confidential.</div>
        <div class="rc-phone">Hotline: 1-800-332-1088</div>
        <a class="rc-btn" href="https://www.accessdata.fda.gov/scripts/medwatch/index.cfm?action=consumer.reporting1" target="_blank" rel="noopener">File a MedWatch Report →</a>
      </div>
      <div class="report-card">
        <div class="rc-agency">FDA Device Recall Database</div>
        <div class="rc-desc">Search the complete FDA medical device recall database by device type, company name, or date. Updated weekly with new enforcement actions and classification decisions. Free public access.</div>
        <div class="rc-phone">accessdata.fda.gov</div>
        <a class="rc-btn" href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm" target="_blank" rel="noopener">Search Device Recalls →</a>
      </div>
      <div class="report-card">
        <div class="rc-agency">FDA Drug Safety Communications</div>
        <div class="rc-desc">View all current drug safety alerts, black box warning updates, and drug recall enforcement actions. Covers all prescription drugs, OTC products, and biologics regulated by the FDA.</div>
        <div class="rc-phone">fda.gov/drugs</div>
        <a class="rc-btn" href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-alerts-and-statements" target="_blank" rel="noopener">View Drug Safety Alerts →</a>
      </div>
      <div class="report-card">
        <div class="rc-agency">Subscribe to FDA MedWatch Alerts</div>
        <div class="rc-desc">Sign up to receive FDA safety alerts by email the moment they are published — used by over 130,000 healthcare professionals and patients. Never miss a warning that could affect your treatment.</div>
        <div class="rc-phone">fda.gov/safety/medwatch</div>
        <a class="rc-btn" href="https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program/subscribe-medwatch-safety-alerts" target="_blank" rel="noopener">Subscribe to FDA Alerts →</a>
      </div>
      <div class="report-card" style="border-left-color:var(--navy);background:var(--navy);">
        <div class="rc-agency" style="color:var(--gold);">Counsel Hound — Free Medical Injury Case Review</div>
        <div class="rc-desc" style="color:rgba(255,255,255,0.65);">Harmed by a recalled device, a drug with a black box warning, or a product the manufacturer knew was dangerous? Counsel Hound's network of medical injury attorneys can review your case — for free — and pursue maximum compensation. No fees unless we win.</div>
        <div class="rc-phone" style="color:var(--gold2);">📞 1-855-804-6863</div>
        <a class="rc-btn" style="background:var(--gold);color:var(--navy);" href="https://counselhound.lawbrokr.com/" target="_blank" rel="noopener">Get Free Case Review →</a>
      </div>
      <div class="report-card">
        <div class="rc-agency">openFDA Adverse Events (FAERS)</div>
        <div class="rc-desc">Search millions of adverse event reports submitted by patients and healthcare professionals in the FDA's FAERS database — going back decades. Research whether others have reported the same problem with your drug or device.</div>
        <div class="rc-phone">open.fda.gov</div>
        <a class="rc-btn" href="https://open.fda.gov/apis/drug/event/" target="_blank" rel="noopener">Search FAERS Database →</a>
      </div>
    </div>
  </div>

</main>

<footer class="ch-footer">
  <div class="footer-inner">
    <div>
      <div class="footer-logo">🐾 Counsel Hound</div>
      <p class="footer-desc">Counsel Hound connects injured victims with experienced medical injury attorneys across all 50 states. Founded by Richard Frankowski, a 35-year legal veteran, to ensure that every American has access to top-tier legal representation.</p>
      <div class="footer-phone">📞 1-855-804-6863</div>
    </div>
    <div class="footer-col">
      <h4>Practice Areas</h4>
      <a href="https://counselhound.com/practice-area/medical-injury/">Medical Injury</a>
      <a href="https://counselhound.com/practice-area/defective-products/">Defective Products</a>
      <a href="https://counselhound.com/practice-area/toxic-torts/">Toxic Torts</a>
      <a href="https://counselhound.com/practice_areas/surgical-staplers/">Surgical Staplers</a>
      <a href="https://counselhound.com/practice_areas/transvaginal-mesh/">Transvaginal Mesh</a>
      <a href="https://counselhound.com/practice_areas/hip-replacement/">Hip Replacements</a>
    </div>
    <div class="footer-col">
      <h4>FDA Resources</h4>
      <a href="https://www.fda.gov/medical-devices/medical-device-safety/medical-device-recalls" target="_blank" rel="noopener">FDA Device Recalls</a>
      <a href="https://www.fda.gov/drugs/drug-safety-and-availability/drug-alerts-and-statements" target="_blank" rel="noopener">Drug Safety Alerts</a>
      <a href="https://open.fda.gov/apis/" target="_blank" rel="noopener">openFDA API</a>
      <a href="https://www.saferproducts.gov/" target="_blank" rel="noopener">SaferProducts.gov</a>
      <a href="https://counselhound.com/contact-us/">Contact Counsel Hound</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <?php echo esc_html( date( 'Y' ) ); ?> Counsel Hound. All Rights Reserved.</span>
    <span>No Fees Unless We Win &middot; Free Case Reviews &middot; All 50 States</span>
  </div>
  <div class="footer-disclaimer">
    <strong>Legal &amp; Medical Disclaimer:</strong> The information on this page is for informational purposes only and does not constitute legal or medical advice. Data is sourced from public FDA databases including the openFDA API, FDA MedWatch, and published government reports. Viewing this page does not create an attorney-client relationship. Results displayed represent past verdicts from the Counsel Hound attorney network and are not a guarantee of future outcomes. If you are experiencing a medical emergency, call 911. If you believe you have been harmed by a medical product, consult with a qualified attorney.
  </div>
</footer>

<?php wp_footer(); ?>

<script>
/* ═══════════════════════════════════════════════════
   COUNSEL HOUND — Medical Safety Dashboard
   Brand name in display text: "Counsel Hound" (two words)
   Domain in URLs: counselhound.com (registered one word)
   ═══════════════════════════════════════════════════ */
const CH_MED_CFG = {
  CACHE_TTL:    24 * 3600 * 1000,
  REFRESH_HOUR: 6,
  FDA_BASE:     'https://api.fda.gov',
  CORS_PROXY:   'https://api.allorigins.win/get?url=',
  MEDWATCH_RSS: 'https://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/MedWatch/rss.xml',
  CACHE_DEV:    'ch_med_dev_v2',    CACHE_DEV_TS:  'ch_med_dev_ts_v2',
  CACHE_DRUG:   'ch_med_drug_v2',   CACHE_DRUG_TS: 'ch_med_drug_ts_v2',
  PAGE_SIZE:    40,
};

const BBW_DATA = [
  {drug:'Ozempic / Wegovy',generic:'semaglutide',cat:'Endocrinology',year:'2023',risk:'Thyroid C-cell tumor risk observed in animal studies — potential thyroid cancer risk in humans cannot be excluded. Contraindicated in patients with personal or family history of medullary thyroid carcinoma or MEN 2.'},
  {drug:'Ocaliva',generic:'obeticholic acid',cat:'Oncology',year:'2024',risk:'Linked to a 377% higher risk of liver transplant or death in primary biliary cholangitis patients. 19 fatalities and 11 severe liver injuries reported within 18 months of approval. Strengthened December 2024.'},
  {drug:'Oxbryta',generic:'voxelotor',cat:'Oncology',year:'2024',risk:'Pfizer recalled this sickle cell disease drug globally in September 2024 after patients showed increased vaso-occlusive crises and worse outcomes than placebo in clinical trials.'},
  {drug:'Depo-Provera',generic:'medroxyprogesterone acetate',cat:'Reproductive',year:'2024',risk:'Long-term use linked to a 5.6× increased risk of intracranial meningiomas (brain tumors). Risk persists with use longer than one year. FDA required new boxed warning in March 2024.'},
  {drug:'Prolia / Xgeva',generic:'denosumab',cat:'Endocrinology',year:'2024',risk:'Severe life-threatening hypocalcemia in patients with advanced chronic kidney disease (CKD stages 4-5). FDA added boxed warning January 2024 and advises against use in this patient population.'},
  {drug:'Veozah',generic:'fezolinetant',cat:'Endocrinology',year:'2024',risk:'Rare but serious liver injury reported post-approval. FDA requires liver function monitoring at baseline and at 3, 6, and 9 months. Warning added September 2024.'},
  {drug:'Antidepressants (SSRIs/SNRIs)',generic:'fluoxetine, sertraline, escitalopram, venlafaxine, others',cat:'Psychiatry',year:'2004+',risk:'Increased risk of suicidal thinking and behavior in children, adolescents, and young adults under 25 during the initial weeks of treatment. All antidepressants carry this class-wide warning since 2004.'},
  {drug:'Benzodiazepines',generic:'diazepam, alprazolam, lorazepam, clonazepam, others',cat:'Psychiatry',year:'2020',risk:'Serious risks of abuse, addiction, physical dependence, and life-threatening withdrawal reactions including seizures. Concurrent use with opioids dramatically increases risk of overdose death. Class-wide 2020.'},
  {drug:'Atypical Antipsychotics',generic:'quetiapine, risperidone, olanzapine, aripiprazole, others',cat:'Psychiatry',year:'2005',risk:'Increased mortality in elderly patients with dementia-related psychosis — not approved for this use. Deaths primarily cardiovascular or infectious. Class-wide warning since 2005.'},
  {drug:'Warfarin (Coumadin)',generic:'warfarin sodium',cat:'Cardiovascular',year:'2006',risk:'Potentially fatal bleeding episodes including intracranial, spinal, and retroperitoneal hemorrhage. Narrow therapeutic index requires regular INR monitoring. Significant drug and food interactions.'},
  {drug:'Avandia',generic:'rosiglitazone',cat:'Cardiovascular',year:'2007',risk:'Increased risk of myocardial infarction and cardiovascular death. Caused 70% reduction in prescribing after warning. Now available only through a restricted prescribing program.'},
  {drug:'Opioid Analgesics (all)',generic:'oxycodone, hydrocodone, morphine, fentanyl, codeine, tramadol',cat:'Pain',year:'2016+',risk:'Addiction, abuse, misuse leading to overdose and death. Life-threatening respiratory depression. Neonatal opioid withdrawal syndrome. Fatal interaction with CNS depressants. Class-wide, updated 2016 and 2022.'},
  {drug:'Tysabri',generic:'natalizumab',cat:'Neurology',year:'2006',risk:'Progressive multifocal leukoencephalopathy (PML) — a rare, often fatal or severely disabling brain infection caused by JC virus reactivation. Risk increases with anti-JCV antibody positivity and treatment duration.'},
  {drug:'Fluoroquinolone Antibiotics',generic:'ciprofloxacin, levofloxacin, moxifloxacin, others',cat:'Infectious Disease',year:'2008+',risk:'Tendinitis and tendon rupture. Irreversible peripheral neuropathy. Serious CNS effects. Aortic aneurysm or dissection risk. FDA recommends reserving these drugs for infections with no alternative treatment options.'},
  {drug:'Isotretinoin (Accutane)',generic:'isotretinoin',cat:'Reproductive',year:'ongoing',risk:'Extremely high risk of severe fetal malformations — cannot be used during pregnancy under any circumstances. Psychiatric adverse events including depression and suicidal ideation. iPLEDGE REMS program required.'},
  {drug:'TNF Blockers',generic:'adalimumab (Humira), etanercept (Enbrel), infliximab (Remicade)',cat:'Rheumatology',year:'2008',risk:'Serious and life-threatening infections — including tuberculosis, bacterial sepsis, and invasive fungal infections. Malignancy risk including lymphoma. Mandatory TB screening required before initiating therapy.'},
  {drug:'NSAIDs (non-aspirin)',generic:'ibuprofen, naproxen, celecoxib (Celebrex), others',cat:'Pain',year:'2005+',risk:'Increased risk of serious cardiovascular events including heart attack and stroke — potentially fatal. Risk increases with duration of use. GI bleeding, ulceration, and perforation also carry a boxed warning.'},
  {drug:'Methadone',generic:'methadone HCl',cat:'Pain',year:'ongoing',risk:'QT prolongation and potentially fatal cardiac arrhythmias including torsades de pointes. Deaths reported during induction and dose conversion. Requires baseline ECG and ongoing cardiac monitoring.'},
  {drug:'Valproate (Depakote)',generic:'valproic acid / sodium valproate',cat:'Neurology',year:'ongoing',risk:'Major fetal harm — neural tube defects (spina bifida), cognitive deficits, reduced IQ in children exposed in utero. Contraindicated in pregnancy for migraine prophylaxis. REMS program required.'},
  {drug:'Checkpoint Inhibitors',generic:'pembrolizumab (Keytruda), nivolumab (Opdivo), others',cat:'Oncology',year:'ongoing',risk:'Immune-mediated adverse reactions that can be severe and life-threatening — including pneumonitis, colitis, hepatitis, endocrinopathies, nephritis, and myocarditis. Can be fatal if not identified and treated promptly.'},
];

const DEVICES_DB = [
  {name:'Abiomed Impella Left-Sided Blood Pumps',hazard:'Catheter pierces the left ventricle wall — at least 129 serious injuries and 49 deaths reported. FDA issued Class I recall in March 2024. If you received an Impella device and experienced heart complications, Counsel Hound wants to hear from you.',cls:'critical',pop:'Cardiac patients',status:'Class I Recall 2024'},
  {name:'Philips CPAP, BiPAP & Ventilator Devices (15M+ units)',hazard:"Polyurethane foam degrades releasing potentially toxic and carcinogenic particles into the patient's breathing path. One of the largest device recalls in history — ongoing since 2021. Philips settled with the FDA and DOJ in 2024.",cls:'critical',pop:'Sleep apnea & respiratory patients',status:'Ongoing recall / settlement 2024'},
  {name:'Medtronic Pipeline Vantage Embolization Device (027 model)',hazard:'Fails to attach to blood vessel wall in brain aneurysm procedures — 13 injuries and 4 deaths. Pulled from market by Medtronic in March 2025.',cls:'critical',pop:'Neurovascular surgery patients',status:'Off market — March 2025'},
  {name:'Rotarex Atherectomy Catheter System (Bard/BD)',hazard:'Helix component may fracture during use — 30 serious injuries, 4 deaths, and 115 procedures requiring additional intervention as of March 2025.',cls:'critical',pop:'Peripheral vascular surgery patients',status:'Class I — investigation ongoing'},
  {name:'Smiths Medical Endotracheal Tubes',hazard:'Diameter too small — patients may receive insufficient ventilation, leading to organ failure, heart attack, or death. 8 injuries reported.',cls:'critical',pop:'Ventilated hospital patients',status:'Class I Recall — March 2025'},
  {name:'Transvaginal Mesh',hazard:'Erosion through pelvic tissue, chronic pain, infection, and organ perforation. FDA reclassified transvaginal mesh as Class III in 2016 and required it be taken off the market. Mass tort litigation ongoing.',cls:'critical',pop:'Women with pelvic organ prolapse',status:'Transvaginal mesh off market'},
  {name:'Metal-on-Metal Hip Implants (DePuy ASR, others)',hazard:'Cobalt and chromium debris released into surrounding tissue causes metallosis, tissue necrosis, and systemic toxicity. Mass tort litigation has resulted in billions in settlements.',cls:'critical',pop:'Hip replacement patients',status:'Recalls & post-market studies'},
  {name:'Surgical Mesh (Hernia)',hazard:'Complications including chronic pain, infection, adhesion, and organ perforation. Bard, Atrium, and Ethicon brands among those facing ongoing litigation. FDA has issued multiple safety communications.',cls:'amber',pop:'Hernia repair patients',status:'Ongoing safety review'},
  {name:'Hologic BioZorb Implants',hazard:'188 adverse event reports in breast cancer surgery patients — pain, migration, and other complications. Hologic recalled the product in October 2024.',cls:'amber',pop:'Breast cancer surgery patients',status:'Recalled October 2024'},
  {name:'Fresenius Infusion Pumps',hazard:'Software issues identified as a potential high-risk recall — first product to receive an FDA Early Alert under the new communications pilot program in November 2024.',cls:'amber',pop:'Hospital patients on IV therapy',status:'Early Alert — November 2024'},
  {name:'Insulin Pumps — Cybersecurity Vulnerabilities',hazard:"Multiple Medtronic MiniMed pump models recalled for cybersecurity vulnerabilities that could allow unauthorized remote access to insulin dose delivery — a potentially fatal risk for patients.",cls:'critical',pop:'Insulin-dependent diabetes patients',status:'Ongoing recalls by model number'},
  {name:'Pacemakers / Implantable Defibrillators (Various)',hazard:"Battery depletion, lead fracture, programming errors, and magnetic interference issues documented in the FDA's MAUDE adverse event database. Thousands of adverse events reported annually.",cls:'amber',pop:'Cardiac rhythm disorder patients',status:'Ongoing MAUDE monitoring'},
  {name:'Adult Portable Bed Rails (Medical Grade)',hazard:'Entrapment between rail and mattress linked to asphyxiation deaths — 18 confirmed deaths across multiple brands. 3 million units covered by CPSC/FDA recalls and warnings.',cls:'critical',pop:'Elderly and assisted living patients',status:'Multiple active recalls — stop use'},
  {name:'Baxter Healthcare Solution Sets',hazard:'Improperly assembled IV solution sets — medication may not be delivered correctly, or patients may lose blood through faulty IV connections.',cls:'amber',pop:'Hospital inpatients on IV therapy',status:'Class II Recall — late 2024'},
];

let devData=[], devFiltered=[];
let drugData=[], drugFiltered=[];
let devPage=0, drugPage=0;

const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmtDate = d => { try { return new Date(String(d).replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3')).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); } catch(e) { return String(d); }};
const fmtTime = d => new Date(d).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});

function cacheGet(k,ts){try{const t=parseInt(localStorage.getItem(ts)||'0',10);const d=localStorage.getItem(k);if(!d||!t||Date.now()-t>CH_MED_CFG.CACHE_TTL)return null;return{data:JSON.parse(d),age:Date.now()-t};}catch(e){return null;}}
function cacheSet(k,ts,data){try{localStorage.setItem(k,JSON.stringify(data));localStorage.setItem(ts,String(Date.now()));}catch(e){}}
function tick(){document.getElementById('upTime').textContent=fmtTime(new Date());}
function setCacheUI(fresh,msg){const dot=document.getElementById('cacheDot');dot.className='cdot '+(fresh?'fresh':'stale');document.getElementById('cacheStatus').textContent=msg;}

window.chTab = function(id,btn){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  btn.classList.add('active');
};

function classPill(c){
  if(!c)return'<span class="pill pill-navy">—</span>';
  if(c==='Class I')return'<span class="pill pill-red">CLASS I ▲</span>';
  if(c==='Class II')return'<span class="pill pill-amber">CLASS II</span>';
  if(c==='Class III')return'<span class="pill pill-teal">CLASS III</span>';
  return`<span class="pill pill-navy">${esc(c)}</span>`;
}

function renderDevTable(data,page){
  const start=page*CH_MED_CFG.PAGE_SIZE, slice=data.slice(start,start+CH_MED_CFG.PAGE_SIZE);
  const tbody=document.getElementById('devTbody');
  if(!slice.length){tbody.innerHTML='<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted);">No records match your filters.</td></tr>';return;}
  tbody.innerHTML=slice.map(r=>{
    const fdaUrl=r.event_id?`https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm?id=${r.event_id}`:'';
    return`<tr>
      <td style="white-space:nowrap;font-size:11px;color:var(--muted);">${fmtDate(r.recall_initiation_date||'')}</td>
      <td><div class="prod-name">${esc((r.product_description||'').substring(0,80))}</div><div class="prod-firm">${esc(r.recalling_firm||'')}</div></td>
      <td><div class="prod-desc">${esc((r.reason_for_recall||'').substring(0,140))}…</div></td>
      <td>${classPill(r.classification)}</td>
      <td style="font-size:11px;color:var(--muted);">${esc(r.status||'—')}</td>
      <td>${fdaUrl?`<a class="ext-link" href="${esc(fdaUrl)}" target="_blank" rel="noopener">FDA →</a>`:`<a class="ext-link" href="https://counselhound.lawbrokr.com/" target="_blank" rel="noopener">Get Help →</a>`}</td>
    </tr>`;
  }).join('');
  const total=data.length,pages=Math.ceil(total/CH_MED_CFG.PAGE_SIZE);
  document.getElementById('devPager').innerHTML=pages>1?`Showing ${start+1}–${Math.min(start+CH_MED_CFG.PAGE_SIZE,total)} of ${total} &nbsp;
    <button onclick="goDevPage(${page-1})" ${page===0?'disabled':''} style="cursor:pointer;border:1px solid rgba(0,0,0,0.2);background:none;padding:2px 10px;border-radius:3px;font-size:11px;">← Prev</button>
    <button onclick="goDevPage(${page+1})" ${page>=pages-1?'disabled':''} style="cursor:pointer;border:1px solid rgba(0,0,0,0.2);background:none;padding:2px 10px;border-radius:3px;font-size:11px;">Next →</button>`:`${total} records from openFDA`;
}
window.goDevPage=p=>{devPage=Math.max(0,p);renderDevTable(devFiltered,devPage);};

function renderDrugTable(data,page){
  const start=page*CH_MED_CFG.PAGE_SIZE,slice=data.slice(start,start+CH_MED_CFG.PAGE_SIZE);
  const tbody=document.getElementById('drugTbody');
  if(!slice.length){tbody.innerHTML='<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted);">No records match your filters.</td></tr>';return;}
  tbody.innerHTML=slice.map(r=>`<tr>
    <td style="white-space:nowrap;font-size:11px;color:var(--muted);">${fmtDate(r.recall_initiation_date||'')}</td>
    <td><div class="prod-name">${esc((r.product_description||'').substring(0,80))}</div><div class="prod-firm">${esc(r.recalling_firm||'')}</div></td>
    <td><div class="prod-desc">${esc((r.reason_for_recall||'').substring(0,140))}…</div></td>
    <td>${classPill(r.classification)}</td>
    <td style="font-size:11px;color:var(--muted);">${esc((r.distribution_pattern||'').substring(0,60))}…</td>
    <td style="font-size:11px;color:var(--muted);">${esc(r.status||'—')}</td>
  </tr>`).join('');
  const total=data.length,pages=Math.ceil(total/CH_MED_CFG.PAGE_SIZE);
  document.getElementById('drugPager').innerHTML=pages>1?`Showing ${start+1}–${Math.min(start+CH_MED_CFG.PAGE_SIZE,total)} of ${total} &nbsp;
    <button onclick="goDrugPage(${page-1})" ${page===0?'disabled':''} style="cursor:pointer;border:1px solid rgba(0,0,0,0.2);background:none;padding:2px 10px;border-radius:3px;font-size:11px;">← Prev</button>
    <button onclick="goDrugPage(${page+1})" ${page>=pages-1?'disabled':''} style="cursor:pointer;border:1px solid rgba(0,0,0,0.2);background:none;padding:2px 10px;border-radius:3px;font-size:11px;">Next →</button>`:`${total} records from openFDA`;
}
window.goDrugPage=p=>{drugPage=Math.max(0,p);renderDrugTable(drugFiltered,drugPage);};

window.filterDevices=function(){
  const q=document.getElementById('devSearch').value.toLowerCase();
  const cls=document.getElementById('devClass').value;
  devFiltered=devData.filter(r=>{
    const txt=((r.product_description||'')+(r.recalling_firm||'')+(r.reason_for_recall||'')).toLowerCase();
    return(!q||txt.includes(q))&&(cls==='all'||r.classification===cls);
  });
  devPage=0;renderDevTable(devFiltered,0);
};
window.filterDrugs=function(){
  const q=document.getElementById('drugSearch').value.toLowerCase();
  const cls=document.getElementById('drugClass').value;
  drugFiltered=drugData.filter(r=>{
    const txt=((r.product_description||'')+(r.recalling_firm||'')+(r.reason_for_recall||'')).toLowerCase();
    return(!q||txt.includes(q))&&(cls==='all'||r.classification===cls);
  });
  drugPage=0;renderDrugTable(drugFiltered,0);
};

function renderBBW(data){
  document.getElementById('bbwGrid').innerHTML=data.map(w=>{
    const pillCls=w.cat==='Oncology'||w.cat==='Pain'?'pill-red':w.cat==='Psychiatry'||w.cat==='Cardiovascular'?'pill-amber':'pill-teal';
    return`<div class="bbw-card">
      <div class="bbw-header">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
          <div><div class="bbw-drug">${esc(w.drug)}</div><div class="bbw-generic">${esc(w.generic)}</div></div>
          <span class="pill ${pillCls}" style="flex-shrink:0;">${esc(w.cat)}</span>
        </div>
      </div>
      <div class="bbw-body">
        <p class="bbw-text">${esc(w.risk)}</p>
        <div class="bbw-meta"><span class="bbw-tag">Warning: ${esc(w.year)}</span><span class="bbw-tag">Source: FDA</span></div>
        <a class="bbw-cta" href="https://counselhound.lawbrokr.com/" target="_blank" rel="noopener">Harmed by This Drug? Get a Free Counsel Hound Case Review →</a>
      </div>
    </div>`;
  }).join('');
}

window.filterBBW=function(){
  const q=document.getElementById('bbwSearch').value.toLowerCase();
  const cat=document.getElementById('bbwCat').value;
  renderBBW(BBW_DATA.filter(w=>{
    const txt=(w.drug+' '+w.generic+' '+w.risk+' '+w.cat).toLowerCase();
    return(!q||txt.includes(q))&&(cat==='all'||w.cat===cat);
  }));
};

function renderDeviceCards(){
  document.getElementById('deviceGrid').innerHTML=DEVICES_DB.map(d=>{
    const cardCls=d.cls==='critical'?'critical':d.cls==='amber'?'amber-card':'';
    const pillCls=d.cls==='critical'?'pill-red':d.cls==='amber'?'pill-amber':'pill-teal';
    const pillLbl=d.cls==='critical'?'CLASS I RISK':d.cls==='amber'?'CLASS II':'MONITOR';
    return`<div class="device-card ${cardCls}">
      <div class="device-name">${esc(d.name)}</div>
      <p class="device-hazard">⚠ ${esc(d.hazard)}</p>
      <div class="device-footer">
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          <span class="pill ${pillCls}">${pillLbl}</span>
          <span class="pill pill-navy">${esc(d.pop)}</span>
        </div>
        <a class="device-action" href="https://counselhound.lawbrokr.com/" target="_blank" rel="noopener">Get Counsel Hound Legal Help →</a>
      </div>
    </div>`;
  }).join('');
}

async function fetchFDA(endpoint){
  try{
    const r=await fetch(`${CH_MED_CFG.FDA_BASE}${endpoint}`,{signal:AbortSignal.timeout(15000)});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const j=await r.json();
    return j.results||[];
  }catch(e){return[];}
}

async function fetchMedWatch(){
  try{
    const proxy=CH_MED_CFG.CORS_PROXY+encodeURIComponent(CH_MED_CFG.MEDWATCH_RSS);
    const r=await fetch(proxy,{signal:AbortSignal.timeout(10000)});
    const j=await r.json();
    if(!j.contents)return;
    const doc=new DOMParser().parseFromString(j.contents,'text/xml');
    const items=Array.from(doc.querySelectorAll('item')).slice(0,20);
    const ticker=items.map(i=>`<span class="ticker-item">⚕ ${esc(i.querySelector('title')?.textContent||'')}</span><span class="ticker-sep"> | </span>`).join('');
    if(ticker){const t=document.getElementById('tickerTrack');t.innerHTML=ticker+ticker;}
  }catch(e){}
}

async function fetchAdverseCount(){
  try{
    const r=await fetch(`${CH_MED_CFG.FDA_BASE}/drug/event.json?limit=1`,{signal:AbortSignal.timeout(8000)});
    const j=await r.json();
    const total=j.meta?.results?.total;
    if(total)document.getElementById('hstat-adverse').textContent=Number(total).toLocaleString();
  }catch(e){}
}

async function chMedInit(){
  tick();setInterval(tick,30000);
  renderBBW(BBW_DATA);
  renderDeviceCards();

  const dc=cacheGet(CH_MED_CFG.CACHE_DEV,CH_MED_CFG.CACHE_DEV_TS);
  if(dc){
    devData=dc.data;devFiltered=[...devData];
    document.getElementById('devLoader').style.display='none';
    document.getElementById('devTableWrap').style.display='block';
    renderDevTable(devFiltered,0);
    document.getElementById('upDevCount').textContent=devData.length+' records';
    document.getElementById('hstat-class1').textContent=devData.filter(d=>d.classification==='Class I').length+' Class I';
    setCacheUI(true,`Device data cached (${Math.floor(dc.age/3600000)}h ago). Next fetch at ${CH_MED_CFG.REFRESH_HOUR}:00 AM.`);
  } else {
    setCacheUI(false,'Fetching device recalls from FDA openFDA…');
    devData=await fetchFDA('/device/enforcement.json?search=classification:%22Class+I%22&sort=recall_initiation_date:desc&limit=100');
    if(!devData.length)devData=await fetchFDA('/device/enforcement.json?sort=recall_initiation_date:desc&limit=100');
    devFiltered=[...devData];
    document.getElementById('devLoader').style.display='none';
    if(devData.length){
      cacheSet(CH_MED_CFG.CACHE_DEV,CH_MED_CFG.CACHE_DEV_TS,devData);
      setCacheUI(true,'Live device data fetched from openFDA.');
      document.getElementById('devTableWrap').style.display='block';
      renderDevTable(devFiltered,0);
      document.getElementById('upDevCount').textContent=devData.length+' records';
      document.getElementById('hstat-class1').textContent=devData.filter(d=>d.classification==='Class I').length+' Class I';
    } else {
      document.getElementById('devError').style.display='block';
      document.getElementById('devError').textContent='Live device recall data temporarily unavailable from openFDA API. Visit fda.gov/medical-devices for the latest recall information, or contact Counsel Hound for free legal help researching your specific device.';
    }
  }

  const druc=cacheGet(CH_MED_CFG.CACHE_DRUG,CH_MED_CFG.CACHE_DRUG_TS);
  if(druc){
    drugData=druc.data;drugFiltered=[...drugData];
    document.getElementById('drugLoader').style.display='none';
    document.getElementById('drugTableWrap').style.display='block';
    renderDrugTable(drugFiltered,0);
    document.getElementById('upDrugCount').textContent=drugData.length+' records';
  } else {
    drugData=await fetchFDA('/drug/enforcement.json?search=classification:%22Class+I%22&sort=recall_initiation_date:desc&limit=100');
    if(!drugData.length)drugData=await fetchFDA('/drug/enforcement.json?sort=recall_initiation_date:desc&limit=100');
    drugFiltered=[...drugData];
    document.getElementById('drugLoader').style.display='none';
    if(drugData.length){
      cacheSet(CH_MED_CFG.CACHE_DRUG,CH_MED_CFG.CACHE_DRUG_TS,drugData);
      document.getElementById('drugTableWrap').style.display='block';
      renderDrugTable(drugFiltered,0);
      document.getElementById('upDrugCount').textContent=drugData.length+' records';
    } else {
      document.getElementById('drugError').style.display='block';
      document.getElementById('drugError').textContent='Drug recall data temporarily unavailable from openFDA. Visit fda.gov/drugs directly, or contact Counsel Hound — our attorneys can research your specific medication for you.';
    }
  }

  fetchAdverseCount();
  fetchMedWatch();
}

setInterval(()=>{
  const now=new Date();
  if(now.getHours()===CH_MED_CFG.REFRESH_HOUR&&now.getMinutes()===0){
    [CH_MED_CFG.CACHE_DEV,CH_MED_CFG.CACHE_DEV_TS,CH_MED_CFG.CACHE_DRUG,CH_MED_CFG.CACHE_DRUG_TS].forEach(k=>localStorage.removeItem(k));
    chMedInit();
  }
},60000);

chMedInit();
</script>

</body>
</html>
