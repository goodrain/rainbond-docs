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

test('creates an independent RainSkills content collection with its own sidebar', () => {
  const entryPath = path.join(root, 'rainskills/index.mdx');
  assert.ok(fs.existsSync(entryPath), 'Expected the RainSkills collection entry.');
  assert.ok(!fs.existsSync(path.join(root, 'src/pages/rainskills.tsx')));
  assert.ok(!fs.existsSync(path.join(root, 'solutions/rainskills.mdx')));

  const entry = read('rainskills/index.mdx');
  [
    'slug: /',
    'hide_title: true',
    'hide_table_of_contents: true',
    "import RainSkillsDeployment from '@site/src/components/Solutions/RainSkillsDeployment';",
    '<RainSkillsDeployment />',
  ].forEach(copy => assert.ok(entry.includes(copy), `Expected collection entry: ${copy}`));

  const solutionsSidebar = read('solutionsSidebar.js');
  assert.ok(!solutionsSidebar.includes("id: 'rainskills'"));

  const rainskillsSidebar = read('rainskillsSidebar.js');
  [
    'rainskillsSidebar',
    "type: 'doc'",
    "label: 'AI Agent 部署应用'",
    "id: 'index'",
    "id: 'claude-code-deploy-app'",
    "label: 'Claude Code部署应用'",
    "id: 'codex-deploy-app'",
    "label: 'Codex部署应用'",
    "id: 'ai-deployment-troubleshooting'",
    "label: 'AI项目部署失败自动排查'",
    "id: 'vibe-coding-go-live'",
    "label: 'Vibe Coding项目如何上线'",
  ].forEach(copy => assert.ok(rainskillsSidebar.includes(copy), `Expected RainSkills sidebar: ${copy}`));
  assert.strictEqual((rainskillsSidebar.match(/type: 'doc'/g) || []).length, 5);
  assert.ok(!rainskillsSidebar.includes("type: 'category'"));
  assert.ok(!rainskillsSidebar.includes('collapsed:'));
  assert.ok(!rainskillsSidebar.includes('items:'));

  const config = read('docusaurus.config.js');
  [
    "id: 'rainskills'",
    "path: 'rainskills'",
    "routeBasePath: 'rainskills'",
    "sidebarPath: require.resolve('./rainskillsSidebar.js')",
  ].forEach(copy => assert.ok(config.includes(copy), `Expected RainSkills docs plugin: ${copy}`));

  const layout = read('src/theme/Layout/index.tsx');
  assert.ok(layout.includes("pathname.startsWith('/rainskills')"));
  assert.ok(layout.includes('rainskills_url'));
});

test('adds four substantive and indexable content pages', () => {
  const pages = [
    [
      'rainskills/claude-code-deploy-app.mdx',
      'Claude Code部署应用',
      ['## 先确认这次要部署什么', '## Claude Code 部署应用的完整流程', '## 怎么判断部署真的完成了', '## 常见问题'],
    ],
    [
      'rainskills/codex-deploy-app.mdx',
      'Codex部署应用',
      ['## 在 Codex 里怎么发起部署', '## 用 Codex 部署应用的完整流程', '## 部署结束时要看什么', '## 常见问题'],
    ],
    [
      'rainskills/ai-deployment-troubleshooting.mdx',
      'AI项目部署失败自动排查',
      ['## 别急着重试，先看现象', '## RainSkills 如何逐层排查', '## 一次有效的排查应该留下什么', '## 常见问题'],
    ],
    [
      'rainskills/vibe-coding-go-live.mdx',
      'Vibe Coding项目如何上线',
      ['## 先判断项目能不能上线', '## 原型能运行，为什么还不能直接上线？', '## Vibe Coding 项目上线流程', '## 上线之后，至少要回答这几个问题', '## 常见问题'],
    ],
  ];

  pages.forEach(([relativePath, title, headings]) => {
    const pagePath = path.join(root, relativePath);
    assert.ok(fs.existsSync(pagePath), `Expected content scaffold: ${relativePath}`);
    const page = read(relativePath);
    assert.ok(page.includes(`title: ${title}`), `Expected title for ${relativePath}`);
    assert.ok(!page.includes('noindex'));
    assert.ok(!page.includes('本页内容正在准备中'));
    assert.ok(!page.includes('## 你最终应该得到什么'));
    assert.ok(!page.includes('## 先看你属于哪种情况'));
    assert.ok(!page.includes('## 最短答案'));
    assert.ok(page.includes('<link rel="canonical"'));
    assert.ok(page.includes("'@type': 'TechArticle'"));
    assert.ok(page.includes("inLanguage: 'zh-CN'"));
    assert.ok(page.includes("name: 'Rainbond'"));
    assert.ok(page.includes('mainEntityOfPage:'));
    assert.ok(page.includes('isPartOf:'));
    assert.ok(page.includes('about:'));
    assert.ok(page.includes("image: 'https://www.rainbond.com/img/video/rainskills-ai-deploy-cover.jpg'"));
    assert.ok(page.includes('](/rainskills)'));
    headings.forEach(heading => assert.ok(page.includes(heading), `Expected ${heading} in ${relativePath}`));
    assert.ok(page.length > 3000, `Expected substantive content in ${relativePath}`);
  });

  const sidebar = read('rainskillsSidebar.js');
  let previousIndex = -1;
  [
    'claude-code-deploy-app',
    'codex-deploy-app',
    'ai-deployment-troubleshooting',
    'vibe-coding-go-live',
  ].forEach(id => {
    const currentIndex = sidebar.indexOf(`id: '${id}'`);
    assert.ok(currentIndex > previousIndex, `Expected sidebar order for ${id}`);
    previousIndex = currentIndex;
  });
});

