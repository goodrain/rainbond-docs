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

function withoutJsxComments(source) {
  return source.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function balancedBlock(source, openingPattern, label) {
  const match = openingPattern.exec(source);
  assert.ok(match, `Expected ${label}.`);

  const openingBrace = source.indexOf('{', match.index);
  let depth = 0;

  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === '{') {
      depth += 1;
    } else if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openingBrace + 1, index);
      }
    }
  }

  assert.fail(`Expected ${label} to have a closing brace.`);
}

function cssRule(source, selector) {
  return balancedBlock(
    source,
    new RegExp(`(?:^|\\n)\\s*${escapeRegExp(selector)}\\s*\\{`, 'm'),
    `${selector} CSS rule`
  );
}

function mediaQuery(source, maxWidth) {
  return balancedBlock(
    source,
    new RegExp(`@media\\s*\\(max-width:\\s*${maxWidth}px\\)\\s*\\{`),
    `max-width ${maxWidth}px media query`
  );
}

function cssProperty(rule, property) {
  const match = rule.match(new RegExp(`(?:^|;)\\s*${escapeRegExp(property)}\\s*:\\s*([^;]+);`));
  assert.ok(match, `Expected ${property} in the bounded CSS rule.`);
  return match[1].trim().replace(/\s*!important$/, '');
}

function assertCssProperty(rule, property, expected) {
  assert.strictEqual(cssProperty(rule, property), expected, `Expected ${property}: ${expected}.`);
}

function cssLeafRules(source) {
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selector: match[1].trim(),
    declarations: match[2],
  }));
}

const heroSource = withoutJsxComments(read('src/components/HomePage/Hero/index.tsx'));
const heroStyles = read('src/components/HomePage/Hero/styles.module.css');
const homePageSource = read('src/pages/index.tsx');
const navbarSource = withoutJsxComments(read('src/components/NavBar/index.tsx'));
const navbarStyles = read('src/components/NavBar/styles.module.css');

test('home hero restores the Kubernetes platform positioning and product video', () => {
  assert.ok(heroSource.includes('>不用懂 Kubernetes</h1>'));
  assert.ok(heroSource.includes('>开源容器平台</h1>'));
  assert.ok(heroSource.includes('Rainbond 是基于 Kubernetes 的开源容器平台'));
  assert.ok(homePageSource.includes('Rainbond - 不用懂 Kubernetes 的开源容器平台'));
  assert.ok(heroSource.includes('https://www.bilibili.com/video/BV1Lzo5BGEuc'));
  assert.ok(heroSource.includes('Rainbond 视频封面'));
});

test('quick installation is primary and AI deployment remains a secondary modal action', () => {
  assert.ok(/<TrackedLink\s+to="\/docs\/quick-start\/quick-install"[\s\S]*?styles\.hero_button_primary[\s\S]*?>\s*快速安装\s*<\/TrackedLink>/.test(heroSource));
  assert.ok(/<button\s+ref=\{agentEntryButtonRef\}[\s\S]*?styles\.hero_button_secondary[\s\S]*?onClick=\{openAgentModal\}[\s\S]*?>\s*让 AI 帮我部署\s*<\/button>/.test(heroSource));
  assert.ok(heroSource.indexOf('to="/docs/quick-start/quick-install"') < heroSource.indexOf('ref={agentEntryButtonRef}'));
  assertCssProperty(cssRule(heroStyles, '.hero_button_secondary'), 'background', '#fff');
  assertCssProperty(cssRule(heroStyles, '.hero_button_secondary'), 'box-shadow', 'none');
  assertCssProperty(cssRule(heroStyles, '.hero_button_style'), 'cursor', 'pointer');
  assert.ok(cssRule(heroStyles, '.hero_button_style:focus-visible').includes('outline:'));
});

