<svelte:head><title>Site Map — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <h1 class="text-2xl font-bold text-navy mb-2">Site Map</h1>
  <p class="text-gray-400 text-sm mb-8">All public routes on counselhound.com</p>

  <div class="flex flex-col gap-8 max-w-2xl">
    <section>
      <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Main</h2>
      <div class="bg-white border border-gray-100 rounded overflow-hidden">
        {#each [
          { label: 'Home',       path: '/' },
          { label: 'About',      path: '/about' },
          { label: 'Blog',       path: '/news-and-blogs' },
          { label: 'Resources',  path: '/resources' },
          { label: 'Contact',    path: '/contact' },
        ] as route}
          <div class="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0">
            <span class="text-sm font-medium text-navy">{route.label}</span>
            <a href={route.path} target="_blank"
              class="text-xs text-gray-400 font-mono hover:text-navy transition-colors flex items-center gap-1">
              {route.path}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        {/each}
      </div>
    </section>

    <section>
      <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Practice Areas</h2>
      <div class="bg-white border border-gray-100 rounded overflow-hidden">
        {#each [
          { label: 'Abuse Litigation',       slug: 'abuse-litigation' },
          { label: 'Personal Injury',        slug: 'personal-injury' },
          { label: 'Consumer Fraud',         slug: 'consumer-fraud' },
          { label: 'Defective Products',     slug: 'defective-products' },
          { label: 'Medical Injury',         slug: 'medical-injury' },
          { label: 'Toxic Torts',            slug: 'toxic-torts' },
          { label: 'Whistleblower Protection', slug: 'whistleblower-protection' },
        ] as area}
          {@const path = `/practice-areas/${area.slug}`}
          <div class="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0">
            <span class="text-sm font-medium text-navy">{area.label}</span>
            <a href={path} target="_blank"
              class="text-xs text-gray-400 font-mono hover:text-navy transition-colors flex items-center gap-1">
              {path}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        {/each}
      </div>
    </section>

    <section>
      <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Special Pages</h2>
      <div class="bg-white border border-gray-100 rounded overflow-hidden">
        {#each [
          { label: 'Consumer Safety',  path: '/counsel-hound-consumer-safety' },
          { label: 'Medical Safety',   path: '/counsel-hound-medical-safety' },
        ] as route}
          <div class="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0">
            <span class="text-sm font-medium text-navy">{route.label}</span>
            <a href={route.path} target="_blank"
              class="text-xs text-gray-400 font-mono hover:text-navy transition-colors flex items-center gap-1">
              {route.path}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        {/each}
      </div>
    </section>

    <section>
      <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Legal</h2>
      <div class="bg-white border border-gray-100 rounded overflow-hidden">
        {#each [
          { label: 'Privacy Policy', path: '/privacy-policy' },
          { label: 'Terms',          path: '/terms' },
        ] as route}
          <div class="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0">
            <span class="text-sm font-medium text-navy">{route.label}</span>
            <a href={route.path} target="_blank"
              class="text-xs text-gray-400 font-mono hover:text-navy transition-colors flex items-center gap-1">
              {route.path}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
