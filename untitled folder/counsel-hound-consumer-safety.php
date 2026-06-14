<?php
/*
 * Template Name: Counsel Hound Consumer Safety
 * Template Post Type: page
 * Description: Counsel Hound — Dangerous & Defective Consumer Products Dashboard
 *              with live CPSC recall feed, daily auto-refresh, and legal CTAs.
 *
 * INSTALLATION:
 *   1. Upload this file to /wp-content/themes/YOUR-THEME-NAME/
 *   2. In WordPress Admin → Pages → Add New
 *   3. Set the page title to: Counsel Hound Consumer Safety
 *   4. Set the slug to: counsel-hound-consumer-safety
 *   5. Under Page Attributes → Template, select "Counsel Hound Consumer Safety"
 *   6. Publish the page
 *   7. Page will be live at: counselhound.com/counsel-hound-consumer-safety/
 *
 * SPELLING NOTE: "Counsel Hound" is always two words in all display text.
 *   URLs use the registered domain: counselhound.com (one word, as registered).
 */

// Prevent direct file access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Remove default WordPress theme styles that may conflict
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dangerous &amp; Defective Products | Counsel Hound</title>
<meta name="description" content="Counsel Hound tracks recalled and dangerous consumer products daily. Live CPSC recall data, injury statistics, and free legal help for victims of defective products.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="<?php echo esc_url( get_permalink() ); ?>">

<!-- Open Graph for social sharing -->
<meta property="og:title" content="Dangerous &amp; Defective Products | Counsel Hound">
<meta property="og:description" content="Counsel Hound tracks recalled and dangerous consumer products daily. Free legal help for injury victims.">
<meta property="og:url" content="<?php echo esc_url( get_permalink() ); ?>">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Counsel Hound">

