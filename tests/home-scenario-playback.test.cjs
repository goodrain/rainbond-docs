const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Drive the actual React handlers with isolated hook state; no media downloads or analytics requests.
const root = path.resolve(__dirname, '..');
let currentHooks;
let reduceMotion = false;
const events = [];
const react = {
  createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
  useState(initial) {
    const hooks = currentHooks;
    const index = hooks.index++;
    if (!(index in hooks.values)) hooks.values[index] = initial;
    return [hooks.values[index], value => {
      hooks.values[index] = typeof value === 'function' ? value(hooks.values[index]) : value;
    }];
  },
  useRef(initial) {
    const hooks = currentHooks;
    const index = hooks.index++;
    if (!(index in hooks.values)) hooks.values[index] = { current: initial };
    return hooks.values[index];
  },
  useEffect() {},
  useCallback: callback => callback,
};
function load(relative) {
  const filename = path.join(root, relative);
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require(name) {
      if (name === 'react') return react;
      if (name === 'clsx') return (...values) => values.filter(Boolean).join(' ');
      if (name === 'framer-motion') return { AnimatePresence: 'presence', motion: { div: 'div', span: 'span' }, useReducedMotion: () => reduceMotion };
      if (name === 'lucide-react') return new Proxy({}, { get: () => 'svg' });
      if (name.endsWith('.css')) return new Proxy({}, { get: (_, key) => String(key) });
      if (name.endsWith('/umami')) return { trackUmamiEvent: (...args) => events.push(args) };
      return name;
    },
  }, { filename });
  return module.exports.default;
}
function mount(Component, props = {}) {
  const hooks = { index: 0, values: [] };
  return () => {
    currentHooks = hooks;
    hooks.index = 0;
    return Component(props);
  };
}
function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  return [tree, ...(tree.props.children || []).flat(Infinity).flatMap(nodes)];
}
const find = (tree, predicate) => {
  const node = nodes(tree).find(predicate);
  assert.ok(node, 'Expected playback control');
  return node;
};
const activeScenario = tree => find(tree, node => node.props.role === 'tab' && node.props['aria-selected']).props.id;
const preview = tree => find(tree, node => typeof node.type === 'function' && node.type.name === 'ScenarioPreview');
const video = tree => find(tree, node => node.type === 'video');

const Showcase = load('src/components/HomePage/ScenarioShowcase/index.tsx');
const render = mount(Showcase);
let tree = render();
assert.equal(activeScenario(tree), 'scenario-tab-git');
for (const [scene, next] of [['git', 'market'], ['market', 'ai-deploy'], ['ai-deploy', 'operations']]) {
  const panel = preview(tree);
  const renderPreview = mount(panel.type, panel.props);
  for (let step = 0; step < 4; step++) {
    video(renderPreview()).props.onEnded();
    assert.equal(activeScenario(render()), `scenario-tab-${step === 3 ? next : scene}`);
  }
  tree = render();
}
const operations = find(tree, node => node.type === '@src/components/HomePage/Demo');
const Demo = load('src/components/HomePage/Demo/index.tsx');
const renderDemo = mount(Demo, operations.props);
for (const key of ['source', 'database', 'troubleshoot', 'scale', 'authorize']) {
  find(renderDemo(), node => node.type === 'video' && node.props.key === key).props.onEnded();
}
assert.equal(activeScenario(render()), 'scenario-tab-git', 'Last operations video returns to the first scenario');
assert.equal(events.length, 0, 'Autoplay must not count as user selection');

// A stale completion callback from an exiting panel cannot override a manual selection.
tree = render();
const staleCompletion = preview(tree).props.onComplete;
find(tree, node => node.props.id === 'scenario-tab-market').props.onClick();
staleCompletion();
tree = render();
assert.equal(activeScenario(tree), 'scenario-tab-market');
assert.equal(events.length, 1, 'Manual selection is tracked exactly once');
assert.ok(!nodes(tree).some(node => node.props['aria-label'] === '暂停场景自动切换'), 'No autoplay badge or toggle in the scenario header');
reduceMotion = true;
const reducedTree = mount(Showcase)();
const reducedPanel = preview(reducedTree);
assert.equal(reducedPanel.props.onComplete, undefined, 'Reduced motion disables automatic scene changes');
const renderReduced = mount(reducedPanel.type, reducedPanel.props);
for (let i = 0; i < 4; i++) video(renderReduced()).props.onEnded();
assert.ok(video(renderReduced()).props['aria-label'].endsWith('配置仓库地址'), 'Reduced motion loops within the selected scenario');
console.log('scenario playback handoff, looping, manual selection and reduced motion passed');
