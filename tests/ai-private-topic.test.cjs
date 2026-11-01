const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

test('keeps the solutions sidebar stable within one content plugin', () => {
  const sidebar = read('solutionsSidebar.js');
  [
    "id: 'index'",
    "id: 'software-delivery'",
    "id: 'platform-engineering'",
    "id: 'ai-private-deployment'",
  ].forEach(id => assert.ok(sidebar.includes(id), `Expected stable topic entry: ${id}`));
  assert.strictEqual((sidebar.match(/type: 'doc'/g) || []).length, 4);
  assert.ok(!sidebar.includes("type: 'link'"));
  assert.ok(!sidebar.includes("type: 'category'"));
  assert.ok(!sidebar.includes("id: 'ai-application-stack-private-deployment'"));
});

test('creates substantive, indexable and structured AI private deployment articles', () => {
  const pages = [
    ['solutions/ai-application-stack-private-deployment.mdx', 'AI应用栈私有化部署：把AI应用部署到自己的服务器'],
    ['solutions/enterprise-intranet-ai-deployment.mdx', '企业AI应用私有化：如何部署到企业内网'],
    ['solutions/offline-xinchuang-ai-deployment.mdx', 'AI应用离线部署与信创适配：让AI应用在隔离环境运行'],
    ['solutions/cloud-to-private-ai-migration.mdx', '从Rainbond Cloud迁移到私有环境：应用模板导出与安装'],
  ];

  pages.forEach(([relativePath, title]) => {
    const pagePath = path.join(root, relativePath);
    assert.ok(fs.existsSync(pagePath), `Expected article: ${relativePath}`);
    const page = read(relativePath);
    assert.ok(page.includes(`title: ${title}`));
    assert.ok(page.includes('<link rel="canonical"'));
    assert.ok(page.includes("'@type': 'TechArticle'"));
    assert.ok(page.includes("inLanguage: 'zh-CN'"));
    assert.ok(page.includes('mainEntityOfPage:'));
    assert.ok(page.includes('isPartOf:'));
    assert.ok(page.includes('about:'));
    assert.ok(!page.includes('noindex'));
    assert.ok(page.includes('](/solutions/ai-private-deployment)'));
    assert.ok(page.includes("import AiPrivateArticleFaq from '@site/src/components/Solutions/AiPrivateArticleFaq';"));
    assert.ok(page.includes('<AiPrivateArticleFaq'));
    assert.ok(page.length > 3000, `Expected concise but substantive content in ${relativePath}`);
  });
});

test('covers the requested keyword cluster without assigning every keyword to every page', () => {
  const main = read('src/components/Solutions/AiPrivateDeployment.tsx');
  [
    'AI应用私有化部署',
    'AI应用部署到自己的服务器',
    '企业AI应用私有化',
    'AI应用内网部署',
    'AI应用离线部署',
    '大模型私有化部署',
    'AI应用栈私有化部署',
    '信创AI应用部署',
    '国产化AI应用平台',
  ].forEach(keyword => assert.ok(main.includes(keyword), `Expected main topic keyword: ${keyword}`));

  const keywordPlans = [
    ['solutions/ai-application-stack-private-deployment.mdx', ['AI应用私有化部署', 'AI应用部署到自己的服务器', '大模型私有化部署']],
    ['solutions/enterprise-intranet-ai-deployment.mdx', ['企业AI应用私有化', 'AI应用内网部署', '企业内网部署AI应用']],
    ['solutions/offline-xinchuang-ai-deployment.mdx', ['AI应用离线部署', '信创AI应用部署', '国产化AI应用平台']],
    ['solutions/cloud-to-private-ai-migration.mdx', ['Cloud迁移到私有环境', 'Rainbond Cloud应用迁移', 'AI应用私有化部署']],
  ];

  keywordPlans.forEach(([relativePath, keywords]) => {
    const page = read(relativePath);
    keywords.forEach(keyword => assert.ok(page.includes(`- ${keyword}`), `Expected ${keyword} in ${relativePath}`));
  });
});

