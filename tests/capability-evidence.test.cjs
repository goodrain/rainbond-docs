const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const topicData = read('src/data/capabilityTopicPages.ts');
const topicComponent = read('src/components/Solutions/CapabilityTopicPage.tsx');
const aiTopic = read('src/components/Solutions/AiPrivateDeployment.tsx');
const xinchuangTopic = read('offline-and-xinchuang/xinchuang-platform.mdx');
const armMigrationTopic = read('offline-and-xinchuang/x86-to-arm.mdx');
const difyTutorial = read('docs/how-to-guides/scenario-tutorials/dify-private-deployment.md');
const n8nTutorial = read('docs/how-to-guides/scenario-tutorials/n8n-private-deployment.md');
const readableTopicSources = [
  topicData,
  aiTopic,
  read('src/components/EnterpriseIT/EnterpriseITHome.tsx'),
  read('src/components/OfflineAndXinchuang/OfflineAndXinchuangHome.tsx'),
  read('src/components/Compare/CompareHomeDirectory.tsx'),
].join('\n');

assert.ok(topicComponent.includes('核验：{item.evidence.label}'));
assert.strictEqual((topicData.match(/evidence: \{label:/g) || []).length, 12);

[
  '安装并启用 AI 大模型插件',
  'GPU 管理需要相应插件、驱动和指标采集',
  '开源版默认仅首个注册的企业管理员可用',
  '当前公开证据不支持把它描述为完整的多模型厂商路由、配额和计费网关',
].forEach((text) => assert.ok(aiTopic.includes(text), `missing AI capability boundary: ${text}`));

[
  '其他 CPU、操作系统、GPU 和国产数据库组合没有完整的公开版本矩阵',
  '但不能代替当前版本与当前硬件组合的验收',
  '平台识别节点架构，但不会把 x86 二进制自动转换为 ARM64 二进制',
].forEach((text) => assert.ok(xinchuangTopic.includes(text), `missing compatibility boundary: ${text}`));

['全面支持信创场景', '获得国内各大 CPU 厂商认证', '默认支持所有信创环境'].forEach((text) => {
  assert.ok(!xinchuangTopic.includes(text), `unsupported compatibility claim: ${text}`);
});

[
  '平台识别节点架构，但不会把 x86 二进制自动转换为 ARM64 二进制',
  '不会自动修改不兼容的业务代码和第三方依赖',
  '保证迁移后的性能与 x86 环境相同',
].forEach((text) => assert.ok(armMigrationTopic.includes(text), `missing ARM migration boundary: ${text}`));
assert.ok(!armMigrationTopic.includes('自动准备 Arm 版依赖'));

assert.ok(difyTutorial.includes('Dify 官方 Docker Compose 部署与升级说明'));
assert.ok(!difyTutorial.includes('PostgreSQL/MySQL'));
assert.ok(n8nTutorial.includes('N8N_WEBHOOK_URL=https://n8n.example.com/'));
assert.ok(n8nTutorial.includes('N8N_PROXY_HOPS=1'));
assert.ok(n8nTutorial.includes('/webhook/<configured-path>'));

['不只是', '真正难的是', '赋能', '形成闭环'].forEach((text) => {
  assert.ok(!readableTopicSources.includes(text), `templated topic copy remains: ${text}`);
});

console.log('capability evidence tests passed');
