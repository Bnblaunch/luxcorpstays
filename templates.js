/* =====================================================================
   templates.js  —  SHARED site templates for the client website platform.
   Loaded by: site.html (published sites), client-builder.html (client editor),
   and site-builder.html (admin editor). Keeping the templates in ONE file
   means the design a client previews is EXACTLY what publishes — no drift.

   Each page defines its own global `cfg` object (the site's data) before this
   file's functions are called. These functions read that global `cfg`.

   Editable by the client: name, head, sub, about, services, email, phone,
   city, logo, colors. Everything else on the page (who we serve, how it works
   for owners, guest screening, protection, why-partner) is FIXED marketing
   content that only re-themes to the brand color + company name.
   ===================================================================== */
"use strict";

/* ---------------- helpers (shared with the builder UIs) ---------------- */
function esc(s){return (s==null?'':String(s)).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function initials(n){return (n||'').split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0].toUpperCase();}).join('')||'A';}
function logoMarkup(cls){
  if(cfg.logo) return '<img class="'+cls+' lg-img" src="'+cfg.logo+'" alt="'+esc(cfg.name)+' logo">';
  return '<span class="'+cls+' lg-mono">'+esc(initials(cfg.name))+'</span>';
}
/* Stock photo helper — high-quality photo first, auto-falls back to a keyword-matched
   real photo if that URL ever fails, and a branded gradient sits behind it either way.
   Clients never upload anything; photography ships with the template. */
function stock(u,kw,cls,w,h){
  var fb="https://loremflickr.com/"+w+"/"+h+"/"+kw;
  return '<img class="'+cls+'" alt="" loading="lazy" src="'+u+'" data-fb="'+fb+'" onerror="if(this.dataset.fb){this.src=this.dataset.fb;this.dataset.fb=\'\';}else{this.style.display=\'none\';}">';
}
var WS='https://wrightstays.com/wp-content/uploads/2024/01/';
var PIX={
  hero:WS+'spacejoy-4xRP0Ajk9ys-unsplash.jpg', heroKw:'apartment,interior',
  about:WS+'krystal-black-V5OEpF12pzw-unsplash-600x600-1.jpg', aboutKw:'livingroom,modern',
  g1:WS+'spacejoy-c0JoR_-2x3E-unsplash-600x600-1.jpg', g1k:'livingroom',
  g2:WS+'spacejoy-65k2klkcvT8-unsplash-600x600-1.jpg', g2k:'bedroom',
  g3:WS+'spacejoy-CtPRtg8KSIs-unsplash-600x600-1.jpg', g3k:'kitchen',
  g4:WS+'spacejoy-c6SxfCFLNhE-unsplash-600x600-1.jpg', g4k:'bathroom,interior',
  feat:WS+'spacejoy-XM-miHibz64-unsplash-1-600x600-1.jpg', featKw:'apartment,building'
};
function baseVars(){return '--p:'+cfg.primary+';--a:'+cfg.accent+';';}
function svcCards(){return cfg.services.map(function(s){return {t:esc(s.t),d:esc(s.d)};});}

/* ---------------- FIXED marketing content (from the pitch deck) ----------------
   These read cfg.name where a company reference reads naturally, but never leave a
   stale/placeholder name behind. */
function CO(){return esc(cfg.name)|| 'Our company';}

var CONTENT_SERVE=[
  {i:'\u{1FA7A}', t:'Traveling Nurses & Healthcare', d:'Fully-furnished, move-in-ready homes for travel nurses and medical professionals on 13-week assignments and beyond.'},
  {i:'\u{1F4BC}', t:'Business Professionals', d:'Comfortable, connected spaces for consultants, executives, and project teams working away from home.'},
  {i:'\u{1F3E2}', t:'Corporate Relocations', d:'Turnkey housing for employees relocating or on temporary assignment, coordinated directly with their employer.'},
  {i:'\u{1F6E1}', t:'Insurance & Displacement', d:'Reliable interim housing for families placed by insurers during home repairs and claims.'}
];
var CONTENT_STEPS=[
  {n:'1', t:'We sign a lease with you', d:'We become your tenant on a standard long-term lease. You deal with one accountable company, not a rotating cast of strangers.'},
  {n:'2', t:'You collect reliable monthly rent', d:'Guaranteed rent arrives the same day every month, whether the unit is occupied or not. No chasing, no gaps.'},
  {n:'3', t:'We place vetted corporate guests', d:'Every guest is screened and approved before check-in. We handle bookings, communication, and every turnover.'},
  {n:'4', t:'We maintain the property', d:'Cleaning, touch-ups, and routine upkeep are on us. Your home is cared for exactly like it’s our own.'}
];
var CONTENT_SCREEN=[
  {t:'Identity & criminal background checks', d:'Before check-in, every guest verifies their identity and completes a criminal background check through TransUnion SmartMove — full legal name, address history, and date of birth.'},
  {t:'Screened against national databases', d:'We check the OFAC list, public, state, and national criminal records, plus state and national sex-offender registries. Anyone flagged for serious offenses is declined.'},
  {t:'Signed, binding rental agreements', d:'Approved guests sign a rental agreement covering community standards for the length of their stay. Signatures, timestamps, and IP addresses make it legally binding.'}
];
var CONTENT_PROTECT=[
  {i:'\u{1F50D}', t:'Criminal Screening', d:'OFAC, state & national criminal records, and sex-offender registry checks on every guest.'},
  {i:'\u{1F4DD}', t:'Rental Agreement', d:'Every guest signs a binding agreement with clear community standards before they arrive.'},
  {i:'\u{1F512}', t:'Security System', d:'Noise monitoring, smart locks, and cameras — plus on-site coordinators to handle any issue.'},
  {i:'\u{2602}', t:'$7M Insurance', d:'A $5M business blanket policy and $2M in liability, replacement & damage coverage protect your property.'}
];
var CONTENT_WHY=[
  {t:'The easiest tenant you’ll ever have', d:'We handle minor maintenance, touch-ups, and routine issues ourselves. Contact stays limited to genuine emergencies — a truly hands-off tenancy.'},
  {t:'The last tenant you’ll ever need', d:'We guarantee long-term rental of your home, backed by an established company with strong revenue and an excellent rental and credit history.'},
  {t:'A partner in growing your portfolio', d:'Spend less on turnover and vacancies, and buy your next property knowing the rent is already covered.'}
];

