// Check sponsors/sponsors.json against the rules the Worker applies.
//   node scripts/sponsors.mjs [file]
import { readFileSync } from 'node:fs';
import { parseSponsors } from '../src/lib/sponsor-slots.js';

const file = process.argv[2] ?? 'sponsors/sponsors.json';
try {
  const { slots, tiers } = parseSponsors(JSON.parse(readFileSync(file, 'utf8')));
  slots.forEach((s, i) => console.log(`slot ${i + 1}: ${s ? `${s.name} → ${s.url}${s.logo ? ` (logo ${s.logo})` : ''}` : 'open'}`));
  tiers.forEach((t) => console.log(`${t.label}: slots ${t.first}-${t.last}, $${t.price}/month`));
  console.log(`${file} is valid`);
} catch (error) {
  console.error(`${file}: ${error.message}`);
  process.exit(1);
}
