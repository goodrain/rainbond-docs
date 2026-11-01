const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const map = JSON.parse(fs.readFileSync(path.join(root, 'src/data/seo-keyword-map.json'), 'utf8'));

assert.strictEqual(map.length, 46);
assert.strictEqual(new Set(map.map((item) => item.keyword)).size, 46);

const expectedPages = [
  '/solutions/software-delivery',
  '/it-and-enterprise',
  '/solutions/platform-engineering',
  '/solutions/ai-private-deployment',
  '/compare',
  '/offline-and-xinchuang',
];
expectedPages.forEach((page) => assert.ok(map.some((item) => item.path === page), `missing keyword owner: ${page}`));

const topicFiles = [
  'solutions/index.mdx',
  'solutions/software-delivery.mdx',
  'solutions/platform-engineering.mdx',
];
topicFiles.forEach((file) => assert.ok(fs.existsSync(path.join(root, file)), `missing topic: ${file}`));
assert.ok(!fs.existsSync(path.join(root, 'solutions/developer-self-service.mdx')));
assert.ok(!fs.existsSync(path.join(root, 'solutions/modular-application.mdx')));
assert.ok(!map.some((item) => item.path === '/solutions/developer-self-service'));
assert.ok(!map.some((item) => item.path === '/solutions/modular-application'));

const config = fs.readFileSync(path.join(root, 'docusaurus.config.js'), 'utf8');
assert.ok(config.includes("from: '/solutions/developer-self-service'"));
assert.ok(config.includes("to: '/solutions/platform-engineering'"));
assert.ok(config.includes("from: '/solutions/modular-application'"));
assert.ok(config.includes("to: '/solutions/software-delivery'"));

const tutorialDir = path.join(root, 'docs/how-to-guides/scenario-tutorials');
assert.strictEqual(fs.readdirSync(tutorialDir).filter((file) => file.endsWith('.md') && file !== 'index.md').length, 10);

const articleSlugs = [
  'deliver-software-to-customer-intranet',
  'upgrade-multi-customer-private-projects',
  'xinchuang-application-migration-delivery',
  'unified-management-for-enterprise-applications',
  'deploy-app-without-dedicated-ops',
  'manage-container-apps-without-kubernetes',
  'platform-engineering-needs-application-abstraction',
  'build-enterprise-capability-market',
  'dify-n8n-production-private-deployment',
  'ai-application-delivery-offline-xinchuang',
];
const blogSource = fs.readdirSync(path.join(root, 'blog/2026'))
  .map((file) => fs.readFileSync(path.join(root, 'blog/2026', file), 'utf8'))
  .join('\n');
articleSlugs.forEach((slug) => assert.ok(blogSource.includes(`slug: ${slug}`), `missing article: ${slug}`));

console.log('SEO content map tests passed');
