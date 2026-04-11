import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {appendSourceParam, trackUmamiEvent} from '@src/utils/umami';

type TrackedLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  eventName?: string;
  eventProps?: Record<string, unknown>;
  appendSourcePageParam?: boolean;
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
  sourceParamKey = 'from',
  onClick,
  target,
  rel,
}: TrackedLinkProps): JSX.Element {
  const location = useLocation();
  const currentPath = location.pathname || '/';
  const nextTo = appendSourcePageParam ? appendSourceParam(to, currentPath, sourceParamKey) : to;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventName) {
      trackUmamiEvent(eventName, eventProps, currentPath);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link className={className} to={nextTo} onClick={handleClick} rel={rel} target={target}>
      {children}
    </Link>
  );
}
