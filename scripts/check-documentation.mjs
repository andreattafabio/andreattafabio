#!/usr/bin/env node
// Read-only, dependency-free documentation and generated-branding guard.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Visually verified legacy generator icons/social card, identified by Git blob SHA-1.
const generatedAssets = new Set([
  '32e0122d3273208e97d5024356b57de1ed694a67',
  '3c01d69713f9c184e92b74f5799e6dff2f500825',
  '89e22ee99cb0965d775b3940b90c91c6b9e65385',
]);

export function gitBlobHash(bytes) {
  return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
}

function proseOnly(text) {
  return text.replace(/^(`{3,}|~{3,}).*\n[\s\S]*?^\1\s*$/gm, '');
}

export function markdownLinks(text) {
  const prose = proseOnly(text);
  return [...prose.matchAll(/\]\((<[^>\n]+>|[^\s)]+)(?:\s+["'][^\n]*?["'])?\)/g)]
    .map(m => m[1].replace(/^<|>$/g, ''));
}

export function headings(text) {
  text = proseOnly(text);
  const seen = new Map();
  const anchors = new Set();
  for (const match of text.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
    const slug = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]*>/g, '')
      .toLowerCase().replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').replace(/\s/g, '-');
    let n = seen.get(slug) || 0;
    while (anchors.has(n ? `${slug}-${n}` : slug)) n++;
    anchors.add(n ? `${slug}-${n}` : slug);
    seen.set(slug, n + 1);
  }
  for (const match of text.matchAll(/(?:id|name)=["']([^"']+)["']/g)) anchors.add(match[1]);
  return anchors;
}

export function branded(text) {
  return /welcome to your lovable project|lovable generated project|(?:built|made|powered) (?:this project )?(?:with|by)\s+(?:\[|<[^>]+>)*lovable|^##?\s+build with lovable|cdn\.gpteng\.co\/gptengineer\.js|lovable\.dev\/opengraph|<meta\s+[^>]*name=["']author["'][^>]*content=["']lovable["']|name:\s*["']Lovable["']\s*,\s*detail:|techStack:\s*\[[^\]\n]*["']Lovable["']|<dt>Built by<\/dt><dd>[^<]*Lovable/im.test(text);
}

export function checkLink(from, target, files, read) {
  if (/^[a-z][\w+.-]*:/i.test(target) || target.startsWith('//')) return null;
  const [rawPath, rawAnchor] = target.split('#');
  let decoded;
  try { decoded = decodeURIComponent(rawPath.split('?')[0]); } catch { return `invalid URL encoding: ${target}`; }
  const resolved = decoded ? path.posix.normalize(decoded.startsWith('/') ? decoded.slice(1) : path.posix.join(path.posix.dirname(from), decoded)) : from;
  if (resolved === '.' && !rawAnchor) return null;
  if (!files.has(resolved) && ![...files].some(f => f.startsWith(resolved.replace(/\/$/, '') + '/'))) return `missing path: ${target}`;
  if (rawAnchor && /\.md$/i.test(resolved) && files.has(resolved)) {
    let anchor;
    try { anchor = decodeURIComponent(rawAnchor); } catch { return `invalid anchor encoding: ${target}`; }
    if (!headings(read(resolved)).has(anchor)) return `missing Markdown anchor: ${target}`;
  }
  return null;
}

function selfTest() {
  const files = new Set(['README.md', 'docs/START.md', 'public/site.svg']);
  const read = () => '# Setup\n\n## More checks\n\n## More checks\n';
  assert.equal(checkLink('docs/START.md', '../README.md#setup', files, read), null);
  assert.match(checkLink('docs/START.md', '../missing.md', files, read), /missing path/);
  assert.match(checkLink('docs/START.md', '../README.md#missing', files, read), /missing Markdown anchor/);
  assert.equal(checkLink('README.md', '#more-checks-1', files, read), null);
  assert.equal(checkLink('README.md', 'https://example.invalid/absent', files, read), null);
  assert.deepEqual(markdownLinks('![Logo](public/site.svg)\n[x](<docs/START.md>)'), ['public/site.svg', 'docs/START.md']);
  assert.equal(branded('Welcome to your Lovable project'), true);
  assert.equal(branded('This project was built with [Lovable](https://example.invalid)'), true);
  assert.equal(branded('<script src="https://cdn.gpteng.co/gptengineer.js"></script>'), true);
  assert.equal(branded('Technical names: LOVABLE_API_KEY, lovable-uploads, @lovable.dev/vite-tanstack-config'), false);
  assert.equal(branded('<strong>Lovable</strong> — website hosting.'), false);
  assert.equal(branded('Changes made in Lovable may synchronize to the connected branch.'), false);
  assert.equal(branded('{ name: "Lovable", detail: "Website builder" }'), true);
  assert.equal(headings('```sh\n# Not a heading\n```\n# Real heading').has('not-a-heading'), false);
  assert.equal(gitBlobHash(Buffer.from('test content\n')), 'd670460b4b4aece5915caf5c68d12f560a9fe3e4');
  console.log('documentation guard self-test: PASS (positive and negative controls)');
}

function main() {
  if (process.argv.includes('--self-test')) return selfTest();
  const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
  const list = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
  const files = new Set(list);
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const checks = ['README.md', 'AGENTS.md', 'docs/AGENT-START.md', 'docs/HANDOFF-TEMPLATE.md', 'docs/DOCUMENTATION-QUALITY.md'];
  for (const file of ['CONTRIBUTING.md', 'SECURITY.md', 'ARCHITECTURE.md', 'docs/README.md', 'docs/ARCHITECTURE.md', 'docs/CONTRIBUTING.md', 'docs/TESTING.md', 'docs/DEPLOYMENT.md', 'docs/CONFIGURATION-REFERENCE.md']) {
    if (files.has(file)) checks.push(file);
  }
  const errors = [];
  let links = 0;
  for (const file of checks) {
    if (!files.has(file)) { errors.push(`${file}: required onboarding guide missing`); continue; }
    if (!fs.existsSync(path.join(root, file))) { errors.push(`${file}: sparse checkout omits checked guide; materialize it before checking`); continue; }
    for (const target of markdownLinks(read(file))) {
      links++;
      try { const error = checkLink(file, target, files, read); if (error) errors.push(`${file}: ${error}`); }
      catch { errors.push(`${file}: target content unavailable for anchor check: ${target}`); }
    }
  }
  const manifest = files.has('package.json') ? JSON.parse(read('package.json')) : { scripts: {} };
  const start = files.has('docs/AGENT-START.md') ? read('docs/AGENT-START.md') : '';
  for (const match of start.matchAll(/(?:npm|bun|pnpm|yarn) run ([\w:-]+)/g)) {
    if (!(match[1] in (manifest.scripts || {}))) errors.push(`docs/AGENT-START.md: undeclared package command ${match[1]}`);
  }
  const surfaces = list.filter(f => f === 'README.md' || f.endsWith('.html') && !f.startsWith('docs/') && !f.startsWith('scratchpad/') || /^(?:src|app|components|lib|data)\//.test(f) && /\.(tsx?|jsx?)$/.test(f));
  for (const file of surfaces) {
    if (!fs.existsSync(path.join(root, file))) { errors.push(`${file}: sparse checkout omits branding surface; materialize it before checking`); continue; }
    if (branded(read(file))) errors.push(`${file}: generated promotional branding/editor injection remains`);
  }
  // Indexed hashes also catch renamed copies. Re-read candidates so an unstaged
  // replacement is checked as it exists now, not misreported from its old index entry.
  const indexed = execFileSync('git', ['ls-files', '--stage', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
  const assets = new Set(list.filter(f => /(?:^|\/)(?:favicon[^/]*|og-image[^/]*|apple-touch-icon[^/]*)\.(?:ico|png|jpe?g|webp|svg)$/i.test(f)));
  for (const entry of indexed) {
    const [metadata, file] = entry.split('\t');
    if (generatedAssets.has(metadata.split(' ')[1])) assets.add(file);
  }
  for (const file of assets) {
    if (!fs.existsSync(path.join(root, file))) { errors.push(`${file}: identity asset unavailable; materialize it before checking`); continue; }
    if (generatedAssets.has(gitBlobHash(fs.readFileSync(path.join(root, file))))) errors.push(`${file}: known generated branding asset remains`);
  }
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`documentation guard: PASS (${checks.length} guides, ${links} links, ${surfaces.length} branding surfaces, ${assets.size} identity assets)`);
  console.log('Scope: selected living-guide inline links/ATX anchors, startup command names, known promotional patterns and exact known asset hashes. External URLs, historical logs, arbitrary UI text, dependency/provider names and visual variants are not certified by this check.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
