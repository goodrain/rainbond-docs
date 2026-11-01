const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the rendered click handlers without sending events to production Umami.
const root = path.resolve(__dirname, '..');
const events = [];
let copySucceeds = true;
const react = {
  createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
  useState: initial => [initial, () => {}],
  useRef: initial => ({ current: initial }),
  useEffect: () => {},
};
const browser = {
  location: { pathname: '/' },
  umami: { track: (name, payload) => events.push({ name, payload: JSON.parse(JSON.stringify(payload)) }) },
  setTimeout: () => 1,
  clearTimeout: () => {},
};
const cache = new Map();
const styles = new Proxy({}, { get: (_, key) => String(key) });

function load(relative) {
  let filename = path.resolve(root, relative);
  if (!path.extname(filename)) {
    filename = ['.tsx', '.ts', '.js', '/index.tsx'].map(ext => filename + ext).find(fs.existsSync);
  }
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const source = fs.readFileSync(filename, 'utf8');
  const code = filename.endsWith('.js') ? source : ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
  }).outputText;
  const requireMock = name => {
    if (name === 'react') return react;
    if (name === 'clsx') return (...values) => values.filter(value => typeof value === 'string').join(' ');
    if (name === 'copy-to-clipboard') return () => copySucceeds;
    if (name === 'lucide-react') return new Proxy({}, { get: () => 'svg' });
    if (name === '@douyinfe/semi-ui') return { Modal: 'dialog' };
    if (name === '@docusaurus/Link') return 'a';
    if (name === '@docusaurus/Head') return 'head';
    if (name === '@docusaurus/router') return { useLocation: () => ({ pathname: '/' }) };
    if (name === 'framer-motion') return { useReducedMotion: () => false, motion: { div: 'div', span: 'span' }, AnimatePresence: 'fragment' };
    if (name.endsWith('.css')) return styles;
    if (/\.(png|jpe?g|svg)$/.test(name)) return name;
    if (name.startsWith('@src/')) return load('src/' + name.slice(5));
    if (name.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(filename), name)));
    throw new Error(`Unexpected dependency: ${name}`);
  };
  vm.runInNewContext(code, {
    module, exports: module.exports, require: requireMock, window: browser,
    navigator: { clipboard: { writeText: async () => {} } },
  }, { filename });
  return module.exports;
}

function nodes(node) {
  if (!node || typeof node !== 'object') return [];
  return [node, ...(node.props?.children || []).flat(Infinity).flatMap(nodes)];
}

function find(tree, predicate) {
  const node = nodes(tree).find(predicate);
  assert.ok(node, 'Expected interactive element');
  return node;
}

function text(node) {
  if (typeof node === 'string') return node;
  return (node?.props?.children || []).flat(Infinity).map(text).join('');
}

function click(node) {
  if (node.props.eventName) node = node.type(node.props); // Real TrackedLink handler.
  node.props.onClick({});
}

function render(file) {
  return load(`src/components/HomePage/${file}`).default();
}

const hero = render('ModernHome/LandingHero');
click(find(hero, node => node.props.to === '/docs/quick-start/quick-install'));
assert.equal(events.pop().name, 'cta_home_install_clicked');
click(find(hero, node => node.props['aria-haspopup'] === 'dialog'));
assert.deepEqual(events.pop(), {
  name: 'cta_home_rainskills_agent_opened',
  payload: { module: 'home_hero', cta_text: '让 AI 帮我部署', page_path: '/' },
});
const copies = nodes(hero).filter(node => node.type === 'button' && /handleCopyPrompt/.test(String(node.props.onClick)));
assert.equal(copies.length, 3);
copies.forEach(click);
assert.deepEqual(events.splice(0).map(event => event.name), [
  'cta_home_rainskills_prompt_copied',
  'cta_home_rainskills_deploy_prompt_copied',
  'cta_home_rainbond_deploy_prompt_copied',
]);
copySucceeds = false;
copies.forEach(click);
assert.equal(events.length, 0, 'Failed copies must not count as conversion');

const entries = render('EntryPaths');
const entryLinks = nodes(entries).filter(node => node.props.eventName === 'home_entry_clicked');
assert.equal(entryLinks.length, 4);
entryLinks.forEach(click);
assert.equal(new Set(events.splice(0).map(event => event.payload.target_path)).size, 4);
click(find(entries, node => node.props.href === '#platform'));
assert.equal(events.pop().name, 'home_platform_clicked');
click(find(entries, node => node.props.to === '/enterprise_server'));
assert.equal(events.pop().name, 'home_poc_clicked');

const proof = render('ModernHome/ProofSection');
const evidenceLinks = nodes(proof)
  .filter(node => typeof node.type === 'function' && node.type.name === 'Evidence')
  .flatMap(node => nodes(node.type(node.props)))
  .filter(node => node.props.eventName === 'home_evidence_clicked');
assert.equal(evidenceLinks.length, 3);
evidenceLinks.forEach(click);
assert.equal(events.splice(0).length, 3, 'Each evidence click must be counted exactly once');
const finalCta = render('ModernHome/FinalCta');
click(find(finalCta, node => node.props.to === '/docs/quick-start/quick-install'));
assert.equal(events.pop().name, 'cta_install_clicked');
click(find(finalCta, node => node.props.to === '/rainskills'));
assert.equal(events.pop().name, 'home_rainskills_clicked');
const sdk = browser.umami;
delete browser.umami;
click(entryLinks[0]);
assert.equal(events.length, 0, 'An unavailable SDK must not break click handlers');
browser.umami = sdk;

const scenario = render('ScenarioShowcase');
assert.equal(events.length, 0, 'Rendering/default scenario must not count as selection');
click(find(scenario, node => node.props.role === 'tab' && node.props['aria-selected']));
assert.equal(events.length, 0, 'Selecting the active scenario must not duplicate events');
click(find(scenario, node => node.props.id === 'scenario-tab-market'));
assert.equal(events.pop().payload.scenario, 'market');

const controls = load('src/components/HomePage/Demo/VideoProgressControls').default({
  items: [{ key: '0', title: '安装' }, { key: '1', title: '构建' }],
  activeKey: '0', label: '部署开源软件流程', onChange: () => {}, fillRef: () => {},
});
click(find(controls, node => node.type === 'button' && node.props['aria-current'] === 'step'));
assert.equal(events.length, 0);
click(find(controls, node => node.type === 'button' && text(node).includes('构建')));
assert.equal(events.pop().name, 'home_demo_step_selected');

const values = render('UniqueValue');
click(find(values, node => node.props.role === 'tab' && text(node).includes('软件接入')));
assert.equal(events.pop().payload.step_title, '软件接入');
const solutions = render('ModernHome/DeepValueSection');
click(find(solutions, node => node.props.role === 'tab' && text(node).includes('企业 IT')));
assert.equal(events.pop().name, 'home_solution_selected');

(async () => {
  const start = render('ModernHome/StartFaqSection');
  await find(start, node => node.props['aria-label'] === '复制 RainSkills 安装命令').props.onClick();
  assert.equal(events.pop().name, 'install_command_copied');
  click(find(start, node => node.type === 'button' && node.props['aria-expanded'] === true));
  assert.equal(events.length, 0, 'Collapsing an FAQ must not count as opening');
  click(find(start, node => node.type === 'button' && text(node).includes('不用 AI 编程工具')));
  assert.equal(events.pop().name, 'home_faq_opened');
  console.log('homepage analytics handlers passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
