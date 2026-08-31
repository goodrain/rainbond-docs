const assert = require('assert');
const fs = require('fs');
const path = require('path');

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
}

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

const root = path.join(__dirname, '..');
const rainskillsDoc = read('docs/ai/rainskills/index.md');
const rainskillsFaqStylesPath = path.join(root, 'docs/ai/rainskills/styles.module.css');
const rainskillsFaqStyles = fs.existsSync(rainskillsFaqStylesPath)
  ? fs.readFileSync(rainskillsFaqStylesPath, 'utf8')
  : '';
const aiOverview = read('docs/ai/index.md');
const demoSource = read('src/components/HomePage/Demo/index.tsx');
const demoStyles = read('src/components/HomePage/Demo/styles.module.css');
const videoPage = read('src/pages/videos/rainskills-ai-deploy.mdx');
const videoData = read('src/data/videoTutorials.ts');

test('keeps the existing RainSkills document as the only canonical product page', () => {
  assert.ok(!fs.existsSync(path.join(root, 'src/pages/rainskills/index.tsx')));
  assert.ok(!fs.existsSync(path.join(root, 'src/pages/rainskills.tsx')));
  assert.ok(rainskillsDoc.includes('https://www.rainbond.com/docs/ai/rainskills'));
});

test('gives the RainSkills document intent-led metadata and social previews', () => {
  [
    'title: RainSkills：让 AI Agent 部署、排障和交付 Rainbond 应用',
    'sidebar_label: RainSkills',
    'description: RainSkills 是 Rainbond 官方开源 Agent Skills',
    'image: /img/video/rainskills-ai-deploy-cover.jpg',
    '<link rel="canonical" href={rainskillsUrl} />',
    '<meta property="og:title" content="RainSkills：让 AI Agent 部署、排障和交付 Rainbond 应用 | Rainbond" />',
    '<meta property="og:image" content={rainskillsImageUrl} />',
    '<meta name="twitter:card" content="summary_large_image" />',
  ].forEach(copy => assert.ok(rainskillsDoc.includes(copy), `Expected RainSkills SEO metadata: ${copy}`));
});

test('keeps the AI capability overview on the current RainSkills install path', () => {
  assert.ok(aiOverview.includes('npx --yes rainskills'));
  assert.ok(!aiOverview.includes('bash <(curl -fsSL https://get.rainbond.com/rainskills/install.sh)'));
  assert.ok(aiOverview.includes('[RainSkills：AI 编码工作流技能](/docs/ai/rainskills)'));
});

test('defines one consistent RainSkills entity for generative search', () => {
  [
    'https://www.rainbond.com/docs/ai/rainskills#software',
    "'@type': 'SoftwareApplication'",
    "'@type': 'TechArticle'",
    "'@type': 'FAQPage'",
    "'@type': 'BreadcrumbList'",
    "applicationCategory: 'DeveloperApplication'",
    'isAccessibleForFree: true',
    "dateModified: '2026-08-31'",
    'https://github.com/goodrain/rainskills',
    'https://www.npmjs.com/package/rainskills',
    '<script type="application/ld+json">',
  ].forEach(token => assert.ok(rainskillsDoc.includes(token), `Expected entity signal: ${token}`));
});

test('answers the core RainSkills discovery questions in visible text', () => {
  [
    '# RainSkills：让 AI 帮你部署应用',
    'RainSkills 是 Rainbond 官方开源 Agent Skills',
    '## 为什么不直接让 Agent 操作服务器？',
    '## RainSkills 如何工作？',
    '## RainSkills 能做什么？',
    '## RainSkills 与 RainAgent 有什么区别？',
    '## 安全、权限和数据边界',
    '## 常见问题',
    '最后更新：2026-08-31',
  ].forEach(copy => assert.ok(rainskillsDoc.includes(copy), `Expected visible GEO answer: ${copy}`));
  assert.ok(!rainskillsDoc.includes('# RainSkills：让 AI Agent 把项目部署到 Rainbond'));
});

test('presents the visible FAQ as accessible cards with polished open and reduced-motion states', () => {
  [
    "import styles from './styles.module.css';",
    '<div className={styles.faqList}>',
    '<details key={faq.question} className={styles.faqItem}>',
    '<summary className={styles.faqSummary}>',
    '<span className={styles.faqQuestion}>{faq.question}</span>',
    '<span className={styles.faqIcon} aria-hidden="true" />',
    '<div className={styles.faqAnswer}>',
  ].forEach(markup => assert.ok(rainskillsDoc.includes(markup), `Expected FAQ markup: ${markup}`));

  [
    '.faqList',
    'display: grid;',
    '.faqItem',
    'border-radius: 14px;',
    '.faqSummary',
    'cursor: pointer;',
    'min-height: 64px;',
    '.faqSummary::-webkit-details-marker',
    '.faqItem[open]',
    '.faqItem[open] .faqIcon::after',
    '.faqAnswer',
    'border-top:',
    '@keyframes faqReveal',
    '@media (prefers-reduced-motion: reduce)',
    ":global(html[data-theme='dark']) .faqItem",
    '@media (max-width: 576px)',
  ].forEach(token => assert.ok(rainskillsFaqStyles.includes(token), `Expected FAQ style: ${token}`));
});