test('links all four articles from the main AI private deployment topic', () => {
  const source = read('src/components/Solutions/AiPrivateDeployment.tsx');
  [
    '/solutions/ai-application-stack-private-deployment',
    '/solutions/enterprise-intranet-ai-deployment',
    '/solutions/offline-xinchuang-ai-deployment',
    '/solutions/cloud-to-private-ai-migration',
    '按部署环境继续阅读',
  ].forEach(copy => assert.ok(source.includes(copy), `Expected topic article entry: ${copy}`));
});

test('uses the same FAQ component structure as the main AI private deployment topic', () => {
  const componentPath = path.join(root, 'src/components/Solutions/AiPrivateArticleFaq.tsx');
  assert.ok(fs.existsSync(componentPath));
  const component = read('src/components/Solutions/AiPrivateArticleFaq.tsx');
  [
    '<div className={styles.faqAccordion}>',
    '<details className={styles.faqItem}',
    '<summary>{item.question}</summary>',
    '<p>{item.answer}</p>',
  ].forEach(copy => assert.ok(component.includes(copy), `Expected FAQ component markup: ${copy}`));
});

test('breaks long articles into reusable visual sections', () => {
  const component = read('src/components/Solutions/AiPrivateArticleVisuals.tsx');
  const styles = read('src/components/Solutions/ai-private-article.module.css');

  [
    'AiPrivateScopeVisual',
    'AiDeploymentAssistantPaths',
    'AiPrivateJourney',
    'AiPrivateProofGallery',
    'AiPrivateOutcomeGrid',
    'loading="lazy"',
    'decoding="async"',
  ].forEach(copy => assert.ok(component.includes(copy), `Expected visual component: ${copy}`));

  [
    '.scopeGrid',
    '.journeyGrid',
    '.proofGrid',
    '.outcomeGrid',
    '@media (max-width: 640px)',
    '@media (prefers-reduced-motion: reduce)',
    "[data-theme='dark']",
  ].forEach(copy => assert.ok(styles.includes(copy), `Expected responsive visual style: ${copy}`));

  assert.ok(component.includes('className={styles.proofItem}'));
  assert.ok(component.includes('<div className={styles.proofCard}>'));
  assert.ok(!component.includes('styles.proofPrimary'));
  assert.ok(styles.includes('grid-template-columns: minmax(0, 1fr)'));
  assert.ok(component.indexOf('<figcaption>') < component.indexOf('<div className={styles.proofImageFrame}>'));

  const articleVisuals = [
    ['solutions/ai-application-stack-private-deployment.mdx', ['<AiPrivateScopeVisual />', '<AiDeploymentAssistantPaths />', '<AiPrivateProofGallery', '<AiPrivateOutcomeGrid']],
    ['solutions/enterprise-intranet-ai-deployment.mdx', ['<AiPrivateJourney', '<AiPrivateProofGallery', '<AiPrivateOutcomeGrid']],
    ['solutions/offline-xinchuang-ai-deployment.mdx', ['<AiPrivateJourney', '<AiPrivateProofGallery', '<AiPrivateOutcomeGrid']],
    ['solutions/cloud-to-private-ai-migration.mdx', ['<AiPrivateJourney', '<AiPrivateProofGallery', '<AiPrivateOutcomeGrid']],
  ];

  articleVisuals.forEach(([relativePath, expected]) => {
    const page = read(relativePath);
    expected.forEach(copy => assert.ok(page.includes(copy), `Expected ${copy} in ${relativePath}`));
  });

  const stackPage = read('solutions/ai-application-stack-private-deployment.mdx');
  ['RainSkills', 'RainAgent', 'AI 生成的代码', 'Dify 类 Agent 应用'].forEach(copy => {
    assert.ok(stackPage.includes(copy), `Expected dual deployment path copy: ${copy}`);
  });

  const offlinePage = read('solutions/offline-xinchuang-ai-deployment.mdx');
  assert.ok(offlinePage.includes('rainskills-deploy.png'));
  assert.ok(offlinePage.includes('/img/video/app-store-install-step-4.png'));
  assert.ok(offlinePage.includes('/img/video/rainbond-llm-install-use-step-7.png'));
  assert.ok(!offlinePage.includes('./roi'));
  assert.ok(!offlinePage.includes('offline-xinchuang-install-step'));
  assert.ok(!offlinePage.includes('应用模板'));
  assert.ok(!offlinePage.includes('offline-delivery-step'));
});

console.log('AI private deployment topic tests passed');
