// Sync generator content and imagery from the Lakolam engine repository.
//
// Reads every generator's INFO.md plus the `lako list` catalogue line, and
// writes: src/content/generators/<id>.md (frontmatter + body), thumbnails
// into src/assets/generators/, and OG images into public/og/generators/.
//
// The synced output is committed, so the website builds standalone; run this
// again after the engine gains or changes generators.
//
//   LAKOLAM_REPO=/path/to/lakolam node scripts/sync-content.mjs

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repo = process.env.LAKOLAM_REPO ?? 'C:/kitchen-sink/lakolam';
const exe = join(repo, 'target/release/lako.exe');
const artSrc = 'assets-src'; // engine renders staged by scripts/render-art (or by hand)

if (!existsSync(repo)) {
  console.error(`Lakolam repo not found at ${repo} — set LAKOLAM_REPO.`);
  process.exit(1);
}

// ── the catalogue: id, version, category, one-line description ──
const list = execFileSync(exe, ['list'], { encoding: 'utf8' });
const entries = list
  .split('\n')
  .map((line) => line.match(/^(\S+)\s+(\S+)\s+(design|maze|puzzle|word)\s+(.+?)\s*$/))
  .filter(Boolean)
  .map(([, id, version, category, blurb]) => ({ id, version, category, blurb }));

if (entries.length === 0) {
  console.error('lako list produced no entries — is the CLI built? (cargo build --release -p lako-cli)');
  process.exit(1);
}

// ── content collection ──
const outDir = 'src/content/generators';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const escape = (s) => s.replace(/"/g, '\\"');
let written = 0;
for (const entry of entries) {
  const infoPath = join(repo, `crates/lako-${entry.id}/INFO.md`);
  if (!existsSync(infoPath)) {
    console.warn(`skip ${entry.id}: no INFO.md`);
    continue;
  }
  let body = readFileSync(infoPath, 'utf8').replace(/\r\n/g, '\n');
  // The page template renders its own <h1>; take the title from the first
  // heading and drop it (plus the intro line, which duplicates the blurb).
  const title = body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? entry.id;
  body = body.replace(/^#\s+.+\n+/, '');

  const frontmatter = [
    '---',
    `title: "${escape(title)}"`,
    `blurb: "${escape(entry.blurb)}"`,
    `category: ${entry.category}`,
    `version: "${entry.version}"`,
    '---',
    '',
  ].join('\n');
  writeFileSync(join(outDir, `${entry.id}.md`), frontmatter + body);
  written += 1;
}
console.log(`content: ${written} generators`);

// ── imagery (already rendered by the engine, staged in assets-src/) ──
const copies = [
  [join(artSrc, 'thumbs'), 'src/assets/generators'],
  [join(artSrc, 'og'), 'public/og/generators'],
];
for (const [from, to] of copies) {
  if (!existsSync(from)) {
    console.warn(`skip ${from}: not staged`);
    continue;
  }
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log(`${to}: ${readdirSync(to).length} files`);
}
