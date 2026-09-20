<script lang="ts">
  import { config } from '$lib/config';
  import { i18n } from '$lib/i18n/index.svelte';
  import ObfuscatedEmail from '$lib/components/ObfuscatedEmail.svelte';

  const areas = $derived([
    ...i18n.t.practice.areas.map((a) => ({ label: a.label, slug: a.slug as string | null, href: undefined as string | undefined })),
    { label: i18n.t.nav.investmentFraud.label, slug: null, href: 'https://frankowskifirm.com' },
  ]);
</script>

<footer class="bg-[#060E16] border-t border-[rgba(216,178,105,0.2)]">
  <div class="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

    <!-- Brand -->
    <div>
      <div class="flex items-center gap-3 mb-5">
        <img src="/icon-only.svg" alt="Counsel Hound" class="h-12 w-auto" width="48" height="48" />
        <div class="flex flex-col leading-none gap-0.5">
          <span class="text-[#d8b269] font-light text-lg tracking-[0.15em] font-futura uppercase">Counsel Hound</span>
          <span class="text-white/60 text-[8px] uppercase tracking-[0.3em] font-futura">{i18n.t.nav.legalAdvocates}</span>
        </div>
      </div>
      <p class="text-xs leading-relaxed mb-5 text-[rgba(240,237,232,0.65)]">
        {i18n.t.footer.tagline}
      </p>
      <p class="text-xs uppercase tracking-widest text-[rgba(240,237,232,0.5)] mb-1 font-futura">Birmingham, AL</p>
      <p class="text-xs text-[rgba(240,237,232,0.55)] mb-4">231 22nd St S #203 Birmingham AL 35233</p>
      <div class="flex flex-col gap-2 mb-2">
        <a href="tel:{config.phone}" class="text-sm tracking-wider text-[#d8b269] hover:text-white transition-colors">
          {config.phoneDisplay}
        </a>
        <ObfuscatedEmail email={config.email} class="text-sm tracking-wider text-[#d8b269] hover:text-white transition-colors" />
      </div>

      <!-- Follow Us -->
      <div class="mt-6">
        <p class="text-xs uppercase tracking-[0.2em] mb-3 text-[#d8b269] font-futura">{i18n.t.footer.follow}</p>
        <div class="flex gap-3">
          <a href="https://www.facebook.com/CounselHound" target="_blank" rel="noopener" aria-label="Facebook"
            class="w-10 h-10 flex items-center justify-center bg-[#d8b269]/10 hover:bg-[#d8b269] text-[#d8b269] hover:text-[#060E16] transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="https://www.instagram.com/counselhound" target="_blank" rel="noopener" aria-label="Instagram"
            class="w-10 h-10 flex items-center justify-center bg-[#d8b269]/10 hover:bg-[#d8b269] text-[#d8b269] hover:text-[#060E16] transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://x.com/counselhound" target="_blank" rel="noopener" aria-label="X"
            class="w-10 h-10 flex items-center justify-center bg-[#d8b269]/10 hover:bg-[#d8b269] text-[#d8b269] hover:text-[#060E16] transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div>
      <p class="text-xs uppercase tracking-[0.2em] mb-5 text-[#d8b269] font-futura">{i18n.t.footer.quickLinks}</p>
      <ul class="flex flex-col gap-3">
        {#each [
          { label: i18n.t.nav.home,    href: i18n.href('/') },
          { label: i18n.t.nav.about,   href: i18n.href('/about') },
          { label: i18n.t.nav.blog,    href: i18n.href('/news-and-blogs') },
          { label: i18n.t.nav.videos,  href: i18n.href('/videos') },
          { label: i18n.t.nav.faq,     href: i18n.href('/faq') },
          { label: i18n.t.nav.contact, href: i18n.href('/contact') },
        ] as link}
          <li>
            <a href={link.href}
              class="text-xs uppercase tracking-widest text-[rgba(240,237,232,0.5)] hover:text-[#d8b269] transition-colors font-futura">
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Practice Areas -->
    <div>
      <p class="text-xs uppercase tracking-[0.2em] mb-5 text-[#d8b269] font-futura">{i18n.t.footer.practiceAreas}</p>
      <ul class="flex flex-col gap-3">
        {#each areas as area}
          <li>
            <a
              href={area.href ?? i18n.href(`/practice-areas/${area.slug}`)}
              target={area.href ? '_blank' : undefined}
              class="text-xs uppercase tracking-widest text-[rgba(240,237,232,0.5)] hover:text-[#d8b269] transition-colors font-futura">
              {area.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Locations -->
    <div>
      <p class="text-xs uppercase tracking-[0.2em] mb-5 text-[#d8b269] font-futura">{i18n.t.footer.locations}</p>
      <div class="flex flex-col gap-5">
        {#each [
          { city: 'Birmingham, AL', addr: '231 22nd St S #203\nBirmingham AL 35233' },
          { city: 'Miami, FL',      addr: '201 S Biscayne Blvd #8910\nMiami FL 33131' },
          { city: 'Houston, TX',    addr: '12 Greenway Plz #1100\nHouston TX 77027' },
        ] as loc}
          <div>
            <p class="text-xs uppercase tracking-widest mb-1 text-[rgba(240,237,232,0.5)] font-futura">{loc.city}</p>
            <p class="text-xs leading-relaxed whitespace-pre-line text-[rgba(240,237,232,0.55)]">{loc.addr}</p>
          </div>
        {/each}
      </div>
    </div>

  </div>

  <!-- Bottom bar -->
  <div class="border-t border-[rgba(216,178,105,0.1)] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
    <p class="text-xs text-[rgba(240,237,232,0.55)]">© {new Date().getFullYear()} Counsel Hound. {i18n.t.footer.copyright}</p>
    <div class="flex items-center gap-4">
      <a href="/privacy-policy" class="text-xs text-[rgba(240,237,232,0.55)] hover:text-gold transition-colors">{i18n.t.footer.privacyPolicy}</a>
      <a href="/terms-of-service" class="text-xs text-[rgba(240,237,232,0.55)] hover:text-gold transition-colors">{i18n.t.footer.termsOfService}</a>
      <a href="/disclaimer" class="text-xs text-[rgba(240,237,232,0.55)] hover:text-gold transition-colors">{i18n.t.footer.disclaimerLink}</a>
      <!-- Cross-link to the firm's expat practice site (English-only, like the legal links) -->
      <a href="https://xpatlawyer.com" class="text-xs text-[rgba(240,237,232,0.55)] hover:text-gold transition-colors">Living abroad? xpatlawyer.com</a>
    </div>
    <p class="text-xs text-[rgba(240,237,232,0.6)]">{i18n.t.footer.disclaimer}</p>
  </div>
</footer>