test('uses a distinct keyword cluster for each search intent', () => {
  const keywordPlans = [
    ['rainskills/claude-code-deploy-app.mdx', ['Claude Code部署应用', 'Claude Code部署到服务器', 'Claude Code deployment skill', 'Claude Code部署项目']],
    ['rainskills/codex-deploy-app.mdx', ['Codex部署应用', 'Codex部署项目', 'Codex deployment skill', 'Codex应用上线']],
    ['rainskills/ai-deployment-troubleshooting.mdx', ['AI项目部署失败自动排查', 'AI部署自动排错', '应用构建失败', 'RainSkills排错']],
    ['rainskills/vibe-coding-go-live.mdx', ['Vibe Coding项目如何上线', 'Vibe Coding项目部署', 'AI生成项目上线', 'Vibe Coding生产部署']],
  ];

  keywordPlans.forEach(([relativePath, keywords]) => {
    const page = read(relativePath);
    keywords.forEach(keyword => {
      assert.ok(page.includes(`- ${keyword}`), `Expected ${keyword} in ${relativePath}`);
    });
  });
});

test('uses the main topic accordion style for every article FAQ', () => {
  const faqComponentPath = path.join(root, 'src/components/Solutions/RainSkillsArticleFaq.tsx');
  assert.ok(fs.existsSync(faqComponentPath), 'Expected the shared RainSkills article FAQ component.');
  const faqComponent = read('src/components/Solutions/RainSkillsArticleFaq.tsx');
  [
    '<div className={styles.faqList}>',
    '<details className={styles.faqItem}',
    '<summary>{item.question}</summary>',
    '<p>{item.answer}</p>',
  ].forEach(copy => assert.ok(faqComponent.includes(copy), `Expected shared FAQ markup: ${copy}`));

  [
    'rainskills/claude-code-deploy-app.mdx',
    'rainskills/codex-deploy-app.mdx',
    'rainskills/ai-deployment-troubleshooting.mdx',
    'rainskills/vibe-coding-go-live.mdx',
  ].forEach(relativePath => {
    const page = read(relativePath);
    const faqSection = page.slice(page.indexOf('## 常见问题'), page.indexOf('## 相关内容'));

    assert.ok(page.includes("import RainSkillsArticleFaq from '@site/src/components/Solutions/RainSkillsArticleFaq';"));
    assert.ok(faqSection.includes('<RainSkillsArticleFaq'));
    assert.strictEqual((faqSection.match(/question:/g) || []).length, 4);
    assert.strictEqual((faqSection.match(/answer:/g) || []).length, 4);
    assert.ok(!faqSection.includes('<details'));
    assert.ok(!faqSection.includes('### '));
  });
});