<?php wp_head(); ?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
/* ═══════════════════════════════════════════════
   COUNSEL HOUND — Consumer Safety Page Styles
   Two-word brand name: "Counsel Hound"
   Domain (one word, as registered): counselhound.com
   ═══════════════════════════════════════════════ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --navy:    #0d1b2a;
  --navy2:   #162336;
  --navy3:   #1e3050;
  --gold:    #c9a84c;
  --gold2:   #e8c97a;
  --red:     #c0392b;
  --red-bg:  rgba(192,57,43,0.1);
  --amber:   #d4890a;
  --amber-bg:rgba(212,137,10,0.1);
  --teal:    #1a7a6e;
  --teal-bg: rgba(26,122,110,0.1);
  --white:   #ffffff;
  --off:     #f5f3ef;
  --text:    #1a1a2e;
  --muted:   #5a6478;
  --border:  rgba(201,168,76,0.2);
  --border2: rgba(201,168,76,0.4);
  --font-serif:'Playfair Display',Georgia,serif;
  --font-sans: 'Inter',sans-serif;
}
html{scroll-behavior:smooth;}
body{background:var(--off);color:var(--text);font-family:var(--font-sans);font-size:15px;line-height:1.6;margin:0;padding:0;}
/* Hide default WordPress/WPBakery page elements that conflict */
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
.ticker-label{background:var(--gold);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:0.1em;padding:0 16px;height:38px;display:flex;align-items:center;white-space:nowrap;flex-shrink:0;}
.ticker-track{display:flex;gap:3rem;animation:ch-ticker 32s linear infinite;white-space:nowrap;padding-left:2rem;}
.ticker-track:hover{animation-play-state:paused;}
@keyframes ch-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ticker-item{font-size:12px;color:rgba(255,255,255,0.75);font-weight:500;}
.ticker-sep{color:var(--gold);margin:0 4px;}
.hero{background:var(--navy);background-image:linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%);padding:5rem 2rem 4rem;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
.hero-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr auto;gap:4rem;align-items:center;position:relative;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:1.25rem;}
.hero-eyebrow::before{content:'';display:block;width:28px;height:2px;background:var(--gold);}
.hero-h1{font-family:var(--font-serif);font-size:clamp(34px,5vw,60px);color:var(--white);line-height:1.1;font-weight:900;margin-bottom:1.25rem;}
.hero-h1 em{color:var(--gold);font-style:normal;}
.hero-sub{font-size:16px;color:rgba(255,255,255,0.72);line-height:1.75;max-width:500px;margin-bottom:2rem;}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;}
.btn-primary{background:var(--gold);color:var(--navy);font-weight:700;font-size:14px;padding:14px 30px;border-radius:4px;text-decoration:none;letter-spacing:0.04em;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px;}
.btn-primary:hover{background:var(--gold2);transform:translateY(-1px);}
.btn-outline{background:transparent;color:var(--white);font-weight:600;font-size:14px;padding:13px 28px;border-radius:4px;border:1.5px solid rgba(255,255,255,0.35);text-decoration:none;transition:all 0.2s;}
.btn-outline:hover{border-color:var(--gold);color:var(--gold);}
.hero-badge{background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:8px;padding:1.5rem 2rem;text-align:center;min-width:220px;}
.badge-num{font-family:var(--font-serif);font-size:46px;color:var(--gold);font-weight:900;line-height:1;}
.badge-label{font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;}
.badge-sub{font-size:11px;color:rgba(255,255,255,0.4);margin-top:6px;}
.nofee-strip{background:var(--gold);display:flex;align-items:center;justify-content:center;gap:2rem;padding:1rem 2rem;flex-wrap:wrap;}
.nofee-item{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--navy);letter-spacing:0.04em;}
.ch-page{max-width:1280px;margin:0 auto;padding:3rem 2rem 5rem;}
.stat-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:0;border:1px solid var(--border2);border-radius:6px;overflow:hidden;margin-bottom:3rem;background:var(--navy);}
.stat-cell{padding:1.5rem;border-right:1px solid rgba(201,168,76,0.15);background:var(--navy2);}
.stat-cell:last-child{border-right:none;}
.stat-n{font-family:var(--font-serif);font-size:36px;font-weight:900;color:var(--gold);line-height:1;}
.stat-lbl{font-size:11px;color:rgba(255,255,255,0.55);margin-top:5px;text-transform:uppercase;letter-spacing:0.07em;}
.stat-note{font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;}
.section-head{display:flex;align-items:center;justify-content:space-between;margin:3rem 0 1.25rem;padding-bottom:0.75rem;border-bottom:2px solid var(--gold);}
.section-title{font-family:var(--font-serif);font-size:22px;font-weight:700;color:var(--navy);}
.section-meta{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;}
.search-row{display:flex;gap:10px;margin-bottom:1.25rem;flex-wrap:wrap;}
.ch-search{flex:1;min-width:200px;background:var(--white);border:1.5px solid rgba(0,0,0,0.15);border-radius:4px;color:var(--text);font-family:var(--font-sans);font-size:13px;padding:10px 14px;outline:none;transition:border-color 0.2s;}
.ch-search:focus{border-color:var(--gold);}
.ch-search::placeholder{color:var(--muted);}
.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
.product-card{background:var(--white);border:1px solid rgba(0,0,0,0.1);border-radius:6px;overflow:hidden;transition:box-shadow 0.2s,transform 0.2s;}
.product-card:hover{box-shadow:0 6px 24px rgba(0,0,0,0.1);transform:translateY(-2px);}
.card-stripe{height:4px;background:var(--gold);}
.card-stripe.critical{background:var(--red);}
.card-stripe.high{background:var(--amber);}
.card-stripe.medium{background:var(--teal);}
.card-body{padding:1.25rem;}
.card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px;}
.card-name{font-weight:700;font-size:14px;color:var(--text);line-height:1.4;}
.sev-pill{display:inline-block;padding:3px 10px;border-radius:3px;font-size:10px;font-weight:700;letter-spacing:0.06em;white-space:nowrap;flex-shrink:0;}
.sev-critical{background:var(--red-bg);color:var(--red);border:1px solid rgba(192,57,43,0.3);}
.sev-high{background:var(--amber-bg);color:var(--amber);border:1px solid rgba(212,137,10,0.3);}
.sev-medium{background:var(--teal-bg);color:var(--teal);border:1px solid rgba(26,122,110,0.3);}
.card-hazard{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:12px;}
.card-footer{border-top:1px solid rgba(0,0,0,0.07);padding-top:10px;display:flex;align-items:center;justify-content:space-between;}
.card-source{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;}
.card-action{font-size:12px;font-weight:600;color:var(--gold);text-decoration:none;}
.card-action:hover{color:var(--navy);}
.filter-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.25rem;}
.ftab{background:var(--white);border:1.5px solid rgba(0,0,0,0.15);border-radius:4px;padding:7px 16px;font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;transition:all 0.2s;letter-spacing:0.03em;}
.ftab.active{background:var(--navy);border-color:var(--navy);color:var(--gold);}
.ftab:hover:not(.active){border-color:var(--gold);color:var(--navy);}
.cache-row{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);margin-bottom:1rem;}
.cdot{width:7px;height:7px;border-radius:50%;}
.cdot.fresh{background:#27ae60;}
.cdot.stale{background:var(--amber);}
.report-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
.report-card{background:var(--white);border:1px solid rgba(0,0,0,0.1);border-left:4px solid var(--gold);border-radius:4px;padding:1.5rem;}
.rc-agency{font-family:var(--font-serif);font-size:17px;font-weight:700;color:var(--navy);margin-bottom:8px;}
.rc-desc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:12px;}
.rc-phone{font-size:12px;font-weight:700;color:var(--gold);margin-bottom:12px;}
.rc-btn{display:block;text-align:center;background:var(--navy);color:var(--white);padding:10px;border-radius:4px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.05em;transition:background 0.2s;}
.rc-btn:hover{background:var(--navy3);}
.injury-callout{background:var(--navy);border-radius:6px;padding:2.5rem;text-align:center;margin:3rem 0;}
.ic-sub{font-size:12px;color:var(--gold);letter-spacing:0.12em;text-transform:uppercase;font-weight:700;margin-bottom:0.75rem;}
.ic-h{font-family:var(--font-serif);font-size:28px;color:var(--white);font-weight:900;margin-bottom:1rem;line-height:1.2;}
.ic-p{font-size:14px;color:rgba(255,255,255,0.7);max-width:540px;margin:0 auto 1.5rem;line-height:1.75;}
.ic-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.update-row{display:flex;align-items:center;gap:2rem;background:var(--navy2);border:1px solid var(--border);border-radius:6px;padding:1rem 1.5rem;margin-bottom:2rem;flex-wrap:wrap;}
.ur-item{display:flex;flex-direction:column;gap:2px;}
.ur-label{font-size:9px;color:rgba(255,255,255,0.45);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;}
.ur-val{font-size:14px;font-weight:700;color:var(--white);}
.ur-val.gold{color:var(--gold);}
.live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#27ae60;animation:ch-pulse 2s infinite;margin-right:6px;}
@keyframes ch-pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes ch-spin{to{transform:rotate(360deg)}}
.ch-footer{background:var(--navy);border-top:2px solid var(--gold);}
.footer-inner{max-width:1280px;margin:0 auto;padding:3rem 2rem 2rem;display:grid;grid-template-columns:2fr 1fr 1fr;gap:2.5rem;}
.footer-logo{font-family:var(--font-serif);font-size:20px;color:var(--white);font-weight:700;margin-bottom:0.75rem;}
.footer-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:300px;}
.footer-phone{font-size:15px;font-weight:700;color:var(--gold);margin-top:1rem;}
.footer-col h4{font-size:12px;color:var(--gold);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:0.75rem;}
.footer-col a{display:block;font-size:13px;color:rgba(255,255,255,0.55);text-decoration:none;margin-bottom:5px;transition:color 0.2s;}
.footer-col a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.1);padding:1.25rem 2rem;max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.3);flex-wrap:wrap;gap:0.5rem;}
.footer-disclaimer{font-size:10px;color:rgba(255,255,255,0.25);line-height:1.6;margin-top:1rem;padding:0 2rem 1.5rem;max-width:1280px;margin-left:auto;margin-right:auto;}
@media(max-width:768px){
  .hero-inner{grid-template-columns:1fr;}
  .hero-badge{display:none;}
  .header-inner{padding:0 1rem;}
  .ch-nav{display:none;}
  .ch-page{padding:2rem 1rem 4rem;}
  .footer-inner{grid-template-columns:1fr;}
}
</style>
</head>
<body <?php body_class( 'counsel-hound-consumer-safety' ); ?>>
<?php wp_body_open(); ?>

