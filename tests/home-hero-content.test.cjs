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

function markupElementByClass(source, tagName, className) {
  const match = source.match(
    new RegExp(`<${tagName}\\b(?=[^>]*className=\\{styles\\.${className}\\})[^>]*>[\\s\\S]*?<\\/${tagName}>`)
  );
  assert.ok(match, `Expected a ${tagName} using styles.${className}.`);
  return match[0];
}

const heroSource = withoutJsxComments(read('src/components/HomePage/Hero/index.tsx'));
const heroStyles = read('src/components/HomePage/Hero/styles.module.css');

test('home hero renders the approved three-line headline and description', () => {
  assert.ok(
    /<h1 className=\{styles\.hero_title_one\}>AI 生成<\/h1>\s*<h1 className=\{styles\.hero_title_two\}>Rainbond 运行<\/h1>\s*<h1 className=\{clsx\(styles\.hero_title_one, styles\.hero_title_last\)\}>始终由你掌控<\/h1>/.test(heroSource),
    'Expected the three approved title lines in order with the middle line emphasized.'
  );
  assert.ok(
    /<p className=\{styles\.hero_title_four\}>将 AI 生成的项目、AI 开源软件和业务应用，以容器方式运行在自己的服务器或 Kubernetes 上，并持续完成部署、运维、升级与交付。<\/p>/.test(heroSource),
    'Expected the approved Hero description verbatim.'
  );
});

test('home hero keeps the three clear left-side actions', () => {
  assert.ok(
    /<TrackedLink\s+to="\/docs\/quick-start\/quick-install"[\s\S]*?cta_text: '安装 Rainbond',[\s\S]*?target_path: '\/docs\/quick-start\/quick-install',[\s\S]*?>\s*安装 Rainbond\s*<\/TrackedLink>/.test(heroSource),
    'Expected the Rainbond install action and analytics copy to be explicit.'
  );
  assert.ok(!heroSource.includes('to="/docs/ai/rainskills"'), 'Expected RainSkills to stop navigating to documentation.');
  assert.ok(
    /<button\b(?=[^>]*ref=\{agentEntryButtonRef\})(?=[^>]*className=\{`\$\{styles\.hero_button_style\} \$\{styles\.hero_button_primary\}`\})(?=[^>]*onClick=\{openAgentModal\})[^>]*>\s*接入我的 AI Agent\s*<\/button>[\s\S]*?<TrackedLink\s+to="\/docs\/quick-start\/quick-install"/.test(heroSource),
    'Expected the Agent entry to be the first primary Hero action.'
  );
});

test('home hero removes the right-side Agent deployment demo without removing modal prompts', () => {
  assert.ok(!heroSource.includes('https://www.bilibili.com/video/BV1Lzo5BGEuc'));
  assert.ok(!heroSource.includes('Rainbond 视频封面'));
  assert.ok(!heroSource.includes('agentDemoPanel'), 'Expected the right-side demo markup to be removed.');
  [
    'Codex · Claude Code',
    '部署示例',
    'RainSkills 正在调用 Rainbond',
    '已识别项目结构',
    '已生成部署配置',
    '已完成应用构建',
    '已部署到 Rainbond',
    '应用已通过运行检查',
  ].forEach((copy) => {
    assert.ok(!heroSource.includes(copy), `Expected demo-only copy to be removed: ${copy}`);
  });
  assert.ok(heroSource.includes('帮我部署当前项目'), 'Expected the deploy prompt to remain in the Agent modal.');
  assert.ok(!/CircleCheck|LoaderCircle|Sparkles/.test(heroSource), 'Expected demo-only icon imports and markup to be removed.');
  assert.ok(!/\.agentDemo|@keyframes\s+agentDemo|@keyframes\s+slideInFromRight/.test(heroStyles), 'Expected demo-only CSS to be removed.');
});

