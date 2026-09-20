<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import type { Referral } from './+page.server';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showCreate = $state(false);
  let expandedId = $state<number | null>(null);
  let editingId  = $state<number | null>(null);
  let editStatus = $state('');
  let editNotes  = $state('');

  function startEdit(r: Referral) {
    editingId  = r.id;
    editStatus = r.status;
    editNotes  = r.notes;
  }

  function cancelEdit() { editingId = null; }

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const statusColors: Record<string, string> = {
    new:    'bg-gold/15 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    closed: 'bg-gray-100 text-gray-500',
  };

  const filters = ['all', 'new', 'active', 'closed'];
</script>

<svelte:head><title>Referrals — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h1 class="text-2xl font-bold text-navy">Referrals</h1>
      <p class="text-gray-400 text-sm mt-1">
        {data.counts.total} total &nbsp;·&nbsp;
        <span class="text-yellow-700 font-medium">{data.counts.new} new</span>
      </p>
    </div>
    <button
      onclick={() => showCreate = !showCreate}
      class="px-4 py-2 bg-navy text-white text-sm font-semibold rounded hover:bg-navy/90 transition-colors">
      + New Referral
    </button>
  </div>

  <p class="text-sm text-gray-500 mb-6 max-w-2xl">Cases referred to attorneys in your network. Use this to track where each case went and whether it closed. <strong class="text-gray-700">New</strong> — just came in. <strong class="text-gray-700">Active</strong> — attorney is working it. <strong class="text-gray-700">Closed</strong> — resolved.</p>

  <!-- Create form -->
  {#if showCreate}
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5">New Referral</h2>
      {#if form?.error}
        <p class="text-red-600 text-sm mb-4">{form.error}</p>
      {/if}
      <form method="POST" action="?/create" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <p class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Referring Attorney</p>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="referring_name">Name *</label>
          <input name="referring_name" id="referring_name" required class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="referring_firm">Firm</label>
          <input name="referring_firm" id="referring_firm" class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="referring_email">Email</label>
          <input name="referring_email" id="referring_email" type="email" class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="referring_phone">Phone</label>
          <input name="referring_phone" id="referring_phone" class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>

        <div class="md:col-span-2 mt-2">
          <p class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Client</p>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="client_name">Client Name *</label>
          <input name="client_name" id="client_name" required class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="client_phone">Client Phone</label>
          <input name="client_phone" id="client_phone" class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="client_email">Client Email</label>
          <input name="client_email" id="client_email" type="email" class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="matter">Matter / Case Type</label>
          <input name="matter" id="matter" class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>

        <div class="md:col-span-2 flex gap-3 mt-2">
          <button type="submit" class="px-5 py-2 bg-navy text-white text-sm font-semibold rounded hover:bg-navy/90 transition-colors">
            Save Referral
          </button>
          <button type="button" onclick={() => showCreate = false}
            class="px-5 py-2 border border-gray-200 text-sm text-gray-500 rounded hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Filters -->
  <div class="flex gap-2 mb-6">
    {#each filters as f}
      <a href="?status={f}"
        class="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-widest transition-colors
          {(data.filter ?? 'all') === f
            ? 'bg-navy text-white'
            : 'bg-white border border-gray-200 text-gray-500 hover:border-navy'}">
        {f} {f === 'new' ? `(${data.counts.new})` : ''}
      </a>
    {/each}
  </div>

  <!-- Table -->
  <div class="bg-white border border-gray-100 rounded overflow-hidden">
    {#if data.referrals.length === 0}
      <p class="px-6 py-12 text-sm text-gray-400 text-center">No referrals yet.</p>
    {:else}
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Client</th>
            <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Referred By</th>
            <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden lg:table-cell">Matter</th>
            <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Status</th>
            <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Date</th>
            <th class="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {#each data.referrals as r}
            <tr class="border-b border-gray-50">
              <td class="px-5 py-3">
                <p class="font-medium text-navy">{r.client_name}</p>
                <p class="text-gray-400 text-xs">{r.client_phone || r.client_email || '—'}</p>
              </td>
              <td class="px-5 py-3 hidden md:table-cell">
                <p class="text-gray-700">{r.referring_name}</p>
                <p class="text-gray-400 text-xs">{r.referring_firm || '—'}</p>
              </td>
              <td class="px-5 py-3 text-gray-500 hidden lg:table-cell">{r.matter || '—'}</td>
              <td class="px-5 py-3">
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold {statusColors[r.status] ?? 'bg-gray-100 text-gray-500'}">
                  {r.status}
                </span>
              </td>
              <td class="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{formatDate(r.created_at)}</td>
              <td class="px-5 py-3">
                <button onclick={() => expandedId = expandedId === r.id ? null : r.id}
                  class="text-xs text-navy hover:text-gold transition-colors font-medium">
                  {expandedId === r.id ? 'Close' : 'View'}
                </button>
              </td>
            </tr>

            {#if expandedId === r.id}
              <tr class="bg-gray-50">
                <td colspan="6" class="px-5 py-5">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Referring Attorney</p>
                      <p class="text-sm font-medium text-navy">{r.referring_name}</p>
                      <p class="text-xs text-gray-500">{r.referring_firm}</p>
                      <p class="text-xs text-gray-500">{r.referring_email}</p>
                      <p class="text-xs text-gray-500">{r.referring_phone}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Client</p>
                      <p class="text-sm font-medium text-navy">{r.client_name}</p>
                      <p class="text-xs text-gray-500">{r.client_email}</p>
                      <p class="text-xs text-gray-500">{r.client_phone}</p>
                      <p class="text-xs text-gray-400 mt-1">{r.matter}</p>
                    </div>
                  </div>

                  {#if editingId === r.id}
                    <form method="POST" action="?/update" class="flex flex-col gap-3">
                      <input type="hidden" name="id" value={r.id}/>
                      <div class="flex gap-3 items-end">
                        <div class="flex flex-col gap-1">
                          <label class="text-xs text-gray-500" for="status">Status</label>
                          <select name="status" id="status" bind:value={editStatus}
                            class="border border-gray-200 rounded px-3 py-2 text-sm">
                            <option value="new">New</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                          <label class="text-xs text-gray-500" for="notes">Notes</label>
                          <input name="notes" id="notes" bind:value={editNotes}
                            class="border border-gray-200 rounded px-3 py-2 text-sm w-full"/>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button type="submit" class="px-4 py-1.5 bg-navy text-white text-xs font-semibold rounded hover:bg-navy/90 transition-colors">
                          Save
                        </button>
                        <button type="button" onclick={cancelEdit}
                          class="px-4 py-1.5 border border-gray-200 text-xs text-gray-500 rounded hover:border-gray-400 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  {:else}
                    {#if r.notes}
                      <p class="text-sm text-gray-600 italic mb-3">"{r.notes}"</p>
                    {/if}
                    <div class="flex gap-2">
                      <button onclick={() => startEdit(r)}
                        class="px-3 py-1.5 bg-white border border-gray-200 text-xs text-navy rounded hover:border-navy transition-colors font-medium">
                        Update Status
                      </button>
                      <form method="POST" action="?/delete"
                        onsubmit={(e) => { if (!confirm('Delete this referral?')) e.preventDefault(); }}>
                        <input type="hidden" name="id" value={r.id}/>
                        <button type="submit"
                          class="px-3 py-1.5 bg-white border border-red-200 text-xs text-red-500 rounded hover:bg-red-50 transition-colors font-medium">
                          Delete
                        </button>
                      </form>
                    </div>
                  {/if}
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>
