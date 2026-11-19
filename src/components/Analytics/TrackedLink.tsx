import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {appendSourceParam, trackUmamiEvent} from '@src/utils/umami';
import {CONSULTATION_EVENT_NAME, CONSULTATION_FORM_URL, buildConsultationEventProps, buildConsultationHref} from '@src/utils/consultation';

type TrackedLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  eventName?: string;
  eventProps?: Record<string, unknown>;
  appendSourcePageParam?: boolean;
  appendEntryParam?: string;
  sourceParamKey?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
};

export default function TrackedLink({
  to,
  children,
  className,
  eventName,
  eventProps,
  appendSourcePageParam = false,
  appendEntryParam,
  sourceParamKey = 'from',
  onClick,
  target,
  rel,
}: TrackedLinkProps): JSX.Element {
  const location = useLocation();
  const currentPath = location.pathname || '/';
  const sourceAwareTo = appendSourcePageParam ? appendSourceParam(to, currentPath, sourceParamKey) : to;
  const nextTo = appendEntryParam && to === CONSULTATION_FORM_URL
    ? buildConsultationHref(currentPath, appendEntryParam)
    : sourceAwareTo;
  const safeRel = target === '_blank' ? 'noopener noreferrer' : rel;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventName) {
      trackUmamiEvent(eventName, eventProps, currentPath);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link className={className} to={nextTo} onClick={handleClick} rel={safeRel} target={target}>
      {children}
    </Link>
  );
}

export function ConsultationLink({entryName, ...props}: Omit<TrackedLinkProps, 'to' | 'eventName' | 'eventProps' | 'appendSourcePageParam'> & {entryName: string}): JSX.Element {
  return (
    <TrackedLink
      {...props}
      to={CONSULTATION_FORM_URL}
      eventName={CONSULTATION_EVENT_NAME}
      eventProps={buildConsultationEventProps(entryName, 'enterprise_consultation')}
      appendSourcePageParam
      appendEntryParam={entryName}
    />
  );
}