/* ---- Shared, self-contained section blocks (inline-styled, theme via var --p/--a) ---- */
function W(inner){return '<div style="max-width:1140px;margin:0 auto;padding:0 26px">'+inner+'</div>';}
function eyebrow(txt){return '<div style="color:var(--p);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.76rem">'+txt+'</div>';}

function secServe(){
  var cards=CONTENT_SERVE.map(function(c){
    return '<div style="background:#fff;border:1px solid #ececf3;border-radius:16px;padding:26px 22px">'
      +'<div style="font-size:1.7rem;line-height:1;margin-bottom:12px">'+c.i+'</div>'
      +'<h3 style="font-size:1.12rem;margin:0 0 .4rem;color:#221d2b">'+c.t+'</h3>'
      +'<p style="color:#5f5b6b;font-size:.95rem;margin:0;line-height:1.55">'+c.d+'</p></div>';
  }).join('');
  return '<section style="padding:80px 0;background:#faf9fd">'+W(
    '<div style="text-align:center;max-width:640px;margin:0 auto 44px">'+eyebrow('Who we serve')
    +'<h2 style="font-size:2.15rem;margin:.5rem 0 .6rem;color:#221d2b">Housing for professionals on the move</h2>'
    +'<p style="color:#5f5b6b;font-size:1.02rem;margin:0">A national housing provider established in 2019, delivering high-quality furnished stays to vetted corporate guests across the United States.</p></div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px" class="serve-grid">'+cards+'</div>'
  )+'</section>';
}
function secSteps(){
  var steps=CONTENT_STEPS.map(function(c){
    return '<div style="position:relative;background:#fff;border:1px solid #ececf3;border-radius:16px;padding:28px 24px">'
      +'<div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--p),var(--a));color:#fff;display:grid;place-items:center;font-weight:800;font-size:1.1rem;margin-bottom:16px">'+c.n+'</div>'
      +'<h3 style="font-size:1.12rem;margin:0 0 .45rem;color:#221d2b">'+c.t+'</h3>'
      +'<p style="color:#5f5b6b;font-size:.95rem;margin:0;line-height:1.55">'+c.d+'</p></div>';
  }).join('');
  return '<section style="padding:80px 0;background:#fff">'+W(
    '<div style="text-align:center;max-width:640px;margin:0 auto 44px">'+eyebrow('For property owners')
    +'<h2 style="font-size:2.15rem;margin:.5rem 0 .6rem;color:#221d2b">How it works</h2>'
    +'<p style="color:#5f5b6b;font-size:1.02rem;margin:0">One lease, dependable rent, and a property that’s fully taken care of. Here’s the whole arrangement.</p></div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px" class="serve-grid">'+steps+'</div>'
  )+'</section>';
}
function secScreen(){
  var pts=CONTENT_SCREEN.map(function(c){
    return '<div style="display:flex;gap:16px;align-items:flex-start;padding:18px 0;border-top:1px solid rgba(255,255,255,.14)">'
      +'<div style="flex:0 0 auto;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.14);display:grid;place-items:center;color:#fff;font-size:.9rem;margin-top:2px">✓</div>'
      +'<div><h3 style="font-size:1.12rem;margin:0 0 .3rem;color:#fff">'+c.t+'</h3>'
      +'<p style="color:#d9d2ec;font-size:.97rem;margin:0;line-height:1.6">'+c.d+'</p></div></div>';
  }).join('');
  return '<section style="padding:82px 0;background:linear-gradient(160deg,var(--p),#1c1533);color:#fff">'+W(
    '<div style="display:grid;grid-template-columns:.9fr 1.1fr;gap:52px;align-items:center" class="screen-grid">'
    +'<div><div style="color:#e7d9ff;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.76rem">Safety &amp; trust</div>'
    +'<h2 style="font-size:2.2rem;margin:.5rem 0 1rem;line-height:1.15">Every guest is screened before they get a key</h2>'
    +'<p style="color:#e2daf5;font-size:1.05rem;margin:0 0 1.4rem;line-height:1.6">We treat your property’s safety the way you would. Guests booking through any channel are verified, background-checked, and bound by a signed agreement.</p>'
    +'<div style="display:flex;gap:26px;flex-wrap:wrap">'
      +'<div><div style="font-size:1.6rem;font-weight:800">TransUnion</div><div style="color:#c7bde6;font-size:.85rem">SmartMove screening</div></div>'
      +'<div><div style="font-size:1.6rem;font-weight:800">OFAC + State</div><div style="color:#c7bde6;font-size:.85rem">& national records</div></div>'
      +'<div><div style="font-size:1.6rem;font-weight:800">24/7</div><div style="color:#c7bde6;font-size:.85rem">on-site coordinators</div></div>'
    +'</div></div>'
    +'<div>'+pts+'</div></div>'
  )+'</section>';
}
function secProtect(){
  var cards=CONTENT_PROTECT.map(function(c){
    return '<div style="background:#fff;border:1px solid #ececf3;border-radius:16px;padding:26px 22px;text-align:center">'
      +'<div style="width:52px;height:52px;border-radius:14px;background:color-mix(in srgb,var(--p) 12%,#fff);display:grid;place-items:center;margin:0 auto 14px;font-size:1.4rem">'+c.i+'</div>'
      +'<h3 style="font-size:1.08rem;margin:0 0 .4rem;color:#221d2b">'+c.t+'</h3>'
      +'<p style="color:#5f5b6b;font-size:.92rem;margin:0;line-height:1.55">'+c.d+'</p></div>';
  }).join('');
  return '<section style="padding:80px 0;background:#faf9fd">'+W(
    '<div style="text-align:center;max-width:640px;margin:0 auto 44px">'+eyebrow('Protection &amp; peace of mind')
    +'<h2 style="font-size:2.15rem;margin:.5rem 0 .6rem;color:#221d2b">Your property is protected on every side</h2>'
    +'<p style="color:#5f5b6b;font-size:1.02rem;margin:0">Screening, agreements, security, and insurance work together so you can hand over the keys with total confidence.</p></div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px" class="serve-grid">'+cards+'</div>'
  )+'</section>';
}
function secWhy(){
  var rows=CONTENT_WHY.map(function(c){
    return '<div style="display:grid;grid-template-columns:34px 1fr;gap:16px;align-items:start;padding:20px 0;border-bottom:1px solid #ececf3">'
      +'<div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--a));display:grid;place-items:center;color:#fff;font-weight:800">★</div>'
      +'<div><h3 style="font-size:1.18rem;margin:0 0 .35rem;color:#221d2b">'+c.t+'</h3>'
      +'<p style="color:#5f5b6b;font-size:1rem;margin:0;line-height:1.6">'+c.d+'</p></div></div>';
  }).join('');
  return '<section style="padding:80px 0;background:#fff">'+W(
    '<div style="display:grid;grid-template-columns:.85fr 1.15fr;gap:52px;align-items:center" class="screen-grid">'
    +'<div>'+eyebrow('Why owners choose us')
    +'<h2 style="font-size:2.2rem;margin:.5rem 0 1rem;color:#221d2b;line-height:1.15">The easiest — and last — tenant you’ll ever have</h2>'
    +'<p style="color:#5f5b6b;font-size:1.05rem;margin:0 0 1.2rem;line-height:1.6">We carry a $5M business blanket policy plus $2M in liability, replacement, and damage coverage, and require tenant insurance on every stay. Your asset is covered, cared for, and quietly earning.</p>'
    +'<a href="#contact" style="display:inline-block;background:var(--p);color:#fff;text-decoration:none;font-weight:700;padding:.85rem 1.7rem;border-radius:999px">Partner with us</a></div>'
    +'<div>'+rows+'</div></div>'
  )+'</section>';
}
var CONTENT_REVIEWS=[
  {n:'Michael R.', r:'Property owner · 3 units', t:'They took over my rentals and I genuinely stopped worrying. Rent hits my account the same day every month and the homes look better than when I handed them over.'},
  {n:'Sandra L.', r:'Landlord · single-family home', t:'No more turnover, no more chasing late rent. Their team handles everything and only reaches out when it actually matters. The easiest tenant I’ve ever had.'},
  {n:'David C.', r:'Real estate investor', t:'The screening and insurance gave me total peace of mind. I’ve since added two more properties knowing the rent is already covered.'}
];
function stars(){return '<div style="color:#f5b731;font-size:1rem;letter-spacing:2px;margin-bottom:12px">★★★★★</div>';}
function secReviews(){
  var cards=CONTENT_REVIEWS.map(function(c){
    var av=esc(c.n).split(/\s+/).map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
    return '<div style="background:#fff;border:1px solid #ececf3;border-radius:16px;padding:28px 24px;box-shadow:0 14px 40px -30px rgba(30,20,60,.5)">'
      +stars()
      +'<p style="color:#3c3747;font-size:1rem;line-height:1.6;margin:0 0 18px">“'+c.t+'”</p>'
      +'<div style="display:flex;align-items:center;gap:12px">'
        +'<div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--p),var(--a));color:#fff;display:grid;place-items:center;font-weight:700;font-size:.85rem">'+av+'</div>'
        +'<div><div style="font-weight:700;color:#221d2b;font-size:.95rem">'+esc(c.n)+'</div><div style="color:#8a8598;font-size:.82rem">'+esc(c.r)+'</div></div>'
      +'</div></div>';
  }).join('');
  return '<section style="padding:80px 0;background:#faf9fd">'+W(
    '<div style="text-align:center;max-width:640px;margin:0 auto 44px">'+eyebrow('What owners say')
    +'<h2 style="font-size:2.15rem;margin:.5rem 0 .6rem;color:#221d2b">Trusted by property owners</h2>'
    +'<p style="color:#5f5b6b;font-size:1.02rem;margin:0">Real partnerships, dependable rent, and properties cared for like our own.</p></div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px" class="rev-grid">'+cards+'</div>'
  )+'</section>';
}
/* A proper contact section (the “contact page” every Book Now / Enquire button points to). */
function secContact(){
  return '<section id="contact" style="padding:88px 0;background:linear-gradient(160deg,var(--p),#1c1533);color:#fff">'+W(
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center" class="screen-grid">'
    +'<div><div style="color:#e7d9ff;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.76rem">Get in touch</div>'
    +'<h2 style="font-size:2.3rem;margin:.5rem 0 1rem;line-height:1.15">Let’s talk about your property</h2>'
    +'<p style="color:#e2daf5;font-size:1.06rem;margin:0 0 1.6rem;line-height:1.6">Tell us where your property is and what you’re looking for. We’ll walk you through the lease, the rent, and exactly how we’d take care of it — no obligation.</p>'
    +'<div style="display:flex;flex-direction:column;gap:12px;font-size:1.05rem">'
      +'<div>📧 <a href="mailto:'+esc(cfg.email)+'" style="color:#fff;text-decoration:none;font-weight:600">'+esc(cfg.email)+'</a></div>'
      +'<div>📞 <a href="tel:'+esc(cfg.phone)+'" style="color:#fff;text-decoration:none;font-weight:600">'+esc(cfg.phone)+'</a></div>'
      +'<div>📍 '+esc(cfg.city)+'</div>'
    +'</div></div>'
    +'<div style="background:#fff;border-radius:20px;padding:32px;color:#33313d">'
      +'<h3 style="font-size:1.25rem;margin:0 0 4px;color:#221d2b">Request a callback</h3>'
      +'<p style="color:#6b6577;font-size:.92rem;margin:0 0 18px">Send us a quick note and we’ll get right back to you.</p>'
      +'<form onsubmit="var b=this;var s=encodeURIComponent((b.nm.value||\'\')+\' — property enquiry\');var bd=encodeURIComponent(\'Name: \'+(b.nm.value||\'\')+\'\\nPhone: \'+(b.ph.value||\'\')+\'\\n\\n\'+(b.msg.value||\'\'));window.location.href=\'mailto:'+esc(cfg.email)+'?subject=\'+s+\'&body=\'+bd;return false;">'
      +'<input name="nm" placeholder="Your name" style="width:100%;box-sizing:border-box;border:1px solid #e2dced;border-radius:10px;padding:.7rem .8rem;margin-bottom:10px;font:inherit">'
      +'<input name="ph" placeholder="Phone or email" style="width:100%;box-sizing:border-box;border:1px solid #e2dced;border-radius:10px;padding:.7rem .8rem;margin-bottom:10px;font:inherit">'
      +'<textarea name="msg" placeholder="Tell us about your property" rows="3" style="width:100%;box-sizing:border-box;border:1px solid #e2dced;border-radius:10px;padding:.7rem .8rem;margin-bottom:14px;font:inherit;resize:vertical"></textarea>'
      +'<button type="submit" style="width:100%;background:var(--p);color:#fff;border:0;border-radius:999px;padding:.85rem;font:inherit;font-weight:700;cursor:pointer">Send enquiry</button>'
    +'</form></div></div>'
  )+'</section>';
}

