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

test('home demo includes four enterprise workload story items', () => {
  ['业务应用', 'AI / 大模型', '生产级中间件', '虚拟机类工作负载'].forEach(title => {
    assert.ok(demoSource.includes(`title: '${title}'`), `Expected workload story item ${title}.`);
  });
  [
    '源码、镜像、Compose、Helm、YAML 都能部署。',
    '把 AI 应用和模型服务部署进企业内网。',
    '数据库、缓存、消息队列不再散落各处',
    '承接暂时无法容器化的存量系统。',
  ].forEach(copy => {
    assert.ok(demoSource.includes(copy), `Expected workload story copy: ${copy}.`);
  });

  [
    '适合 Java、Node.js、Python、Go、前后端、微服务和企业自研系统',
    '支持 Dify、n8n、Qwen 和 DeepSeek',
    'MySQL、PostgreSQL、Redis、RabbitMQ',
    '让传统系统、容器应用和云原生应用逐步进入同一套交付与运维入口',
  ].forEach(copy => {
    assert.ok(!demoSource.includes(copy), `Expected secondary workload copy to be removed: ${copy}.`);
  });

  assert.ok(
    demoSource.includes('企业常见工作负载统一交付'),
    'Expected the workload story heading.'
  );
});

test('home demo workload story uses click-driven timeline and fixed viewport layout', () => {
  [
    'activeStory',
    'workloadHeaderShell',
    'workloadHeaderPattern',
    'workloadSliceHeader',
    'workloadFusionStage',
    'workloadTimeline',
    'workloadTimelineItem',
    'workloadMediaViewport',
    'workloadViewportMedia',
    'workloadViewportProgress',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected timeline viewport implementation to include ${token}.`);
  });

  assert.ok(
    !/updateScrollState|workloadStoryRef|window\.addEventListener\('scroll'|window\.scrollTo|scrollableDistance|stickyTop/.test(
      demoSource
    ),
    'Expected workload switching to be controlled by left-side clicks instead of page scroll.'
  );
  assert.ok(
    !/snappedTrackIndex|visualTrackStyle|--workload-track-index|workloadVisualTrack|workloadVisualPanel|visualScreenshotShell/.test(
      demoSource
    ),
    'Expected the old snapped screenshot track implementation to be removed.'
  );
  assert.ok(
    !/workloadTimelinePanel|workloadTimelineIntro|点击切换|选择左侧类型，右侧同步展示对应视频 \/ 截图/.test(demoSource) &&
      !/\.workloadTimelinePanel|\.workloadTimelineIntro/.test(demoStyles),
    'Expected the left timeline intro and outer card wrapper to be removed.'
  );
  assert.ok(
    !/workloadViewportBar|workloadWindowDots|workloadViewportTitle|workloadViewportCounter|workloadViewportBody|统一交付视图/.test(demoSource) &&
      !/\.workloadViewportBar|\.workloadWindowDots|\.workloadViewportTitle|\.workloadViewportCounter|\.workloadViewportBody/.test(demoStyles),
    'Expected the right media area to remove repeated window chrome and nested viewport wrappers.'
  );
  assert.ok(
    !/\.workloadFusionStage::before|\.workloadFusionStage::after|\.workloadTimelineItem::before/.test(demoStyles),
    'Expected the workload navigation to avoid protruding decorative lines.'
  );

  assert.ok(
    !/\.workloadStory\s*\{[\s\S]*min-height:\s*calc\(var\(--workload-story-count\)\s*\*\s*100vh\);/.test(demoStyles),
    'Expected the workload module to avoid long scroll-driven section height.'
  );
  assert.ok(
    /\.workloadSticky\s*\{[\s\S]*position:\s*relative;[\s\S]*min-height:\s*auto;[\s\S]*grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\);/.test(
      demoStyles
    ),
    'Expected a normal click-driven timeline viewport layout.'
  );
  assert.ok(
    /\.workloadSliceHeader\s*\{[\s\S]*display:\s*flex;[\s\S]*align-items:\s*center;[\s\S]*text-align:\s*center;/.test(demoStyles) &&
      /\.workloadTitle\s*\{[\s\S]*font-size:\s*clamp\(2rem,\s*3vw,\s*2\.75rem\);[\s\S]*letter-spacing:\s*-0\.04em;/.test(demoStyles) &&
      /\.workloadLead\s*\{[\s\S]*max-width:\s*820px;[\s\S]*text-align:\s*center;/.test(demoStyles),
    'Expected workload heading and description to match the homepage section presentation.'
  );
  assert.ok(
    demoSource.includes('src="/img/split-bg.png"') &&
      /\.workloadHeaderShell\s*\{[\s\S]*min-height:\s*142px;[\s\S]*border-left:\s*1px\s*solid\s*#eaebee;[\s\S]*border-right:\s*1px\s*solid\s*#eaebee;[\s\S]*border-bottom:\s*1px\s*solid\s*#eaebee;/.test(demoStyles) &&
      /\.workloadHeaderPattern\s*\{[\s\S]*object-fit:\s*cover;[\s\S]*opacity:\s*0\.72;/.test(demoStyles),
    'Expected the workload heading to reuse the homepage split line background.'
  );
  assert.ok(
    /\.workloadFusionStage\s*\{[\s\S]*--workload-stage-height:\s*clamp\(500px,\s*40vw,\s*620px\);[\s\S]*height:\s*var\(--workload-stage-height\);[\s\S]*grid-template-columns:\s*minmax\(250px,\s*300px\)\s+minmax\(0,\s*1fr\);/.test(demoStyles),
    'Expected the workload module to use a coordinated stage height and give the media area primary width.'
  );
  assert.ok(
    /\.workloadFusionStage\s*\{[\s\S]*padding:\s*clamp\(1rem,\s*1\.6vw,\s*1\.4rem\);[\s\S]*background:\s*[\s\S]*linear-gradient\(135deg,\s*rgba\(238,\s*246,\s*255,\s*0\.94\)/.test(demoStyles),
    'Expected the workload stage to use a subtle supporting background for stronger contrast.'
  );
  assert.ok(
    /\.workloadMediaViewport\s*\{[\s\S]*display:\s*block;[\s\S]*border:\s*0;[\s\S]*border-radius:\s*22px;[\s\S]*box-shadow:\s*none;/.test(demoStyles),
    'Expected the right side to show rounded video without an extra visible frame.'
  );
});

test('home demo workload media is video-only without legacy image assets', () => {
  ['media', 'videoSrc'].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected workload media data to include ${token}.`);
  });

  [
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/业务应用.mp4',
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/AI大模型.mp4',
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/数据库.mp4',
    'https://grstatic.tos-cn-beijing.volces.com/mp4/工作负载/部署虚拟机.mp4',
  ].forEach(src => {
    assert.ok(demoSource.includes(`videoSrc: '${src}'`), `Expected workload video source ${src}.`);
  });

  [
    'workloadMediaViewport',
    'workloadViewportMedia',
    'workloadViewportMediaActive',
    'workloadViewportMediaHidden',
    'workloadMediaExpandCue',
  ].forEach(className => {
    assert.ok(demoSource.includes(`styles.${className}`) || demoStyles.includes(`.${className}`), `Expected viewport media class ${className}.`);
  });

  [
    'muted',
    'playsInline',
    'autoPlay={isActive && previewIndex === null}',
    "preload={isActive ? 'auto' : 'metadata'}",
    'story.media.videoSrc',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected video-ready viewport rendering to include ${token}.`);
  });

  [
    '/img/homepage/workloads/business.png',
    '/img/homepage/workloads/ai.png',
    '/img/homepage/workloads/middleware.png',
    '/img/homepage/workloads/virtual-machine.png',
    'story.media.poster',
    'previewStory.media.poster',
  ].forEach(token => {
    assert.ok(!demoSource.includes(token), `Expected legacy workload image reference to be removed: ${token}.`);
  });

  assert.ok(
    !fs.existsSync(path.join(__dirname, '..', 'static/img/homepage/workloads')),
    'Expected legacy workload image directory to be removed.'
  );

  assert.ok(
    /\.workloadMediaViewport\s*\{[\s\S]*cursor:\s*zoom-in;/.test(demoStyles),
    'Expected the product viewport to be the dominant zoomable media area.'
  );
  assert.ok(
    !/\.workloadViewportBody\s*\{[\s\S]*margin:\s*0\.85rem;/.test(demoStyles),
    'Expected the product viewport to avoid nested chrome margins.'
  );
  assert.ok(
    /\.workloadViewportMediaActive\s*\{[\s\S]*opacity:\s*1;/.test(demoStyles) &&
      /\.workloadViewportMediaHidden\s*\{[\s\S]*opacity:\s*0;/.test(demoStyles),
    'Expected inactive workload media to stay in the fixed viewport and crossfade cleanly.'
  );
  assert.ok(
    /\.workloadViewportMedia\s*\{[\s\S]*object-fit:\s*contain;/.test(demoStyles),
    'Expected workload media to display fully without cropping.'
  );
  assert.ok(
    /\.workloadViewportMedia\s*\{[\s\S]*border-radius:\s*inherit;[\s\S]*background:\s*transparent;/.test(demoStyles),
    'Expected workload media to remove the white backing and inherit rounded corners.'
  );
});

test('home demo workload videos auto-advance after playback ends', () => {
  [
    'workloadVideoRefs',
    'handleWorkloadVideoEnded',
    'onEnded={() => handleWorkloadVideoEnded(index)}',
    '(currentIndex + 1) % workloadStories.length',
    'video.play().catch',
    'video.pause()',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected workload auto-advance implementation to include ${token}.`);
  });

  assert.ok(
    !/loop\s+autoPlay=\{isActive/.test(demoSource),
    'Expected workload viewport videos to advance on ended instead of looping in place.'
  );
});

