const assert = require('assert');

const {
  appendSourceParam,
  buildEventPayload,
  getUmamiEventSpecFromAttributes,
  normalizePathname
} = require('../src/utils/umami');

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

test('normalizePathname strips domain, query, hash and trailing slash', () => {
  assert.equal(
    normalizePathname('https://www.rainbond.com/docs/quick-start/?tab=linux#copy'),
    '/docs/quick-start'
  );
});

test('normalizePathname keeps root path stable', () => {
  assert.equal(normalizePathname('/'), '/');
  assert.equal(normalizePathname(''), '/');
});

test('appendSourceParam appends normalized source page', () => {
  assert.equal(
    appendSourceParam('/docs/support', '/docs/quick-start/quick-install/'),
    '/docs/support?from=%2Fdocs%2Fquick-start%2Fquick-install'
  );
});

test('buildEventPayload injects normalized page path and drops empty values', () => {
  assert.deepEqual(
    buildEventPayload(
      {
        module: 'home_hero',
        target_path: 'https://www.rainbond.com/install-hub/',
        source_page: '/docs/quick-start/quick-install/',
        empty: undefined,
        keepFalse: false
      },
      '/docs/'
    ),
    {
      module: 'home_hero',
      page_path: '/docs',
      target_path: '/install-hub',
      source_page: '/docs/quick-start/quick-install',
      keepFalse: false
    }
  );
});

test('getUmamiEventSpecFromAttributes extracts event name and payload fields', () => {
  assert.deepEqual(
    getUmamiEventSpecFromAttributes({
      'data-umami-event': 'first_app_mode_selected',
      'data-umami-mode': 'source_code',
      'data-umami-source-page': '/docs/quick-start/getting-started/',
      role: 'tab',
    }),
    {
      eventName: 'first_app_mode_selected',
      payload: {
        mode: 'source_code',
        source_page: '/docs/quick-start/getting-started/',
      },
    }
  );
});

console.log('umami utils tests passed');
