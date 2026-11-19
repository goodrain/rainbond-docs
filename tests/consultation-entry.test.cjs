const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  CONSULTATION_FORM_URL,
  CONSULTATION_EVENT_NAME,
  ENTERPRISE_PAGE_ENTRY_EVENT_NAME,
  buildConsultationEventProps,
  buildConsultationHref,
  buildEnterprisePageEntryEventProps,
} = require('../src/utils/consultation');

assert.equal(
  buildConsultationHref('/enterprise_server/', 'homepage_customer_proof'),
  `${CONSULTATION_FORM_URL}?from=%2Fenterprise_server&entry=homepage_customer_proof`,
);

assert.deepEqual(
  buildConsultationEventProps('homepage_hero', 'enterprise_consultation'),
  {
    entry_name: 'homepage_hero',
    target_form: 'enterprise_consultation',
    cta_text: '企业版 / 商业咨询',
  }
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

const footerConfig = fs.readFileSync(path.resolve(__dirname, '..', 'docusaurus.config.js'), 'utf8');
assert.match(
  footerConfig,
  /label: '联系我们',[\s\S]*href: 'https:\/\/rainbond\.feishu\.cn\/share\/base\/shrcn4dG9z5zvbZZWd1MFf6ILBg'/
);

const compareHero = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/Compare/CompareHeroGraphic.tsx'), 'utf8');
assert.match(compareHero, /appendEntryParam=\{primaryCta\.appendEntryParam\}>/);
assert.doesNotMatch(compareHero, /\}\}>\s*appendSourcePageParam=/);

const enterprisePage = fs.readFileSync(path.resolve(__dirname, '..', 'src/pages/enterprise_server/index.js'), 'utf8');
assert.match(enterprisePage, /plan\.outlineBtn\.entryName && trackUmamiEvent/);

const homepageHero = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/HomePage/ModernHome/LandingHero.tsx'), 'utf8');
assert.match(homepageHero, /ENTERPRISE_PAGE_ENTRY_EVENT_NAME/);
assert.doesNotMatch(homepageHero, /CONSULTATION_EVENT_NAME/);

const aiPrivateDeployment = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/Solutions/AiPrivateDeployment.tsx'), 'utf8');
assert.match(aiPrivateDeployment, /appendEntryParam: 'ai_private_deployment_hero'/);

console.log('consultation entry tests passed');
