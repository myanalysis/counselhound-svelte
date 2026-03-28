CREATE TABLE IF NOT EXISTS posts (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  slug      TEXT    NOT NULL UNIQUE,
  title     TEXT    NOT NULL,
  excerpt   TEXT    NOT NULL DEFAULT '',
  content   TEXT    NOT NULL DEFAULT '',
  category  TEXT    NOT NULL DEFAULT 'Blog',
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT   NOT NULL,
  updated_at TEXT   NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_posts_slug       ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published  ON posts(published, created_at);
