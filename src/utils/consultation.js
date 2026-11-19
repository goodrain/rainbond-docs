const {appendSourceParam} = require('./umami');

const CONSULTATION_FORM_URL = 'https://rainbond.feishu.cn/share/base/shrcn4dG9z5zvbZZWd1MFf6ILBg';
const CONSULTATION_EVENT_NAME = 'consult_clicked';
const ENTERPRISE_PAGE_ENTRY_EVENT_NAME = 'enterprise_page_entry_clicked';

const ENTRY_CTA_TEXT = {
  homepage_hero: '企业版 / 商业咨询',
  homepage_customer_proof: '商业咨询',
  navigation_enterprise: '企业版',
  legacy_navigation_enterprise: '企业版',
  footer_enterprise: '企业版',
  footer_contact: '联系我们',
  docs_enterprise_cta: '商业咨询',
  docs_enterprise_cta_trial: '免费试用',
  docs_plugin_badge: '了解企业版',
  docs_support_table: '官方支持',
  docs_support_official: '官方支持',
  docs_troubleshooting_official: '官方支持',
  it_enterprise_hero: '获取企业应用管理方案',
  it_enterprise_final: '获取企业应用管理方案',
  enterprise_pricing_consult: '商业咨询',
  enterprise_pricing_demo: '预约演示',
  marketplace_primary: '商业咨询',
  marketplace_contact: '商业咨询',
  partners_apply: '申请成为 Rainbond 合作伙伴',
  ai_private_deployment_hero: '获取 AI 私有化部署方案',
};

function appendEntryParam(target, entryName) {
  if (!entryName) {
    return target;
  }

  const hashIndex = target.indexOf('#');
  const hash = hashIndex >= 0 ? target.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? target.slice(0, hashIndex) : target;
  const separator = withoutHash.includes('?') ? '&' : '?';

  return `${withoutHash}${separator}entry=${encodeURIComponent(entryName)}${hash}`;
}

function buildConsultationHref(sourcePage, entryName) {
  if (!entryName) {
    return appendSourceParam(CONSULTATION_FORM_URL, sourcePage, 'from');
  }

  return appendEntryParam(
    appendSourceParam(CONSULTATION_FORM_URL, sourcePage, 'from'),
    entryName,
  );
}

function buildConsultationEventProps(entryName, targetForm, ctaText) {
  return {
    entry_name: entryName,
    target_form: targetForm,
    cta_text: ctaText || ENTRY_CTA_TEXT[entryName] || entryName,
  };
}

function buildEnterprisePageEntryEventProps(entryName, ctaText) {
  return {
    entry_name: entryName,
    target_page: 'enterprise_server',
    cta_text: ctaText || ENTRY_CTA_TEXT[entryName] || entryName,
  };
}

module.exports = {
  CONSULTATION_EVENT_NAME,
  CONSULTATION_FORM_URL,
  ENTERPRISE_PAGE_ENTRY_EVENT_NAME,
  buildConsultationEventProps,
  buildConsultationHref,
  buildEnterprisePageEntryEventProps,
};
