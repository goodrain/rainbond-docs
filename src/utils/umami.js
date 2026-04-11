const ROOT_PATH = '/';
const PATH_KEYS = {
  page_path: true,
  source_page: true,
  target_path: true,
};

function getUmamiEventSpecFromAttributes(attributes) {
  if (!attributes || typeof attributes !== 'object') {
    return null;
  }

  const eventName = attributes['data-umami-event'];

  if (!eventName) {
    return null;
  }

  const payload = {};

  Object.keys(attributes).forEach((key) => {
    if (!key.startsWith('data-umami-') || key === 'data-umami-event') {
      return;
    }

    const value = attributes[key];

    if (value === undefined || value === null || value === '') {
      return;
    }

    const payloadKey = key
      .replace(/^data-umami-/, '')
      .replace(/-/g, '_');

    payload[payloadKey] = value;
  });

  return {
    eventName,
    payload,
  };
}

function normalizePathname(input) {
  if (!input) {
    return ROOT_PATH;
  }

  let value = String(input).trim();

  if (!value) {
    return ROOT_PATH;
  }

  if (/^[a-z]+:\/\//i.test(value)) {
    value = value.replace(/^[a-z]+:\/\/[^/]+/i, '') || ROOT_PATH;
  }

  value = value.split('#')[0].split('?')[0];

  if (!value.startsWith('/')) {
    value = `/${value}`;
  }

  value = value.replace(/\/{2,}/g, '/');

  if (value.length > 1 && value.endsWith('/')) {
    value = value.slice(0, -1);
  }

  return value || ROOT_PATH;
}

function appendSourceParam(target, sourcePage, paramKey) {
  if (!target || !sourcePage) {
    return target;
  }

  const key = paramKey || 'from';
  const hashIndex = target.indexOf('#');
  const hash = hashIndex >= 0 ? target.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? target.slice(0, hashIndex) : target;
  const queryIndex = withoutHash.indexOf('?');
  const base = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : '';
  const prefix = query ? `${query}&` : '';

  return `${base}?${prefix}${encodeURIComponent(key)}=${encodeURIComponent(normalizePathname(sourcePage))}${hash}`;
}

function buildEventPayload(payload, currentPath) {
  const input = payload || {};
  const next = {};

  Object.keys(input).forEach((key) => {
    const value = input[key];

    if (value === undefined || value === null || value === '') {
      return;
    }

    next[key] = PATH_KEYS[key] ? normalizePathname(value) : value;
  });

  if (currentPath || next.page_path) {
    next.page_path = normalizePathname(currentPath || next.page_path);
  }

  return next;
}

function trackUmamiEvent(eventName, payload, currentPath) {
  if (typeof window === 'undefined' || !window.umami || typeof window.umami.track !== 'function') {
    return false;
  }

  if (!eventName) {
    return false;
  }

  const pagePath = currentPath || (window.location && window.location.pathname) || ROOT_PATH;

  window.umami.track(eventName, buildEventPayload(payload, pagePath));

  return true;
}

module.exports = {
  appendSourceParam,
  buildEventPayload,
  getUmamiEventSpecFromAttributes,
  normalizePathname,
  trackUmamiEvent,
};
