<script lang="ts">
  import RichEditor from '$lib/components/RichEditor.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let view = $state<'list' | 'create' | 'edit'>('list');
  let editing = $state<any>(null);
  let newContent = $state('');
  let editContent = $state('');

  const ALL_TAGS = [
    'Car Accidents', 'Truck Accidents', 'Motorcycle Accidents',
    'Medical Malpractice', 'Personal Injury', 'Wrongful Death',
    'Product Liability', 'Rideshare Accidents', 'Mass Torts', 'Settlements',
  ];

  let newTitle = $state('');
  let newSlug = $state('');
  let autoSlug = $state(true);
  let newTags = $state<string[]>([]);
  let editTags = $state<string[]>([]);

  function slugify(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

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

  function formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const totalPages = $derived(Math.ceil(data.total / data.limit));
</script>

<svelte:head><title>Blog Posts — Counsel Hound Admin</title></svelte:head>

<div class="p-8">
  {#if view === 'list'}
    <div class="flex items-center justify-between mb-2">
      <div>
        <h1 class="text-2xl font-bold text-navy">Blog Posts</h1>
        <p class="text-gray-400 text-sm mt-1">{data.total} total posts</p>
      </div>
      <button onclick={() => { view = 'create'; newTitle = ''; newSlug = ''; autoSlug = true; newTags = []; newContent = ''; }}
        class="px-6 py-2.5 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
        + New Post
      </button>
    </div>

    <p class="text-sm text-gray-500 mb-6 max-w-2xl">Articles that appear on your website's blog. New posts show up immediately once published. Blog content helps your site rank on Google — the more articles, the better.</p>

    <form class="mb-6">
      <input name="q" value={data.q} type="search" placeholder="Search posts…"
        class="w-full max-w-sm px-4 py-2.5 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
    </form>

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
                <p class="font-medium text-navy line-clamp-1">{post.title}</p>
              </td>
              <td class="px-6 py-4 text-gray-500 hidden md:table-cell">{formatDate(post.created_at)}</td>
              <td class="px-6 py-4 text-gray-500 hidden md:table-cell">{post.views ?? 0}</td>
              <td class="px-6 py-4 text-gray-500 hidden md:table-cell">{post.likes ?? 0}</td>
              <td class="px-6 py-4">
                <form method="POST" action="?/toggle">
                  <input type="hidden" name="slug" value={post.slug} />
                  <input type="hidden" name="published" value={post.published ? '0' : '1'} />
                  <button type="submit"
                    class="text-xs px-2 py-1 rounded-full font-semibold transition-all cursor-pointer
                      {post.published ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}">
                    {post.published ? 'Live' : 'Inactive'}
                  </button>
                </form>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 justify-end">
                  <button type="button" onclick={() => startEdit(post)}
                    class="px-3 py-1 text-xs font-semibold rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-all">
                    Edit
                  </button>
                  <form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Delete this post?')) e.preventDefault(); }}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <button type="submit"
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          {/each}
          {#if data.posts.length === 0}
            <tr>
              <td colspan="6" class="px-6 py-12 text-sm text-gray-400 text-center">No posts yet.</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>

    {#if totalPages > 1}
      <div class="flex gap-2 mt-6">
        {#each Array(totalPages) as _, i}
          <a href="?page={i+1}{data.q ? '&q='+data.q : ''}"
            class="px-3 py-1.5 text-xs font-semibold border transition-colors
              {data.page === i+1 ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-gray-200 hover:border-navy'}">
            {i+1}
          </a>
        {/each}
      </div>
    {/if}

  {:else if view === 'create'}
    <div class="max-w-3xl">
      <div class="flex items-center gap-4 mb-8">
        <button onclick={() => view = 'list'} class="text-gray-400 hover:text-navy text-sm transition-colors">&larr; Back</button>
        <h1 class="text-2xl font-bold text-navy">New Post</h1>
      </div>
      <form method="POST" action="?/create" class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label for="new-title" class="text-xs uppercase tracking-widest text-gray-400">Title *</label>
          <input id="new-title" name="title" type="text" required value={newTitle} oninput={onTitleInput}
            class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <input type="hidden" name="slug" value={newSlug} />
        <div class="flex flex-col gap-2">
          <label for="new-category" class="text-xs uppercase tracking-widest text-gray-400">Category</label>
          <input id="new-category" name="category" type="text" value="Blog"
            class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="new-excerpt" class="text-xs uppercase tracking-widest text-gray-400">Excerpt</label>
          <textarea id="new-excerpt" name="excerpt" rows="2"
            class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors resize-none"></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs uppercase tracking-widest text-gray-400">Tags</span>
          <div class="flex flex-wrap gap-2">
            {#each ALL_TAGS as tag}
              <button type="button" onclick={() => newTags = toggleTag(tag, newTags)}
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-all
                  {newTags.includes(tag) ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-gray-300 hover:border-navy'}">
                {tag}
              </button>
            {/each}
          </div>
          <input type="hidden" name="tags" value={newTags.join(',')} />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs uppercase tracking-widest text-gray-400">Content *</span>
          <RichEditor bind:value={newContent} id="content" />
        </div>
        <div class="flex gap-4 pt-2">
          <button type="submit"
            class="px-8 py-3 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
            Publish Post
          </button>
          <button type="button" onclick={() => view = 'list'}
            class="px-8 py-3 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>

  {:else if view === 'edit' && editing}
    <div class="max-w-3xl">
      <div class="flex items-center gap-4 mb-8">
        <button onclick={() => { view = 'list'; editing = null; }} class="text-gray-400 hover:text-navy text-sm transition-colors">&larr; Back</button>
        <h1 class="text-2xl font-bold text-navy">Edit Post</h1>
      </div>
      <form method="POST" action="?/update" class="flex flex-col gap-5">
        <input type="hidden" name="slug" value={editing.slug} />
        <div class="flex flex-col gap-2">
          <label for="edit-title" class="text-xs uppercase tracking-widest text-gray-400">Title *</label>
          <input id="edit-title" name="title" type="text" required value={editing.title}
            class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xs uppercase tracking-widest text-gray-400">Web Address</span>
          <p class="text-sm text-gray-400">counselhound.com/news-and-blogs/<span class="text-navy font-medium">{editing.slug}</span></p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="edit-category" class="text-xs uppercase tracking-widest text-gray-400">Category</label>
          <input id="edit-category" name="category" type="text" value={editing.category}
            class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="edit-published" class="text-xs uppercase tracking-widest text-gray-400">Status</label>
          <select id="edit-published" name="published" class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors">
            <option value="1" selected={editing.published === true}>Live</option>
            <option value="0" selected={editing.published === false}>Inactive</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="edit-excerpt" class="text-xs uppercase tracking-widest text-gray-400">Excerpt</label>
          <textarea id="edit-excerpt" name="excerpt" rows="2"
            class="px-4 py-3 text-sm border border-gray-200 outline-none focus:border-navy transition-colors resize-none">{editing.excerpt}</textarea>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs uppercase tracking-widest text-gray-400">Tags</span>
          <div class="flex flex-wrap gap-2">
            {#each ALL_TAGS as tag}
              <button type="button" onclick={() => editTags = toggleTag(tag, editTags)}
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-all
                  {editTags.includes(tag) ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-gray-300 hover:border-navy'}">
                {tag}
              </button>
            {/each}
          </div>
          <input type="hidden" name="tags" value={editTags.join(',')} />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs uppercase tracking-widest text-gray-400">Content *</span>
          <RichEditor bind:value={editContent} id="edit-content" />
        </div>
        <div class="flex gap-4 pt-2">
          <button type="submit"
            class="px-8 py-3 bg-navy text-white text-sm font-semibold uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors">
            Save Changes
          </button>
          <button type="button" onclick={() => { view = 'list'; editing = null; }}
            class="px-8 py-3 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  {/if}
</div>
