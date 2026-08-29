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

const whyRainbondSource = read('src/components/HomePage/WhyRainbond/index.tsx');
const whyRainbondStyles = read('src/components/HomePage/WhyRainbond/styles.module.css');
const homeSource = read('src/pages/index.tsx');

test('why Rainbond renders the approved screenshot copy verbatim', () => {
  [
    'WHY RAINBOND',
    'AI 负责开发代码，Rainbond 让它稳定运行',
    'AI 可以完成一次部署，但环境、依赖、网络、数据和后续运维，仍需要 Rainbond 持续管理。',
    'Agent 负责发起部署，',
    '稳定运行',
    '并且持续可运维。',
    '不只完成一次部署',
    'Rainbond 统一处理构建、网络、数据、证书和扩缩容。',
    '后续运维仍然可控',
    '查看状态和日志，完成升级、备份、恢复与回滚。',
    '仍然运行在你的环境',
    '应用、数据和模型保留在自己的服务器或 Kubernetes 中。',
  ].forEach((copy) => {
    assert.ok(whyRainbondSource.includes(copy), `Expected approved copy: ${copy}`);
  });
});

test('why Rainbond uses a labelled section and semantic benefit and card structures', () => {
  const labelledBy = whyRainbondSource.match(/<section[\s\S]*?aria-labelledby="([^"]+)"/);
  assert.ok(labelledBy, 'Expected the section to use aria-labelledby.');
  assert.ok(
    new RegExp(`<h2\\s+id="${labelledBy[1]}"`).test(whyRainbondSource),
    'Expected aria-labelledby to reference the section h2.'
  );
  assert.ok(/<h3 className=\{styles\.claim\}>/.test(whyRainbondSource), 'Expected the main claim to be a lower-level heading.');
  assert.ok(/<ul className=\{styles\.benefitList\}>[\s\S]*<li[\s\S]*<\/li>[\s\S]*<\/ul>/.test(whyRainbondSource));
  assert.ok(/runtimeCards\.map\([\s\S]*<article\s/.test(whyRainbondSource), 'Expected every runtime card to use an article element.');
  assert.strictEqual((whyRainbondSource.match(/title:\s*'(?:Agent 直接部署到服务器|环境、依赖与后续运维|Agent 通过 Rainbond 部署)'/g) || []).length, 3, 'Expected three comparison card definitions.');
  assert.ok(!/<(?:a|button)\b|<Link\b|<TrackedLink\b/.test(whyRainbondSource), 'Expected this explanatory section to have no controls.');
});

test('why Rainbond cards keep the screenshot order and status pairing', () => {
  const pairs = [
    ['Agent 直接部署到服务器', '完成一次部署'],
    ['环境、依赖与后续运维', '仍需自己处理'],
    ['Agent 通过 Rainbond 部署', '持续可运维'],
  ];

  let previousIndex = -1;
  pairs.forEach(([title, status]) => {
    const titleIndex = whyRainbondSource.indexOf(`title: '${title}'`);
    const statusIndex = whyRainbondSource.indexOf(`status: '${status}'`);
    assert.ok(titleIndex > previousIndex, `Expected ${title} after the previous card.`);
    assert.ok(statusIndex > titleIndex, `Expected ${status} to remain paired with ${title}.`);
    previousIndex = statusIndex;
  });
});

test('homepage places Why Rainbond second and moves ChoosePath directly before Users', () => {
  const order = ['<Hero />', '<WhyRainbond />', '<Demo />', '<ChoosePath />', '<Users />', '<DeployCommand />'];
  let previousIndex = -1;

  order.forEach((component) => {
    const componentIndex = homeSource.indexOf(component);
    assert.ok(componentIndex > previousIndex, `Expected ${component} in the approved homepage order.`);
    previousIndex = componentIndex;
  });
});

test('desktop uses a 46/54 split and staggered cards', () => {
  assert.ok(
    /\.contentGrid\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*0\.46fr\)\s+minmax\(0,\s*0\.54fr\);/.test(whyRainbondStyles),
    'Expected the approved desktop copy/visual split.'
  );
  ['codeCard', 'databaseCard', 'platformCard'].forEach((className) => {
    assert.ok(new RegExp(`\\.${className}\\s*\\{[\\s\\S]*(?:top|left|right):`).test(whyRainbondStyles), `Expected ${className} to define a desktop offset.`);
  });
});

test('mobile stacks content and resets card positioning without overflow', () => {
  assert.ok(/\.section\s*\{[\s\S]*overflow:\s*(?:hidden|clip);/.test(whyRainbondStyles));
  assert.ok(
    /@media \(max-width:\s*959px\)\s*\{[\s\S]*\.contentGrid\s*\{[\s\S]*grid-template-columns:\s*1fr;/.test(whyRainbondStyles),
    'Expected a single-column mobile layout below 960px.'
  );
  assert.ok(
    /@media \(max-width:\s*959px\)\s*\{[\s\S]*\.visualCard\s*\{[\s\S]*position:\s*static;[\s\S]*width:\s*100%;[\s\S]*max-width:\s*100%;[\s\S]*transform:\s*none;/.test(whyRainbondStyles),
    'Expected mobile cards to reset offsets and fit the viewport.'
  );
});

console.log('home Why Rainbond tests passed');
