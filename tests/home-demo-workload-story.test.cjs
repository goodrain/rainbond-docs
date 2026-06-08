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
    /\.workloadSticky\s*\{[\s\S]*width:\s*min\(100%,\s*var\(--content-max-width,\s*1380px\)\);[\s\S]*grid-template-columns:\s*minmax\(360px,\s*0\.9fr\)\s*minmax\(520px,\s*1\.1fr\);/.test(
      demoStyles
    ),
    'Expected desktop workload grid to keep the original left/right proportion.'
  );
  assert.ok(
    /\.workloadVisualFrame\s*\{[\s\S]*overflow:\s*hidden;/.test(demoStyles),
    'Expected fixed right visual frame to clip moving content.'
  );
  assert.ok(
    /\.workloadVisualFrame\s*\{[\s\S]*width:\s*min\(100%,\s*880px\);[\s\S]*height:\s*min\(700px,\s*calc\(100vh\s*-\s*120px\)\);/.test(
      demoStyles
    ),
    'Expected desktop visual frame to keep the existing screenshot frame scale.'
  );
  assert.ok(
    /\.workloadRight\s*\{[\s\S]*padding:\s*clamp\(0\.5rem,\s*0\.8vw,\s*1rem\);/.test(demoStyles),
    'Expected right side spacing to be reduced without changing the column ratio.'
  );
  assert.ok(
    /\.workloadVisualPanel\s*\{[\s\S]*padding:\s*0;/.test(demoStyles),
    'Expected screenshot panel spacing to be removed so the image can use the right column.'
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
    'workloadFrameTopbar',
    'visualSceneStage',
    'visualScreenshotStage',
  ].forEach(token => {
    assert.ok(!demoSource.includes(token), `Expected visual composition to omit ${token}.`);
  });

  assert.ok(
    /\.workloadVisualFrame\s*\{[\s\S]*background:\s*transparent;/.test(demoStyles),
    'Expected fixed visual frame to clip content without adding another visible layer.'
  );
  assert.ok(
    /\.visualScreenshotShell\s*\{[\s\S]*aspect-ratio:\s*3420\s*\/\s*1904;/.test(demoStyles),
    'Expected screenshot shell to match the provided screenshot ratio without horizontal cropping.'
  );
  assert.ok(
    /\.visualScreenshotImage\s*\{[\s\S]*object-fit:\s*contain;/.test(demoStyles),
    'Expected real screenshots to display fully without cropping.'
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
  const screenshotShellRuleMatch = demoStyles.match(/\.visualScreenshotShell\s*\{[^}]*\}/);
  assert.ok(screenshotShellRuleMatch, 'Expected screenshot shell styles to exist.');

  assert.ok(
    /\.workloadVisualFrame\s*\{[\s\S]*overflow:\s*hidden;[\s\S]*background:\s*transparent;/.test(demoStyles),
    'Expected the fixed visual frame to act as a transparent clipping area.'
  );
  assert.ok(
    !/box-shadow:/.test(screenshotShellRuleMatch[0]),
    'Expected screenshot shell to render without an outer shadow.'
  );
  assert.ok(
    !/\.visualScreenshotShell::before|\.visualScreenshotShell::after|\.workloadFrameTopbar|\.visualSceneStage|\.visualScreenshotStage/.test(
      demoStyles
    ),
    'Expected nested chrome, stage layers, and screenshot pseudo overlays to be removed.'
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
