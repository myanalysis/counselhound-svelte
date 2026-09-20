-- Same fix as frankowskifirm-svelte's migrations/0004_composite_indexes.sql — the blog
-- listing query (WHERE published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?) can't use
-- two separate single-column indexes (published, created_at) at once, so it falls back to
-- reading and sorting every published row instead of walking a pre-sorted index. This
-- table is the live production table (`counselhound_posts`, confirmed via sqlite_master on
-- the remote D1) — note the local migrations/0001_init.sql and schema.sql in this repo
-- reference a bare `posts` table that does NOT match production; that's a separate,
-- pre-existing local-dev-only mismatch, not touched here.
CREATE INDEX IF NOT EXISTS idx_counselhound_posts_published_created
  ON counselhound_posts(published, created_at DESC);
