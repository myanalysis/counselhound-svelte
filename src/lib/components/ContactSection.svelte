<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { config } from '$lib/config';

  let el: HTMLElement;
  let visible = $state(false);
  let submitting = $state(false);
  let submitted = $state(false);
  let error = $state('');

  type Location = { city: string; addr: string; mapUrl: string; embedUrl: string };
  let mapOpen = $state(false);
  let activeLocation = $state<Location | null>(null);

  const locations: Location[] = [
    {
      city: 'Birmingham, AL',
      addr: '231 22nd St S #203, Birmingham AL 35233',
      mapUrl: 'https://www.openstreetmap.org/search?query=231+22nd+St+S+Birmingham+AL+35233',
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-86.8150%2C33.5050%2C-86.7950%2C33.5150&layer=mapnik&marker=33.5100%2C-86.8050',
    },
    {
      city: 'Miami, FL',
      addr: '201 S Biscayne Blvd #8910, Miami FL 33131',
      mapUrl: 'https://www.openstreetmap.org/search?query=201+S+Biscayne+Blvd+Miami+FL+33131',
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-80.1950%2C25.7650%2C-80.1750%2C25.7750&layer=mapnik&marker=25.7700%2C-80.1850',
    },
    {
      city: 'Houston, TX',
      addr: '12 Greenway Plz #1100, Houston TX 77027',
      mapUrl: 'https://www.openstreetmap.org/search?query=12+Greenway+Plaza+Houston+TX+77027',
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-95.4650%2C29.7450%2C-95.4450%2C29.7550&layer=mapnik&marker=29.7500%2C-95.4550',
    },
  ];

  function openMap(loc: Location) {
    activeLocation = loc;
    mapOpen = true;
  }

  function closeMap() {
    mapOpen = false;
    activeLocation = null;
  }

  onMount(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeMap(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const caseTypes = [
    'Abuse Litigation', 'Personal Injury', 'Consumer Fraud', 'Defective Products',
    'Medical Injury', 'Toxic Torts', 'Whistleblower', 'Investment Fraud', 'Other',
  ];
</script>

<section bind:this={el} id="contact" class="pt-20 pb-10 px-6 bg-white">
  <div class="max-w-6xl mx-auto">

    <div class="grid lg:grid-cols-2 gap-16">

      <!-- Info -->
      <div class="transition-all duration-700"
        class:opacity-0={!visible} class:opacity-100={visible}>

        <p class="text-xs tracking-[0.2em] uppercase mb-3 text-[#C9A84C] font-['Futura']">Get In Touch</p>
        <h2 class="mb-6 text-[#162d39] font-['Playfair_Display'] font-bold" style="font-size: clamp(1.8rem, 3vw, 2.4rem);">Got Questions?</h2>
        <div class="w-14 h-0.5 mb-8 bg-[#C9A84C]"></div>

        <p class="text-sm leading-relaxed mb-10 text-gray-500">
          Whether you're seeking advice or ready to be connected with a qualified attorney,
          our team is ready to help. All inquiries are kept strictly confidential.
        </p>

        <div class="flex flex-col gap-6 mb-10">
          {#each [
            { label: 'Phone', value: config.phoneDisplay, href: `tel:${config.phone}` },
            { label: 'Text',  value: config.textDisplay,  href: `sms:${config.text}` },
            { label: 'Email', value: config.email,        href: `mailto:${config.email}` },
          ] as c}
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 shrink-0 flex items-center justify-center border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.05)]">
                <span class="text-xs uppercase tracking-widest text-[#C9A84C] font-['Futura']">
                  {c.label[0]}
                </span>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest mb-0.5 text-gray-400 font-['Futura']">{c.label}</p>
                <a href={c.href} class="text-sm text-[#162d39] hover:text-[#C9A84C] transition-colors">{c.value}</a>
              </div>
            </div>
          {/each}
        </div>

        <div class="pt-8 border-t border-gray-200">
          <p class="text-xs uppercase tracking-[0.2em] mb-5 text-[#C9A84C] font-['Futura']">Our Locations</p>
          <div class="flex flex-col gap-3">
            {#each locations as loc}
              <button
                type="button"
                onclick={() => openMap(loc)}
                class="flex gap-3 items-start text-left group w-full hover:bg-[rgba(201,168,76,0.05)] transition-colors duration-150 p-2 -mx-2 rounded-sm"
              >
                <span class="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#C9A84C] group-hover:scale-125 transition-transform duration-150"></span>
                <div class="flex-1">
                  <p class="text-xs uppercase tracking-widest mb-0.5 text-[#162d39] font-['Futura'] group-hover:text-[#C9A84C] transition-colors duration-150">{loc.city}</p>
                  <p class="text-xs text-gray-400">{loc.addr}</p>
                </div>
                <svg class="w-3.5 h-3.5 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                </svg>
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="transition-all duration-700 bg-[#edeae3] p-8" style="transition-delay: 150ms;"
        class:opacity-0={!visible} class:opacity-100={visible}>

        {#if submitted}
          <div class="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
            <div class="w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#C9A84C]">
              <svg class="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-xl uppercase tracking-widest text-[#162d39] font-['Futura']">Message Sent</h3>
            <p class="text-sm max-w-xs text-[rgba(240,237,232,0.6)]">We'll respond within one business day. Check your inbox for a confirmation.</p>
          </div>
        {:else}
          <form
            method="POST"
            action="/contact"
            class="flex flex-col gap-4"
            use:enhance={() => {
              submitting = true;
              return async ({ result, update }) => {
                submitting = false;
                if (result.type === 'success') {
                  submitted = true;
                } else if (result.type === 'failure') {
                  error = (result.data as any)?.error || 'Something went wrong.';
                  await update();
                }
              };
            }}
          >
            <!-- Honeypot -->
            <div class="absolute -left-2499.75 opacity-0 pointer-events-none" aria-hidden="true">
              <input type="text" name="honeypot" tabindex="-1" autocomplete="off" />
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label for="contact-name" class="text-xs uppercase tracking-widest text-[#162d39] font-['Futura']">Full Name *</label>
                <input id="contact-name" name="name" type="text" placeholder="Jane Smith" required
                  class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#C9A84C] transition-colors" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="contact-email" class="text-xs uppercase tracking-widest text-[#162d39] font-['Futura']">Email *</label>
                <input id="contact-email" name="email" type="email" placeholder="jane@email.com" required
                  class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#C9A84C] transition-colors" />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label for="contact-phone" class="text-xs uppercase tracking-widest text-[#162d39] font-['Futura']">Phone</label>
                <input id="contact-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000"
                  class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#C9A84C] transition-colors" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="contact-case" class="text-xs uppercase tracking-widest text-[#162d39] font-['Futura']">Case Type</label>
                <select id="contact-case" name="caseType"
                  class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#C9A84C] transition-colors">
                  <option value="">Select…</option>
                  {#each caseTypes as ct}
                    <option value={ct}>{ct}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-message" class="text-xs uppercase tracking-widest text-[#162d39] font-['Futura']">Message *</label>
              <textarea id="contact-message" name="message" rows="5" placeholder="Briefly describe your situation…" required
                class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#C9A84C] transition-colors resize-none"></textarea>
            </div>

            {#if error}
              <p class="text-sm text-red-400">{error}</p>
            {/if}

            <button type="submit" disabled={submitting}
              class="w-full py-4 mt-2 bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold tracking-[0.15em] uppercase hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? 'Sending…' : 'Send Message'}
            </button>

            <p class="text-xs text-center text-gray-400">
              Your information is always kept confidential.
            </p>
          </form>
        {/if}
      </div>

    </div>
  </div>
</section>

<!-- Map Modal -->
{#if mapOpen && activeLocation}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Office location map"
    tabindex="-1"
    class="fixed inset-0 z-99999 flex items-center justify-center bg-black/70 px-4"
    onclick={closeMap}
    onkeydown={(e) => e.key === 'Escape' && closeMap()}
  >
    <div
      class="bg-[#0D1B2A] w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden"
      onclick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <p class="text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] font-['Futura'] mb-0.5">Our Location</p>
          <p class="text-white text-sm font-bold font-['Futura']">{activeLocation.city}</p>
          <p class="text-white/50 text-xs mt-0.5">{activeLocation.addr}</p>
        </div>
        <button
          type="button"
          onclick={closeMap}
          class="text-white/40 hover:text-white transition-colors text-2xl leading-none ml-6"
          aria-label="Close"
        >&times;</button>
      </div>

      <!-- Map — OpenStreetMap via Nominatim bbox, no API key required -->
      <div class="relative bg-[#162d39]" style="height: 380px;">
        <iframe
          title="Office location — {activeLocation.city}"
          width="100%"
          height="100%"
          style="border:0;"
          loading="lazy"
          src={activeLocation.embedUrl}
        ></iframe>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-3 border-t border-white/10">
        <p class="text-white/30 text-[11px]">Map data © OpenStreetMap contributors</p>
        <a
          href={activeLocation.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-[11px] text-[#C9A84C] font-bold uppercase tracking-widest hover:brightness-125 transition-all font-['Futura']"
        >Open in Maps &rarr;</a>
      </div>
    </div>
  </div>
{/if}