<!-- ═══════════════════════════════════════════
     COUNSEL HOUND — Consumer Safety Dashboard
     Brand name: Counsel Hound (two words)
     Domain: counselhound.com (registered one word)
     ═══════════════════════════════════════════ -->

<!-- TOP BAR -->
<div class="topbar">⚖️ Injured by a Defective Product? You May Be Entitled to Compensation. <a href="https://counselhound.lawbrokr.com/">Get a FREE Case Evaluation →</a></div>

<!-- COUNSEL HOUND HEADER -->
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
      <a href="https://counselhound.com/practice-area/defective-products/">Defective Products</a>
      <a href="https://counselhound.com/practice-area/personal-injury/">Personal Injury</a>
      <a href="https://counselhound.com/practice-area/medical-injury/">Medical Injury</a>
      <a href="https://counselhound.com/about-us/">About Us</a>
    </nav>
    <div class="header-cta">
      <a class="phone-link" href="tel:+18558046863">📞 1-855-804-6863</a>
      <a class="cta-btn" href="https://counselhound.lawbrokr.com/">Free Consultation</a>
    </div>
  </div>
</header>

<!-- LIVE RECALL TICKER -->
<div class="ticker-wrap" aria-label="Live CPSC recall alert ticker">
  <div class="ticker-label">⚠ LIVE RECALL ALERTS</div>
  <div class="ticker-track" id="tickerTrack">
    <span class="ticker-item">Loading latest recall data from CPSC…</span>
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="hero-eyebrow">Defective Product Injury Attorneys</div>
      <h1 class="hero-h1">Dangerous &amp; Defective<br><em>Products That Have<br>Hurt Americans</em></h1>
      <p class="hero-sub">Every day, millions of unsafe products remain in homes across America. If you or a loved one has been injured by a recalled, defective, or dangerous product, you may be entitled to significant compensation. Counsel Hound connects you with proven trial attorneys — at no cost until we win.</p>
      <div class="hero-actions">
        <a class="btn-primary" href="https://counselhound.lawbrokr.com/">⚖️ Get a Free Case Evaluation</a>
        <a class="btn-outline" href="tel:+18558046863">Call 1-855-804-6863</a>
      </div>
    </div>
    <div class="hero-badge">
      <div class="badge-num">869</div>
      <div class="badge-label">Injuries Linked to Recalled Products</div>
      <div class="badge-sub">2024 — an 8-year high (CPSC/PIRG)</div>
    </div>
  </div>
</section>

<!-- NO-FEE STRIP -->
<div class="nofee-strip">
  <div class="nofee-item"><span>✅</span> No Fees Unless We Win</div>
  <div class="nofee-item"><span>📋</span> Free Case Evaluation</div>
  <div class="nofee-item"><span>⚡</span> Respond Within 1 Business Day</div>
  <div class="nofee-item"><span>🌎</span> Attorneys in All 50 States</div>
</div>

