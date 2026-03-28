import postsData from '../../../data/posts.json';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
  views: number;
  likes: number;
};

const all = postsData as Post[];

export function getPosts({ page = 1, limit = 12, q = '', tag = '' } = {}): { posts: Post[]; total: number } {
  let filtered = all.filter(p => p.published);
  if (q) filtered = filtered.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()));
  if (tag) filtered = filtered.filter(p => p.tags?.includes(tag));
  const sorted = filtered.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return {
    posts: sorted.slice((page - 1) * limit, page * limit),
    total: sorted.length,
  };
}

export function getPost(slug: string): Post | undefined {
  return all.find(p => p.slug === slug && p.published);
}

export function getRecentPosts(n = 3): Post[] {
  return all
    .filter(p => p.published)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, n);
}

export function getAllPosts({ page = 1, limit = 20, q = '' } = {}): { posts: Post[]; total: number } {
  let filtered = [...all];
  if (q) filtered = filtered.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
  const sorted = filtered.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return {
    posts: sorted.slice((page - 1) * limit, page * limit),
    total: sorted.length,
  };
}

// No-ops on Cloudflare — writes don't persist
export function incrementLikes(slug: string): number {
  return all.find(p => p.slug === slug)?.likes ?? 0;
}

export function incrementViews(_slug: string) {}

export function createPost(_data: Omit<Post, 'created_at' | 'views'>): Post {
  throw new Error('Admin writes not supported in this deployment.');
}

export function updatePost(_slug: string, _data: Partial<Post>): Post {
  throw new Error('Admin writes not supported in this deployment.');
}

export function deletePost(_slug: string) {
  throw new Error('Admin writes not supported in this deployment.');
}
