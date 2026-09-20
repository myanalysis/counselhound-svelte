<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { config } from '$lib/config';
  import { i18n } from '$lib/i18n/index.svelte';
  import { en } from '$lib/i18n/en';
  import ObfuscatedEmail from '$lib/components/ObfuscatedEmail.svelte';

  let el: HTMLElement;
  let visible = $state(false);
  let submitting = $state(false);
  let submitted = $state(false);
  let error = $state('');

  onMount(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  // Submitted value is always the canonical English case-type label, regardless of
  // display language, so the admin backend gets a consistent value.
  const caseTypesEn = en.contact.caseTypes;

  function formatPhone(e: Event) {
    const input = e.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    if (digits.length <= 3) {
      formatted = digits;
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    input.value = formatted;
  }
</script>

<section bind:this={el} id="contact" class="pt-20 pb-16 px-6 bg-white">
  <div class="max-w-6xl mx-auto">

    <div class="grid lg:grid-cols-2 gap-16">

      <!-- Info -->
      <div class="transition-all duration-700"
        class:opacity-0={!visible} class:opacity-100={visible}>

        <p class="text-xs tracking-[0.2em] uppercase mb-3 text-[#d8b269] font-futura">{i18n.t.contact.label}</p>
        <h2 class="mb-6 text-[#162d39] font-playfair font-bold text-section">{i18n.t.contact.h2}</h2>
        <div class="w-14 h-0.5 mb-8 bg-[#d8b269]"></div>

        <p class="text-sm leading-relaxed mb-10 text-gray-500">
          {i18n.t.contact.body}
        </p>

        <div class="flex flex-col gap-6 mb-10">
          {#each [
            { label: i18n.t.contact.phoneLabel, value: config.phoneDisplay, href: `tel:${config.phone}` },
            { label: i18n.t.contact.textLabel,  value: config.textDisplay,  href: `sms:${config.text}` },
          ] as c}
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 shrink-0 flex items-center justify-center border border-[rgba(216,178,105,0.3)] bg-[rgba(216,178,105,0.05)]">
                <span class="text-xs uppercase tracking-widest text-[#d8b269] font-futura">
                  {c.label[0]}
                </span>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest mb-0.5 text-gray-400 font-futura">{c.label}</p>
                <a href={c.href} class="text-sm text-[#162d39] hover:text-[#d8b269] transition-colors">{c.value}</a>
              </div>
            </div>
          {/each}
          <!-- Email obfuscated to prevent scraping -->
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 shrink-0 flex items-center justify-center border border-[rgba(216,178,105,0.3)] bg-[rgba(216,178,105,0.05)]">
              <span class="text-xs uppercase tracking-widest text-[#d8b269] font-futura">
                {i18n.t.contact.emailLabel[0]}
              </span>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest mb-0.5 text-gray-400 font-futura">{i18n.t.contact.emailLabel}</p>
              <ObfuscatedEmail email={config.email} class="text-sm text-[#162d39] hover:text-[#d8b269] transition-colors" />
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-gray-200">
          <p class="text-xs uppercase tracking-[0.2em] mb-5 text-[#d8b269] font-futura">{i18n.t.contact.locationsLabel}</p>
          <div class="flex flex-col gap-5">
            {#each [
              { city: 'Birmingham, AL', addr: '231 22nd St S #203, Birmingham AL 35233' },
              { city: 'Miami, FL',       addr: '201 S Biscayne Blvd #8910, Miami FL 33131' },
              { city: 'Houston, TX',     addr: '12 Greenway Plz #1100, Houston TX 77027' },
            ] as loc}
              <address class="flex gap-3 items-start not-italic">
                <span class="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#d8b269]"></span>
                <div>
                  <p class="text-xs font-bold uppercase tracking-widest mb-0.5 font-futura text-[#162d39]">{loc.city}</p>
                  <p class="text-xs text-gray-400 mb-1">{loc.addr}</p>
                  <a href="https://maps.google.com/?q={encodeURIComponent(loc.addr)}" target="_blank" rel="noopener"
                    class="text-xs text-[#d8b269] hover:text-[#162d39] transition-colors">
                    {i18n.t.contact.getDirections}
                  </a>
                </div>
              </address>
            {/each}
          </div>
        </div>

        <div class="mt-8">
          <iframe
            title="Counsel Hound — Birmingham, AL office location"
            src="https://www.google.com/maps?q=231+22nd+St+S+%23203+Birmingham+AL+35233&output=embed"
            width="100%"
            height="220"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>

      <!-- Form -->
      <div class="transition-all duration-700 bg-[#edeae3] p-8" style="transition-delay: 150ms;"
        class:opacity-0={!visible} class:opacity-100={visible}>

        {#if submitted}
          <div class="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
            <div class="w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#d8b269]">
              <svg class="w-7 h-7 text-[#d8b269]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-xl uppercase tracking-widest text-[#162d39] font-futura">{i18n.t.contact.form.successH}</h3>
            <p class="text-sm max-w-xs text-[rgba(22,45,57,0.6)]">{i18n.t.contact.form.successP}</p>
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
                  error = (result.data as any)?.error || i18n.t.contact.form.errorDefault;
                  await update();
                }
              };
            }}
          >
            <!-- Honeypot -->
            <div class="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
              <input type="text" name="honeypot" tabindex="-1" autocomplete="off" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-name" class="text-xs uppercase tracking-widest text-[#162d39] font-futura">{i18n.t.contact.form.name} *</label>
              <input id="contact-name" name="name" type="text" placeholder="Jane Smith" required
                class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#d8b269] transition-colors" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-email" class="text-xs uppercase tracking-widest text-[#162d39] font-futura">{i18n.t.contact.form.email} *</label>
              <input id="contact-email" name="email" type="email" placeholder="jane@email.com" required
                class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#d8b269] transition-colors" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-phone" class="text-xs uppercase tracking-widest text-[#162d39] font-futura">{i18n.t.contact.form.phone}</label>
              <input id="contact-phone" name="phone" type="tel" placeholder="(555) 000-0000"
                oninput={formatPhone}
                class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#d8b269] transition-colors" />
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-case" class="text-xs uppercase tracking-widest text-[#162d39] font-futura">{i18n.t.contact.form.caseType}</label>
              <select id="contact-case" name="caseType"
                class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#d8b269] transition-colors">
                <option value="">{i18n.t.contact.form.casePlaceholder}</option>
                {#each i18n.t.contact.caseTypes as ct, i}
                  <option value={caseTypesEn[i]}>{ct}</option>
                {/each}
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-message" class="text-xs uppercase tracking-widest text-[#162d39] font-futura">{i18n.t.contact.form.message} *</label>
              <textarea id="contact-message" name="message" rows="5" placeholder={i18n.t.contact.form.messagePlaceholder} required
                class="px-4 py-3 text-sm text-[#162d39] bg-white border border-gray-200 outline-none focus:border-[#d8b269] transition-colors resize-none"></textarea>
            </div>

            {#if error}
              <p class="text-sm text-red-400">{error}</p>
            {/if}

            <button type="submit" disabled={submitting}
              class="w-full py-4 mt-2 bg-[#d8b269] text-[#162d39] text-xs font-bold tracking-[0.15em] uppercase hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? i18n.t.contact.form.submitting : i18n.t.contact.form.submit}
            </button>

            <p class="text-xs text-center text-gray-400">
              {i18n.t.contact.form.confidential}
            </p>
          </form>
        {/if}
      </div>

    </div>
  </div>
</section>