<!-- MAIN PAGE CONTENT -->
<main class="ch-page" id="main-content">

  <!-- STAT STRIP -->
  <div class="stat-strip">
    <div class="stat-cell"><div class="stat-n" id="stat-total">305+</div><div class="stat-lbl">CPSC Recalls — 2024</div><div class="stat-note">↑ Live from CPSC feed</div></div>
    <div class="stat-cell"><div class="stat-n">869</div><div class="stat-lbl">Injuries Linked — 2024</div><div class="stat-note">8-year high (PIRG)</div></div>
    <div class="stat-cell"><div class="stat-n">25</div><div class="stat-lbl">Deaths — 2024</div><div class="stat-note">15 from recalled products</div></div>
    <div class="stat-cell"><div class="stat-n">83M+</div><div class="stat-lbl">Units Recalled</div><div class="stat-note">2024 total</div></div>
    <div class="stat-cell"><div class="stat-n">33%</div><div class="stat-lbl">Sold Online Only</div><div class="stat-note">2× violation rate</div></div>
    <div class="stat-cell"><div class="stat-n" id="stat-class1">…</div><div class="stat-lbl">Live Feed Records</div><div class="stat-note">From CPSC RSS</div></div>
  </div>

  <!-- UPDATE ROW -->
  <div class="update-row">
    <div class="ur-item"><div class="ur-label">Feed Status</div><div class="ur-val gold"><span class="live-dot"></span>Live — Updated Daily</div></div>
    <div class="ur-item"><div class="ur-label">Last Refreshed</div><div class="ur-val" id="upTime">—</div></div>
    <div class="ur-item"><div class="ur-label">Next Auto-Refresh</div><div class="ur-val gold" id="upNext">—</div></div>
    <div class="ur-item"><div class="ur-label">Records Loaded</div><div class="ur-val" id="upCount">—</div></div>
  </div>

  <div class="cache-row"><div class="cdot" id="cacheDot"></div><span id="cacheStatus">Connecting to CPSC data feed…</span></div>

  <!-- INJURY CALLOUT -->
  <div class="injury-callout">
    <div class="ic-sub">Were You or a Loved One Injured?</div>
    <h2 class="ic-h">You Don't Have to Fight Big Companies Alone.</h2>
    <p class="ic-p">Product liability claims against major manufacturers are complex. The right attorney makes all the difference. Counsel Hound has spent 25+ years connecting injured victims with top-tier trial lawyers who have collectively recovered <strong style="color:var(--gold)">millions of dollars</strong> for their clients.</p>
    <div class="ic-actions">
      <a class="btn-primary" href="https://counselhound.lawbrokr.com/">Get Your Free Case Review →</a>
      <a class="btn-outline" href="tel:+18558046863">📞 Call Now: 1-855-804-6863</a>
    </div>
  </div>

  <!-- PRODUCT DATABASE -->
  <div class="section-head">
    <div class="section-title">Recalled &amp; Dangerous Products Database</div>
    <div class="section-meta" id="dbMeta">CPSC + PIRG + CFA — 2024–2026</div>
  </div>

  <div class="filter-tabs">
    <div class="ftab active" onclick="filterCards('all',this)">All Products</div>
    <div class="ftab" onclick="filterCards('children',this)">Children's Products</div>
    <div class="ftab" onclick="filterCards('fire',this)">Fire &amp; Electrical</div>
    <div class="ftab" onclick="filterCards('adult',this)">Home &amp; Adult</div>
    <div class="ftab" onclick="filterCards('vehicle',this)">Vehicles</div>
  </div>

  <div class="search-row">
    <input class="ch-search" type="text" id="prodSearch" placeholder="Search products, brands, or hazard type…" oninput="filterCards(currentCat)">
  </div>

  <div class="product-grid" id="productGrid"></div>

  <!-- LIVE CPSC FEED TABLE -->
  <div class="section-head" style="margin-top:3rem;">
    <div class="section-title">Live CPSC Recall Feed</div>
    <div class="section-meta">SOURCE: CPSC RSS — AUTO-UPDATED DAILY AT 6:00 AM</div>
  </div>

  <div id="cpscLoader" style="display:flex;align-items:center;gap:10px;padding:2rem 0;color:var(--muted);font-size:13px;">
    <div style="width:16px;height:16px;border:2px solid rgba(0,0,0,0.1);border-top-color:var(--gold);border-radius:50%;animation:ch-spin 0.7s linear infinite;flex-shrink:0;"></div>
    Fetching latest recalls from CPSC…
  </div>

  <div id="liveTableWrap" style="display:none;overflow-x:auto;border:1px solid rgba(0,0,0,0.1);border-radius:6px;">
    <table style="width:100%;border-collapse:collapse;background:var(--white);">
      <thead>
        <tr style="background:var(--navy);">
          <th style="padding:0.75rem 1rem;text-align:left;font-size:10px;color:var(--gold);letter-spacing:0.1em;font-weight:700;text-transform:uppercase;">Date</th>
          <th style="padding:0.75rem 1rem;text-align:left;font-size:10px;color:var(--gold);letter-spacing:0.1em;font-weight:700;text-transform:uppercase;">Product &amp; Description</th>
          <th style="padding:0.75rem 1rem;text-align:left;font-size:10px;color:var(--gold);letter-spacing:0.1em;font-weight:700;text-transform:uppercase;">Severity</th>
          <th style="padding:0.75rem 1rem;text-align:left;font-size:10px;color:var(--gold);letter-spacing:0.1em;font-weight:700;text-transform:uppercase;">Details</th>
        </tr>
      </thead>
      <tbody id="liveTableBody"></tbody>
    </table>
  </div>
  <div id="liveError" style="display:none;background:var(--amber-bg);border:1px solid rgba(212,137,10,0.3);border-radius:4px;padding:1rem;font-size:13px;color:var(--amber);margin-top:1rem;"></div>

  <!-- HOW TO REPORT -->
  <div class="section-head" style="margin-top:3rem;">
    <div class="section-title">Report a Dangerous Product</div>
    <div class="section-meta">OFFICIAL GOVERNMENT CHANNELS</div>
  </div>

  <div class="report-grid">
    <div class="report-card">
      <div class="rc-agency">CPSC — SaferProducts.gov</div>
      <div class="rc-desc">Report injuries or dangerous consumer products directly to the U.S. Consumer Product Safety Commission. Your report helps trigger investigations and recalls that protect other families.</div>
      <div class="rc-phone">Hotline: 1-800-638-2772</div>
      <a class="rc-btn" href="https://www.saferproducts.gov/IncidentReporting" target="_blank" rel="noopener">File a Report →</a>
    </div>
    <div class="report-card">
      <div class="rc-agency">NHTSA — Vehicle Safety</div>
      <div class="rc-desc">Report vehicle defects, tire failures, car seat problems, or equipment safety issues. Use the VIN lookup tool to check if your vehicle has an open recall right now.</div>
      <div class="rc-phone">Hotline: 1-888-327-4236</div>
      <a class="rc-btn" href="https://www.nhtsa.gov/report-a-safety-problem" target="_blank" rel="noopener">File a Complaint →</a>
    </div>
    <div class="report-card">
      <div class="rc-agency">FTC — ReportFraud.ftc.gov</div>
      <div class="rc-desc">Report businesses that sold defective products deceptively, used fake safety certifications, or made misleading claims about product safety. Every report counts.</div>
      <div class="rc-phone">ReportFraud.ftc.gov</div>
      <a class="rc-btn" href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener">Report to FTC →</a>
    </div>
    <div class="report-card">
      <div class="rc-agency">Recalls.gov — All Agencies</div>
      <div class="rc-desc">One-stop federal portal to search all active recalls across CPSC, NHTSA, FDA, and USDA. Check any product before you buy — or after you've been injured.</div>
      <div class="rc-phone">Recalls.gov</div>
      <a class="rc-btn" href="https://www.recalls.gov/" target="_blank" rel="noopener">Search All Recalls →</a>
    </div>
    <div class="report-card" style="border-left-color:var(--navy);background:var(--navy);">
      <div class="rc-agency" style="color:var(--gold);">Counsel Hound — Free Legal Help</div>
      <div class="rc-desc" style="color:rgba(255,255,255,0.65);">Injured by a recalled or defective product? Counsel Hound's network of attorneys handles defective product cases on a contingency basis — no fees unless you win.</div>
      <div class="rc-phone" style="color:var(--gold2);">📞 1-855-804-6863</div>
      <a class="rc-btn" style="background:var(--gold);color:var(--navy);" href="https://counselhound.lawbrokr.com/" target="_blank" rel="noopener">Get Free Case Review →</a>
    </div>
    <div class="report-card">
      <div class="rc-agency">Subscribe to CPSC Alerts</div>
      <div class="rc-desc">Never miss a recall that could affect your family. Sign up for weekly CPSC recall email alerts — free, instant, and delivered the moment a new danger is identified.</div>
      <div class="rc-phone">cpsc.gov/Newsroom/Subscribe</div>
      <a class="rc-btn" href="https://www.cpsc.gov/Newsroom/Subscribe" target="_blank" rel="noopener">Subscribe Now →</a>
    </div>
  </div>

