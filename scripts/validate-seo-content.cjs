const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');
const keywordMap = JSON.parse(fs.readFileSync(path.join(root, 'src/data/seo-keyword-map.json'), 'utf8'));
const errors = [];

function htmlPath(route) {
  if (route === '/') return path.join(buildDir, 'index.html');
  const clean = route.replace(/^\//, '');
  const candidates = [path.join(buildDir, `${clean}.html`), path.join(buildDir, clean, 'index.html')];
  return candidates.find(fs.existsSync);
}

function count(html, regex) {
  return [...html.matchAll(regex)].length;
}

const uniqueKeywords = new Set(keywordMap.map((item) => item.keyword));
if (keywordMap.length !== 46 || uniqueKeywords.size !== 46) {
  errors.push(`关键词映射应为 46 项，当前为 ${keywordMap.length} 项 / ${uniqueKeywords.size} 个唯一词`);
}

const targetRoutes = new Set(['/solutions', '/solutions/software-delivery', '/it-and-enterprise', '/solutions/platform-engineering', '/solutions/ai-private-deployment', '/compare', '/offline-and-xinchuang', '/offline-and-xinchuang/offline-delivery']);
keywordMap.forEach((item) => targetRoutes.add(item.path));
const pageTitles = new Map();

for (const route of targetRoutes) {
  const file = htmlPath(route);
  if (!file) {
    errors.push(`${route}: 构建产物不存在`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch || titleMatch[1].trim() === 'Rainbond') {
    errors.push(`${route}: 缺少有效且具体的 title`);
  } else {
    const title = titleMatch[1].trim();
    if (pageTitles.has(title)) errors.push(`${route}: title 与 ${pageTitles.get(title)} 重复`);
    pageTitles.set(title, route);
  }
  if (!/<meta[^>]+name="description"[^>]+content="[^"]{30,}"/i.test(html) && !/<meta[^>]+content="[^"]{30,}"[^>]+name="description"/i.test(html)) errors.push(`${route}: 缺少有效 description`);
  if (count(html, /<h1(?:\s|>)/gi) !== 1) errors.push(`${route}: H1 数量不是 1`);
  if (count(html, /<link[^>]+rel="canonical"/gi) !== 1) errors.push(`${route}: canonical 数量不是 1`);
  if (!/<meta[^>]+property="og:title"/i.test(html)) errors.push(`${route}: 缺少 og:title`);
  if (!/<meta[^>]+property="og:description"/i.test(html)) errors.push(`${route}: 缺少 og:description`);

  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (jsonLdBlocks.length === 0) errors.push(`${route}: 缺少 JSON-LD`);
  for (const block of jsonLdBlocks) {
    try { JSON.parse(block[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&')); }
    catch (error) { errors.push(`${route}: JSON-LD 无法解析 (${error.message})`); }
  }
}

const sitemapFile = path.join(buildDir, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  errors.push('缺少 sitemap.xml');
} else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  for (const route of targetRoutes) {
    const url = `https://www.rainbond.com${route === '/' ? '/' : route}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) errors.push(`Sitemap 缺少 ${url}`);
    const start = sitemap.indexOf(`<loc>${url}</loc>`);
    const end = start >= 0 ? sitemap.indexOf('</url>', start) : -1;
    const entry = start >= 0 && end >= 0 ? sitemap.slice(start, end) : '';
    if (!entry.includes('<lastmod>2026-10-25</lastmod>')) errors.push(`Sitemap lastmod 不是本次更新时间：${url}`);
  }
  if (!sitemap.includes('<lastmod>')) errors.push('Sitemap 缺少 lastmod');
  ['/solutions/developer-self-service', '/solutions/modular-application'].forEach((route) => {
    if (sitemap.includes(`<loc>https://www.rainbond.com${route}</loc>`)) errors.push(`已融合页面仍出现在 Sitemap：${route}`);
  });
}

[
  ['/solutions/developer-self-service', '/solutions/platform-engineering'],
  ['/solutions/modular-application', '/solutions/software-delivery'],
].forEach(([from, to]) => {
  const file = htmlPath(from);
  if (!file) errors.push(`缺少旧 URL 重定向：${from}`);
  else if (!fs.readFileSync(file, 'utf8').includes(to)) errors.push(`${from} 未重定向到 ${to}`);
});

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`SEO 内容校验通过：46 个关键词，${targetRoutes.size} 个目标页面。`);
