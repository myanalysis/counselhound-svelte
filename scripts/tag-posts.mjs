import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '../src/lib/data/posts.json');

const posts = JSON.parse(readFileSync(DATA_FILE, 'utf8'));

const rules = [
  {
    tag: 'Car Accidents',
    keywords: ['car accident', 'car crash', 'car wreck', 'auto accident', 'vehicle accident', 'car collision', 'rear end', 'drunk driving accident', 'distracted driving', 'hit and run', 'uninsured motorist', 'uninsured driver', 'fatal car']
  },
  {
    tag: 'Truck Accidents',
    keywords: ['truck accident', 'truck wreck', 'trucking', 'semi truck', '18 wheeler', 'tractor trailer', 'commercial truck', 'commercial vehicle', 'delivery truck']
  },
  {
    tag: 'Motorcycle Accidents',
    keywords: ['motorcycle', 'motorbike', 'bike accident', 'bicycle accident', 'bicycle crash', 'cyclist', 'scooter', 'e-scooter', 'boating accident', 'boat accident', 'yacht', 'maritime', 'aviation accident']
  },
  {
    tag: 'Medical Malpractice',
    keywords: ['medical malpractice', 'malpractice', 'misdiagnosis', 'surgical', 'hospital negligence', 'erb\'s palsy', 'cerebral palsy', 'spinal cord', 'birth injury', 'nursing home', 'elder abuse', 'daycare']
  },
  {
    tag: 'Personal Injury',
    keywords: ['personal injury', 'slip and fall', 'premises liability', 'dog bite', 'dog bite attorney', 'pedestrian', 'construction accident', 'construction site', 'work injury', 'back injury', 'catastrophic injury', 'serious injur', 'pain and suffering', 'injury lawyer', 'injury attorney', 'injury claim', 'injury law']
  },
  {
    tag: 'Wrongful Death',
    keywords: ['wrongful death', 'fatal', 'death claim', 'death attorney']
  },
  {
    tag: 'Product Liability',
    keywords: ['product liability', 'defective product', 'pressure cooker', 'hotpot', 'pressure vessel', 'pharmaceutical', 'medical device', '3m earplug', 'camp lejeune', 'toxic', 'data breach']
  },
  {
    tag: 'Rideshare Accidents',
    keywords: ['rideshare', 'uber', 'lyft', 'ride share']
  },
  {
    tag: 'Mass Torts',
    keywords: ['mass tort', 'class action', 'jpml', 'consolidation', 'camp lejeune', 'boy scout', 'sexual assault', 'clergy abuse', 'securities fraud', 'investment fraud', 'fraud lawyer']
  },
  {
    tag: 'Settlements',
    keywords: ['settlement', 'compensation', 'maximize your', 'claim', 'calculator']
  },
];

let tagged = 0;

for (const post of posts) {
  const text = (post.title + ' ' + (post.excerpt || '')).toLowerCase();
  const tags = new Set(post.tags || []);

  for (const { tag, keywords } of rules) {
    if (keywords.some(kw => text.includes(kw))) {
      tags.add(tag);
    }
  }

  post.tags = [...tags];
  if (post.tags.length > 0) tagged++;
}

writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
console.log(`Done. ${tagged}/${posts.length} posts now have tags.`);
