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

const homeSource = read('src/pages/index.tsx');
const landingHeroSource = read('src/components/HomePage/ModernHome/LandingHero.tsx');
const platformSource = read('src/components/HomePage/ModernHome/PlatformSection.tsx');
const modernHomeStyles = read('src/components/HomePage/ModernHome/styles.module.css');
const entryPathsSource = read('src/components/HomePage/EntryPaths/index.tsx');
const entryPathsStyles = read('src/components/HomePage/EntryPaths/styles.module.css');
const scenarioSource = read('src/components/HomePage/ScenarioShowcase/index.tsx');
const scenarioStyles = read('src/components/HomePage/ScenarioShowcase/styles.module.css');
const demoSource = read('src/components/HomePage/Demo/index.tsx');
const demoStyles = read('src/components/HomePage/Demo/styles.module.css');
const controlsSource = read('src/components/HomePage/Demo/VideoProgressControls.tsx');

test('home places the scenario showcase and unique value before the complete product story', () => {
  assert.ok(
    homeSource.indexOf('<ScenarioShowcase />') < homeSource.indexOf('<EntryPaths />'),
    'Expected the scenario showcase before the path directory.'
  );
  assert.ok(
    homeSource.indexOf('<EntryPaths />') < homeSource.indexOf('<UniqueValue />'),
    'Expected the path directory before the unique value section.'
  );
  assert.ok(
    homeSource.indexOf('<UniqueValue />') < homeSource.indexOf('<PlatformSection />'),
    'Expected the unique value section before platform evaluation.'
  );
  ['<LandingHero />', '<PlatformSection />', '<DeepValueSection />', '<JourneySection />', '<ProofSection />', '<StartFaqSection />', '<FinalCta />'].forEach(component => {
    assert.ok(homeSource.includes(component), `Expected complete homepage module ${component}.`);
  });
  assert.ok(scenarioSource.includes('<Demo embedded />'), 'Expected operations to embed the core video demo inside the scenario panel.');
});

