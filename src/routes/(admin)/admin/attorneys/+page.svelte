<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import type { Attorney } from './+page.server';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let view = $state<'list' | 'create' | 'edit'>('list');
  let editing = $state<Attorney | null>(null);
  let areasInput = $state('');

  function startEdit(a: Attorney) {
    editing = { ...a };
    const parsed = tryParseAreas(a.practice_areas);
    areasInput = parsed.join(', ');
    view = 'edit';
  }

  function tryParseAreas(raw: string): string[] {
    try { return JSON.parse(raw) as string[]; } catch { return []; }
  }

  function cancelEdit() { view = 'list'; editing = null; }
</script>

<svelte:head><title>Attorneys — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-2xl font-bold text-navy">Attorneys</h1>
      <p class="text-gray-400 text-sm mt-1">{data.attorneys.length} total</p>
    </div>
    {#if view === 'list'}
      <button onclick={() => { view = 'create'; areasInput = ''; }}
        class="px-4 py-2 bg-navy text-white text-sm font-semibold rounded hover:bg-navy/90 transition-colors">
        + Add Attorney
      </button>
    {:else}
      <button onclick={cancelEdit}
        class="px-4 py-2 border border-gray-200 text-sm text-gray-500 rounded hover:border-gray-400 transition-colors">
        Back to List
      </button>
    {/if}
  </div>

  {#if form?.error}
    <p class="text-red-600 text-sm mb-4">{form.error}</p>
  {/if}

  {#if view === 'list'}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {#each data.attorneys as a}
        <div class="bg-white border border-gray-100 rounded-lg overflow-hidden">
          {#if a.photo_url}
            <img src={a.photo_url} alt={a.name} class="w-full h-36 object-cover"/>
          {:else}
            <div class="w-full h-36 bg-navy/5 flex items-center justify-center">
              <svg class="w-12 h-12 text-navy/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
          {/if}
          <div class="p-4">
            <div class="flex items-start justify-between gap-2 mb-1">
              <p class="font-semibold text-navy leading-tight">{a.name}</p>
              <span class="shrink-0 text-xs px-1.5 py-0.5 rounded font-medium {a.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}">
                {a.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p class="text-xs text-gray-500 mb-0.5">{a.title}</p>
            <p class="text-xs text-gray-400">{a.firm}</p>
            <p class="text-xs text-gray-400">{[a.city, a.state].filter(Boolean).join(', ')}</p>

            {#if tryParseAreas(a.practice_areas).length > 0}
              <div class="flex flex-wrap gap-1 mt-2">
                {#each tryParseAreas(a.practice_areas).slice(0, 3) as area}
                  <span class="text-[10px] px-1.5 py-0.5 bg-gold/10 text-gold-dark rounded">{area}</span>
                {/each}
              </div>
            {/if}

            <div class="flex gap-2 mt-4">
              <button onclick={() => startEdit(a)}
                class="flex-1 px-3 py-1.5 border border-gray-200 text-xs text-navy rounded hover:border-navy transition-colors font-medium text-center">
                Edit
              </button>
              <form method="POST" action="?/toggleActive">
                <input type="hidden" name="id" value={a.id}/>
                <input type="hidden" name="is_active" value={a.is_active}/>
                <button type="submit"
                  class="px-3 py-1.5 border border-gray-200 text-xs rounded hover:border-gray-400 transition-colors font-medium
                    {a.is_active ? 'text-orange-500' : 'text-green-600'}">
                  {a.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </form>
            </div>
          </div>
        </div>
      {/each}

      {#if data.attorneys.length === 0}
        <div class="md:col-span-2 xl:col-span-3 py-16 text-center text-gray-400 text-sm">
          No attorneys yet. Add one to get started.
        </div>
      {/if}
    </div>

  {:else}
    <!-- Create / Edit form -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
        {view === 'create' ? 'New Attorney' : `Edit — ${editing?.name}`}
      </h2>
      <form method="POST" action={view === 'create' ? '?/create' : '?/update'}
        class="grid grid-cols-1 md:grid-cols-2 gap-4">

        {#if view === 'edit' && editing}
          <input type="hidden" name="id" value={editing.id}/>
        {/if}

        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-xs text-gray-500" for="name">Full Name *</label>
          <input name="name" id="name" required value={editing?.name ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        {#if view === 'create'}
          <div class="flex flex-col gap-1 md:col-span-2">
            <label class="text-xs text-gray-500" for="slug">Slug (auto-generated if blank)</label>
            <input name="slug" id="slug" value={editing?.slug ?? ''}
              class="border border-gray-200 rounded px-3 py-2 text-sm font-mono"/>
          </div>
        {/if}
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="title">Title</label>
          <input name="title" id="title" value={editing?.title ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm" placeholder="Managing Partner"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="firm">Firm</label>
          <input name="firm" id="firm" value={editing?.firm ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="city">City</label>
          <input name="city" id="city" value={editing?.city ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="state">State</label>
          <input name="state" id="state" value={editing?.state ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm" placeholder="AL"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="email">Email</label>
          <input name="email" id="email" type="email" value={editing?.email ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500" for="phone">Phone</label>
          <input name="phone" id="phone" value={editing?.phone ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-xs text-gray-500" for="practice_areas">Practice Areas (comma-separated)</label>
          <input name="practice_areas" id="practice_areas" bind:value={areasInput}
            class="border border-gray-200 rounded px-3 py-2 text-sm"
            placeholder="Personal Injury, Medical Malpractice, Wrongful Death"/>
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-xs text-gray-500" for="photo_url">Photo URL</label>
          <input name="photo_url" id="photo_url" value={editing?.photo_url ?? ''}
            class="border border-gray-200 rounded px-3 py-2 text-sm"/>
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-xs text-gray-500" for="bio">Bio</label>
          <textarea name="bio" id="bio" rows="4"
            class="border border-gray-200 rounded px-3 py-2 text-sm resize-y">{editing?.bio ?? ''}</textarea>
        </div>

        <div class="md:col-span-2 flex gap-3 mt-2">
          <button type="submit" class="px-5 py-2 bg-navy text-white text-sm font-semibold rounded hover:bg-navy/90 transition-colors">
            {view === 'create' ? 'Create Attorney' : 'Save Changes'}
          </button>
          <button type="button" onclick={cancelEdit}
            class="px-5 py-2 border border-gray-200 text-sm text-gray-500 rounded hover:border-gray-400 transition-colors">
            Cancel
          </button>
          {#if view === 'edit' && editing}
            <form method="POST" action="?/delete" class="ml-auto"
              onsubmit={(e) => { if (!confirm('Delete this attorney?')) e.preventDefault(); }}>
              <input type="hidden" name="id" value={editing.id}/>
              <button type="submit"
                class="px-5 py-2 border border-red-200 text-sm text-red-500 rounded hover:bg-red-50 transition-colors">
                Delete
              </button>
            </form>
          {/if}
        </div>
      </form>
    </div>
  {/if}
</div>
