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

const choosePathSource = read('src/components/HomePage/ChoosePath/index.tsx');
const choosePathStyles = read('src/components/HomePage/ChoosePath/styles.module.css');

function collectCardTitles(source) {
  const titles = [];
  const titlePattern = /title:\s*'([^']+)'/g;
  let match;

  while ((match = titlePattern.exec(source)) !== null) {
    titles.push(match[1]);
  }

  return titles;
}

test('home path cards keep the full enterprise title text', () => {
  const titles = collectCardTitles(choosePathSource);

  assert.strictEqual(titles.length, 4, 'Expected four home path card titles.');
  assert.ok(
    titles.includes('供应商交付、应用验收与软件资产化'),
    'Expected the enterprise path card title to keep its full wording.'
  );
});

test('home AI private deployment card covers custom AI apps, Dify-like apps, and large models', () => {
  assert.ok(
    choosePathSource.includes('适合把自研 AI 应用、Dify 等 AI 应用平台，以及 Qwen、DeepSeek 等大模型服务部署进企业内网，并统一升级维护。'),
    'Expected AI private deployment card summary to cover custom AI apps, Dify-like apps, and large models.'
  );
});

test('home path card titles use desktop no-wrap styling with mobile fallback', () => {
  assert.ok(
    /\.cardTitle\s*\{[\s\S]*white-space:\s*nowrap;/.test(choosePathStyles),
    'Expected desktop card titles to stay on one line.'
  );
  assert.ok(
    /\.cardTitle\s*\{[\s\S]*font-size:\s*clamp\(16px,\s*1vw,\s*17px\);/.test(choosePathStyles),
    'Expected desktop card titles to scale within the card width.'
  );
  assert.ok(
    /@media \(max-width:\s*768px\)\s*\{[\s\S]*\.cardTitle\s*\{[\s\S]*white-space:\s*normal;/.test(choosePathStyles),
    'Expected mobile card titles to wrap naturally.'
  );
});

console.log('home choose path tests passed');