test('RainSkills Agent modal presents the approved concise prompt flow', () => {
  [
    '让 AI 帮我部署应用',
    '安装 RainSkills 后，就可以直接让 Agent 部署和运维应用。',
    '连接 AI Agent',
    '复制下面的指令，发送给你正在使用的 Agent：',
    '帮我安装rainskills',
    '复制安装指令',
    '安装完成后，根据你的情况继续：',
    '接入后',
    '部署应用',
    '安装完成后，继续在同一个对话中输入：',
    '帮我部署当前项目',
    '没有平台时',
    '部署 Rainbond',
    '如果还没有 Rainbond，继续在同一个对话中输入：',
    '帮我部署 Rainbond',
    '复制部署指令',
    '已复制',
    '重新复制',
  ].forEach((copy) => {
    assert.ok(heroSource.includes(copy), `Expected approved Agent modal copy: ${copy}`);
  });
  assert.ok(!heroSource.includes('RainSkills 是安装在 Codex 或 Claude Code 中的 Rainbond 能力'));
  assert.ok(!heroSource.includes('cta_home_agent_modal_install_clicked'));
  assert.ok(!heroSource.includes('快速安装 Rainbond'));
  assert.ok(!heroSource.includes('styles.modalSteps'), 'Expected the modal to avoid a numbered setup flow.');
  assert.ok(!heroSource.includes('发送到 Codex 或 Claude Code 对话中'));
  assert.ok(!heroSource.includes('按 Agent 提示完成安装和连接'));
  assert.ok(/<span className=\{styles\.modalStageBadge\}>\s*接入后\s*<\/span>/.test(heroSource));
  assert.ok(!heroSource.includes('hasCopiedInstallPrompt'));
  assert.ok(/<div className=\{styles\.modalPrimaryTitle\}>[\s\S]*<PlugZap[\s\S]*连接 AI Agent[\s\S]*<\/div>/.test(heroSource));
  assert.ok(/<div className=\{styles\.modalFollowUp\} aria-label="安装完成后的可用操作">/.test(heroSource));
  assert.ok(!/\{[^}]*&& \(\s*<div className=\{styles\.modalFollowUp\}/.test(heroSource));
  assert.ok(/className=\{styles\.modalNextStep\}/.test(heroSource));
  assert.strictEqual((heroSource.match(/onClick=\{\(\) => handleCopyPrompt\('(install|deploy|rainbond)'\)\}/g) || []).length, 3);
  assert.strictEqual((heroSource.match(/className=\{styles\.modalNextStep\}/g) || []).length, 2);

  assert.ok(
    /<button\b(?=[^>]*className=\{styles\.modalCloseButton\})(?=[^>]*aria-label="关闭 RainSkills 接入说明")(?=[^>]*onClick=\{closeAgentModal\})[^>]*>/.test(heroSource),
    'Expected the visible custom close control to use the shared close handler.'
  );
  assert.ok(/<Modal[\s\S]*visible=\{isAgentModalOpen\}[\s\S]*onCancel=\{closeAgentModal\}[\s\S]*afterClose=\{[\s\S]*agentEntryButtonRef\.current\?\.focus\(\)[\s\S]*closable=\{false\}[\s\S]*maskClosable[\s\S]*closeOnEsc/.test(heroSource));
  assert.ok(/useEffect\(\(\) => \{[\s\S]*isAgentModalOpen[\s\S]*copyButtonRef\.current\?\.focus\(\)/.test(heroSource));
  assert.ok(
    !/document\s*\.\s*(?:addEventListener\s*\(\s*['"]keydown['"]|onkeydown\s*=)/.test(heroSource),
    'Expected Modal closeOnEsc to remain the only Escape-key trap.'
  );
});

test('RainSkills Agent modal identifies every supported Agent with a lightweight real brand logo row', () => {
  [
    ['Codex', '/img/agents/codex.svg'],
    ['Claude Code', '/img/agents/claude-code.svg'],
    ['Pi', '/img/agents/pi.svg'],
    ['WorkBuddy', '/img/agents/workbuddy.svg'],
    ['DeepSeek Harness', '/img/agents/deepseek-harness.svg'],
    ['Harness', '/img/agents/harness.svg'],
  ].forEach(([name, logo]) => {
    assert.ok(
      heroSource.includes(`{ name: '${name}', logo: '${logo}' }`),
      `Expected the compatibility list to include ${name} with its real brand asset.`
    );
  });

  assert.ok(heroSource.includes('已适配这些 Agent'));
  assert.ok(/<ul className=\{styles\.agentCompatibilityList\} aria-label="已适配的 AI Agent">/.test(heroSource));
  assert.ok(/<img src=\{logo\} alt="" width=\{20\} height=\{20\} aria-hidden="true" \/>/.test(heroSource));
  assert.ok(!/SquareTerminal|BriefcaseBusiness|Workflow/.test(heroSource));

  const listRule = cssRule(heroStyles, '.agentCompatibilityList');
  assertCssProperty(listRule, 'display', 'flex');
  assertCssProperty(listRule, 'flex-wrap', 'nowrap');
  assertCssProperty(listRule, 'justify-content', 'space-between');
  assertCssProperty(listRule, 'gap', '0.5rem');
  assertCssProperty(listRule, 'width', '100%');

  const compatibilityRule = cssRule(heroStyles, '.agentCompatibility');
  assertCssProperty(compatibilityRule, 'background', 'var(--ifm-color-emphasis-100, #f8fafc)');
  assertCssProperty(compatibilityRule, 'border-radius', '12px');
  const itemRule = cssRule(heroStyles, '.agentCompatibilityItem');
  assertCssProperty(itemRule, 'display', 'inline-flex');
  assert.ok(Number.parseFloat(cssProperty(itemRule, 'font-size')) >= 12);

  const modalListRule = cssRule(heroStyles, '.agentCompatibility .agentCompatibilityList');
  assertCssProperty(modalListRule, 'display', 'grid');
  assertCssProperty(modalListRule, 'grid-template-columns', 'repeat(3, minmax(0, 1fr))');
  assertCssProperty(modalListRule, 'gap', '0.5rem');
  const modalItemRule = cssRule(heroStyles, '.agentCompatibility .agentCompatibilityItem');
  assertCssProperty(modalItemRule, 'gap', '0.4rem');
  assertCssProperty(modalItemRule, 'font-size', '12px');
  const modalLogoRule = cssRule(heroStyles, '.agentCompatibility .agentCompatibilityItem img');
  assertCssProperty(modalLogoRule, 'width', '20px');
  assertCssProperty(modalLogoRule, 'height', '20px');

  const phone = mediaQuery(heroStyles, 480);
  const phoneListRule = cssRule(phone, '.agentCompatibilityList');
  assertCssProperty(phoneListRule, 'flex-wrap', 'wrap');
  assertCssProperty(phoneListRule, 'justify-content', 'flex-start');
  assertCssProperty(
    cssRule(phone, '.agentCompatibility .agentCompatibilityList'),
    'grid-template-columns',
    'repeat(2, minmax(0, 1fr))'
  );
});

test('home hero omits the supported Agent logo row while the modal keeps it', () => {
  assert.ok(!heroSource.includes('className={styles.heroAgentCompatibility}'));
  assert.ok(!heroSource.includes('aria-label="首页支持的 AI Agent"'));
  assert.ok(!heroStyles.includes('.heroAgentCompatibility'));
  assert.strictEqual((heroSource.match(/SUPPORTED_AGENTS\.map\(\(\{ name, logo \}\) => \(/g) || []).length, 1);
});

test('RainSkills and Rainbond prompts copy independently with exact analytics payloads', () => {
  assert.ok(heroSource.includes("const RAINSKILLS_INSTALL_PROMPT = '帮我安装rainskills';"));
  assert.ok(heroSource.includes("const RAINSKILLS_DEPLOY_PROMPT = '帮我部署当前项目';"));
  assert.ok(heroSource.includes("const RAINBOND_DEPLOY_PROMPT = '帮我部署 Rainbond';"));
  const copyHandler = balancedBlock(
    heroSource,
    /const handleCopyPrompt = \(target: CopyTarget\) => \{/,
    'handleCopyPrompt function'
  );
  assert.ok(/const prompt = target === 'install'\s*\? RAINSKILLS_INSTALL_PROMPT\s*:\s*target === 'deploy'\s*\? RAINSKILLS_DEPLOY_PROMPT\s*:\s*RAINBOND_DEPLOY_PROMPT;/.test(copyHandler));
  assert.ok(copyHandler.includes('const copied = copyToClipboard(prompt);'));
  assert.ok(
    /const getCopyButtonLabel = \(target: CopyTarget, idleLabel: string\) => \{[\s\S]*copyState\.target !== target[\s\S]*copyState\.status === 'copied'[\s\S]*'已复制'[\s\S]*copyState\.status === 'error'[\s\S]*'重新复制'[\s\S]*idleLabel;/.test(heroSource),
    'Expected each prompt button to own a contextual idle, copied, and retry label.'
  );

  const copiedBranch = balancedBlock(copyHandler, /if \(copied\) \{/, 'successful copy branch');
  assert.ok(
    /setCopyState\(\{ target, status: 'copied' \}\);/.test(copiedBranch)
      && /copyResetTimerRef\.current\s*=\s*window\.setTimeout\(\(\)\s*=>\s*setCopyState\(INITIAL_COPY_STATE\),\s*1800\);/.test(copiedBranch)
      && /else\s*\{\s*setCopyState\(\{ target, status: 'error' \}\);/.test(copyHandler),
    'Expected the selected prompt to own success, reset, and error state.'
  );
  assert.ok(copyHandler.includes("'cta_home_rainskills_prompt_copied'"));
  assert.ok(copyHandler.includes("'cta_home_rainskills_deploy_prompt_copied'"));
  assert.ok(copyHandler.includes("'cta_home_rainbond_deploy_prompt_copied'"));
  assert.ok(copyHandler.includes("'复制安装指令'"));
  assert.ok(copyHandler.includes("'复制部署指令'"));

  const openHandler = balancedBlock(heroSource, /const openAgentModal = \(\) => \{/, 'openAgentModal function');
  assert.ok(
    /trackUmamiEvent\(\s*'cta_home_rainskills_agent_opened'\s*,\s*\{\s*module:\s*'home_hero',\s*cta_text:\s*'让 AI 帮我部署',?\s*\}\s*\);/.test(openHandler),
    'Expected the opened event and exact payload in the open handler.'
  );
  assert.ok(
    /const closeAgentModal = \(\) => \{\s*clearCopyResetTimer\(\);\s*setCopyState\(INITIAL_COPY_STATE\);\s*setAgentModalOpen\(false\);/.test(heroSource),
    'Expected one close handler to clear copy state before hiding the modal.'
  );
  assert.ok(
    /const clearCopyResetTimer = \(\) => \{[\s\S]*window\.clearTimeout\(copyResetTimerRef\.current\);[\s\S]*copyResetTimerRef\.current = null;/.test(heroSource)
  );
  assert.ok(/const openAgentModal = \(\) => \{\s*clearCopyResetTimer\(\);\s*setCopyState\(INITIAL_COPY_STATE\);/.test(heroSource));
  assert.strictEqual((heroSource.match(/setHasCopiedInstallPrompt/g) || []).length, 0);
  assert.ok(/const handleCopyPrompt = \(target: CopyTarget\) => \{\s*clearCopyResetTimer\(\);/.test(heroSource));
});

test('RainSkills modal stays within the viewport and preserves accessible touch targets', () => {
  const modalRule = cssRule(heroStyles, '.agentModal');
  assertCssProperty(modalRule, 'max-width', '648px');
  assert.ok(
    [cssProperty(modalRule, 'width'), cssProperty(modalRule, 'max-width')].includes('calc(100vw - 32px)'),
    'Expected the modal width to reserve 16px on each viewport edge.'
  );

  const modalDialogRule = cssRule(heroStyles, '.agentModal :global(.semi-modal)');
  assertCssProperty(modalDialogRule, 'width', 'calc(100vw - 32px)');
  assertCssProperty(modalDialogRule, 'max-width', '648px');

  const modalContentRule = cssRule(heroStyles, '.agentModal :global(.semi-modal-content)');
  assertCssProperty(modalContentRule, 'max-height', 'calc(100vh - 32px)');
  assertCssProperty(modalContentRule, 'overflow-y', 'auto');
  assertCssProperty(modalContentRule, 'background', 'var(--ifm-background-surface-color, #fff)');

  const primaryTitleRule = cssRule(heroStyles, '.modalPrimaryTitle');
  assertCssProperty(primaryTitleRule, 'display', 'flex');
  assertCssProperty(primaryTitleRule, 'align-items', 'center');
  assertCssProperty(cssRule(heroStyles, '.modalFollowUp'), 'animation', 'modalFollowUpReveal 0.24s ease-out both');
  assertCssProperty(cssRule(heroStyles, '.modalNextStep'), 'background', 'var(--ifm-background-surface-color, #fff)');
  assertCssProperty(cssRule(heroStyles, '.modalStageBadge'), 'color', 'var(--ifm-color-primary, #2563eb)');
  assertCssProperty(cssRule(heroStyles, '.copyPromptButtonSecondary'), 'background', 'var(--ifm-background-surface-color, #fff)');

  const closeButtonRule = cssRule(heroStyles, '.modalCloseButton');
  const closeWidthValue = cssProperty(closeButtonRule, /(?:^|;)\s*min-width\s*:/.test(closeButtonRule) ? 'min-width' : 'width');
  const closeHeightValue = cssProperty(closeButtonRule, /(?:^|;)\s*min-height\s*:/.test(closeButtonRule) ? 'min-height' : 'height');
  assert.ok(/^\d+(?:\.\d+)?px$/.test(closeWidthValue) && /^\d+(?:\.\d+)?px$/.test(closeHeightValue));
  const closeWidth = Number.parseFloat(closeWidthValue);
  const closeHeight = Number.parseFloat(closeHeightValue);
  assert.ok(closeWidth >= 44 && closeHeight >= 44, 'Expected the modal close control to expose a 44px touch target.');
  const copyButtonRule = cssRule(heroStyles, '.copyPromptButton');
  const copyButtonMinHeight = cssProperty(copyButtonRule, 'min-height');
  assert.ok(/^\d+(?:\.\d+)?px$/.test(copyButtonMinHeight) && Number.parseFloat(copyButtonMinHeight) >= 44);
  const copyButtonWidthProperty = /(?:^|;)\s*min-width\s*:/.test(copyButtonRule) ? 'min-width' : 'width';
  const copyButtonWidth = cssProperty(copyButtonRule, copyButtonWidthProperty);
  assert.ok(
    /^\d+(?:\.\d+)?px$/.test(copyButtonWidth) && Number.parseFloat(copyButtonWidth) >= 44,
    'Expected the copy control to expose at least a 44px-wide touch target.'
  );
});

test('the homepage navbar owns the single accessible WeChat community icon', () => {
  assert.ok(!heroSource.includes('OverlayTrigger'));
  assert.ok(!heroSource.includes('hero_community_link'));
  assert.ok(
    /<OverlayTrigger[\s\S]*?src="\/wechat\/rainbond-xzs\.png"[\s\S]*?<button[\s\S]*?className=\{`\$\{styles\.github_button\} \$\{styles\.communityButton\}`\}[\s\S]*?aria-label="查看 Rainbond 微信交流群二维码"[\s\S]*?title="加入 Rainbond 微信交流群"[\s\S]*?<img[\s\S]*?src="\/img\/homepage\/svg\/wechat\.svg"/.test(navbarSource),
    'Expected one labeled WeChat community icon in the homepage navbar.'
  );
  assert.ok(navbarSource.includes("import { IconGithubLogo } from '@douyinfe/semi-icons';"));
  assert.ok(!/MessageCircle|IconComment|IconUserGroup/.test(navbarSource));
  const communityRule = cssRule(navbarStyles, '.communityButton');
  assert.ok(Number.parseFloat(cssProperty(communityRule, 'min-width')) >= 44);
  assert.ok(Number.parseFloat(cssProperty(communityRule, 'min-height')) >= 44);
});

console.log('home hero content tests passed');
