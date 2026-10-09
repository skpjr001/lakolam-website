// Markdown twins for AI agents (the Dualmark / AEO Spec v1.0 convention,
// https://dualmark.dev): every HTML page gets a clean markdown copy at
// `<path>.md` — /about/ → /about.md, / → /index.md, /generators/sudoku/ →
// /generators/sudoku.md — plus /llms.txt (the index), /llms-full.txt (every
// generator's full write-up) and /sitemap.md.
//
// Runs after `astro build` (an integration hook in astro.config.mjs), reading
// the built HTML and the generator content collection. The Worker in
// worker.ts serves the twins: to `Accept: text/markdown` requests and known
// AI crawlers on the page's own URL, and directly at the .md URL.
//
//   node scripts/markdown-twins.mjs [dist]   (also runs by hand)

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';

const SITE_URL = 'https://www.lakolam.com';
const STUDIO = 'https://app.lakolam.com';
const MCP_URL = 'https://mcp.lakolam.com/mcp';
const REPO = 'https://github.com/skpjr001/lakolam';
const ART_SEED = '0xa11ce';

// Mirrors src/lib/site.ts (a plain .mjs script cannot import the TypeScript).
const LANES = [
  { cat: 'design', slug: 'designs', label: 'Designs' },
  { cat: 'maze', slug: 'mazes', label: 'Mazes' },
  { cat: 'puzzle', slug: 'puzzles', label: 'Logic puzzles' },
  { cat: 'word', slug: 'words', label: 'Word puzzles' },
  { cat: 'maths', slug: 'maths', label: 'Maths worksheets' },
];
const LANE_OF = Object.fromEntries(LANES.map((l) => [l.cat, l]));

/** The hand-written pages, converted from their built HTML. */
const PAGES = [
  { path: '/', file: 'index.html', title: 'Home' },
  { path: '/about/', file: 'about/index.html', title: 'About the engine' },
  { path: '/studio/', file: 'studio/index.html', title: 'The browser studio' },
  { path: '/mcp/', file: 'mcp/index.html', title: 'Lakolam for AI agents — the MCP server' },
  { path: '/brand/', file: 'brand/index.html', title: 'Brand kit' },
];

const abs = (path) => new URL(path, SITE_URL).href;
const mdPath = (path) => (path.replace(/\/+$/, '') || '/index') + '.md';
const studioUrl = (id) => `${STUDIO}/?${new URLSearchParams({ g: id, seed: ART_SEED })}`;

/** Generator entries from src/content/generators/*.md (flat YAML frontmatter). */
function readGenerators(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const text = readFileSync(join(dir, f), 'utf8').replace(/\r\n/g, '\n');
      const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!m) throw new Error(`${f}: no frontmatter`);
      const data = {};
      for (const line of m[1].split('\n')) {
        const kv = line.match(/^(\w+):\s*(.*)$/);
        if (kv) data[kv[1]] = kv[2].startsWith('"') ? JSON.parse(kv[2]) : kv[2];
      }
      return { id: f.slice(0, -3), ...data, body: m[2].trim() };
    });
}

function generatorTwin(g) {
  const lane = LANE_OF[g.category];
  return [
    `# ${g.title}`,
    '',
    `> ${g.blurb}.`,
    '',
    `- Lane: [${lane.label}](${abs(`/${lane.slug}/`)})`,
    `- Version: ${g.version}`,
    `- Web page: ${abs(`/generators/${g.id}/`)}`,
    `- Open in the studio (seed ${ART_SEED}): ${studioUrl(g.id)}`,
    `- Generate from an AI agent: the MCP server at ${MCP_URL}, generator id \`${g.id}\``,
    `- Command line: \`lako preview -g ${g.id} --seed ${ART_SEED}\``,
    '',
    // INFO.md headings start at ##, under the # title above.
    g.body,
    '',
  ].join('\n');
}

const listLine = (g) => `- [${g.title}](${abs(`/generators/${g.id}/`)}): ${g.blurb}`;

