import React, {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import {trackUmamiEvent} from '@src/utils/umami';

type PageEntryTrackerProps = {
  eventName: string;
  eventProps?: Record<string, unknown>;
  sourceParamKey?: string;
};

export default function PageEntryTracker({
  eventName,
  eventProps,
  sourceParamKey = 'from',
}: PageEntryTrackerProps): null {
  const location = useLocation();
  const trackedSignatureRef = useRef('');
  const eventPropsSignature = JSON.stringify(eventProps || {});

  useEffect(() => {
    const params = new URLSearchParams(location.search || '');
    const payload = {
      ...(eventProps || {}),
    };
    const sourcePage = params.get(sourceParamKey);
    const signature = `${eventName}:${location.pathname}:${location.search}:${eventPropsSignature}`;

    if (trackedSignatureRef.current === signature) {
      return;
    }

    if (sourcePage) {
      payload.source_page = sourcePage;
    }

    trackedSignatureRef.current = signature;
    trackUmamiEvent(eventName, payload, location.pathname);
  }, [eventName, eventProps, eventPropsSignature, location.pathname, location.search, sourceParamKey]);

  return null;
}