</main>

<!-- COUNSEL HOUND FOOTER -->
<footer class="ch-footer">
  <div class="footer-inner">
    <div>
      <div class="footer-logo">🐾 Counsel Hound</div>
      <p class="footer-desc">Counsel Hound connects injured victims with experienced personal injury attorneys across all 50 states. Founded by Richard Frankowski, a 35-year legal veteran dedicated to justice for the injured.</p>
      <div class="footer-phone">📞 1-855-804-6863</div>
    </div>
    <div class="footer-col">
      <h4>Practice Areas</h4>
      <a href="https://counselhound.com/practice-area/defective-products/">Defective Products</a>
      <a href="https://counselhound.com/practice-area/personal-injury/">Personal Injury</a>
      <a href="https://counselhound.com/practice-area/medical-injury/">Medical Injury</a>
      <a href="https://counselhound.com/practice-area/toxic-torts/">Toxic Torts</a>
      <a href="https://counselhound.com/practice-area/consumer-fraud/">Consumer Fraud</a>
    </div>
    <div class="footer-col">
      <h4>Safety Resources</h4>
      <a href="https://www.saferproducts.gov/" target="_blank" rel="noopener">SaferProducts.gov</a>
      <a href="https://www.cpsc.gov/Recalls" target="_blank" rel="noopener">CPSC Recalls</a>
      <a href="https://www.nhtsa.gov/recalls" target="_blank" rel="noopener">NHTSA Recalls</a>
      <a href="https://www.recalls.gov/" target="_blank" rel="noopener">Recalls.gov</a>
      <a href="https://counselhound.com/contact-us/">Contact Counsel Hound</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <?php echo esc_html( date( 'Y' ) ); ?> Counsel Hound. All Rights Reserved.</span>
    <span>No Fees Unless We Win &middot; Free Consultations &middot; All 50 States</span>
  </div>
  <div class="footer-disclaimer">
    <strong>Legal Disclaimer:</strong> The information on this page is for general informational purposes only and does not constitute legal advice. Data is compiled from publicly available government sources including the CPSC, NHTSA, FTC, and PIRG. Viewing this page does not create an attorney-client relationship. If you have been injured by a product, consult with a qualified attorney. Counsel Hound is a legal referral service. Results shown are representative and not a guarantee of outcome.
  </div>