test('home demo workload timeline expresses a clear selectable story', () => {
  [
    '工作负载来源',
    '从业务应用、AI 应用到存量虚拟机，统一进入 Rainbond 的交付和运维链路',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected timeline viewport copy/structure to include ${token}.`);
  });

  assert.ok(
    /\.workloadTimeline\s*\{[\s\S]*height:\s*100%;[\s\S]*grid-template-rows:\s*repeat\(var\(--workload-story-count\),\s*minmax\(0,\s*1fr\)\);[\s\S]*align-content:\s*stretch;/.test(demoStyles),
    'Expected the left timeline list to match the media stage height.'
  );
  assert.ok(
    /\.workloadTimelineItem\s*\{[\s\S]*border:\s*0;[\s\S]*background:\s*transparent;/.test(demoStyles) &&
      /\.workloadTimelineItemActive\s*\{[\s\S]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.82\);[\s\S]*box-shadow:\s*0\s*10px\s*26px\s*rgba\(15,\s*111,\s*255,\s*0\.08\);[\s\S]*transform:\s*none;/.test(
      demoStyles
    ),
    'Expected the active timeline item to read clearly against the supporting stage background.'
  );
  assert.ok(
    /\.workloadTimelineTitle\s*\{[\s\S]*font-size:\s*clamp\(1rem,\s*1\.08vw,\s*1\.14rem\);[\s\S]*white-space:\s*nowrap;[\s\S]*text-overflow:\s*ellipsis;/.test(demoStyles) &&
      /\.workloadTimelineDescription\s*\{[\s\S]*font-size:\s*15px;[\s\S]*overflow:\s*visible;/.test(demoStyles) &&
      !/-webkit-line-clamp:\s*2;/.test(demoStyles),
    'Expected left navigation titles to stay on one line and descriptions to display fully.'
  );
  assert.ok(
    /\.workloadViewportProgress\s*\{[\s\S]*position:\s*absolute;[\s\S]*background:\s*rgba\(148,\s*163,\s*184,\s*0\.52\);/.test(demoStyles),
    'Expected the viewport to show subtle overlaid position feedback.'
  );
});

test('home demo workload media can open an enlarged preview', () => {
  [
    'Maximize2',
    'X',
    'previewIndex',
    'setPreviewIndex(activeIndex)',
    'closePreview',
    "event.key === 'Escape'",
    "document.body.style.overflow = 'hidden'",
    'role="dialog"',
    'aria-modal="true"',
    '关闭演示预览',
    'workloadPreviewOverlay',
    'workloadPreviewDialog',
    'workloadPreviewMedia',
    'workloadPreviewClose',
    'workloadMediaExpandCue',
    'previewStory.media.videoSrc',
    'controls',
  ].forEach(token => {
    assert.ok(demoSource.includes(token), `Expected enlarged preview implementation to include ${token}.`);
  });

  assert.ok(
    /aria-label=\{`放大查看\$\{activeStory\.title\}演示`\}/.test(demoSource),
    'Expected the fixed viewport to be an accessible zoom button.'
  );
  assert.ok(
    /\.workloadMediaViewport\s*\{[\s\S]*cursor:\s*zoom-in;/.test(demoStyles),
    'Expected the viewport to indicate zoom affordance.'
  );
  assert.ok(
    /\.workloadPreviewOverlay\s*\{[\s\S]*position:\s*fixed;[\s\S]*backdrop-filter:\s*blur/.test(demoStyles),
    'Expected enlarged preview overlay to cover and blur the page.'
  );
  assert.ok(
    /\.workloadPreviewMedia\s*\{[\s\S]*object-fit:\s*contain;/.test(demoStyles),
    'Expected enlarged media to preserve the full image or video.'
  );
});

test('home demo workload story has a mobile stacked fallback', () => {
  assert.ok(
    /@media \(max-width:\s*900px\)\s*\{[\s\S]*\.workloadSticky\s*\{[\s\S]*position:\s*relative;/.test(demoStyles),
    'Expected mobile story grid to remain non-sticky.'
  );
  assert.ok(
    /@media \(max-width:\s*900px\)\s*\{[\s\S]*\.workloadFusionStage\s*\{[\s\S]*grid-template-columns:\s*1fr;/.test(
      demoStyles
    ),
    'Expected mobile to stack the timeline and viewport.'
  );
  assert.ok(
    /@media \(max-width:\s*900px\)\s*\{[\s\S]*\.workloadFusionStage\s*\{[\s\S]*height:\s*auto;[\s\S]*\.workloadTimeline\s*\{[\s\S]*grid-template-rows:\s*none;[\s\S]*\.workloadMediaViewport\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*9;[\s\S]*min-height:\s*220px;/.test(
      demoStyles
    ),
    'Expected mobile to stack naturally while reserving stable space for the active media.'
  );
});

console.log('home demo workload story tests passed');
