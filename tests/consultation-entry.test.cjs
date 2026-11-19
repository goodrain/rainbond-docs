const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  CONSULTATION_FORM_URL,
  CONSULTATION_EVENT_NAME,
  ENTERPRISE_PAGE_ENTRY_EVENT_NAME,
  buildConsultationHref,
  buildEnterprisePageEntryEventProps,
} = require('../src/utils/consultation');

assert.equal(
  buildConsultationHref('/enterprise_server/', 'homepage_customer_proof'),
  `${CONSULTATION_FORM_URL}?from=%2Fenterprise_server&entry=homepage_customer_proof`,
);

assert.equal(CONSULTATION_EVENT_NAME, 'consult_clicked');
assert.equal(ENTERPRISE_PAGE_ENTRY_EVENT_NAME, 'enterprise_page_entry_clicked');
assert.deepEqual(
  buildEnterprisePageEntryEventProps('navigation_enterprise'),
  {
    entry_name: 'navigation_enterprise',
    target_page: 'enterprise_server',
    cta_text: '企业版',
  },
);

assert.deepEqual(
  buildEnterprisePageEntryEventProps('legacy_navigation_enterprise'),
  {
    entry_name: 'legacy_navigation_enterprise',
    target_page: 'enterprise_server',
    cta_text: '企业版',
  },
);

const footerConfig = fs.readFileSync(path.resolve(__dirname, '..', 'docusaurus.config.js'), 'utf8');
assert.match(
  footerConfig,
  /label: '联系我们',[\s\S]*href: 'https:\/\/rainbond\.feishu\.cn\/share\/base\/shrcn4dG9z5zvbZZWd1MFf6ILBg'/
);

const compareHero = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/Compare/CompareHeroGraphic.tsx'), 'utf8');
assert.match(compareHero, /appendEntryParam=\{primaryCta\.appendEntryParam\}/);
assert.doesNotMatch(compareHero, /\}\}>\s*appendSourcePageParam=/);
assert.match(compareHero, /target=\{primaryCta\.target\}/);

const enterprisePage = fs.readFileSync(path.resolve(__dirname, '..', 'src/pages/enterprise_server/index.js'), 'utf8');
assert.match(enterprisePage, /plan\.outlineBtn\.entryName && trackUmamiEvent/);

const homepageHero = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/HomePage/ModernHome/LandingHero.tsx'), 'utf8');
assert.doesNotMatch(homepageHero, /ENTERPRISE_PAGE_ENTRY_EVENT_NAME|homepage_hero|企业版 \/ 商业咨询/);

const homepageStyles = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/HomePage/ModernHome/styles.module.css'), 'utf8');
assert.match(homepageStyles, /@media\(max-width:700px\)\{[\s\S]*?\.heroActions\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/);
assert.match(homepageStyles, /@media\(max-width:700px\)\{[\s\S]*?\.heroActions a,\.heroActions button\{min-width:0;padding:8px 6px;font-size:13px\}/);
assert.match(homepageStyles, /\.heroActions button\{cursor:pointer;font-family:inherit;font-size:inherit;line-height:inherit\}/);

const consultationUtils = fs.readFileSync(path.resolve(__dirname, '..', 'src/utils/consultation.js'), 'utf8');
assert.doesNotMatch(consultationUtils, /homepage_hero:/);

const aiPrivateDeployment = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/Solutions/AiPrivateDeployment.tsx'), 'utf8');
assert.match(aiPrivateDeployment, /appendEntryParam: 'ai_private_deployment_hero'/);

const proofStyles = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/HomePage/ModernHome/proof.module.css'), 'utf8');
assert.match(proofStyles, /@media \(max-width: 1000px\)[\s\S]*\.evidence article:nth-child\(2n\)[\s\S]*border-right: 0/);
assert.match(proofStyles, /@media \(max-width: 520px\)[\s\S]*\.evidence article:last-child[\s\S]*border-bottom: 0/);
assert.match(proofStyles, /@media \(max-width: 520px\)[\s\S]*\.evidence article:nth-last-child\(-n \+ 2\)[\s\S]*border-bottom: 1px solid #d8e0eb/);

const appType = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/MarketPlace/AppType/index.tsx'), 'utf8');
assert.doesNotMatch(appType, /window\.open\(/);

console.log('consultation entry tests passed');