test('home hero uses a centered single column on desktop and left alignment on mobile', () => {
  const layoutRule = cssRule(heroStyles, '.hero_layout');
  assertCssProperty(layoutRule, 'grid-template-columns', '1fr');
  assertCssProperty(layoutRule, 'max-width', '920px');
  assertCssProperty(layoutRule, 'justify-items', 'center');

  const titleRule = cssRule(heroStyles, '.hero_title');
  assertCssProperty(titleRule, 'max-width', '900px');
  assertCssProperty(titleRule, 'margin', '0 auto');
  assertCssProperty(titleRule, 'align-items', 'center');
  assertCssProperty(titleRule, 'text-align', 'center');

  const descriptionRule = cssRule(heroStyles, '.hero_title_four');
  assertCssProperty(descriptionRule, 'max-width', '760px');
  assertCssProperty(descriptionRule, 'margin', '0 auto 2.25rem');
  assertCssProperty(descriptionRule, 'text-align', 'center');

  const actionsRule = cssRule(heroStyles, '.hero_button');
  assertCssProperty(actionsRule, 'flex-direction', 'column');
  assertCssProperty(actionsRule, 'align-items', 'center');
  assertCssProperty(actionsRule, 'justify-content', 'center');
  assert.ok(heroSource.includes('className={styles.hero_primary_actions}'), 'Expected the two main actions to share one row above the community action.');
  assertCssProperty(cssRule(heroStyles, '.hero_primary_actions'), 'justify-content', 'center');
  const statsRule = cssRule(heroStyles, '.hero_stats_row');
  assertCssProperty(statsRule, 'max-width', '900px');
  assertCssProperty(statsRule, 'margin', '0 auto 2rem');

  const tablet = mediaQuery(heroStyles, 768);
  const mobileTitleRule = cssRule(tablet, '.hero_title');
  assertCssProperty(mobileTitleRule, 'align-items', 'flex-start');
  assertCssProperty(mobileTitleRule, 'text-align', 'left');
  assertCssProperty(cssRule(tablet, '.hero_title_four'), 'text-align', 'left');
  assertCssProperty(cssRule(tablet, '.hero_button'), 'align-items', 'flex-start');
  assertCssProperty(cssRule(tablet, '.hero_primary_actions'), 'justify-content', 'flex-start');
  const mobileStatsRule = cssRule(tablet, '.hero_stats_row');
  assertCssProperty(mobileStatsRule, 'align-items', 'flex-start');
  assertCssProperty(mobileStatsRule, 'margin', '0 auto 1.5rem');
  assertCssProperty(cssRule(tablet, '.hero_stat_item'), 'justify-content', 'flex-start');
});

test('home hero reserves safe top space below the fixed 65px navigation', () => {
  assertCssProperty(cssRule(heroStyles, '.container'), 'margin-top', 'calc(65px + 2rem)');
  assertCssProperty(cssRule(mediaQuery(heroStyles, 768), '.container'), 'margin-top', 'calc(65px + 1.5rem)');
  assertCssProperty(cssRule(mediaQuery(heroStyles, 480), '.container'), 'margin-top', 'calc(65px + 1rem)');
});

