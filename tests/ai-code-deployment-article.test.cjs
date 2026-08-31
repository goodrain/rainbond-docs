const assert = require('assert');
const fs = require('fs');
const path = require('path');

const articlePath = path.join(
  __dirname,
  '..',
  'blog/2026/2026-08-31-ai-generated-code-secure-deployment.md'
);

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

test('creates the focused article as a non-published local review draft', () => {
  assert.ok(fs.existsSync(articlePath), 'Expected the AI code deployment article draft.');
  const article = fs.readFileSync(articlePath, 'utf8');
  [
    'title: AI 生成代码之后，怎么安全地部署到自己的服务器？',
    'slug: ai-generated-code-secure-deployment',
    'date: 2026-08-31',
    'draft: true',
    'description: AI 生成代码只是第一步。本文从一个前后端和数据库项目出发',
    '<!--truncate-->',
  ].forEach(copy => assert.ok(article.includes(copy), `Expected article metadata: ${copy}`));
});

test('answers the deployment question before introducing RainSkills', () => {
  const article = fs.readFileSync(articlePath, 'utf8');
  const directAnswer = article.indexOf('最短的答案是：');
  const directDeployment = article.indexOf('## AI Agent 可以直接把项目部署到服务器吗？');
  const rainskills = article.indexOf('## RainSkills + Rainbond 如何把这件事变成一条完整流程？');
  assert.ok(directAnswer >= 0);
  assert.ok(directDeployment > directAnswer);
  assert.ok(rainskills > directDeployment);
});

test('uses a concrete full-stack example and covers the complete safety boundary', () => {
  const article = fs.readFileSync(articlePath, 'utf8');
  [
    'React 前端',
    'Node.js 后端',
    'MySQL',
    'Redis',
    '## “安全部署”具体要保护什么？',
    '### 1. 操作权限',
    '### 2. 密码和 Token',
    '### 3. 数据与持久化',
    '### 4. 服务可用性',
    '### 5. 升级与回滚',
    '## 部署成功后，为什么应用仍然可能无法访问？',
    '## AI 部署应用一定需要 Kubernetes 吗？',
    '## 上线前可以直接检查这 12 项',
  ].forEach(copy => assert.ok(article.includes(copy), `Expected article answer: ${copy}`));
});

test('connects the problem to RainSkills with a semantic top-to-bottom flow and focused next step', () => {
  const article = fs.readFileSync(articlePath, 'utf8');
  [
    'flowchart TD',
    '当前项目',
    'AI Agent',
    'RainSkills',
    'Rainbond MCP',
    'Rainbond 应用运行平台',
    '自己的服务器或 Kubernetes',
    '帮我安装 RainSkills，并连接到我要使用的 Rainbond。',
    '](/docs/ai/rainskills)',
    'https://github.com/goodrain/rainskills',
  ].forEach(copy => assert.ok(article.includes(copy), `Expected article path: ${copy}`));
});

test('keeps the article focused on the chosen topic instead of channel distribution planning', () => {
  const article = fs.readFileSync(articlePath, 'utf8');
  [
    '微信公众号版本',
    '知乎发布',
    '掘金发布',
    '多渠道分发',
    'UTM',
  ].forEach(copy => assert.ok(!article.includes(copy), `Expected focused article to omit: ${copy}`));
});

console.log('AI code deployment article tests passed');
