#!/usr/bin/env node
// Local, read-only checks. Not a vulnerability scanner or release gate.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkLink, markdownLinks } from './check-documentation.mjs';

export const isJunk = name => /(?:^|\/)(?:\.DS_Store|Thumbs\.db|desktop\.ini)$/.test(name);
export const isEnvironment = name => /(?:^|\/)\.env(?:\.|$)/.test(name)
  && !/\.(?:example|sample|template)$/.test(name);
export function missingCommands(text, scripts) {
  return [...new Set([...text.matchAll(/\bnpm run ([\w:-]+)/g)].map(m => m[1]))]
    .filter(name => !Object.hasOwn(scripts, name));
}
export function staleCommands(text, scripts) {
  const rows = [...text.matchAll(/^\|[^\n|]+\| `npm run ([\w:-]+)` \| `([^\n]+)` \|$/gm)];
  return rows.filter(m => Object.hasOwn(scripts, m[1])
    && m[2].replaceAll('&#124;', '|').replaceAll('&#96;', '`') !== scripts[m[1]])
    .map(m => m[1]);
}
function selfTest() {
  assert.equal(isJunk('public/.DS_Store'), true);
  assert.equal(isJunk('docs/desktop.ini.md'), false);
  assert.equal(isEnvironment('.env.production'), true);
  assert.equal(isEnvironment('admin/.env.example'), false);
  assert.equal(isEnvironment('docs/environment.md'), false);
  assert.deepEqual(missingCommands('`npm run test` / `npm run absent`', { test: 'node --test' }), ['absent']);
  assert.deepEqual(missingCommands('`npm run typecheck:app`', { 'typecheck:app': 'tsc' }), []);
  assert.deepEqual(staleCommands('| build | `npm run build` | `old-build` |', { build: 'new-build' }), ['build']);
  assert.deepEqual(staleCommands('| test | `npm run test` | `a &#124; b` |', { test: 'a | b' }), []);
  const files = new Set(['README.md']);
  assert.equal(checkLink('CONTRIBUTING.md', 'README.md', files, () => '# Project'), null);
  assert.match(checkLink('CONTRIBUTING.md', 'missing.md', files, () => ''), /missing path/);
  console.log('repository hygiene self-test: PASS (positive and negative controls)');
}
function main() {
  if (process.argv.includes('--self-test')) return selfTest();
  const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
  const tracked = git(['ls-files', '-z']);
  const files = new Set([...tracked, ...git(['ls-files', '-z', '--others', '--exclude-standard'])]);
  const read = name => fs.readFileSync(path.join(root, name), 'utf8');
  const errors = [], warnings = [];
  const guides = ['CONTRIBUTING.md', 'SECURITY.md', 'docs/REPOSITORY-HYGIENE.md'];
  let links = 0;
  for (const name of guides) {
    if (!files.has(name)) { errors.push(`${name}: missing guide`); continue; }
    if (!fs.existsSync(path.join(root, name))) { errors.push(`${name}: materialize sparse file before checking`); continue; }
    for (const target of markdownLinks(read(name))) {
      links++;
      try { const error = checkLink(name, target, files, read); if (error) errors.push(`${name}: ${error}`); }
      catch { errors.push(`${name}: linked content unavailable for anchor validation`); }
    }
  }
  if (fs.existsSync(path.join(root, 'docs/REPOSITORY-HYGIENE.md'))) {
    const scripts = files.has('package.json') ? JSON.parse(read('package.json')).scripts || {} : {};
    for (const name of missingCommands(read('docs/REPOSITORY-HYGIENE.md'), scripts)) errors.push(`hygiene guide: undeclared root command ${name}`);
    for (const name of staleCommands(read('docs/REPOSITORY-HYGIENE.md'), scripts)) errors.push(`hygiene guide: stale implementation for root command ${name}`);
  }
  for (const name of tracked.filter(isJunk)) errors.push(`${name}: tracked operating-system junk`);
  for (const name of tracked.filter(isEnvironment)) warnings.push(`${name}: tracked environment file; inspect classification privately, never print values`);
  const locks = ['package-lock.json', 'npm-shrinkwrap.json', 'bun.lock', 'bun.lockb', 'pnpm-lock.yaml', 'yarn.lock'].filter(name => files.has(name));
  if (locks.length > 1) warnings.push(`multiple root lockfiles (${locks.join(', ')}); follow project policy, do not auto-delete`);
  for (const warning of warnings) console.warn(`REVIEW: ${warning}`);
  if (errors.length) { for (const error of errors) console.error(`FAIL: ${error}`); process.exitCode = 1; }
  else console.log(`repository hygiene: PASS (${guides.length} guides, ${links} links; ${warnings.length} review notice(s), not a security certification)`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
