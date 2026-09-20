<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const statusColors: Record<string, string> = {
    new:       'bg-gold/15 text-yellow-800',
    followup:  'bg-blue-100 text-blue-800',
    reviewed:  'bg-green-100 text-green-800',
    closed:    'bg-gray-100 text-gray-500',
  };
</script>

<svelte:head><title>Dashboard — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <h1 class="text-2xl font-bold text-navy mb-1">Dashboard</h1>

  <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
    <div class="bg-white border border-gray-100 rounded p-5">
      <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">Contacts</p>
      <p class="text-3xl font-bold text-navy">{data.counts.contacts}</p>
      {#if data.counts.newContacts > 0}
        <p class="text-xs text-gold font-semibold mt-1">{data.counts.newContacts} new</p>
      {/if}
    </div>
    <div class="bg-white border border-gray-100 rounded p-5">
      <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">Blog Posts</p>
      <p class="text-3xl font-bold text-navy">{data.counts.posts}</p>
    </div>
    <div class="bg-white border border-gray-100 rounded p-5">
      <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">Case Results</p>
      <p class="text-3xl font-bold text-navy">{data.counts.caseResults}</p>
    </div>
    <div class="bg-white border border-gray-100 rounded p-5">
      <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">Testimonials</p>
      <p class="text-3xl font-bold text-navy">{data.counts.testimonials}</p>
    </div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
    <div class="xl:col-span-2">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">Recent Contacts</h2>
      <div class="bg-white border border-gray-100 rounded overflow-hidden">
        {#if data.recentContacts.length === 0}
          <p class="px-6 py-8 text-sm text-gray-400 text-center">No contacts yet.</p>
        {:else}
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50">
                <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Name</th>
                <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Case Type</th>
                <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Status</th>
                <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {#each data.recentContacts as c}
                <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3">
                    <p class="font-medium text-navy">{c.first_name} {c.last_name}</p>
                    <p class="text-gray-400 text-xs">{c.email}</p>
                  </td>
                  <td class="px-5 py-3 text-gray-500 hidden md:table-cell">{c.case_type || '—'}</td>
                  <td class="px-5 py-3">
                    <span class="text-xs px-2 py-0.5 rounded-full font-semibold {statusColors[String(c.status)] ?? 'bg-gray-100 text-gray-500'}">
                      {c.status}
                    </span>
                  </td>
                  <td class="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{formatDate(String(c.created_at))}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>
    </div>

    <div>
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">Quick Actions</h2>
      <div class="flex flex-col gap-2">
        <a href="/admin/contacts"
          class="px-4 py-3 bg-white border border-gray-100 rounded text-sm font-semibold text-navy hover:border-navy transition-colors flex items-center justify-between">
          View Contacts
          <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="/admin/posts"
          class="px-4 py-3 bg-navy text-white rounded text-sm font-semibold hover:bg-navy/90 transition-colors flex items-center justify-between">
          New Blog Post
          <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="/admin/case-results"
          class="px-4 py-3 bg-white border border-gray-100 rounded text-sm font-semibold text-navy hover:border-navy transition-colors flex items-center justify-between">
          Add Case Result
          <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="/admin/email"
          class="px-4 py-3 bg-white border border-gray-100 rounded text-sm font-semibold text-navy hover:border-navy transition-colors flex items-center justify-between">
          Send Email
          <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
