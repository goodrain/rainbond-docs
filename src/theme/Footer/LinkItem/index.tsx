/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/Footer/LinkItem';
import {useLocation} from '@docusaurus/router';
import {CONSULTATION_EVENT_NAME, CONSULTATION_FORM_URL, ENTERPRISE_PAGE_ENTRY_EVENT_NAME, buildConsultationEventProps, buildConsultationHref, buildEnterprisePageEntryEventProps} from '@src/utils/consultation';
import {trackUmamiEvent} from '@src/utils/umami';

export default function FooterLinkItem({item}: Props): JSX.Element {
  const location = useLocation();
  const {to, href, label, prependBaseUrlToHref, ...props} = item;
  const isConsultationLink = href === CONSULTATION_FORM_URL || to === CONSULTATION_FORM_URL;
  const isEnterprisePageLink = to === 'enterprise_server' || to === '/enterprise_server' || href === '/enterprise_server';
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const consultationHref = buildConsultationHref(location.pathname, 'footer_contact');

  return (
    <Link
      className="footer__link-item"
      {...(isConsultationLink
        ? {
            href: consultationHref,
          }
        : href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
        })}
      onClick={(event) => {
        if (isConsultationLink) {
          trackUmamiEvent(
            CONSULTATION_EVENT_NAME,
            buildConsultationEventProps('footer_contact', 'enterprise_consultation'),
            location.pathname,
          );
        }
        if (isEnterprisePageLink) {
          trackUmamiEvent(
            ENTERPRISE_PAGE_ENTRY_EVENT_NAME,
            buildEnterprisePageEntryEventProps('footer_enterprise'),
            location.pathname,
          );
        }
        props.onClick?.(event);
      }}
      {...props}>
      {label}
      {href && !isInternalUrl(href) && <IconExternalLink />}
    </Link>
  );
}