/* The full owner-facing content block, in reading order. Templates drop this in
   between their hero/about intro and their contact/footer. */
function ownerSections(){return secServe()+secSteps()+secScreen()+secProtect()+secWhy();}

/* Responsive collapse for the shared grids (injected once per template head). */
var SHARED_RESPONSIVE='@media(max-width:820px){.serve-grid{grid-template-columns:1fr 1fr!important}.screen-grid{grid-template-columns:1fr!important}.rev-grid{grid-template-columns:1fr!important}}@media(max-width:520px){.serve-grid{grid-template-columns:1fr!important}}';

/* ===================================================================== */
/*  TEMPLATE 1 — CLASSIC  (modeled on wrightstays.com: purple utility bar) */
/* ===================================================================== */
function tpl_classic(){
  var s=svcCards();
  var soc='<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.7c-.3 0-1.4-.1-2.6-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V14h2.7v8z"/></svg></a><a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.7A11.4 11.4 0 0 1 3.8 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.4a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg></a><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a>';
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
+'<title>'+esc(cfg.name)+'</title>'
+'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap">'
+'<style>'
+':root{'+baseVars()+'}*{margin:0;box-sizing:border-box}body{font-family:Poppins,sans-serif;color:#33313d;line-height:1.65}'
+'h1,h2,h3{font-weight:700;line-height:1.15;letter-spacing:-.01em}'
+'.wrap{max-width:1140px;margin:0 auto;padding:0 26px}'
+'.topbar{background:var(--p);color:#fff;font-size:.84rem}'
+'.topbar .in{display:flex;justify-content:space-between;align-items:center;height:42px}'
+'.topbar a{color:#fff;text-decoration:none}'
+'.topbar .soc{display:flex;gap:14px;align-items:center}.topbar .soc a{display:grid;place-items:center;opacity:.9}.topbar .soc a:hover{opacity:1}'
+'header{background:#fff;box-shadow:0 2px 20px rgba(30,20,60,.06);position:sticky;top:0;z-index:5}'
+'.nav{display:flex;align-items:center;justify-content:space-between;height:82px}'
+'.brand{display:flex;align-items:center;gap:.65rem;font-weight:800;font-size:1.3rem;color:#2a2533}'
+'.lg-mono{width:44px;height:44px;border-radius:11px;background:linear-gradient(135deg,var(--p),var(--a));display:grid;place-items:center;color:#fff;font-weight:800;font-size:1.05rem}'
+'.lg-img{height:46px;width:auto}'
+'.nav .links{display:flex;align-items:center;gap:26px}'
+'.nav .links a{color:#43404d;text-decoration:none;font-weight:600;font-size:.95rem}'
+'.nav .links a:hover{color:var(--p)}'
+'.nav .book{background:var(--p);color:#fff;padding:.6rem 1.3rem;border-radius:999px;font-size:.9rem}'
+'.hero{position:relative;color:#fff;text-align:center;padding:130px 0 120px;background:#241a3d;overflow:hidden}'
+'.hero .hbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}'
+'.hero .hov{position:absolute;inset:0;background:linear-gradient(160deg,color-mix(in srgb,var(--p) 74%,transparent),color-mix(in srgb,#241a3d 88%,transparent))}'
+'.hero .in{position:relative;z-index:2}'
+'.hero .ey{letter-spacing:.2em;text-transform:uppercase;font-size:.8rem;font-weight:600;color:#e7d9ff}'
+'.hero h1{font-size:clamp(2.4rem,5vw,3.8rem);font-weight:800;margin:1rem auto;max-width:17ch}'
+'.hero p{font-size:1.18rem;color:#ece5fb;max-width:46ch;margin:0 auto 2rem}'
+'.hero a{background:#fff;color:var(--p);text-decoration:none;font-weight:700;padding:.9rem 2rem;border-radius:999px;display:inline-block}'
+'section{padding:86px 0}'
+'.about{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}'
+'.about .ey{color:var(--p);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.78rem}'
+'.about h2{font-size:2.4rem;margin:.5rem 0 1rem;color:#2a2533}.about p{color:#5f5b6b;font-size:1.06rem;margin-bottom:1rem}'
+'.aimg{aspect-ratio:4/3;border-radius:18px;background:linear-gradient(135deg,var(--p),var(--a));box-shadow:0 30px 60px -26px var(--p);overflow:hidden}'
+'.aimg img{width:100%;height:100%;object-fit:cover;display:block}'
+'.svcs{background:#fff}.shead{text-align:center;max-width:640px;margin:0 auto 46px}.shead .ey{color:var(--p);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.78rem}.shead h2{font-size:2.3rem;margin-top:.5rem;color:#2a2533}'
+'.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}'
+'.sc{background:#faf8fe;border:1px solid #efeaf8;border-radius:16px;padding:32px 26px;text-align:center}'
+'.sc .n{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--p),var(--a));display:grid;place-items:center;margin:0 auto 18px;color:#fff;font-size:1.5rem}'
+'.sc h3{font-size:1.22rem;margin-bottom:.5rem;color:#2a2533}.sc p{color:#605c6c;font-size:.96rem}'
+'.gallery{background:#faf9fd}.gallery .gg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}'
+'.gallery .gt{aspect-ratio:1;border-radius:14px;background:linear-gradient(135deg,var(--p),var(--a));overflow:hidden}'
+'.gallery .gt img{width:100%;height:100%;object-fit:cover;display:block;transition:.4s}'
+'.gallery .gt:hover img{transform:scale(1.06)}'
+'.quote{background:linear-gradient(160deg,var(--p),#241a3d);color:#fff;text-align:center}'
+'.quote .q{font-size:1.7rem;font-weight:600;max-width:24ch;margin:0 auto;line-height:1.4}'
+'.quote .qa{margin-top:18px;color:#e2d6fb;font-weight:600}'
+'footer{background:#1d1630;color:#c7bde0;padding:56px 0 26px}'
+'.fg{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:36px;padding-bottom:30px;border-bottom:1px solid rgba(255,255,255,.12)}'
+'footer .brand{color:#fff}footer .fabout{margin-top:14px;color:#a79ac9;max-width:34ch;font-size:.95rem}'
+'footer h4{color:#fff;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px}'
+'footer a{color:#c7bde0;text-decoration:none;display:block;padding:.25rem 0;font-size:.95rem}footer a:hover{color:#fff}'
+'.fsoc{display:flex;gap:14px;margin-top:12px}.fsoc a{display:grid;place-items:center}'
+'.fb{padding-top:20px;font-size:.85rem;color:#8b80ac;text-align:center}'
+'@media(max-width:820px){.about,.sg,.gallery .gg,.fg{grid-template-columns:1fr}.nav .links{display:none}.gallery .gg{grid-template-columns:1fr 1fr}}'
+SHARED_RESPONSIVE
+'</style></head><body>'
+'<div class="topbar"><div class="wrap in"><div>Call Us: <a href="tel:'+esc(cfg.phone)+'">'+esc(cfg.phone)+'</a> &nbsp;–&nbsp; <a href="mailto:'+esc(cfg.email)+'">'+esc(cfg.email)+'</a></div><div class="soc">'+soc+'</div></div></div>'
+'<header><div class="wrap nav"><div class="brand">'+logoMarkup('')+' '+esc(cfg.name)+'</div>'
+'<div class="links"><a href="#about">About</a><a href="#owners">For Owners</a><a href="#safety">Safety</a><a href="#services">Services</a><a class="book" href="#contact">Partner With Us</a></div></div></header>'
+'<div class="hero">'+stock(PIX.hero,PIX.heroKw,'hbg',1600,900)+'<div class="hov"></div><div class="wrap in"><div class="ey">'+esc(cfg.city)+'</div><h1>'+esc(cfg.head)+'</h1><p>'+esc(cfg.sub)+'</p><a href="#contact">List your property</a></div></div>'
+'<section class="wrap about" id="about"><div><div class="ey">Who we are</div><h2>Welcome to '+esc(cfg.name)+'</h2><p>'+esc(cfg.about)+'</p><a href="#owners" style="color:var(--p);font-weight:700;text-decoration:none">See how it works →</a></div><div class="aimg">'+stock(PIX.about,PIX.aboutKw,'',900,700)+'</div></section>'
+'<div id="owners"></div>'+secServe()+secSteps()
+'<section class="svcs" id="services"><div class="wrap"><div class="shead"><div class="ey">What owners get</div><h2>A truly hands-off arrangement</h2></div><div class="sg">'+s.map(function(c){return '<div class="sc"><div class="n">✦</div><h3>'+c.t+'</h3><p>'+c.d+'</p></div>';}).join('')+'</div></div></section>'
+'<div id="safety"></div>'+secScreen()+secProtect()+secWhy()
+'<section class="wrap gallery" id="gallery" style="border-radius:0"><div class="shead"><div class="ey">Our standard</div><h2>Homes we’re proud to manage</h2></div><div class="gg"><div class="gt">'+stock(PIX.g1,PIX.g1k,'',700,700)+'</div><div class="gt">'+stock(PIX.g2,PIX.g2k,'',700,700)+'</div><div class="gt">'+stock(PIX.g3,PIX.g3k,'',700,700)+'</div><div class="gt">'+stock(PIX.g4,PIX.g4k,'',700,700)+'</div></div></section>'
+secReviews()
+secContact()
+'<footer><div class="wrap"><div class="fg">'
+'<div><div class="brand">'+logoMarkup('')+' '+esc(cfg.name)+'</div><p class="fabout">'+esc(cfg.about)+'</p><div class="fsoc">'+soc+'</div></div>'
+'<div><h4>Contact</h4><a href="mailto:'+esc(cfg.email)+'">'+esc(cfg.email)+'</a><a href="tel:'+esc(cfg.phone)+'">'+esc(cfg.phone)+'</a><a href="#">'+esc(cfg.city)+'</a></div>'
+'<div><h4>Explore</h4><a href="#about">About</a><a href="#owners">For Owners</a><a href="#safety">Safety</a><a href="#services">Services</a></div>'
+'</div><div class="fb">© '+new Date().getFullYear()+' '+esc(cfg.name)+' · '+esc(cfg.city)+'</div></div></footer>'
+'</body></html>';
}