test('RainSkills Agent modal presents the approved concise prompt flow', () => {
  [
    '让 AI Agent 连接 Rainbond',
    '安装 RainSkills 后，就可以直接让 Agent 部署和运维应用。',
    '连接 AI Agent',
    '复制下面的指令，发送给你正在使用的 Agent：',
    '帮我通过npx 安装rainskills',
    '复制安装指令',
    '接入后',
    '部署应用',
    '安装完成后，继续在同一个对话中输入：',
    '帮我部署当前项目',
    '复制部署指令',
    '已复制',
    '重新复制',
    '复制失败，请手动复制',
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
  assert.ok(/className=\{styles\.modalNextStep\}/.test(heroSource));
  assert.strictEqual((heroSource.match(/onClick=\{\(\) => handleCopyPrompt\('(install|deploy)'\)\}/g) || []).length, 2);

  const feedback = markupElementByClass(heroSource, 'p', 'copyFeedback');
  assert.ok(feedback.includes('aria-live="polite"'));
  assert.ok(
    /copyState\.status === 'error'\s*\?\s*'复制失败，请手动复制'/.test(feedback),
    'Expected a separate polite live region to announce the exact copy failure message.'
  );
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
  assert.ok(!/(?:^|;)\s*(?:border|background|padding)\s*:/.test(compatibilityRule));
  const itemRule = cssRule(heroStyles, '.agentCompatibilityItem');
  assertCssProperty(itemRule, 'display', 'inline-flex');
  assert.ok(Number.parseFloat(cssProperty(itemRule, 'font-size')) >= 12);
  assert.ok(!/(?:^|;)\s*(?:border|border-radius|background|padding)\s*:/.test(itemRule));

  const modalListRule = cssRule(heroStyles, '.agentCompatibility .agentCompatibilityList');
  assertCssProperty(modalListRule, 'display', 'grid');
  assertCssProperty(modalListRule, 'grid-template-columns', 'repeat(3, minmax(0, 1fr))');
  assertCssProperty(modalListRule, 'gap', '0.75rem 1rem');
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

test('home hero repeats the supported Agent logo row directly below the primary buttons', () => {
  const primaryActionsIndex = heroSource.indexOf('className={styles.hero_primary_actions}');
  const heroCompatibilityIndex = heroSource.indexOf('className={styles.heroAgentCompatibility}');
  const compareLinkIndex = heroSource.indexOf('className={styles.hero_compare_link}');

  assert.ok(primaryActionsIndex >= 0);
  assert.ok(heroCompatibilityIndex > primaryActionsIndex);
  assert.ok(compareLinkIndex > heroCompatibilityIndex);
  assert.ok(/<div className=\{styles\.heroAgentCompatibility\}>[\s\S]*?<ul className=\{styles\.agentCompatibilityList\} aria-label="首页支持的 AI Agent">/.test(heroSource));
  assert.strictEqual((heroSource.match(/SUPPORTED_AGENTS\.map\(\(\{ name, logo \}\) => \(/g) || []).length, 2);

  const heroCompatibilityRule = cssRule(heroStyles, '.heroAgentCompatibility');
  assertCssProperty(heroCompatibilityRule, 'width', '100%');
  assertCssProperty(heroCompatibilityRule, 'max-width', '560px');
  assertCssProperty(heroCompatibilityRule, 'margin', '1.25rem auto 0');
});

test('RainSkills install and deploy prompts copy independently with exact analytics payloads', () => {
  assert.ok(heroSource.includes("const RAINSKILLS_INSTALL_PROMPT = '帮我通过npx 安装rainskills';"));
  assert.ok(heroSource.includes("const RAINSKILLS_DEPLOY_PROMPT = '帮我部署当前项目';"));
  const copyHandler = balancedBlock(
    heroSource,
    /const handleCopyPrompt = \(target: CopyTarget\) => \{/,
    'handleCopyPrompt function'
  );
  assert.ok(/const prompt = target === 'install'\s*\? RAINSKILLS_INSTALL_PROMPT\s*:\s*RAINSKILLS_DEPLOY_PROMPT;/.test(copyHandler));
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
  assert.ok(copyHandler.includes("'复制安装指令'"));
  assert.ok(copyHandler.includes("'复制部署指令'"));

  const openHandler = balancedBlock(heroSource, /const openAgentModal = \(\) => \{/, 'openAgentModal function');
  assert.ok(
    /trackUmamiEvent\(\s*'cta_home_rainskills_agent_opened'\s*,\s*\{\s*module:\s*'home_hero',\s*cta_text:\s*'接入我的 AI Agent',?\s*\}\s*\);/.test(openHandler),
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
  assert.ok(/const handleCopyPrompt = \(target: CopyTarget\) => \{\s*clearCopyResetTimer\(\);/.test(heroSource));
});

test('RainSkills modal stays within the viewport and preserves accessible touch targets', () => {
  const modalRule = cssRule(heroStyles, '.agentModal');
  assertCssProperty(modalRule, 'max-width', '600px');
  assert.ok(
    [cssProperty(modalRule, 'width'), cssProperty(modalRule, 'max-width')].includes('calc(100vw - 32px)'),
    'Expected the modal width to reserve 16px on each viewport edge.'
  );

  const modalDialogRule = cssRule(heroStyles, '.agentModal :global(.semi-modal)');
  assertCssProperty(modalDialogRule, 'width', 'calc(100vw - 32px)');
  assertCssProperty(modalDialogRule, 'max-width', '600px');

  const modalContentRule = cssRule(heroStyles, '.agentModal :global(.semi-modal-content)');
  assertCssProperty(modalContentRule, 'max-height', 'calc(100vh - 32px)');
  assertCssProperty(modalContentRule, 'overflow-y', 'auto');
  assertCssProperty(modalContentRule, 'background', 'var(--ifm-background-surface-color, #fff)');

  assertCssProperty(cssRule(heroStyles, '.copyFeedback:empty'), 'margin', '0');
  assertCssProperty(cssRule(heroStyles, '.modalNextStep'), 'border-top', '1px solid var(--ifm-color-emphasis-200, #e2e8f0)');
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

test('home hero keeps the WeChat overlay and gives its button an unambiguous label', () => {
  assert.ok(
    /<OverlayTrigger[\s\S]*?overlay=\{\(overlayProps\) => \([\s\S]*?src="\/wechat\/wechatgroup-text\.png"[\s\S]*?>[\s\S]*?<button type="button" className=\{styles\.hero_community_link\}>\s*加入微信交流群\s*<\/button>\s*<\/OverlayTrigger>/.test(heroSource),
    'Expected the existing WeChat QR overlay to wrap a visually subordinate, explicitly labeled community entry.'
  );
  const communityRule = cssRule(heroStyles, '.hero_community_link');
  assertCssProperty(communityRule, 'background', 'transparent');
  assertCssProperty(communityRule, 'border', '0');
  assert.ok(Number.parseFloat(cssProperty(communityRule, 'min-height')) >= 44);
});

test('home hero links platform evaluators to the comparison center below the actions', () => {
  assert.ok(
    /<TrackedLink\s+to="\/compare"\s+className=\{styles\.hero_compare_link\}[\s\S]*?eventName="cta_home_compare_clicked"[\s\S]*?>\s*正在选型容器平台？了解 Rainbond 的不同\s*<span aria-hidden="true">→<\/span>\s*<\/TrackedLink>/.test(heroSource),
    'Expected a clearly labeled comparison-center link below the homepage actions.'
  );

  const compareRule = cssRule(heroStyles, '.hero_compare_link');
  assertCssProperty(compareRule, 'color', 'var(--ifm-color-primary, #2563eb)');
  assertCssProperty(compareRule, 'text-decoration', 'underline');
  assert.ok(Number.parseFloat(cssProperty(compareRule, 'min-height')) >= 44);
});

test('home hero final title line retains responsive sizing and owns the description gap', () => {
  assert.ok(
    /\.hero_title_two\s*\{[\s\S]*?margin-bottom:\s*0\.5rem;[\s\S]*?\}/.test(heroStyles),
    'Expected the middle title line to use only the inter-line gap.'
  );
  assert.ok(
    /\.hero_title_last\s*\{[\s\S]*?margin-bottom:\s*2rem;[\s\S]*?\}/.test(heroStyles),
    'Expected the final dark title line to own the desktop description gap.'
  );
  assert.ok(
    /@media \(max-width:\s*768px\)[\s\S]*?\.hero_title_one,\s*\.hero_title_two\s*\{[\s\S]*?font-size:\s*36px;[\s\S]*?\}[\s\S]*?\.hero_title_last\s*\{[\s\S]*?margin-bottom:\s*1\.5rem;/.test(heroStyles),
    'Expected the composed final line to retain tablet sizing and the mobile description gap.'
  );
  assert.ok(
    /@media \(max-width:\s*480px\)[\s\S]*?\.hero_title_one,\s*\.hero_title_two\s*\{[\s\S]*?font-size:\s*28px;/.test(heroStyles),
    'Expected the composed final line to retain phone sizing.'
  );
  assert.ok(
    /@media \(max-width:\s*360px\)[\s\S]*?\.hero_title_one,\s*\.hero_title_two\s*\{[\s\S]*?font-size:\s*20px;/.test(heroStyles),
    'Expected the composed final line to retain extra-small sizing.'
  );
});

console.log('home hero content tests passed');
