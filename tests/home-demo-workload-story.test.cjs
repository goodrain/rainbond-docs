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

const demoSource = read('src/components/HomePage/Demo/index.tsx');
const demoStyles = read('src/components/HomePage/Demo/styles.module.css');

test('home demo presents the approved six workload categories', () => {
  [
    'AI 生成项目',
    'AI 开源应用',
    '模型与推理',
    '业务系统',
    '生产级中间件',
    '虚拟机',
  ].forEach(title => {
    assert.ok(demoSource.includes(`title: '${title}'`), `Expected workload category ${title}.`);
  });

  [
    'Codex · Claude Code',
    'Dify · RAGFlow · MaxKB',
    '大模型 · Embedding',
    '前端 · API · 中间件',
    'MySQL · Redis',
    'Linux · Windows · qcow2',
  ].forEach(copy => {
    assert.ok(demoSource.includes(copy), `Expected workload example copy: ${copy}.`);
  });
});

test('home demo architecture connects workloads through Rainbond to owned environments', () => {
  [
    '把整套 AI 应用栈，运行在自己的环境。',
    '不只是部署一个模型。AI 生成项目、开源应用、模型、业务系统、生产级中间件和虚拟机，都由 Rainbond 统一运行和管理。',
    'Rainbond 开源应用运行平台',
    '统一部署、运维、升级、交付',
    'RainSkills',
    'RainAgent',
    '应用模型',
    '应用市场',
    '公有云',
    '私有云',
    'Kubernetes',
    '物理服务器',
    '离线环境',
    '代码与数据归你',
    '支持离线部署',
    '不锁定云厂商',
    '支持信创环境',
  ].forEach(copy => {
    assert.ok(demoSource.includes(copy), `Expected architecture copy: ${copy}.`);
  });

  [
    'aria-label="工作负载"',
    'aria-label="平台能力"',
    'aria-label="运行环境"',
    'aria-label="平台价值"',
  ].forEach(label => {
    assert.ok(demoSource.includes(label), `Expected semantic architecture group ${label}.`);
  });
});

test('home demo workload architecture removes legacy video interaction', () => {
  [
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/业务应用.mp4',
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/AI大模型.mp4',
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/数据库.mp4',
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/部署虚拟机.mp4',
    'workloadVideoRefs',
    'handleWorkloadVideoEnded',
    'previewIndex',
    'workloadMediaViewport',
    'workloadTimelineItem',
    'workloadPreviewOverlay',
    '关闭演示预览',
  ].forEach(token => {
    assert.ok(!demoSource.includes(token), `Expected legacy workload implementation to remove ${token}.`);
  });

  [
    '.workloadMediaViewport',
    '.workloadTimelineItem',
    '.workloadPreviewOverlay',
    '.workloadViewportProgress',
  ].forEach(selector => {
    assert.ok(!demoStyles.includes(selector), `Expected legacy workload styles to remove ${selector}.`);
  });
});

test('home demo architecture matches the homepage visual system and reflows responsively', () => {
  [
    'workloadArchitecture',
    'workloadGrid',
    'workloadCard',
    'platformBand',
    'platformTags',
    'runtimeGrid',
    'runtimeCard',
    'architectureBenefits',
  ].forEach(className => {
    assert.ok(demoSource.includes(`styles.${className}`), `Expected architecture markup class ${className}.`);
    assert.ok(demoStyles.includes(`.${className}`), `Expected architecture styles for ${className}.`);
  });

  assert.ok(
    /\.workloadGrid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\);/.test(demoStyles),
    'Expected all six workload categories to form one architecture row on desktop.'
  );
  assert.ok(
    /\.runtimeGrid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\);/.test(demoStyles),
    'Expected a five-column runtime grid on desktop.'
  );
  assert.ok(
    /\.platformTags\s*\{[\s\S]*?flex-wrap:\s*wrap;/.test(demoStyles),
    'Expected platform capability tags to wrap instead of overflowing.'
  );
  assert.ok(
    /\.workloadArchitecture\s*\{[\s\S]*?linear-gradient\(135deg,\s*rgba\(238,\s*246,\s*255,\s*0\.94\)/.test(demoStyles),
    'Expected the architecture stage to reuse the homepage light-blue visual language.'
  );
  assert.ok(
    /\.platformBand\s*\{[\s\S]*?linear-gradient\(135deg,\s*#0f6fff\s*0%,\s*#2f7cff\s*55%,\s*#245fd1\s*100%\)/.test(demoStyles),
    'Expected the Rainbond platform layer to be the strongest blue visual layer.'
  );
  assert.ok(
    /@media\s*\(max-width:\s*900px\)\s*\{[\s\S]*?\.workloadGrid,[\s\S]*?\.runtimeGrid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/.test(demoStyles),
    'Expected workload and runtime cards to reflow to two columns on tablet.'
  );
  assert.ok(
    /@media\s*\(max-width:\s*560px\)\s*\{[\s\S]*?\.workloadGrid,[\s\S]*?\.runtimeGrid\s*\{[\s\S]*?grid-template-columns:\s*1fr;/.test(demoStyles),
    'Expected workload and runtime cards to stack on phones.'
  );
});

test('home demo preserves the unrelated feature video module', () => {
  [
    'const featureVideos = [',
    'https://static.goodrain.com/mp4/源码部署.mp4',
    'https://static.goodrain.com/mp4/数据库部署.mp4',
    'https://static.goodrain.com/mp4/故障排错.mp4',
    'https://static.goodrain.com/mp4/伸缩.mp4',
    'https://static.goodrain.com/mp4/授权确认.mp4',
    'handleVideoEnded',
    'styles.moduleControls',
    '<AnimatePresence mode="wait">',
    '<motion.div',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected feature-video invariant ${token}.`);
  });

  ['.demo', '.videoContainer', '.gradientBackground', '.moduleControls', '.moduleButton'].forEach(selector => {
    assert.ok(demoStyles.includes(selector), `Expected feature-video styles to preserve ${selector}.`);
  });
});

console.log('home demo workload architecture tests passed');