test('links all four search-intent articles from the main topic page', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  const styles = read('src/components/Solutions/rainskills-deployment.module.css');

  [
    '/rainskills/claude-code-deploy-app',
    '/rainskills/codex-deploy-app',
    '/rainskills/ai-deployment-troubleshooting',
    '/rainskills/vibe-coding-go-live',
    '按你的工具和问题继续阅读',
    'className={styles.guideGrid}',
    'className={styles.guideCard}',
  ].forEach(copy => assert.ok(source.includes(copy), `Expected topic-page article link: ${copy}`));

  ['.guideGrid', '.guideCard', '.guideCard:focus-visible'].forEach(token => {
    assert.ok(styles.includes(token), `Expected guide-card style: ${token}`);
  });
});

test('targets the requested RainSkills search intent from one canonical landing page', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  [
    'RainSkills：用 Claude Code、Codex 部署应用到自己的服务器',
    "const canonicalUrl = 'https://www.rainbond.com/rainskills';",
    'Claude Code部署应用',
    'Claude Code部署到服务器',
    'Claude Code deployment skill',
    'Claude Code部署Skill',
    'Codex部署项目',
    'Codex deployment skill',
    'Codex部署到自己的服务器',
    'AI Agent运维Skill',
    '开源部署Skill',
    "'@type': 'SoftwareApplication'",
    "'@type': 'FAQPage'",
    "'@type': 'BreadcrumbList'",
  ].forEach(copy => assert.ok(source.includes(copy), `Expected landing-page SEO signal: ${copy}`));
});

test('presents a product-style deployment journey instead of a documentation article', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  [
    '<CompareHeroGraphic',
    'AI 写完代码后，部署不该重新从零开始',
    '从当前项目到自己的服务器，一条对话完成交付闭环',
    'Claude Code、Codex 都能使用同一套部署能力',
    '部署、排错、验证，不止是执行一段脚本',
    '为什么不直接让 Agent SSH 到服务器？',
    '常见问题',
    '开始使用 RainSkills',
    '/img/agents/claude-code.svg',
    '/img/agents/codex.svg',
  ].forEach(copy => assert.ok(source.includes(copy), `Expected product landing content: ${copy}`));
});

test('shows the real RainSkills deployment result instead of a simulated terminal', () => {
  const source = read('src/components/Solutions/RainSkillsDeployment.tsx');
  const styles = read('src/components/Solutions/rainskills-deployment.module.css');

  [
    'https://grstatic.tos-cn-beijing.volces.com/wechat/rainskills/rainskills-deploy.png',
    'alt="RainSkills 在 AI Agent 中完成应用部署并返回访问地址"',
    'width={1720}',
    'height={1194}',
    'loading="lazy"',
    'decoding="async"',
    'className={styles.deployScreenshot}',
  ].forEach(copy => assert.ok(source.includes(copy), `Expected real deployment image: ${copy}`));

  assert.ok(!source.includes('className={styles.terminal}'));
  assert.ok(!styles.includes('.terminalBody'));
  assert.ok(styles.includes('.deployScreenshot'));
});

test('links the homepage and both header implementations to the standalone page', () => {
  const choosePath = read('src/components/HomePage/ChoosePath/index.tsx');
  const customNavbar = read('src/components/NavBar/index.tsx');
  const docusaurusConfig = read('docusaurus.config.js');

  [customNavbar, docusaurusConfig].forEach((source, index) => {
    assert.ok(
      source.includes("label: 'AI Agent 部署应用'"),
      `Expected user-centered RainSkills title in navigation source ${index + 1}.`
    );
    assert.ok(!source.includes("label: 'RainSkills：AI Agent 部署应用'"));
  });

  [choosePath, customNavbar, docusaurusConfig].forEach((source, index) => {
    assert.ok(
      source.includes("'/rainskills'"),
      `Expected standalone RainSkills link in source ${index + 1}.`
    );
  });

  [choosePath, customNavbar].forEach(source => {
    assert.ok(!source.includes("'/solutions/rainskills'"));
  });

  assert.ok(docusaurusConfig.includes("from: '/solutions/rainskills'"));
  assert.ok(docusaurusConfig.includes("to: '/rainskills'"));
});

test('keeps the topic page responsive and accessible', () => {
  const styles = read('src/components/Solutions/rainskills-deployment.module.css');
  [
    '@media (max-width: 996px)',
    '@media (max-width: 576px)',
    '@media (prefers-reduced-motion: reduce)',
    ':focus-visible',
    'overflow-x: auto;',
    'grid-template-columns: 1fr;',
  ].forEach(token => assert.ok(styles.includes(token), `Expected responsive style: ${token}`));
});

console.log('RainSkills topic page tests passed');
