CREATE TABLE IF NOT EXISTS referrals (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  referring_name   TEXT NOT NULL DEFAULT '',
  referring_firm   TEXT NOT NULL DEFAULT '',
  referring_email  TEXT NOT NULL DEFAULT '',
  referring_phone  TEXT NOT NULL DEFAULT '',
  client_name      TEXT NOT NULL DEFAULT '',
  client_email     TEXT NOT NULL DEFAULT '',
  client_phone     TEXT NOT NULL DEFAULT '',
  matter           TEXT NOT NULL DEFAULT '',
  status           TEXT NOT NULL DEFAULT 'new',
  notes            TEXT NOT NULL DEFAULT '',
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_created ON referrals(created_at DESC);

CREATE TABLE IF NOT EXISTS attorneys (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  title      TEXT NOT NULL DEFAULT '',
  firm       TEXT NOT NULL DEFAULT '',
  email      TEXT NOT NULL DEFAULT '',
  phone      TEXT NOT NULL DEFAULT '',
  state      TEXT NOT NULL DEFAULT '',
  city       TEXT NOT NULL DEFAULT '',
  bio        TEXT NOT NULL DEFAULT '',
  photo_url  TEXT NOT NULL DEFAULT '',
  practice_areas TEXT NOT NULL DEFAULT '[]',
  is_active  INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_attorneys_slug ON attorneys(slug);
CREATE INDEX IF NOT EXISTS idx_attorneys_active ON attorneys(is_active);
