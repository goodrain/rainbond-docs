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

function assertMatches(source, pattern) {
  assert.ok(pattern.test(source), `Expected pattern ${pattern} to match.`);
}

const featureListSource = read('src/components/FeatureList/index.tsx');
const appOpsSource = read('src/pages/feature/app-ops/index.tsx');
const devopsSource = read('src/pages/feature/devops/index.tsx');
const multiClusterSource = read('src/pages/feature/multi-cluster/index.tsx');

test('feature pages use h1 and image alt text support in shared components', () => {
  assertMatches(featureListSource, /<h1 className=\{styles\.title\}>\{title\}<\/h1>/);
  assertMatches(featureListSource, /alt=\{imageAlt \|\| title\}/);
  assertMatches(featureListSource, /alt=\{imageAltRight \|\| titleRight\}/);
  assertMatches(featureListSource, /alt=\{imageAltLeft \|\| titleLeft\}/);
});

test('app ops page includes structured seo metadata and related internal links', () => {
  assertMatches(appOpsSource, /application\/ld\+json/);
  assertMatches(appOpsSource, /meta name="keywords"/);
  assertMatches(appOpsSource, /\/docs\/how-to-guides\/app-ops\/app-snapshot/);
  assertMatches(appOpsSource, /\/docs\/how-to-guides\/app-ops\/service-auto-scaling/);
});

test('devops page includes structured seo metadata and delivery links', () => {
  assertMatches(devopsSource, /application\/ld\+json/);
  assertMatches(devopsSource, /meta name="keywords"/);
  assertMatches(devopsSource, /\/docs\/how-to-guides\/delivery\/continuous\/source-code/);
  assertMatches(devopsSource, /\/docs\/how-to-guides\/delivery\/upgrade-app/);
});

test('multi-cluster page includes structured seo metadata and cluster management links', () => {
  assertMatches(multiClusterSource, /application\/ld\+json/);
  assertMatches(multiClusterSource, /meta name="keywords"/);
  assertMatches(multiClusterSource, /\/docs\/installation\/install-with-ui/);
  assertMatches(multiClusterSource, /\/docs\/how-to-guides\/delivery\/continuous\/multi-env/);
  assertMatches(multiClusterSource, /\/compare\/rainbond-vs-rancher/);
});

console.log('feature seo tests passed');