/* ===================================================================== */
/*  TEMPLATE 2 — AURORA  (bold gradient / modern)                         */
/* ===================================================================== */
function tpl_aurora(){
  var s=svcCards();
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
+'<title>'+esc(cfg.name)+'</title>'
+'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap">'
+'<style>'
+':root{'+baseVars()+'}*{margin:0;box-sizing:border-box}body{font-family:Inter,sans-serif;color:#181427;line-height:1.6}'
+'h1,h2,h3{font-family:Sora,sans-serif;letter-spacing:-.02em;line-height:1.08}'
+'.wrap{max-width:1120px;margin:0 auto;padding:0 26px}'
+'header{position:absolute;top:0;left:0;right:0;z-index:5}'
+'.nav{display:flex;align-items:center;justify-content:space-between;height:80px}'
+'.brand{display:flex;align-items:center;gap:.6rem;color:#fff;font-family:Sora;font-weight:700;font-size:1.3rem}'
+'.lg-mono{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.16);display:grid;place-items:center;font-weight:800;color:#fff;font-size:1rem}'
+'.lg-img{height:40px;width:auto;border-radius:8px;background:#fff;padding:3px}'
+'.nav .links{display:flex;align-items:center;gap:24px}.nav .links a{color:#efe9ff;text-decoration:none;font-weight:600;font-size:.92rem}'
+'.nav a.cta{background:#fff;color:var(--p);padding:.6rem 1.2rem;border-radius:999px;font-weight:700;text-decoration:none;font-size:.9rem}'
+'.hero{background:radial-gradient(120% 120% at 80% -10%,var(--a),var(--p) 45%,#160f2e 100%);color:#fff;padding:150px 0 110px;position:relative;overflow:hidden}'
+'.hero:after{content:"";position:absolute;width:520px;height:520px;right:-120px;top:-120px;background:radial-gradient(circle,rgba(255,255,255,.14),transparent 70%);border-radius:50%}'
+'.hero .ey{letter-spacing:.2em;text-transform:uppercase;font-size:.8rem;font-weight:700;color:#e7d9ff}'
+'.hero h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:800;max-width:18ch;margin-top:1rem}'
+'.hero p{font-size:1.2rem;color:#e9e2ff;max-width:46ch;margin:1.4rem 0 2.2rem}'
+'.hbtns a{text-decoration:none;font-weight:700;padding:.9rem 1.7rem;border-radius:999px;font-size:1rem;display:inline-block}'
+'.hbtns .a1{background:#fff;color:var(--p);margin-right:.8rem}'
+'.hbtns .a2{border:1px solid rgba(255,255,255,.4);color:#fff}'
+'section{padding:88px 0}'
+'.ey{color:var(--p);font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:.78rem}'
+'.about{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}'
+'.about h2{font-size:2.3rem;margin:.6rem 0 1rem}.about p{color:#4a4560;font-size:1.08rem}'
+'.aimg{aspect-ratio:4/3;border-radius:20px;background:linear-gradient(135deg,var(--p),var(--a));box-shadow:0 30px 60px -25px var(--p);overflow:hidden}'
+'.aimg img{width:100%;height:100%;object-fit:cover;display:block}'
+'.svcs{background:#f7f5fd}'
+'.shead{text-align:center;max-width:640px;margin:0 auto 46px}.shead h2{font-size:2.3rem;margin-top:.5rem}'
+'.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}'
+'.sc{background:#fff;border-radius:18px;padding:30px;border:1px solid #eee}'
+'.sc .n{width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--p),var(--a));color:#fff;display:grid;place-items:center;font-family:Sora;font-weight:800;margin-bottom:16px}'
+'.sc h3{font-size:1.25rem;margin-bottom:.5rem}.sc p{color:#5a5570;font-size:.97rem}'
+'.cta2{background:var(--p);color:#fff;text-align:center;border-radius:26px;padding:64px 30px}'
+'.cta2 h2{font-size:2.2rem}.cta2 p{color:#e9e2ff;margin:.8rem 0 1.6rem;font-size:1.1rem}'
+'.cta2 a{background:#fff;color:var(--p);text-decoration:none;font-weight:700;padding:.9rem 1.8rem;border-radius:999px}'
+'footer{background:#160f2e;color:#b9b1d6;padding:52px 0 28px}'
+'.fg{display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;align-items:center;padding-bottom:26px;border-bottom:1px solid rgba(255,255,255,.12)}'
+'.fg .brand{color:#fff}.fcon a{color:#d8d2ee;text-decoration:none;margin-left:20px;font-weight:600}'
+'.fabout{color:#a99fce;max-width:60ch;margin:18px 0 0;font-size:.95rem}'
+'.fb{padding-top:16px;font-size:.85rem;color:#8b83ad}'
+'@media(max-width:800px){.about,.sg{grid-template-columns:1fr}.nav .links{display:none}}'
+SHARED_RESPONSIVE
+'</style></head><body>'
+'<header><div class="wrap nav"><div class="brand">'+logoMarkup('')+' '+esc(cfg.name)+'</div><div class="links"><a href="#owners">For Owners</a><a href="#safety">Safety</a><a href="#services">Services</a></div><a class="cta" href="#contact">Partner With Us</a></div></header>'
+'<div class="hero"><div class="wrap"><div class="ey">'+esc(cfg.city)+'</div><h1>'+esc(cfg.head)+'</h1><p>'+esc(cfg.sub)+'</p>'
+'<div class="hbtns"><a class="a1" href="#contact">List your property</a><a class="a2" href="#owners">How it works</a></div></div></div>'
+'<section class="wrap about" id="about"><div><div class="ey">Who we are</div><h2>'+esc(cfg.name)+'</h2><p>'+esc(cfg.about)+'</p></div><div class="aimg">'+stock(PIX.about,PIX.aboutKw,'',900,700)+'</div></section>'
+'<div id="owners"></div>'+secServe()+secSteps()
+'<section class="svcs" id="services"><div class="wrap"><div class="shead"><div class="ey">What owners get</div><h2>A truly hands-off arrangement</h2></div>'
+'<div class="sg">'+s.map(function(c,i){return '<div class="sc"><div class="n">'+(i+1)+'</div><h3>'+c.t+'</h3><p>'+c.d+'</p></div>';}).join('')+'</div></div></section>'
+'<div id="safety"></div>'+secScreen()+secProtect()+secWhy()
+secReviews()
+secContact()
+'<footer><div class="wrap"><div class="fg"><div class="brand">'+logoMarkup('')+' '+esc(cfg.name)+'</div><div class="fcon"><a href="mailto:'+esc(cfg.email)+'">'+esc(cfg.email)+'</a><a href="tel:'+esc(cfg.phone)+'">'+esc(cfg.phone)+'</a></div></div><p class="fabout">'+esc(cfg.about)+'</p><div class="fb">© '+new Date().getFullYear()+' '+esc(cfg.name)+' · '+esc(cfg.city)+'</div></div></footer>'
+'</body></html>';
}

