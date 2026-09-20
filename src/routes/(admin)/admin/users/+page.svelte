<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import type { AdminUser } from './+page.server';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showCreate = $state(false);
</script>

<svelte:head><title>Users — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  <div class="flex items-center justify-between mb-2">
    <div>
      <h1 class="text-2xl font-bold text-navy">Users</h1>
      {#if data.users}
        <p class="text-gray-400 text-sm mt-1">{data.users.length} {data.users.length === 1 ? 'user' : 'users'}</p>
      {/if}
    </div>
    {#if data.users}
      <button
        onclick={() => showCreate = !showCreate}
        class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
        + Add User
      </button>
    {/if}
  </div>

  <p class="text-sm text-gray-500 mb-6 max-w-2xl">People who can log in to this admin panel. Login is by email code — no passwords.</p>

  {#if !data.users}
    <p class="text-sm text-gray-400">Database unavailable. Run <code class="text-xs bg-gray-100 px-1 py-0.5 rounded font-mono">wrangler dev</code> to use this page.</p>
  {:else}
    {#if showCreate}
      <div class="bg-white border border-gray-100 rounded p-6 mb-6 max-w-md">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Add User</h2>
        {#if form?.error}
          <p class="text-red-500 text-sm mb-3">{form.error}</p>
        {/if}
        <form method="POST" action="?/create" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="new-name" class="text-xs uppercase tracking-widest text-gray-400">Name</label>
            <input id="new-name" name="name" type="text" placeholder="Jane Smith"
              class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="new-email" class="text-xs uppercase tracking-widest text-gray-400">Email *</label>
            <input id="new-email" name="email" type="email" required placeholder="jane@example.com"
              class="px-3 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
          </div>
          <div class="flex gap-3">
            <button type="submit"
              class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
              Add
            </button>
            <button type="button" onclick={() => showCreate = false}
              class="px-6 py-2.5 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    {/if}

    <div class="max-w-lg flex flex-col gap-2">
      {#each data.users as user}
        <div class="bg-white border border-gray-100 rounded px-5 py-4 flex items-center justify-between gap-4">
          <div class="min-w-0">
            {#if user.name}
              <p class="text-sm font-semibold text-navy truncate">{user.name}</p>
              <p class="text-xs text-gray-400 truncate">{user.email}</p>
            {:else}
              <p class="text-sm text-gray-700 truncate">{user.email}</p>
            {/if}
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs px-2 py-0.5 rounded-full font-semibold
              {user.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}">
              {user.is_active ? 'Active' : 'Disabled'}
            </span>
            <form method="POST" action="?/toggle">
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="is_active" value={user.is_active} />
              <button type="submit"
                class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
                {user.is_active ? 'Disable' : 'Enable'}
              </button>
            </form>
            <form method="POST" action="?/delete"
              onsubmit={(e) => { if (!confirm('Remove this user?')) e.preventDefault(); }}>
              <input type="hidden" name="id" value={user.id} />
              <button type="submit"
                class="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                Remove
              </button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
