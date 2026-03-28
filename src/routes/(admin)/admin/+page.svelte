<script lang="ts">
  import PostModal from '$lib/components/PostModal.svelte';
  import RichEditor from '$lib/components/RichEditor.svelte';

  let newContent = $state('');
  let editContent = $state('');
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  let view = $state<'list' | 'create' | 'edit'>('list');
  let editing = $state<any>(null);
  let previewing = $state<any>(null);

  async function previewPost(slug: string) {
    const res = await fetch(`/api/posts/${slug}`);
    previewing = await res.json();
  }

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Auto-generate slug from title
  function slugify(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  let newTitle = $state('');
  let newSlug = $state('');
  let autoSlug = $state(true);
  let newTags = $state<string[]>([]);
  let editTags = $state<string[]>([]);

  const ALL_TAGS = [
    'Car Accidents', 'Truck Accidents', 'Motorcycle Accidents',
    'Medical Malpractice', 'Personal Injury', 'Wrongful Death',
    'Product Liability', 'Rideshare Accidents', 'Mass Torts', 'Settlements'
  ];

  function toggleTag(tag: string, list: string[]): string[] {
    return list.includes(tag) ? list.filter(t => t !== tag) : [...list, tag];
  }

  function onTitleInput(e: Event) {
    newTitle = (e.target as HTMLInputElement).value;
    if (autoSlug) newSlug = slugify(newTitle);
  }

  function startEdit(post: any) {
    editing = { ...post };
    editContent = post.content || '';
    editTags = post.tags ? [...post.tags] : [];
    view = 'edit';
  }

  const totalPages = $derived(Math.ceil(data.total / data.limit));
</script>

<svelte:head><title>Admin | Counsel Hound</title></svelte:head>

<div class="min-h-screen bg-gray-50">

  <!-- Top bar -->
  <div class="bg-[#162d39] px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <img src="/main-logo.svg" alt="Counsel Hound" class="h-8" />
      <span class="text-[#d8b269] text-xs uppercase tracking-widest">Admin</span>
    </div>
    <div class="flex items-center gap-6">
      <a href="/" target="_blank" class="text-white text-sm font-semibold hover:text-[#d8b269] transition-colors">← Main Site</a>
      <form method="POST" action="?/logout">
        <button class="text-sm font-semibold text-white hover:text-[#d8b269] transition-colors uppercase tracking-widest">Sign Out</button>
      </form>
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-8 py-10">

    {#if view === 'list'}
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-[#162d39] font-['Futura']">Blog Posts</h1>
          <p class="text-gray-400 text-sm mt-1">{data.total} total posts</p>
        </div>
        <button
          onclick={() => { view = 'create'; newTitle = ''; newSlug = ''; autoSlug = true; newTags = []; }}
          class="px-6 py-2.5 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors"
        >
          + New Post
        </button>
      </div>

      <!-- Search -->
      <form class="mb-6">
        <input
          name="q"
          value={data.q}
          type="search"
          placeholder="Search posts…"
          class="w-full max-w-sm px-4 py-2.5 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors"
        />
      </form>

      <!-- Table -->
      <div class="bg-white border border-gray-100 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50">
              <th class="text-left px-6 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Title</th>
              <th class="text-left px-6 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Date</th>
              <th class="text-left px-6 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Views</th>
              <th class="text-left px-6 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium hidden md:table-cell">Likes</th>
              <th class="text-left px-6 py-3 text-xs uppercase tracking-widest text-gray-400 font-medium">Status</th>
              <th class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {#each data.posts as post}
              <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <p class="font-medium text-[#162d39] line-clamp-1">{post.title}</p>
                </td>
                <td class="px-6 py-4 text-gray-500 hidden md:table-cell">{formatDate(post.created_at)}</td>
                <td class="px-6 py-4 text-gray-500 hidden md:table-cell">{post.views ?? 0}</td>
                <td class="px-6 py-4 text-gray-500 hidden md:table-cell">{post.likes ?? 0}</td>
                <td class="px-6 py-4">
                  <form method="POST" action="?/toggle">
                    <input type="hidden" name="slug" value={post.slug} />
                    <input type="hidden" name="published" value={post.published ? '0' : '1'} />
                    <button type="submit"
                      class="text-xs px-2 py-1 rounded-full font-semibold transition-all duration-200 cursor-pointer"
                      style="background: {post.published ? '#dcfce7' : '#fee2e2'}; color: {post.published ? '#166534' : '#991b1b'};"
                      title="Click to toggle">
                      {post.published ? 'Live' : 'Inactive'}
                    </button>
                  </form>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2 justify-end">
                    <button type="button" onclick={() => previewPost(post.slug)}
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 hover:bg-[#162d39] hover:text-white transition-all duration-200">
                      View
                    </button>
                    <button type="button" onclick={() => startEdit(post)}
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-[#162d39]/10 text-[#162d39] hover:bg-[#162d39] hover:text-white transition-all duration-200">
                      Edit
                    </button>
                    <form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Delete this post?')) e.preventDefault(); }}>
                      <input type="hidden" name="slug" value={post.slug} />
                      <button type="submit"
                        class="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="flex gap-2 mt-6">
          {#each Array(totalPages) as _, i}
            <a href="?page={i+1}{data.q ? '&q='+data.q : ''}"
              class="px-3 py-1.5 text-xs font-semibold border transition-colors"
              style="background: {data.page === i+1 ? '#162d39' : 'white'}; color: {data.page === i+1 ? 'white' : '#162d39'}; border-color: {data.page === i+1 ? '#162d39' : '#e5e7eb'};">
              {i+1}
            </a>
          {/each}
        </div>
      {/if}

    {:else if view === 'create'}
      <div class="max-w-3xl">
        <div class="flex items-center gap-4 mb-8">
          <button onclick={() => view = 'list'} class="text-gray-400 hover:text-[#162d39] text-sm transition-colors">&larr; Back</button>
          <h1 class="text-2xl font-bold text-[#162d39] font-['Futura']">New Post</h1>
        </div>

        <form method="POST" action="?/create" class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="new-title" class="text-xs uppercase tracking-widest text-gray-400">Title *</label>
            <input id="new-title" name="title" type="text" required value={newTitle} oninput={onTitleInput}
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="new-slug" class="text-xs uppercase tracking-widest text-gray-400">Slug *</label>
            <input id="new-slug" name="slug" type="text" required bind:value={newSlug} oninput={() => autoSlug = false}
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors font-mono" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="new-category" class="text-xs uppercase tracking-widest text-gray-400">Category</label>
            <input id="new-category" name="category" type="text" value="Blog"
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="new-excerpt" class="text-xs uppercase tracking-widest text-gray-400">Excerpt</label>
            <textarea id="new-excerpt" name="excerpt" rows="2"
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors resize-none"></textarea>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs uppercase tracking-widest text-gray-400">Tags</span>
            <div class="flex flex-wrap gap-2">
              {#each ALL_TAGS as tag}
                <button type="button" onclick={() => newTags = toggleTag(tag, newTags)}
                  class="px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-all duration-150"
                  style="background: {newTags.includes(tag) ? '#162d39' : 'white'}; color: {newTags.includes(tag) ? 'white' : '#162d39'}; border-color: {newTags.includes(tag) ? '#162d39' : '#d1d5db'};">
                  {tag}
                </button>
              {/each}
            </div>
            <input type="hidden" name="tags" value={newTags.join(',')} />
          </div>
          <div class="flex flex-col gap-2">
            <label for="content" class="text-xs uppercase tracking-widest text-gray-400">Content *</label>
            <RichEditor bind:value={newContent} id="content" />
          </div>
          <div class="flex gap-4 pt-2">
            <button type="submit" class="px-8 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors">
              Publish Post
            </button>
            <button type="button" onclick={() => view = 'list'} class="px-8 py-3 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>

    {:else if view === 'edit' && editing}
      <div class="max-w-3xl">
        <div class="flex items-center gap-4 mb-8">
          <button onclick={() => { view = 'list'; editing = null; }} class="text-gray-400 hover:text-[#162d39] text-sm transition-colors">&larr; Back</button>
          <h1 class="text-2xl font-bold text-[#162d39] font-['Futura']">Edit Post</h1>
        </div>

        <form method="POST" action="?/update" class="flex flex-col gap-5">
          <input type="hidden" name="slug" value={editing.slug} />
          <div class="flex flex-col gap-2">
            <label for="edit-title" class="text-xs uppercase tracking-widest text-gray-400">Title *</label>
            <input id="edit-title" name="title" type="text" required value={editing.title}
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-slug" class="text-xs uppercase tracking-widest text-gray-400">Slug (read-only)</label>
            <input id="edit-slug" type="text" value={editing.slug} disabled
              class="px-4 py-3 text-sm border border-gray-100 bg-gray-50 text-gray-400 font-mono" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-category" class="text-xs uppercase tracking-widest text-gray-400">Category</label>
            <input id="edit-category" name="category" type="text" value={editing.category}
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-status" class="text-xs uppercase tracking-widest text-gray-400">Status</label>
            <select id="edit-status" name="published" class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors">
              <option value="1" selected={editing.published === true}>Live</option>
              <option value="0" selected={editing.published === false}>Inactive</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-excerpt" class="text-xs uppercase tracking-widest text-gray-400">Excerpt</label>
            <textarea id="edit-excerpt" name="excerpt" rows="2"
              class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors resize-none">{editing.excerpt}</textarea>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs uppercase tracking-widest text-gray-400">Tags</span>
            <div class="flex flex-wrap gap-2">
              {#each ALL_TAGS as tag}
                <button type="button" onclick={() => editTags = toggleTag(tag, editTags)}
                  class="px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-all duration-150"
                  style="background: {editTags.includes(tag) ? '#162d39' : 'white'}; color: {editTags.includes(tag) ? 'white' : '#162d39'}; border-color: {editTags.includes(tag) ? '#162d39' : '#d1d5db'};">
                  {tag}
                </button>
              {/each}
            </div>
            <input type="hidden" name="tags" value={editTags.join(',')} />
          </div>
          <div class="flex flex-col gap-2">
            <label for="edit-content" class="text-xs uppercase tracking-widest text-gray-400">Content *</label>
            <RichEditor bind:value={editContent} id="edit-content" />
          </div>
          <div class="flex gap-4 pt-2">
            <button type="submit" class="px-8 py-3 bg-[#162d39] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1e3a4a] transition-colors">
              Save Changes
            </button>
            <button type="button" onclick={() => { view = 'list'; editing = null; }} class="px-8 py-3 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    {/if}

  </div>
</div>

{#if previewing}
  <PostModal post={previewing} onclose={() => previewing = null} />
{/if}