/* ===================================================================== */
/*  TEMPLATE 3 — HAVEN  (elegant serif / warm)                            */
/* ===================================================================== */
function tpl_haven(){
  var s=svcCards();
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
+'<title>'+esc(cfg.name)+'</title>'
+'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap">'
+'<style>'
+':root{'+baseVars()+'}*{margin:0;box-sizing:border-box}body{font-family:Inter,sans-serif;color:#2b2530;line-height:1.65;background:#fdfbf9}'
+'h1,h2,h3{font-family:Fraunces,serif;font-weight:600;line-height:1.12}'
+'.wrap{max-width:1080px;margin:0 auto;padding:0 26px}'
+'.nav{display:flex;align-items:center;justify-content:space-between;height:86px}'
+'.brand{display:flex;align-items:center;gap:.6rem;font-family:Fraunces;font-weight:600;font-size:1.35rem;color:var(--p)}'
+'.lg-mono{width:40px;height:40px;border-radius:50%;background:var(--p);display:grid;place-items:center;font-family:Inter;font-weight:700;color:#fff;font-size:1rem}'
+'.lg-img{height:42px;border-radius:8px}'
+'.nav .links{display:flex;align-items:center;gap:22px}.nav .links a{color:#4a4350;text-decoration:none;font-weight:600;font-size:.92rem}'
+'.nav a.cta{color:var(--p);border:1px solid var(--p);padding:.55rem 1.2rem;border-radius:999px;text-decoration:none;font-weight:600;font-size:.9rem}'
+'.hero{text-align:center;padding:40px 0 80px}'
+'.hero .ey{color:var(--a);font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:.76rem}'
+'.hero h1{font-size:clamp(2.4rem,5vw,3.8rem);margin:1rem auto;max-width:17ch;color:#241d2b}'
+'.hero h1 em{color:var(--p)}'
+'.hero p{font-size:1.18rem;color:#6a6270;max-width:42ch;margin:0 auto 2rem}'
+'.hero a{background:var(--p);color:#fff;text-decoration:none;font-weight:600;padding:.9rem 1.9rem;border-radius:999px}'
+'.strip{height:380px;border-radius:26px;background:linear-gradient(135deg,var(--p),var(--a));max-width:1080px;margin:0 auto;overflow:hidden}'
+'.strip img{width:100%;height:100%;object-fit:cover;display:block}'
+'section{padding:84px 0}'
+'.about{max-width:740px;margin:0 auto;text-align:center}.about .ey{color:var(--a);font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:.76rem}'
+'.about h2{font-size:2.4rem;margin:.6rem 0 1rem}.about p{color:#6a6270;font-size:1.12rem}'
+'.svcs{background:#fbf7f3}.svcs .shead{text-align:center;margin-bottom:44px}.svcs h2{font-size:2.3rem}'
+'.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}'
+'.sc{text-align:center;padding:20px}'
+'.sc .n{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;color:#fff;font-family:Fraunces;font-size:1.3rem;background:linear-gradient(135deg,var(--p),var(--a))}'
+'.sc h3{font-size:1.3rem;margin-bottom:.5rem}.sc p{color:#6a6270;font-size:.98rem}'
+'.contact{background:#fbf7f3;text-align:center}'
+'.contact h2{font-size:2.3rem}.contact p{color:#6a6270;margin:.8rem 0 1.4rem;font-size:1.1rem}'
+'.contact .row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}'
+'.contact .row a{text-decoration:none;font-weight:600;padding:.85rem 1.6rem;border-radius:999px}'
+'.contact .p1{background:var(--p);color:#fff}.contact .p2{border:1px solid var(--p);color:var(--p)}'
+'footer{text-align:center;padding:40px 0;color:#8a8290;font-size:.9rem}'
+'@media(max-width:800px){.sg{grid-template-columns:1fr}.nav .links{display:none}}'
+SHARED_RESPONSIVE
+'</style></head><body>'
+'<div class="wrap nav"><div class="brand">'+logoMarkup('')+' '+esc(cfg.name)+'</div><div class="links"><a href="#owners">For Owners</a><a href="#safety">Safety</a><a href="#services">Services</a></div><a class="cta" href="#contact">Partner With Us</a></div>'
+'<div class="hero wrap"><div class="ey">'+esc(cfg.city)+'</div><h1>'+esc(cfg.head)+'</h1><p>'+esc(cfg.sub)+'</p><a href="#contact">List your property</a></div>'
+'<div class="strip">'+stock(PIX.hero,PIX.heroKw,'',1400,600)+'</div>'
+'<section class="about" id="about"><div class="wrap"><div class="ey">Who we are</div><h2>'+esc(cfg.name)+'</h2><p>'+esc(cfg.about)+'</p></div></section>'
+'<div id="owners"></div>'+secServe()+secSteps()
+'<section class="svcs" id="services"><div class="wrap"><div class="shead"><h2>What owners get</h2></div><div class="sg">'+s.map(function(c){return '<div class="sc"><div class="n">✦</div><h3>'+c.t+'</h3><p>'+c.d+'</p></div>';}).join('')+'</div></div></section>'
+'<div id="safety"></div>'+secScreen()+secProtect()+secWhy()
+secReviews()
+secContact()
+'<footer>© '+new Date().getFullYear()+' '+esc(cfg.name)+' · '+esc(cfg.city)+'</footer>'
+'</body></html>';
}

/* summit kept as an alias so any stored template value still renders. */
function tpl_summit(){return tpl_aurora();}

var RENDERERS={classic:tpl_classic,aurora:tpl_aurora,haven:tpl_haven,summit:tpl_summit};
function buildSite(){return (RENDERERS[cfg.template]||tpl_classic)();}

/* Node/test entry (ignored in the browser). */
if(typeof module!=='undefined'&&module.exports){module.exports={buildSite:buildSite,RENDERERS:RENDERERS};}
