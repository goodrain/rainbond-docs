import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import {trackUmamiEvent} from '@src/utils/umami';
import {ENTERPRISE_PAGE_ENTRY_EVENT_NAME, buildEnterprisePageEntryEventProps} from '@src/utils/consultation';

export default function ConsultationNavbarItem(props) {
  return (
    <DefaultNavbarItem
      {...props}
      onClick={(event) => {
        trackUmamiEvent(
          ENTERPRISE_PAGE_ENTRY_EVENT_NAME,
          buildEnterprisePageEntryEventProps('navigation_enterprise'),
        );
        props.onClick?.(event);
      }}
    />
  );
}
