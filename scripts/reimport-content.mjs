import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const SITESUCKER = '/Users/benson/Downloads/us.sitesucker.mac.sitesucker/counselhound.com';
const POSTS_FILE = join(process.cwd(), 'data/posts.json');

const posts = JSON.parse(readFileSync(POSTS_FILE, 'utf8'));

// Walk year/month/day/slug directories
function findPostFiles() {
  const results = [];
  for (const year of ['2022','2023','2024','2025','2026']) {
    const yearDir = join(SITESUCKER, year);
    try {
      for (const month of readdirSync(yearDir)) {
        const monthDir = join(yearDir, month);
        for (const day of readdirSync(monthDir)) {
          const dayDir = join(monthDir, day);
          for (const slug of readdirSync(dayDir)) {
            const htmlFile = join(dayDir, slug, 'index.html');
            try {
              statSync(htmlFile);
              results.push({ slug, htmlFile });
            } catch {}
          }
        }
      }
    } catch {}
  }
  return results;
}

function extractContent(html) {
  // Extract post-content div
  const match = html.match(/<div[^>]+class="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div|<footer|<section|<aside)/i);
  if (!match) return null;

  let content = match[1];

  // Remove CTAs, related posts, nav junk
  content = content
    .replace(/<div[^>]+class="[^"]*(?:related|cta|no-cost|widget|sidebar|navigation|breadcrumb)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<a[^>]+href="[^"]*\.(png|jpg|jpeg|gif|svg)"[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/\[\s*\]/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();

  return content;
}

const files = findPostFiles();
console.log(`Found ${files.length} post files`);

let updated = 0;
let notFound = 0;

for (const { slug, htmlFile } of files) {
  const post = posts.find(p => p.slug === slug);
  if (!post) { notFound++; continue; }

  const html = readFileSync(htmlFile, 'utf8');
  const content = extractContent(html);
  if (!content || content.length < 100) { notFound++; continue; }

  post.content = content;
  updated++;
  console.log(`✓ ${slug}`);
}

writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
console.log(`\nUpdated: ${updated} | Not matched: ${notFound}`);