</footer>

<?php wp_footer(); ?>

<script>
/* ═══════════════════════════════════════════════════
   COUNSEL HOUND — Consumer Safety Dashboard
   Brand name in display text: "Counsel Hound" (two words)
   Domain in URLs: counselhound.com (registered as one word)
   ═══════════════════════════════════════════════════ */
const CH_CFG = {
  CACHE_TTL:    24 * 3600 * 1000,
  REFRESH_HOUR: 6,
  CORS_PROXY:   'https://api.allorigins.win/get?url=',
  CPSC_RSS:     'https://www.cpsc.gov/Recalls.xml',
  CACHE_KEY:    'ch_consumer_recalls_v2',
  CACHE_TS:     'ch_consumer_recalls_ts_v2',
};

const PRODUCTS = [
  {name:"Children's toys with button/coin cell batteries",hazard:"When swallowed, cause internal chemical burns and death. Button cell batteries are involved in dozens of active recalls across multiple toy brands.",sev:"critical",cat:"children",source:"CPSC",pop:"Children under 12"},
  {name:"Adult portable bed rails",hazard:"Entrapment between rail and mattress has been linked to asphyxiation deaths. 18 confirmed deaths across multiple brands. 3 million units covered by recalls and warnings.",sev:"critical",cat:"adult",source:"CPSC",pop:"Elderly adults"},
  {name:"Infant swings marketed for sleep",hazard:"Incline over 10° creates suffocation risk, violating federal safety standards for infant sleep products. Linked to 5 infant deaths.",sev:"critical",cat:"children",source:"CPSC",pop:"Infants"},
  {name:"Wireless charging pads (MagSafe-style)",hazard:"171 incidents including 39 fires, 13 burn injuries, and 132 cases of bulging or swelling batteries reported to CPSC.",sev:"high",cat:"fire",source:"CPSC/PIRG",pop:"General public"},
  {name:"Electric pressure washers (no GFCI)",hazard:"Lack required ground-fault circuit interrupters, posing serious electrocution risk. Multi-brand recall announced April 2026.",sev:"critical",cat:"fire",source:"CPSC",pop:"General public"},
  {name:"Male-to-male extension cords",hazard:"Risk of electrocution and carbon monoxide poisoning when used with generators. Sold at Walmart stores April–November 2025.",sev:"critical",cat:"fire",source:"CPSC",pop:"General public"},
  {name:"Portable lithium power banks",hazard:"Fire and burn injuries, including one fatality. Casely brand recalled twice. Veektomx mini banks also recalled after fire damage reports.",sev:"critical",cat:"fire",source:"CPSC",pop:"General public"},
  {name:"Hoverboards &amp; e-scooters",hazard:"Lithium battery fires — a Jetson Rogue hoverboard caused a house fire that killed two sisters in 2022. Ongoing fire risk product category.",sev:"critical",cat:"fire",source:"CPSC",pop:"All ages"},
  {name:"Lawnmower lithium batteries",hazard:"Spontaneous combustion causing property damage. One case caused $13,000 in losses. Approximately 63,000 batteries recalled December 2024.",sev:"high",cat:"fire",source:"CPSC/PIRG",pop:"Homeowners"},
  {name:"High-powered magnet sets",hazard:"If multiple magnets are swallowed, they attract through intestinal walls causing perforation and death. Multiple brands recalled 2025.",sev:"critical",cat:"children",source:"CPSC",pop:"Children"},
  {name:"Unstable dressers (STURDY Act violations)",hazard:"Dressers not anchored to walls tip over and trap children, causing crush injuries and death. Multiple brands recalled 2024–2026.",sev:"critical",cat:"children",source:"CPSC",pop:"Children"},
  {name:"Thermos Stainless King food jars &amp; bottles",hazard:"8.2 million units recalled — stopper can forcefully eject when opened, causing serious impact and laceration injuries.",sev:"high",cat:"adult",source:"CPSC",pop:"General public"},
  {name:"Macy's Arch Studio tea kettles",hazard:"Handle detaches from kettle when hot, increasing serious burn injury risk. Sold August 2025–February 2026.",sev:"high",cat:"adult",source:"CPSC",pop:"General public"},
  {name:"Tabletop alcohol fireplaces",hazard:"Uncontrolled alcohol-fueled fire — one elderly couple killed. CPSC issued urgent safety warning after manufacturer refused recall.",sev:"critical",cat:"adult",source:"CPSC",pop:"Adults, elderly"},
  {name:"Children's loungewear (flammability)",hazard:"Silks brand loungewear fails mandatory flammability standards for children's sleepwear. Sold January 2024–September 2025.",sev:"high",cat:"children",source:"CPSC",pop:"Children"},
  {name:"Soccer goal posts (tip-over)",hazard:"A high school student suffered a fatal penetrating brain injury when a pole entered the eye cavity during a fall. CPSC issued safety warning.",sev:"critical",cat:"adult",source:"CPSC",pop:"Youth athletes"},
  {name:"Iron supplements — non-child-resistant packaging",hazard:"Failure to meet child-resistant packaging standards. Iron overdose is a leading cause of poisoning deaths in young children. Multiple brands recalled 2026.",sev:"critical",cat:"adult",source:"CPSC",pop:"Children"},
  {name:"Pool drain covers (suction entrapment)",hazard:"Muscccm and Yeeluzan drain covers fail Virginia Graeme Baker Pool Safety Act standards, creating suction entrapment and drowning risk.",sev:"critical",cat:"adult",source:"CPSC",pop:"Swimmers, children"},
  {name:"Biometric gun safes",hazard:"Opened by unauthorized users including a 6-year-old child. More than 10,000 incidents reported. Serious unintended firearm access risk.",sev:"critical",cat:"adult",source:"CPSC",pop:"Households with children"},
  {name:"Takata airbags",hazard:"Inflator ruptures sending metal shrapnel into vehicle occupants — multiple deaths confirmed. Tens of millions of vehicles still under recall.",sev:"critical",cat:"vehicle",source:"NHTSA",pop:"Vehicle occupants"},
  {name:"Chrysler Pacifica &amp; Voyager 2022–2026",hazard:"Side curtain airbags fail required excursion limits. Affects 170,000+ vehicles.",sev:"high",cat:"vehicle",source:"NHTSA",pop:"Vehicle occupants"},
  {name:"Ford Bronco / Ranger / Bronco Sport / Maverick 2021–2026",hazard:"Multiple issues: wiring may cause fires; transmission misalignment may cause total loss of drive power.",sev:"high",cat:"vehicle",source:"NHTSA",pop:"Vehicle occupants"},
  {name:"Casely wireless portable power banks",hazard:"Fire and burn risk — one fatality has been reported. Product has been recalled twice by the manufacturer.",sev:"critical",cat:"fire",source:"CPSC",pop:"General public"},
  {name:"Fisher &amp; Paykel gas ranges",hazard:"Serious burn risk from design issues. Sold at retail stores nationwide June 2025–March 2026.",sev:"high",cat:"adult",source:"CPSC",pop:"General public"},
  {name:"Nvyue Magic Pocket Staffs",hazard:"Protective pin mechanism fails, causing staff to expand unintentionally — creating projectile and laceration hazards.",sev:"medium",cat:"adult",source:"CPSC",pop:"General public"},
  {name:"Head USA ski boots",hazard:"Manufacturing defect increases fall risk during use. Sold by independent retailers and online September 2015–March 2026.",sev:"medium",cat:"adult",source:"CPSC",pop:"Skiers"},
  {name:"Vacuum cleaners with lithium batteries",hazard:"17 reports of smoking or burning; 6 battery fires; 2 minor burns and property damage. Approximately 142,000 units recalled February 2024.",sev:"high",cat:"fire",source:"CPSC/PIRG",pop:"General public"},
  {name:"Smfanlus bicycle lights",hazard:"Accessible button cell batteries can be easily reached by children. Ingested batteries cause internal chemical burns and death.",sev:"high",cat:"children",source:"CPSC",pop:"Children"},
  {name:"Children's activity cubes (small detachable parts)",hazard:"Atoyus/Melofaver cubes: small parts detach easily creating choking hazard. Violates mandatory small-parts ban for toys for young children.",sev:"critical",cat:"children",source:"CPSC",pop:"Children under 3"},
];