test('renders the RainSkills workflow as an explicit top-to-bottom semantic sequence', () => {
  const orderedSteps = [
    "title: '当前项目'",
    "title: 'AI Agent'",
    "title: 'RainSkills'",
    "title: 'Rainbond MCP'",
    "title: 'Rainbond 应用运行平台'",
    "title: '目标运行环境'",
  ];
  let previousIndex = -1;
  orderedSteps.forEach(step => {
    const currentIndex = rainskillsDoc.indexOf(step);
    assert.ok(currentIndex > previousIndex, `Expected workflow order after ${previousIndex}: ${step}`);
    previousIndex = currentIndex;
  });

  [
    '<ol className={styles.workflowList} aria-label="RainSkills 从项目到运行环境的工作流程">',
    'className={step.emphasis ? `${styles.workflowStep} ${styles.workflowStepEmphasis}` : styles.workflowStep}',
    '<span className={styles.workflowMarker} aria-hidden="true">',
    "{String(index + 1).padStart(2, '0')}",
    '<div className={styles.workflowCard}>',
    '<strong>{step.title}</strong>',
    '<p>{step.description}</p>',
  ].forEach(markup => assert.ok(rainskillsDoc.includes(markup), `Expected workflow markup: ${markup}`));

  [
    '.workflowList',
    '.workflowStep',
    '.workflowStep:not(:last-child)::after',
    '.workflowStep:not(:last-child)::before',
    '.workflowMarker',
    '.workflowCard',
    '.workflowStepEmphasis .workflowCard',
    ":global(html[data-theme='dark']) .workflowCard",
    '@media (max-width: 576px)',
  ].forEach(token => assert.ok(rainskillsFaqStyles.includes(token), `Expected workflow style: ${token}`));

  assert.ok(!rainskillsDoc.includes('当前项目\n  → Codex / Claude Code 等 AI Agent'));
});

test('describes every supported Rainbond connection and installation target without a single-node-only ambiguity', () => {
  [
    'RainSkills 可以连接或协助准备以下 Rainbond 环境：',
    '已经运行的私有化 Rainbond。',
    '由安装器引导新建的单机版或多节点集群版 Rainbond。',
    '在已有 Kubernetes 集群中安装并接入 Rainbond。',
  ].forEach(copy => assert.ok(rainskillsDoc.includes(copy), `Expected Rainbond target: ${copy}`));

  assert.ok(!rainskillsDoc.includes('安装器可以继续引导安装单机版 Rainbond；多节点、高可用和离线安装仍应使用对应的 Rainbond 安装方案'));
  assert.ok(!rainskillsDoc.includes('等待明确确认后安装单机版 Rainbond'));
  assert.ok(!rainskillsDoc.includes('新安装单机版 Rainbond'));
  assert.ok(!rainskillsDoc.includes('## 连接 Rainbond'));
  assert.ok(!rainskillsDoc.includes('### Rainbond Cloud'));
  assert.ok(!rainskillsDoc.includes('### 已有私有化 Rainbond'));
  assert.ok(!rainskillsDoc.includes('### 还没有 Rainbond'));
});

test('keeps the primary RainSkills installation path simple and direct', () => {
  [
    '## 安装 RainSkills',
    '帮我安装 RainSkills，并连接到我要使用的 Rainbond。',
    'npx --yes rainskills',
    '更多安装方式和高级参数请查看',
  ].forEach(copy => assert.ok(rainskillsDoc.includes(copy), `Expected current install path: ${copy}`));

  [
    '## 快速开始',
    '## 安装方式',
    '### Skill 市场安装',
    '### Codex Plugin 安装',
    '### Claude Code Plugin 安装',
    'npx skills add goodrain/rainskills',
    'codex plugin marketplace add goodrain/rainskills',
    '/plugin marketplace add goodrain/rainskills',
    'npx --yes rainskills all --saas',
    'npx --yes rainskills all --self-hosted',
    '如果无法使用 npx，再使用 CDN 兜底命令：',
  ].forEach(copy => assert.ok(!rainskillsDoc.includes(copy), `Expected the main install flow to omit: ${copy}`));
});

test('links the homepage architecture to the canonical RainSkills document', () => {
  assert.ok(demoSource.includes("import Link from '@docusaurus/Link';"));
  assert.ok(demoSource.includes("{ label: 'RainSkills', to: '/docs/ai/rainskills' }"));
  assert.ok(/<Link\s+to=\{capability\.to\}[\s\S]*?aria-label="了解 RainSkills"/.test(demoSource));
  assert.ok(/\.platformTagLink\s*\{[\s\S]*?color:\s*inherit;[\s\S]*?text-decoration:\s*none;/.test(demoStyles));
  assert.ok(/\.platformTagLink:focus-visible\s*\{[\s\S]*?outline:/.test(demoStyles));
});

test('updates the RainSkills video entry to the current install path and SEO intent', () => {
  [
    'title: RainSkills 安装使用视频：让 AI Agent 部署 Rainbond 应用',
    'description: 通过视频学习 RainSkills 安装、Agent 接入、Rainbond 授权和一句话部署应用的完整流程。',
    'image: /img/video/rainskills-ai-deploy-cover.jpg',
  ].forEach(copy => assert.ok(videoPage.includes(copy), `Expected RainSkills video metadata: ${copy}`));

  assert.ok(videoData.includes("command: 'npx --yes rainskills'"));
  assert.ok(videoData.includes('当前推荐使用 npx 安装'));
  assert.ok(videoData.includes('CDN 命令作为 Node.js 不可用时的兜底方式'));
});

console.log('RainSkills SEO and GEO tests passed');
