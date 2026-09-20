CREATE TABLE IF NOT EXISTS admin_users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL DEFAULT '',
  is_active  INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO admin_users (email, name) VALUES
  ('richard@frankowskifirm.com', 'Richard Frankowski'),
  ('diogenes@mac.com', 'Benson'),
  ('carson@antarestechnologies.com', 'Carson');
