import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const dist = new URL('../dist/', import.meta.url).pathname;
const origin = 'https://moving.emfls.com';
const routes = [
  ['/', 'index.html'],
  ['/about/', 'about/index.html'],
  ['/privacy/', 'privacy/index.html'],
  ['/contact/', 'contact/index.html'],
  ['/editorial-policy/', 'editorial-policy/index.html'],
];

test('build emits the Korean planning route and trust pages with custom-domain canonicals', () => {
  for (const [route, file] of routes) {
    const path = join(dist, file);
    assert.ok(existsSync(path), `missing public route ${route}`);

    const html = readFileSync(path, 'utf8');
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${route}">`), `wrong canonical for ${route}`);
    assert.match(html, /<meta name="description" content="[^"]+">/, `missing description for ${route}`);
    assert.match(html, /<title>[^<]+<\/title>/, `missing title for ${route}`);
  }

  const home = readFileSync(join(dist, 'index.html'), 'utf8');
  for (const phase of ['D-30', 'D-14', 'D-7', 'D-1', '이사 당일', 'D+1']) {
    assert.ok(home.includes(phase), `missing moving phase ${phase}`);
  }
});

test('robots and sitemap identify the production origin and only public routes', () => {
  const robotsPath = join(dist, 'robots.txt');
  const sitemapPath = join(dist, 'sitemap.xml');
  assert.ok(existsSync(robotsPath), 'robots.txt must be served as a static text file');
  assert.ok(existsSync(sitemapPath), 'sitemap.xml must be served as a static XML file');

  const robots = readFileSync(robotsPath, 'utf8');
  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Allow:\s*\//);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));

  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const [route] of routes) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `sitemap missing ${route}`);
  assert.ok(!sitemap.includes('/404'), 'the error page must not be indexed as a public route');
  assert.ok(!sitemap.includes('localhost'), 'the sitemap must not contain preview URLs');
});

test('unknown routes have a branded noindex 404 document', () => {
  const path = join(dist, '404.html');
  assert.ok(existsSync(path), 'Cloudflare Pages needs a custom 404 document');

  const html = readFileSync(path, 'utf8');
  assert.ok(html.includes('<meta name="robots" content="noindex, nofollow">'));
  assert.match(html, /<h1[^>]*>[^<]*(404|찾을 수 없)[^<]*<\/h1>/i);
  assert.ok(html.includes('https://moving.emfls.com/'), '404 should link back to the canonical home page');
});

test('IndexNow key file is publicly served and matches its filename', () => {
  const keyFiles = readdirSync(dist).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  assert.equal(keyFiles.length, 1, 'exactly one 128-bit IndexNow verifier must be published');
  const key = keyFiles[0].slice(0, -4);
  assert.equal(readFileSync(join(dist, keyFiles[0]), 'utf8').trim(), key);
});