let currentCat = 'all';
let liveRecalls = [];

const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmtDate = d => { try { return new Date(d).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); } catch(e) { return String(d); }};
const fmtTime = d => new Date(d).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});

function cacheGet() {
  try {
    const ts = parseInt(localStorage.getItem(CH_CFG.CACHE_TS)||'0', 10);
    const d  = localStorage.getItem(CH_CFG.CACHE_KEY);
    if (!d || !ts || Date.now() - ts > CH_CFG.CACHE_TTL) return null;
    return { data: JSON.parse(d), age: Date.now() - ts };
  } catch(e) { return null; }
}
function cacheSet(data) {
  try {
    localStorage.setItem(CH_CFG.CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CH_CFG.CACHE_TS, String(Date.now()));
  } catch(e) {}
}

function tick() {
  const now  = new Date();
  const next = new Date(now);
  next.setHours(CH_CFG.REFRESH_HOUR, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const diff = next - now;
  const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000);
  document.getElementById('upTime').textContent = fmtTime(now);
  document.getElementById('upNext').textContent = `in ${h}h ${m}m`;
}

function setCacheUI(fresh, msg) {
  const dot = document.getElementById('cacheDot');
  dot.className = 'cdot ' + (fresh ? 'fresh' : 'stale');
  document.getElementById('cacheStatus').textContent = msg;
}

