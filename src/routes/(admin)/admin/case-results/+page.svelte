<script lang="ts">
  import type { PageData } from './$types';
  import type { CaseResult } from './+page.server';

  let { data }: { data: PageData } = $props();

  let showCreate = $state(false);
  let editing = $state<CaseResult | null>(null);

  const CATEGORIES = [
    'Personal Injury',
    'Consumer Fraud',
    'Medical Malpractice',
    'Defective Products',
    'Toxic Torts',
    'Abuse Litigation',
    'Whistleblower',
  ];

  function resetCreate() {
    showCreate = false;
  }
</script>

<svelte:head><title>Case Results — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h1 class="text-2xl font-bold text-navy">Case Results</h1>
      <p class="text-gray-400 text-sm mt-1">{(data.results as CaseResult[]).length} results</p>
    </div>
    <button
      onclick={() => { showCreate = !showCreate; editing = null; }}
      class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
      + New Result
    </button>
  </div>

  <p class="text-sm text-gray-500 mb-6 max-w-2xl">Settlement amounts and verdicts that appear on your website. Real numbers only — no placeholders. These build credibility with potential clients.</p>

  {#if showCreate}
    <div class="bg-white border border-gray-100 rounded p-6 mb-6">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">New Case Result</h2>
      <form method="POST" action="?/create" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="c-amount" class="text-xs uppercase tracking-widest text-gray-400">Amount *</label>
          <input id="c-amount" name="amount" type="text" required placeholder="$1,200,000"
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="c-category" class="text-xs uppercase tracking-widest text-gray-400">Category</label>
          <select id="c-category" name="category" class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors">
            <option value="">— select —</option>
            {#each CATEGORIES as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <label for="c-description" class="text-xs uppercase tracking-widest text-gray-400">Description</label>
          <input id="c-description" name="description" type="text" placeholder="Medical negligence in emergency setting"
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="c-year" class="text-xs uppercase tracking-widest text-gray-400">Year</label>
          <input id="c-year" name="year" type="number" placeholder="2024" min="1990" max="2099"
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="c-sort" class="text-xs uppercase tracking-widest text-gray-400">Sort Order</label>
          <input id="c-sort" name="sort_order" type="number" value="0"
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="md:col-span-2 flex gap-3">
          <button type="submit"
            class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
            Save
          </button>
          <button type="button" onclick={resetCreate}
            class="px-6 py-2.5 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  {/if}

  <div class="bg-white border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-100 bg-gray-50">
          <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Amount</th>
          <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Description</th>
          <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden lg:table-cell">Category</th>
          <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden lg:table-cell">Year</th>
          <th class="text-left px-5 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Status</th>
          <th class="px-5 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {#each data.results as result}
          {#if editing?.id === result.id}
            <tr class="border-b border-gray-100 bg-blue-50/30">
              <td colspan="6" class="px-5 py-4">
                <form method="POST" action="?/update" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="hidden" name="id" value={result.id} />
                  <div class="flex flex-col gap-1">
                    <label for="e-amount-{result.id}" class="text-xs uppercase tracking-widest text-gray-400">Amount *</label>
                    <input id="e-amount-{result.id}" name="amount" type="text" required value={result.amount}
                      class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label for="e-category-{result.id}" class="text-xs uppercase tracking-widest text-gray-400">Category</label>
                    <select id="e-category-{result.id}" name="category" class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors">
                      <option value="">— select —</option>
                      {#each CATEGORIES as cat}
                        <option value={cat} selected={result.category === cat}>{cat}</option>
                      {/each}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1 md:col-span-2">
                    <label for="e-desc-{result.id}" class="text-xs uppercase tracking-widest text-gray-400">Description</label>
                    <input id="e-desc-{result.id}" name="description" type="text" value={result.description}
                      class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label for="e-year-{result.id}" class="text-xs uppercase tracking-widest text-gray-400">Year</label>
                    <input id="e-year-{result.id}" name="year" type="number" value={result.year ?? ''}
                      class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label for="e-sort-{result.id}" class="text-xs uppercase tracking-widest text-gray-400">Sort Order</label>
                    <input id="e-sort-{result.id}" name="sort_order" type="number" value={result.sort_order}
                      class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
                  </div>
                  <div class="md:col-span-2 flex gap-3">
                    <button type="submit"
                      class="px-5 py-2 bg-navy text-white text-xs font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
                      Save
                    </button>
                    <button type="button" onclick={() => editing = null}
                      class="px-5 py-2 border border-gray-200 text-xs text-gray-500 hover:border-gray-400 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </td>
            </tr>
          {:else}
            <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td class="px-5 py-3 font-semibold text-navy">{result.amount}</td>
              <td class="px-5 py-3 text-gray-500 hidden md:table-cell">{result.description || '—'}</td>
              <td class="px-5 py-3 text-gray-400 text-xs hidden lg:table-cell">{result.category || '—'}</td>
              <td class="px-5 py-3 text-gray-400 text-xs hidden lg:table-cell">{result.year || '—'}</td>
              <td class="px-5 py-3">
                <form method="POST" action="?/toggle">
                  <input type="hidden" name="id" value={result.id} />
                  <input type="hidden" name="is_published" value={result.is_published ? '0' : '1'} />
                  <button type="submit"
                    class="text-xs px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer
                      {result.is_published ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}">
                    {result.is_published ? 'Live' : 'Hidden'}
                  </button>
                </form>
              </td>
              <td class="px-5 py-3">
                <div class="flex items-center gap-2 justify-end">
                  <button type="button" onclick={() => editing = { ...result }}
                    class="px-3 py-1 text-xs font-semibold rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-all">
                    Edit
                  </button>
                  <form method="POST" action="?/delete"
                    onsubmit={(e) => { if (!confirm('Delete this result?')) e.preventDefault(); }}>
                    <input type="hidden" name="id" value={result.id} />
                    <button type="submit"
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          {/if}
        {/each}
        {#if (data.results as CaseResult[]).length === 0}
          <tr>
            <td colspan="6" class="px-5 py-12 text-sm text-gray-400 text-center">No case results yet.</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
