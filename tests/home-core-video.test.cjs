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
const demoSource = read('src/components/HomePage/Demo/index.tsx');
const demoStyles = read('src/components/HomePage/Demo/styles.module.css');

test('home places core video demo after path cards and before user proof', () => {
  assert.ok(
    homeSource.indexOf('<ChoosePath />') < homeSource.indexOf('<Demo />'),
    'Expected ChoosePath to render before Demo.'
  );
  assert.ok(
    homeSource.indexOf('<Demo />') < homeSource.indexOf('<Users />'),
    'Expected Demo to render before Users after removing the intervening marketing sections.'
  );
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
  assert.ok(demoSource.includes('aria-current={video.key === activeKey}'), 'Expected accessible active module button.');
  assert.ok(demoSource.includes('styles.moduleProgressFill'), 'Expected module progress fill element.');
});

test('core demo module buttons use full-tile progress and visible icons', () => {
  assert.ok(demoSource.includes('const Icon = video.icon;'), 'Expected each module button to render its configured icon.');
  assert.ok(demoSource.includes('styles.moduleIcon'), 'Expected icon styling on module buttons.');
  assert.ok(/\.moduleProgress\s*\{[\s\S]*inset:\s*0;/.test(demoStyles), 'Expected progress layer to fill the whole button.');
  assert.ok(/\.moduleProgressFill\s*\{[\s\S]*height:\s*100%;/.test(demoStyles), 'Expected progress fill to cover button height.');
  assert.ok(/\.moduleButtonActive\s*\{[\s\S]*color:\s*#003f8f;/.test(demoStyles), 'Expected active button contrast.');
});

test('core demo progress animation is smooth, high contrast, and blue themed', () => {
  assert.ok(demoSource.includes('requestAnimationFrame(updateProgressFrame)'), 'Expected frame-based progress updates.');
  assert.ok(demoSource.includes('cancelAnimationFrame(animationFrameId)'), 'Expected animation frame cleanup.');
  assert.ok(demoSource.includes('progressFillRefs'), 'Expected progress animation to update fill elements directly.');
  assert.ok(demoSource.includes('progressFill.style.transform'), 'Expected progress animation to avoid React state updates on every frame.');
  assert.ok(/background:\s*linear-gradient\(90deg,\s*rgba\(0, 102, 255, 0\.34\) 0%,\s*rgba\(128, 183, 255, 0\.62\) 100%\)/.test(demoStyles));
  assert.ok(/transition:\s*transform 0\.08s linear;/.test(demoStyles));
});

console.log('home core video tests passed');