function laneTwin(lane, items) {
  return [
    `# ${items.length} ${lane.label.toLowerCase()}`,
    '',
    `> Every Lakolam ${lane.label.toLowerCase().replace(/s$/, '')} generator. Each page below has a markdown twin at its URL with .md in place of the trailing slash.`,
    '',
    ...items.map(listLine),
    '',
    `All generators: ${abs('/generators/')}`,
    '',
  ].join('\n');
}

function generatorsTwin(byLane, total) {
  const out = [
    `# ${total} generators`,
    '',
    `> Every Lakolam generator, by lane. Each one is deterministic: the same generator, version, spec and seed give the same page, byte for byte. Every logic puzzle is proven to have exactly one solution.`,
    '',
  ];
  for (const { lane, items } of byLane) {
    out.push(`## ${lane.label} (${items.length})`, '', `Lane page: ${abs(`/${lane.slug}/`)}`, '');
    out.push(...items.map(listLine), '');
  }
  return out.join('\n');
}

/** An element's text with a space between its child elements ("172 Design …", not "172Design"). */
const spacedText = (node) =>
  node.nodeType === 3
    ? node.nodeValue
    : [...node.childNodes].map(spacedText).join(node.nodeType === 1 ? ' ' : '');
const squash = (text) => text.replace(/\s+/g, ' ').trim();

/** The <main> of a built page as markdown, without scripts, art and widgets. */
function htmlTwin(html, page) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
  if (!main) throw new Error(`${page.file}: no <main>`);
  const base = abs(page.path);
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
  td.remove(['script', 'style', 'svg', 'canvas', 'noscript', 'template', 'button', 'form']);
  // Images are engine renders and page art: their URLs are build hashes, and
  // the generator twins already say how to make each page.
  td.addRule('noImages', { filter: ['img', 'picture'], replacement: () => '' });
  // Links resolve against the page (so #anchors stay on it) and become
  // absolute, so a twin read on its own still works. A card — a link wrapping
  // a heading and a paragraph — becomes one list line.
  td.addRule('links', {
    filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
    replacement: (content, node) => {
      const href = new URL(node.getAttribute('href'), base).href;
      const heading = node.querySelector('h2, h3, h4');
      if (heading) {
        const title = squash(heading.textContent);
        const rest = squash(spacedText(node).replace(heading.textContent, ' '));
        return `\n- [${title}](${href})${rest ? `: ${rest}` : ''}\n`;
      }
      const text = content.replace(/\s+/g, ' ').trim();
      return text ? ` [${text}](${href}) ` : '';
    },
  });
  let md = td
    .turndown(main)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/^ \[/gm, '[')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!/^# /m.test(md)) md = `# ${page.title}\n\n${md}`;
  return md + '\n';
}