window.filterCards = function(cat, btn) {
  if (btn) {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  currentCat = cat;
  const q = (document.getElementById('prodSearch').value || '').toLowerCase();
  const filtered = PRODUCTS.filter(p => {
    const txt = (p.name + ' ' + p.hazard + ' ' + p.pop).toLowerCase();
    if (q && !txt.includes(q)) return false;
    if (cat === 'all') return true;
    return (p.cat || '').includes(cat);
  });
  document.getElementById('productGrid').innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="card-stripe ${p.sev}"></div>
      <div class="card-body">
        <div class="card-top">
          <div class="card-name">${p.name}</div>
          <span class="sev-pill sev-${p.sev}">${p.sev === 'critical' ? 'CRITICAL' : p.sev === 'high' ? 'HIGH RISK' : 'MEDIUM'}</span>
        </div>
        <p class="card-hazard">⚠ ${p.hazard}</p>
        <div class="card-footer">
          <span class="card-source">Source: ${p.source} · ${p.pop}</span>
          <a class="card-action" href="https://counselhound.lawbrokr.com/">Get Legal Help →</a>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('dbMeta').textContent = `${filtered.length} products · CPSC + PIRG + CFA 2024–2026`;
};

function parseRSS(xml) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  return Array.from(doc.querySelectorAll('item')).map(i => {
    const title   = i.querySelector('title')?.textContent || '';
    const link    = i.querySelector('link')?.textContent || '';
    const desc    = i.querySelector('description')?.textContent || '';
    const pubDate = i.querySelector('pubDate')?.textContent || '';
    const date    = pubDate ? new Date(pubDate) : new Date();
    const txt     = (title + ' ' + desc).toLowerCase();
    const sev     = /death|fatal|electrocution|serious risk of death|asphyx/.test(txt) ? 'critical'
                  : /fire|burn|entrapment|suffocation|laceration|chok|poison/.test(txt) ? 'high' : 'medium';
    return { title, link, desc, date, sev };
  });
}

async function fetchCPSC() {
  try {
    const proxy = CH_CFG.CORS_PROXY + encodeURIComponent(CH_CFG.CPSC_RSS);
    const r = await fetch(proxy, { signal: AbortSignal.timeout(12000) });
    const j = await r.json();
    if (!j.contents) return [];
    return parseRSS(j.contents);
  } catch(e) { return []; }
}

function renderLiveTable(records) {
  document.getElementById('liveTableBody').innerHTML = records.slice(0, 30).map(r => {
    const sevCls = r.sev === 'critical' ? 'sev-critical' : r.sev === 'high' ? 'sev-high' : 'sev-medium';
    const sevLbl = r.sev === 'critical' ? 'CRITICAL' : r.sev === 'high' ? 'HIGH RISK' : 'MEDIUM';
    const short  = (r.desc || '').replace(/<[^>]+>/g, '').substring(0, 120) + '…';
    return `<tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
      <td style="padding:0.75rem 1rem;font-size:11px;color:var(--muted);white-space:nowrap;">${fmtDate(r.date)}</td>
      <td style="padding:0.75rem 1rem;">
        <div style="font-weight:600;font-size:13px;margin-bottom:2px;">${esc(r.title)}</div>
        <div style="font-size:11px;color:var(--muted);">${esc(short)}</div>
      </td>
      <td style="padding:0.75rem 1rem;"><span class="sev-pill ${sevCls}">${sevLbl}</span></td>
      <td style="padding:0.75rem 1rem;">${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener" style="font-size:12px;font-weight:600;color:var(--gold);text-decoration:none;">View →</a>` : '—'}</td>
    </tr>`;
  }).join('');
}

function buildTicker(records) {
  const items = records.slice(0, 20).map(r =>
    `<span class="ticker-item">⚠ ${esc(r.title)}</span><span class="ticker-sep"> | </span>`
  ).join('');
  if (items) document.getElementById('tickerTrack').innerHTML = items + items;
}

async function chInit() {
  tick();
  setInterval(tick, 30000);
  filterCards('all');

  const cached = cacheGet();
  if (cached) {
    liveRecalls = cached.data;
    setCacheUI(true, `Data cached ${Math.floor(cached.age / 3600000)}h ago. Next refresh at ${CH_CFG.REFRESH_HOUR}:00 AM.`);
    document.getElementById('cpscLoader').style.display = 'none';
    document.getElementById('liveTableWrap').style.display = 'block';
    renderLiveTable(liveRecalls);
    buildTicker(liveRecalls);
    document.getElementById('upCount').textContent  = liveRecalls.length + ' live records';
    document.getElementById('stat-class1').textContent = liveRecalls.length + '+ live';
  } else {
    setCacheUI(false, 'Fetching fresh recall data from CPSC…');
    const records = await fetchCPSC();
    document.getElementById('cpscLoader').style.display = 'none';
    if (records.length) {
      cacheSet(records);
      liveRecalls = records;
      setCacheUI(true, `Live data fetched at ${fmtTime(new Date())}. Refreshes daily at ${CH_CFG.REFRESH_HOUR}:00 AM.`);
      document.getElementById('liveTableWrap').style.display = 'block';
      renderLiveTable(records);
      buildTicker(records);
      document.getElementById('upCount').textContent  = records.length + ' live records';
      document.getElementById('stat-class1').textContent = records.length + '+ live';
    } else {
      setCacheUI(false, 'Live feed temporarily unavailable. Displaying curated research database.');
      document.getElementById('liveError').style.display = 'block';
      document.getElementById('liveError').textContent = 'Live CPSC feed could not be reached. This may be a CORS restriction in the browser environment. For production, route this request through a server-side proxy or WordPress cron job (see notes in the PHP file header). Visit CPSC.gov for the latest recalls, or contact Counsel Hound for free legal help.';
    }
  }
}

// Auto-refresh: check every minute if it's time
setInterval(() => {
  const now = new Date();
  if (now.getHours() === CH_CFG.REFRESH_HOUR && now.getMinutes() === 0) {
    localStorage.removeItem(CH_CFG.CACHE_KEY);
    localStorage.removeItem(CH_CFG.CACHE_TS);
    chInit();
  }
}, 60000);

chInit();
</script>

</body>
</html>
