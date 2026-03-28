import { readFileSync } from 'fs';

const DB_ID = '5e7d699f-203c-44b4-a66f-68dea53b2ac1';
const ACCOUNT_ID = '29ced6abadcf02459573ad7307f18b15';

// Read the blog JSON
const raw = JSON.parse(readFileSync('/tmp/all_blogs.json', 'utf8'));
const posts = raw.blogs;

// Clean up a slug from the URL field (e.g. "2022/04/29/some-slug" -> "some-slug")
function toSlug(url) {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

// Clean content — strip excess whitespace, deduplicate title from body
function cleanContent(content, title) {
  return content
    .replace(/\t/g, ' ')
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Build insert batches of 10
const BATCH = 10;
let inserted = 0;
let skipped = 0;

// Deduplicate slugs
const seen = new Set();
const unique = [];
for (const p of posts) {
  const slug = toSlug(p.url);
  if (seen.has(slug)) { skipped++; continue; }
  seen.add(slug);
  unique.push({ ...p, slug });
}

console.log(`Total: ${posts.length} | Unique: ${unique.length} | Skipped dupes: ${skipped}`);

for (let i = 0; i < unique.length; i += BATCH) {
  const batch = unique.slice(i, i + BATCH);

  const values = batch.map(p => {
    const slug    = p.slug.replace(/'/g, "''");
    const title   = (p.title || 'Untitled').replace(/'/g, "''");
    const excerpt = (p.description || '').replace(/'/g, "''").slice(0, 500);
    const content = cleanContent(p.content || '', p.title).replace(/'/g, "''");
    const cat     = (p.category || 'Blog').replace(/'/g, "''");
    const date    = p.date ? p.date.slice(0, 10) + ' ' + p.date.slice(11, 19) : '2022-01-01 00:00:00';
    return `('${slug}','${title}','${excerpt}','${content}','${cat}',1,'${date}','${date}')`;
  }).join(',\n');

  const sql = `INSERT OR IGNORE INTO posts (slug,title,excerpt,content,category,published,created_at,updated_at) VALUES\n${values};`;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({ sql }),
    }
  );

  const json = await res.json();
  if (!json.success) {
    console.error(`Batch ${i}-${i+BATCH} FAILED:`, JSON.stringify(json.errors));
  } else {
    inserted += batch.length;
    process.stdout.write(`\rInserted ${inserted}/${unique.length}`);
  }
}

console.log('\nDone!');
