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

test('home demo includes three enterprise workload story items', () => {
  ['业务应用', 'AI / 大模型', '虚拟机类工作负载'].forEach(title => {
    assert.ok(demoSource.includes(`title: '${title}'`), `Expected workload story item ${title}.`);
  });
  assert.ok(!demoSource.includes(`title: '生产级中间件'`), 'Expected middleware story item to be removed.');

  assert.ok(
    demoSource.includes('装好 Rainbond，企业常见工作负载统一交付'),
    'Expected the workload story heading.'
  );
});

test('home demo workload story uses sticky left and fixed visual frame with snapped track', () => {
  assert.ok(/const\s+workloadStories\s*=/.test(demoSource), 'Expected workload story data.');
  assert.ok(/workloadStoryRef/.test(demoSource), 'Expected scroll section ref.');
  assert.ok(/snappedTrackIndex/.test(demoSource), 'Expected visual track to snap to the selected workload.');
  assert.ok(/visualTrackStyle/.test(demoSource), 'Expected computed visual track style.');
  assert.ok(
    /--workload-track-index/.test(demoSource),
    'Expected selected workload index to drive the visual track.'
  );
  assert.ok(
    /window\.requestAnimationFrame\?\.bind\(window\)/.test(demoSource) &&
      /window\.setTimeout/.test(demoSource),
    'Expected scroll state updates to fall back when requestAnimationFrame is unavailable.'
  );
  assert.ok(
    /window\.cancelAnimationFrame\?\.bind\(window\)/.test(demoSource) &&
      /window\.clearTimeout\.bind\(window\)/.test(demoSource),
    'Expected scheduled scroll updates to clean up with a matching fallback.'
  );

  assert.ok(
    /\.workloadStory\s*\{[\s\S]*min-height:\s*calc\(var\(--workload-story-count\)\s*\*\s*100vh\);/.test(demoStyles),
    'Expected long scroll section height.'
  );
  assert.ok(
    /\.workloadSticky\s*\{[\s\S]*position:\s*sticky;[\s\S]*top:\s*72px;/.test(demoStyles),
    'Expected sticky story grid.'
  );
  assert.ok(
    /\.workloadVisualFrame\s*\{[\s\S]*overflow:\s*hidden;/.test(demoStyles),
    'Expected fixed right visual frame to clip moving content.'
  );
  assert.ok(
    /\.workloadVisualTrack\s*\{[\s\S]*transform:\s*translate3d\(0,\s*calc\(var\(--workload-track-index\)\s*\*\s*-100%\),\s*0\);/.test(demoStyles),
    'Expected snapped visual track transform.'
  );
  assert.ok(
    /\.workloadVisualTrack\s*\{[\s\S]*transition:\s*transform\s*0\.46s\s*cubic-bezier/.test(demoStyles),
    'Expected eased snap transition for visual track.'
  );
});

test('home demo workload visuals use three provided screenshot panels', () => {
  ['screenshot', 'imageSrc'].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected workload screenshot data to include ${token}.`);
  });
  [
    '/img/homepage/workloads/business.png',
    '/img/homepage/workloads/ai.png',
    '/img/homepage/workloads/virtual-machine.png',
  ].forEach(src => {
    assert.ok(demoSource.includes(`imageSrc: '${src}'`), `Expected screenshot source ${src}.`);
    assert.ok(
      fs.existsSync(path.join(__dirname, '..', 'static', src.replace(/^\//, ''))),
      `Expected screenshot file for ${src}.`
    );
  });

  [
    'visualSceneStage',
    'visualScreenshotStage',
    'visualScreenshotShell',
    'visualScreenshotImage',
  ].forEach(className => {
    assert.ok(demoSource.includes(`styles.${className}`), `Expected screenshot slot class ${className}.`);
  });

  [
    'Rainbond 交付视角',
    '应用中心',
    '建议放置',
    'visualSceneHeader',
    'visualSceneBadge',
    'visualSceneStatus',
    'visualScreenshotCaption',
    'visualScreenshotPlaceholder',
  ].forEach(token => {
    assert.ok(!demoSource.includes(token), `Expected visual composition to omit ${token}.`);
  });

  assert.ok(
    /\.visualSceneStage\s*\{[\s\S]*background:/.test(demoStyles),
    'Expected visual scene stage background styling.'
  );
  assert.ok(
    /\.visualScreenshotShell\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*10;/.test(demoStyles),
    'Expected screenshot shell to reserve a stable image area.'
  );
  assert.ok(
    /\.visualScreenshotImage\s*\{[\s\S]*object-fit:\s*cover;/.test(demoStyles),
    'Expected real screenshots to fill the reserved image area.'
  );
  assert.ok(
    /alt=\{story\.title\}/.test(demoSource),
    'Expected screenshot alt text to use the matching workload title.'
  );
  assert.ok(
    /@media \(prefers-reduced-motion:\s*reduce\)/.test(demoStyles),
    'Expected reduced-motion fallback for the visual scene animations.'
  );
});

test('home demo workload visuals have premium depth and polish styling', () => {
  assert.ok(
    /\.visualSceneStage\s*\{[\s\S]*isolation:\s*isolate;[\s\S]*radial-gradient/.test(demoStyles),
    'Expected visual scene stage to use isolated radial lighting layers.'
  );
  assert.ok(
    /\.visualScreenshotShell\s*\{[\s\S]*box-shadow:/.test(demoStyles),
    'Expected screenshot shell to have premium framed depth.'
  );
  assert.ok(
    /\.visualScreenshotShell::before/.test(demoStyles),
    'Expected screenshot shell to include a soft highlight layer.'
  );
  assert.ok(
    !/\.visualScreenshotCaption|\.visualScreenshotPlaceholder|\.visualSceneHeader|\.visualSceneBadge|\.visualSceneStatus/.test(
      demoStyles
    ),
    'Expected decorative labels, captions, and placeholder styles to be removed.'
  );
});

test('home demo workload screenshots can open an enlarged preview', () => {
  [
    'Maximize2',
    'X',
    'previewIndex',
    'setPreviewIndex(index)',
    'closePreview',
    "event.key === 'Escape'",
    "document.body.style.overflow = 'hidden'",
    'role="dialog"',
    'aria-modal="true"',
    '关闭截图预览',
    'workloadPreviewOverlay',
    'workloadPreviewDialog',
    'workloadPreviewImage',
    'workloadPreviewClose',
    'visualScreenshotExpandCue',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected enlarged preview implementation to include ${token}.`);
  });

  assert.ok(
    /<button[\s\S]*className=\{styles\.visualScreenshotShell\}[\s\S]*aria-label=\{`放大查看\$\{story\.title\}截图`\}/.test(
      demoSource
    ),
    'Expected screenshot frame to be an accessible zoom button.'
  );
  assert.ok(
    !/className=\{styles\.workloadRight\}\s+aria-hidden/.test(demoSource),
    'Expected interactive screenshot area to remain available to assistive technology.'
  );
  assert.ok(
    /\.visualScreenshotShell\s*\{[\s\S]*cursor:\s*zoom-in;/.test(demoStyles),
    'Expected screenshot frame to indicate zoom affordance.'
  );
  assert.ok(
    /\.workloadPreviewOverlay\s*\{[\s\S]*position:\s*fixed;[\s\S]*backdrop-filter:\s*blur/.test(demoStyles),
    'Expected enlarged preview overlay to cover and blur the page.'
  );
  assert.ok(
    /\.workloadPreviewImage\s*\{[\s\S]*object-fit:\s*contain;/.test(demoStyles),
    'Expected enlarged screenshot to preserve the full image.'
  );
});

test('home demo workload story has a mobile non-sticky fallback', () => {
  assert.ok(
    /@media \(max-width:\s*900px\)\s*\{[\s\S]*\.workloadStory\s*\{[\s\S]*min-height:\s*auto;/.test(demoStyles),
    'Expected mobile story to disable long scroll height.'
  );
  assert.ok(
    /@media \(max-width:\s*900px\)\s*\{[\s\S]*\.workloadSticky\s*\{[\s\S]*position:\s*relative;/.test(demoStyles),
    'Expected mobile story grid to stop being sticky.'
  );
});

console.log('home demo workload story tests passed');
