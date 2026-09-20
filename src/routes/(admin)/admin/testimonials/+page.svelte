<script lang="ts">
  import type { PageData } from './$types';
  import type { Testimonial } from './+page.server';

  let { data }: { data: PageData } = $props();

  let showCreate = $state(false);
  let editing = $state<Testimonial | null>(null);
</script>

<svelte:head><title>Testimonials — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h1 class="text-2xl font-bold text-navy">Testimonials</h1>
      <p class="text-gray-400 text-sm mt-1">{(data.testimonials as Testimonial[]).length} total</p>
    </div>
    <button
      onclick={() => { showCreate = !showCreate; editing = null; }}
      class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
      + New Testimonial
    </button>
  </div>

  <p class="text-sm text-gray-500 mb-6 max-w-2xl">Client reviews that appear on your website. Published testimonials are visible to visitors. Unpublished ones are saved but hidden.</p>

  {#if showCreate}
    <div class="bg-white border border-gray-100 rounded p-6 mb-6">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">New Testimonial</h2>
      <form method="POST" action="?/create" class="flex flex-col gap-4 max-w-xl">
        <div class="flex flex-col gap-1">
          <label for="new-client" class="text-xs uppercase tracking-widest text-gray-400">Client Name *</label>
          <input id="new-client" name="client_name" type="text" required placeholder="J. Williams"
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="new-quote" class="text-xs uppercase tracking-widest text-gray-400">Quote *</label>
          <textarea id="new-quote" name="quote" rows="4" required
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors resize-none"></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label for="new-sort" class="text-xs uppercase tracking-widest text-gray-400">Sort Order</label>
          <input id="new-sort" name="sort_order" type="number" value="0"
            class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy w-32 transition-colors" />
        </div>
        <div class="flex gap-3">
          <button type="submit"
            class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
            Save
          </button>
          <button type="button" onclick={() => showCreate = false}
            class="px-6 py-2.5 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  {/if}

  {#if (data.testimonials as Testimonial[]).length === 0}
    <p class="text-sm text-gray-400 text-center py-16">No testimonials yet.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {#each data.testimonials as t}
        {#if editing?.id === t.id}
          <div class="bg-white border border-navy/20 rounded p-5">
            <form method="POST" action="?/update" class="flex flex-col gap-3">
              <input type="hidden" name="id" value={t.id} />
              <div class="flex flex-col gap-1">
                <label for="edit-client-{t.id}" class="text-xs uppercase tracking-widest text-gray-400">Client Name *</label>
                <input id="edit-client-{t.id}" name="client_name" type="text" required value={t.client_name}
                  class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
              </div>
              <div class="flex flex-col gap-1">
                <label for="edit-quote-{t.id}" class="text-xs uppercase tracking-widest text-gray-400">Quote *</label>
                <textarea id="edit-quote-{t.id}" name="quote" rows="5" required
                  class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy transition-colors resize-none">{t.quote}</textarea>
              </div>
              <div class="flex flex-col gap-1">
                <label for="edit-sort-{t.id}" class="text-xs uppercase tracking-widest text-gray-400">Sort Order</label>
                <input id="edit-sort-{t.id}" name="sort_order" type="number" value={t.sort_order}
                  class="px-3 py-2 text-sm border border-gray-200 outline-none focus:border-navy w-24 transition-colors" />
              </div>
              <div class="flex gap-2">
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
          </div>
        {:else}
          <div class="bg-white border border-gray-100 rounded p-5 flex flex-col gap-4">
            <p class="text-sm text-gray-700 leading-relaxed flex-1">"{t.quote}"</p>
            <div class="flex items-center justify-between">
              <p class="text-xs font-semibold text-navy uppercase tracking-wider">{t.client_name}</p>
              <span class="text-xs px-2 py-0.5 rounded-full font-semibold
                {t.is_published ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}">
                {t.is_published ? 'Live' : 'Hidden'}
              </span>
            </div>
            <div class="flex items-center gap-2 pt-1 border-t border-gray-100">
              <button type="button" onclick={() => editing = { ...t }}
                class="px-3 py-1 text-xs font-semibold rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-all">
                Edit
              </button>
              <form method="POST" action="?/toggle">
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="is_published" value={t.is_published ? '0' : '1'} />
                <button type="submit"
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
                  {t.is_published ? 'Unpublish' : 'Publish'}
                </button>
              </form>
              <form method="POST" action="?/delete"
                onsubmit={(e) => { if (!confirm('Delete this testimonial?')) e.preventDefault(); }}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit"
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  Delete
                </button>
              </form>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>
