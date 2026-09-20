<script lang="ts">
  import { page } from '$app/state';

  let { children } = $props();

  const isLogin = $derived(page.url.pathname === '/admin/login');

  const nav = [
    {
      label: 'Content',
      items: [
        { label: 'Dashboard',     href: '/admin',               exact: true },
        { label: 'Blog Posts',    href: '/admin/posts' },
        { label: 'Testimonials',  href: '/admin/testimonials' },
        { label: 'Contacts',      href: '/admin/contacts' },
        { label: 'Referrals',     href: '/admin/referrals' },
        { label: 'Case Results',  href: '/admin/case-results' },
      ],
    },
    {
      label: 'Tools',
      items: [
        { label: 'Send Email',    href: '/admin/email' },
        { label: 'Site Map',      href: '/admin/sitemap' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { label: 'Users',         href: '/admin/users' },
      ],
    },
  ];

  function isActive(href: string, exact = false): boolean {
    if (exact) return page.url.pathname === href;
    return page.url.pathname.startsWith(href);
  }
</script>

{#if isLogin}
  {@render children()}
{:else}
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-56 shrink-0 bg-navy flex flex-col">
      <div class="px-6 py-5 border-b border-white/10">
        <span class="text-white text-sm font-bold tracking-wider uppercase">Counsel Hound</span>
        <span class="block text-gold text-xs uppercase tracking-widest mt-0.5">Admin</span>
      </div>

      <nav class="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        {#each nav as section}
          <div>
            <p class="px-3 mb-1 text-[10px] uppercase tracking-widest text-white/30 font-semibold">{section.label}</p>
            {#each section.items as item}
              <a
                href={item.href}
                class="flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-colors
                  {isActive(item.href, item.exact ?? false)
                    ? 'bg-gold/20 text-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'}"
              >
                {#if item.href === '/admin' && (item.exact ?? false)}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                {:else if item.href === '/admin/contacts'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                {:else if item.href === '/admin/referrals'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                {:else if item.href === '/admin/attorneys'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                {:else if item.href === '/admin/case-results'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                {:else if item.href === '/admin/posts'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                {:else if item.href === '/admin/testimonials'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                  </svg>
                {:else if item.href === '/admin/email'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                {:else if item.href === '/admin/sitemap'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                {:else if item.href === '/admin/users'}
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                {/if}
                {item.label}
              </a>
            {/each}
          </div>
        {/each}
      </nav>

      <div class="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
        <a href="/" target="_blank"
          class="flex items-center gap-2.5 px-3 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          View Site
        </a>
        <form method="POST" action="/admin?/logout">
          <button type="submit"
            class="w-full flex items-center gap-2.5 px-3 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Sign Out
          </button>
        </form>
      </div>
    </aside>

    <main class="flex-1 min-w-0 overflow-auto">
      {@render children()}
    </main>
  </div>
{/if}