function llmsTxt(byLane, total) {
  const out = [
    '# Lakolam',
    '',
    `> Lakolam is a free, open-source generative engine: ${total} deterministic generators for printable mandalas, kolams and other designs, mazes, logic puzzles, word puzzles and maths worksheets. Every page is reproducible from a seed, every logic puzzle is proven to have exactly one solution, and pages render as SVG, PNG or print-ready PDF with answer keys.`,
    '',
    'Every page on www.lakolam.com has a markdown twin: request it with `Accept: text/markdown`, or add .md in place of the trailing slash (/about/ → /about.md, / → /index.md).',
    '',
    '## Core Products',
    '',
    `- [Browser studio](${STUDIO}/): Pick a generator, set its options and seed, download SVG, PNG or PDF — runs entirely in the browser (WebAssembly)`,
    `- [Book builder](${STUDIO}/book/): Assemble whole KDP-ready books — interior PDF and full-wrap cover`,
    `- [MCP server for AI agents](${abs('/mcp/')}): Hosted at ${MCP_URL} (Streamable HTTP, free, no account); or run lako-mcp locally over stdio`,
    `- [Source code](${REPO}): The Rust workspace — engine, \`lako\` CLI, studio and MCP server`,
    '',
    '## Documentation',
    '',
    `- [About the engine](${abs('/about/')}): How the engine works — one display list, seeded randomness, proven puzzles, honest difficulty`,
    `- [The studio](${abs('/studio/')}): What the browser studio does`,
    `- [AI agents (MCP)](${abs('/mcp/')}): Installing the MCP server in Claude, Cursor, VS Code, Codex and others; its tools`,
    `- [All generators](${abs('/generators/')}): The full catalogue, by lane`,
    `- [Full generator write-ups](${abs('/llms-full.txt')}): Every generator's description, rules, history and guarantees in one file`,
    '',
    '## Company',
    '',
    `- [Brand kit](${abs('/brand/')}): Logo, colours and usage`,
    `- [Home](${abs('/')}): Overview and contact`,
    '',
  ];
  for (const { lane, items } of byLane) {
    out.push(`## ${lane.label}`, '', `${items.length} generators — lane page ${abs(`/${lane.slug}/`)}`, '');
    out.push(...items.map(listLine), '');
  }
  out.push(
    '## What We Do Not Do',
    '',
    '- Lakolam does not use generative AI models to make pages: every design, maze and puzzle is computed by a deterministic algorithm from a seed.',
    '- Lakolam does not sell printed books or physical products; it makes the printable files.',
    '- Lakolam does not need an account, and the studio does not upload your pages anywhere — generation runs in your browser.',
    '- Lakolam does not label puzzle difficulty by guesswork: a puzzle is rated by the hardest solving technique it actually needs.',
    '',
  );
  return out.join('\n');
}

function llmsFullTxt(gens, total) {
  const out = [
    '# Lakolam — every generator in full',
    '',
    `> The complete write-up of all ${total} Lakolam generators: what each one makes, how to play or use it, its history, and how this implementation generates, solves and guarantees its pages. The index is ${abs('/llms.txt')}.`,
    '',
  ];
  for (const g of gens) {
    // Demote each write-up one level so they nest under this file's title.
    out.push(generatorTwin(g).replace(/^(#+) /gm, '#$1 '), '---', '');
  }
  return out.join('\n');
}

function sitemapMd(byLane) {
  const out = ['# Sitemap', '', '## Pages', ''];
  for (const p of PAGES) out.push(`- [${p.title}](${abs(mdPath(p.path))})`);
  out.push(`- [All generators](${abs('/generators.md')})`, '');
  for (const { lane, items } of byLane) {
    out.push(`## ${lane.label}`, '', `- [${lane.label} — the lane](${abs(`/${lane.slug}.md`)})`);
    out.push(...items.map((g) => `- [${g.title}](${abs(`/generators/${g.id}.md`)})`), '');
  }
  return out.join('\n');
}

export function writeMarkdownTwins(dist, contentDir = 'src/content/generators') {
  const gens = readGenerators(contentDir);
  const byLane = LANES.map((lane) => ({ lane, items: gens.filter((g) => g.category === lane.cat) }));
  const write = (rel, text) => writeFileSync(join(dist, rel), text);

  for (const g of gens) write(`generators/${g.id}.md`, generatorTwin(g));
  for (const { lane, items } of byLane) write(`${lane.slug}.md`, laneTwin(lane, items));
  write('generators.md', generatorsTwin(byLane, gens.length));
  for (const p of PAGES) {
    write(mdPath(p.path).slice(1), htmlTwin(readFileSync(join(dist, p.file), 'utf8'), p));
  }
  write('llms.txt', llmsTxt(byLane, gens.length));
  write('llms-full.txt', llmsFullTxt(gens, gens.length));
  write('sitemap.md', sitemapMd(byLane));
  return gens.length + LANES.length + 1 + PAGES.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const n = writeMarkdownTwins(process.argv[2] ?? 'dist');
  console.log(`markdown twins: ${n} pages, llms.txt, llms-full.txt, sitemap.md`);
}
