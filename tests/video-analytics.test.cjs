const assert = require('assert');

const {
  buildVideoAnalyticsPayload,
  buildVideoStepAnalyticsPayload,
} = require('../src/utils/videoAnalytics');

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

const sampleVideo = {
  id: 'quick-install',
  title: '快速安装',
  category: '快速入门',
  href: '/videos/quick-install',
};

test('buildVideoAnalyticsPayload extracts core video fields', () => {
  assert.deepEqual(
    buildVideoAnalyticsPayload(sampleVideo, {
      module: 'video_card',
      source_page: '/videos',
    }),
    {
      video_id: 'quick-install',
      video_title: '快速安装',
      video_category: '快速入门',
      video_href: '/videos/quick-install',
      module: 'video_card',
      source_page: '/videos',
    }
  );
});

test('buildVideoStepAnalyticsPayload adds step title when provided', () => {
  assert.deepEqual(
    buildVideoStepAnalyticsPayload(sampleVideo, '复制安装命令', {
      module: 'video_command',
    }),
    {
      video_id: 'quick-install',
      video_title: '快速安装',
      video_category: '快速入门',
      video_href: '/videos/quick-install',
      step_title: '复制安装命令',
      module: 'video_command',
    }
  );
});

console.log('video analytics tests passed');
