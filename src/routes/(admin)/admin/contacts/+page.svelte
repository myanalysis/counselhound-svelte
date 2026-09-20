<script lang="ts">
  import type { PageData } from './$types';
  import type { Contact } from './+page.server';

  let { data }: { data: PageData } = $props();

  type Tab = 'all' | 'new' | 'followup' | 'reviewed' | 'closed';
  let activeTab = $state<Tab>('all');
  let expanded = $state<number | null>(null);

  const filtered = $derived(
    activeTab === 'all'
      ? (data.contacts as Contact[])
      : (data.contacts as Contact[]).filter(c => c.status === activeTab)
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: 'all',      label: 'All' },
    { id: 'new',      label: 'New' },
    { id: 'followup', label: 'Follow Up' },
    { id: 'reviewed', label: 'Reviewed' },
    { id: 'closed',   label: 'Closed' },
  ];

  const badgeClass: Record<string, string> = {
    new:       'bg-gold/15 text-yellow-800',
    followup:  'bg-blue-100 text-blue-800',
    reviewed:  'bg-green-100 text-green-800',
    closed:    'bg-gray-100 text-gray-500',
  };

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function count(status: Tab) {
    if (status === 'all') return (data.contacts as Contact[]).length;
    return (data.contacts as Contact[]).filter(c => c.status === status).length;
  }
</script>

<svelte:head><title>Contacts — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h1 class="text-2xl font-bold text-navy">Contacts</h1>
      <p class="text-gray-400 text-sm mt-1">{(data.contacts as Contact[]).length} total</p>
    </div>
  </div>

  <p class="text-sm text-gray-500 mb-6 max-w-2xl">People who filled out the contact form on your website. Each one is a potential client. <strong class="text-gray-700">New</strong> — just submitted. <strong class="text-gray-700">Follow Up</strong> — reached out, no reply yet. <strong class="text-gray-700">Reviewed</strong> — you've evaluated the case. <strong class="text-gray-700">Closed</strong> — done.</p>

  <div class="flex gap-1 mb-6 border-b border-gray-200">
    {#each tabs as tab}
      <button
        onclick={() => { activeTab = tab.id; expanded = null; }}
        class="px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px
          {activeTab === tab.id
            ? 'border-navy text-navy'
            : 'border-transparent text-gray-400 hover:text-navy'}">
        {tab.label}
        <span class="ml-1.5 text-xs text-gray-400">{count(tab.id)}</span>
      </button>
    {/each}
  </div>

  {#if filtered.length === 0}
    <p class="text-sm text-gray-400 text-center py-16">No contacts in this category.</p>
  {:else}
    <div class="flex flex-col gap-2">
      {#each filtered as contact}
        <div class="bg-white border border-gray-100 rounded overflow-hidden">
          <button
            type="button"
            onclick={() => expanded = expanded === contact.id ? null : contact.id}
            class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-4">
              <div>
                <p class="font-semibold text-navy text-sm">{contact.first_name} {contact.last_name}</p>
                <p class="text-gray-400 text-xs">{contact.email} {contact.phone ? '· ' + contact.phone : ''}</p>
              </div>
              {#if contact.case_type}
                <span class="text-xs text-gray-500 hidden md:block">{contact.case_type}</span>
              {/if}
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs px-2 py-0.5 rounded-full font-semibold {badgeClass[contact.status] ?? 'bg-gray-100 text-gray-500'}">
                {contact.status}
              </span>
              <span class="text-gray-300 text-xs hidden md:block">{formatDate(contact.created_at)}</span>
              <svg class="w-4 h-4 text-gray-300 transition-transform {expanded === contact.id ? 'rotate-180' : ''}"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>

          {#if expanded === contact.id}
            <div class="px-5 pb-5 border-t border-gray-100">
              {#if contact.message}
                <div class="mt-4 mb-5">
                  <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Message</p>
                  <p class="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                </div>
              {/if}

              <div class="max-w-md flex flex-col gap-3">
                <form method="POST" action="?/updateStatus" class="flex flex-col gap-3">
                  <input type="hidden" name="id" value={contact.id} />
                  <div class="flex flex-col gap-1">
                    <label for="status-{contact.id}" class="text-xs uppercase tracking-widest text-gray-400">Status</label>
                    <select id="status-{contact.id}" name="status"
                      class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors">
                      <option value="new"       selected={contact.status === 'new'}>New</option>
                      <option value="followup"  selected={contact.status === 'followup'}>Follow Up</option>
                      <option value="reviewed"  selected={contact.status === 'reviewed'}>Reviewed</option>
                      <option value="closed"    selected={contact.status === 'closed'}>Closed</option>
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label for="notes-{contact.id}" class="text-xs uppercase tracking-widest text-gray-400">Notes</label>
                    <textarea id="notes-{contact.id}" name="notes" rows="3"
                      class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors resize-none"
                      >{contact.notes}</textarea>
                  </div>
                  <button type="submit"
                    class="self-start px-5 py-2 bg-navy text-white text-xs font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
                    Save
                  </button>
                </form>
                <form method="POST" action="?/delete"
                  onsubmit={(e) => { if (!confirm('Delete this contact?')) e.preventDefault(); }}>
                  <input type="hidden" name="id" value={contact.id} />
                  <button type="submit"
                    class="px-5 py-2 text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">
                    Delete contact
                  </button>
                </form>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