test('homepage links the four entry paths to practical tutorials', () => {
  [
    '四种入口，同一个成功标准',
    'AI 编程项目',
    '开源软件',
    'Git 仓库',
    '信创服务器',
    '正在评估企业容器平台？',
  ].forEach(copy => assert.ok(entryPathsSource.includes(copy), `Expected entry path copy: ${copy}.`));
  assert.strictEqual((entryPathsSource.match(/className=\{styles\.pathAction\}/g) || []).length, 1);
  assert.ok(entryPathsSource.includes('to={path.href}'));
  [
    '/docs/quick-start/ai-project',
    '/docs/quick-start/open-source',
    '/docs/quick-start/git-project',
    '/docs/quick-start/xinchuang-single-node',
  ].forEach(href => assert.ok(entryPathsSource.includes(`href: '${href}'`), `Expected practical tutorial ${href}.`));
  assert.ok(/\.pathGrid\s*\{[\s\S]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/.test(entryPathsStyles));
  assert.ok(entryPathsSource.includes('href="#platform"'));
  assert.ok(entryPathsSource.includes('to="/enterprise_server"'));
});

test('scenario showcase exposes four integrated button entries without destination links', () => {
  [
    'AI 部署项目',
    'Git 仓库上线',
    '部署开源软件',
    'AI 智能运维',
  ].forEach(title => assert.ok(scenarioSource.includes(title), `Expected scenario ${title}.`));
  assert.ok(!scenarioSource.includes('运行到信创环境'));
  assert.ok(!scenarioSource.includes("key: 'xinchuang'"));
  assert.ok(scenarioSource.includes('role="tablist"'));
  assert.ok(scenarioSource.includes('role="tabpanel"'));
  assert.ok(!scenarioSource.includes("from '@docusaurus/Link'"));
  assert.ok(!scenarioSource.includes('href='));
  assert.ok(!scenarioSource.includes('to='));
  assert.ok(scenarioSource.includes("activeScenario.key === 'operations'"));
  assert.ok(scenarioSource.indexOf("key: 'git'") < scenarioSource.indexOf("key: 'ai-deploy'"));
  assert.ok(scenarioSource.includes("useState<ScenarioKey>('git')"));
});

test('open source scenario uses four remote step videos', () => {
  [
    ['安装开源软件', 'https://grstatic.tos-cn-beijing.volces.com/mp4/安装开源软件.mp4'],
    ['构建部署软件', 'https://grstatic.tos-cn-beijing.volces.com/mp4/构建部署软件.mp4'],
    ['运维操作', 'https://grstatic.tos-cn-beijing.volces.com/mp4/运维操作.mp4'],
    ['访问地址', 'https://grstatic.tos-cn-beijing.volces.com/mp4/访问地址.mp4'],
  ].forEach(([step, assetPath]) => {
    assert.ok(scenarioSource.includes(step), `Expected open source flow step ${step}.`);
    assert.ok(scenarioSource.includes(assetPath), `Expected remote video ${assetPath}.`);
  });
  assert.ok(scenarioSource.includes('items={scenario.steps.map('));
});

test('git repository scenario uses four remote step videos', () => {
  [
    ['配置仓库地址', 'https://grstatic.tos-cn-beijing.volces.com/mp4/git仓库.mp4'],
    ['代码框架检测', 'https://grstatic.tos-cn-beijing.volces.com/mp4/检测.mp4'],
    ['源码构建部署', 'https://grstatic.tos-cn-beijing.volces.com/mp4/构建.mp4'],
    ['生成访问地址', 'https://grstatic.tos-cn-beijing.volces.com/mp4/访问.mp4'],
  ].forEach(([step, assetPath]) => {
    assert.ok(scenarioSource.includes(step), `Expected Git flow step ${step}.`);
    assert.ok(scenarioSource.includes(assetPath), `Expected remote video ${assetPath}.`);
  });
  assert.ok(scenarioSource.includes('autoPlay'));
  assert.ok(scenarioSource.includes('onEnded={() => handleVideoEnded(currentStep)}'));
  assert.ok(scenarioSource.includes('requestAnimationFrame(updateProgressFrame)'));
  assert.ok(scenarioSource.includes('progressFill.style.transform'));
  assert.ok(scenarioSource.includes('currentStepRef.current !== endedStep'));
  assert.ok(scenarioSource.includes('onChange={key => handleStepChange(Number(key))}'));
});

test('AI deployment scenario uses four remote videos without user confirmation', () => {
  [
    ['读取项目', 'https://grstatic.tos-cn-beijing.volces.com/mp4/读取项目.mp4'],
    ['生成计划', 'https://grstatic.tos-cn-beijing.volces.com/mp4/生成计划.mp4'],
    ['构建部署', 'https://grstatic.tos-cn-beijing.volces.com/mp4/构建部署.mp4'],
    ['获得地址', 'https://grstatic.tos-cn-beijing.volces.com/mp4/获得地址.mp4'],
  ].forEach(([step, assetPath]) => {
    assert.ok(scenarioSource.includes(step), `Expected AI deployment step ${step}.`);
    assert.ok(scenarioSource.includes(assetPath), `Expected remote video ${assetPath}.`);
  });
  assert.ok(!scenarioSource.includes('用户确认'));
});

test('hero avoids a duplicate product demo and scenario controls stay compact', () => {
  assert.ok(!landingHeroSource.includes('productTheater'));
  assert.ok(!landingHeroSource.includes('hero-app-deploy.png'));
  assert.ok(/\.scenarioHeader\s*\{[\s\S]*background:\s*#f8fafc;/.test(scenarioStyles));
  assert.ok(/\.scenarioTab\s*\{[\s\S]*min-height:\s*38px;/.test(scenarioStyles));
  assert.ok(/\.scenarioTabs\s*\{[\s\S]*background:\s*#eef2f7;/.test(scenarioStyles));
  assert.ok(/\.scenarioActivePill\s*\{[\s\S]*background:\s*#1768f2;/.test(scenarioStyles));
  assert.ok(/\.scenarioActivePill\s*\{[\s\S]*pointer-events:\s*none;/.test(scenarioStyles));
  assert.ok(/\.scenarioTabContent\s*\{[\s\S]*pointer-events:\s*none;/.test(scenarioStyles));
  assert.ok(scenarioSource.includes('layoutId="scenario-active-pill"'));
  assert.ok(scenarioSource.includes('<AnimatePresence mode="wait" initial={false}>'));
  assert.ok(scenarioSource.includes('const reduceMotion = useReducedMotion()'));
  assert.ok(/\.showcaseFrame\s*\{[\s\S]*width:\s*100%;[\s\S]*max-width:\s*min\(1400px,\s*calc\(177\.78dvh - 299px\)\);/.test(scenarioStyles));
  assert.ok(/\.scenarioTabs\s*\{[\s\S]*display:\s*flex;[\s\S]*overflow-x:\s*auto;/.test(scenarioStyles));
  assert.ok(scenarioSource.includes('styles.windowDots'));
  assert.ok(scenarioSource.includes('styles.scenarioStatus'));
  assert.ok(!scenarioSource.includes('五种场景，共用一套应用交付能力'));
  assert.ok(!scenarioSource.includes('选择当前任务，直接查看从输入到可访问结果的完整过程。'));
  assert.ok(!scenarioStyles.includes('.heading'));
});

test('hero places server installation before AI deployment', () => {
  assert.ok(
    landingHeroSource.indexOf('安装到我的服务器') < landingHeroSource.indexOf('让 AI 部署当前项目'),
    'Expected server installation to be the first hero action.'
  );
  assert.ok(/className=\{styles\.primaryButton\} to="\/docs\/quick-start\/quick-install"[^>]*>安装到我的服务器/.test(landingHeroSource));
  assert.ok(landingHeroSource.includes('useAgentDeploymentModal()'));
  assert.ok(/<button[^>]*className=\{styles\.secondaryButton\}[^>]*onClick=\{openAgentModal\}[^>]*>让 AI 部署当前项目<\/button>/.test(landingHeroSource));
  assert.ok(landingHeroSource.includes('{agentModal}'));
  assert.ok(!landingHeroSource.includes('to="/rainskills"'));
  assert.ok(!landingHeroSource.includes('ArrowRight'));
});

test('homepage uses one wide coordinated content rhythm', () => {
  assert.ok(modernHomeStyles.includes('.container{width:min(1380px,calc(100% - 32px));'));
  assert.ok(modernHomeStyles.includes('.section{padding:88px 0;'));
  assert.ok(modernHomeStyles.includes('gap:48px;align-items:end;margin-bottom:40px'));
});

test('homepage removes repeated scene chrome and secondary platform narration', () => {
  assert.ok(!scenarioSource.includes('styles.activeBar'));
  assert.ok(!scenarioSource.includes('styles.previewMessage'));
  assert.ok(!scenarioSource.includes('styles.previewResult'));
  assert.ok(!scenarioStyles.includes('.activeBar'));
  assert.ok(!scenarioStyles.includes('.previewMessage'));
  assert.ok(!platformSource.includes('platformPrinciple'));
  assert.ok(platformSource.includes('aria-label="Rainbond 五层平台架构图"'));
  assert.ok(!platformSource.includes('selectionPanel'));
  assert.ok(!platformSource.includes('用真实应用完成 POC'));
  assert.ok(!platformSource.includes('申请选型验证'));
  assert.ok(!modernHomeStyles.includes('.selectionPanel'));
});

test('platform architecture preserves the five product layers', () => {
  [
    '使用入口',
    '应用平台',
    '企业治理',
    'RainAgent',
    '源码构建 · 镜像部署',
    '应用模型',
    '应用发布 · 安装 · 升级 · 回滚',
    '多租户与权限',
    '多集群管理',
    'Kubernetes',
    '数据中心',
    '私有云',
    '分支机构 / 客户现场',
    '信创服务器',
  ].forEach(copy => assert.ok(platformSource.includes(copy), `Expected architecture content: ${copy}.`));

  const layerOrder = ['使用入口', '应用平台', '企业治理'];
  layerOrder.slice(1).forEach((layer, index) => {
    assert.ok(platformSource.indexOf(layerOrder[index]) < platformSource.indexOf(layer));
  });
  assert.ok(!platformSource.includes('rbd-api'));
  assert.ok(!platformSource.includes('flowLabels'));
});

test('scenario media preserves the complete widescreen frame', () => {
  assert.ok(/\.previewMedia\s*\{[\s\S]*aspect-ratio:\s*16 \/ 9;/.test(scenarioStyles));
  assert.ok(/\.previewMedia img,[\s\S]*\.previewMedia video\s*\{[\s\S]*object-fit:\s*contain;/.test(scenarioStyles));
  assert.ok(/\.demoEmbedded \.videoStage\s*\{[\s\S]*aspect-ratio:\s*16 \/ 9;/.test(demoStyles));
  assert.ok(/\.demoEmbedded \.video\s*\{[\s\S]*object-fit:\s*contain;/.test(demoStyles));
});

test('scenario media is readable without secondary zoom controls', () => {
  assert.ok(!scenarioSource.includes('放大查看演示'));
  assert.ok(!scenarioSource.includes('放大细节'));
  assert.ok(!scenarioSource.includes('isFocused'));
  assert.ok(!scenarioStyles.includes('.focusButton'));
  assert.ok(!scenarioStyles.includes('.zoomButton'));
  assert.ok(!demoSource.includes('onFocusChange'));
});

test('scenario workspace keeps navigation, content, and progress in one viewport', () => {
  assert.ok(/\.showcaseFrame\s*\{[\s\S]*display:\s*flex;[\s\S]*height:\s*min\(900px,\s*calc\(100dvh - 48px\)\);/.test(scenarioStyles));
  assert.ok(/\.scenarioHeader\s*\{[\s\S]*flex:\s*0 0 64px;/.test(scenarioStyles));
  assert.ok(/\.scenarioPanel\s*\{[\s\S]*flex:\s*1 1 auto;[\s\S]*min-height:\s*0;/.test(scenarioStyles));
  assert.ok(/\.previewMedia\s*\{[\s\S]*flex:\s*1 1 auto;[\s\S]*aspect-ratio:\s*auto;/.test(scenarioStyles));
  assert.ok(/\.previewSteps\s*\{[\s\S]*flex:\s*0 0 56px;/.test(scenarioStyles));
  assert.ok(/\.demoEmbedded \.tabDescriptionWrapper\s*\{[\s\S]*display:\s*none;/.test(demoStyles));
});

test('core demo uses the five latest feature videos', () => {
  [
    'https://static.goodrain.com/mp4/源码部署.mp4',
    'https://static.goodrain.com/mp4/数据库部署.mp4',
    'https://static.goodrain.com/mp4/故障排错.mp4',
    'https://static.goodrain.com/mp4/伸缩.mp4',
    'https://static.goodrain.com/mp4/授权确认.mp4',
  ].forEach((url) => {
    assert.ok(demoSource.includes(url), `Expected ${url} in Demo video playlist.`);
  });
});

test('core demo uses RainAgent headline and description', () => {
  assert.ok(demoSource.includes('让 AI 替你部署、排错、运维'));
  assert.ok(demoSource.includes('只用自然语言描述需求，RainAgent 会自动查状态、读日志、定位问题，并在你确认后执行操作。'));
});

test('core demo places heading inside the split background title container', () => {
  assert.ok(/<div className=\{styles\.mid\}>[\s\S]*<div className=\{styles\.titleWrapper\}>[\s\S]*让 AI 替你部署、排错、运维/.test(demoSource));
  assert.ok(/\.titleWrapper\s*\{/.test(demoStyles), 'Expected titleWrapper styles for header layout.');
});

test('core demo uses a plain section background and emphasized video frame', () => {
  assert.ok(/\.gradientBackground\s*\{[\s\S]*background:\s*transparent;/.test(demoStyles));
  assert.ok(!demoStyles.includes('.gradientBackground::before'));
  assert.ok(/\.videoStage\s*\{[\s\S]*max-width:\s*none;/.test(demoStyles));
  assert.ok(/box-shadow:\s*0 30px 90px rgba\(15, 23, 42, 0\.24\)/.test(demoStyles));
});

test('core demo preloads video media without saturating initial page bandwidth', () => {
  assert.ok(/rel="preconnect" href="https:\/\/static\.goodrain\.com"/.test(demoSource), 'Expected media CDN preconnect.');
  assert.ok(/rel="dns-prefetch" href="https:\/\/static\.goodrain\.com"/.test(demoSource), 'Expected media CDN DNS prefetch.');
  assert.ok(/rel="preload" as="video" href=\{featureVideos\[0\]\.src\}/.test(demoSource), 'Expected only the first video to be preloaded from the document head.');
  assert.ok(!/featureVideos\.map\(video => \(\s*<link key=\{video\.key\} rel="preload" as="video"/.test(demoSource), 'Expected to avoid preloading every video in the document head.');
  assert.ok(/src=\{preparedVideoMap\[video\.key\] \? video\.src : undefined\}/.test(demoSource), 'Expected deferred video src attachment.');
  assert.ok(/preload=\{getVideoPreloadMode\(video\.key\)\}/.test(demoSource), 'Expected dynamic video preload mode.');
  assert.ok(demoSource.includes('prepareVideo(getNextVideoKey(visibleKey))'), 'Expected one-ahead video preloading.');
});

test('core demo advances videos automatically and exposes read-only progress buttons', () => {
  assert.ok(
    /onEnded=\{\(\) => handleVideoEnded\(video\.key\)\}/.test(demoSource),
    'Expected ended handler for playlist autoplay.'
  );
  assert.ok(
    /onTimeUpdate=\{\(\) => handleTimeUpdate\(video\.key\)\}/.test(demoSource),
    'Expected timeupdate handler for progress.'
  );
  assert.ok(controlsSource.includes("aria-current={key === activeKey ? 'step' : undefined}"), 'Expected accessible active module button.');
  assert.ok(controlsSource.includes('styles.moduleProgressFill'), 'Expected module progress fill element.');
});

test('all scenarios use the same icon buttons and video progress controls', () => {
  assert.ok(demoSource.includes('<VideoProgressControls'));
  assert.ok(scenarioSource.includes('<VideoProgressControls'));
  assert.ok(controlsSource.includes('styles.moduleIcon'), 'Expected icon styling on module buttons.');
  assert.ok(/\.moduleProgress\s*\{[\s\S]*bottom:\s*0;[\s\S]*height:\s*3px;/.test(demoStyles), 'Expected progress at the bottom edge.');
  assert.ok(/\.moduleProgressFill\s*\{[\s\S]*height:\s*3px;/.test(demoStyles), 'Expected a slim progress fill.');
  assert.ok(/\.moduleButtonActive\s*\{[\s\S]*color:\s*#0d4bb5;[\s\S]*background:\s*#f3f7ff;/.test(demoStyles), 'Expected a light active state.');
  assert.ok(!scenarioSource.includes('styles.previewStepComplete'));
  assert.ok(!scenarioStyles.includes('@keyframes previewStepProgress'));
  assert.ok(scenarioSource.includes('cancelAnimationFrame(animationFrame)'));
  assert.ok(controlsSource.includes("'--module-count': items.length"));
});

test('core demo progress animation is smooth, high contrast, and blue themed', () => {
  assert.ok(demoSource.includes('requestAnimationFrame(updateProgressFrame)'), 'Expected frame-based progress updates.');
  assert.ok(demoSource.includes('cancelAnimationFrame(animationFrameId)'), 'Expected animation frame cleanup.');
  assert.ok(demoSource.includes('progressFillRefs'), 'Expected progress animation to update fill elements directly.');
  assert.ok(demoSource.includes('progressFill.style.transform'), 'Expected progress animation to avoid React state updates on every frame.');
  assert.ok(/\.moduleProgressFill\s*\{[\s\S]*background:\s*#1768f2;/.test(demoStyles));
  assert.ok(/transition:\s*transform 0\.08s linear;/.test(demoStyles));
});

console.log('home core video tests passed');
