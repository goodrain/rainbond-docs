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

const pageSource = read('src/pages/cloud-login-preview/index.tsx');
const styles = read('src/pages/cloud-login-preview/styles.module.css');

test('cloud login preview uses the unified Rainbond Cloud promise', () => {
  [
    'RAINBOND CLOUD',
    'AI 生成，',
    'Rainbond Cloud 运行',
    '无需准备服务器。登录后即可部署 AI 生成的项目、开源软件和业务应用，构建、网络、HTTPS 与日常运维自动完成。',
    '部署应用',
    '源码、镜像、应用市场',
    '自动准备环境',
    '构建、网络、HTTPS',
    '持续运维',
    '日志、监控、故障排查',
  ].forEach((copy) => assert.ok(pageSource.includes(copy), `Expected preview copy: ${copy}`));
});

test('cloud login preview presents a clear passwordless login flow', () => {
  [
    '登录 Rainbond Cloud',
    '使用手机号验证码登录，无需设置密码',
    '首次登录将自动创建账户',
    '登录 / 注册',
    '返回 Rainbond 官网',
    '想运行在自己的服务器？',
    '安装 Rainbond',
  ].forEach((copy) => assert.ok(pageSource.includes(copy), `Expected login copy: ${copy}`));

  assert.ok(/<label htmlFor="cloud-phone">手机号<\/label>/.test(pageSource));
  assert.ok(/id="cloud-phone"[\s\S]*?type="tel"[\s\S]*?autoComplete="tel"/.test(pageSource));
  assert.ok(/<label htmlFor="cloud-code">验证码<\/label>/.test(pageSource));
  assert.ok(/id="cloud-code"[\s\S]*?autoComplete="one-time-code"/.test(pageSource));
  assert.ok(/<button type="button" className=\{styles\.codeButton\}>获取验证码<\/button>/.test(pageSource));
  assert.ok(/<button type="submit" className=\{styles\.submitButton\}>登录 \/ 注册<\/button>/.test(pageSource));
});

test('cloud login preview is a responsive two-column page with login-first mobile order', () => {
  assert.ok(/grid-template-areas:\s*'hero login';/.test(styles));
  assert.ok(/grid-template-columns:\s*minmax\(0, 1\.15fr\) minmax\(420px, 0\.85fr\);/.test(styles));
  assert.ok(/min-height:\s*100dvh;/.test(styles));
  assert.ok(/\.loginCard\s*\{[\s\S]*?max-width:\s*460px;[\s\S]*?border-radius:\s*24px;/.test(styles));
  assert.ok(/@media \(max-width:\s*900px\)[\s\S]*?grid-template-areas:\s*'login'\s*'hero';/.test(styles));
  assert.ok(/@media \(max-width:\s*520px\)[\s\S]*?\.loginCard\s*\{[\s\S]*?padding:\s*1\.5rem;/.test(styles));
});

console.log('cloud login preview tests passed');
