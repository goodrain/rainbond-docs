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

const uniqueValueSource = read('src/components/HomePage/UniqueValue/index.tsx');
const uniqueValueStyles = read('src/components/HomePage/UniqueValue/styles.module.css');
const demoSource = read('src/components/HomePage/Demo/index.tsx');
const demoStyles = read('src/components/HomePage/Demo/styles.module.css');

test('unique value module presents four concise Rainbond delivery phases', () => {
  ['软件接入', '应用建模', '版本交付', '持续运维'].forEach(label => {
    assert.ok(uniqueValueSource.includes(`label: '${label}'`), `Expected value layer ${label}.`);
  });

  assert.strictEqual((uniqueValueSource.match(/key: '(connect|model|deliver|operate)'/g) || []).length, 4);
  assert.ok(!uniqueValueSource.includes('role="tabpanel"'));
  assert.ok(!uniqueValueSource.includes('className={styles.stepPanel}'));
});

test('unique value module connects software sources through the application model to infrastructure', () => {
  [
    '一个应用模型，贯穿交付的每一层',
    'RAM · Rainbond Application Model',
    'Rainbond 应用模型',
    'RainAgent 智能交付助手',
    '代码仓库',
    '现有描述',
    '开源软件',
    '平台接口',
    '版本化软件包',
    '安装与升级',
    '客户现场交付',
    '企业统一治理',
    'Kubernetes',
    '信创与离线环境',
  ].forEach(copy => assert.ok(uniqueValueSource.includes(copy), `Expected system copy: ${copy}.`));

  assert.ok(uniqueValueSource.includes('role="tablist"'));
  assert.ok(uniqueValueSource.includes('aria-label="Rainbond 应用交付体系"'));
  assert.ok(uniqueValueSource.includes('降低平台使用门槛，不替代平台本身'));
  assert.ok(uniqueValueSource.includes('理解任务'));
  assert.ok(uniqueValueSource.includes('调用 Rainbond 能力'));
  assert.ok(uniqueValueSource.includes('aria-label="Rainbond 与普通部署工具的结果差异"'));
  assert.ok(uniqueValueSource.includes('得到一个正在运行的容器'));
  assert.ok(uniqueValueSource.includes('得到一套可持续交付的软件资产'));
});

test('application model renders an animated multi-component topology', () => {
  ['网关', '前端', 'API', 'MySQL', 'Worker', 'Redis', '8 条已连接', '全部正常'].forEach(copy => {
    assert.ok(uniqueValueSource.includes(copy), `Expected topology content: ${copy}.`);
  });
  assert.ok(uniqueValueSource.includes('aria-label="Rainbond 多组件应用拓扑"'));
  assert.strictEqual((uniqueValueSource.match(/<path id="route-/g) || []).length, 8);
  assert.ok(uniqueValueSource.includes('<GatewayNode />'));
  assert.ok(uniqueValueSource.includes('className={styles.hexagonHalo}'));
  assert.ok(uniqueValueSource.includes('<animateMotion'));
  assert.ok(uniqueValueStyles.includes('.topologyCanvas'));
  assert.ok(uniqueValueStyles.includes('.topologyNode'));
  assert.ok(uniqueValueStyles.includes('.hexagon'));
  assert.ok(uniqueValueStyles.includes('.gatewayCloud'));
  assert.ok(uniqueValueStyles.includes('@keyframes topologyFlow'));
  assert.ok(uniqueValueStyles.includes(".systemCanvas[data-active='model'] .connectionPulse path"));
});

test('unique value module uses a stable responsive system frame', () => {
  ['.systemFrame', '.systemCanvas', '.modelCore', '.foundationRail', '.stepTabs'].forEach(selector => {
    assert.ok(uniqueValueStyles.includes(selector), `Expected styles for ${selector}.`);
  });

  assert.ok(/\.stepTabs\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/.test(uniqueValueStyles));
  assert.ok(/@media\s*\(max-width:\s*680px\)[\s\S]*?\.stepTabs\s*\{[\s\S]*?repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(uniqueValueStyles));
  assert.ok(/\.systemFrame\s*\{[\s\S]*?max-width:\s*1380px;/.test(uniqueValueStyles));
  assert.ok(/\.intro\s*\{[\s\S]*?max-width:\s*1380px;/.test(uniqueValueStyles));
  assert.ok(/\.systemCanvas\s*\{[\s\S]*?grid-template-columns:\s*minmax\(210px,\s*0\.66fr\)[\s\S]*?minmax\(430px,\s*1\.42fr\)/.test(uniqueValueStyles));
  assert.ok(uniqueValueStyles.includes('.agentRail'));
  assert.ok(uniqueValueStyles.includes('.modelDifference'));
});

test('unique value module animates the system path and respects user control', () => {
  assert.ok(uniqueValueSource.includes("window.matchMedia('(prefers-reduced-motion: reduce)').matches"));
  assert.ok(uniqueValueSource.includes('}, 4500)'));
  assert.ok(uniqueValueSource.includes('data-active={activeStep.key}'));
  assert.ok(uniqueValueSource.includes('styles.scanLine'));
  assert.ok(uniqueValueSource.includes('onMouseEnter={() => setIsPaused(true)}'));
  assert.ok(uniqueValueStyles.includes('@keyframes canvasSweep'));
  assert.ok(uniqueValueStyles.includes('@keyframes stepProgress'));
  assert.ok(uniqueValueStyles.includes('.systemFramePaused .stepTabActive::after'));
  assert.ok(uniqueValueStyles.includes(".systemCanvas[data-active='model'] .modelCore"));
});

test('feature video module remains focused on the AI scenario', () => {
  [
    'const featureVideos = [',
    'https://static.goodrain.com/mp4/源码部署.mp4',
    'https://static.goodrain.com/mp4/数据库部署.mp4',
    'https://static.goodrain.com/mp4/故障排错.mp4',
    'https://static.goodrain.com/mp4/伸缩.mp4',
    'https://static.goodrain.com/mp4/授权确认.mp4',
    'handleVideoEnded',
    '<VideoProgressControls',
    '<AnimatePresence mode="wait">',
  ].forEach(token => assert.ok(demoSource.includes(token), `Expected video invariant ${token}.`));

  ['.demo', '.videoContainer', '.gradientBackground', '.moduleControls', '.moduleButton'].forEach(selector => {
    assert.ok(demoStyles.includes(selector), `Expected video styles to preserve ${selector}.`);
  });
});

console.log('home unique value architecture tests passed');
